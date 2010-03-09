<?php

require_once "qcl/test/AbstractTestController.php";

class class_qcl_test_config_Test
  extends qcl_test_AbstractTestController
{
  /**
   * Tests the a global value
   * @return string
   * @rpctest {
   *   "requestData" : {
   *     "method" : "testConfigDbGlobal"
   *   },
   *   "checkResult" : "test"
   * }
   */
  function method_testConfigDbGlobal()
  {
    $configModel = $this->getApplication()->getConfigModel();
    $configModel->createKeyIfNotExists("qcl.test.global","string");
    $configModel->setKey("qcl.test.global","test");
    return $configModel->getKey("qcl.test.global");
  }

  /**
   * Tests the a default value
   * @return string
   * @rpctest {
   *   "requestData" : {
   *     "method" : "testConfigDbDefault"
   *   },
   *   "checkResult" : ["default","uservalue"]
   * }
   */
  function method_testConfigDbDefault()
  {
    $userId = $this->anonymousAccess();

    $configModel = $this->getApplication()->getConfigModel();
    $configModel->createKeyIfNotExists("qcl.test.default","string",null,/* allow user variants= */true);
    $configModel->setDefault("qcl.test.default","default");
    $configModel->setKey("qcl.test.default","uservalue");

    return array(
      $configModel->getKey("qcl.test.default",0),
      $configModel->getKey("qcl.test.default")
    );
  }

  function method_testAccessibleKeys( $params )
  {
    $mask = either( $params[0], null );
    $configModel = qcl_config_DbModel::getInstance();
    $this->set( array(
      "config" =>  $configModel->getAccessibleKeys( $mask )
    ) );
    return $this->result();
  }


}

?>