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

import qxtenv
import os
import sys
import optparse
import logging
from logging import config
import re
import time

reload(sys)
sys.setdefaultencoding( "utf-8" )


from qxt.settings import settings
from qxt.transformer import processor

log = logging.getLogger("qxt.main")
logd = logging.getLogger("qxt.detailed")

def xmlfiles(rootpath):
    dirwalker = os.walk(rootpath)
    
    for (path, dirlist, filelist) in dirwalker:
        for filename in filelist:
            if not re.search(r'.*\.xml$', filename):
                continue
            
            yield os.path.join(path,filename)
            

def writeToFile(fname,content):
    """docstring for writeToFile"""
    
    if not os.path.exists(os.path.dirname(fname)):
        os.makedirs(os.path.dirname(fname))
    
    #TODO: add proper error handling
    f = open(getProjectPath(fname), "w")
    f.write(content)
    f.close();


def __getProcessor__(dialect_config_path):
    """docstring for __getProcessor__"""
    log.debug("Getting processor with dialect configuration %s." %dialect_config_path)
    
    return processor.Processor(dialect_config_path)

def __processFile__(filePath, options):
    """docstring for processFile"""
    
    log.info("Processing file %s" %filePath)
    
    p = __getProcessor__(options.dialect_config_path)
    result =  p.transform(filePath)
    
    if options.out:
        outputPath = getProjectPath(options.out)
    else:
        outputPath = getProjectPath(options.file + ".js")        
        
    log.info("Writing processed javascript to %s" %outputPath)
    writeToFile(outputPath, result)    
    
def __processDir__(dirPath, options):
    """docstring for processDir"""
    
    log.info("Processing directory %s" %dirPath)
    #p = __getProcessor__(options.dialect)
    
    if os.path.isdir(dirPath):
        p = __getProcessor__(options.dialect_config_path)
        
        for path in xmlfiles(dirPath):
            #path = os.path.join(xml_dir, name)
            
            if os.path.isfile(path):
                log.info("Processing file %s" %path)
                result = p.transform(path)
                
                relativePath = relpath(path,dirPath)
                fileName = os.path.basename(relativePath)
                packagePath = os.path.dirname(relativePath)
                
                jsFileName = fileName.replace(".xml", ".js")
                
                if options.out:
                    # options.out could be an absolute path, need to check
                    outputPath = getProjectPath(os.path.join(options.out, packagePath, jsFileName))
                else:
                    outputPath = getProjectPath(os.path.join(packagePath, jsFileName))
                
                log.info("Writing processed javascript to %s" %outputPath)
                writeToFile(outputPath, result)
                
            else:
                log.info("Skipping directory %s" %name)
    else:
        gs = settings.GlobalSettings()
        projectDir = gs.props[settings.GlobalSettings.PROJECT_DIR]
        log.info("%s is not a directory. Please specify directory where to process files." %os.path.abspath(os.path.join(projectDir,dirPath)))

def relpath(path, reldir):
    """Returns 'path' relative to 'reldir'."""
    
    # use normpath to ensure path separators are uniform
    path = os.path.normpath(path)
    
    # find length of reldir as prefix of path (or zero if it isn't)
    prelen = len(os.path.commonprefix((os.path.normcase(path), os.path.normcase(os.path.normpath(reldir)) + os.sep)))
    return path[prelen:]

def main():
    """docstring for main"""
    
    #setting current working directory
    
    #projectSourceDir is directory source directory of qooxdoo project
    # build systems calls qxt with project's CWD
    projectSourceDir = os.getcwd();
    
    #setting CWD to qxtransformer's directory
    os.chdir(os.path.dirname(os.path.abspath(sys.argv[0])))
    
    #configure logging
    logging.config.fileConfig("logging.conf")
    
    
    
    #Setting up global settings
    gs = settings.GlobalSettings()
    gs.props[settings.GlobalSettings.PROJECT_DIR] = projectSourceDir
    gs.props[settings.GlobalSettings.CWD_DIR] = os.getcwd()
    
    #parse options
    opt = optparse.OptionParser()
    #directory with xml files to recurrent processing
    opt.add_option('-d',"--dir",dest="dir", action="store")
    #xml file to processing
    opt.add_option('-f',"--file",dest="file", action="store")
    #qxt sysntax name, default is qxml
    opt.add_option("-D","--dialect-config",dest="dialect_config_path", action="store", default="dialect.json")
    #file or folder to output
    opt.add_option("-o","--out",dest="out", action="store")
    #file or folder to output
    opt.add_option("-v","--verbosity",dest="verbosity", action="store", default="main:INFO;dev:ERROR")
    
    
    (options, args) = opt.parse_args()
    
    #adding xml directories to GlobalSettings
    #XML_OUT_DIR: -o 
    #XML_SOURCE_DIR: -d or if we process only one file (option -f), than add parent directory of the file
    gs.props[settings.GlobalSettings.XML_OUT_DIR] = os.path.join(projectSourceDir, options.out)
    
    if options.dir:
        gs.props[settings.GlobalSettings.XML_SOURCE_DIR] = os.path.join(projectSourceDir, options.dir)
    else:
        gs.props[settings.GlobalSettings.XML_SOURCE_DIR] = os.path.dirname(os.path.join(projectSourceDir, options.file))
    
    __configureLogging__(options)
    
    log.info("Your project directory: %s" %projectSourceDir)
    log.info("QxTransformer directory: %s" %os.getcwd())
    
    startTime = time.time();
    
    #processing only one file, option -f
    if options.file:
        #getting real path by relative
        filePath = getProjectPath(options.file)
        __processFile__(filePath, options)
    #processing whole directory
    elif options.dir:
        #getting real path by relative
        dirPath = getProjectPath(options.dir)
        __processDir__(dirPath,options)
    
    
    endTime = time.time();
    
    log.info("Processing is done in %.2f seconds." %(endTime-startTime))

def getProjectPath(path):
    """docstring for getProjectPath"""
    gs = settings.GlobalSettings()
    projectSourceDir = gs.props[settings.GlobalSettings.PROJECT_DIR]
    return os.path.join(projectSourceDir, path)

def __configureLogging__(options):
    """docstring for __configureLogging__"""
    verbosity = options.verbosity
    
    if verbosity:
        groups = verbosity.split(";")
        for group in groups:
            if group:
                props = group.split(":")
                
                if len(props)==2 and props[0] and props[1]:
                    if props[0] == "main":
                        log.setLevel(__getLogLevel__(props[1]))
                    elif props[0] == "dev": 
                        logd.setLevel(__getLogLevel__(props[1]))
                    else:
                        print "- Ignore logging configuration group %s for logger %s" %(group, props[0])
                else:
                    print "- Ignore logging configuration group %s" %group

def __getLogLevel__(name):
    """docstring for fname"""
    #check if there is a such built-in fuctionality in logging
    level = logging.NOTSET
    if name=="CRITICAL":
        level = logging.CRITICAL
    elif name=="ERROR":
        level = logging.ERROR
    elif name=="WARNING":
        level = logging.WARNING
    elif name=="INFO":
        level = logging.INFO
    elif name=="DEBUG":
        level = logging.DEBUG
        
    return level
    
    
    
if __name__ == '__main__':
    main()