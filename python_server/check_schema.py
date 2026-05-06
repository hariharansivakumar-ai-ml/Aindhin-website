from database import execute_query
try:
    cols = execute_query("SELECT column_name FROM information_schema.columns WHERE table_name = 'blogs'")
    print([r['column_name'] for r in cols])
except Exception as e:
    print(f"Error: {e}")
