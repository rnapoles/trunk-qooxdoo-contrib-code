import os
import os.path as op
import sys
import logging
import qxjsonrpc
import qxjsonrpc.wsgi
import qxjsonrpc.test.login

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
