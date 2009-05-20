<?php
require_once "qcl/io/filesystem/local/Resource.php";
require_once "qcl/io/filesystem/IFolder.php";

/**
 * Folder-like ressources
 */
class qcl_io_filesystem_local_Folder extends qcl_io_filesystem_local_Resource
{

  /**
   * php 4 interface implementaion
   */
  var $implements = array("qcl_io_filesystem_IFolder");
  
  /**
   * PHP directory object
   * @var Directory
   * @access private
   */
  var $_dir;
  
  /**
   * Constructor
   * @param qcl_jsonrpc_controller $controller
   * @param string $resourcePath
   */
  function __construct ( $controller, $resourcePath )
  {
    /*
     * parent constructor takes care of controller and resource path
     */
    parent::__construct( &$controller, $resourcePath );
  }

  
  /**
   * Creates the folder
   * @param int $mode File permissions, defaults to 0777 
   * @return bool if file could be created
   */
  function create($mode=0777) 
  {
    /*
     * create folder if it doesn't exist
     */
    $filePath = $this->filePath();
    $dirname  = dirname( $filePath );
    $basename = basename( $filePath );

    if ( ! file_exists( $filePath ) )
    {
      if ( is_writable( $dirname ) )
      {
        if ( ! mkdir( $filePath, $mode ) )
        {
          $this->setError("Problems creating folder '$filePath' with permissions $mode." );
          return false;
        }
      }
      else
      {
        $this->setError("Folder '$basename' does not exist and cannot be created because parent directory '$dirname' is not writable." );
        return false;
      }
    }    
    return true;
  }    
  
  /**
   * Creates a file resource if it doesn't exist. Return resource.
   * @param string $name
   * @return qcl_io_filesystem_local_File | false
   */
  function &createOrGetFile( $name ) 
  {
    $resourcePath = $this->resourcePath() . "/" . $name;
    $controller =& $this->getController();
    $fileObj =& new qcl_io_filesystem_local_File( &$controller, $resourcePath );
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
   * @return qcl_io_filesystem_local_Folder | false
   */
  function &createOrGetFolder( $name ) 
  {
    $resourcePath = $this->resourcePath() . "/" . $name;
    $controller =& $this->getController();
    $folderObj =& new qcl_io_filesystem_local_Folder( &$controller, $resourcePath );
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
    $filePath = $this->filePath() . "/" . $name;
    return file_exists( $filePath );    
  }    
  
  
  /**
   * Returns the file or folder with the name if it exists
   * @return qcl_io_filesystem_local_File | qcl_io_filesystem_local_Folder
   */
  function &get( $name ) 
  {
    $filePath     = $this->filePath() . "/" . $name;
    $resourcePath = $this->resourcePath() . "/" . $name;
    $controller   =& $this->getController();
    
    if ( is_file( $filePath ) )
    {
      return new qcl_io_filesystem_local_File( &$controller, $resourcePath );
    }
    elseif ( is_dir( $filePath ) )
    {
      return new qcl_io_filesystem_local_Folder( &$controller, $resourcePath );  
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
    $this->_dir = dir( $this->filePath() );
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
      $name = $this->_dir->read();  
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
    $this->_dir->close();
  }   
}
?>