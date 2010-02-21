<?php
/*
 * qcl - the qooxdoo component library
 *
 * http://qooxdoo.org/contrib/project/qcl/
 *
 * Copyright:
 *   2007-2009 Christian Boulanger
 *
 * License:
 *   LGPL: http://www.gnu.org/licenses/lgpl.html
 *   EPL: http://www.eclipse.org/org/documents/epl-v10.php
 *   See the LICENSE file in the project's top-level directory for details.
 *
 * Authors:
 *  * Christian Boulanger (cboulanger)
 */

/**
 * Abstract class for classes that implement a plugin
 */
interface qcl_application_plugin_IPlugin
{

  /**
   * Checks if the plugin works and installs it
   */
  function install() {}

  /**
   * Uninstalls the plugin
   */
  function uninstall() {}

  /**
   * Returns the name/title of the plugin
   * @return string
   */
  function getName(){}

  /**
   * Returns the unique namedId of the plugin
   * @return string
   */
  function getNameId(){}

  /**
   * Returns the description of the plugin
   * @return string
   */
  function getDescription(){}

  /**
   * Returns the URL of a web page with more infomration on the plugin
   * @return string
   */
  function getUrl(){}

  /**
   * Returns the author(s) of the plugin
   * @return string
   */
  function getAuthors(){}

  /**
   * Returns the permission that is needed to run the plugin
   * @return string
   */
  function getPermission(){}

}

