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
from util import TextMateLogger
util.addQooxdooClassPath()

from ecmascript.frontend import treegenerator
import ecmalint


def lint(file):
    
    for line in open(file).readlines():
        match = re.search("qx\.Class\.define\(\s*[\"'](.*?)\.", line)
        if match:
            ns = match.groups(1)[0]
            break
    
    logger = TextMateLogger()
    logger.printHeader("qooxdoo JavaScript lint", "qooxdoo JavaScript lint")
    try:
        lint = ecmalint.Lint(file, logger)
        lint.checkMaps()
        lint.checkUnusedVariables()
        lint.checkUndefinedVariables(["qx"])
    except treegenerator.SyntaxException, e:
        errorRe = re.compile("(.*file:, line:(\d+), column:(\d+))")
        match = errorRe.match(str(e)).groups()
        logger.log(file, match[1], match[2], match[0])
    
    logger.printFooter()
    

def main(argv=None):
	if argv is None:
		argv = sys.argv
	
	if len(argv) > 2:
	    return
	
	lint(argv[1])

if __name__ == "__main__":
	sys.exit(main())
