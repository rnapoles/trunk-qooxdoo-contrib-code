<?php

require "qcl/io/file/abstract.php";

class qcl_io_file_local extends qcl_io_file_abstract 
{
  /**
   * interface implemented
   */
  var $implements = array("qcl_io_file_interface");
  
  
  /**
   * Constructor
   *
   * @param qcl_jsonrpc_controller|null $controller
   * @param string $resourcePath
   */
  function __construct($controller=null, $resourcePath)
  {
    parent::_construct(&$controller);

    if ( ! is_valid_file($resourcePath) )
    {
      $this->raiseError("'$resourcePath' is not a valid file reresource path.");  
    }
  }

  
  /**
   * Load the whole file resource into memory
   * @return string|false Returns the file data as a string or false if file could not be loaded
   */
  function load() 
  {
    return file_get_contents($this->resourcePath);
  }
  
  /**
   * save a string of data back into the file resource
   * @param string $data
   */
  function save($data) 
  {
    file_put_contents( $this->resourcePath, $data );
  }

  /**
   * Opens the file resource for reading or writing
   * @param string $mode r(ead)|w(rite)|a(append)
   */
  function open($mode) {}

  /**
   * Creates an empty file resource and opens it for writing
   */
  function create()
  {
    $dirname = dirname($this->resourcePath);
    
    if ( ! is_dir($dirname) )
    {
      $this->raiseError("'$dirname' is not a directory");
    }
    
    if ( is_writable( $dirname ) )
    {
      $this->raiseError("'$dirname' is not writable");
    }    
  }
  
  /**
   * Reads a variable number of bytes from the resource
   * @param int $bytes
   * @return string|false returns the string read or false if there was an error or end of file was reached
   */
  function read($bytes) {}
  
  /**
   * Writes to the file resource a variable number of bytes
   * @param string $data
   */
  function write($data) {}
  
  /**
   * Closes the file resource
   */
  function close() {}  
}
?>