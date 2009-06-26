<?php
require_once "qcl/mvc/ResponseDataObject.php";

class qcl_config_LoadResponse
  extends qcl_mvc_ResponseDataObject
{
   /**
    * The config keys
    * @var array
    */
   var $keys;

   /**
    * The config values
    * @var array
    */
   var $values;

}
?>