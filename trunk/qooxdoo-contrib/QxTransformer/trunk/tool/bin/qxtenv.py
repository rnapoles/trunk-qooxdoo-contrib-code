#!/usr/bin/env python

################################################################################
#
#  qxtransformer - xml->javascript converter
#
#  http://qxtransformer.org
#
#  Copyright:
#    2008 Siarhei Barysiuk and Christian Boulanger
#
#  License:
#    LGPL: http://www.gnu.org/licenses/lgpl.html
#    EPL: http://www.eclipse.org/org/documents/epl-v10.php
#
#  Authors:
#    * Siarhei Barysiuk (sbarysiuk)
#
################################################################################

import sys, os

##
# qxtenv.py -- provide PYTHONPATH extension
##

# calculate script path
scriptDir = os.path.dirname(os.path.abspath(sys.argv[0])) 
# extend PYTHONPATH with 'pylib'
sys.path.insert(0, 
    os.path.normpath(
        os.path.join( scriptDir, os.pardir, "pylib")))