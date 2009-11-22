#!/usr/bin/python
# -*- coding: ascii -*-
'''==========================================================================
qxjsonrpc - JSON-RPC backend for the qooxdoo JavaScript library

(C) 2007 - Viktor Ferenczi (python@cx.hu) - Licence: GNU LGPL

-----------------------------------------------------------------------------

Provides common interface for JSON serializers. Supported JSON packages:

- python-cjson-1.0.3x.
- simplejson

Drop me a mail if you need another.

This module is intended for external use.

=========================================================================='''

import re
import sys
import time
from datetime import date, datetime, timedelta, tzinfo

#============================================================================
# Exported symbols

__all__=['encode', 'decode', 'EncodeError', 'DecodeError']

#============================================================================
# Package selection - for testing and disabling broken packages

use_python_cjson=True
use_simplejson=True

#============================================================================
# Initially no JSON serializer found

# No encoder and decoder function yet
encode=None
decode=None

# No exception classes yet
EncodeError=None
DecodeError=None

#============================================================================
# Date and datetime encoder/decoder function

ZERO=timedelta(0)
class UTC(tzinfo):
    """UTC"""
    def utcoffset(self, dt):
        return ZERO
    def tzname(self, dt):
        return "UTC"
    def dst(self, dt):
        return ZERO
utc=UTC()

#----------------------------------------------------------------------------

re_datetime=r'new\sDate\(Date\.UTC\(([0-9]+,[0-9]+,[0-9]+)(,[0-9]+,[0-9]+,[0-9]+)?(,[0-9]+)?\)\)'

#----------------------------------------------------------------------------

def json2datetime(json):
    '''Convert JSON representation to date or datetime object depending on
    the argument count. Requires UTC datetime representation.
    Raises ValueError if the string cannot be parsed.'''
    if json[:18]!='new Date(Date.UTC(' or json[-2:]!='))':
        raise ValueError('Not a JSON UTC Date: %s'%json)
    args=json[18:-2].split(',')
    try:
        args=map(int, args)
    except ValueError:
        raise ValueError('Invalid arguments: %s'%json)
    if len(args)==3: return date(*args)
    if len(args)==6: return datetime(tzinfo=utc, *args)
    if len(args)==7:
        args[6]*=1000
        return datetime(tzinfo=utc, *args)
    raise ValueError('Invalid number of arguments: %s'%json)

assert json2datetime('new Date(Date.UTC(1990,12,31))')==date(1990,12,31)
assert json2datetime('new Date(Date.UTC(1990,12,31,11,22,33))')==datetime(1990,12,31,11,22,33,tzinfo=utc)
assert json2datetime('new Date(Date.UTC(1990,12,31,11,22,33,44))')==datetime(1990,12,31,11,22,33,44000,tzinfo=utc)

#----------------------------------------------------------------------------

def datetime2json(obj):
    '''Convert date or datetime object to JSON string or raises TypeError.'''
    if isinstance(obj, datetime):
        if obj.microsecond:
            return 'new Date(Date.UTC(%d,%d,%d,%d,%d,%d,%d))'%(obj.year, obj.month, obj.day, obj.hour, obj.minute, obj.second, obj.microsecond/1000)
        else:
            return 'new Date(Date.UTC(%d,%d,%d,%d,%d,%d))'%(obj.year, obj.month, obj.day, obj.hour, obj.minute, obj.second)
    if isinstance(obj, date):
        return 'new Date(Date.UTC(%d,%d,%d))'%(obj.year, obj.month, obj.day)
    raise TypeError('Not a date or datetime object: %r'%(obj,))

assert datetime2json(date(1990,12,31))=='new Date(Date.UTC(1990,12,31))'
assert datetime2json(datetime(1990,12,31,11,22,33,tzinfo=utc))=='new Date(Date.UTC(1990,12,31,11,22,33))'
assert datetime2json(datetime(1990,12,31,11,22,33,44000,tzinfo=utc))=='new Date(Date.UTC(1990,12,31,11,22,33,44))'

#============================================================================
# python-cjson-1.0.3x or compatible

if use_python_cjson and encode is None:
    try: 
        import cjson
    except ImportError:
        pass
    else:
        # Exceptions
        EncodeError=cjson.EncodeError
        DecodeError=cjson.DecodeError
        # Encoder/decoder extensions for date and datetime objects
        def dateDecoder(json,idx,re_date=re.compile(re_datetime)):
            '''Decodes JSON Date object into a date or datetime object.'''
            m=re_date.match(json, idx)
            if not m:
                s=json[idx:]
                if len(s)>100:
                    s=s[:100]+'...'
                raise DecodeError('cannot parse JSON string as Date object: %s'%s)
            s=m.start()
            e=m.end()
            dt=json2datetime(json[s:e])
            return (dt,e-s) # must return (object, character_count) tuple
        def dateEncoder(obj):
            '''Encodes a date or datetime object into a JSON Date object.'''
            try:
                return datetime2json(obj)
            except TypeError:
                raise EncodeError('value cannot be encoded as date or datetime: %r'%(obj,))
        # Encoder/decoder functions
        def encode(obj):
            return cjson.encode(obj, extension=dateEncoder, key2str=True)
        def decode(json):
            return cjson.decode(json, extension=dateDecoder)

#============================================================================
# simplejson or compatible

