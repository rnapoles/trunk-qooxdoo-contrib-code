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

from qxt.xml import utils

class ElementContext(object):

    def __init__(self, element, parent=None, attrName=None, mode=None):
        """docstring for __init__"""
        self.__element__ = element
        self.__parent__ = parent
        self.__attr__ = attrName
        self.__mode__ = mode
        pass
    
    def getTag(self):
        """docstring for getNode"""
        return self.__element__
    
    def getTagName(self):
        """docstring for getCurrentNodeName"""
        if self.__element__ is None:
            return None
            
        tagName = utils.XMLUtils.normalize(self.__element__.tag)
        return tagName
    
    def getTagNS(self):
        return utils.XMLUtils.ns(self.getTagName())
    
    def getParent(self):
        """ docs """
        return self.__parent__
    
    def getParentName(self):
        """docstring for getCurrentNodeName"""
        if self.__parent__ is None:
            return None

        parentName = utils.XMLUtils.normalize(self.__parent__.tag)
        return parentName
    
    def getParentNS(self):
        return utils.XMLUtils.ns(self.getParentName())

    def getAttrName(self):
        """docstring for getCurrentAttrName"""
        return self.__attr__
    
    def getMode(self):
        """docstring for getMode"""
        return self.__mode__
    
    def setMode(self, mode):
        """docstring for setMode"""
        self.__mode__ = mode
    
    def toString(self):
        """docstring for toString"""
        return "[tag:%s; parent:%s; attr:%s; mode:%s]" %(self.getTagName(), self.getParentName(), self.getAttrName(), self.getMode())
