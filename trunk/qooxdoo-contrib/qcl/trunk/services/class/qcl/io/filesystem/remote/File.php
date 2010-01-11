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
require_once "qcl/io/filesystem/remote/Resource.php";
require_once "qcl/io/filesystem/IFile.php";

/**
 * PHP4/PHP5 Interface for file-like resources stored on a remote computer
 * Supports all protocols/wrappers supported by PHP
 */
class qcl_io_filesystem_remote_File extends qcl_io_filesystem_remote_Resource
{

  /**
   * php 4 interface implementaion
   */
  var $implements = array("qcl_io_filesystem_IFile");

  /**
   * A php file pointer
   * @var resource
   * @access private
   */
  var $_fp;

  /**
   * Constructor. Will create the file if it doesn't exist and will
   * throw an error if that is not possible.
   * @param qcl_data_controller_Controller $controller
   * @param string $resourcePath
   */
  function __construct ( $resourcePath )
  {
    /*
     * parent constructor takes care of controller and resource path
     */
    parent::__construct($resourcePath );

  }

  /**
   * Checks if file exists
   * @return bool
   */
  function exists()
  {
    if ( $this->open("r") )
    {
      $this->close();
      return true;
    }
    return false;
  }

  /**
   * Creates the file
   * @return void
   */
  function create()
  {
    if ( $this->open("w") )
    {
      $result = $this->write($data);
      $this->close();
    }
    $this->setError("Problem creating file " . $this->resourcePath() );
  }

  /**
   * Load the whole file resource into memory
   * @return mixed string content or false if file could not be loaded
   */
  function load()
  {
    if ( $this->open("r") )
    {
      $data = "";
      while ( $b = $this->read(4096) )
      {
        $data .= $b;
      }
      $this->close();
      return $data;
    }
    return false;
  }

  /**
   * save a string of data back into the file resource
   * @param string $data
   * @return void
   */
  function save($data)
  {
    if ( $this->open("w") )
    {
      $result = $this->write($data);
      $this->close();
      return $result;
    }
    return false;
  }

  /**
   * Opens the file resource for reading or writing
   * @param string $mode r(ead)|w(rite)|a(append)
   * @param boolean Result
   */
  function open($mode="r")
  {
    $fp = fopen( $this->resourcePath(), $mode );
    if ( ! $fp )
    {
      $this->setError("Problem opening " . $this->resourcePath() );
      return false;
    }
    $this->_fp = $fp;
    return true;
  }

  /**
   * Reads a variable number of bytes from the resource
   * @param int $bytes
   * @return string|false|null Tthe string read, false if there was an error and null if end of file was reached
   */
  function read( $bytes )
  {
    if ( ! $this->_fp )
    {
      $this->raiseError("You have to ::open() the file first.");
    }
    if ( feof( $this->_fp) )
    {
      return null;
    }
    $result = fread($this->_fp,$bytes);
    if ( ! $result )
    {
      $this->setError("Problem reading $bytes from " . $this->resourcePath() );
      return false;
    }
    return $result;
  }

  /**
   * Reads one line from the resource
   * @param int $bytes
   * @return string|false|null Tthe string read, false if there was an error and null if end of file was reached
   */
  function readLine()
  {
    if ( feof( $this->_fp) )
    {
      return null;
    }
    $result = fgets($this->_fp);
    if ( ! $result )
    {
      $this->setError("Problem reading line from " . $this->resourcePath() );
      return false;
    }
    return $result;
  }

  /**
   * Writes to the file resource a variable number of bytes
   * @param string $data
   */
  function write( $data )
  {
    if ( ! fputs($this->_fp,$data ) )
    {
      $this->setError("Problem writing to " . $this->resourcePath() );
      return false;
    }
    return true;
  }

  /**
   * Closes the file resource
   * @return booelean Result
   */
  function close()
  {
    if ( ! fclose($this->_fp) )
    {
      $this->setError("Problem closing " . $this->resourcePath() );
      return false;
    }
    return true;
  }

  /**
   * Returns an associative array containing information about path.
   * The following associative array elements are returned:
   * dirname, basename extension (if any), and filename.
   * @return array
   **/
  function info()
  {
    return pathinfo($this->resourcePath());
  }

}
?>