if use_simplejson and encode is None:
    try: 
        import simplejson
        from simplejson.decoder import ANYTHING
        from simplejson.scanner import Scanner, pattern
    except ImportError:
        pass
    else:
        # Exceptions
        class EncodeError(Exception): pass
        class DecodeError(Exception): pass
        # Encoder/decoder extensions for date and datetime objects
        class DateEncoder(simplejson.JSONEncoder):
            '''
            def default(self, obj):
                try:
                    return datetime2json(obj)
                except TypeError:
                    pass
                return simplejson.JSONEncoder.default(self, obj)
            '''
            def _iterencode_default(self, obj, markers=None):
                try:
                    return datetime2json(obj)
                except TypeError:
                    pass
                return simplejson.JSONEncoder._iterencode_default(self, obj, markers)
        def JSONDateTime(match, context):
            dt=json2datetime(match.string)
            return (dt, None)
        pattern(re_datetime)(JSONDateTime)
        class DateDecoder(simplejson.JSONDecoder):
            _scanner=Scanner(ANYTHING+[JSONDateTime])
        # Encoder/decoder functions
        def encode(obj):
            try:
                json=simplejson.dumps(obj, cls=DateEncoder)
                return json.encode('utf8')
            except (SystemExit, KeyboardInterrupt):
                # For python 2.4 compatibility
                raise
            except Exception,e:
                raise EncodeError, ('exception [%s] raised in simplejson: %s'%(e.__class__.__name__, e), ), sys.exc_info()[2]
        def decode(json):
            try:
                if not isinstance(json, unicode):
                    json=json.decode('utf8')
                return simplejson.loads(json, cls=DateDecoder)
            except (SystemExit, KeyboardInterrupt):
                # For python 2.4 compatibility
                raise
            except Exception,e:
                raise DecodeError, ('exception [%s] raised in simplejson: %s'%(e.__class__.__name__, e), ), sys.exc_info()[2]

#============================================================================
# Check if serializer is found (NOTE: different modules can be used for encoding/decoding)

assert encode is not None and EncodeError is not None and callable(encode), \
    'No package found to encode python objects to JSON! Please install a supported package. See INSTALL file for more information.'
    
assert decode is not None and DecodeError is not None and callable(decode), \
    'No package found to decode python objects from JSON! Please install a supported package. See INSTALL file for more information.'

#============================================================================
# Quick compatibility tests (not complete, just to make sure the serializer is working)

for obj in [date(1990,12,31), datetime(2000,11,22,20,40,50,tzinfo=utc), datetime(2000,11,22,20,40,50,123000,tzinfo=utc)]:
    json=datetime2json(obj)
    obj2=json2datetime(json)
    if obj!=obj2:
        assert False, 'JSON encoder/decoder error when encoding then decoding object:\n%r != %r\njson=%s'%(obj,obj2,json)

#----------------------------------------------------------------------------

for obj in [123, 1.25, 'abc', [1,2,3], ['one', 'two', 'three'],
        {'one':1, 'two':2}, {'one':'1', 'two':'2'}, {1:'one', 2:'two'},
        date(1990,12,31), datetime(2000,11,22,20,40,50,tzinfo=utc)]:
    json=encode(obj)
    obj2=decode(json)
    if isinstance(obj, dict):
        obj=dict([(str(k),v) for k,v in obj.items()])
    if obj!=obj2:
        assert False, 'JSON encoder/decoder error when encoding then decoding object:\n%r != %r\njson=%s'%(obj,obj2,json)

#----------------------------------------------------------------------------

for obj in [int, 1+2j]:
    try:
        txt=encode(obj)
    except EncodeError:
        pass
    else:
        assert False, 'JSON encoder did not raise EncodeError when encoding %r! Instead returned: %r'%(obj, txt)

#----------------------------------------------------------------------------

for txt in ['', 'abc', '()', '[[]', '[]]', '{{}', '{}}', '[1,2}', '{1,2]']:
    try:
        obj=decode(txt)
    except DecodeError:
        pass
    else:
        assert False, 'JSON decoder did not raise DecodeError when decoding %r! Instead returned: %r'%(txt, obj)

#============================================================================
# Optional performance tests

def measureEncoderThroughput(data):
    bytes=0
    st=time.time()
    cnt=0
    while True:
        dt=time.time()-st
        if dt>=0.5 and cnt>9: break
        bytes+=len(encode(data))
        cnt+=1
    return int(bytes/1024/dt)

#----------------------------------------------------------------------------

def measureDecoderThroughput(data):
    json=encode(data)
    bytes=0
    st=time.time()
    cnt=0
    while True:
        dt=time.time()-st
        if dt>=0.5 and cnt>9: break
        decode(json)
        bytes+=len(json)
        cnt+=1
    return int(bytes/1024/dt)

#----------------------------------------------------------------------------

def measureThroughput():
    data=[range(x,x+100) for x in range(100)]
    json=encode(data)
    print 'Test data: 2 level list, 10100 items total, %d bytes as JSON string'%len(json)
    print 'Encoder throughput: ~%d kbyte/s'%measureEncoderThroughput(data)
    print 'Decoder throughput: ~%d kbyte/s'%measureDecoderThroughput(data)

#============================================================================

def main():
    measureThroughput()

#============================================================================

if __name__ == '__main__':
    main()

#============================================================================
