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

import sys, os
import qxjsonrpc
import qxjsonrpc.http
from qxjsonrpc import public, fail
from qxjsonrpc._error import *
from qxjsonrpc._access import *
from inspect import getargspec, getdoc

class JsonRpcServer(qxjsonrpc.http.HTTPServer):
    '''HTTP JSON-RPC server backend for qooxdoo and other json-rpc clients'''
    
    # attribute which caches the service objects
    serviceObjects = {}
    
    def __init__(self, host='127.0.0.1', port=8000, debug=True):
        qxjsonrpc.http.HTTPServer.__init__(self, host, port, debug=debug)
        
    def getService(self,name):
        '''Overridden method to allow call-time importation of service classes.
            We convert the rpc service 'my.very.special.service' into the 
            python import path 'my.very.special.service.Service'
        '''
        
        # special service names
        if name == "system":
            name = "qxjsonrpc.services.system"
        
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
    
    def _get_class(self, fullClassName):
        """Retrieve a class object from a full dotted-package name."""
        
        # Parse out the path, module, and function
        lastDot = fullClassName.rfind(u".")
        if lastDot is not -1:
            className = fullClassName[lastDot + 1:]
            modPath = fullClassName[:lastDot]
        else:
            className = fullClassName
            modPath = fullClassName
            
        aMod = self._get_mod(modPath)
        aClass = getattr(aMod, className)

        # Assert that the function is a *callable* attribute.
        assert callable(aClass), u"%s is not callable." % fullClassName
                
        # check access: service class is instance of qxjsonrpc.server.JsonRpcService
        if not issubclass( aClass, JsonRpcService ):
            raise ServiceNotFoundError('%r is not a RPC service!'%(modPath,))        
        
        # Return a reference to the function itself,
        # not the results of the function.
        return aClass
        
    def _get_mod(self, modulePath):
        """Import a module programmatically"""
        try:
            aMod = sys.modules[modulePath]
        except KeyError:
            # The last [''] is very important!
            try:
                aMod = __import__(modulePath, globals(), locals(), [''])
                sys.modules[modulePath] = aMod
            except ImportError, e:
                raise ServiceNotFoundError('Service %r not found!'%(modulePath,))
        return aMod
    
    def addServicePath(self, servicePath):
        '''Adds a path to a directory containing service class files'''
        sys.path.append( servicePath )


class JsonRpcService(object):
    '''Superclass from which classes which contain service methods
    must inherit.''' 
    
class ServiceIntrospection(object):
    
    @public
    def listMethods(self):
        '''This method returns a list of the methods the server has, by name. There are no parameters.
        The result is an array of strings. The value of each element is the name of a method that the service 
        implements. The introspection methods are not excluded.'''
        methodList = [method for method in dir(self) if callable(getattr(self, method))]
        result = [];
        for method in methodList:
            access_checkers=getMethodAccessCheckers(getattr(self, method))
            for access_checker in access_checkers:
                if access_checker(method, self):
                    result.append(method)
        return result
    
    @public
    def methodSignature(self,method):
        '''This method returns a description of the argument format a particular method expects. 
        The method takes one parameter, a string. Its value is the name of the method about which 
        information is being requested. The result is an array, with each element representing one 
        method signature. The array is a list of the signatures of the method. There are no 
        duplicate signatures. 
        The array entry that represents a signature is an array of strings, with at least one element. 
        The first element tells the type of the method's result. The rest tell the types of the method's
        parameters, in order. If there is no information on the return value or the parameters part 
        of the signature, the server returns a 'null' value for the return type, or the parameters, 
        respectively. Thus, the minimum response on a method that the server doesn't know anything 
        about will be [null,null]. Each of these strings identifies a type by the javascript type that 
        for it that would be returned by the javascript 'typeof' keyword, with the exception of 
        the 'Array' type, which has a typeof 'object' in javascript, but returns the string 'array'.
        The RPC fails if the server does not have a method by the indicated name, or 
        does not want to admit that it does. But if the method name appears in the response to 
        listMethods, the RPC does not fail this way.
        
        Currently not implemented for RpcPython
        '''
        # @todo S
        # getargspec(getattr(self,method))[0][1:]
        return [ None, None ] 
    
    @public
    def methodHelp(self,method):
        '''This method returns a text description of a particular method. The method takes one parameter, an string. 
        Its value is the name of the method about which information is being requested. The result is a string. 
        The value of that string is a text description, for human use, of the method in question.'''
        return getdoc(getattr(self,method))