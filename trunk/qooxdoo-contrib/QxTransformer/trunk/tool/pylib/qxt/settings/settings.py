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

import simplejson
import os
import re
from pprint import pformat
import copy
import types

from qxt.xml import utils

import logging
from logging import config
logm = logging.getLogger("qxt.main")
logd = logging.getLogger("qxt.detailed")

class GlobalSettings(object):
    """
        GlobalSettings contains all global setting and they are available from any point of system.
        GlobalSettings is a singleton, only one instance is available.
        
        Global setting:
        * projectDir - path to qooxdoo's project source folder.
        * cwd - current working directory, top folder which contains qxtransformer.py
    
    """
    ## Stores the unique Singleton instance-
    _iInstance = None
    
    #property keys
    PROJECT_DIR = 'projectDir'
    CWD_DIR = 'cwd'
    XML_SOURCE_DIR = 'xmlDir'
    XML_OUT_DIR = "xmlOut"
    
    ## Class used with this Python singleton design pattern
    class Singleton:
        def __init__(self):
            self.props = {}
    
    ## The constructor
    def __init__( self ):
        if GlobalSettings._iInstance is None:
            GlobalSettings._iInstance = GlobalSettings.Singleton()
            
        # Store instance reference as the only member in the handle
        self.__dict__['_EventHandler_instance'] = GlobalSettings._iInstance
    
    
    ## Delegate access to implementation.
    #  @param self The object pointer.
    #  @param attr Attribute wanted.
    #  @return Attribute
    def __getattr__(self, aAttr):
        return getattr(self._iInstance, aAttr)
 
    
    ## Delegate access to implementation.
    #  @param self The object pointer.
    #  @param attr Attribute wanted.
    #  @param value Vaule to be set.
    #  @return Result of operation.
    def __setattr__(self, aAttr, aValue):
        return setattr(self._iInstance, aAttr, aValue)

