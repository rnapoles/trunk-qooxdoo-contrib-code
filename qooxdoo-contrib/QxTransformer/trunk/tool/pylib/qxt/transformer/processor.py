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

from qxt.settings import settings
from qxt.transformer import context
from qxt.transformer import template
from qxt.xml import utils
import lxml.etree as etree
from qxt.transformer import component

import logging
from logging import config
logd = logging.getLogger("qxt.detailed")


class Processor:
    #---- Constants -------
    THIS_DATA_KEY_NAME = "thisData"
    PARENT_DATA_KEY_NAME = "parentData"
    ATTR_DATA_KEY_NAME = "attrData"
    
    def __init__(self, dialects_config_path):
        """docstring for __init__"""
        
        logd.debug("Loading data for dialect configuration file  %s." %dialects_config_path)
        
        #loading dialect settings
        settings.DialectSettings().load(dialects_config_path)
        self.__dialectSettings__ = settings.DialectSettings()
        
        self.__templateProvider__ = template.TemplateProvider(self.__dialectSettings__)
        self.__elementDataLookup__ = XMLElementDataLookup(self.__dialectSettings__.getTagsConfig())
        self.__parser__ = etree.XMLParser(remove_comments=True)
        
        self.__componentLookup__ = component.ComponentLookup()
        
    def transform(self, path):
        """docstring for transform"""   
        
        #clean up previous temp
        self.__elementDataLookup__.clean() 
        
        tree = etree.parse(path,self.__parser__)
        self.__root__ = tree.getroot()
        
        nsmap = self.__root__.nsmap
        #initializing XMLUtils
        utils.XMLUtils.init(nsmap)
        
        self.__componentLookup__.lookup(nsmap)
        
        return self.renderTag(context.ElementContext(self.__root__, None, None));
    
    def transformToFile(self, xml):
        """docstring for transformToFile"""
        pass
    
    # --------- 3 typical render operation ------------
    
    def renderTag(self,econtext):
        """docstring for tag"""
        
        logd.debug("-"*80)
        logd.debug("Rendering BODY for context %s" %econtext.toString())
        logd.debug("-"*80)
        
        #1) creating data for template
        data = self.__createTmplDataStruct__(econtext);
        
        #2) getting template for current element context
        tmpl = self.__templateProvider__.getBodyTemplate(econtext)
        
        if tmpl:
            return tmpl.render(data=data, econtext=econtext, processor=self)
        else:
            return ""
    
    def renderAdd(self, econtext):
        """docstring for add"""
        
        logd.debug("-"*80)
        logd.debug("Rendering ADD for context %s" %econtext.toString())
        logd.debug("-"*80)
        
        #1) creating data for template
        data = self.__createTmplDataStruct__(econtext);
        
        #2) getting template for current element context
        tmpl = self.__templateProvider__.getAddTemplate(econtext)
        
        if tmpl:
            return tmpl.render(data=data, econtext=econtext, processor=self)
        else:
            return ""

    
    def renderAttr(self, econtext):
        """docstring for attr"""
        
        logd.debug("-"*80)
        logd.debug("Rendering ATTR for context %s" %econtext.toString())
        logd.debug("-"*80)
        
        #1) creating data for template
        data = self.__createTmplDataStruct__(econtext);
        
        # put rendered attribute value to data to pass it to template
        attrValueStr = self.__getPropByName__(data[self.THIS_DATA_KEY_NAME], "attr."+econtext.getAttrName())
        
        data[self.ATTR_DATA_KEY_NAME] = AttributeProcessor.value(attrValueStr)
        
        #2) getting template for current element context
        tmpl = self.__templateProvider__.getAttrTemplate(econtext)
        
        if tmpl:
            return tmpl.render(data=data, econtext=econtext, processor=self)
        else:
            return ""

    
    def __createTmplDataStruct__(self, econtext):
        """docstring for __createTmplDataStruct__"""
        data = {}
        
        # data for current tag
        data[self.THIS_DATA_KEY_NAME] = self.__elementDataLookup__.getDataForElement(econtext.getTag())
        # data for current parent
        data[self.PARENT_DATA_KEY_NAME] = self.__elementDataLookup__.getDataForElement(econtext.getParent())
        
        return data
    
    #------- additional helper methods ----------------
    
    def __getXmlTree__(self, xml):
        """docstring for __getXmlTree"""
        pass
    
    def __getPropByName__(self, xmlElementData, propPath):
        """docstring for getProp"""
        names = propPath.split(".");
        
        if xmlElementData:
            for name in names:
                if name in xmlElementData:
                    xmlElementData = xmlElementData.get(name)
                else:
                    return None
            return xmlElementData
        else:
            return None

    def getDataForElement(self, element):
        """docstring for getDataByXPath"""
        return self.__elementDataLookup__.getDataForElement(element)


