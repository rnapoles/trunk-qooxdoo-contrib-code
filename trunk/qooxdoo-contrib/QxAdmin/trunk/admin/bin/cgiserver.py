#!/usr/bin/env python

import CGIHTTPServer
import BaseHTTPServer


class Handler(CGIHTTPServer.CGIHTTPRequestHandler):
    cgi_directories = ["/admin/bin"]


PORT = 8000

httpd = BaseHTTPServer.HTTPServer(("", PORT), Handler)
print "serving at port", PORT
httpd.serve_forever()
