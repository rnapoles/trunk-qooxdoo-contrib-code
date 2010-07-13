#!/usr/bin/env python
# encoding: utf-8
"""
untitled.py

Created by Martin Wittemann & Thomas Herchenroeder on 2010-07-13.
Copyright (c) 2010 1&1. All rights reserved.
"""

import re
import os
import sys
from subprocess import *

import util
from util import TextMateLogger
util.addQooxdooClassPath()

from ecmascript.frontend import treegenerator
import ecmalint

def get_class(path):
    classname =""
    idx = path.find("source/class")
    if idx > -1 :
        idx += len("source/class/")
        classname = path[idx:]
        classname = classname.replace("/", ".")
        classname = classname.replace(".js", "")
    return classname

def run_job(path):            
    class_name = get_class(path)

    out = Popen(["." + "/generate.py", "api-data", class_name], stdout=PIPE).communicate()[0]
    
    return class_name
        


def main(argv=None):
	if argv is None:
		argv = sys.argv
	
	if len(argv) > 2:
	    return
	
	path = os.path.dirname(argv[1])
	filename = argv[1]
	os.chdir(path)
	
	while path is not "/":
	    generate = os.path.join(path, "generate.py")
	    if os.path.exists(generate):
	        if os.path.exists(os.path.join(path, "config.json")):
	            classname = run_job(filename)
	            print path + "/api/index.html"
	            return
	    os.chdir("..")
	    path = os.getcwd()
	
	
if __name__ == "__main__":
	sys.exit(main())