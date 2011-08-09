
download: qooxdoo-$(VERSION)-sdk
qooxdoo-$(VERSION)-sdk: qooxdoo-$(VERSION)-sdk.zip

%.zip:
	wget http://downloads.sourceforge.net/qooxdoo/$@
	unzip -d $(WORK_PATH) $@
	rm $(WORK_PATH)/$@
	
trunk: trunk

trunk:
	svn co https://qooxdoo.svn.sourceforge.net/svnroot/qooxdoo/trunk/qooxdoo $(WORK_PATH)/trunk
	svn up $(WORK_PATH)/trunk
	patch -d $(WORK_PATH) ./trunk/patch/qooxdoo.diff
	patch -d $(WORK_PATH) ./trunk/patch/qooxdoo-tool.diff
	patch -d $(WORK_PATH) ./trunk/patch/demobrowser.diff

