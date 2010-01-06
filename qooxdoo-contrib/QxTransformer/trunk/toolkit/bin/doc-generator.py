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
from qxt.doc.generator import DocGenerator


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
    #directory where to store all documentation files
    opt.add_option('-d', "--dest", dest="dest_folder", action="store",
                    help="Folder where to store all documentation.")
    
    (options, args) = opt.parse_args()
    
    if not options.input_file or not options.dest_folder:
        logm.info("You didn't specified necessary options or they are incorrect. Please use -h,--help to see all available options.")
        return -1
    
    # get dialect settings
    dialect  = 'dialect.json'
    ds = settings.DialectSettings().load(dialect)
    tagsConf = ds.getTagsConfig()
    
    logm.info("Start processing tag configuration for %s dialect." %dialect)
    
    startTime = time()
    input_path = os.path.join(projectSourceDir, options.input_file)
    apiParser = ApiDataParser(ds,input_path)
    classInfoDict = apiParser.parseApiData()
    
    logm.info("Parsing done.")
    logm.info("Start generating documents for %s dialect." %dialect)
    
    output_path = os.path.join(projectSourceDir, options.dest_folder)
    doc_generator = DocGenerator(classInfoDict, tagsConf)
    doc_generator.api_viewer_url = "http://demo.qooxdoo.org/current/apiviewer/#"
    doc_generator.generate(output_path)
    
    logm.info("Generating done.")
    
    endTime = time()
    logm.info("Done in %.2f seconds." %(endTime-startTime))
    

if __name__ == '__main__':
    main()