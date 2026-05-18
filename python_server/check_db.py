import os
from database import execute_query

def check_blogs():
    print("--- ALL BLOGS ---")
    blogs = execute_query("SELECT id, title, status, date FROM blogs ORDER BY date DESC")
    for b in blogs:
        print(f"ID: {b['id']} | Status: {b['status']} | Date: {b['date']} | Title: {b['title']}")
    
    print("\n--- TRASHED BLOGS ---")
    trashed = execute_query("SELECT id, title FROM blogs WHERE status = 'Trash'")
    for b in trashed:
        print(f"ID: {b['id']} | Title: {b['title']}")

if __name__ == "__main__":
    check_blogs()
