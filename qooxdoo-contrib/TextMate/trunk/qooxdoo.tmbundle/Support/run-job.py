#!/usr/bin/env python
# encoding: utf-8
"""
run-job.py

Created by Fabian Jakobs on 2007-08-01.
Copyright (c) 2007 1&1. All rights reserved.
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


def get_jobs(path):
    out = Popen([path + "/generate.py", "-c", "config.json", "?"], stdout=PIPE).communicate()[0]
    jobs = []
    for line in out.split("\n"):
        match = re.search("  \- (.*)", line)
        if match:
            jobs.append(match.groups(1)[0])            
    return jobs


def run_job(path):            
    jobs = get_jobs(path)
    cmd = ["CocoaDialog", "standard-dropdown", "--string-output", "--title", "run job", "--items"]
    cmd.extend(jobs)
    cmd.extend(['--text', 'Select job:'])
    
    out = Popen(cmd, stdout=PIPE).communicate()[0]
    (choice, job) = out.split()
    if choice != "Ok":
        return

    title = "running job '%s'" % job
    logger = TextMateLogger()    
    logger.printHeader(title, title)

    print "<pre>"
    print Popen([path + "/generate.py", job], stdout=PIPE).communicate()[0]
    print "</pre>"
        
    logger.printFooter()


def main(argv=None):
	if argv is None:
		argv = sys.argv
	
	if len(argv) > 2:
	    return
	
	path = os.path.dirname(argv[1])
	os.chdir(path)
	
	while path is not "/":
	    generate = os.path.join(path, "generate.py")
	    if os.path.exists(generate):
	        if os.path.exists(os.path.join(path, "config.json")):
	            run_job(path)
	            return
	    os.chdir("..")
	    path = os.getcwd()
	
	
if __name__ == "__main__":
	sys.exit(main())
