#!/usr/bin/python
# -*- coding: ascii -*-
'''==========================================================================
qxjsonrpc - JSON-RPC backend for the qooxdoo JavaScript library

(C) 2007 - Viktor Ferenczi (python@cx.hu) - Licence: GNU LGPL

Requirements:

- Python 2.4 or 2.5
- python-cjson-1.0.3x3 or newer or simplejson for JSON serialization

NOTE: python-cjson is MUCH faster, but not pure python (requires C compiler)

-----------------------------------------------------------------------------

This module provides JSON-RPC backend functionality required to implement
server-side data sources for qooxdoo components or anything you can imagine.

Please report bugs to: python@cx.hu

-----------------------------------------------------------------------------

NOTE: This backed is made specifically for qooxdoo and does not conform to
the JSON-RPC specification published at http://json-rpc.org.
Main differences:

- Always requires a request ID.
- Always requires a service name.
- Silently drops (does not verify) JSON-RPC request version.
- Can receive server_data. It can be accessed as request.data.
- Currently does not allow to mix positional and named arguments.

-----------------------------------------------------------------------------

TODO: Fixing bugs.
TODO: Unit tests, more manual tests.
TODO: More/better documentation and examples.
TODO: RPC client support. (classes to access JSON-RPC servers from python)
TODO: WebStack connector. (http://www.boddie.org.uk/python/WebStack.html)
TODO: CherryPy connector/filter (there is another one). (http://www.cherrypy.org)
TODO: JSON-RPC specification compliant mode.

=========================================================================='''

# Package version
from qxjsonrpc._version import __version__

# Import public symbols
from qxjsonrpc._error import *
from qxjsonrpc._access import *
from qxjsonrpc._request import *
from qxjsonrpc._session import *

# Servers should be imported manually according to the transport required.

#============================================================================
