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

qcl_import("qcl_data_controller_Controller");
qcl_import("qcl_application_plugin_RegistryModel");
qcl_import("qcl_ui_dialog_Alert");

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

    $registryModel = new qcl_application_plugin_RegistryModel();

    /*
     * scan plugin directory
     */
    foreach ( scandir($plugin_path) as $namedId )
    {
      $file = "$plugin_path/$namedId/Plugin.php";
      if ( qcl_file_exists( $file) )
      {
        require_once ( $file );
        $class  = "{$namedId}_Plugin";
        $plugin = new $class();
        $name   = $plugin->getName();

        if ( ! $registryModel->namedIdExists( $namedId ) )
        {
          $options = array(
            array( 'label'  => $this->tr("Plugin is not installed"), 'value' => "" ),
            array( 'label'  => $this->tr("Install plugin"), 'value' => "install" )
          );
        }
        else
        {
          $options = array(
            array( 'label'  => $this->tr("Plugin is installed"), 'value' => "" ),
            array( 'label'  => $this->tr("Uninstall plugin"), 'value' => "uninstall" )
          );
        }

        $formData[$namedId] = array(
          'type'    => "selectbox",
          'width'   => 300,
          'options' => $options,
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

  public function method_handlePluginForm( $data )
  {
    if ( $data === null )
    {
      return "ABORTED";
    }
    $registryModel = new qcl_application_plugin_RegistryModel();
    $messages = array();

    foreach( $data as $namedId => $action )
    {
      $plugin_path = $this->getApplication()->pluginPath();
      $file = "$plugin_path/$namedId/Plugin.php";
      require_once ( $file );
      $class  = "{$namedId}_Plugin";
      $plugin = new $class();
      $msg = "";

      switch ( $action )
      {
        case "install":
          $this->getLogger()->log(sprintf(
            "Installing plugin '%s'", $plugin->getName()
          ), QCL_LOG_PLUGIN );
          try
          {
            $plugin->install();
            $registryModel->create( $namedId, array(
              'name'        => $plugin->getName(),
              'description' => $plugin->getDescription()
            ));
          }
          catch( qcl_application_plugin_Exception $e )
          {
            $msg = sprintf(
              "Installation of plugin '%s' failed: %s",
              $plugin->getName(), $e->getMessage()
            );
            $this->getLogger()->log($msg, QCL_LOG_PLUGIN );
          }
          break;

        case "uninstall":
          $this->getLogger()->log(sprintf(
            "Uninstalling plugin '%s'", $plugin->getName()
          ), QCL_LOG_PLUGIN );
          try
          {
            $plugin->uninstall();
            $registryModel->load( $namedId );
            $registryModel->delete();
          }
          catch( qcl_application_plugin_Exception $e )
          {
            $msg = sprintf(
              "Uninstallation of plugin '%s' failed: %s",
              $plugin->getName(), $e->getMessage()
            );
            $this->getLogger()->log($msg, QCL_LOG_PLUGIN );
          }
          break;
      }

      if ( $msg)
      {
        $messages[] = $msg;
      }
    }
    if ( count( $messages) )
    {
      return new qcl_ui_dialog_Alert( implode("<br/>", $messages ) );
    }
    return "OK";
  }
}
?>