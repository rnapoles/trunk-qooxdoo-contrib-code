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
        if qx.path.isdir(qxPath):
            return qxPath

    os.system("""CocoaDialog msgbox --title "qooxdoo SDK not found" --button1 "OK" --text "qooxdoo SDK not found" --informative-text "The path to the qooxdoo SDK could not be found. Please configure the QOOXDOO_PATH shell variable to point to the the qooxdoo SDK directory. You can do this in the Advanced tab of the Preferences dialog." """)
    sys.exit()

#        os.system("""CocoaDialog msgbox --title "qooxdoo SDK not found" -‑text "The path to the qooxdoo SDK could not be found. Please configure the QOOXDOO_PATH shell variable to point to the the qooxdoo SDK directory. You can do this in the Advanced tab of the Preferences dialog."  --button1 OK""")
    return qxPath

def addQooxdooClassPath():
    path = getQooxdoo()
    sys.path.append(path + "/tool/pylib")
    sys.path.append(path + "/tool/bin")


