<?php

 require_once "qcl/access/SessionController.php";

class class_Test extends qcl_access_SessionController
{
  function method_getIniValue($params)
  {
    list($key) = $params;
    $value = qcl_application_Application::getInstance()->getIniValue($key);
    if ( ! $value )
    {
      qcl_application_Application::getInstance()->raiseError("'$key' is empty or not set.");
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
    $lm = qcl_application_Application::getLocaleManager();
    $lm->setLocale("de");
    $lm->logLocaleInfo();
    return( "Translation of '$text': '" . $lm->tr($text) . "'.");
  }
}
?>