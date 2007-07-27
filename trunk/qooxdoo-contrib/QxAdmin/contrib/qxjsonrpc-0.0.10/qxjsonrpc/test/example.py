#!/usr/bin/python
# -*- coding: ascii -*-
'''This is a very simple example JSON-RPC service.
Run this script and point your browser to:
http://127.0.0.1:8000/?id=1&service=myservice&method=getPi
You should get the value of pi in a well-formed JSON-RPC response:
{"error": null, "id": 1, "result": 3.14159265359}
The server will emit some debug info to stderr.'''

import math
import qxjsonrpc
import qxjsonrpc.http

class MyService(object):
    @qxjsonrpc.public
    def getPi(self, *args):
        print 'Called: getPi%r'%(args,)
        return math.pi

server=qxjsonrpc.http.HTTPServer(debug=True)
server.setService('myservice', MyService())
server.serve_forever()
