import qxtenv
import os
import sys
import lxml.etree as etree
import pprint
import cStringIO
from time import time
import optparse

import logging
from logging import config
logm = logging.getLogger("qxt.main")

from qxt.settings import settings
from qxt.xsd.utils import ApiDataParser
from qxt.xsd.generator import SchemaGenerator


def main():
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
    #xml file with API data
    opt.add_option('-i', "--input_file", dest="input_file", action="store",
                    help="File with qooxdoo XML API data.")
    #xml file to processing
    opt.add_option('-o', "--output_file",dest="output_file", action="store",
                    help="Destination XSD file.")
    
    (options, args) = opt.parse_args()
    
    if not options.input_file or not options.output_file:
        logm.info("You didn't specified necessary options. Please use -h,--help to see all available options.")
        return -1
    
    # get dialect settings
    dialect  = 'dialect.json'
    ds = settings.DialectSettings().load(dialect)
    
    
    logm.info("Start processing tag configuration for %s dialect." %dialect)
    
    startTime = time()
    
    input_path = os.path.join(projectSourceDir, options.input_file)
    apiParser = ApiDataParser(ds, input_path)
    classInfoDict = apiParser.parseApiData()
    
    logm.info("Parsing done.")
    logm.info("Start generating XSD for %s dialect." %dialect)
    
    output_path = os.path.join(projectSourceDir, options.output_file)
    schema_generator = SchemaGenerator(classInfoDict)
    schema_generator.generate(output_path)
    
    logm.info("Generating done.")
    
    endTime = time()
    logm.info("Done in %.2f seconds." %(endTime-startTime))
    

if __name__ == '__main__':
    main()