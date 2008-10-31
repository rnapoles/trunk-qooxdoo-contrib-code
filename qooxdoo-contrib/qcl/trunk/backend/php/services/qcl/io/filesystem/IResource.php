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
   * Casting as string, returns the resource path
   * @return string
   */
  function toString(){}
  
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
   * @return string
   */
  function dirname() {}
  
  /**
   * Returns the name of the resource without the containing directory
   * @return string
   */
  function basename() {}  
}

?>