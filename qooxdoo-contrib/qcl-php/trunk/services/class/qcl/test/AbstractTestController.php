<?php
require_once "qcl/data/controller/Controller.php";

class qcl_test_AbstractTestController
  extends qcl_data_controller_Controller
{
   /**
    * A test controller should not require authentication
    * @var unknown_type
    */
   var $skipAuthentication = true;

  /**
   * A test controller does not belong to an application
   * @return unknown_type
   */
  public function getApplication()
  {
    return null;
  }
}
?>