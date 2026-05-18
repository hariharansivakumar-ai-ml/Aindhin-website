import os
import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv

load_dotenv()

def get_db_connection():
    return psycopg2.connect(
        host=os.getenv("DB_HOST"),
        port=os.getenv("DB_PORT"),
        database=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD")
    )

def check_blogs():
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    try:
        cur.execute("SELECT status, count(*) FROM blogs GROUP BY status")
        results = cur.fetchall()
        print("Blog status counts:")
        for row in results:
            print(f"{row['status']}: {row['count']}")
            
        cur.execute("SELECT count(*) FROM blogs")
        total = cur.fetchone()['count']
        print(f"\nTotal blogs in DB: {total}")
        
    except Exception as e:
        print(f"Error: {e}")
    finally:
        cur.close()
        conn.close()

if __name__ == "__main__":
    check_blogs()
