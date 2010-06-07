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

    def qxTableClick(self, locator, opts=None):
        if opts==None:
            return self.do_command("qxTableClick", [locator,])
        else:
            return self.do_command("qxTableClick", [locator, opts,])

    def qxTableHeaderClick(self, locator, opts=None):
        if opts==None:
            return self.do_command("qxTableHeaderClick", [locator,])
        else:
            return self.do_command("qxTableHeaderClick", [locator, opts,])
    
    def qxEditTableCell(self, locator, opts=None):
        if opts==None:
            return self.do_command("qxEditTableCell", [locator,])
        else:
            return self.do_command("qxEditTableCell", [locator, opts,])
    
    def qxTableGetRows(self, locator):
        return self.do_command("getQxTableRows", [locator,])

    def qxTableGetCols(self, locator):
        return self.do_command("getQxTableCols", [locator,])
    
    def qxTableGetColumnIds(self, locator):
        return self.do_command("getQxTableIds", [locator,])      

    def qxTableGetColumnIndexByName(self, locator, name):
        return self.do_command("getQxTableColumnIndexByNameLocator", [locator, name,])
    
    def qxTableGetValue(self, locator, opts=None):
        if opts==None:
            return self.do_command("getQxTableValue", [locator,])
        else:
            return self.do_command("getQxTableValue", [locator, opts,])
          
    def qxObjectExecFunction(self, locator, functionName):
        return self.do_command("getQxObjectFunction", [locator, functionName,])

    def qxDragAndDrop(self, locator, opts=None):
        if opts==None:
            return self.do_command("qxDragAndDrop", [locator,])
        else:
            return self.do_command("qxDragAndDrop", [locator, opts,])

    def qxDragAndDropToObject(self, locator, opts=None):
        if opts==None:
            return self.do_command("qxDragAndDropToObject", [locator,])
        else:
            return self.do_command("qxDragAndDropToObject", [locator, opts,])

    def qxType(self, locator, value):
        return self.do_command("qxType", [locator, value,])
    
    def qxTypeKeys(self, locator, value):
        return self.do_command("qxTypeKeys", [locator, value,])

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
