#!/usr/bin/python
# -*- coding: ascii -*-
#############################################################################
#
#   RpcPython
#
#   http://qooxdoo.org/contrib/project#rpcpython
#
#   Copyright:
#      
#
#   License:
#     LGPL: http:/f/www.gnu.org/licenses/lgpl.html
#     EPL: http://www.eclipse.org/org/documents/epl-v10.php
#     See the LICENSE file in the project's top-level directory for details.
#
#   Authors:
#     * Viktor Ferenczi (python@cx.hu)
#     * Christian Boulanger (cboulanger)
#
#############################################################################

'''==========================================================================

This is the main server that listens for requests, imports service classes
and calls the service methods. It receives a service name in dot-separated path 
format and expect to find the class containing the service in a file. 
If the service name is "foo.bar.baz", the class is named "Baz" in the 
"foo.bar.baz" module, located in "foo/bar/baz.py" somewhere on the python
class path. The class file is dynamically loaded when the request is received. 
The classes and methods are protected. The service class is loaded only if
the containing module contains the "isRpcService" property set to True and
if the method contains the  "public" decorator.

=========================================================================='''

import sys
import os
import qxjsonrpc
from server.jsonrpc import JsonRpcServer

# Add "class" subdirectory to pythonpath
service_class_path = os.path.dirname(os.path.abspath(__file__)) + "/class"
sys.path.append( service_class_path )

def main():
    '''Run json-rpc server.'''
    print 'Running: qxjsonrpc %s'%qxjsonrpc.__version__.number 
    print
    print 'Debugging output is enabled in the test server, watch stdout.'
    print
    print 'Ctrl-C aborts this server.'
    print
    print 'Server log output follows:'
    print
    
    #@todo get host and port from command line arguments
    host = '127.0.0.1'
    port=8000
    debug=True;
    
    #start server
    srv=JsonRpcServer(host,port,debug)
    srv.serve_forever()

#============================================================================

if __name__=='__main__':
    main()

#============================================================================
