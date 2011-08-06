IS_WINDOWS = $(shell python -c "import sys; print (sys.platform[:3]=='win' or sys.platform[:6]=='cygwin')")

ifeq ($(IS_WINDOWS), True)
	ZIP_SUFFIX = zip
else
	ZIP_SUFFIX = tar.gz
endif

#download-1.4.2: qooxdoo-1.4.2-sdk
#qooxdoo-1.4.2-sdk: 1.4.2/qooxdoo-1.4.2-sdk.$(ZIP_SUFFIX)

download-1.5: qooxdoo-1.5-sdk
qooxdoo-1.5-sdk: 1.5/qooxdoo-1.5-sdk.$(ZIP_SUFFIX)

%.zip:
	wget http://sourceforge.net/projects/qooxdoo/files/qooxdoo-current/$@/download
	unzip $@
	
%.tar.gz:
	wget http://sourceforge.net/projects/qooxdoo/files/qooxdoo-current/$@/download
	tar xvfz $@

download-trunk: download-trunk

download-trunk:
	svn co https://qooxdoo.svn.sourceforge.net/svnroot/qooxdoo/trunk/qooxdoo trunk
	svn up trunk

