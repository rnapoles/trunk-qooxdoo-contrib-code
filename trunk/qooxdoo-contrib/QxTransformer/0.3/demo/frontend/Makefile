################################################################################
#  QxTransformer ver. 0.2
#  http://qxtransformer.sourceforge.net 
#   
#  License:
#    LGPL: http://www.gnu.org/licenses/lgpl.html
#   
#  Authors:
#	   * Siarhei Barysiuk (s_barysiuk)
#	   * Christian Boulanger (cboulanger)
#
################################################################################


################################################################################
#  HOW-TO
#
#  You can use all syntax of make files of qooxdoo framework.
#  QxTransformer adds one action:
#
#  make transform
#   
#  Run 'transform' action if you want to convert xml files of your application 
#  to javascript classes. 
#  
################################################################################



################################################################################
# SETTINGS
################################################################################

#Define path to qooxdoo library.

QOOXDOO_PATH = ../../qooxdoo-0.7.3-sdk

#Define path to QxTransformer.

QXTRANSFORMER_PATH = ../../qxtransformer-0.3a1-sdk


#APPLICATION_SOURCE_PATH = ./frontend/source
#APPLICATION_BUILD_PATH = ./frontend/build
#APPLICATION_API_PATH = ./frontend/api
#APPLICATION_DEBUG_PATH = ./frontend/debug
#APPLICATION_PUBLISH_PATH = ./frontend/publish

# Namespace of your application e.g. custom
# Even complexer stuff is possible like: net.sf.custom

APPLICATION_NAMESPACE = showcase


# Provide all languages that you want your application to be translated into

APPLICATION_LOCALES = en de fr es


# Files that will be copied from the source directory into the build
# directory (space separated list). The default list is empty.

APPLICATION_FILES = index.html

#APPLICATION_INCLUDES += contrib://qcl

#-------------------------------------------------------------------------------
# For a full list and description of available application settings, please 
# see the APPLICATION variables in file 
# $(QOOXDOO_PATH)/frontend/framework/tool/make/application.mk
# Add any of those variables for your custom configuration here.

APPLICATION_COMPLETE_SOURCE = false
APPLICATION_RESOURCE_FILTER = true

# In additional QxTransformer uses some own classes and define additional
# APPLICATION_ADDITIONAL_CLASS_PATH variable.
# For more details see $(QXTRANSFORMER_PATH)/tool/qxtransformer.mk
#-------------------------------------------------------------------------------

# Settings for QxTransformer application

# Path to folder which contains your own classes and where 
# auto-generated classes shall be put

QX_APPLICATION_CLASS_PATH = ./source/class

# Path to folder which contains xml files of your application, macros,
# includes, etc.

QX_APPLICATION_XML_PATH = ./source/xml

# Full path to project dir

QX_APPLICATION_PROJECT_DIR = $$(pwd)/source/xml

#Enable progress output to console

ECHO_ON = true


################################################################################
# INTERNALS (PLEASE DO NOT CHANGE)
################################################################################

ifneq ($(QOOXDOO_PATH),PLEASE_DEFINE_QOOXDOO_PATH)
	include $(QOOXDOO_PATH)/frontend/framework/tool/make/targets.mk
	include $(QOOXDOO_PATH)/frontend/framework/tool/make/application.mk
	include $(QXTRANSFORMER_PATH)/tool/qxtransformer.mk
endif

error:
	@echo "  * Please configure QOOXDOO_PATH and QXTRANSFORMER_PATH"


