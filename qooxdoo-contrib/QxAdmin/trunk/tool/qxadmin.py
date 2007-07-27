#!/usr/bin/env python
# -*- coding: ascii -*-
'''==========================================================================
qxjsonrpc - JSON-RPC backend for the qooxdoo JavaScript library

(C) 2007 - Viktor Ferenczi (python@cx.hu) - Licence: GNU LGPL

-----------------------------------------------------------------------------

Login/logout test for qooxdoo, uses session.

=========================================================================='''

import os
import os.path as op
import sys
import logging
import qxjsonrpc
import qxjsonrpc.wsgi
import qxjsonrpc.test.login
from qxjsonrpc import *
from qxjsonrpc.http import HTTPServer

#============================================================================
# Exported symbols

__all__=['TestService', 'TestHTTPServer']

#============================================================================

class DirEntry(dict):
    '''Directory entry'''
    _attrlist='dev,ino,mode,nlink,uid,gid,size,atime,mtime,ctime'.split(',')
    def __init__(self, dirpath, filename):
        self['name']=filename
        st=os.stat(op.join(dirpath, filename))
        for n in self._attrlist:
            self[n]=getattr(st, 'st_%s'%n)
        self['rdev']=''
        self['blksize']=1
        self['blocks']=st.st_size

class FileSystemService(object):
    class Error:
        InvalidPath=1
        DirDoesNotExist=2
        NotADirectory=3
        PathUnreadable=4
    def __init__(self, basedir):
        self.basedir=basedir
    @qxjsonrpc.public
    def readDirEntries(self, pathelements, details):
        dirpath=op.join(*[self.basedir]+pathelements)
        assert '..' not in dp, 'Cannot go back in directory hierarchy! The .. path element is not supported!'
        filenames=os.listdir(dirpath)
        if details:
            return [DirEntry(dirpath, filename) for filename in filenames]
        return filenames

sys.stdout=open('/tmp/wsgi-fs.out', 'ab')
logger=logging.getLogger('login')
logger.addHandler(logging.FileHandler('/tmp/wsgi-fs.log'))
application=qxjsonrpc.wsgi.WSGIApplication(domain='python.cx.hu', logger=logger)
service=FileSystemService('/var/www/python.cx.hu/qxjsonrpc/wsgi/fsdir')
application.setService('qooxdoo.fs', service)

class TestService(object):
    '''Test service can be used with session.html.'''
    @public
    @request
    def login(self, username, password, request):
        if username=='admin' and password=='1234':
            print 'LOGIN OK'
            request.session=Session(request.server, self)
            session=request.session
            return True
        print 'LOGIN FAILED'
        return False
    @session
    def logout(self, session):
        print 'LOGOUT'
        session.endSession()
    @session
    def getSessionID(self, session):
        print 'Client read session ID.'
        if session is None: return None
        return session.getSessionID()

#============================================================================

class TestHTTPServer(HTTPServer):
    '''HTTP JSON-RPC server for testing sessions'''
    def __init__(self, host='127.0.0.1', port=8000):
        HTTPServer.__init__(self, host, port, debug=True)
        self.setService('login.test', TestService())

#============================================================================

def main():
    '''Run test server on 127.0.0.1:8000'''
    print 'Open login.html from test subdirectory to test this server.'
    print 'Debugging output is enabled in the test server.'
    print
    print 'Ctrl-C aborts the server.'
    print
    print 'Test server log output follows:'
    print
    srv=TestHTTPServer()
    srv.serve_forever()

#============================================================================

if __name__=='__main__':
    main()

#============================================================================
