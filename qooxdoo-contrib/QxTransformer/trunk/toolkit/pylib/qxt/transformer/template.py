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

from mako.lookup import TemplateLookup
from qxt.settings import settings
import os.path

import logging
from logging import config
logd = logging.getLogger("qxt.detailed")


class TemplateProvider(object):
    #------- Constants ---------
    TEMPLATES_DIR_NAME = "templates"
    TEMPLATES_MODULE_DIR_NAME = os.path.join("temp", "makomodule")
    
    
    def __init__(self, dialectSettings):
        """docstring for __init__"""
        gs = settings.GlobalSettings()
        
        self.__dialectSettings__ = dialectSettings
        self.__templatesConfig__ = dialectSettings.getTemplatesConfig() 
        
        #dialectTmplDirName = self.__dialectSettings__.getPathForDialect(self.TEMPLATES_DIR_NAME)
        dialectsTmplDirs = [ os.path.join(path, self.TEMPLATES_DIR_NAME) for path in self.__dialectSettings__.getDialectsDirectories() ]
        moduleTmplDirName = os.path.abspath(os.path.join(gs.props['cwd'],'..',self.TEMPLATES_MODULE_DIR_NAME))
        
        logd.debug("Picking up templates by path %s." %dialectsTmplDirs)
        logd.debug("Processed templates files will be stored by path %s." %moduleTmplDirName)
        
        # creating mako template lookup
        self.__lookup__ = TemplateLookup(directories=dialectsTmplDirs, module_directory=moduleTmplDirName)
        
    
    def getBodyTemplate(self, econtext):
        """docstring for getBodyTemplate"""
        
        bodyTmplFileName = self.__templatesConfig__.getBodyTemplateFileName(econtext)
        
        #empty string is a sign that we don't need to render node
        if bodyTmplFileName and len(bodyTmplFileName)!=0:
            return self.__lookup__.get_template(bodyTmplFileName)
        #something wrong if we get None
        else:
            if bodyTmplFileName is not None:
                logd.debug("Do not need to render 'body' structure for following context: %s", econtext.toString())
            else:
                logd.warning("Unable to get 'body' file name of template for following context of element: %s.", econtext.toString())
            return None
    

    def getAddTemplate(self, econtext):
        """docstring for getAddTemplate"""
        
        addTmplFileName = self.__templatesConfig__.getAddTemplateFileName(econtext)
        
        #empty string is a sign that we don't need to render node
        if addTmplFileName and len(addTmplFileName)!=0:
            return self.__lookup__.get_template(addTmplFileName)
        #something wrong if we get None
        else:
            if addTmplFileName is not None:
                logd.debug("Do not need to render 'add' structure for following context: %s", econtext.toString())
            else:
                logd.warning("Unable to get 'add' file name of template for following context of element: %s.", econtext.toString())
            return None
    
    def getAttrTemplate(self, econtext):
        """docstring for getAddTemplate"""
        
        attrTmplFileName = self.__templatesConfig__.getAttrTemplateFileName(econtext)
        
        #empty string is a sign that we don't need to render node
        if attrTmplFileName and len(attrTmplFileName)!=0:
            return self.__lookup__.get_template(attrTmplFileName)
        #something wrong if we get None
        else:
            if attrTmplFileName is not None:
                logd.debug("Do not need to render 'attr' structure for following context: %s", econtext.toString())
            else:
                logd.warning("Unable to get 'attr' file name of template for following context of element: %s.", econtext.toString())
            return None
