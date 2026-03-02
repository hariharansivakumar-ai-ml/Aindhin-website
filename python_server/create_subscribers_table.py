import psycopg2
from dotenv import load_dotenv
import os

load_dotenv()
conn = psycopg2.connect(
    host=os.getenv("DB_HOST"),
    port=os.getenv("DB_PORT"),
    database=os.getenv("DB_NAME"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD")
)
cur = conn.cursor()
cur.execute('''
CREATE TABLE IF NOT EXISTS subscribers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
''')
conn.commit()
print("Table 'subscribers' created successfully.")
cur.close()
conn.close()
