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

# careful editing these, they are format strings
TXMT_URL1_FORMAT = r"txmt://open?url=file://%s&line=%s"
TXMT_URL2_FORMAT = r"txmt://open?url=file://%s&line=%s&col=%s"

HTML_HEADER_FORMAT = r"""<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>qooxdoo Syntax checker</title>
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


def validate(file):
    print HTML_HEADER_FORMAT % "qooxdoo JavaScript Syntax check"
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
    
    print HTML_FOOTER

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
