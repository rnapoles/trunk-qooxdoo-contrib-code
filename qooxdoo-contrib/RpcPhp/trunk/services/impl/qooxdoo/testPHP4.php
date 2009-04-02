<?php
class class_testPHP4
{
  function method_echo($params)
  {
    return $params;
  }
  
  function method_testError()
  {
    thisFunctionDoesNotExist();
  }
}
?>