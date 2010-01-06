#!/usr/bin/env python

################################################################################
#
#  qxtransformer - xml->javascript converter
#
#  http://qxtransformer.org
#
#  Copyright:
#    2008 Siarhei Barysiuk and Christian Boulanger
#
#  License:
#    LGPL: http://www.gnu.org/licenses/lgpl.html
#    EPL: http://www.eclipse.org/org/documents/epl-v10.php
#
#  Authors:
#    * Siarhei Barysiuk (sbarysiuk)
#
################################################################################

import re 

class XMLUtils:
    ns_urls = {}
    ns_prefixes = {}
    
    _normalize_patterns = {}
    _denormalize_patterns = {}
    # ns_prefixes = {
    #               "http://www.qxtransformer.org/qooxdoo/0.8":"qx",
    #               "http://www.qxtransformer.org/qooxdoo/0.4":"qxt"
    #         }
    # ns_urls = ns_prefixes.fromkeys(ns_prefixes.values())
    # _normalize_patterns ={};
    # _denormalize_patterns ={};
    # 
    # for key in ns_prefixes:
    #     prefix = ns_prefixes[key]
    #     ns_urls[prefix]=key
    #     _normalize_patterns[prefix] = re.compile(prefix+":")
    #     _denormalize_patterns[key] = re.compile("{%s}" %key)
        
    @staticmethod
    def init(nsmap):
        """docstring for init"""
        XMLUtils.ns_urls = nsmap
        XMLUtils.ns_prefixes = XMLUtils.ns_urls.fromkeys(XMLUtils.ns_urls.values())
        
        for prefix in XMLUtils.ns_urls:
            url = XMLUtils.ns_urls[prefix]
            XMLUtils.ns_prefixes[url]=prefix
            XMLUtils._normalize_patterns[prefix] = re.compile(prefix+":")
            XMLUtils._denormalize_patterns[url] = re.compile("{%s}" %url)
    
    @staticmethod
    def normalize(xpath):
        """ {} -> qx"""
        result = xpath
        for key in XMLUtils._denormalize_patterns.keys():
            pattern = XMLUtils._denormalize_patterns[key]
            result = pattern.sub("%s:" %XMLUtils.getNsPrefixByUrl(key),result)
        return result

    @staticmethod    
    def denormalize(xpath):
        """ qx -> {} """
        result = xpath
        for key in XMLUtils._normalize_patterns.keys():
            pattern = XMLUtils._normalize_patterns[key]
            result = pattern.sub("{%s}" %XMLUtils.getNsUrlByPrefix(key),result)
        return result

    @staticmethod    
    def normNS(tagName):
        """ qx """
        if tagName and len(tagName)>1:
            url = tagName[1:].split("}")
            if len(url)==2:
                return XMLUtils.ns_prefixes.get(url[0])
            else:
                return ""
        else:
            return ""

    @staticmethod    
    def denormNS(tagName):
        """ {} """
        if tagName and len(tagName)>1:
            url = tagName.split(":")
            if len(url)==2:
                return url[0]
            else:
                return ""
        else:
            return ""

    @staticmethod    
    def getNsPrefixByUrl(url):
        return XMLUtils.ns_prefixes.get(url)

    @staticmethod    
    def getNsUrlByPrefix(prefix):
        return XMLUtils.ns_urls.get(prefix)
    
    @staticmethod
    def ns(tagName):
        """docstring for ns"""
        name = tagName
        if tagName.startswith("{"):
            name =  XMLUtils.denormalize()
        
        return name.split(":")[0]

    @staticmethod
    def localName(name):
        splitted = name.split(":")
        if len(splitted)<=2:
            return splitted[len(splitted)-1]
        else:
            raise "Unable to get absolute name for tag [%s]" %name
