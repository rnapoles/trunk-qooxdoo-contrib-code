#!/usr/bin/python
# -*- coding: ascii -*-
'''==========================================================================
qxjsonrpc - JSON-RPC backend for the qooxdoo JavaScript library

(C) 2007 - Viktor Ferenczi (python@cx.hu) - Licence: GNU LGPL

-----------------------------------------------------------------------------

This module provides access control constants and decorators.

According to the Apache httpd manual:

http://httpd.apache.org/docs/1.3/howto/auth.html

--- ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---
"Apache has three distinct ways of dealing with the question of whether a
particular request for a resource will result in that resource actually be
returned. These criteria are called Authorization, Authentication, and
Access control.

Authentication is any process by which you verify that someone is who they
claim they are. This usually involves a username and a password, but can
include any other method of demonstrating identity, such as a smart card,
retina scan, voice recognition, or fingerprints. Authentication is
equivalent to showing your drivers license at the ticket counter at
the airport.

Authorization is finding out if the person, once identified, is permitted
to have the resource. This is usually determined by finding out if that
person is a part of a particular group, if that person has paid admission,
or has a particular level of security clearance. Authorization is
equivalent to checking the guest list at an exclusive party, or checking
for your ticket when you go to the opera.

Finally, access control is a much more general way of talking about
controlling access to a web resource. Access can be granted or denied
based on a wide variety of criteria, such as the network address of the
client, the time of day, the phase of the moon, or the browser which the
visitor is using. Access control is analogous to locking the gate at closing
time, or only letting people onto the ride who are more than 48 inches
tall - it's controlling entrance by some arbitrary condition which may or
may not have anything to do with the attributes of the particular visitor."
--- ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---  ---

The JSON-RPC server itself does not provide any fixed authentication or
authorization scheme, however the session support allows easy implementation
of them. Sessions can be started manually or automatically if supported by
the transport currently used.

Authentication should be done by the application (service) before the client
tries to access protected content. Application should start a session and
store data about the authenticated user. Authorization should be based on
session data and application specific authorization rules.

Access control can be used to allow or deny calling of methods. Undecorated
methods cannot be called by the JSON-RPC clients. All externally accessible
methods must be marked with access control decorators. Default decorators
specify basic access rights:

public  : any client can call this method
domain  : clients from the same domain as the request's server can call
session : clients with a valid session can call this method
fail    : the method cannot be called (access denied)

Complex access rights depending on authenticated user, the client's address
or anything else can be added by providing a simple access check function,
such as:

def isAdmin(method, request):
    """Access granted only for administrators"""
    session=request.session
    if session is None: return False
    return session.user.admin

Usage:

@access(isAdmin)
def anAdminMethod(...):
    ...

Access checkers can be chained by simply using more decorators. Access is
granted if all checkers allow it. For example

@domain
@access(isAdmin)
def anAdminMethodForThisDomain(...):
    ...
    
Methods can be temporarily disabled this way (for debugging, etc.):

@fail
@all_other_decorators
def fn(...):
    ...

This module is NOT intended for direct import. Import symbols from qxjsonrpc.

=========================================================================='''
# Exported symbols

__all__=['MethodAccessibility', 'PassSessionAttributeName',
    'getMethodAccessCheckers', 'access', 'public', 'domain', 'session', 'fail']

#============================================================================
# Constants

class MethodAccessibility:
    '''Method Accessibility values'''
    @staticmethod
    def Public(method, request):
        return True
    @staticmethod
    def Domain(method, request):
        return request.domain is None or request.domain==request.server.domain
    @staticmethod
    def Session(method, request):
        return request.session is not None
    @staticmethod
    def Fail(method, request):
        return False
    # Default accessibility for undecorated methods
    default = Fail

#----------------------------------------------------------------------------
# Method attribute names for the access checker list and session passing

MethodAccessCheckersAttributeName='_qxjsonrpc_access_checkers_'
PassSessionAttributeName='_qxjsonrpc_pass_session_'

#----------------------------------------------------------------------------

def getMethodAccessCheckers(method, default=[MethodAccessibility.default]):
    '''Get access checker function of the passed method'''
    return getattr(method, MethodAccessCheckersAttributeName, default)

#============================================================================
# Function decorators to define method accessibility

def access(access_checker):
    '''Generic decorator to define method accessibility.
    access_checker=function with args (method, request) that returns True if
    access is granted to the passed method for the request specified'''
    def f(fn):
        # Add access checker list if not defined
        if not hasattr(fn, MethodAccessCheckersAttributeName):
            setattr(fn, MethodAccessCheckersAttributeName, [])
        # Append this checker to the list
        getattr(fn, MethodAccessCheckersAttributeName).append(access_checker)
        return fn
    return f

#----------------------------------------------------------------------------

'''The decorated method may be called from any session, and without any
checking of who the referer is. Access is granted.'''
public=access(MethodAccessibility.Public)

#----------------------------------------------------------------------------

'''The method may only be called by a referer with the same domain value
as the running server. Some transports may not support domains. If
domains are not supported, then access is granted.'''
domain=access(MethodAccessibility.Domain)

#----------------------------------------------------------------------------

'''The referer must match the referer of the very first RPC request
issued during the current session. If sessions are not supported or
cannot be initiated, then access is denied.'''
def session(fn):
    setattr(fn, PassSessionAttributeName, True)
    return access(MethodAccessibility.Session)(fn)

#----------------------------------------------------------------------------

'''Access is explicitly denied.'''
fail=access(MethodAccessibility.Fail)

#============================================================================
