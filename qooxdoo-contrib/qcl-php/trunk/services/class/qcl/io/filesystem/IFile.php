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

qcl_import( "qcl_io_filesystem_IResource" );

/**
 * Interface for file-like resources. Creating an object
 * will create a file if it doesn't exist already.
 */
interface qcl_io_filesystem_IFile
  extends qcl_io_filesystem_IResource
{

  /**
   * Load the whole file resource into memory
   * @return bool false if file could not be loaded
   */
  function load();

  /**
   * save a string of data back into the file resource
   * @param string $data
   */
  function save($data);

  /**
   * Opens the file resource for reading or writing
   * @param string $mode r(ead)|w(rite)|a(append)
   */
  function open($mode="r");

  /**
   * Reads a variable number of bytes from the resource
   * @param int $bytes
   * @return string|false|null Tthe string read, false if there was an error and null if end of file was reached
   */
  function read($bytes);

  /**
   * Reads a line from the resource
   * @return string|false|null Tthe string read, false if there was an error and null if end of file was reached
   */
  function readLine();

  /**
   * Writes to the file resource a variable number of bytes
   * @param string $data
   */
  function write($data);

  /**
   * Closes the file resource
   */
  function close();


}
?>