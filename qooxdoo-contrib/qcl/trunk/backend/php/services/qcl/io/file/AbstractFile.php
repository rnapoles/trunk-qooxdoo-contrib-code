<?php

/**
 * PHP4/PHP5 Interface for file-like resources
 */
class qcl_io_file_AbstractFile extends qcl_io_file_abstract
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

  /**
   * Deletes the file resource
   */
  function delete() {}  
  
}
?>