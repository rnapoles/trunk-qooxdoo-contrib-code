<?php
class class_testService
{
  function method_echo($params)
  {
    return $params;
  }
  
  function method_testError()
  {
    thisFunctionDoesNotExist();
  }
  
  
  function method_testErrorPhp5()
  {
    /*
     * using eval here to avoid compile error in php4
     */
    eval('
    throw new Exception("This is an Error exception");
    ');
  }  
}
?>