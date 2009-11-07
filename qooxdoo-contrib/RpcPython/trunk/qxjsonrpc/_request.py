#!/usr/bin/python
# -*- coding: ascii -*-
'''==========================================================================
qxjsonrpc - JSON-RPC backend for the qooxdoo JavaScript library

(C) 2007 - Viktor Ferenczi (python@cx.hu) - Licence: GNU LGPL

-----------------------------------------------------------------------------

This module provides the JSON-RPC Request class. The Request class is able
to load JSON-RPC requests from various formats. It processes the request,
then returns valid JSON-RPC response string. All exceptions are handled
and returned as valid JSON-RPC error responses, except for
KeyboardInterrupt. Exception tracebacks are dumped to the log.

This module is NOT intended for direct import. Import symbols from qxjsonrpc.

=========================================================================='''

import sys
import datetime
import traceback

from qxjsonrpc.json import *
from qxjsonrpc._error import *
from qxjsonrpc._access import *

#============================================================================
# Exported symbols

__all__=['PassRequestAttributeName', 'PassServiceAttributeName',
    'request', 'service', 'Request']

#============================================================================
# Constants

PassRequestAttributeName='_qxjsonrpc_pass_request_'
PassServiceAttributeName='_qxjsonrpc_pass_service_'

#============================================================================
# Decorators

def request(fn):
    '''Decorator to enable passing of Request object to methods.
    The method must have an argument named request.'''
    setattr(fn, PassRequestAttributeName, True)
    return fn

def service(fn):
    '''Decorator to enable passing of service object to session methods.
    The method must have an argument named service.'''
    setattr(fn, PassServiceAttributeName, True)
    return fn

#============================================================================

