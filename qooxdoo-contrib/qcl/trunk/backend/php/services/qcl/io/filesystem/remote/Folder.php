<?php
require_once "qcl/io/filesystem/remote/Resource.php";
require_once "qcl/io/filesystem/IFolder.php";

/**
 * Folder-like ressources
 */
class qcl_io_filesystem_remote_Folder extends qcl_io_filesystem_remote_Resource
{

  /**
   * php 4 interface implementaion
   */
  var $implements = array("qcl_io_filesystem_IFolder");
  
  /**
   * Constructor. Will create the folder if it doesn't exist and will
   * throw an error if that is not possible.
   * @param qcl_jsonrpc_controller $controller
   * @param string $resourcePath
   * @param int $mode File permissions, defaults to 0777 
   */
  function __construct ( $controller, $resourcePath, $mode=0777 )
  {
    /*
     * parent constructor takes care of controller and resource path
     */
    parent::__construct( &$controller, $resourcePath );   

    /*
     * create directory if it doesn't exist
     */
    if ( ! $this->exists( $resourcePath ) )
    {
      if ( ! mkdir( $resourcePath, $mode ) )
      {
        $this->raiseError("Problems creating folder '$resourcePath' with permissions $mode." );
      }
    }    
  }       
  
  /**
   * Creates a file resource if it doesn't exist. Return resource.
   * @param string $name
   * @return qcl_io_filesystem_remote_File
   */
  function &createOrGetFile( $name ) 
  {
    $resourcePath = $this->resourcePath() . "/" . $name;
    return new qcl_io_filesystem_remote_File( &$this, $resourcePath );
  }
  
  /**
   * Creates a folder resource if it doesn't exist. Return resource
   * @param string $name
   * @return qcl_io_filesystem_remote_Folder
   */
  function &createOrGetFolder( $name ) 
  {
    $resourcePath = $this->resourcePath() . "/" . $name;
    return new qcl_io_filesystem_remote_Folder( &$this, $resourcePath );    
  }
  
  /**
   * Checks if resource of the given name exists in this folder
   * @param string $name
   * @return boolean
   */
  function has( $name ) 
  {
    $filePath = $this->resourcePath() . "/" . $name;
    return file_exists( $filePath );    
  }    
  
  /**
   * Returns the file or folder with the name if it exists
   * @return qcl_io_filesystem_local_File | qcl_io_filesystem_local_Folder
   */
  function &get( $name ) 
  {
    $resourcePath = $this->resourcePath() . "/" . $name;
    $controller   =& $this->getController();
    
    if ( $this->isFile( $resourcePath ) )
    {
      return new qcl_io_filesystem_remote_File( &$controller, $resourcePath );
    }
    elseif ( $this->isDir( $resourcePath ) )
    {
      return new qcl_io_filesystem_remote_Folder( &$controller, $resourcePath );  
    }
    else
    {
      $this->raiseError("File '$filePath' does not exist." ) ;    
    }
  }
  
  /**
   * Opens the folder to iterate through its contents
   * @return void
   */
  function open() 
  {
    $this->_dir = opendir( $this->resourcePath() );
  }  
  
  /**
   * Gets the next entry in the folder
   * @return qcl_io_filesystem_local_File | qcl_io_filesystem_local_Folder 
   */
  function &next() 
  {
    /*
     * check if dir has been opened
     */
    if ( ! $this->_dir )
    {
      $this->raiseError("You have to open() the directory first.");
    }
    
    /*
     * get next element, skipping "." and ".."
     */
    do
    {
      $name = readdir($this->_dir);  
    }
    while ( $name =="." or $name == ".." );
    
    /*
     * valid file or folder
     */
    if ( $name )
    {
      return $this->get($name);  
    }
    
    /*
     * no further content
     */
    return false;
  }    
  
  /**
   * Closes the folder resource
   */
  function close()
  {
    closedir($this->_dir);
  } 
  
}
?>