IS_WINDOWS = $(shell python -c "import sys; print (sys.platform[:3]=='win' or sys.platform[:6]=='cygwin')")

ifeq ($(IS_WINDOWS), True)
	ZIP_SUFFIX = zip
else
	ZIP_SUFFIX = tar.gz
endif


download-0.7: qooxdoo-0.7-sdk
qooxdoo-0.7-sdk: qooxdoo-0.7-sdk.$(ZIP_SUFFIX)
	

%.zip:
	wget http://downloads.sourceforge.net/qooxdoo/$@
	unzip $@
	

%.tar.gz:
	wget http://downloads.sourceforge.net/qooxdoo/$@
	tar xvfz $@


download-trunk: trunk

trunk:
	svn co https://qooxdoo.svn.sourceforge.net/svnroot/qooxdoo/trunk/qooxdoo trunk
	svn up trunk
	