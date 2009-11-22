#!/usr/bin/python
# -*- coding: ascii -*-
'''==========================================================================
qxjsonrpc - JSON-RPC backend for the qooxdoo JavaScript library

(C) 2007 - Viktor Ferenczi (python@cx.hu) - Licence: GNU LGPL

-----------------------------------------------------------------------------

Login/logout test for qooxdoo, uses session.

=========================================================================='''

from qxjsonrpc import *
from qxjsonrpc.http import HTTPServer

#============================================================================
# Exported symbols

__all__=['TestService', 'TestHTTPServer']

#============================================================================

class TestService(object):
    '''Test service can be used with session.html.'''
    @public
    @request
    def login(self, username, password, request):
        if username=='admin' and password=='1234':
            print 'LOGIN OK'
            request.session=Session(request.server, self)
            session=request.session
            return True
        print 'LOGIN FAILED'
        return False
    @session
    def logout(self, session):
        print 'LOGOUT'
        session.endSession()
    @session
    def getSessionID(self, session):
        print 'Client read session ID.'
        if session is None: return None
        return session.getSessionID()

#============================================================================

class TestHTTPServer(HTTPServer):
    '''HTTP JSON-RPC server for testing sessions'''
    def __init__(self, host='127.0.0.1', port=8000):
        HTTPServer.__init__(self, host, port, debug=True)
        self.setService('login.test', TestService())

#============================================================================

def main():
    '''Run test server on 127.0.0.1:8000'''
    print 'Open login.html from test subdirectory to test this server.'
    print 'Debugging output is enabled in the test server.'
    print
    print 'Ctrl-C aborts the server.'
    print
    print 'Test server log output follows:'
    print
    srv=TestHTTPServer()
    srv.serve_forever()

#============================================================================

if __name__=='__main__':
    main()

#============================================================================
