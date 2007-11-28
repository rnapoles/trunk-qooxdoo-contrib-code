#!/usr/bin/env python
import sys, time
#from selenium import selenium
from qxSelenium import qxSelenium

sel = qxSelenium("localhost",4444,"*firefox","http://localhost/")

if len(sys.argv)<=1:  # in case you want to load the app
    #sel.open("http://localhost/~thron7/qooxdoo.div/themen/selenium/qooxdoo-0.7.2-skeleton/skeleton/source/index.html")
    sel.start() # don't misread this: the server has to be running already!
    sel.open("http://localhost/~thron7/qooxdoo.div/themen/selenium/showcase/build/")

else : # you can hijack an existing session through its sessionId
    sel.sessionId = long(sys.argv[1])

# auf der "Form" Seite:
sel.qxClick(r'//div[text()="Form"]')

## "Some controls"
# fuellt 'Name' field
sel.type(r'//input[@type="text"]', "Rampano Zampano")

# schaltet spinner hoch
sel.qxClick(r'//img[@src="./resource/qx/widget/Windows/arrows/up_small.gif"]')
sel.qxClick(r'//img[@src="./resource/qx/widget/Windows/arrows/up_small.gif"]')
sel.qxClick(r'//img[@src="./resource/qx/widget/Windows/arrows/up_small.gif"]')
sel.qxClick(r'//img[@src="./resource/qx/widget/Windows/arrows/up_small.gif"]')

# selektiert 'Network' from combo
sel.qxClick(r'//img[@src="./resource/qx/widget/Windows/arrows/down.gif"]')
sel.qxClick(r'//div[text()="Network"]')

# fill 'E-Mail' (problem: kein alleinstellungsmerkmal bzgl. 'Name')
sel.type(r'//div[text()="E-Mail"]/following-sibling::div/input[@type="text"]',r'foo@bar.com')

# fill 'Comment'
sel.type(r'//textarea', "Ruffelpuff woz ere")
# click 'Submit'
sel.qxClick(r'//div[text()="Submit"]')

## "Some settings"
sel.qxClick(r'//div[text()="Permit others to view my favorites"]/preceding-sibling::input')
sel.qxClick(r'//div[text()="Use the very high bitrate"]/preceding-sibling::input')

## "Network speed"
sel.qxClick(r'//div[text()="Modem"]/preceding-sibling::input')
sel.qxClick(r'//div[text()="DSL"]/preceding-sibling::input')
sel.qxClick(r'//div[text()="Direct link"]/preceding-sibling::input')
sel.qxClick(r'//div[text()="Modem"]/preceding-sibling::input')
sel.qxClick(r'//div[text()="DSL"]/preceding-sibling::input')
sel.qxClick(r'//div[text()="Direct link"]/preceding-sibling::input')

## go through other tabs - slowly!
for tab in ['Tooltip', 'Menu and Toolbar', 'Tab', 'Tree', 'List', 'ListView', 'Table',
            'SplitPane', 'Localization', 'Native Window', 'Internal Window', 'Themes']:
    loc = r'//div[text()="' + tab + r'"]'
    sel.qxClick(loc)
    time.sleep(2)
