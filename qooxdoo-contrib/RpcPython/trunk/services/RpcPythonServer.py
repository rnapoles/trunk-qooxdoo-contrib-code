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
service in a file. If the service name is "foo.bar.baz", the class is named
"Baz" in the "foo.bar.baz" module, located in "services/foo/bar/baz.py". The 
class file is dynamically loaded when the request is received. The methods
are protected - they are only executed if the method contains the "public"
decorator.

=========================================================================='''

import sys
import qxjsonrpc
import qxjsonrpc.http

from qxjsonrpc import public, fail
from qxjsonrpc._error import *

# Add parent directory to pythonpath
sys.path.append("..")

#============================================================================

class RpcPythonServer(qxjsonrpc.http.HTTPServer):
    '''HTTP JSON-RPC server backend for qooxdoo and other json-rpc clients'''
    def __init__(self, host='127.0.0.1', port=8000, debug=True ):
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
        print name
        return self._get_class(name)
    
    # the following is adapted from http://code.activestate.com/recipes/223972/
    def _get_mod(self, modulePath):
        """Import a module programmatically"""
        print "module path: " + modulePath
        try:
            aMod = sys.modules[modulePath]
            if not isinstance(aMod, types.ModuleType):
                raise KeyError
        except KeyError:
            # The last [''] is very important!
            try:
                aMod = __import__(modulePath, globals(), locals(), [''])
                sys.modules[modulePath] = aMod
            except ImportError:
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