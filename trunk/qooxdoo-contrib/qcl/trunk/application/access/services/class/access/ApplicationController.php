<?php
require_once "qcl/core/Object.php";
require_once "qcl/data/controller/Controller.php";
require_once "qcl/ui/dialog/Alert.php";
require_once "qcl/ui/dialog/Confirm.php";

/**
 * Application methods
 */
class class_access_ApplicationController
  extends qcl_data_controller_Controller
{
  function method_serverDialog1( $params )
  {
    return new qcl_ui_dialog_Alert(
      "This is a message from the server! Sending 'Foo!' to server",
      $this->getServiceName(),
     "serverDialog2",
      array( "Foo!" )
    );
  }

  function method_serverDialog2( $params )
  {
    list($true, $arg) = $params;
    return new qcl_ui_dialog_Alert(
      "This is a second message from the server. Received '$arg'.",
      $this->getServiceName(),
     "serverDialog3"
    );
  }

  function method_serverDialog3( $params )
  {
    return new qcl_ui_dialog_Confirm(
      "Please confirm that you exist.",
      array( "Yes, I exist", "No, I don't exist." ),
      $this->getServiceName(),
     "serverDialog4"
    );
  }

  function method_serverDialog4( $params )
  {
    list($arg) = $params;
    return new qcl_ui_dialog_Alert(
      "You confirmed that " . ( $arg ? "you exist" : "you don't exist.")
    );
  }
}
?>