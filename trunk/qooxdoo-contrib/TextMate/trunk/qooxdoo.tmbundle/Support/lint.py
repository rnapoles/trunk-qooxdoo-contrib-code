#!/usr/bin/env python
# encoding: utf-8
"""
Created by Fabian Jakobs on 2007-08-01.
Copyright (c) 2007 1&1. All rights reserved.
"""

import re, codecs
import os
import sys
import getopt

import util
util.addQooxdooClassPath()

from ecmascript.frontend import treegenerator
from ecmascript.transform.check import scopes, lint
from generator import Context as context


def do_lint(file_, popup):
    if popup:
        logger = util.PopupLogger()
    else:
        logger = util.TextMateLogger()

    logger.printHeader("qooxdoo JavaScript lint", "qooxdoo JavaScript lint")
    try:
        opts = lint.defaultOptions()
        opts.allowed_globals = ['qx', 'qxWeb', 'q']

        tree_ = treegenerator.createFileTree_from_string(
            codecs.open(file_, "r", "utf-8").read())
        tree_ = scopes.create_scopes(tree_)
        if not hasattr(context,'jobconf'):
            context.jobconf = {}
        lint.lint_check(tree_, "", opts)

    except treegenerator.SyntaxException, e:
        logger.log(file_, 0, 0, str(e))

    logger.printFooter()


def main(argv=None):
    if argv is None:
        argv = sys.argv

    if len(argv) == 3:
        popup = argv[2] == "popup"
    else:
        popup = False

    do_lint(argv[1], popup)

if __name__ == "__main__":
	sys.exit(main())
