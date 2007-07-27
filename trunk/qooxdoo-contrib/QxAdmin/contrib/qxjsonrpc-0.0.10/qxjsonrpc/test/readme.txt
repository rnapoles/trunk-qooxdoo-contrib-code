Examples:


example.py

Run example.py, then point your browser to:
http://127.0.0.1:8000/?id=1&service=myservice&method=getPi
You should get the value of pi in a well-formed JSON-RPC response:
{"error": null, "id": 1, "result": 3.14159265359}


qxrpc.py + transports.html:

Run qxrpc.py, then open transports.html in your browser.
You can test RPC transports with this HTML page.


session.py + session.html:

Run session.py, then open session.html in your browser.
You can test session support with this HTML page.
Cookies must be enabled in your browser.


login.py + login.html + login.js:

Login/logout test with sessions.
Copy the script and resource subdirectories from qooxdoo's
quickstart example here to operate correctly. Run login.py,
then open login.html in your browser. A login window should
appear. You can create a session by logging in:
Username: admin
Password: 1234
Of course you can try to enter invalid values.