class DialectSettings(object):
    """
        Setting contains all information about current dialect, template mappings, etc.
    """
    ## Stores the unique Singleton instance-
    _iInstance = None
    
    ## Class used with this Python singleton design pattern
    class Singleton:
        # folder wich contains all dialects packages
        DIALECTS_FOLDER_NAME = "dialects"
        # typical configuration file name
        CONFIG_FILE_NAME = "config.json"
        # typical tags configuration file name        
        TAGS_CONFIG_FILE_NAME = "tags.json"
        
        def __init__(self):
            self.__conf__ = None
            self.__tagsConf__ = None
            self.__tmplConf__ = None
            self.__dialects_config = None
            self.__dialectDirectories__ = []
        
        def load(self, dialects_config_path, force=False):
            """
                Loads configuration for defined dialect and stores it in instance onject.
            """
            # if settings has been initialized alresdy and force=False, do not need to initialize one more time
            if ( (self.__conf__ is not None)  and (self.__tagsConf__ is not None) and (self.__tmplConf__ is not None) ) and not force:
                logd.info("Skipping initialization for dialect settings '%s'. It's already done." %dialect)
                return
            
            
            try:
                self.__dialects_config = self.__loadFromFile__(dialects_config_path)
                
                self.__conf__ = {}
                tagsConf = {}
                
                dialects_list = self.__dialects_config.get('dialects')
                
                if dialects_list is None:
                    raise Exception('You did not define "dialects" property in your dialects settings configuration file.')
                
                for dialect_name in dialects_list:
                    settings = self.__dialects_config.get(dialect_name)
                    dialect_path = settings.get('path')
                    
                    self.__dialectDirectories__.append(dialect_path)
                    
                    if dialect_path is None:
                        logm.error("Can't get path to dialect '%s' in dialects settings file %s." %(dialect_name, dialects_config_path))
                    else:
                        
                        configFileName = self.__getConfigFileName__(dialect_path) #self.__getConfigFileName__(dialect_name)
                        logd.debug("Loading cofiguration for dialect '%s' from file %s." %(dialect_name, configFileName))
                        
                        #loading configuration from configFileName
                        try:
                            self.__conf__[dialect_name] = self.__loadFromFile__(configFileName)
                        except Exception, e:
                            msg = "Unable to load settings for '%s' dialect due to following error: %s" %(dialect_name, e)
                            logm.error(msg)    
                            raise Exception(msg)
                        
                        
                        tagsConfigFileName = self.__getTagsConfigFileName__(dialect_path)
                        logd.debug("Loading tags cofiguration for dialect '%s' from file %s." %(dialect_name, tagsConfigFileName))
                        
                        #loading tags configuration from configFileName
                        try:
                            tagsConf.update(self.__loadFromFile__(tagsConfigFileName))
                        except Exception, e:
                            msg = "Unable to load tags settings for '%s' dialect due to following error: %s" %(dialect_name, e)
                            logm.error(msg)    
                            raise Exception(msg)
                
                #creating template config
                self.__tagsConf__ = TagsConfig(tagsConf)
                self.__tmplConf__ = TemplatesConfig(self.__tagsConf__)
                
            except Exception, e:
                msg = 'Unable to load dialect configuration file %s due to following error: %s' %(dialects_config_path, e)
                logm.error(msg)
                raise Exception(msg)
            
            return self


        def __loadFromFile__(self, fname):
            """
                Loads configuration from defined json file and returns it as dict or raises exception if it's not possible.
            """
            conf = None
            obj = None
            try:
                obj = open(fname)
                #getting json configuration string
                jsonstr = obj.read()
            except IOError, e:
                msg = "Unable to open file %s. Error: %s" %(fname, e)
                raise Exception(e)
            else:
                #parse it
                conf = self.__loadFromString__(jsonstr)
            finally:
                if obj: obj.close()

            return conf

        def __loadFromString__(self, string):
            """
                Loads configuration from defined json string and returns it as dict or raises exception if it's not possible.
            """
            data= None
            jsonstr = self.__stripComments__(string)
            try:    
                data = simplejson.loads(jsonstr)
            except ValueError, e:
                    msg = "Unable to parse string with dialect configuration. Error: %s" %e
                    raise Exception(msg)
            return data
        
        
        
        # ----------- WORKING WITH FILE NAMES ------
        # def __getPath__(self, dialect, name):
        #     """
        #         Returns full path to specified file or folder for specific dialect.
        #     """
        #     qxtBaseDir = os.path.dirname(GlobalSettings().props["cwd"])
        #     return os.path.join(qxtBaseDir, self.DIALECTS_FOLDER_NAME, dialect, name)
        
        def __getConfigFileName__(self, path):
            """
                Returns full path to configuration file for specific dialect.
            """
            return os.path.join(os.path.abspath(path), self.CONFIG_FILE_NAME)
        
        def __getTagsConfigFileName__(self, path):
            """
                Returns full path to configuration file for specific dialect.
            """
            
            return os.path.join(os.path.abspath(path), self.TAGS_CONFIG_FILE_NAME)
        
        
        # ------ FUNCTION HELPERS -----------
        def __stripComments__(self,jsonstr):
            """
                From qooxdoo's generator.
            """
            eolComment = re.compile(r'(?<![a-zA-Z]:)//.*$', re.M)
            mulComment = re.compile(r'/\*.*?\*/', re.S)
            result = eolComment.sub('',jsonstr)
            result = mulComment.sub('',result)
            return result
            
        
        # ------- getters --------
        def getTagsConfig(self):
            return self.__tagsConf__
        
        def getTemplatesConfig(self):
            return self.__tmplConf__
        
        def getDialectsConfig(self):
            return self.__dialects_config
            
        
        def getDialectsDirectories(self):
            """Returns all directories from dialects config file."""
            return self.__dialectDirectories__
            
    
    ## The constructor
    def __init__( self ):
        if DialectSettings._iInstance is None:
            DialectSettings._iInstance = DialectSettings.Singleton()
    
    ## Delegate access to implementation.
    #  @param self The object pointer.
    #  @param attr Attribute wanted.
    #  @return Attribute
    def __getattr__(self, aAttr):
        return getattr(self._iInstance, aAttr)


    ## Delegate access to implementation.
    #  @param self The object pointer.
    #  @param attr Attribute wanted.
    #  @param value Vaule to be set.
    #  @return Result of operation.
    def __setattr__(self, aAttr, aValue):
        return setattr(self._iInstance, aAttr, aValue)  
        
        

