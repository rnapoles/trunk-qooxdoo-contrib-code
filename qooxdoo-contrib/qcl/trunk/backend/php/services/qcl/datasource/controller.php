<?php
/*
 * dependencies
 */
require_once "qcl/session/controller.php";
require_once "qcl/datasource/type/db/Model.php";
require_once "qcl/datasource/SchemaManager.php";

/*
 * constants
 */
if ( defined("QCL_LOG_DATASOURCE") ) define("QCL_LOG_DATASOURCE","datasource");

/**
 * Datasource controller class. Can also be used as a mixin for controllers
 * that are not bound to a database.
 * @todo Get rid of file-based storage and use persistend db object instead.
 */
class qcl_datasource_controller extends qcl_session_controller
{  

  /**
   * Cached datasource manager object
   * @var qcl_datasoure_SchemaManager
   * @access private
   */
  var $_manager;
  
  /**
   * cache for datasource model objects
   * @var array
   */ 
  var $datasourceModels = array();  
  
  /**
   * Retrieves and initializes the datasource model object for a 
   * datasource with the given name. Caches the result during a
   * request.
   * @param string $name
   * @return qcl_datasource_type_db_Model
   */
  function &getDatasourceModel( $name )
  {
    if ( ! $name or !is_string($name) )
    {
      $this->raiseError("Invalid datasource name '$name");
    }
    
    /*
     * create model object if it hasn't been created already 
     */
    if ( ! $this->datasourceModels[$name] )
    {

      /*
       * get datasource model specific to the datasource  
       */
      $dsModel =& $this->getDatasourceModelByName($name);
      
      /*
       * initialize the models that belong to the name
       */
      $dsModel->initializeModels($name);
      
      /*
       * save reference to the object
       */
      $this->datasourceModels[$name] =& $dsModel;
    }
    
    /*
     * return cached model object
     */
    return $this->datasourceModels[$name];
  }

  /**
   * gets storage object
   * @return qcl_datasource_SchemaManager
   */
  function &getManager()
  {
    if ( ! $this->_manager )
    { 
      $this->_manager =& new qcl_datasource_SchemaManager(&$this); 
      //$this->info("New schemamanager " . $this->_manager->objectId() );
    }
    return $this->_manager;
  }
  
  
  /**
   * register datasource
   * @param string $name Name of datasource schema
   * @param string $class Name of datasource model class
   * @param string $title Descriptive title of the datasource
   * @param string $description Long description
   */
  function registerDatasourceSchema( $schemaName, $class, $title, $description=null )
  {    
    $this->log("Registering class '$class' for schema '$schemaName'", QCL_LOG_DATASOURCE);
    $manager =& $this->getManager();
    if ( ! $title ) $title = $schemaName;
    $manager->register($schemaName, $class, $title, $description); 
  }
  
  /**
   * Return the class name for a datasource schema name
   * @param string $schemaName
   * @return string
   */
  function getClassForSchema( $schemaName )
  {
    if ( ! $schemaName )
    {
      $this->raiseError("No schema name given.");
    }

    $manager =& $this->getManager();
    $class = $manager->getClassFor($schemaName);
    
    if ( ! $class )
    {
      $this->raiseError("Schema '$schemaName' has no corresponding class name.'");
    }
    
    //$this->debug("Found class $class for schema $schemaName");

    return $class;
  }
  
  /**
   * Returns the datasource model object for the given schema name
   * @param string $dsSchemaName
   * @return qcl_datasource_type_db_Model
   */
  function &getSchemaModel( $dsSchemaName )
  {
    $class = $this->getClassForSchema($dsSchemaName);
    
    //$this->debug("Datasource schema '$dsSchemaName' corresponds to class '$class.");
    return $this->getNew( $class );
  }
  
  /**
   * Returns the datasource model object used by a named datasource
   * @param string $name name of the datasource, must be in the datasources table
   * @return qcl_datasource_type_db_Model
   */
  function &getDatasourceModelByName($name)
  {
    
    if ( empty($name) )
    {
      $this->raiseError("Missing dataource name.");
    }
    
    /*
     * get abstract datasource model to retrieve more specific one
     */
    $dsModel  =& new qcl_datasource_type_db_Model( &$this );

    /*
     * retrieve record that matches the datasource name
     */    
    $data = $dsModel->findByNamedId( $name );

    /*
     * abort if not found
     */
    if ( $dsModel->foundNothing()  )
    {
      $this->raiseError("Datasource '$name' doesn't exist." );
    }
 
    /*
     * get schema name
     */
    $dsSchemaName = $dsModel->getSchema();
    //$this->debug("Datasource '$name' has schema name '$dsSchemaName'");
    
    /*
     * get datasource schema model and copy over record data
     */
    $dsSchemaModel =& $this->getSchemaModel($dsSchemaName);
    $dsSchemaModel->currentRecord = $dsModel->currentRecord;
    
    /*
     * store name of the datasource in the model
     */
    $dsSchemaModel->datasource = $name;
    
    return $dsSchemaModel;
  } 
  
  /**
   * Returns data for a combobox containing all datasource schemas
   * @return qcl_jsonrpc_Response
   */
  function method_getSchemaComboBoxData( $params )
  {
    
    $manager   =& $this->getManager();
    $listItems = array ();
    foreach ( $manager->schemaList() as $schema )
    {
      $data = $manager->getData( $schema );
      $listItems[] = array(
        'classname' => "qx.ui.form.ListItem",
        'value'     => $schema,
        'label'     => $data['title']
      );
    }
    $this->set("children",$listItems);
    $this->set("selected","default");
    
    /*
     * return client data
     */
    return $this->response();    
  }
  
  /**
   * Returns a list of datasources, optionally a selection which has the 
   * given datasource schema.
   * @param string[optional] $params[0] $schema
   * @return array ListItem data
   */
  function method_getDatasourceComboBoxData( $params )
  {
    /*
     * @todo security
     */

    /*
     * parameters
     */
    list ( $schema, $selected ) = $params;

    /*
     * models
     */
    $ds =& new qcl_datasource_type_db_Model(&$this); 

    /*
     * get all datasources or only those matching the schema,
     * sorted by name
     */
    $where = empty( $schema ) ? null : array( 'schema' => "='$schema'" );      
    $datasources  = $ds->findWhere($where,"name");
    
    /*
     * build list
     */
    $listItems    = array ();
    foreach( $datasources as $datasource)
    {
      $listItems[] = array(
        'classname' => "qx.ui.form.ListItem",
        'value'   => $datasource['namedId'],
        'label'   => $datasource['name'] . " (" . $datasource['namedId'] . ")",
      );   
    }
    $this->set("children",$listItems);
    
    /*
     * selected list item
     */
    if ( $selected )
    {
      $this->set("selected",$selected);
    }
    
    /*
     * return client data
     */
    return $this->response();
  }
}
?>