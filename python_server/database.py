import os
import psycopg2
from psycopg2.extras import RealDictCursor
from psycopg2.pool import SimpleConnectionPool
from dotenv import load_dotenv

load_dotenv()

# -----------------------------------
# DATABASE CONNECTION POOL
# -----------------------------------

connection_pool = SimpleConnectionPool(
    minconn=1,
    maxconn=20,
    host=os.getenv("DB_HOST"),
    port=os.getenv("DB_PORT"),
    database=os.getenv("DB_NAME"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD")
)

def get_db_connection():
    return connection_pool.getconn()

def release_db_connection(conn):
    connection_pool.putconn(conn)

# -----------------------------------
# EXECUTE QUERY
# -----------------------------------

def execute_query(query, params=(), fetch_all=True):
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)

    try:
        cur.execute(query, params)

        is_select = query.strip().upper().startswith("SELECT")
        has_returning = "RETURNING" in query.upper()

        # Fetch results before commit
        if is_select or has_returning:
            result = cur.fetchall() if fetch_all else cur.fetchone()
        else:
            result = None

        # Commit for INSERT/UPDATE/DELETE
        if not is_select:
            conn.commit()

        return result

    except Exception as e:
        conn.rollback()
        raise e

    finally:
        cur.close()
        release_db_connection(conn)

# -----------------------------------
# INITIALIZE DATABASE
# -----------------------------------

def init_db():
    """
    Initializes the database by creating all required tables if they do not exist.
    """

    queries = [

        # USERS TABLE
        """
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            password_hash VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        """,

        # BLOGS TABLE
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

        # MEDIA TABLE
        """
        CREATE TABLE IF NOT EXISTS media (
            id SERIAL PRIMARY KEY,
            public_id TEXT UNIQUE NOT NULL,
            url TEXT NOT NULL,
            filename TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        """,

        # COMMENTS TABLE
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

        # SUBSCRIBERS TABLE
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

    # -----------------------------------
    # CREATE INDEXES FOR PERFORMANCE
    # -----------------------------------

    indexes = [
        "CREATE INDEX IF NOT EXISTS idx_blogs_status ON blogs(status)",
        "CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug)",
        "CREATE INDEX IF NOT EXISTS idx_blogs_date ON blogs(date DESC)"
    ]

    for index_query in indexes:
        try:
            execute_query(index_query, fetch_all=False)
        except Exception as e:
            print(f"Error creating index: {e}")

    print("Database tables initialized successfully.")
