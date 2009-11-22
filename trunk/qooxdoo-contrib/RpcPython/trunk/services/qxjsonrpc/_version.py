#!/usr/bin/python
# -*- coding: ascii -*-
'''==========================================================================
qxjsonrpc - JSON-RPC backend for the qooxdoo JavaScript library

(C) 2007 - Viktor Ferenczi (python@cx.hu) - Licence: GNU LGPL

-----------------------------------------------------------------------------

This module provides the package version number.

This module is NOT intended for direct import. Import symbols from qxjsonrpc.

=========================================================================='''
# Exported symbols

__all__=['__version__']

#============================================================================

class __version__:
    '''Package version information'''
    major=0
    minor=0
    revision=10
    stable=(minor>1 and (minor&1)==0)
    number='%d.%d.%d'%(major, minor, revision)

#============================================================================
