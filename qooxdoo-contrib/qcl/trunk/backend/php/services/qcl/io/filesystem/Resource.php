<?php
/*
 * dependencies
 */
require_once "qcl/jsonrpc/model.php";

/**
 * Methods common to all filesystem resources
 */
class qcl_io_filesystem_Resource extends qcl_jsonrpc_model
{
  /**
   * The file resource path
   *
   * @var string
   * @var access private
   */
  var $_resourcePath;

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
  function resourcePath() 
  {
    return $this->_resourcePath;
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
      $this->raiseError("'$resourcePath' is not a valid resource for " . $this->className() );
    }
    
    $this->_resourcePath = $resourcePath;
    
  }
  
  
  /**
   * Casting as string, returns the resource path
   * @return string
   */
  function toString()
  {
    return $this->resourcePath();
  }
  

}

?>