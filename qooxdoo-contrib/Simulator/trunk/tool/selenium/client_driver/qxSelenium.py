################################################################################
#
#  qooxdoo - the new era of web development
#
#  http://qooxdoo.org
#
#  Copyright:
#    2007 1&1 Internet AG, Germany, http://www.1and1.org
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

from selenium import selenium

class qxSelenium(selenium): # add qooxdoo specific extensions

    def __init__(self, host, port, browserStartCommand, browserURL):
        selenium.__init__(self, host, port, browserStartCommand, browserURL)

    def qxClick(self, locator, opts=None):
        if opts==None:
            self.do_command("qxClick", [locator,])
        else:
            self.do_command("qxClick", [locator, opts,])

    def qxClickAt(self, locator, opts=None):
        if opts==None:
            self.do_command("qxClickAt", [locator,])
        else:
            self.do_command("qxClickAt", [locator, opts,])

    def qxGetPageGeom(self):
        self.do_command("qxGetPageGeom", [])

