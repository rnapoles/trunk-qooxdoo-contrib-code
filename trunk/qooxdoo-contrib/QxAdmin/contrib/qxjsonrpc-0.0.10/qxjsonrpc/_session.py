#!/usr/bin/python
# -*- coding: ascii -*-
'''==========================================================================
qxjsonrpc - JSON-RPC backend for the qooxdoo JavaScript library

(C) 2007 - Viktor Ferenczi (python@cx.hu) - Licence: GNU LGPL

-----------------------------------------------------------------------------

This module provides the JSON-RPC Session class. The Session class handles
user sessions in a transport-independent way. Sessions are managed by the
Server instance. The server is responsible to restore the session for each
request (for example by the session ID read from a cookie or by the
client's address if applicable). The server must silently drop invalid
session cookies such as non existent or malformed session IDs. At most a
WARNING may be issued to the log. In this case the request won't have a
valid session (None session is used).

This module is NOT intended for direct import. Import symbols from qxjsonrpc.

=========================================================================='''

from time import time
from weakref import proxy

from qxjsonrpc._common import *

#============================================================================
# Exported symbols

__all__=['SessionStorage', 'Session']

#============================================================================

class SessionStorage(expirable_dict):
    '''Session storage. This implementation stores Session instances in
    memory. Subclasses can implement other storage mechanisms by overriding
    __getitem__ or using proxy objects in place of externally stored
    sessions.'''

#============================================================================

class Session(object):
    '''Session base class. Application session should be a subclass ot this
    class and implement their own behaviour. Subclassing is not neccessary if
    the application want to store only session attributes without additional
    functionality. Session instance is created by the session intiator
    request handler, typically the method handles the response from the login
    dialog if the username and password passed the authenticity test.
    Sessions with very long lifetime can be used to store user specific
    settings independently of the authentication status (anonymous or
    authenticated user). For example the current page or form contents.
    Session objects should be pickleable to enable long term session storage.
    It requires extra care if your session has external dependencies such as
    references to open files or database records. Please try to avoid it or
    implement the pickle protocol as described in the python manual.
    Try to avoid large sessions, since it can easily overload the server.
    Do not store data that can be read from other sources in no time, such
    as database recordsets, static file contents, images, detailed user
    information or so. Try to stick to the minimum amount of data required.'''
    _maxidletime=1800 # Default maximum IDLE time in seconds
    _maxlifetime=86400 # Default maximum session lifetime in seconds
    def __init__(self, server, service, maxidletime=None, maxlifetime=None):
        '''Initialize session. Generates new session ID and registers the
        session at the server. Holds only weak reference to the server,
        since the session storage in the server holds a real reference to
        this instance. This prevents the reference loop, therefore possible
        memory leakage.
        server=Server instance
        service=Session initiator service
        maxidle=maximum IDLE time in seconds
        maxlifetime=maximum session lifetime in seconds'''
        self.__server=proxy(server)
        self.__service=proxy(service)
        self.__sessionID=uuid()
        self.__starttime=self.__lastusedtime=time()
        self.__maxidletime=maxidletime or self._maxidletime
        self.__maxlifetime=maxlifetime or self._maxlifetime
        server.registerSession(self)
    # Read-only server property
    def getServer(self):
        return self.__server
    server=property(getServer)
    # Read-only service property
    def getService(self):
        return self.__service
    service=property(getService)
    # Information methods
    def getSessionID(self):
        '''Returns the session ID. This is a unique string of at most
        32 printable ASCII characters that identifies this session.'''
        return self.__sessionID
    def getStartTime(self):
        '''Returns the time when the session is started'''
        return self.__starttime
    def getLastUsedTime(self):
        '''Returns the time when the session is last used'''
        return self.__lastusedtime
    def getMaxIdleTime(self):
        '''Returns the maximum idle time of this session'''
        return self.__maxidletime
    def getMaxLifetime(self):
        '''Returns the maximum lifetime of this session'''
        return self.__maxlifetime
    def getExpirationTime(self):
        '''Get time of expiration'''
        return min(self.__lastusedtime+self.__maxidletime, self.__starttime+self.__maxlifetime)
    # Session timing
    def resetLastUsedTime(self):
        '''Restart last used time to now.'''
        self.__lastusedtime=time()
    def setMaxIdleTime(self, seconds):
        '''Sets the maximum IDLE time in seconds.'''
        self.__maxidletime=seconds
    def setMaxLifetime(self, seconds):
        '''Sets the maximum lifetime in seconds.'''
        self.__maxlifetime=seconds
    # Session management
    def endSession(self):
        '''End the session by unregistering it from the server. This will
        remove the session cookie from the client if the current transport
        uses one. The session cookie will not be removed if the connection
        is terminated before the client handles the response or the client
        mishandles the clear cookie request.'''
        self.server.unregisterSession(self)

#============================================================================
