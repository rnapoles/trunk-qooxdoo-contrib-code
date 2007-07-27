#!/usr/bin/python
# -*- coding: ascii -*-
'''==========================================================================
qxjsonrpc - JSON-RPC backend for the qooxdoo JavaScript library

(C) 2007 - Viktor Ferenczi (python@cx.hu) - Licence: GNU LGPL

-----------------------------------------------------------------------------

Domain access test server. Run this module, then open domain.html in your
browser to test this server.

=========================================================================='''

import qxjsonrpc
import qxjsonrpc.http

from qxjsonrpc import domain

#============================================================================
# Exported symbols

__all__=['TestService', 'TestHTTPServer']

#============================================================================

class TestService(object):
    '''Test service can be used with domain.html.'''
    @domain
    def restricted(self):
        return 'this method can be called at 127.0.0.1:8000, not at localhost:8000'

#============================================================================

class TestHTTPServer(qxjsonrpc.http.HTTPServer):
    '''HTTP JSON-RPC server for testing sessions'''
    def __init__(self, host='127.0.0.1', port=8000):
        qxjsonrpc.http.HTTPServer.__init__(self, host, port, debug=True)
        self.setService('domain.test', TestService())

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
