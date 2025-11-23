import http.server
import socketserver
import webbrowser
import os
import time
import socket

def find_free_port(start_port):
    """Finds a free port starting from the given port."""
    port = start_port
    while True:
        try:
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                s.bind(("", port))
            return port
        except OSError:
            print(f"Port {port} is in use, trying next...")
            port += 1

# Set the target filename and find a free port
PORT = find_free_port(8000)
# Changed to open welcome.html first
FILENAME = "welcome.html"
URL = f"http://localhost:{PORT}/{FILENAME}"

# Check if welcome.html exists
if not os.path.exists(FILENAME):
    print(f"Error: '{FILENAME}' not found in this directory.")
    print("Please make sure all HTML/JS/PY files are in the same folder.")
    exit()

# Configure the server
Handler = http.server.SimpleHTTPRequestHandler
httpd = None

try:
    # Try to start the server
    httpd = socketserver.TCPServer(("", PORT), Handler)
    
    print(f"\nAll files are in: {os.getcwd()}")
    print(f"\nServing website at: http://localhost:{PORT}/")
    print(f"Opening '{FILENAME}'...")
    print("Press Ctrl+C to stop the server.")

    # Open the web browser
    browser_thread = webbrowser.open_new_tab(URL)

    # Run the server
    httpd.serve_forever()

except KeyboardInterrupt:
    print("\nServer is stopping...")
except Exception as e:
    print(f"\nAn error occurred: {e}")
finally:
    if httpd:
        httpd.server_close()
    print("Server shut down successfully.")
