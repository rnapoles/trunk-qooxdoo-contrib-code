#!/usr/bin/env python
# encoding: utf-8
"""
untitled.py

Created by Fabian Jakobs on 2007-08-01.
Copyright (c) 2007 1&1. All rights reserved.
"""

import re
import os
import sys
import getopt

import util
util.addQooxdooClassPath()

from ecmascript.frontend import treegenerator
import ecmalint


def lint(file, popup):    
    if popup: 
        logger = util.PopupLogger()        
    else: 
        logger = util.TextMateLogger()        

    logger.printHeader("qooxdoo JavaScript lint", "qooxdoo JavaScript lint")
    try:
        lint = ecmalint.Lint(file, logger)
        lint.checkMaps()
        lint.checkUnusedVariables()
        lint.checkUndefinedVariables(["qx", "qui"])
        lint.checkRequiredBlocks()
        lint.checkFields()
        lint.checkReferenceFields()
        
    except treegenerator.SyntaxException, e:
        errorRe = re.compile("(.*file:, line:(\d+), column:(\d+))")
        match = errorRe.match(str(e)).groups()
        logger.log(file, match[1], match[2], match[0])
    
    logger.printFooter()
    

def main(argv=None):
    if argv is None:
		    argv = sys.argv	

    if len(argv) == 3:
        popup = argv[2] == "popup"
    else:
        popup = False

    lint(argv[1], popup)

if __name__ == "__main__":
	sys.exit(main())
