#!/usr/bin/env python
# encoding: utf-8
"""
create.py

Created by Fabian Jakobs on 2008-11-06.
Copyright (c) 2008 1&1 Internet AG. All rights reserved.
"""

import sys
import os
import re
from string import Template

def create(template, filename):
    
    ns = "custom"
    cls = "Class"
    
    match = re.match(".*/class/(.*)/(.*)\.js", filename)
    if match:
        (ns, cls) = match.groups()
    else:
        match = re.match(".*/(.*)\.js", filename)
        if match:
            cls = match.groups()[0]
    
    template = Template(open(template).read())
    print template.substitute({
        "ns": ns.replace("/", "."),
        "class": cls
    })
    

def main(argv=None):
	if argv is None:
		argv = sys.argv
	
	template = argv[1]
	file = argv[2]
	
	create(template, file)


if __name__ == "__main__":
	sys.exit(main())
