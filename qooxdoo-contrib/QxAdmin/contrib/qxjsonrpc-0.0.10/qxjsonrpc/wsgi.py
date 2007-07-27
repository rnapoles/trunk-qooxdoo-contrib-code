#!/usr/bin/python
# -*- coding: ascii -*-
'''==========================================================================
qxjsonrpc - JSON-RPC backend for the qooxdoo JavaScript library

(C) 2007 - Viktor Ferenczi (python@cx.hu) - Licence: GNU LGPL

-----------------------------------------------------------------------------

WSGI JSON-RPC server.

Import this module from the qxjsonrpc package if WSGI is required.

=========================================================================='''

import cgi
import Cookie

from qxjsonrpc._error import *
from qxjsonrpc._server import Server
from qxjsonrpc._request import Request

#============================================================================
# Exported symbols

__all__=['WSGIApplication']

#============================================================================

class WSGIApplication(Server):
    '''JSON-RPC server application for WSGI'''
    _CookieNamePrefix='qxjsonrpc_'
    _DefaultCookieName='session_id'
    def __call__(self, environ, start_response):
        '''Handle WSGI request'''
        req=Request(self, environ['REMOTE_ADDR'], environ['HTTP_HOST'])
        method=environ['REQUEST_METHOD']
        if method=='GET':
            return self.do_GET(req, environ, start_response)
        elif method=='POST':
            return self.do_POST(req, environ, start_response)
        else:
            start_response("400 Bad request", [])
            return []
    def do_GET(self, req, environ, start_response):
        '''Handle GET request. Can handle normal GET requests and the ScriptTransport protocol.'''
        try:
            # Load session if applicable
            self.loadSession(req, environ)
            loadedSession=req.session
            # Parse query string
            query=cgi.parse_qs(environ['QUERY_STRING'], True)
            for k in query:
                query[k]=query[k][0]
            # Expand ScriptTransport arguments if any
            scriptTransportID=query.pop('_ScriptTransport_id', None)
            scriptTransportData=query.pop('_ScriptTransport_data', None)
            # Determine transport type
            if scriptTransportID and scriptTransportData:
                # ScriptTransport, JSON encoded request object is in _ScriptTransport_data
                if self.debug:
                    self.logger.info('Transport: HTTP GET - ScriptTransport')
                req.loadJSON(scriptTransportData)
                response=req.process()
                # Encode qooxdoo specific ScriptTransport response
                response='qx.io.remote.ScriptTransport._requestFinished(%s,%s);'%(scriptTransportID,response)
            else:
                # Request is defined as queryvariables, params and server_data are JSON encoded
                if self.debug:
                    self.logger.info('Transport: HTTP GET - Query variables')
                req.load(('id','params','server_data'), **query)
                response=req.process()
            # Send response to the client
            self.startResponse(response, loadedSession, req, start_response)
            return [response]
        except ServerError,e:
            start_response('400 [%s]: %s'%(e.__class__.__name__, e), [])
            return []
        except Exception,e:
            start_response('500 Internal server error', [])
            raise            
    def do_POST(self, req, environ, start_response):
        '''Handle POST request'''
        try:
            # Load session if applicable
            self.loadSession(req, environ)
            loadedSession=req.session
            # FIXME - REQUIRED???: Request continue if protocol is HTTP/1.1
            #if 'HTTP/1.1' == self.protocol_version and self.headers.get('Expect','').lower()=='100-continue':
            #    self.wfile("HTTP/1.1 100 Continue\r\n\r\n")
            # Read POST data
            content_length=int(environ['CONTENT_LENGTH'])
            if content_length<1:
                start_response('400 No Content-Length header or zero length specified!', [])
                return
            form_data=environ['wsgi.input'].read(content_length)
	    # Form data contains direct JSON data?
	    if form_data[:1]=='{' and form_data[-1:]=='}':
		# Form data contains JSON
		form=dict(_data_=form_data)
	    else:
                # Parse POST data as query string and extract request arguments
	        form=cgi.parse_qs(form_data, True)
    		for k in form:
            	    form[k]=form[k][0]
            # Determine transport type
            if '_data_' in form:
                # JSON encoded request object in the _data_ variable
                if self.debug:
                    self.logger.info('Transport: HTTP POST - JSON from the _data_ variable')
                req.loadJSON(form['_data_'])
            elif 'id' in form and 'service' in form and 'method' in form:
                # Request is defined as form variables, params and server_data are JSON encoded
                if self.debug:
                    self.logger.info('Transport: HTTP POST - Distinct variables')
                request=dict([(k,form[k]) for k in ('id','service','method','params','server_data') if k in form])
                req.load(('id','params','server_data'), **request)
            else:
                self.logger.warning('Invalid form contents in POST request: %r'%form)
                raise UnknownError('Invalid form contents!')
            # Handle request
            response=req.process()
            # Send response to the client
            self.startResponse(response, loadedSession, req, start_response)
            return [response]
        except ServerError,e:
            start_response('400 [%s]: %s'%(e.__class__.__name__, e), [])
            return []
        except Exception,e:
            start_response('500 Internal server error', [])
            raise            
    def loadSession(self, req, environ):
        '''Load session into current request'''
        separator=self.getSessionCookieName()+'='
        for h in environ.get('HTTP_COOKIE','').split(' '):
            h=h.split(separator,1)
            if len(h)==2:
                sessionID=h[1].strip()
                if not req.server.hasSession(sessionID): break
                self.logger.info('SESSION ID FROM COOKIE: %s'%sessionID)
                req.session=req.server.getSession(sessionID)
                return
        req.session=None
    def startResponse(self, response, loadedSession, req, start_response):
        '''Send response to the client.'''
        if loadedSession is not req.session:
            # Session created/deleted (changed), so sending new session cookie
            cookie=self.sendSessionCookie(req)
        else: cookie=[]
        start_response('200 OK', cookie+[
            ('Content-type', 'text/plain'),
            ('Content-encoding', 'UTF-8'),
            ('Content-Length', str(len(response))),
        ])
    def getSessionCookieName(self):
        '''Returns the name of the session cookie'''
        return self._CookieNamePrefix+(self.domain or self._DefaultCookieName)
    def sendSessionCookie(self, req):
        '''Send session cookie to the client.'''
        cookie=Cookie.Morsel()
        cookie.key=self.getSessionCookieName()
        if req.session is None:
            cookie.coded_value=''
        else:
            cookie.coded_value=req.session.getSessionID()
        self.logger.info('SETTING SESSION COOKIE: %s'%cookie.OutputString())
        return [
            ('Cache-control', 'no-cache="set-cookie"'),
            ('Set-Cookie', cookie.OutputString()),
        ]

#============================================================================
