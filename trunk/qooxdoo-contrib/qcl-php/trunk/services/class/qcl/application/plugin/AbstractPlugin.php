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

qcl_import("qcl_core_Object");

/**
 * abstract class for classes that implement a plugin
 *
 */
abstract class qcl_application_plugin_AbstractPlugin
  extends qcl_core_Object
{
	//-------------------------------------------------------------
  // properties
	//-------------------------------------------------------------


  /**
   * The descriptive name of the plugin
   * @var string
   */
  protected $name;

  /**
   * The detailed description of the plugin
   * @var string
   */
  protected $description;

  /**
   * Returns the descriptive name of the plugin
   * @return string
   */
  public function getName()
  {
    qcl_assert_valid_string( $this->name );
    return $this->name;
  }

  public function getDescription()
  {
    return $this->description;
  }

 	/**
	 * Installs the plugin. If an error occurs, a qcl_application_plugin_Exception
	 * must be thrown.
	 * @return void
	 * @throws qcl_application_plugin_Exception
	 */
  public function install()
  {
    throw new qcl_core_NotImplementedException(__METHOD__);
  }

  /**
   * Uninstalls the plugin. Throws qcl_application_plugin_Exception if something
   * goes wrong
   * @throws qcl_application_plugin_Exception
   */
  public function uninstall()
  {
    throw new qcl_core_NotImplementedException(__METHOD__);
  }
}
?>