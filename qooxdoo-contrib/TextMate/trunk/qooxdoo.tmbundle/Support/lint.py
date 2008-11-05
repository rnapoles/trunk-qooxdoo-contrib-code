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

# careful editing these, they are format strings
TXMT_URL1_FORMAT = r"txmt://open?url=file://%s&line=%s"
TXMT_URL2_FORMAT = r"txmt://open?url=file://%s&line=%s&col=%s"

HTML_HEADER_FORMAT = r"""<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>%s</title>
<style type="text/css">
<!--

body {
  background-color: #D8E2F1;
  margin: 0;
}

div#body {
  border-style: dotted;
  border-width: 1px 0;
  border-color: #666;
  margin: 10px 0;
  padding: 10px;
  background-color: #C9D9F0;
}

div#output{
  padding: 0;
  margin: 0;
  font-family: Monaco;
  font-size: 8pt;
}

strong.title { font-size: 11pt; }
span.stderr { color: red; }
p {margin: 0; padding: 2px 0; }

-->
</style>
</head>
<body>
<div id="body">
<p><strong class="title">%s</strong></p><br>
<div id="output">
"""

HTML_FOOTER = """</div>
</div>
</body>
</html>
"""


class TextMateLogger:
    def printHeader(self):
        print HTML_HEADER_FORMAT % ("qooxdoo JavaScript lint", "qooxdoo JavaScript lint")

    def log(self, filename, row, column, msg):
        print "<a href='txmt://open?url=file://%s&line=%s&column=%s'>%s</a><br>" % (filename, row, column, msg)
        
    def printFooter(self):
        print HTML_FOOTER
        

def lint(file):
    
    for line in open(file).readlines():
        match = re.search("qx\.Class\.define\(\s*[\"'](.*?)\.", line)
        if match:
            ns = match.groups(1)[0]
            break
    
    logger = TextMateLogger()
    logger.printHeader()
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
