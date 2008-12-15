<?php
/*
 * Dependencies
 */
require_once "qcl/io/filesystem/local/File.php";

/**
 * PHP4/PHP5 Temporary File
 */
class qcl_io_filesystem_local_TempFile extends qcl_io_filesystem_local_File 
{

  /**
   * Constructor. Will create the file if it doesn't exist and will
   * throw an error if that is not possible.
   * @param qcl_jsonrpc_controller $controller
   */
  function __construct ( $controller )
  {
    /*
     * resource path is a temporary file
     */
    $resourcePath = tempnam();
    if ( ! $resourcePath )
    {
      $this->raiseError("Problem creating temporary file."); 
    }
    
    /*
     * parent constructor takes care of controller and resource path
     */
    parent::__construct( &$controller, $resourcePath );
  }       
 
  /**
   * Destructor. Deletes file at the end of the script.
   */
  function __destruct()
  {
    $this->delete();
  }
}
?>