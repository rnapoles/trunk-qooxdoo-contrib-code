<?php
/*
 * dependencies
 */
require_once "qcl/io/filesystem/local/Resource.php";

/**
 * Base class for remote filesystem resource classes
 */
class qcl_io_filesystem_remote_Resource extends qcl_io_filesystem_local_Resource
{
  /**
   * The supported / allowed protocols
   */
  var $protocols = array("ftp","http","s3");

  /**
   * Constructor. Checks whether allow_url_fopen us enabled (necessary for
   * the class to work) and registers s3 streamwrapper if necessary
   * @param qcl_jsonrpc_controller $controller
   * @param string $resourcePath
   */
  function __construct ( $controller, $resourcePath )
  {
    /*
     * parent constructor takes care of controller and resource path
     */
    parent::__construct( &$controller, $resourcePath );
    
    /*
     * s3 wrapper
     */
    if ( $this->protocol == "s3" )
    {
      if ( ! defined('S3_KEY') )
      {
        $this->raiseError("You need to define the S3_KEY constant");
      }
      if ( ! defined('S3_PRIVATE') )
      {
        $this->raiseError("You need to define the S3_PRIVATE constant");
      }
      require_once "qcl/lib/gs3/gs3.php";
    }
    
    /*
     * check for allow_url_fopen
     */
    if ( ! ini_get("allow_url_fopen") )
    {
      $this->raiseError("You need to enable 'allow_url_fopen' in the php.ini file for this to work.");
    }
  }  

  /**
   * Checks whether (given) resource path is a file. This is not a real check,
   * the path is analyzed whether there is a file extension.
   * @param string[optional] $resourcePath
   * @return bool
   */
  function isFile( $resourcePath = null )
  {
    $rp  = either ( $resourcePath, $this->resourcePath() );
    if ( $rp[strlen($rp)-1] == "/" ) return false;
    $ext = $this->extension( $this->basename($rp ) );
    return $ext != "";
  }
  
  /**
   * Checks whether (given) resource path is a directory.This is not a real check,
   * the path is analyzed whether there is a file extension.
   * @param string[optional] $resourcePath
   * @return bool
   * @todo this should be clear from the file name!
   */
  function isDir( $resourcePath=null )
  {
    $rp  = either ( $resourcePath, $this->resourcePath() );
    if ( $rp[strlen($rp)-1] == "/" ) return true;
    $ext = $this->extension( $this->basename($rp ) );
    return $ext == "";
  }
  
  /**
   * Checks if file or folder exists
   * @param string $resourcePath
   */
  function exists( $resourcePath )
  {
    if ( $this->isFile($resourcePath) )
    {
      $fp = fopen($resourcePath, "r");
      if ( !$fp )
      {
        return false;
      }
      fclose($fp);
      return true;
    }
    else
    {
      $dh = opendir( $resourcePath );
      if ( !$dh )
      {
        return false;
      }
      closedir($dh);
      return true;
    }
  }
  
  /**
   * Deletes the file/folder. Not implemented
   * @todo implement, if possible at all
   * @return booelean Result 
   */
  function delete() 
  {
    if ( ! unlink( $this->resourcePath() ) )
    {
      $this->setError("Problem deleting " . $this->resourcePath() );
      return false;
    }
    return true;
  }  
  
  /**
   * Renames the file/folder Fails if new name exists. Not implemented
   * @todo Implement where possible
   * @param string $name New name
   * @return boolean Result
   */
  function rename($name) 
  {
    $this->raiseError("Renaming remote Files/Folders not implemented.");
  }  
  

 
}
?>