#############################################################################
#
#   RpcPython
#
#   http://qooxdoo.org/contrib/project#rpcpython
#
#   Copyright:
#     (C) 2007 - Viktor Ferenczi (python@cx.hu) 
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

'''
This module contains service and server classes can be used with qooxdoo's
RPC_* test pages. 

Open qooxdoo's RPC 4 test, check Cross Browser mode, set URL to
http://127.0.0.1:8000 and leave service path as qooxdoo.test.
Cross Browser mode is neccessary on most modern browsers, since they
disallow XmlHttpRequest in certain cross-site situations to prevent
browser attacks.

The tests should run fine. You will get an ApplicationError that is normal.

Troubleshooting:

If you get a local timeout and no results, then check your firewall or
the Cross Browser checkbox. Did you run the test server? Etc...

Other RPC tests:

This test server will also work with the RPC 6 test using the same settings.

=========================================================================='''

import time
import datetime
from qxjsonrpc import public, fail

#============================================================================
# Expose this module as an RPC service 
isRpcService = True
#============================================================================


class Test(object):
    '''Test service can be used with the RPC_* test pages'''
    
    @public
    def echo(self, v):
        return 'Client said: [ %s ]'%(v,)
    @public
    def sink(self, *args, **kw):
        time.sleep(240)
    @public
    def sleep(self, t):
        time.sleep(float(t))
        return t
    @public
    def getInteger(self):
        return 1
    @public
    def getFloat(self):
        return 1/3.0
    @public
    def getString(self):
        return "Hello world"
    @public
    def getArrayInteger(self):
        return [1, 2, 3, 4]
    @public
    def getArrayString(self):
        return ["one", "two", "three", "four"]
    @public
    def getObject(self):
        return {'one':1, 'two':2}
    @public
    def getTrue(self):
        return True
    @public
    def getFalse(self):
        return False
    @public
    def getNull(self):
        return None
    @public
    def isInteger(self, v):
        return isinstance(v,(int,long))
    @public
    def isFloat(self, v):
        return isinstance(v,float)
    @public
    def isString(self, v):
        return isinstance(v,basestring)
    @public
    def isBoolean(self, v):
        return isinstance(v,bool)
    @public
    def isArray(self, v):
        return isinstance(v,(list,tuple))
    @public
    def isObject(self, v):
        return isinstance(v,dict)
    @public
    def isNull(self, v):
        return v is None
    @public
    def getParams(self, *args):
        return args
    @public
    def getParam(self, *args):
        return args[0]
    @public
    def getCurrentTimestamp(self):
        ct=datetime.datetime.utcnow()
        st=datetime.datetime(1970,1,1,0,0,0)
        dt=ct-st
        t=dt.days*86400+dt.seconds
        return {'now':t, 'json':ct}
    @public
    def getError(self):
        raise Exception('APPLICATION SPECIFIC ERROR - THIS IS NORMAL IN RPC TESTS')
    @fail
    def getFail(self):
        raise Exception('THIS METHOD SHOULD NOT BE CALLED - IT IS A REAL ERROR IF RAISED')
