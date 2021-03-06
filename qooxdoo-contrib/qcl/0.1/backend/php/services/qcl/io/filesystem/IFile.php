<?php

require_once "qcl/io/filesystem/IResource.php";

/**
 * PHP4/PHP5 Interface for file-like resources. Creating an object
 * will create a file if it doesn't exist already.
 */
class qcl_io_filesystem_IFile extends qcl_io_filesystem_IResource
{
  
  /**
   * Load the whole file resource into memory
   * @return bool false if file could not be loaded
   */
  function load() {}
  
  /**
   * save a string of data back into the file resource
   * @param string $data
   */
  function save($data) {}

  /**
   * Opens the file resource for reading or writing
   * @param string $mode r(ead)|w(rite)|a(append)
   */
  function open($mode) {}
    
  /**
   * Reads a variable number of bytes from the resource
   * @param int $bytes
   * @return string|false|null Tthe string read, false if there was an error and null if end of file was reached
   */
  function read($bytes) {}

  /**
   * Reads a line from the resource
   * @param int $bytes
   * @return string|false|null Tthe string read, false if there was an error and null if end of file was reached
   */
  function readLine($bytes) {}  
  
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