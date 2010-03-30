<?php
/*
 * qcl - the qooxdoo component library
 *
 * http://qooxdoo.org/contrib/project/qcl/
 *
 * Copyright:
 *   2007-2009 Christian Boulanger
 *
 * License:
 *   LGPL: http://www.gnu.org/licenses/lgpl.html
 *   EPL: http://www.eclipse.org/org/documents/epl-v10.php
 *   See the LICENSE file in the project's top-level directory for details.
 *
 * Authors:
 *  * Christian Boulanger (cboulanger)
 */

require_once "qcl/io/filesystem/Resource.php";

/**
 * Base class for local filesystem resource classes
 */
class qcl_io_filesystem_local_Resource
  extends qcl_io_filesystem_Resource
{

  /**
   * Setter for resource path. This will also find files that are on the
   * include_path and on the PATH.
   * @param string $resourcePath
   * @return void
   */
  function setResourcePath( $resourcePath )
  {
    $path = qcl_realpath( $this->filePath( $resourcePath ) );
    $this->_resourcePath = "file://" . $path; // FIXME ? $path : $resourcePath;
  }

  /**
   * The supported / allowed protocols
   */
  var $resourceTypes = array("file");


  /**
   * Checks whether (given) resource path is a file
   * @param string[optional] $resourcePath
   * @return bool
   */
  function isFile($resourcePath = null)
  {
    return is_file( $this->filePath($resourcePath) );
  }

  /**
   * Checks whether (given) resource path is a directory
   * @param string[optional] $resourcePath
   * @return bool
   */
  function isDir($resourcePath=null)
  {
    return is_dir( $this->filePath($resourcePath) );
  }

  /**
   * Checks if file exists
   */
  function exists()
  {
    return file_exists( $this->filePath() );
  }

  /**
   * Deletes the file/folder
   * @return booelean Result
   * @todo implement seperately for folder
   */
  function delete()
  {
    if ( ! @unlink( $this->filePath() ) )
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
   * Returns the last modification date
   */
  function lastModified()
  {
    return filectime( $this->filePath() );
  }

}
?>