class TagsConfig(object):
    """
        Docs
    """
    # ------ CONFIG KEYS -------
    EXTENDS = "extends"
    NO_EXTENDS = "noextends"
    DATA = "data"
    
    def __init__(self, tagsConfDict):
        """docstring for __init__"""
        self.__conf__ = {}
        self.__processedComponentNS__ = []
        self.__load__(tagsConfDict)
        
        logd.debug("Expanded config: \n %s" %pformat(self.__conf__))
        pass
    
    #------- Creating a config methods -----
    
    def __load__(self, data):
        """
            Parses tags configuration, resolves inheritance, merges proerties.
        """
        #iterating over all tags in configuration and expanding their properties 
        #from base tag's configurations
        for key in data.keys():
            logd.debug("Loading configuration for tag %s." %key)
            
            #building inheritance chain
            chain = []
            self.__fillInheritanceChain__(chain, data, key)
            
            chain.reverse()            
            
            #wring inheritance chain to log
            chainStr = ""
            for i in range(0,len(chain)):
                chainStr+="%s*%s" %(("--"*(i+1)), chain[i])
                chainStr+="\n"
            logd.debug("Inheritance chain for tag %s is \n%s" %(key, chainStr[:-1]))
            
            tagData = copy.deepcopy(data.get(chain[0]));
            self.__fillTagData__(tagData,chain[1:],data)
            
            chain.reverse()
            tagData[self.EXTENDS] = chain
            
            self.__conf__[key] = tagData
            tagDataStr = pformat(tagData)
            logd.debug("Configuration for tag %s looks like \n %s" %(key,tagDataStr))
            
    
    def __fillInheritanceChain__(self, chain, data, key):
        """
            docstring for __getInheritanceChain__
        """
        tag = data.get(key)
        chain.append(key)
        if self.EXTENDS in tag:
            self.__fillInheritanceChain__(chain, data, tag.get(self.EXTENDS))
    
    def __fillTagData__(self, tagData, inheritanceChain, tagsConfDict):
        
        """docstring for __mergingData__"""
        for i in range(0,len(inheritanceChain)):
            self.__mergeDict__(tagData,tagsConfDict.get(inheritanceChain[i]))
    
    def __mergeDict__(self, mergeTo, mergeFrom):
        """docstring for __mergeDict__"""
        
        for key in mergeFrom.keys():
            mergeFromValue = mergeFrom.get(key)
            #process noextends
            noextends = mergeFrom.get(self.NO_EXTENDS)
            if (noextends is not None) and (key in noextends):
                mergeTo[key] = copy.deepcopy(mergeFromValue);
                continue
            
            # both dicts has such key
            if key in mergeTo:
                mergeToValue = mergeTo.get(key)
                # if values are both dicts need to do recursive merge
                if isinstance(mergeToValue,types.DictType) and isinstance(mergeFromValue, types.DictType):
                    self.__mergeDict__(mergeToValue, mergeFromValue)
                else:
                    if isinstance(mergeFromValue, types.DictType):
                        mergeTo[key] = copy.deepcopy(mergeFromValue)
                    else:
                        mergeTo[key] = mergeFromValue
            #only mergeFrom has such key
            else:
                if isinstance(mergeFromValue, types.DictType):
                    mergeTo[key] = copy.deepcopy(mergeFromValue)
                else:
                    mergeTo[key] = mergeFromValue
    
    # ------------ Extending tag configuration with user defined components ----------------
    def extendWithComponents(self, components):
        """docstring for extend"""
        processedComponents = {}
        
        for ns in components.keys():
            for component in components[ns]:
                normalizedTagName = utils.XMLUtils.normalize(component.get('tag'))
                normalizedBaseTagName = utils.XMLUtils.normalize(component.get(self.EXTENDS))
                
                baseTagConf = self.__conf__.get(normalizedBaseTagName)
                newTagConf = copy.deepcopy(baseTagConf)
                
                #settings specific data for the new tag
                newTagConf.get(self.EXTENDS,[]).insert(0, normalizedTagName)
                props = newTagConf.get(self.DATA, {}).get('props',{})
                props['class'] = component.get('class')
                props['constructor-args'] = ''
                
                #render as simple class, no constructor args for now
                # TODO do it properly
                newTagConf['body'] = {
                    '*':self.__conf__.get('qx:widget').get('body').get('*')
                }
                
                if normalizedTagName in self.__conf__.keys():
                    logm.info('Overriding %s tag in configuration with a new definition from a user defined component.' %normalizedTagName)
                
                self.__conf__[normalizedTagName] = newTagConf
                
                
        
    def isComponentNSProcessed(self, ns):
        """docstring for isComponentNSProcessed"""
        return ns in self.__processedComponentNS__
    
    
    # ------------ Working with config and properties -----------
    def getConfig(self):
        """docstring for getConfig"""
        return self.__conf__
    
    def getConfigByTagName(self, tagName):
        """docstring for getConfByTagName"""
        conf = None
        try:
            conf = self.__conf__[tagName]
        except KeyError, e:
            logd.error("Unable to get configuraton for tag %s. Please check dialect configuration\
             files and make sure that there is a mapping for such tag there." %tagName)
            raise KeyError(e)
        return conf 
    
    def getPropByNameForTag(self, tagName, propPath):
        """docstring for getProp"""
        
        names = propPath.split(".");
        prop = self.getConfigByTagName(tagName)
        if prop:
            for name in names:
                if name in prop:
                    prop = prop.get(name)
                else:
                    return None
            return prop
        else:
            return None




