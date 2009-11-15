#!/usr/bin/python
# -*- coding: ascii -*-
'''==========================================================================
qxjsonrpc - JSON-RPC backend for the qooxdoo JavaScript library

(C) 2007 - Viktor Ferenczi (python@cx.hu) - Licence: GNU LGPL
Contributor: Christian Boulanger (cboulanger)
-----------------------------------------------------------------------------

This is a json-rpc server written in python. It receives a service name in
dot-separated path format and expect to find the class containing the
service in a file. If the service name is "foo.bar.Baz", the class is named
"Baz" in the "foo.bar" module, located in "services/foo/bar/Baz.py". The 
class file is dynamically loaded when the request is received.

=========================================================================='''

#============================================================================
