<?php

/*
 * dependencies
 */
require_once "qcl/datasource/db.model.php";
require_once "qcl/io/filesystem/local/File.php";
require_once "qcl/io/filesystem/local/Folder.php";

/**
 * Class modeling a datasource. Not yet functional!
 */
class qcl_io_filesystem_local_Datasource extends qcl_datasource_db_model
{

  /**
   * The folder containing the files in this datasource
   * @var qcl_io_filesystem_local_Folder
   */
  var $folder = null;
  
  /**
   * The name of the schema
   */
  var $schemaName = "localFiles";
  
  /**
   * initializes all models that belong to this datasource
   * @abstract
   * @param string $datasource Name of the datasource
   */
  function initializeModels( $datasource )
  {
    $resourcePath = $this->getHost();
    $this->info($resourcePath);
    //$this->folder =& new qcl_io_filesystem_local_Folder(&$this,$resourcePath);
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
    $this->_checkCreate($datasource);
    
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
      "host"         => $options['host'],
      "description"  => (string) $options['description'],
      "owner"        => either($options['owner'],""),
      "hidden"       => isset($options['hidden']) ? $options['hidden'] : 0,  
    ));

   return true;
  }  

}

?>