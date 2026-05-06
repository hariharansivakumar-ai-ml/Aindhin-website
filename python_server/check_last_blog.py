from database import execute_query
import json

def check_last_blog():
    try:
        blog = execute_query("SELECT * FROM blogs ORDER BY id DESC LIMIT 1", fetch_all=False)
        if blog:
            print(json.dumps(dict(blog), indent=4, default=str))
        else:
            print("No blogs found")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    check_last_blog()
