<?php
require_once "qcl/data/controller/Controller.php";
require_once "qcl/ui/dialog/Alert.php";
require_once "qcl/ui/dialog/Confirm.php";
require_once "qcl/ui/dialog/Select.php";
require_once "qcl/ui/dialog/Form.php";

/**
 * Application methods
 */
class class_access_ApplicationController
  extends qcl_data_controller_Controller
{
  function method_testAccess()
  {
    return array(
      'viewRecord'  => $this->hasPermission("viewRecord"),
      'manageUsers' => $this->hasPermission("manageUsers")

    );
  }
}
?>