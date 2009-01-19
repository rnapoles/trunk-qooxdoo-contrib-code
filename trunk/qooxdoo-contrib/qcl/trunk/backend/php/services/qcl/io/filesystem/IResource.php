<?php


/**
 * Interface for Methods common to all filesystem resources
 */
class qcl_io_filesystem_IResource 
{

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
  function resourcePath() {}

  /**
   * Checks if file exists
   * @return bool
   */
  function exists() {}
  
  /**
   * Creates the file
   * @return bool if file could be created
   */
  function create() {}      
  
  /**
   * Deletes the file/folder 
   * @return booelean Result 
   */
  function delete() {}
  
  /**
   * Renames the file/folder Fails if new name exists.
   * @param string $name New name
   * @return boolean Result
   */
  function rename($name) {}  
  
  /**
   * Returns the directory in which the resource is located.
   * @param string[optional] $resourcePath
   * @return string
   */
  function dirname($resourcePath=null) {}
  
  /**
   * Returns the name of the (given) resource without the containing directory
   * @param string[optional] $resourcePath
   * @return string
   */
  function basename($resourcePath=null) {}  
  
  /**
   * Returns the extension of the (given) resource path, if any.
   * @param string[optional] $resourcePath
   * @return string
   */
  function extension($resourcePath=null) {}
  
  /**
   * Casting as string, returns the resource path
   * @return string
   */
  function toString() {}

  /**
   * Last modification date
   * @return string
   */
  function lastModified() {}
}

?>