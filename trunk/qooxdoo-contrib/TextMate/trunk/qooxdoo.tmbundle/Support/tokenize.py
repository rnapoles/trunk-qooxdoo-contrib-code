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

QOOXDOO_PATH = os.environ['QOOXDOO_PATH'] 
QOOXDOO_MODULES = QOOXDOO_PATH + "/frontend/framework/tool/modules"

sys.path.append(QOOXDOO_MODULES)
import treegenerator
import tokenizer

def tokenize(file):
    try:
        data = "".join(file.readlines())
        restree = treegenerator.createSyntaxTree(tokenizer.parseStream(data))
        print '<?xml version="1.0" encoding="UTF-8"?>'
        print restree.toXml()

    except treegenerator.SyntaxException, e:
        print e

def main(argv=None):
	if argv is None:
		argv = sys.argv
	
	if len(argv) > 2:
	    return
	
	if len(argv) == 1:
	    file = sys.stdin
	else:
	    file = open(argv[1])
	tokenize(file)

if __name__ == "__main__":
	sys.exit(main())
