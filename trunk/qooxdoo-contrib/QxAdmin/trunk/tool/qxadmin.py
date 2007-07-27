#!/usr/bin/env python
# -*- coding: ascii -*-
'''==========================================================================
qxjsonrpc - JSON-RPC backend for the qooxdoo JavaScript library

(C) 2007 - Viktor Ferenczi (python@cx.hu) - Licence: GNU LGPL

=========================================================================='''

import sys, os
import qxjsonrpc
import qxjsonrpc.test.login
from qxjsonrpc import *
from qxjsonrpc.http import HTTPServer

#============================================================================
# Exported symbols

__all__=['AdminService', 'AdminHTTPServer']

#============================================================================

qxadminconf = {
    'qooxdoo_path' : '../../../qooxdoo/qooxdoo-0.7.1-sdk',
}

#============================================================================

class DirEntry(dict):
    '''Directory entry'''
    _attrlist='dev,ino,mode,nlink,uid,gid,size,atime,mtime,ctime'.split(',')
    def __init__(self, dirpath, filename):
        self['name']=filename
        st=os.stat(os.path.join(dirpath, filename))
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
        dirpath=os.path.join(*[self.basedir]+pathelements)
        assert '..' not in dp, 'Cannot go back in directory hierarchy! The .. path element is not supported!'
        filenames=os.listdir(dirpath)
        if details:
            return [DirEntry(dirpath, filename) for filename in filenames]
        return filenames

class AdminService(object):
    '''Admin service can be used with qxadmin.html.'''
    def __init__(self):
        "Add further worker classes to this service class"
        self.fss = FileSystemService(qxadminconf['qooxdoo_path'])

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

class AdminHTTPServer(HTTPServer):
    '''HTTP server for interfacing to qooxdoo's build process'''
    def __init__(self, host='127.0.0.1', port=8007):
        HTTPServer.__init__(self, host, port, debug=True)
        self.setService('qooxdoo.admin', AdminService())

#============================================================================

def main():
    '''Run admin server on 127.0.0.1:8000'''
    print 'Open index.html from the main directory to connect to this server.'
    print 'Debugging output is enabled in the test server.'
    print
    print 'Ctrl-C aborts the server.'
    print
    print 'Admin server log output follows:'
    print
    srv=AdminHTTPServer()
    srv.serve_forever()

#============================================================================

if __name__=='__main__':
    main()

#============================================================================
