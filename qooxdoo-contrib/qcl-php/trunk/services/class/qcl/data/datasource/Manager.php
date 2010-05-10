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

qcl_import( "qcl_data_datasource_RegistryModel" );

/**
 * Datasource manager singleton class
 */
class qcl_data_datasource_Manager
  extends qcl_core_Object
{

  //-------------------------------------------------------------
  // Class properties
  //-------------------------------------------------------------

  /**
   * cache for datasource model objects
   * @var array
   */
  private $datasourceModels = array();

  //-------------------------------------------------------------
  // Initialization
  //-------------------------------------------------------------

  /**
   * Returns singleton instance of this class.
   * @return qcl_data_datasource_Manager
   */
  static function getInstance()
  {
    return qcl_getInstance(__CLASS__);
  }

  //-------------------------------------------------------------
  // Schema registration
  //-------------------------------------------------------------

  /**
   * Getter for  storage object
   * @return qcl_data_datasource_RegistryModel
   */
  public function getRegistryModel()
  {
    return qcl_data_datasource_RegistryModel::getInstance();
  }

  /**
   * Register datasource.
   * @param string $name Name of datasource schema
   * @param array $options Map of additional information. At least the
   * key 'class' must be provided
   * @param string $description Long description
   * @throws qcl_data_model_RecordExistsException
   */
  public function registerSchema( $schemaName, $options )
  {
    if ( ! isset( $options['class'] ) or ! $options['class'] )
    {
      throw new InvalidArgumentException("Missing 'class' argument");
    }
    $class = $options['class'];

    // FIXME FIXME : decide if class must exists at time of registering so that we can do dependency checks or not
    if ( ! is_string( $class) ) //or ! $class instanceof qcl_data_datasource_DbModel )
    {
      throw new InvalidArgumentException("Invalid class '$class'. Must implement qcl_data_datasource_IModel ");
    }

    $this->log("Registering class '$class' for schema '$schemaName'", QCL_LOG_DATASOURCE);

    return $this->getRegistryModel()->create( $schemaName, $options );
  }

  /**
   * Unregister datasource.
   * @param string $name Name of datasource schema
   * @param bool $deleteAll If true, also delete all datasources
   *   and their models
   * @throws InvalidArgumentException
   * @todo de-activate all datasources
   */
  public function unregisterSchema( $schemaName, $deleteAll=false )
  {
    if ( $deleteAll )
    {
      $schemaDatasources = $this->getDatasourceNamesBySchema( $schemaName );
      foreach( $schemaDatasources as $dsName )
      {
        $this->deleteDatasource( $dsName, true );
      }
    }
    $this->log("Unregistering schema '$schemaName'", QCL_LOG_DATASOURCE);
    $registry = $this->getRegistryModel();
    try
    {
      $registry->load( $schemaName );
      $registry->delete();
    }
    catch( qcl_data_model_RecordNotFoundException $e )
    {
      throw new InvalidArgumentException("Schema '$schemaName' does not exist.");
    }

  }

  /**
   * Returns an array of datasource names that are registered for the model
   * @param string $schemaName
   * @return array
   */
  public function getDatasourceNamesBySchema( $schemaName )
  {
    $dsModel = $this->getDatasourceModel();
    return $dsModel->getQueryBehavior()->fetchValues(NAMED_ID,array(
      'schema'  => $schemaName
    ) );
  }


  /**
   * Return the class name for a datasource schema name
   * @param string $schemaName
   * @return string
   */
  public function schemaClass( $schemaName )
  {
    if ( ! $schemaName )
    {
      throw new InvalidArgumentException( "No schema given" );
    }

    $registry = $this->getRegistryModel();

    try
    {
      $registry->load( $schemaName );
      return $registry->getClass();
    }
    catch ( qcl_data_model_RecordNotFoundException $e )
    {
      throw new JsonRpcException( "No class registered for schema '$namedId'" );
    }
  }

  /**
   * Returns a list of registered schema names
   * @return array
   */
  public function schemas()
  {
    $registry = $this->getRegistryModel();
    return $registry->getQueryBehavior()->fetchValues( "namedId" );
  }

  //-------------------------------------------------------------
  // Datasource models
  //-------------------------------------------------------------

  /**
   * Returns the model which stores the datasource information and
   * on which all other datasource models are based.
   * @return qcl_data_datasource_DbModel
   */
  public function getDatasourceModel()
  {
    static $dsModel = null;
    if ( $dsModel === null )
    {
      qcl_import( "qcl_data_datasource_DbModel" );
      $dsModel =  qcl_data_datasource_DbModel::getInstance();
      $dsModel->init();
    }
    return $dsModel;
  }

  /**
   * Returns a list of registered schema names
   * @return array
   */
  function datasources()
  {
    return $this->getDatasourceModel()->getQueryBehavior()->fetchValues( "namedId" );
  }

  /**
   * Creates a datasource with the given name, of the given schema.
   * @param $name
   * @param $schema
   * @return qcl_data_datasource_DbModel
   * @throws qcl_data_model_RecordExistsException
   */
  public function createDatasource( $name, $schema )
  {
    if ( ! is_string( $name ) or ! is_string( $schema ) )
    {
      throw new InvalidArgumentException(" Invalid arguments ");
    }
    $dsModel = $this->getDatasourceModel();
    $dsModel->create( $name, array( "schema" => $schema, "type" => "placeholder" ) );
    $dsModel->setDsn( $this->getApplication()->getUserDsn() ); //FIXME generalize this
    $dsModel->save();

    return $this->getDatasourceModelByName( $name );
  }




  /**
   * Retrieves and initializes the datasource model object for a
   * datasource with the given name. Caches the result during a
   * request.
   *
   * @param string $name Name of datasource
   * @return qcl_data_datasource_DbModel
   */
  public function getDatasourceModelByName( $name )
  {

    if ( ! $name or !is_string($name) )
    {
      throw new InvalidArgumentException("Invalid datasource name '$name'.");
    }

    /*
     * create model object if it hasn't been created already
     */
    if ( ! isset( $this->datasourceModels[$name] ) )
    {

      /*
       * get datasource model
       */
      $dsModel = $this->getDatasourceModel();

      try
      {
        $dsModel->load( $name );
      }
      catch( qcl_data_model_RecordNotFoundException $e)
      {
        throw new InvalidArgumentException("A datasource '$name' does not exist.");
      }

      /*
       * get schema name and class
       */
      $schemaName = $dsModel->getSchema();
      $schemaClass = $this->schemaClass( $schemaName );

      $this->log( "Datasource '$name' has schema name '$schemaName' and class '$schemaClass'.", QCL_LOG_DATASOURCE );

      /*
       * instantiate, load data and initialize the datasource and the attached models
       */
      qcl_import( $schemaClass );
      $dsModel = new $schemaClass;
      $dsModel->load( $name );

      /*
       * save reference to the object
       */
      $dsModel->manager = $this;
      $this->datasourceModels[$name] = $dsModel;
    }

    /*
     * return cached model object
     */
    return $this->datasourceModels[$name];
  }

  /**
   * Deletes a datasource from the database and from the manager cache.
   * @param $name
   * @param $deleteModels Whether to delete the datasource's models, too
   *   Defaults to true
   * @return unknown_type
   */
  public function deleteDatasource( $name, $deleteModels=true )
  {
    $dsModel = $this->getDatasourceModelByName( $name );
    if ( $deleteModels )
    {
      foreach( $dsModel->modelTypes() as $type )
      {
        $this->log( "Destroying model type '$type' of datasource '$name' ", QCL_LOG_DATASOURCE );
        $dsModel->getModelOfType( $type )->destroy();
      }
    }
    $this->log( "Deleting datasource '$name' ", QCL_LOG_DATASOURCE );
    $dsModel->getQueryBehavior()->deleteWhere( array( NAMED_ID => $name ) );
    unset( $this->datasourceModels[$name] );
  }


  /**
   * Destroys all data connected to the model, such as tables etc.
   * Use with caution, as this may have desastrous effects.
   */
  public function destroyAll()
  {
    /*
     * destroy each datasource in the table
     */
    foreach( $this->datasources() as $name )
    {
      $this->getDatasourceModelByName( $name )->destroy();
    }

    /*
     * destroy the table itself
     */
    $dsModel= $this->getDatasourceModel();
    $this->log( "Destroying the datasource table for " . get_class( $dsModel ), QCL_LOG_DATASOURCE);
    $dsModel->getQueryBehavior()->getTable()->delete();
    qcl_data_model_db_ActiveRecord::resetBehaviors();
  }


  /**
   * Deletes all datasources with their model data.
   * Use with caution, as this may have desastrous effects.
   * @return boolean
   */
  public function emptyAll()
  {
    /*
     * delete each datasource in the table
     */
    foreach( $this->datasources() as $name )
    {
      $this->getDatasourceModelByName( $name )->delete();
    }
    qcl_data_model_db_ActiveRecord::resetBehaviors();
  }

}
?>