################################################################################
#
#  qooxdoo - the new era of web development
#
#  http://qooxdoo.org
#
#  Copyright:
#    2006-2007 1&1 Internet AG, Germany, http://www.1and1.org
#
#  License:
#    LGPL: http://www.gnu.org/licenses/lgpl.html
#    EPL: http://www.eclipse.org/org/documents/epl-v10.php
#    See the LICENSE file in the project's top-level directory for details.
#
#  Authors:
#    * Sebastian Werner (wpbasti)
#    * Andreas Ecker (ecker)
#    * Fabian Jakobs (fjakobs)
#
################################################################################

################################################################################
# SETTINGS
################################################################################

#
# Path to the folder of your qooxdoo distribution.
# Can either be
# a) a relative path to the location of this Makefile (preferred) or
# b) an absolute path starting at the root of your file system
# Example: If you put the skeleton folder next to the qooxdoo SDK folder,
# you can use the following relative path:
# QOOXDOO_PATH = ../../qooxdoo-0.7-sdk
# Please note that Windows users should always use relative paths.
# It should end with the last directory. Please omit a trailing slash.
#
QOOXDOO_PATH = ../../qooxdoo/qooxdoo-0.7.2-sdk

# Path to your Selenium RC installation
#SELENIUM_RC_PATH = PLEASE_DEFINE_SELENIUM_RC_ROOT
SELENIUM_RC_PATH = ../../../packages/selenium-remote-control-0.9.2

# Path to your Mozilla Rhino installation 
#MOZILLA_RHINO_PATH = PLEASE_DEFINE_RHINO_ROOT 
MOZILLA_RHINO_PATH = ../../../../prog/javascript/rhino1_6R7

#
# Namespace of your application e.g. custom
# Even complexer stuff is possible like: net.sf.custom
#
APPLICATION_NAMESPACE = custom

#
# Files that will be copied from the source directory into the build
# directory (space separated list). The default list is empty.
#
APPLICATION_FILES = index.html

APPLICATION_INCLUDES = contrib://Inspector/trunk

APPLICATION_COMPLETE_SOURCE = true
APPLICATION_RESOURCE_FILTER = true

#-------------------------------------------------------------------------------
# For a full list and description of available application settings, please 
# see the APPLICATION variables in file 
# $(QOOXDOO_PATH)/frontend/framework/tool/make/application.mk
# Add any of those variables for your custom configuration here:
#-------------------------------------------------------------------------------


################################################################################
# INTERNALS (PLEASE DO NOT CHANGE)
################################################################################

ifneq ($(QOOXDOO_PATH),PLEASE_DEFINE_QOOXDOO_PATH)
	include $(QOOXDOO_PATH)/frontend/framework/tool/make/targets.mk
	include $(QOOXDOO_PATH)/frontend/framework/tool/make/application.mk
endif

error:
	@echo "  * Please configure QOOXDOO_PATH"

################################################################################
# SELENIUM STUFF
################################################################################
QOOXDOO_SELENIUM_USER_EXTENSION = ./tool/selenium/user_extension/user-extensions-qooxdoo.js
QOOXDOO_SELENIUM_JAVA_CLIENTP = ./tool/selenium/language_binding
SELENIUM_BUILD_DIR = ./tool/script
JAR = jar

selenium: selenium-build-dirs selenium-server-ext selenium-java-client-ext 

selenium-build-dirs:
	mkdir -p $(SELENIUM_BUILD_DIR)/selenium_server
	mkdir -p $(SELENIUM_BUILD_DIR)/java_client

selenium-java-client-ext:
	(cd $(SELENIUM_BUILD_DIR); \
	cd java_client; \
	$(JAR) xf ../../../$(wildcard $(SELENIUM_RC_PATH)/selenium-java-client-driver-*/selenium-java-client-driver.jar); \
	cd ..; \
	javac -cp java_client -d java_client ../../$(QOOXDOO_SELENIUM_JAVA_CLIENTP)/QxSelenium.java; \
	$(JAR) cf selenium-java-client-driver.jar -C java_client . \
	)

selenium-server-ext:
	(cd $(SELENIUM_BUILD_DIR); \
	cd selenium_server; \
	$(JAR) xf ../../../$(wildcard $(SELENIUM_RC_PATH)/selenium-server-*/selenium-server.jar); \
	cd ..; \
	cat ../../$(QOOXDOO_SELENIUM_USER_EXTENSION) >> selenium_server/core/scripts/user-extensions.js; \
	$(JAR) cf selenium-server.jar -C selenium_server . \
	)

selenium-rc-start:
	(cd $(SELENIUM_BUILD_DIR); java -jar selenium-server.jar &)

mozilla-rhino-jar:
	(cd $(SELENIUM_BUILD_DIR); cp $(MOZILLA_RHINO_PATH)/js.jar .)

selenium-rhino-shell: mozilla-rhino-jar
	(export CLASSPATH=$(SELENIUM_BUILD_DIR)/selenium-java-client.jar:$(SELENIUM_BUILD_DIR)/js.jar; \
	java org.mozilla.javascript.tools.shell.Main \
	)
