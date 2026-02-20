
# How to Store Blog Images in Supabase

Follow these steps to upload your images to Supabase and use them in your blogs.

## 1. Create a Storage Bucket

1. Go to your **Supabase Dashboard**.
2. Click on the **Storage** icon in the left sidebar (it looks like a box/archive).
3. Click **"+ New Bucket"**.
4. Name the bucket: `blog-images`.
5. **IMPORTANT:** Toggle the switch that says **"Public bucket"** to **ON**.
    * If you don't do this, your images won't show up on the website!
6. Click **Save**.

## 2. Upload an Image

1. Click on your new `blog-images` bucket.
2. Click **"Upload File"**.
3. Select your image (e.g., `blog_tech.png` or any image you want).
4. Once uploaded, click on the image file name in the list.

## 3. Get the Public URL

1. After clicking the image, a panel will open on the right.
2. Click the **"Get URL"** button or look for **"Public URL"**.
3. Click **Copy URL**.
    * It should look like: `https://mpdkxawekxorbzqkwwwp.supabase.co/storage/v1/object/public/blog-images/your-image.png`

## 4. Add the URL to your Blog Post

1. Go to the **Table Editor** in Supabase (the grid icon).
2. Open your `blogs` table.
3. Find the blog post you want to update (or add a new row).
4. Paste the URL you copied into the `image_url` column.
5. Click **Save** (if needed) or just click off the cell to save.

## 5. Check Your Website

Refresh your website (`http://localhost:5173/blog`). The image should now appear on the blog card!
