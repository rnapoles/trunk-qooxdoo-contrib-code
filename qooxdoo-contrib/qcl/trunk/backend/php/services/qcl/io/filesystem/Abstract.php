<?php

require "qcl/jsonrpc/model.php";

class qcl_io_filesystem_Abstract extends qcl_jsonrpc_model
{
  /**
   * The file resource path
   *
   * @var string
   */
  var $resourcePath;

  /**
   * Checks wether resource path is valid
   * @param string $resourcePath
   * @retrun boolean
   */
  function checkResourcePath( $resourcePath ) {}  
  
  /**
   * Gets the file's resource path
   * @return string
   */
  function getResourcePath() 
  {
    return $this->resourcePath;
  }

  /**
   * Constructor
   * @param qcl_jsonrpc_controller $controller
   * @param string $resourcePath
   */
  function __construct ( $controller, $resourcePath )
  {
    /*
     * parent constructor takes care of controller
     */
    parent::__construct( &$controller );
    
    /*
     * check resource path
     */
    if ( ! $this->checkResourcePath( $resourcePath ) )
    {
      $this->raiseError("'$resourcePath' is not a valid resource for " . $this->getClassName() );
    }
    
    $this->resourcePath = $resourcePath;
    
  }
}

?>