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
   * The supported / allowed protocols
   */
  var $protocols = array();  
  
  /**
   * The currently used protocol
   */
  var $protocol;   
  
  /**
   * Checks wether resource path is valid. Local files have to start 
   * with "file://", remote files with a valid protocol such as "ftp://"
   * @param string $resourcePath
   * @retrun boolean
   */
  function checkResourcePath( $resourcePath ) 
  {
    $pos = strpos($resourcePath,":");
    return  in_array( substr($resourcePath, 0, $pos), $this->protocols ) && substr($resourcePath,$pos,3) == "://";
  }
  
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
    
    /*
     * protocol
     */
    $this->protocol = substr($resourcePath,0,strpos($resourcePath,":") );    
    
    /*
     * save resource path
     */
    $this->_resourcePath = $resourcePath;
  }
  
  /**
   * Returns the file path withoug leading protocol "foo://"
   * @return string
   */
  function filePath()
  {
    $rp = $this->resourcePath();
    return substr( $rp, strpos($rp,":") +3 );
  }

  /**
   * Returns the directory in which the (given) resource is located.
   * @param string[optional] $resourcePath
   * @return string
   */
  function dirname( $resourcePath = null)
  {
    $rp  = either ( $resourcePath, $this->resourcePath() );
    return substr( $rp, 0, strrpos($rp, "/" ) );
  }
  
  /**
   * Returns the name of the (given) resource path without the containing directory
   * @param string[optional] $resourcePath
   * @return string
   */
  function basename( $resourcePath=null )
  {
    $rp  = either ( $resourcePath, $this->resourcePath() );
    $pos = strrpos( $rp, "/" );
    if ( $pos == strlen($rp)-1 )
    {
      $pos = strrpos(substr($rp,0,-1),"/");
    }
    if ( $pos !== false )
    {
      return substr($this->resourcePath(),$pos+1);
    }
    return $rp;
  }
  
  /**
   * Returns the extension of the (given) resource path, if any.
   * @param string[optional] $resourcePath
   * @return string
   */
  function extension()
  {
    $rp  = either ( $resourcePath, $this->resourcePath() );
    $bn  = $this->basename( $rp );
    $pos = strrpos( $bn, "." );
    if ( $pos !== false )
    {
      return substr($bn,$pos+1);  
    }
    return "";
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