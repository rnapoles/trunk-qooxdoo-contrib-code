################################################################################
#
#  qooxdoo - the new era of web development
#
#  http://qooxdoo.org
#
#  Copyright:
#    2007 1&1 Internet AG, Germany, http://www.1and1.org
#
#  License:
#    LGPL: http://www.gnu.org/licenses/lgpl.html
#    EPL: http://www.eclipse.org/org/documents/epl-v10.php
#    See the LICENSE file in the project's top-level directory for details.
#
#  Authors:
#    * Thomas Herchenroeder (thron7)
#    * Fabian Jakobs (fjakobs)
#
################################################################################

####################################################################################
# BASIC SETTINGS
####################################################################################

QOOXDOO_PATH = ../../qooxdoo/qooxdoo-0.7.1-sdk
QOOXDOO_URI = ../$(QOOXDOO_PATH)
QOOXDOO_VERSION = 0.7.1

APPLICATION_NAMESPACE = qxapp
APPLICATION_CLASSNAME = Application
APPLICATION_MAKE_TITLE = Application
APPLICATION_API_TITLE = Application
APPLICATION_FILES = index.html
APPLICATION_RESOURCE_FILTER = true
APPLICATION_LINEBREAKS_BUILD = true
APPLICATION_LINEBREAKS_SOURCE = true
APPLICATION_COMPLETE_BUILD = false
APPLICATION_COMPLETE_SOURCE = false
APPLICATION_BUILD_LOG_LEVEL = error


####################################################################################
# INCLUDE CORE
####################################################################################

ifneq ($(QOOXDOO_PATH),PLEASE_DEFINE_QOOXDOO_PATH)
	include $(QOOXDOO_PATH)/frontend/framework/tool/make/targets.mk
	include $(QOOXDOO_PATH)/frontend/framework/tool/make/application.mk
endif

error:
	@echo "  * Please configure QOOXDOO_PATH"

