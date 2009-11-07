#!/usr/bin/python
# -*- coding: ascii -*-
'''==========================================================================
qxjsonrpc - JSON-RPC backend for the qooxdoo JavaScript library

(C) 2007 - Viktor Ferenczi (python@cx.hu) - Licence: GNU LGPL

-----------------------------------------------------------------------------

This module provides common utility classes and functions.

This module is NOT intended for direct import.

=========================================================================='''

from time import time

#============================================================================
# Exported symbols

__all__=['uuid', 'expirable_dict']

#============================================================================
# UUID generation

try:
    # Python 2.5
    from uuid import uuid4
    def uuid():
        return str(uuid4())
except ImportError:
    # Python 2.4
    import md5
    import time
    import random
    def uuid():
        return md5.new('%d%d'%(int(time.time()), random.getrandbits(128))).hexdigest()

assert uuid()!=uuid()

#============================================================================
# Storage

class expirable_dict(dict):
    '''Dictionary with items that deleted after expired. The cleanup method
    must be called peiodically. This class is used for Session storage.
    Default lifetime of the stored objects is infinite, they will never
    expire. Time of expiration must be set by calling the expire method.
    TODO: Uses a very simple cleanup implementation, this may be improved.'''
    def __init__(self, *args, **kw):
        self.__expire_times={}
        dict.__init__(self, *args, **kw)
    def __setitem__(self, key, value):
        '''Set item with the default infinite expiration time.'''
        dict.__setitem__(self, key, value)
        self.__expire_times[key]=None
    def __delitem__(self, key):
        '''Delete item and it's expiration time.'''
        dict.__delitem__(self, key)
        del self.__expire_times[key]
    def expire(self, key, expire_time):
        '''Set expiration time of item'''
        assert key in self
        self.__expire_times[key]=expire_time
    def cleanup(self):
        '''Cleanup function that removes expired items.'''
        ct=time()
        et=self.__expire_times
        # Collect keys of items to be deleted
        dl=[key for key in self if ct>=et[key]]
        # Delete items
        for key in dl:
            del self[key]

#============================================================================
