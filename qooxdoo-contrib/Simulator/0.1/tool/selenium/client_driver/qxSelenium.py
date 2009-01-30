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
            return self.do_command("qxClick", [locator,])
        else:
            return self.do_command("qxClick", [locator, opts,])

    def qxClickAt(self, locator, opts=None):
        if opts==None:
            return self.do_command("qxClickAt", [locator,])
        else:
            return self.do_command("qxClickAt", [locator, opts,])

    def get_viewport(self):
        return self.do_command("getViewport", [])

    # overloading method from selenium.py
    def capture_screenshot(self,filename,geometry=None):
        """
        Captures a PNG screenshot to the specified file.
        
        'filename' is the absolute path to the file to be written, e.g. "c:\blah\screenshot.png"
        """
        if geometry==None:
            return self.do_command("captureScreenshot", [filename,])
        else:
            return self.do_command("captureScreenshot", [filename, geometry,])

