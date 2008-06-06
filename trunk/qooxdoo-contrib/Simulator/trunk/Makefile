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
#    * Thomas Herchenroeder (thron7)
#
################################################################################

################################################################################
# SETTINGS
################################################################################

include Makefile.local


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
QOOXDOO_SELENIUM_JAVA_CLIENTP = ./tool/selenium/client_driver
QOOXDOO_SERVER_FILES = ./tool/selenium/server
SELENIUM_BUILD_DIR = ./tool/script

simulator: simulator-build-dirs selenium-server-ext selenium-java-client-ext 

simulator-build-dirs:
	mkdir -p $(SELENIUM_BUILD_DIR)/selenium-server
	mkdir -p $(SELENIUM_BUILD_DIR)/java-client-driver

selenium-java-client-ext:
	(cd $(SELENIUM_BUILD_DIR); \
  rm -rf java-client-driver; \
  mkdir java-client-driver; \
	cd java-client-driver; \
	$(JAR) xf ../../../$(wildcard $(SELENIUM_RC_PATH)/selenium-java-client-driver-*/selenium-java-client-driver.jar); \
	cd ..; \
	$(JAVAC) -cp java-client-driver -d java-client-driver ../../$(QOOXDOO_SELENIUM_JAVA_CLIENTP)/QxSelenium.java; \
	[ -f ../../$(QOOXDOO_SERVER_FILES)/Selenium.java ] && $(JAVAC) -cp java-client-driver -d java-client-driver ../../$(QOOXDOO_SERVER_FILES)/Selenium.java; \
	[ -f ../../$(QOOXDOO_SERVER_FILES)/DefaultSelenium.java ] && $(JAVAC) -cp java-client-driver -d java-client-driver ../../$(QOOXDOO_SERVER_FILES)/DefaultSelenium.java; \
	$(JAR) cf selenium-java-client-driver.jar -C java-client-driver . \
	)

selenium-server-ext: 
	(cd $(SELENIUM_BUILD_DIR); \
  rm -rf selenium-server; \
  mkdir selenium-server; \
	cd selenium-server; \
	$(JAR) xf ../../../$(wildcard $(SELENIUM_RC_PATH)/selenium-server-*/selenium-server.jar); \
	cd ..; \
	cat ../../$(QOOXDOO_SELENIUM_USER_EXTENSION) >> selenium-server/core/scripts/user-extensions.js; \
	export SF="$(wildcard $(QOOXDOO_SERVER_FILES)/SeleniumDriverResourceHandler.java)"; \
	if [ "$${SF}" != "" ]; then \
		for f in $${SF}; do \
			$(JAVAC) -cp selenium-server -d selenium-server ../../$${f}; \
	  done; \
	fi; \
	$(JAR) cmf selenium-server/META-INF/MANIFEST.MF selenium-server.jar -C selenium-server . \
	)

selenium-server-start:
	(cd $(SELENIUM_BUILD_DIR); $(JAVA) -jar selenium-server.jar -interactive)

selenium-rhino-shell:
	(export CLASSPATH=$(MOZILLA_RHINO_PATH)/js.jar$(JAVA_CP_SEP)$(SELENIUM_BUILD_DIR)/selenium-java-client-driver.jar; \
	$(JAVA) org.mozilla.javascript.tools.shell.Main \
	)

run-simulation-showcase:
	(export CLASSPATH="$(MOZILLA_RHINO_PATH)/js.jar$(JAVA_CP_SEP)$(SELENIUM_BUILD_DIR)/selenium-java-client-driver.jar"; \
	$(JAVA) org.mozilla.javascript.tools.shell.Main ./tool/selenium/simulation/showcase/test_showcase.js \
	)

run-simulation-custom:
	(export CLASSPATH="$(MOZILLA_RHINO_PATH)/js.jar$(JAVA_CP_SEP)$(SELENIUM_BUILD_DIR)/selenium-java-client-driver.jar"; \
	$(JAVA) org.mozilla.javascript.tools.shell.Main ./tool/selenium/simulation/custom/simulation.js -keepBrowser \
	)

	
