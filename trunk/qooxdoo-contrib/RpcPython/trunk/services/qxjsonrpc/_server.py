#!/usr/bin/python
# -*- coding: ascii -*-
'''==========================================================================
qxjsonrpc - JSON-RPC backend for the qooxdoo JavaScript library

(C) 2007 - Viktor Ferenczi (python@cx.hu) - Licence: GNU LGPL

-----------------------------------------------------------------------------

This module provides the JSON-RPC Server class. The Server class handles
service registration and administration, stores flags and manages sessions.

This module is NOT intended for direct import. Import symbols from qxjsonrpc.

=========================================================================='''

import logging

from qxjsonrpc._error import *
from qxjsonrpc._session import SessionStorage

#============================================================================
# Exported symbols

__all__=['Server']

#============================================================================

class Server(object):
    '''Base class for JSON-RPC servers. Servers implementing specific
    transports are subclassed from this class. The subclass should implement
    some kind of infinite serving loop or another mechanism to receive
    requests from JSON-RPC clienst. The server can optionally have a domain
    name that can be checked against requests to prevent cross-domain
    scripting attacks possible with some transports (for example HTTP).'''
    _sessions_class=SessionStorage # Session storage class
    _maximum_session_count=10000 # Maximum number of parallel sessions
    def __init__(self, domain=None, logger=None, debug=False):
        '''Initialize server.
        domain=domain name or None if no domains are supported
        logger=logger object compatible with the logging standard module or
            None for default logging to stdout
        debug=enable debug log output'''
        self.domain=domain # Domain identifier or None if not applicable
        self.debug=debug   # Debug flag to enable debug output
        self.services={}   # Service map: associates service names to service objects
        self.sessions=self._sessions_class()
        if logger is None:
            self.logger=logging.getLogger(domain or '')
            self.logger.addHandler(logging.StreamHandler())
        else:
            self.logger=logger
    # Information methods
    def getDomain(self):
        '''Get the domain identifier associated for this server.
        Returns a string or None if no domains are supported.'''
        return self.domain
    # Service management
    def setService(self, name, service):
        '''Associate a service object with a name. There are no requirements
        about the class of the service object. It have not been derived from
        a specific base class. However all of it's publicly callable methods
        must be decorated by access control decorators. If a service exists
        with the name specified the old service will be replaced by the
        new one.
        name=name of the service
        service=service object'''
        self.services[name]=service
    def getService(self, name):
        '''Get a service object by name. Raises ServiceNotFoundError if no
        service can be found by the name specified.
        name=name of the service'''
        try:
            return self.services[name]
        except KeyError:
            raise ServiceNotFoundError('Service %r not found!'%(name,))
    def removeService(self, name):
        '''Remove a service by name. Raises ServiceNotFoundError if no
        service can be found by the name specified.
        name=name of the service'''
        try:
            del self.services[name]
        except KeyError:
            raise ServiceNotFoundError('Service %r not found!'%(name,))
    # Session management
    def registerSession(self, session):
        '''Register new session by it's unique session ID. Automatically
        called by the constructor of the Session class when a new Session
        instance is created, no additional care required.
        session=the Session instance to register, session ID is read from it'''
        # Cleanup expired session to save memory
        self.sessions.cleanup()
        # Limit the number of parallel sessions
        sessionID=session.getSessionID()
        if len(self.sessions)>=self._maximum_session_count and sessionID not in self.sessions:
            raise MemoryError('Reached maximum number (%d) of parallel sessions.'%self._maximum_session_count)
        # Store the session into the session storage
        assert sessionID not in self.sessions, 'A session is already registered with this session ID: %s'%(sessionID,)
        self.sessions[sessionID]=session
    def hasSession(self, sessionID):
        '''Return True if this server has a session with the session ID secified.'''
        return sessionID in self.sessions
    def getSession(self, sessionID):
        '''Retrieves an existing session by session ID.
        Raises UnknownError if no session found.'''
        try:
            # Get session
            session=self.sessions[sessionID]
            # Safety check, just for sure that the session ID is not tampered in the object
            # FIXME: This assert can be commented out for better performance.
            assert session.getSessionID()==sessionID, 'Session ID mismatch: sessionID=%r, session.getSessionID() returns: %r'%(sessionID, session.getSessionID)
            # Update last used and expire times
            session.resetLastUsedTime()
            self.sessions.expire(sessionID, session.getExpirationTime())
            return session
        except KeyError:
            raise UnknownError('Session not found with ID: %r'%(sessionID,))
    def unregisterSession(self, session):
        '''Unregister a session. Session ID is read from the session object.
        Raises UnknownError if the session has not been registered.'''
        sessionID=session.getSessionID()
        try:
            del self.sessions[sessionID]
        except KeyError:
            raise UnknownError('Session not found with ID: %r'%(sessionID,))
    def cleanupExpiredSessions(self):
        '''Cleanup (unregister) expired sessions to save memory and
        automatically logout idle users, etc. This should be called once in
        a few minutes.'''
        self.sessions.cleanup()

#============================================================================
