#!/usr/bin/python
# -*- coding: ascii -*-
'''==========================================================================
qxjsonrpc - JSON-RPC backend for the qooxdoo JavaScript library

(C) 2007-2009 - Viktor Ferenczi (python@cx.hu) - Licence: GNU LGPL
Contributor: Christian Boulanger (cboulanger)
-----------------------------------------------------------------------------

This is the main server that listens for requests, imports service classes
and calls the service methods. It receives a service name in
dot-separated path format and expect to find the class containing the
service in a file. If the service name is "foo.bar.Baz", the class is named
"Baz" in the "foo.bar" module, located in "services/foo/bar/Baz.py". The 
class file is dynamically loaded when the request is received. The methods
are protected - they are only executed if the method contains the "public"
decorator.

=========================================================================='''

import qxjsonrpc
from RpcPythonServer import RpcPythonServer


def main():
    '''Run json-rpc server.'''
    print 'Running: qxjsonrpc %s'%qxjsonrpc.__version__.number 
    print
    print 'Debugging output is enabled in the test server, watch stdout.'
    print 'Getting an APPLICATION SPECIFIC ERROR is normal with RPC tests.'
    print
    print 'Ctrl-C aborts this server.'
    print
    print 'Test server log output follows:'
    print
    
    #@todo get host and port from command line arguments
    host = '127.0.0.1'
    port=8000
    debug=True;
    
    #start server
    srv=RpcPythonServer(host,port,debug)
    srv.serve_forever()

#============================================================================

if __name__=='__main__':
    main()

#============================================================================
