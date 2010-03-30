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
 * Folder-like ressources
 */
interface qcl_io_filesystem_IFolder
  extends qcl_io_filesystem_IResource
{



  /**
   * Creates a file resource if it doesn't exist. Return resource.
   * @param string $name
   * @return qcl_io_filesystem_local_File
   */
  function createOrGetFile( $name );

  /**
   * Creates a folder resource if it doesn't exist. Return resource
   * @param string $name
   * @return qcl_io_filesystem_local_Folder
   */
  function createOrGetFolder( $name );

  /**
   * Returns the file or folder with the name
   * @return qcl_io_file_AbstractFile
   */
  function get( $name );

  /**
   * Checks if resource of the given name exists in this folder
   * @param string $name
   * @return boolean
   */
  function has( $name );

  /**
   * Opens the folder to iterate through its contents
   * @return void
   */
  function open();

  /**
   * Gets the next entry in the folder
   * @return qcl_io_filesystem_local_File | qcl_io_filesystem_local_Folder
   */
  function next();

  /**
   * Closes the folder resource
   */
  function close();


}
?>