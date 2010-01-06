#
#	QxTransformer
#	Converts QXML to Javascript
#	
#	License: LGPL
#	Autors: Siarhei Barysiuk <s.barysiuk@gmail.com>	
#			Christian Boulanger <info@bibliograph.org>
#
# Makefile
#
# dependencies: libxml2
#
# define QXTRANSFORMER_PATH in your application makefile and include this
# file at the end of your application makefile like so:
#
# QXTRANSFORMER_PATH = /path/to/qxtransformer.mk
# ifneq ($(QOOXDOO_PATH),PLEASE_DEFINE_QOOXDOO_PATH)
# 	include $(QOOXDOO_PATH)/frontend/framework/tool/make/targets.mk
# 	include $(QOOXDOO_PATH)/frontend/framework/tool/make/application.mk
# 	include $(QXTRANSFORMER_PATH)/tool/qxtransformer.mk
# endif


# constants, override in your application makefile if necessary
# By default in skeleton application source is placed into 'class'
# directory and xml files into 'xml' folder.

ifndef QX_APPLICATION_CLASS_PATH
	QX_APPLICATION_CLASS_PATH = ../source/class
endif

ifndef QX_APPLICATION_XML_PATH
	QX_APPLICATION_XML_PATH = ../source/xml
endif

#path to *.py scripts
QXT_FRAMEWORK_TOOL_PATH = $(QXTRANSFORMER_PATH)/tool


# Add to class path additional classes for QxTransformer.
# They are placed in $(QXTRANSFORMER)/source/class.

APPLICATION_ADDITIONAL_CLASS_PATH += $(QXTRANSFORMER_PATH)/source/class
APPLICATION_ADDITIONAL_CLASS_URI += ../$(QXTRANSFORMER_PATH)/source/class


# Define extension for xml files.

ifndef QXTRANSFORMER_EXTENSION
	QXTRANSFORMER_EXTENSION = qxml
endif

# Define XSLT processor.

ifndef XSLTPROC
	XSLTPROC = xsltproc
endif

# Main xsl file. Input point of whole framework.

ifndef XSL 
	XSL = $(QXTRANSFORMER_PATH)/transformer.xsl
endif

# documentation tool
ifndef XSLDOC 
	XSLDOC = $(QXTRANSFORMER_PATH)/tool/doc-generator.xsl
endif

ifndef ECHO_ON
	ECHO_ON = false
endif


# Commands
CMD_ASTERIX_LINE = echo "*****************************************************************************"
CMD_LINE = echo "-----------------------------------------------------------------------------"
ECHO_CAPTION = echo "[QxTransformer]: Transformation application xml files to javascript...."


# rules


transform:
	@$(CMD_ASTERIX_LINE)
	@$(ECHO_CAPTION)
	@$(CMD_ASTERIX_LINE)
	
	@echo ''
	@$(CMD_LINE)
	@echo "PROJECT SETTINGS"
	@$(CMD_LINE)
	@echo '  * Application class path: ' $(QX_APPLICATION_CLASS_PATH)
	@echo '  * Application xml path: ' $(QX_APPLICATION_XML_PATH)
	@echo '  * Application project root dir: ' $(QX_APPLICATION_PROJECT_DIR)
	@echo ''
	@$(CMD_LINE)
	@echo "TRANSFORMATION PROGRESS"
	@$(CMD_LINE)
	
	@for xmlfile in $(QX_APPLICATION_XML_PATH)/*.$(QXTRANSFORMER_EXTENSION); do \
	targetfile=$(QX_APPLICATION_CLASS_PATH)/`basename $$xmlfile | sed s/\\\\./\\\\// | sed s/\\\\.qxml// `;\
	$(XSLTPROC) --param projectRootDir "'$(QX_APPLICATION_PROJECT_DIR)'" --param echoOn "'$(ECHO_ON)'"  $(XSL) $$xmlfile > $$targetfile.js ;\
	done;

generate-skeleton:
	@$(CMD_ASTERIX_LINE)
	@echo "[QxTransformer]: Starting skeleton generator script..."
	@$(CMD_ASTERIX_LINE)
	
	@$(CMD_PYTHON) $(QXT_FRAMEWORK_TOOL_PATH)/skeleton-generator.py "$(QXTRANSFORMER_PATH)"
	
generate-docs:
	cp -fR $(QXT_FRAMEWORK_TOOL_PATH)/docfiles/ $(QXTRANSFORMER_PATH)/docs
	@for xslfile in `find $(QXTRANSFORMER_PATH) -name "*.xsl" -type f -print`; do \
	targetdir=./`dirname $$xslfile | sed -e 's/./docs/'` ;\
	basedir=`dirname $$xslfile | sed -e 's/\/[^\/]*/\/\.\./g'` ;\
	targetfile=`basename $$xslfile | sed  -e 's/.xsl//'`.html ;\
	mkdir -p $$targetdir ;\
	echo Generating docs for $$xslfile ... ;\
	$(XSLTPROC) --param basedir "'$$basedir'" --param filename "'$$xslfile'" $(XSLDOC) $$xslfile >$$targetdir/$$targetfile ;\
	done;
	@echo You can find documentation in directory $(QXTRANSFORMER_PATH)/docs.

generate-tag-docs:
	@echo Generating documentation on supported xml tags ... ;\
	$(XSLTPROC) --param basedir "'$(QXTRANSFORMER_PATH)/'"  $(QXTRANSFORMER_PATH)/tool/tags-doc-generator.xsl $(QXTRANSFORMER_PATH)/config/tags.xml > $(QXTRANSFORMER_PATH)/docs/tags.html;
  