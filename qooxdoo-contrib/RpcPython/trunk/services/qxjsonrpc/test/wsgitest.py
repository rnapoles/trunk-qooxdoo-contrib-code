#!/usr/bin/python
# -*- coding: ascii -*-
'''This is a test for the WSGI module. Requires Python 2.5.
Uses the wsgiref standard library module as a test server.'''

import qxjsonrpc
import qxjsonrpc.wsgi
import qxjsonrpc.test.qxrpc
import qxjsonrpc.test.session
import qxjsonrpc.test.domain
import wsgiref.simple_server

application=qxjsonrpc.wsgi.WSGIApplication(domain='127.0.0.1:8000', debug=True)
application.setService('qooxdoo.test', qxjsonrpc.test.qxrpc.TestService())
application.setService('session.test', qxjsonrpc.test.session.TestService())
application.setService('domain.test', qxjsonrpc.test.domain.TestService())
#application=wsgiref.simple_server.demo_app

server=wsgiref.simple_server.make_server('127.0.0.1', 8000, application)
server.serve_forever()
