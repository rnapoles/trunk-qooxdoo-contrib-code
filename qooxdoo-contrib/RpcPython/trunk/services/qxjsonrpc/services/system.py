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
#     * Christian Boulanger (cboulanger)
#
#############################################################################

''' This module contains the "system" service.'''


from qxjsonrpc import public, fail
from qxjsonrpc.server import JsonRpcService, ServiceIntrospection

class System(JsonRpcService, ServiceIntrospection):
    '''The 'system' service providing support for the getCapabilities method'''

    capabilities = {}
        
    def __init__(self):
        self.addCapability(name='introspection',
                           url="http://qooxdoo.org/documentation/json_rpc_introspection",
                           version="1.0",
                           services=[],
                           methods=['listMethod','methodSignature','methodHelp'])
    
    @public
    def getCapabilities(self,*args):
        '''Return all known capabilities.'''
        return self.capabilities
    
    @fail
    def addCapability(self,name,url,version,services,methods):
        '''Adds a capability to the service.'''
        self.capabilities[name] = {
                                    "specUrl" : url,
                                    "specVersion" : version,
                                    "specServices" : services,
                                    "specMethods" : methods
                                   }