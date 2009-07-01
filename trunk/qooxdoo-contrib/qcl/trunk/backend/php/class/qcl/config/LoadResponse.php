<?php
require_once "qcl/data/Result.php";

class qcl_config_LoadResponse
  extends qcl_data_Result
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