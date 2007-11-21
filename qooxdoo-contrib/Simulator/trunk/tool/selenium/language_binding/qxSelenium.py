
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

