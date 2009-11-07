#!/usr/bin/python
# -*- coding: ascii -*-
'''==========================================================================
qxjsonrpc - JSON-RPC backend for the qooxdoo JavaScript library

(C) 2007 - Viktor Ferenczi (python@cx.hu) - Licence: GNU LGPL

-----------------------------------------------------------------------------

HTTP JSON-RPC server.
Uses the BaseHTTPServer standard library module.

Import this module from the qxjsonrpc package if HTTP is required.

=========================================================================='''

import cgi
import Cookie
import urlparse
from BaseHTTPServer import HTTPServer as BaseHTTPServer
from BaseHTTPServer import BaseHTTPRequestHandler

from qxjsonrpc._error import *
from qxjsonrpc._server import Server
from qxjsonrpc._request import Request

#============================================================================
# Exported symbols

__all__=['HTTPRequestHandler', 'HTTPServer']

#============================================================================

class HTTPRequestHandler(BaseHTTPRequestHandler):
    '''JSON-RPC request handler for HTTP'''
    _CookieNamePrefix='qxjsonrpc_'
    _DefaultCookieName='session_id'
    def __init__(self, request, client_address, server):
        '''Initialize request handlers'''
        self.req=Request(server, client_address, server.domain)
        BaseHTTPRequestHandler.__init__(self, request, client_address, server)
    def do_GET(self):
        '''Handle GET request. Can handle normal GET requests and the ScriptTransport protocol.'''
        try:
            # Determine request domain
            self.req.domain=self.headers.get('host', None)
            # Load session if applicable
            self.loadSession()
            loadedSession=self.req.session
            # Parse URL
            url=urlparse.urlparse(self.path)
            query=cgi.parse_qs(url[4], True)
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
                self.req.loadJSON(scriptTransportData)
                response=self.req.process()
                # Encode qooxdoo specific ScriptTransport response
                response='qx.io.remote.ScriptTransport._requestFinished(%s,%s);'%(scriptTransportID,response)
            else:
                # Request is defined as queryvariables, params and server_data are JSON encoded
                if self.debug:
                    self.logger.info('Transport: HTTP GET - Query variables')
                self.req.load(('id','params','server_data'), **query)
                response=self.req.process()
            # Send response to the client
            self.sendResponse(response, loadedSession)
        except ServerError,e:
            self.send_error(400, '[%s]: %s'%(e.__class__.__name__, e))
        except Exception,e:
            self.send_error(500, 'Internal server error')
            raise
    def do_POST(self):
        '''Handle POST request'''
        try:
            # Determine request domain
            self.req.domain=self.headers.get('host', self.req.server.domain)
            # Load session if applicable
            self.loadSession()
            loadedSession=self.req.session
            # Request continue if protocol is HTTP/1.1
            if 'HTTP/1.1' == self.protocol_version and self.headers.get('expect','').lower()=='100-continue':
                self.wfile("HTTP/1.1 100 Continue\r\n\r\n")
            # Read POST data
            content_length=int(self.headers.get('content-length','0'))
            if content_length<1:
                send_error('400', 'No Content-Length header or zero length specified!')
                return
            form_data=self.rfile.read(content_length)
            # Form data contains direct JSON data?
            if form_data[:1]=='{' and form_data[-1:]=='}':
                # Form data contains JSON
                form=dict(_data_=form_data)
	    else:
                # Parse POST data as query string and extract request arguments
                form=cgi.parse_qs(form_data, True)
                for k in form:
                    form[k]=form[k][0]																		    
            # Parse POST data and extract request arguments
            form=cgi.parse_qs(form_data, True)
            for k in form:
                form[k]=form[k][0]
            # Determine transport type
            if '_data_' in form:
                # JSON encoded request object in the _data_ variable
                if self.debug:
                    self.logger.info('Transport: HTTP POST - JSON from the _data_ variable')
                self.req.loadJSON(form['_data_'])
            elif 'id' in form and 'service' in form and 'method' in form:
                # Request is defined as form variables, params and server_data are JSON encoded
                if self.debug:
                    self.logger.info('Transport: HTTP POST - Distinct variables')
                request=dict([(k,form[k]) for k in ('id','service','method','params','server_data') if k in form])
                self.req.load(('id','params','server_data'), **request)
            else:
                self.logger.warning('Invalid form contents in POST request: %r'%form)
                raise UnknownError('Invalid form contents!')
            # Handle request
            response=self.req.process()
            # Send response to the client
            self.sendResponse(response, loadedSession)
        except ServerError,e:
            self.send_error(400, '[%s]: %s'%(e.__class__.__name__, e))
        except Exception,e:
            self.send_error(500, 'Internal server error')
            raise
    def loadSession(self):
        '''Load session into current request'''
        separator=self.getSessionCookieName()+'='
        for h in self.headers.getallmatchingheaders('cookie'):
            h=h.split(separator,1)
            if len(h)==2:
                sessionID=h[1].strip()
                if not self.req.server.hasSession(sessionID): break
                self.logger.info('SESSION ID FROM COOKIE: %s'%sessionID)
                self.req.session=self.req.server.getSession(sessionID)
                return
        self.req.session=None
    def sendResponse(self, response, loadedSession):
        '''Send response to the client.'''
        self.send_response(200)
        self.send_header('Content-type', 'text/plain')
        self.send_header('Content-encoding', 'UTF-8')
        self.send_header('Content-Length', str(len(response)))
        if loadedSession is not self.req.session:
            # Session created/deleted (changed), so sending new session cookie
            self.sendSessionCookie()
        self.end_headers()
        self.wfile.write(response)
    def getSessionCookieName(self):
        '''Returns the name of the session cookie'''
        return self._CookieNamePrefix+(self.req.server.domain or self._DefaultCookieName)
    def sendSessionCookie(self):
        '''Send session cookie to the client.'''
        cookie=Cookie.Morsel()
        cookie.key=self.getSessionCookieName()
        if self.req.session is None:
            cookie.coded_value=''
        else:
            cookie.coded_value=self.req.session.getSessionID()
        self.send_header('Cache-control', 'no-cache="set-cookie"')
        self.send_header('Set-Cookie', cookie.OutputString())
        self.logger.info('SETTING SESSION COOKIE: %s'%cookie.OutputString())
    def _get_logger(self):
        return self.server.logger
    logger=property(_get_logger)
    def _get_debug(self):
        return self.server.debug
    debug=property(_get_debug)

#============================================================================

class HTTPServer(Server, BaseHTTPServer):
    '''HTTP JSON-RPC server.'''
    def __init__(self, host='127.0.0.1', port=8000, domain=None, logger=None, debug=False):
        if domain is None:
            if port==80:
                domain=host
            else:
                domain='%s:%d'%(host,port)
        Server.__init__(self, domain, logger, debug)
        BaseHTTPServer.__init__(self, (host,port), HTTPRequestHandler)

#============================================================================
