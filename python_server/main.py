import os, io
from PIL import Image
from typing import List, Optional
from fastapi import FastAPI, Depends, HTTPException, File, UploadFile, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from database import execute_query
from auth_utils import verify_password, get_password_hash, create_access_token, get_current_user
from datetime import datetime
import cloudinary
import cloudinary.uploader
from cloudinary.utils import cloudinary_url

# Cloudinary Configuration
cloudinary.config(
    cloud_name = os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key = os.getenv("CLOUDINARY_API_KEY"),
    api_secret = os.getenv("CLOUDINARY_API_SECRET"),
    secure = True
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://aindhin.org",
        "https://www.aindhin.org",
        "https://aindhin.com",
        "https://www.aindhin.com",
        "http://localhost:5173",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Models ---
class LoginRequest(BaseModel):
    email: str
    password: str

class BlogCreate(BaseModel):
    title: str
    slug: str
    description: str
    status: str = "Draft"
    image_url: Optional[str] = None
    author: str = "Aindhin"

class CommentCreate(BaseModel):
    post_id: int
    author_name: str
    author_email: str
    subject: Optional[str] = None
    content: str

class CommentStatusUpdate(BaseModel):
    status: str # 'Approved', 'Pending', 'Spam'

class SubscriberCreate(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None

# --- Auth Routes ---
@app.post("/api/auth/login")
async def login(req: LoginRequest):
    user = execute_query("SELECT * FROM users WHERE email = %s", (req.email,), fetch_all=False)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    user = dict(user)
    db_password = user.get('password_hash')
    
    if db_password is None:
        raise HTTPException(status_code=500, detail="Database column 'password_hash' not found")
        
    if not verify_password(req.password, db_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    token = create_access_token(data={"id": user['id'], "email": user['email']})
    return {"token": token, "user": {"id": user['id'], "email": user['email']}}

@app.get("/api/auth/me")
async def get_me(current_user: dict = Depends(get_current_user)):
    return {"user": current_user}

@app.post("/api/auth/create-admin")
async def create_admin(req: LoginRequest):
    hashed_pwd = get_password_hash(req.password)
    try:
        user = execute_query(
            "INSERT INTO users (email, password_hash) VALUES (%s, %s) RETURNING id, email",
            (req.email, hashed_pwd),
            fetch_all=False
        )
        return {"message": "Admin created", "user": user}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# --- Blog Routes ---
@app.get("/api/blogs")
async def get_blogs(status: Optional[str] = None):
    print(f"DEBUG: get_blogs called with status={status}")
    query = "SELECT * FROM blogs"
    params = []
    
    if status == 'all':
        query += " WHERE (status != 'Trash' OR status IS NULL)"
    elif status == 'Trash':
        query += " WHERE status = 'Trash'"
    elif status == 'Draft':
        query += " WHERE (status = 'Draft' OR status IS NULL)"
    elif status:
        query += " WHERE status = %s"
        params.append(status)
    else:
        # Public: only published
        query += " WHERE status = 'Published'"
    
    query += " ORDER BY date DESC"
    return execute_query(query, tuple(params))

@app.get("/api/blogs/by-id/{id}")
async def get_blog_by_id(id: int, current_user: dict = Depends(get_current_user)):
    blog = execute_query("SELECT * FROM blogs WHERE id = %s", (id,), fetch_all=False)
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    return blog

@app.get("/api/blogs/{slug}")
async def get_blog_by_slug(slug: str):
    blog = execute_query(
        "SELECT * FROM blogs WHERE slug = %s AND (status = 'Published' OR status IS NULL)",
        (slug,),
        fetch_all=False
    )
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    return blog

@app.post("/api/blogs")
async def save_blog(req: BlogCreate, current_user: dict = Depends(get_current_user)):
    try:
        # Ensure slug is unique: if taken, append -2, -3, etc.
        base_slug = req.slug
        final_slug = base_slug
        counter = 2
        while True:
            existing = execute_query(
                "SELECT id FROM blogs WHERE slug = %s",
                (final_slug,),
                fetch_all=False
            )
            if not existing:
                break
            final_slug = f"{base_slug}-{counter}"
            counter += 1

        query = """
            INSERT INTO blogs (title, slug, description, status, image_url, author, user_id, date)
            VALUES (%s, %s, %s, %s, %s, %s, %s, NOW())
            RETURNING *
        """
        params = (req.title, final_slug, req.description, req.status, req.image_url, req.author, current_user['id'])
        result = execute_query(query, params, fetch_all=False)
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.put("/api/blogs/{id}")
async def update_blog(id: int, req: dict, current_user: dict = Depends(get_current_user)):
    try:
        # Build dynamic query to avoid overwriting existing data with NULL
        fields = []
        params = []
        
        updatable_fields = ['title', 'slug', 'description', 'status', 'image_url', 'author', 'previous_status']
        
        for field in updatable_fields:
            if field in req:
                fields.append(f"{field} = %s")
                params.append(req[field])
        
        if not fields:
            raise HTTPException(status_code=400, detail="No fields to update")
            
        query = f"UPDATE blogs SET {', '.join(fields)} WHERE id = %s RETURNING *"
        params.append(id)
        
        result = execute_query(query, tuple(params), fetch_all=False)
        if not result:
            raise HTTPException(status_code=404, detail="Blog not found")
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# --- Blog Delete (Permanent) ---
@app.delete("/api/blogs/{id}")
async def delete_blog(id: int, current_user: dict = Depends(get_current_user)):
    # Get blog info first to delete image from Cloudinary
    blog = execute_query("SELECT image_url FROM blogs WHERE id = %s", (id,), fetch_all=False)
    if blog and blog['image_url']:
        try:
            # Extract public_id from URL
            # Cloudinary URL format: https://res.cloudinary.com/cloud_name/image/upload/[version]/[folder]/public_id.ext
            image_url = blog['image_url']
            if 'res.cloudinary.com' in image_url:
                path_parts = image_url.split('/')
                # Find the 'upload' segment
                upload_index = -1
                try:
                    upload_index = path_parts.index('upload')
                except ValueError:
                    # 'upload' not found, not a standard Cloudinary URL
                    print(f"Warning: 'upload' segment not found in Cloudinary URL: {image_url}")
                    pass

                if upload_index != -1:
                    # The public_id (including folder) starts after 'upload' and optionally 'vXXXXX'
                    # If there's a version number (e.g., v12345), it's at upload_index + 1
                    # The actual path starts at upload_index + 1 or upload_index + 2
                    
                    # Check if the next part is a version number (starts with 'v' and is digits)
                    if len(path_parts) > upload_index + 1 and path_parts[upload_index + 1].startswith('v') and path_parts[upload_index + 1][1:].isdigit():
                        public_id_start_index = upload_index + 2
                    else:
                        public_id_start_index = upload_index + 1
                    
                    if len(path_parts) > public_id_start_index:
                        folder_public_id_with_ext = '/'.join(path_parts[public_id_start_index:])
                        folder_public_id = os.path.splitext(folder_public_id_with_ext)[0]
                        cloudinary.uploader.destroy(folder_public_id)
                    else:
                        print(f"Warning: Could not extract public_id from Cloudinary URL: {image_url}")
        except Exception as e:
            print(f"Error deleting image from Cloudinary: {e}")

    execute_query("DELETE FROM blogs WHERE id = %s", (id,))
    return {"message": "Blog permanently deleted"}

# --- Upload Routes (Cloudinary + DB) ---
@app.post("/api/upload")
async def upload_image(file: UploadFile = File(...), current_user: dict = Depends(get_current_user)):
    try:
        # Read file content
        content = await file.read()
        img = Image.open(io.BytesIO(content))
        
        # Handle orientation if present in EXIF
        try:
            from PIL import ImageOps
            img = ImageOps.exif_transpose(img)
        except Exception:
            pass

        # Convert to WebP
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGBA")
        else:
            img = img.convert("RGB")
            
        webp_buffer = io.BytesIO()
        # Use a high quality setting while still getting good compression
        img.save(webp_buffer, format="WEBP", quality=80, method=6)
        webp_buffer.seek(0)
        
        # Use the original filename without extension + .webp for the DB
        filename_base = os.path.splitext(file.filename)[0]
        new_filename = f"{filename_base}.webp"
        
        public_id = f"aindhin_{int(datetime.now().timestamp())}_{filename_base}"
        
        upload_result = cloudinary.uploader.upload(
            webp_buffer,
            public_id=public_id,
            folder="blog_images",
            resource_type="image"
        )

        full_public_id = upload_result["public_id"]
        secure_url = upload_result["secure_url"]

        # Ensure the URL ends with .webp if Cloudinary didn't already
        if not secure_url.lower().endswith(".webp"):
            secure_url = os.path.splitext(secure_url)[0] + ".webp"

        # Save to DB
        execute_query(
            "INSERT INTO media (public_id, url, filename) VALUES (%s, %s, %s) ON CONFLICT (public_id) DO NOTHING",
            (full_public_id, secure_url, new_filename)
        )

        return {"url": secure_url, "name": full_public_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")

@app.get("/api/upload/list")
async def list_uploads(current_user: dict = Depends(get_current_user)):
    try:
        # Read from our DB — free, fast, no Admin API needed
        rows = execute_query("SELECT public_id, url, filename, created_at FROM media ORDER BY created_at DESC")
        return [{"name": r["public_id"], "url": r["url"], "filename": r["filename"]} for r in (rows or [])]
    except Exception as e:
        print(f"Media list error: {e}")
        return []

@app.delete("/api/upload/{public_id:path}")
async def delete_upload(public_id: str, current_user: dict = Depends(get_current_user)):
    try:
        # Delete from Cloudinary
        result = cloudinary.uploader.destroy(public_id)
        # Delete from DB regardless of Cloudinary result
        execute_query("DELETE FROM media WHERE public_id = %s", (public_id,))
        return {"message": "Image deleted", "cloudinary": result.get("result", "unknown")}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Delete failed: {str(e)}")

# --- Comment Routes ---

@app.post("/api/comments")
async def add_comment(req: CommentCreate):
    try:
        query = """
            INSERT INTO comments (post_id, author_name, author_email, subject, content, status, created_at)
            VALUES (%s, %s, %s, %s, %s, 'Pending', NOW())
            RETURNING *
        """
        params = (req.post_id, req.author_name, req.author_email, req.subject, req.content)
        result = execute_query(query, params, fetch_all=False)
        return {"message": "Comment submitted and awaiting approval", "comment": result}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to submit comment: {str(e)}")

@app.get("/api/comments/admin")
async def get_all_comments_admin(current_user: dict = Depends(get_current_user)):
    try:
        # Join with blogs to show which post the comment belongs to
        query = """
            SELECT c.*, b.title as post_title 
            FROM comments c
            JOIN blogs b ON c.post_id = b.id
            ORDER BY c.created_at DESC
        """
        return execute_query(query)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/comments/{post_id}")
async def get_approved_comments(post_id: int):
    try:
        query = "SELECT * FROM comments WHERE post_id = %s AND status = 'Approved' ORDER BY created_at DESC"
        return execute_query(query, (post_id,))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/api/comments/{comment_id}/status")
async def update_comment_status(comment_id: int, req: CommentStatusUpdate, current_user: dict = Depends(get_current_user)):
    try:
        query = "UPDATE comments SET status = %s WHERE id = %s RETURNING *"
        result = execute_query(query, (req.status, comment_id), fetch_all=False)
        if not result:
            raise HTTPException(status_code=404, detail="Comment not found")
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.delete("/api/comments/{comment_id}")
async def delete_comment(comment_id: int, current_user: dict = Depends(get_current_user)):
    try:
        execute_query("DELETE FROM comments WHERE id = %s", (comment_id,))
        return {"message": "Comment deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# --- Subscribers Routes ---
@app.post("/api/subscribers")
async def create_subscriber(req: SubscriberCreate):
    try:
        query = """
            INSERT INTO subscribers (name, email, phone, created_at)
            VALUES (%s, %s, %s, NOW())
            RETURNING id, name, email
        """
        result = execute_query(query, (req.name, req.email, req.phone), fetch_all=False)
        return result
    except Exception as e:
        if 'duplicate key' in str(e).lower() or 'unique constraint' in str(e).lower():
            raise HTTPException(status_code=400, detail="Email is already subscribed")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/subscribers")
async def get_all_subscribers(current_user: dict = Depends(get_current_user)):
    try:
        query = "SELECT * FROM subscribers ORDER BY created_at DESC"
        return execute_query(query)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/api/subscribers/{sub_id}")
async def delete_subscriber(sub_id: int, current_user: dict = Depends(get_current_user)):
    try:
        execute_query("DELETE FROM subscribers WHERE id = %s", (sub_id,))
        return {"message": "Subscriber deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)
