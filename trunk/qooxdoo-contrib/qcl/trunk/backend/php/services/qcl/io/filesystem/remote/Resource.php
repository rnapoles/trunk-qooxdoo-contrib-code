<?php

require_once "qcl/io/filesystem/Resource.php";

/**
 * Base class for remote filesystem resource classes
 */
class qcl_io_filesystem_remote_Resource extends qcl_io_filesystem_Resource
{
  /**
   * The supported / allowed protocols
   */
  var $protocols = array("ftp","http");
  
  /**
   * Checks wether resource path is valid. Local files have to start 
   * with a valid protocol such as "ftp://"
   * @param string $resourcePath
   * @retrun boolean
   */
  function checkResourcePath( $resourcePath ) 
  {
    return  in_array( substr($resourcePath,0,strpos($resourcePath,":"-1) ), $this->protocols );
  }

  /**
   * Returns the file path withoug leading "file://"
   * @return string
   */
  function filePath()
  {
    return substr($this->resourcePath,strpos($resourcePath,":"+3) );
  }
  
  /**
   * Deletes the file/folder 
   * @return booelean Result 
   */
  function delete() 
  {
    if ( ! unlink( $this->filePath() ) )
    {
      $this->setError("Problem deleting " . $this->resourcePath() );
      return false;
    }
    return true;
  }  
  
  /**
   * Renames the file/folder Fails if new name exists.
   * @param string $name New name
   * @return boolean Result
   */
  function rename($name) 
  {
    $newFileName = dirname( $this->filePath() ) . "/$name";
    
    if ( file_exists($newFileName) )
    {
      $this->setError("Cannot rename '" . $this->resourcePath() . "' to '$name'. File exists.");
      return false;
    }
    if ( rename( $this->filePath(), $newFileName ) )
    {
      $this->_resourcePath = "file://" . $newFileName;
      return true;
    }
    $this->setError("Problem renaming '" . $this->resourcePath() . "' to '$name'.");
    return false;
  }  
  
  /**
   * Returns the directory in which the resource is located.
   * @return string
   */
  function dirname()
  {
    return "file://" . dirname($this->filePath());
  }
  
  /**
   * Returns the name of the resource without the containing directory
   * @return string
   */
  function basename()
  {
    return basename($this->filePath());  
  }
  

}
?>