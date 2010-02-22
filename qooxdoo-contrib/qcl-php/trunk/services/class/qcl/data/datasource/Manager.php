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
require_once "qcl/core/Object.php";
require_once "qcl/data/datasource/registry/Model.php";
require_once "qcl/data/datasource/type/db/Model.php";
require_once "qcl/data/persistence/db/Object.php";

// Don't use require_once "qcl/data/datasource/registry/Model.php";

/*
 * constants
 */
if ( defined("QCL_LOG_DATASOURCE") )
  define("QCL_LOG_DATASOURCE","datasource");

/**
 * Datasource manager singleton class
 */
class qcl_data_datasource_Manager
  extends qcl_core_Object
{

  /**
   * cache for datasource model objects
   * @var array
   */
  var $datasourceModels = array();

  /**
   * Returns singleton instance of this class.
   * @return qcl_data_datasource_Manager
   */
  function getInstance()
  {
    return qcl_getInstance(__CLASS__);
  }



  /**
   * Retrieves and initializes the datasource model object for a
   * datasource with the given name. Caches the result during a
   * request. Can be called statically.
   *
   * @param string $name
   * @return qcl_data_datasource_type_db_Model
   */
  function getDatasourceModel( $name )
  {

    $_this = qcl_data_datasource_Manager::getInstance();

    if ( ! $name or !is_string($name) )
    {
      $this->raiseError("Invalid datasource name '$name");
    }

    /*
     * create model object if it hasn't been created already
     */
    if ( ! $_this->datasourceModels[$name] )
    {

      /*
       * get datasource model specific to the datasource
       */
      $dsModel = $_this->getDatasourceModelByName( $name );

      /*
       * initialize the models that belong to the name
       */
      $dsModel->initializeModels($name);

      /*
       * save reference to the object
       */
      $_this->datasourceModels[$name] = $dsModel;
    }

    /*
     * return cached model object
     */
    return $_this->datasourceModels[$name];
  }

  /**
   * gets storage object
   * @return qcl_data_datasource_registry_Model
   */
  function getRegistry()
  {
    $registry = qcl_data_datasource_registry_Model::getInstance();
    return $registry;
  }

  /**
   * Register datasource. Can be called statically.
   * @param string $name Name of datasource schema
   * @param string $class Name of datasource model class
   * @param string $title Descriptive title of the datasource
   * @param string $description Long description
   */
  function registerSchema( $schemaName, $class, $title=null, $description=null )
  {
    $_this = qcl_data_datasource_Manager::getInstance();
    $_this->log("Registering class '$class' for schema '$schemaName'", QCL_LOG_DATASOURCE);
    $registry = $_this->getRegistry();
    if ( ! $title ) $title = $schemaName;
    $registry->register( $schemaName, $class, $title, $description );
  }

  /**
   * Unregister datasource. Can be called statically.
   * @param string $name Name of datasource schema
   */
  function unregisterSchema( $schemaName )
  {
    $_this = qcl_data_datasource_Manager::getInstance();
    $_this->log("Unregistering class '$class'", QCL_LOG_DATASOURCE);
    $registry = $_this->getRegistry();
    $registry->unregister( $schemaName );
  }

  /**
   * Returns a list of registered schema names
   *
   * @return array
   */
  function getSchemaList()
  {
    $_this = qcl_data_datasource_Manager::getInstance();
    $registry = $_this->getRegistry();
    return $registry->schemaList();
  }

  function getSchemaData( $schema )
  {
    $_this = qcl_data_datasource_Manager::getInstance();
    $registry = $_this->getRegistry();
    $registry->findByNamedId( $schema );
    if ( $registry->foundSomething() )
    {
      return $registry->getRecord();
    }
    else
    {
      return null;
    }
  }

  /**
   * Creates a new datassource entry according to the schema name,
   * with the given data. Can be called statically.
   *
   * @param string $datasource Named id of datasource
   * @param string $schemaName Name of schema
   * @param array $options Optional map overriding default values
   * @return qcl_data_datasource_type_db_Model
   */
  function create( $datasource, $schemaName, $options=array() )
  {
    $_this = qcl_data_datasource_Manager::getInstance();
    $dsModel = $_this->getSchemaModel( $schemaName );
    $dsModel->create( $datasource, $options );
    return $dsModel;
  }

  /**
   * Checks if a datasource of this name exists. Can be called statically.
   * @param $datasource
   * @return bool
   */
  function exists( $datasource )
  {
    $dsModel = qcl_data_datasource_type_db_Model::getInstance();
    $dsModel->findByNamedId( $datasource );
    return $dsModel->foundSomething();
  }

  /**
   * Deletes a datasource. Can be called statically.
   * @param $datasource
   * @return void
   */
  function delete( $datasource )
  {
    $dsModel = qcl_data_datasource_type_db_Model::getInstance();
    $dsModel->deleteBy("namedId", $datasource );
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

    $registry = $this->getRegistry();
    $class = $registry->getClassFor($schemaName);

    //$this->debug("Found class $class for schema $schemaName");

    return $class;
  }

  /**
   * Returns the datasource model object for the given schema name
   * @param string $dsSchemaName
   * @return qcl_data_datasource_type_db_Model
   */
  function getSchemaModel( $dsSchemaName )
  {
    $class = $this->getClassForSchema($dsSchemaName);

    //$this->debug("Datasource schema '$dsSchemaName' corresponds to class '$class.");
    return $this->getNew( $class );
  }



  /**
   * Returns the datasource model object used by a named datasource
   * @param string $name name of the datasource, must be in the datasources table
   * @return qcl_data_datasource_type_db_Model
   */
  function getDatasourceModelByName($name)
  {

    if ( empty($name) )
    {
      $this->raiseError("Missing dataource name.");
    }

    /*
     * get abstract datasource model to retrieve more specific one
     */
    $dsModel = qcl_data_datasource_type_db_Model::getInstance();

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
     * get datasource schema model and relaod datasource data
     */
    $dsSchemaModel = $this->getSchemaModel( $dsSchemaName );
    $dsSchemaModel->load( $dsModel->getId() );

    /*
     * store name of the datasource in the model
     */
    $dsSchemaModel->datasource = $name;

    return $dsSchemaModel;
  }

  /**
   * Returns a list of registered schema names
   *
   * @return array
   */
  function getDatasourceList()
  {
    $dsModel = qcl_data_datasource_type_db_Model::getInstance();
    $dsModel->findAll("namedId");
    return $dsModel->values();
  }
}
?>