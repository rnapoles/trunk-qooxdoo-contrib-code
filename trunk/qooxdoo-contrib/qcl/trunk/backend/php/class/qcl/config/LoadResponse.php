<?php
require_once "qcl/data/ResponseDataObject.php";

class qcl_config_LoadResponse
  extends qcl_data_ResponseDataObject
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