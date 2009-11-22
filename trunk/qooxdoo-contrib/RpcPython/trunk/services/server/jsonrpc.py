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
#     LGPL: http://www.gnu.org/licenses/lgpl.html
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
if the method contains the "public" decorator.

=========================================================================='''

import sys
import qxjsonrpc
import qxjsonrpc.http
from qxjsonrpc import public, fail
from qxjsonrpc._error import *

#============================================================================

class JsonRpcServer(qxjsonrpc.http.HTTPServer):
    '''HTTP JSON-RPC server backend for qooxdoo and other json-rpc clients'''
    
    serviceObjects = {}
    
    def __init__(self, host='127.0.0.1', port=8000, debug=True):
        qxjsonrpc.http.HTTPServer.__init__(self, host, port, debug=debug)
        
    def getService(self,name):
        '''Overridden method to allow call-time importation of service classes.
            We convert the rpc service 'my.very.special.service' into the 
            python import path 'my.very.special.service.Service'
        '''
        # Parse out the last part of the service path
        lastDot = name.rfind(u".")
        if lastDot is not -1:
            lastPart = name[lastDot + 1:]
        else:
            lastPart = name
            
        # Add the capitalized part to the class name 
        name = name + "." + lastPart.capitalize()
        
        # Create an instance of the class if not already created
        try: 
            serviceObject = self.serviceObjects[name]
        except KeyError:
            serviceObject = self._get_class(name)() 
            self.serviceObjects[name] = serviceObject
            
        # return the instance
        return serviceObject
    
    # the following is adapted from http://code.activestate.com/recipes/223972/
    def _get_mod(self, modulePath):
        """Import a module programmatically"""
        try:
            aMod = sys.modules[modulePath]
        except KeyError:
            # The last [''] is very important!
            try:
                aMod = __import__(modulePath, globals(), locals(), [''])
                print "Importing " + modulePath
                sys.modules[modulePath] = aMod
                if getattr( aMod, "isRpcService",None) is None:
                    raise ServiceNotFoundError('%r is not a RPC service!'%(modulePath,))
            except ImportError, e:
                raise ServiceNotFoundError('Service %r not found!'%(modulePath,))
        return aMod
    
    def _get_func(self, fullFuncName):
        """Retrieve a function object from a full dotted-package name."""
        
        # Parse out the path, module, and function
        lastDot = fullFuncName.rfind(u".")
        if lastDot is not -1:
	        funcName = fullFuncName[lastDot + 1:]
	        modPath = fullFuncName[:lastDot]
        else:
            funcName = fullFuncName
            modPath = fullFuncName
            
        aMod = self._get_mod(modPath)
        aFunc = getattr(aMod, funcName)
        
        # Assert that the function is a *callable* attribute.
        assert callable(aFunc), u"%s is not callable." % fullFuncName
        
        # Return a reference to the function itself,
        # not the results of the function.
        return aFunc
    
    def _get_class(self, fullClassName):
        """Load a module and retrieve a class (NOT an instance).
        """
        aClass = self._get_func(fullClassName)
        
        # Return a reference to the class itself, not an instantiated object.
        return aClass    