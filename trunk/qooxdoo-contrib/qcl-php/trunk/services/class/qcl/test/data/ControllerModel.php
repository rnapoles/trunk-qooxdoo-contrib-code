<?php
require_once "qcl/data/Result.php";
require_once "qcl/data/controller/Controller.php";

class qcl_test_data_TestResult
  extends qcl_data_Result
{
  var $a;
  var $b;
  var $c;
}

class class_qcl_test_data_ControllerModel
  extends qcl_data_controller_Controller
{

  function method_testRecord()
  {
    $record = array(
      'a' => "Foo",
      'b' => "Boo",
      'c' => "Hoo"
    );
    $result = new qcl_test_data_TestResult;
    return $result->set($record);
  }

  function method_testResultSet()
  {
    $i = "a";
    $testMap = array(
      array( 'a' => $i++, 'b' => $i++, 'c' => $i++),
      array( 'a' => $i++, 'b' => $i++, 'c' => $i++),
      array( 'a' => $i++, 'b' => $i++, 'c' => $i++),
      array( 'a' => $i++, 'b' => $i++, 'c' => $i++),
      array( 'a' => $i++, 'b' => $i++, 'c' => $i++),
      array( 'a' => $i++, 'b' => $i++, 'c' => $i++),
      array( 'a' => $i++, 'b' => $i++, 'c' => $i++),
      array( 'a' => $i++, 'b' => $i++, 'c' => $i++),
      array( 'a' => $i++, 'b' => $i++, 'c' => $i++),
      array( 'a' => $i++, 'b' => $i++, 'c' => $i++),
      array( 'a' => $i++, 'b' => $i++, 'c' => $i++),
      array( 'a' => $i++, 'b' => $i++, 'c' => $i++),
      array( 'a' => $i++, 'b' => $i++, 'c' => $i++),
      array( 'a' => $i++, 'b' => $i++, 'c' => $i++),
      array( 'a' => $i++, 'b' => $i++, 'c' => $i++),
      array( 'a' => $i++, 'b' => $i++, 'c' => $i++),
      array( 'a' => $i++, 'b' => $i++, 'c' => $i++),
      array( 'a' => $i++, 'b' => $i++, 'c' => $i++),
      array( 'a' => $i++, 'b' => $i++, 'c' => $i++),
      array( 'a' => $i++, 'b' => $i++, 'c' => $i++),
      array( 'a' => $i++, 'b' => $i++, 'c' => $i++),
      array( 'a' => $i++, 'b' => $i++, 'c' => $i++),
      array( 'a' => $i++, 'b' => $i++, 'c' => $i++),
      array( 'a' => $i++, 'b' => $i++, 'c' => $i++),
    );

    $result = new qcl_test_data_TestResult;
    return $result->queryResultToModel($testMap);
  }

}
?>