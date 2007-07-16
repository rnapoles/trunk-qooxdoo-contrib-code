################################################################################
# REQUIRED SETTINGS
################################################################################

#
# Path to the folder of your qooxdoo distribution.
# Can either be
# a) a path relative to the location of this Makefile (preferred) or
# b) an absolute path starting at the root of your file system
# Example: If you put the skeleton folder next to the qooxdoo SDK folder,
# you can use the following relative path:
# QOOXDOO_PATH = ../qooxdoo-sdk-0-6-7
#
QOOXDOO_PATH = ../../qooxdoo/qooxdoo-0.7.1-sdk

#
# Similar to above, but from the webserver point of view.
# Starting point is now the application HTML file of the source folder
# (source/index.html by default). In most cases just prepend a "../" to
# QOOXDOO_PATH from above.
# Example: QOOXDOO_URI = ../../qooxdoo-sdk-0-6-7
#
QOOXDOO_URI = ../../../qooxdoo/qooxdoo-0.7.1-sdk


QOOXDOO_VERSION = 0.7.1



################################################################################
# BASIC SETTINGS
################################################################################

#
# Full namespace of your application
#
APPLICATION_NAMESPACE = windowdemo

#
# Titles used in your API viewer and during the build process
#
APPLICATION_MAKE_TITLE = CUSTOM
APPLICATION_API_TITLE = Custom

#
# Additional static files of your application (space separated list)
#
APPLICATION_FILES = index.html

#
# Locales to build (space separated list)
# To set a specific locale like "en_US" the generic locale "en" has to be added as well
# Example: APPLICATION_LOCALES = en en_US de de_DE es
#
APPLICATION_LOCALES =


################################################################################
# ADVANCED SETTINGS
################################################################################

#
# Please take a look at $(QOOXDOO_PATH)/frontend/framework/tool/make/application.mk
# for an overview of available options
#

# These variables redirect some of the generated files into the build directory.
TEMP_BUILD_PATH=${APPLICATION_BUILD_PATH}/temp
APPLICATION_TRANSLATION_FOLDERNAME = translation
APPLICATION_TRANSLATION_PATH = $(TEMP_BUILD_PATH)/$(APPLICATION_TRANSLATION_FOLDERNAME)
APPLICATION_TRANSLATION_CLASS_NAMESPACE = $(APPLICATION_NAMESPACE).$(APPLICATION_TRANSLATION_FOLDERNAME)
APPLICATION_TRANSLATION_CLASS_PATH = $(TEMP_BUILD_PATH)/$(APPLICATION_CLASS_FOLDERNAME)/$(APPLICATION_NAMESPACE)/$(APPLICATION_TRANSLATION_FOLDERNAME)

################################################################################
# INCLUDE CORE
################################################################################

ifneq ($(QOOXDOO_PATH),PLEASE_DEFINE_QOOXDOO_PATH)
	include $(QOOXDOO_PATH)/frontend/framework/tool/make/targets.mk
	include $(QOOXDOO_PATH)/frontend/framework/tool/make/application.mk
endif

error:
	@echo "  * Please configure QOOXDOO_PATH"



