from database import execute_query
import json

def debug_db():
    print("--- BLOGS SUMMARY ---")
    res = execute_query("SELECT id, title, status, date FROM blogs ORDER BY date DESC")
    print(f"Total blogs in DB: {len(res)}")
    for b in res:
        print(f"ID: {b['id']} | Status: {b['status']} | Date: {b['date']} | Title: {b['title'][:40]}...")

if __name__ == "__main__":
    debug_db()
