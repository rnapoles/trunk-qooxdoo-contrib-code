IS_WINDOWS = $(shell python -c "import sys; print (sys.platform[:3]=='win' or sys.platform[:6]=='cygwin')")

ifeq ($(IS_WINDOWS), True)
	ZIP_SUFFIX = zip
else
	ZIP_SUFFIX = tar.gz
endif

download-0.6.7: qooxdoo-0.6.7-sdk
qooxdoo-0.6.7-sdk: qooxdoo-0.6.7-sdk.$(ZIP_SUFFIX)

download-0.7: qooxdoo-0.7-sdk
qooxdoo-0.7-sdk: qooxdoo-0.7-sdk.$(ZIP_SUFFIX)
	
download-0.7.1: qooxdoo-0.7.1-sdk
qooxdoo-0.7.1-sdk: qooxdoo-0.7.1-sdk.$(ZIP_SUFFIX)

download-0.7.2: qooxdoo-0.7.2-sdk
qooxdoo-0.7.2-sdk: qooxdoo-0.7.2-sdk.$(ZIP_SUFFIX)

download-0.7.3: qooxdoo-0.7.3-sdk
qooxdoo-0.7.3-sdk: qooxdoo-0.7.3-sdk.$(ZIP_SUFFIX)

download-0.8: qooxdoo-0.8-sdk
qooxdoo-0.8-sdk: qooxdoo-0.8-sdk.zip

%.zip:
	wget http://downloads.sourceforge.net/qooxdoo/$@
	unzip $@
	

%.tar.gz:
	wget http://downloads.sourceforge.net/qooxdoo/$@
	tar xvfz $@


download-trunk: download-trunk

download-trunk:
	svn co https://qooxdoo.svn.sourceforge.net/svnroot/qooxdoo/trunk/qooxdoo trunk
	svn up trunk
	