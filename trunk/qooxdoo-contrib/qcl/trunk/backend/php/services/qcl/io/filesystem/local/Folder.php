<?php

require_once "qcl/io/filesystem/AbstractFolder.php";

/**
 * Folder-like ressources
 */
class qcl_io_filesystem_local_Folder extends qcl_io_filesystem_AbstractFolder
{

  /**
   * Checks wether resource path is valid
   * @param string $resourcePath
   * @retrun boolean
   */
  function checkResourcePath( $resourcePath )
  {
    
  }  
  
  /**
   * Creates a file resource
   * @param string $name
   * @return qcl_io_file_AbstractFile
   */
  function createFile( $name ) {}  
  
  /**
   * Creates a folder resource
   * @param string $Name
   * @return qcl_io_folder_AbstractFolder
   */
  function createFolder( $name ) {}  
  
  /**
   * Returns the file or folder with the name 
   * @return qcl_io_file_AbstractFile
   */
  function get( $name ) {}
  
  /**
   * Opens the folder to iterate through its contents
   * @return void
   */
  function open() {}  
  
  /**
   * Gets the next entry in the folder
   * @return qcl_io_file_abstract
   */
  function next() {}    
  
  /**
   * Closes the folder resource
   */
  function close() {}
  
  /**
   * Deletes the folder resource
   */
  function delete() {}  
  
}
?>