# ---- TemplateConfig class -----            
class TemplatesConfig(object):
    
    # --- CONFIG KEYS ----
    BODY_TMPL_TYPE = "body"
    ADD_TMPL_TYPE = "add"
    ATTR_TMPL_TYPE = "attributes"  
    
    def __init__(self, tagsConfig):
        """docstring for __init__"""
        self.__tagsConfig__ = tagsConfig

    def getBodyTemplateFileName(self, econtext):
        """docstring for getBodyTemplateByTagName"""
        return self.__getTemplateFileName__(self.BODY_TMPL_TYPE, econtext)
    
    def getAddTemplateFileName(self, econtext):
        """docstring for getBodyTemplateByTagName"""
        return self.__getTemplateFileName__(self.ADD_TMPL_TYPE, econtext)
    
    def getAttrTemplateFileName(self, econtext):
        """docstring for getBodyTemplateByTagName"""
        # TODO hardcoded value, need to change in futute but now it cover all cases
        return self.__getTemplateFileName__(self.ATTR_TMPL_TYPE, econtext)

    def __getTemplateFileName__(self, tmplType, econtext):
        """docstring for getTemplateFileName"""
        
        #getting tag, parent and attr names from element context
        tagName = econtext.getTagName()
        parentName = econtext.getParentName()
        attrName = econtext.getAttrName()
        
        # for BODY and ADD templates type key will be parent name
        # for ATTR type key will be att name
        tmplKey = parentName
        if tmplType == self.ATTR_TMPL_TYPE:
            tmplKey = attrName
        
        fileName = None
        # 1) getting template for tagName by parent name
        if tmplKey is not None:
            logd.debug("Step 1: Searching template for %s[%s] by path %s.%s" %(tagName, tmplKey, tmplType, tmplKey))
                        
            fileName = self.__tagsConfig__.getPropByNameForTag(tagName, "%s.%s" %(tmplType, tmplKey))
            
            # 2) getting template for tagName by parent base configs name
            if fileName is None:
                inheritanceChain = None
                try:
                    #attibutes have no inheritance chain, do not need to process for attributes
                    if tmplType != self.ATTR_TMPL_TYPE:
                        inheritanceChain = self.__tagsConfig__.getPropByNameForTag(tmplKey, self.__tagsConfig__.EXTENDS)
                        logd.debug("Step 2: Searching template for %s[%s] by path %s.[%s]" %(tagName, tmplKey, tmplType, inheritanceChain))
                except:
                    pass

                if inheritanceChain:
                    for base in inheritanceChain:
                        fileName = self.__tagsConfig__.getPropByNameForTag(tagName, "%s.%s" %(tmplType, base))
                        if fileName is not None:
                            break
                # 3) getting template for tagName by parent namespace (like parentNS:*)
                if fileName is None:
                    # namespace of template key
                    ns = utils.XMLUtils.ns(tmplKey)
                    logd.debug("Step 3: Searching template for %s[%s] by path %s.%s:*" %(tagName, tmplKey, tmplType, ns))

                    fileName = self.__tagsConfig__.getPropByNameForTag(tagName, "%s.%s:*" %(tmplType, ns))
                    
                    # 4) getting template for tagName by *
                    if fileName is None:
                        logd.debug("Step 4: Searching template for %s[%s] by path  %s.*"  %(tagName, tmplKey, tmplType))

                        fileName = self.__tagsConfig__.getPropByNameForTag(tagName, "%s.*" %(tmplType))
        else:
            fileName = self.__tagsConfig__.getPropByNameForTag(tagName, "%s.*" %(tmplType))
        
        if fileName is not None:
            logd.debug("Template file with type %s for %s[%s] is %s." %(tmplType, tagName, tmplKey, fileName))
        
        return fileName
