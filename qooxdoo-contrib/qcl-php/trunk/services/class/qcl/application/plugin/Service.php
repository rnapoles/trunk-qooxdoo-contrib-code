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

qcl_import("qcl_application_plugin_RegistryModel");

/**
 * The plugin Service
 * @author bibliograph
 */
class qcl_application_plugin_Service
  extends qcl_data_controller_Controller
{


  /**
   * Creates form to install or uninstall plugins
   */
  public function method_manage()
  {
    $app = $this->getApplication();
    $plugin_path = $app->pluginPath();
    $formData = array();

    foreach ( scandir($plugin_path) as $namedId )
    {
      $file = "$plugin_path/$namedId/Plugin.php";
      if ( qcl_file_exists( $file) )
      {
        require_once ( $file );
        $class  = "{$namedId}_Plugin";
        $plugin = new $class();
        $name        = $plugin->getName();

        $formData[$namedId] = array(
          'type'    => "selectbox",
          'options' => array(
            array( 'label'  => $this->tr("Install plugin"), 'value' => "install" ),
            array( 'label'  => $this->tr("Uninstall plugin"), 'value' => "install" )
          ),
          'label'   => $name,
          'value'   => $namedId
        );
      }
    }

    qcl_import("qcl_ui_dialog_Form");
    return new qcl_ui_dialog_Form(
      $this->tr("Please configure the plugins"),
      $formData, true,
      $this->serviceName(), "handlePluginForm"
    );
  }
}
?>