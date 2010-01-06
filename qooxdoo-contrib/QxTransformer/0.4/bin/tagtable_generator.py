#!/usr/bin/env python

import simplejson
import re


def __stripComments__(jsonstr):
    """
        From qooxdoo's generator.
    """
    eolComment = re.compile(r'(?<![a-zA-Z]:)//.*$', re.M)
    mulComment = re.compile(r'/\*.*?\*/', re.S)
    result = eolComment.sub('',jsonstr)
    result = mulComment.sub('',result)
    return result


def __loadFromString__(string):
    """
        Loads configuration from defined json string and returns it as dict or raises exception if it's not possible.
    """
    data= None
    jsonstr = __stripComments__(string)
    try:    
        data = simplejson.loads(jsonstr)
    except ValueError, e:
            msg = "Unable to parse string with dialect configuration. Error: %s" %e
            raise Exception(msg)
    return data


def main():
    """docstring for main"""
    
    fname = "dialects/qxml/tags.json"
    
    conf = None
    obj = None
    try:
        obj = open(fname)
        #getting json configuration string
        jsonstr = obj.read()
    except IOError, e:
        msg = "Unable to open file with dialect configuration. Error: %s" %e
        raise Exception(e)
    else:
        #parse it
        conf = __loadFromString__(jsonstr)
    finally:
        if obj: obj.close()
        
    for key in conf:
        print "<tr>"
    
        print '<td style="width: 279px; height: 14px;">%s</td>' %key
        if conf[key].get("data"): 
            if conf[key].get("data").get("props"):
                print '<td style="width: 398px; height: 14px;">%s</td>' %(conf[key].get("data").get("props").get("class"))
            else: 
                print '<td style="width: 398px; height: 14px;">%s</td>' %'No correlation'
        else: 
            print '<td style="width: 398px; height: 14px;">%s</td>' %'No correlation'
    
        print '</tr>'

if __name__ == '__main__':
    main()