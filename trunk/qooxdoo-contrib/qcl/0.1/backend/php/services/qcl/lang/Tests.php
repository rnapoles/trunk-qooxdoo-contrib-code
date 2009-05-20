<?php
require_once "qcl/jsonrpc/controller.php";

/**
 * Service class containing test methods
 */
class class_qcl_lang_Tests extends qcl_jsonrpc_controller
{
  
  function method_testUtf8( $params )
  {
    list($string) = $params;
    $citekey = new Utf8String(utf8_encode($string));
    $this->info( $citekey->toAscii() );
    $citekey = $citekey->replace("/-/m","");
    $this->info( $citekey->toString() );
  }
 
}

?>