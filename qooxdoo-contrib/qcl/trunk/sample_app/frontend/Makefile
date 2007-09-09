################################################################################
#
#  qooxdoo component library (qcl) sample application makefile

#  Copyright:
#    Christian Boulanger
#
#  License:
#    LGPL: http://www.gnu.org/licenses/lgpl.html
#    EPL: http://www.eclipse.org/org/documents/epl-v10.php
#    See the LICENSE file in the project's top-level directory for details.
#
#  Authors:
#    * Christian Boulanger (cboulanger)
#
################################################################################

################################################################################
# SETTINGS
################################################################################

#
# Path to top folder containing 
#   qooxdoo-0.7-sdk
#   qxtransformer-sdk
#   qooxdoo-contrib
#

TOP_FOLDER_PATH = ../../../../..

#
# Path to the folder of your qooxdoo distribution.
#

QOOXDOO_PATH = ${TOP_FOLDER_PATH}/qooxdoo-0.7-sdk

#
# Namespace of your application e.g. custom
# Even complexer stuff is possible like: net.sf.custom
#
APPLICATION_NAMESPACE = sample_app

#
# Files that will be copied from the source directory into the build
# directory (space separated list). The default list is empty.
#
APPLICATION_FILES = index.html

#-------------------------------------------------------------------------------
# For a full list and description of available application settings, please 
# see the APPLICATION variables in file 
# $(QOOXDOO_PATH)/frontend/framework/tool/make/application.mk
# Add any of those variables for your custom configuration here:
#-------------------------------------------------------------------------------

APPLICATION_COMPLETE_SOURCE = false
APPLICATION_RESOURCE_FILTER = true

#
# Include qcl classes
#

APPLICATION_INCLUDES = ../..
#APPLICATION_ADDITIONAL_CLASS_PATH = ../.. 
#APPLICATION_ADDITIONAL_CLASS_URI = ../../..
 
#-------------------------------------------------------------------------------
# QxTransformer options
#-------------------------------------------------------------------------------

#Define path to QxTransformer.

QXTRANSFORMER_PATH = ${TOP_FOLDER_PATH}/qxtransformer-sdk/qxtransformer

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
	@echo "  * Please configure QOOXDOO_PATH"
