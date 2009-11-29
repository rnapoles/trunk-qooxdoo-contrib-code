#!/usr/bin/python
# -*- coding: ascii -*-
'''==========================================================================
qxjsonrpc - JSON-RPC backend for the qooxdoo JavaScript library

(C) 2007 - Viktor Ferenczi (python@cx.hu) - Licence: GNU LGPL

-----------------------------------------------------------------------------

Session test server. Run this module, then open session.html in your
browser to test this server.

=========================================================================='''

import qxjsonrpc
import qxjsonrpc.http

from qxjsonrpc import public, request, session, service

#============================================================================
# Exported symbols

__all__=['TestService', 'TestHTTPServer']

#============================================================================

class TestSession(qxjsonrpc.Session):
    @qxjsonrpc.public
    def test_method(self):
        return 'test_method called'
    @qxjsonrpc.public
    @qxjsonrpc.service
    def get_service(self, service):
        return 'get_service called, service=%r'%service

#============================================================================

class TestService(object):
    '''Test service can be used with session.html.'''
    @public
    @request
    @service
    def newsession(self, request, service):
        #print 'TEST: Creating new session.'
        request.session=TestSession(request.server, self)
        session=request.session
        return 'new session registered, session ID: %s'%session.getSessionID()
    @session
    def getsessionid(self, session):
        #print 'TEST: Getting session id.'
        if session is None: return None
        return session.getSessionID()
    @session
    def endsession(self, session):
        #print 'TEST: Ending session.'
        session.endSession()

#============================================================================

class TestHTTPServer(qxjsonrpc.http.HTTPServer):
    '''HTTP JSON-RPC server for testing sessions'''
    def __init__(self, host='127.0.0.1', port=8000):
        qxjsonrpc.http.HTTPServer.__init__(self, host, port, debug=True)
        self.setService('session.test', TestService())

#============================================================================

def main():
    '''Run test server on 127.0.0.1:8000'''
    print 'Running: qxjsonrpc %s'%qxjsonrpc.__version__.number 
    print 'Open session.html from test subdirectory to test this server.'
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
