#!/usr/bin/env python

################################################################################
#
#  qooxdoo - the new era of web development
#
#  http://qooxdoo.org
#
#  Copyright:
#    2007-2009 1&1 Internet AG, Germany, http://www.1und1.de
#
#  License:
#    LGPL: http://www.gnu.org/licenses/lgpl.html
#    EPL: http://www.eclipse.org/org/documents/epl-v10.php
#    See the LICENSE file in the project's top-level directory for details.
#
#  Authors:
#    * Daniel Wagner (d_wagner)
#
################################################################################

##
# <p>Extremely simple server-side validation script for a Hijax-enabled web 
# site. Checks if the request has a parameter "message_textarea" and returns 
# "true" if its value is at least three characters long.</p>

def index(req, message_textarea=False):
  out = "false"
  if message_textarea and len(message_textarea) > 2:
    out = "true"
  return out
