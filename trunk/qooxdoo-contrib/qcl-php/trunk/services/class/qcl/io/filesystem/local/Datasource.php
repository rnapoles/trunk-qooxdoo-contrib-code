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
require_once "qcl/data/datasource/type/db/Model.php";
require_once "qcl/io/filesystem/local/File.php";
require_once "qcl/io/filesystem/local/Folder.php";

/**
 * Class modeling a datasource containing files stored on the local computer.
 * Currently does not support subfolders
 */
class qcl_io_filesystem_local_Datasource
  extends qcl_data_datasource_DbModel
{

  /**
   * The folder containing the files in this datasource
   * @var qcl_io_filesystem_local_Folder
   */
  var $folderObj = null;

  /**
   * The name of the schema
   */
  var $schemaName = "localFiles";

  /**
   * initializes all models that belong to this datasource
   * @abstract
   * @param string $datasource Name of the datasource
   */
  function init()
  {
    $resourcePath = $this->getType() . "://" . $this->getResourcePath();
    $this->folderObj = new qcl_io_filesystem_local_Folder( $resourcePath );
  }

  /**
   * Returns the file object to do read and write operations with.
   * @param string $filename
   * @var qcl_io_filesystem_local_File
   */
  function getFileObject($filename)
  {
    return $this->folderObj->get($filename);
  }

  /**
   * Returns the folder object
   * @var qcl_io_filesystem_local_Folder
   */
  function getFolderObject()
  {
    return $this->folderObj;
  }

  /**
   * Returns a list of fields that should be disabled in a form
   * @override
   * @return array
   */
  function unusedFields()
  {
    return array( "host", "port", "username", "password", "database", "prefix");
  }

  function isFileStorage()
  {
    return true;
  }
}
?>