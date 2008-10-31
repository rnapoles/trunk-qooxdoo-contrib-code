<?php

/*
 * dependencies
 */
require_once "qcl/datasource/db.model.php";
require_once "qcl/io/filesystem/remote/File.php";
require_once "qcl/io/filesystem/remote/Folder.php";

/**
 * Class modeling a datasource containing files stored on a remote computer.
 * Currently does not support subfolders. Supports all protocols supported by php.
 */
class qcl_io_filesystem_remote_Datasource extends qcl_datasource_db_model
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
   * initializes all models that belong to this datasource
   * @abstract
   * @param string $datasource Name of the datasource
   */
  function initializeModels( $datasource )
  {
    $resourcePath = $this->getResourcePath();
    $this->folderObj =& new qcl_io_filesystem_remote_Folder(&$this,$resourcePath);
  }
 
  /**
   * Returns the file object to do read and write operations with.
   * @param string $filename
   * @var qcl_io_filesystem_remote_File
   */
  function &get($filename)
  {
    return $this->folderObj->get($filename);
  }
  
  /**
   * Returns a list of fields that should be disabled in a form
   * @override
   * @return array
   */
  function unusedFields()
  {
    return array( "host", "port", "username", "password" );
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
      "type"         => "file",
      "resourcepath" => either($options['resourcepath'],QCL_UPLOAD_PATH),
      "description"  => either($options['description'],""),
      "owner"        => either($options['owner'],""),
      "hidden"       => isset($options['hidden']) ? $options['hidden'] : 0,  
    ));

    return true;
  }  

}

?>