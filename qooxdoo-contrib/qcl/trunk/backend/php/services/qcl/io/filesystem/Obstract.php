<?php

require "qcl/jsonrpc/model.php";

class qcl_io_filesystem_abstract extends qcl_jsonrpc_model
{
  /**
   * The file resource path
   *
   * @var string
   */
  var $resourcePath;

  /**
   * Gets the file's resource path
   * @return string
   */
  function getResourcePath() 
  {
    return $this->resourcePath;
  }  
}

?>