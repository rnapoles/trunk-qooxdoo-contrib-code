#!/usr/bin/env python
################################################################################
#
#  qooxdoo - the new era of web development
#
#  http://qooxdoo.org
#
#  Copyright:
#    2008 1&1 Internet AG, Germany, http://www.1und1.de
#
#  License:
#    LGPL: http://www.gnu.org/licenses/lgpl.html
#    EPL: http://www.eclipse.org/org/documents/epl-v10.php
#    See the LICENSE file in the project's top-level directory for details.
#
#  Authors:
#    * Thomas Herchenroeder (thron7)
#
################################################################################

##
# This is a stub proxy for the real generator.py
##

import sys, os

CMD_PYTHON = 'python'
QOOXDOO_PATH = '../../../../../trunk/qooxdoo'
REAL_GENERATOR = os.path.normpath(
                    os.path.join(os.path.abspath(os.path.dirname(sys.argv[0])),
                                 QOOXDOO_PATH, 'tool', 'bin', 'generator.py'))
                                 
os.chdir(os.path.dirname(sys.argv[0]))  # switch to skeleton dir

argList = []
argList.append(CMD_PYTHON)
argList.append(REAL_GENERATOR)
argList.extend(sys.argv[1:])

os.execvp(CMD_PYTHON, argList)
