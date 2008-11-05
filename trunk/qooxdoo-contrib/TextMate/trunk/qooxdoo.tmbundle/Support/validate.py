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
from ecmascript.frontend import tokenizer


def validate(file):
    logger = util.TextMateLogger()
    logger.printHeader("qooxdoo JavaScript Syntax check", "qooxdoo JavaScript Syntax check")
    has_errors = False

    try:
        data = "".join(file.readlines())
        restree = treegenerator.createSyntaxTree(tokenizer.parseStream(data))
    except treegenerator.SyntaxException, e:
        has_errors = True
        errorRe = re.compile("(.*file:, line:(\d+), column:(\d+))")
        match = errorRe.match(str(e)).groups()
        print "<a href='txmt://open?line=%s&column=%s'>%s</a>" % (match[1], match[2], match[0])
    
    if not has_errors:
        print "No syntax errors."
    
    logger.printFooter()


def main(argv=None):
	if argv is None:
		argv = sys.argv
	
	if len(argv) > 2:
	    return
	
	if len(argv) == 1:
	    file = sys.stdin
	else:
	    file = open(argv[1])
	validate(file)

if __name__ == "__main__":
	sys.exit(main())
