<?php

 require_once "qcl/db/controller.php";
 
class class_Test extends qcl_db_controller
{
  function method_getIniValue($params)
  {
    list($key) = $params;
    $value = qcl_application_Application::getIniValue($key);
    if ( ! $value )
    {
      qcl_application_Application::raiseError("'$key' is empty or not set.");
    }
    return $value;
  }
  
  function method_getServerClass()
  {
    return get_class( qcl_application_Application::getServer() );
  }
  
  function method_testTranslation( $params )
  {
    list($text) = $params;
    $lm =& qcl_application_Application::getLocaleManager();
    $lm->setLocale("de");
    $lm->logLocaleInfo();
    return( "Translation of '$text': '" . $lm->tr($text) . "'.");
  }
}
?>