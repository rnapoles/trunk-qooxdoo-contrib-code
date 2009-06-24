<?php

/*
 * dependencies
 */
require_once "qcl/datasource/type/db/Model.php";
require_once "qcl/io/filesystem/remote/File.php";
require_once "qcl/io/filesystem/remote/Folder.php";

/**
 * Class modeling a datasource containing files stored on a remote computer.
 * Currently does not support subfolders. Supports all protocols supported by php plus amazon s3
 */
class qcl_io_filesystem_remote_Datasource extends qcl_datasource_type_db_Model
{

  /**
   * The folder containing the files in this datasource
   * @var qcl_io_filesystem_remote_Folder
   */
  var $folderObj = null;

  /**
   * The name of the schema
   */
  var $schemaName = "remoteFiles";

  /**
   * If the datasource is a file storage. True for this datasource
   * @return bool
   */
  function isFileStorage()
  {
    return true;
  }

  /**
   * initializes all models that belong to this datasource
   * @abstract
   * @param string $datasource Name of the datasource
   */
  function initializeModels( $datasource )
  {
    if ( $this->getResourcePath() && $this->getUsername() && $this->getPassword() )
    {
      $resourcePath = $this->getType() . "://" . $this->getResourcePath();
      define("S3_KEY",     $this->getUsername() );
      define('S3_PRIVATE', $this->getPassword() );
      $this->folderObj =& new qcl_io_filesystem_remote_Folder( $resourcePath);
    }
  }

  /**
   * Returns the file object to do read and write operations with.
   * @param string $filename
   * @var qcl_io_filesystem_remote_File
   */
  function &getFile($filename)
  {
    if ( $this->folderObj )
    {
      return $this->folderObj->get($filename);
    }
    $this->raiseError("Datasource not initialized.");
  }

  /**
   * Returns the folder object of the datasource
   */
  function &getFolderObject()
  {
    if ( $this->folderObj )
    {
      return $this->folderObj;
    }
    $this->raiseError("Datasource not initialized.");
  }

  /**
   * Returns a list of fields that should be disabled in a form
   * @override
   * @return array
   */
  function unusedFields()
  {
    if ( $this->folderObj && $this->folderObj->resourceType == "s3" )
    {
      return array( "host", "port", "database", "prefix" );
    }
    return array( "database", "prefix" );
  }

  /**
   * Creates a local filesystem datasource
   * @return void
   * @param string $datasource datasource name
   * @param array  $options    connection data etc.
   */
  function create ( $datasource, $options = array()  )
  {
    /*
     * check datasource name
     */
    if ( ! $this->_checkCreate($datasource) ) return false;

    /*
     * create entry
     */
    $this->insert(array(
      "namedId"      => $datasource,
      "active"       => isset($options['active']) ? $options['active'] : 1,
      "readonly"     => isset($options['readonly']) ? $options['readonly'] : 0,
      "native"       => 0,
      "name"         => either($options['name'],$datasource),
      "schema"       => $this->schemaName(),
      "type"         => either($options['type'],"s3"),
      "host"         => either($options['host'],""),
      "port"         => either($options['port'],""),
      "username"     => either($options['username'],""),
      "password"     => either($options['password'],""),
      "resourcepath" => either($options['resourcepath'],""),
      "description"  => either($options['description'],""),
      "owner"        => either($options['owner'],""),
      "hidden"       => isset($options['hidden']) ? $options['hidden'] : 0,
    ));

    return true;
  }


}

?>