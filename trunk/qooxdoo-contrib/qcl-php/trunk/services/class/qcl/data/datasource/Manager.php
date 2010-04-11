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
   */
  public function registerSchema( $schemaName, $options )
  {
    if ( ! isset( $options['class'] ) or ! $options['class'] )
    {
      throw new InvalidArgumentException("Missing 'class' argument");
    }
    $class = $options['class'];

    // FIXME FIXME
    if ( ! is_string( $class) ) //or ! $class instanceof qcl_data_datasource_DbModel )
    {
      throw new InvalidArgumentException("Invalid class '$class'. Must implement qcl_data_datasource_IModel ");
    }

    $this->log("Registering class '$class' for schema '$schemaName'", QCL_LOG_DATASOURCE);

    return $this->getRegistryModel()->createIfNotExists( $schemaName, $options );
  }

  /**
   * Unregister datasource.
   * @param string $name Name of datasource schema
   */
  public function unregisterSchema( $schemaName )
  {
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
      $registry->load( $namedId );
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
  protected function getDatasourceModel()
  {
    return qcl_data_datasource_DbModel::getInstance();
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
      $dsModel = new $schemaClass;
      $dsModel->load( $name );
      $dsModel->init();

      /*
       * save reference to the object
       */
      $this->datasourceModels[$name] = $dsModel;
    }

    /*
     * return cached model object
     */
    return $this->datasourceModels[$name];
  }
}
?>