class AttributeProcessor(object):
    NULL_KEYWORD = "null"
    UNDEFINED_KEYWORD = "undefined"
    TRUE_KEYWORD = "true"
    FALSE_KEYWORD = "false"
    
    PREDEFINED_VALUES = ["null", "undefined", "true", "false"]
    
    STRING_TYPE = "{string}"
    REFERENCE_TYPE = "{ref}"
    JS_TYPE = "{js}"
    
    VARIABLE_TYPES = [STRING_TYPE, REFERENCE_TYPE, JS_TYPE]
    
    @staticmethod
    def value(valueStr):
        
        """
            Returns rendered values of attribute.
            
            Possible auto-defined types:
            1) Number
            2) String
            
            Explicitly defined types:
            1) {string}:value = "value" (value with added quotes)
            2) {ref}:ref_id = ref_id (value after : without modifications)
            3) {js}:alert('a'); = alert('a'); (value after : without modifications)
            
        """
        if valueStr:
            result = valueStr
            
            # any from predefined values
            if AttributeProcessor.PREDEFINED_VALUES.count(valueStr)>0:
                result = valueStr
                
            elif valueStr.startswith(AttributeProcessor.STRING_TYPE):
                result = valueStr.replace(AttributeProcessor.STRING_TYPE,"")
                result = AttributeProcessor.__escape__(result)
                result = "\"%s\"" %result
                
            elif valueStr.startswith(AttributeProcessor.REFERENCE_TYPE):
                result = valueStr.replace(AttributeProcessor.REFERENCE_TYPE,"")
                
            elif valueStr.startswith(AttributeProcessor.JS_TYPE):
                result = valueStr.replace(AttributeProcessor.JS_TYPE,"")
                
            elif AttributeProcessor.isnumber(valueStr):
                result = valueStr
                
            else:
                result = "\"%s\""  %AttributeProcessor.__escape__(valueStr)
                
            return result
        else:
            return AttributeProcessor.NULL_KEYWORD
        
    @staticmethod
    def isnumber(x):
        """
            Couldn't find any built-in function to check if an object
            is a number, googled this one. Maybe need to change.
        """
        try:
            float(x)
            return True
        except:
            return False
    
    @staticmethod
    def __escape__(string):
        result = string.replace('"','\\"')
        result = result.replace('\n','')
        result = result.replace('\t','')
        return result



class XMLElementDataLookup(object):
    ID_ATTR_NAME = "id"
    NAME_ATTR_NAME = "name"
    THIS_ATTR_NAME = "this"
    ATTR_KEY_NAME = "attr"
    PROPS_KEY_NAME = "props"
    DATA_KEY_NAME = "data"
    
    def __init__(self, tagsConfig):
        """docstring for __init__"""
        self.__cache__ = {}
        self.__tagsConfig__ = tagsConfig
        self.__globalTagCounter__ = {}
        
    
    def clean(self):
        """docstring for clean"""
        self.__cache__ = {}
        self.__globalTagCounter__ = {}
        
    def getDataForElement(self, element):
        """docstring for getDataForElement"""
        if element is None:
            return None
            
        elementId = element.attrib.get(self.ID_ATTR_NAME)
        
        if elementId:
            data = self.__cache__.get(elementId)
            if not(data):
                # creating data structure and store it in cache by id(varName)
                data = self.__fillDataForElement__(element)
                self.__cache__[data[self.ID_ATTR_NAME]] = data
        else:
            # creating data structure and store it in cache by id(varName)
            data = self.__fillDataForElement__(element)
            self.__cache__[data[self.ID_ATTR_NAME]] = data
            
        return data

    
    def __fillDataForElement__(self, element):
        """docstring for __fillDataForElement__"""
        
        tagName = utils.XMLUtils.normalize(element.tag)
        
        data = {}
        
        #1) separate properties
        data[self.NAME_ATTR_NAME] = tagName
        data[self.ID_ATTR_NAME] = self.var_name(element)
        data[self.THIS_ATTR_NAME] = element
        
        #2) getting attributes
        attr = {}
        
        #predefined attributes from configuration
        attrFromConfig = self.__tagsConfig__.getPropByNameForTag(tagName,self.DATA_KEY_NAME+"."+self.ATTR_KEY_NAME)
        if attrFromConfig:
            attr.update(attrFromConfig.copy())
        
        #attributes defined in for this node
        attrFromNode = dict((utils.XMLUtils.normalize(attrName), element.attrib[attrName]) for attrName in element.attrib.keys())
        attr.update(attrFromNode)
        
        data[self.ATTR_KEY_NAME] = attr
        
        #3) getting properties
        props = {}
        
        propsFromConfig = self.__tagsConfig__.getPropByNameForTag(tagName,self.DATA_KEY_NAME+"."+self.PROPS_KEY_NAME)
        if propsFromConfig:
            props.update(propsFromConfig)
        
        data[self.PROPS_KEY_NAME] = props
        
        return data
    
    # ---- var name generating -----
    def var_name(self,element):
        if element==None: return None
        
        id = element.attrib.get("id")
        if id:
            return id
        else:
            tagName = utils.XMLUtils.normalize(element.tag)
            count = self.__globalTagCounter__.get(tagName)
            
            if count:
                 count=count+1
            else:
                count = 1
                
            self.__globalTagCounter__[tagName] = count;
            
            #--- creating variable name -----
            nameParts = tagName.split(":")
            varName = nameParts[0]+nameParts[1][0].capitalize()+nameParts[1][1:]+str(count)
            #setting it to element
            element.set(self.ID_ATTR_NAME,varName)
            
            return varName

