import os
import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv

load_dotenv()

def get_db_connection():
    conn = psycopg2.connect(
        host=os.getenv("DB_HOST"),
        port=os.getenv("DB_PORT"),
        database=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD")
    )
    return conn

def execute_query(query, params=(), fetch_all=True):
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    try:
        cur.execute(query, params)
        
        is_select = query.strip().upper().startswith("SELECT")
        has_returning = "RETURNING" in query.upper()
        
        # Fetch results FIRST (before commit, so the cursor is still valid)
        if is_select or has_returning:
            result = cur.fetchall() if fetch_all else cur.fetchone()
        else:
            result = None
        
        # Commit all write operations
        if not is_select:
            conn.commit()
        
        return result
    except Exception as e:
        conn.rollback()
        raise e
    finally:
        cur.close()
        conn.close()

def init_db():
    """
    Initializes the database by creating all required tables if they do not exist.
    """
    queries = [
        """
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            password_hash VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS blogs (
            id SERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            slug TEXT UNIQUE NOT NULL,
            description TEXT,
            content TEXT,
            status VARCHAR(50) DEFAULT 'Draft',
            previous_status VARCHAR(50),
            image_url TEXT,
            author VARCHAR(255),
            user_id INTEGER REFERENCES users(id),
            date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            tags TEXT,
            meta_title TEXT,
            meta_description TEXT,
            image_alt TEXT,
            focus_keyword TEXT
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS media (
            id SERIAL PRIMARY KEY,
            public_id TEXT UNIQUE NOT NULL,
            url TEXT NOT NULL,
            filename TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS comments (
            id SERIAL PRIMARY KEY,
            post_id INTEGER REFERENCES blogs(id) ON DELETE CASCADE,
            author_name TEXT NOT NULL,
            author_email TEXT NOT NULL,
            subject TEXT,
            content TEXT NOT NULL,
            status TEXT DEFAULT 'Pending',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS subscribers (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255),
            email VARCHAR(255) UNIQUE NOT NULL,
            phone VARCHAR(20),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        """
    ]
    
    for query in queries:
        try:
            execute_query(query, fetch_all=False)
        except Exception as e:
            print(f"Error creating table: {e}")
            
    print("Database tables initialized successfully.")
