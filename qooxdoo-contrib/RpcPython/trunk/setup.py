#!/usr/bin/python

import os
import os.path as op
from distutils.core import setup

version_symbols={}
execfile(op.join('qxjsonrpc', '_version.py'), globals(), version_symbols)
version = version_symbols['__version__']

#testdir = op.join('qxjsonrpc', 'test')

setup(name         = "qxjsonrpc",
      version      = version.number,
      author       = "Viktor Ferenczi",
      author_email = "python@cx.hu",
      #url          = "http://python.cx.hu",
      #download_url = "http://cheeseshop.python.org/pypi/qxjsonrpc/%s" % version.number,
      #download_url = "http://python.cx.hu/qxjsonrpc/qxjsonrpc-%s.tar.gz" % version.number,
      description  = "JSON-RPC backend for WEB applications using QooXdoo or simply requiring RPC functionality",
      long_description = open('README', 'r').read(),
      license      = "LGPL",
      platforms    = ["Platform Independent"],
      classifiers  = [
        "Development Status :: 3 - Alpha",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: GNU Library or Lesser General Public License (LGPL)",
        "Operating System :: OS Independent",
        "Programming Language :: Python",
        "Topic :: Software Development :: Libraries :: Python Modules"
      ],
      packages = ["qxjsonrpc"],
      package_data = {
      },
)
