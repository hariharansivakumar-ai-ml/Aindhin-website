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
