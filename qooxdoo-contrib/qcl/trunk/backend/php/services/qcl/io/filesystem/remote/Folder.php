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
   * @param qcl_mvc_Controller $controller
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
     * check for trailing slash
     */
    if ( substr($resourcePath,-1) != "/" )
    {
      $this->raiseError("Invalid resource path '$resourcePath': must end with a slash for folders!");
    }
  }       
  
  /**
   * Creates a file resource if it doesn't exist. Return resource.
   * @param string $name
   * @return qcl_io_filesystem_remote_File|false
   */
  function &createOrGetFile( $name ) 
  {
    /*
     * create file if it doesn't exist
     */
    $resourcePath = $this->resourcePath() . $name;
    $fileObj = new qcl_io_filesystem_remote_File( &$this, $resourcePath );
    if ( ! $fileObj->exists() )
    {
      $fileObj->create();
    }
    if ( $fileObj->getError() )
    {
      $this->setError( $fileObj->getError() );  
      return false;
    }
    return $fileObj;    
    
  }
  
  /**
   * Creates a folder resource if it doesn't exist. Return resource
   * @param string $name
   * @return qcl_io_filesystem_remote_Folder|false
   */
  function &createOrGetFolder( $name ) 
  {
    /*
     * create directory if it doesn't exist
     */
    $resourcePath = $this->resourcePath() . $name ."/";
    $folderObj =& new qcl_io_filesystem_remote_Folder( &$this, $resourcePath );
    if ( ! $folderObj->exists() )
    {
      $folderObj->create();
    }
    if ( $folderObj->getError() )
    {
      $this->setError( $folderObj->getError() );  
      return false;
    }
    return $folderObj;
  }
  
  /**
   * Checks if resource of the given name exists in this folder
   * @param string $name
   * @return boolean
   */
  function has( $name ) 
  {
    $file =& $this->get($name);
    if ( $file->open() )
    {
      $file->close();
      return true;    
    }
    return false;
  }    
  
  /**
   * Returns the file or folder with the name if it exists
   * @return qcl_io_filesystem_local_File | qcl_io_filesystem_local_Folder
   */
  function &get( $name ) 
  {
    $resourcePath = $this->resourcePath() . $name;
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
      $this->raiseError("Invalid file type '$filePath'." ) ;    
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