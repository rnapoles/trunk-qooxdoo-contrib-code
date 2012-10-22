#!/usr/bin/env python
# encoding: utf-8
"""
util.py

Created by Fabian Jakobs on 2008-11-05.
Copyright (c) 2008 1&1 Internet AG. All rights reserved.
"""

import os
import sys

def getQooxdoo():
    if "QOOXDOO_PATH" in os.environ:
        qxPath = os.environ['QOOXDOO_PATH']
        if os.path.isdir(qxPath):
            return qxPath

    logger = TextMateLogger()
    logger.printHeader("qooxdoo SDK not found", "qooxdoo SDK not found")
    print "The path to the qooxdoo SDK could not be found. Please configure the QOOXDOO_PATH shell variable to point to the the qooxdoo SDK directory. You can do this in the Advanced tab of the Preferences dialog."
    logger.printFooter()

    #os.system("""CocoaDialog msgbox --title "qooxdoo SDK not found" --button1 "OK" --text "qooxdoo SDK not found" --informative-text "The path to the qooxdoo SDK could not be found. Please configure the QOOXDOO_PATH shell variable to point to the the qooxdoo SDK directory. You can do this in the Advanced tab of the Preferences dialog." """)
    sys.exit()

def addQooxdooClassPath():
    path = getQooxdoo()
    sys.path.append(path + "/tool/pylib")
    sys.path.append(path + "/tool/bin")


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
  padding: 0px;
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
    def printHeader(self, title, heading):
        print HTML_HEADER_FORMAT % (title, heading)

    def log(self, filename, row, column, msg):
        print "<a href='txmt://open?url=file://%s&line=%s&column=%s'>%s</a><br>" % (repr(filename), row, column, msg.encode('ascii', 'xmlcharrefreplace'))

    def printFooter(self):
        print HTML_FOOTER

class PopupLogger:
    def printHeader(self, title, heading):
        pass

    def log(self, filename, row, column, msg):
        print msg.encode('ascii', 'replace')

    def printFooter(self):
        pass

