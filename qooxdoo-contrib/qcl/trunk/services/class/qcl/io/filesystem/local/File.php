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
require_once "qcl/io/filesystem/local/Resource.php";
require_once "qcl/io/filesystem/IFile.php";

/**
 * PHP4/PHP5 Interface for file-like resources
 */
class qcl_io_filesystem_local_File extends qcl_io_filesystem_local_Resource
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
   * Constructor
   * @param string $resourcePath
   */
  function __construct ( $resourcePath )
  {
    /*
     * parent constructor takes care of  resource path
     */
    parent::__construct( $resourcePath );

  }

  /**
   * Create a file
   * @param int $mode File permissions, defaults to 0666
   * @return bool if file could be created
   */
  function create( $mode=0666 )
  {
    /*
     * create file if it doesn't exist
     */
    $filePath = $this->filePath();
    $dirname  = dirname( $filePath );
    $basename = basename( $filePath );

    if ( ! file_exists( $filePath ) )
    {
      if ( is_writable( dirname( $dirname ) ) )
      {
        touch( $filePath );
        //chmod( $filePath, $mode );
        return true;
      }
      else
      {
        $this->setError("File '$basename' does not exist and cannot be created because parent directory '$dirname' is not writable." );
        return false;
      }
    }
    else
    {
      $this->setError("File '$basename' exist." );
      return false;
    }
  }


  /**
   * Load the whole file resource into memory
   * @return mixed string content or false if file could not be loaded
   */
  function load()
  {
    return file_get_contents($this->filePath());
  }

  /**
   * save a string of data back into the file resource
   * @param string $data
   * @return void
   */
  function save( $data )
  {
    if ( file_put_contents( $this->filePath(), $data ) )
    {
      return true;
    }
    else
    {
      $this->setError("Problems saving to " . $this->filePath() );
      return false;
    }
  }

  /**
   * Opens the file resource for reading or writing
   * @param string $mode r(ead)|w(rite)|a(append)
   * @param boolean Result
   */
  function open($mode="r")
  {
    $fp = fopen( $this->filePath(), $mode );
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
   * Stores data in the file. Shortcut for open("w"), write, close.
   * @param string $data
   */
  function store( $data )
  {
    $this->open("w");
    $this->write($data);
    $this->close();
  }

  /**
   * Apends data to file. Shortcut for open("a"), write, close
   * @param string $data
   */
  function append( $data )
  {
    $this->open("a");
    $this->write($data);
    $this->close();
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