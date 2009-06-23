<?php

require_once "qcl/session/Controller.php";
require_once "qcl/config/db.php";

class class_qcl_config_Test extends qcl_session_Controller
{

  function method_test()
  {
    $configModel =& qcl_config_Db::getInstance();

    $configModel->createKeyIfNotExists("qcl.test.global","string");
    $configModel->set("qcl.test.global","Blah!");

    $this->set("qcl.test.global",$configModel->get("qcl.test.global"));


    $configModel->createKeyIfNotExists("qcl.test.foo","string",null,true);
    $configModel->setDefault("qcl.test.foo","bar");
    $configModel->set("qcl.test.foo","gagaga!");

    $this->set("qcl.test.foo(default)",$configModel->get("qcl.test.foo",0));

    $this->set("qcl.test.foo(user)",$configModel->get("qcl.test.foo"));

    //$configModel->reset("qcl.test.foo");

    //$this->set("qcl.test.foo(reset)",$configModel->get("qcl.test.foo"));

    return $this->response();
  }

  function method_testAccessibleKeys( $params )
  {
    $mask = either( $params[0], null );
    $configModel =& qcl_config_Db::getInstance();
    return $configModel->getAccessibleKeys( $mask );
  }


}

?>