class Request(object):
    '''JSON-RPC request. Request object stores all important information
    about the request. References in the Request object connect the objects
    (server, client, session) required to handle the request. The handler
    method can receive the Request instance in it's request argument if
    decorated by the @request decorator. Session initiator methods should
    receive the Request instance, since the new session requires the Server
    instance can be easily get as request.server this way.
    
    Request objects can be reused to achieve better performance. The server
    can use one Request object for all requests from the same client on the
    same logical connection. It's not allowed to share Request objects
    between multiple threads, since they are not thread safe, no locking
    mechanism is implemented.
    
    The server's request handler must load request data by calling the
    load() or loadJSON() method of the Request instance. Then the request
    can be processed by calling the process() method. Finally the request
    object should be cleared by calling clear() on it. This is not required,
    but helps to prevent hard-to-debug errors and lower memory footprint.
    
    Request should not be subclassed, since this does only common JSON-RPC
    request handling not depending on specific transport or other parties.
    
    Request objects has human readable representation for easy logging and
    debugging. This is returned also as string form.
    
    Request attributes (defined as slots for better performance):
    
    - Set by the constructor, should not be changed later:
    
    server=reference to the Server object
    client=client address/identifier or None if the current transport
           does not support separate clients
    domain=domain address/identifier or None if the current transport
           does not support domains
    
    - Loaded for each request, then cleared:
    
    id=current request's ID or None if no request has been loaded
    service=service name
    method=method name or path with dots
    params=list or dictionary of parameters to be passed to the method or []
    data=server_data or None
    session=reference to the associated Session object or None if no session established'''
    __slots__=['server', 'client', 'domain', 'session', 'id', 'service', 'method', 'params', 'data']
    def __init__(self, server, client=None, domain=None):
        '''Initialize common request attributes.'''
        self.server=server # Server instance handling the request
        self.client=client # Client name/address or transport specific client info object or None
        self.domain=domain # Request's domain name if applicable to the current transport or None
        self.clear()       # No request specific data
    # Information methods
    def __str__(self):
        return repr(self)
    def __repr__(self):   
        attributes=[(k,getattr(self,k)) for k in self.__slots__]
        return '%s(%s)'%(self.__class__.__name__, ', '.join(['%s=%r'%(k,v) for k,v in attributes]))
    def hasSession(self):
        '''Check if the request has an associated session.'''
        return self.session is not None
    # Loaders
    def clear(self):
        '''Clear request data. Should be called after each request handling.'''
        self.id=None
        self.service=None
        self.method=None
        self.params=None
        self.data=None
        self.session=None
    def load(self, _decode_keys_=(), **kw):
        '''Load request from keyword arguments, optionally JSON decode some of them'''
        # Check for required request arguments
        for n in ('id', 'service', 'method'):
            if n not in kw:
                raise ServerError('Request does not contain %s!'%n)
        # JSON decode some arguments as requested
        for n in _decode_keys_:
            if n not in kw: continue
            try:
                kw[n]=decode(kw[n])
            except DecodeError,e:
                raise ServerError('Error decoding JSON request argument %r: %s'%(n,e))
        # Extract request arguments with defaults
        self.service=kw['service']
        self.method=kw['method']
        self.params=kw.get('params',[])
        self.data=kw.get('server_data')
        # Check type of request arguments (not method parameters)
        if not isinstance(self.service, basestring):
            raise ServerError('Service name is not a string: %r'%(self.service,))
        if not isinstance(self.method, basestring):
            raise ServerError('Method name is not a string: %r'%(self.method,))
        if not isinstance(self.params, (list, dict)):
            raise ServerError('Parameters passed are not in the form of list or dictionary: %r'%(self.params,))
        # Store request ID
        self.id=kw['id']
        if self.id is None:
            raise ServerError('Request ID cannot be None!')
    def loadJSON(self, json_request):
        '''Load request from JSON request string'''
        # Decode JSON request as Python object
        try:
            request=decode(json_request)
        except (DecodeError, ValueError),e:
            raise ServerError('Error decoding JSON request: %s'%e)
        # Ensure that all keys are string (Python does not allow
        # unicode keys when passing as keyword arguments)
        req={}
        for k,v in request.items():
            if isinstance(k, unicode):
                k=k.decode('ascii')
            req[k]=v
        # Load request
        self.load(**req)
    # Request processing
    def process(self):
        '''Process request, returns JSON-RPC response object (not JSON string).
        Always produces valid JSON-RPC response object, except when a
        System Exit or KeyboardInterrupt raised, since they are propagated.'''
        assert self.id is not None, 'Load request into this instance before processing!'
        try:
            service=self.server.getService(self.service)
            method=self.getMethod(service)
            result=self.callMethod(service, method)
        except (SystemExit, KeyboardInterrupt):
            # For python 2.4 compatibility
            raise
        except Error,e:
            self.server.logger.warning('REQUEST: %r'%self)
            response=dict(id=self.id, result=None, error=e.getJSONRPCError())
        except Exception,e:
            self.server.logger.error('REQUEST: %r\nINTERNAL SERVER ERROR [%s]: %s\nTRACEBACK:\n%s'%(self, e.__class__.__name__, e, traceback.format_exc()))
            e=ServerError('Internal server error.')
            response=dict(id=self.id, result=None, error=e.getJSONRPCError())
        else:
            response=dict(id=self.id, result=result, error=None)
            self.server.logger.info('REQUEST: %r'%self)
        self.server.logger.info('RESPONSE: %r'%response)
        try:
            response=encode(response)
        except (EncodeError, ValueError),e:
            e=ServerError('Error JSON encoding response: %s'%e)
            response=dict(id=self.id, result=None, error=e.getJSONRPCError())
            response=encode(response)
        return response
    def getMethod(self, service):
        '''Get method (function object) by method name.'''
        name=self.method
        if '.' in name:
            name=name.split('.')
            if name[0]=='__session__':
                service=self.session
                if service is None:
                    raise MethodNotFoundError('Calling session method while no valid session initiated: %s'%(self.method,))
                del name[0]
            for clsname in name[:-1]:
                try:
                    service=getattr(service, clsname)
                except AttributeError:
                    raise ClassNotFoundError('Class %r not found when searching for method %r in service %r!'%(clsname, self.method, self.service))
            name=name[-1]
        try:
            return getattr(service, name)
        except AttributeError:
            raise MethodNotFoundError('Method %r not found in service %r!'%(self.method, self.service))
    def callMethod(self, service, method):
        '''Call requested method, returns result.'''
        # Check if access is allowed
        access_checkers=getMethodAccessCheckers(method)
        for access_checker in access_checkers:
            if not access_checker(method, self):
                raise PermissionDeniedError('Access denied.')
        # Check if method is callable
        if not callable(method):
            raise MethodNotFoundError('Method %r in service %r is not callable!'%(self.method, self.service))
        # Build positional and keyword arguments passed to the method
        if isinstance(self.params, list):
            params=self.params
            kw={}
        else:
            params=[]
            kw=self.params # NOTE: Does not copy parameters to save time. This is not a bug, since params are used only once for each request.
        # Pass request if the method has the request decorator (method must have an argument named request)
        if getattr(method, PassRequestAttributeName, False):
            kw['request']=self
        # Pass service if the method has the service decorator (method must have an argument named service)
        if getattr(method, PassServiceAttributeName, False):
            if self.session is None:
                kw['service']=service
            else:
                kw['service']=self.session.service
        # Pass session if the method requires a valid session (method must have an argument named session)
        if getattr(method, PassSessionAttributeName, False):
            kw['session']=self.session
        # Call method with error handling
        try:
            return method(*params, **kw)
        except (SystemExit, KeyboardInterrupt):
            # For python 2.4 compatibility
            raise
        except Exception,e:
            self.server.logger.error('REQUEST: %r\nAPPLICATION ERROR [%s]: %s\nTRACEBACK:\n%s'%(self, e.__class__.__name__, e, traceback.format_exc()))
            raise ApplicationError(str(e))

#============================================================================
