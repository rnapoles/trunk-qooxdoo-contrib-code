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

qcl_import( "qcl_data_model_db_NamedActiveRecord" );

/**
 * Class modeling datasource information that is stored in a
 * typical sql database. Note that this is not the datasource itself,
 * which can be of any type, but only the information ON the datasource
 * plus some methods to operate with this information. This is the normal
 * case, all other datasource models inherit from this. If you want to
 * use a different storage for your datasource information, you must write
 * custom child classes for the other datasource models.
 *
 * @todo create interface!
 */
class qcl_data_datasource_DbModel
  extends qcl_data_model_db_NamedActiveRecord
{

  //-------------------------------------------------------------
  // Model properties
  //-------------------------------------------------------------

  /**
   * The name of the schema, needed for self-
   * registering
   * @var string
   */
  protected $schemaName = null;

  /**
   * The description of the schema, needed for self-
   * registering
   * @var unknown_type
   */
  protected $description = null;

  /**
   * Table name
   * @var string
   */
  protected $tableName = "data_Datasource";

  /**
   * The foreign key of this model
   */
  protected $foreignKey = "DatasourceId";

  /**
   * The model properties
   */
  private $properties = array(
    'title' => array(
      'check'   => "string",
      'sqltype' => "varchar(100)"
    ),
    'description' => array(
      'check'   => "string",
      'sqltype' => "varchar(255)"
    ),
    'schema' => array(
      'check'   => "string",
      'sqltype' => "varchar(20) NOT NULL"
    ),
    'type' => array(
      'check'   => "string",
      'sqltype' => "varchar(20) NOT NULL"
    ),
    'host' => array(
      'check'   => "string",
      'sqltype' => "varchar(50)"
    ),
    'port' => array(
      'check'   => "integer",
      'sqltype' => "int(11)"
    ),
    'database' => array(
      'check'   => "string",
      'sqltype' => "varchar(50)"
    ),
    'username' => array(
      'check'   => "string",
      'sqltype' => "varchar(50)"
    ),
    'password' => array(
      'check'   => "string",
      'sqltype' => "varchar(50)"
    ),
    'encoding' => array(
      'check'   => "string",
      'sqltype' => "varchar(20)",
      'nullable'  => false,
      'init'      => "utf-8"
    ),
    'prefix' => array(
      'check'   => "string",
      'sqltype' => "varchar(20)"
    ),
    'resourcepath' => array(
      'check'   => "string",
      'sqltype' => "varchar(255)"
    ),
    'active' => array(
      'check'     => "boolean",
      'sqltype'   => "tinyint(1)",
      'nullable'  => false,
      'init'      => true
    ),
    'readonly' => array(
      'check'     => "boolean",
      'sqltype'   => "tinyint(1)",
      'nullable'  => false,
      'init'      => false
    ),
    'hidden' => array(
      'check'   => "boolean",
      'sqltype' => "tinyint(1)",
      'nullable'  => false,
      'init'      => false
    )
  );

  /**
   * Model relations
   */
  private $relations = array(
    'Datasource_User' => array(
      'type'        => QCL_RELATIONS_HAS_AND_BELONGS_TO_MANY,
      'target'      => array( 'class' => "qcl_access_model_User" )
    ),
    'Datasource_Role' => array(
      'type'        => QCL_RELATIONS_HAS_AND_BELONGS_TO_MANY,
      'target'      => array( 'class' => "qcl_access_model_Role" )
    )
  );


  /**
   * dialog.Form - compatible form data for the editable properties
   * of this model.
   *
   * @var array
   */
  protected $formData = array(
    'title'       => array(
      'label'       => "Datasource name"
    ),
    'description' => array(
      'name'        => "description",
      'type'        => "TextArea",
      'lines'       => 3,
      'label'       => "Description"
    ),
    'schema'      => array(
      'name'        => "schema",
      'label'       => "Datasource schema",
      'validation'  => array(
        'required'    => true
      )
    ),
    'type'        => array(
      'label'       => "Datasource type"
    ),
    'host'        => array(
      'label'       => "Server host",
      'placeholder' => "The database server host, usually 'localhost'"
    ),
    'port'        => array(
      'label'       => "Server port",
      'marshaler'   => array(
        'marshal'    => array( 'function' => "qcl_toString" ),
        'unmarshal'  => array( 'function' => "qcl_toInteger" )
      ),
      'placeholder' => "The database server port, usually 3306 for MySql"
    ),
    'database'    => array(
      'label'       => "Database name",
      'placeholder' => "The name of the database",
      'validation'  => array(
        'required'    => true
      )
    ),
    'username'    => array(
      'label'       => "Database user name"
    ),
    'password'    => array(
      'label'       => "Database user password"
    ),
    'encoding'    => array(
      'label'       => "Database encoding",
      'default'     => 'utf-8'
    ),
    'prefix'      => array(
      'label'       => "Datasource prefix"
    ),
    'ressourcepath' => array(
      'label'       => "Ressource path"
    ),
    'active'        => array(
      'type'    => "SelectBox",
      'label'   => "Status",
      'options' => array(
        array( 'label' => "Disabled", 'value' => false ),
        array( 'label' => "Active",   'value' => true )
      )
    )
  );

  //-------------------------------------------------------------
  // Class properties
  //-------------------------------------------------------------


  /**
   * Models that are attached to this datasource
   * @var array
   */
  private $modelMap = array();

  /**
   * Cache for model instances
   * @var array
   */
  private $modelCache = array();

  //-------------------------------------------------------------
  // Initialization
  //-------------------------------------------------------------

  /**
   * Constructor, adds properties
   */
  public function __construct()
  {
    parent::__construct();
    $this->addProperties( $this->properties );
    $this->addRelations( $this->relations, __CLASS__ );
  }

  /**
   * Returns singleton instance of this class.
   * @return qcl_data_datasource_DbModel
   */
  public static function getInstance()
  {
    return qcl_getInstance(__CLASS__);
  }

  /**
   * Self-registers the datasource model with the manager
   * @return void
   */
  public function registerSchema()
  {
    if ( ! $this->schemaName  )
    {
      throw new LogicException("You must define the 'schemaName' property to be able to self-register the datasource.");
    }
    $dsManager = qcl_data_datasource_Manager::getInstance();
    $dsManager->registerSchema( $this->schemaName, array(
      'class'       => $this->className(),
      'description' => $this->description
    ) );
  }

  //-------------------------------------------------------------
  // API methods
  //-------------------------------------------------------------

  /**
   * Getter for manager
   * @return qcl_data_datasource_Manager
   */
  public function getManager()
  {
    qcl_import( "qcl_data_datasource_Manager" );
    return qcl_data_datasource_Manager::getInstance();
  }

  /**
   * Registers the models that are part of the datasource
   * @param array $modelMap Associative array that maps the
   * type of model to the model classes
   * @return void
   */
  public function registerModels( $modelMap )
  {
    if ( ! is_map( $modelMap ) )
    {
      $this->raiseError( "Invalid argument" );
    }

    /*
     * iterate through the map an register each model
     */
    foreach( $modelMap as $type => $data )
    {
      $class = $data['class'];
      qcl_import( $class );
      if ( ! class_exists( $class )  ) // FIXME check interface
      {
        throw new InvalidArgumentException("Invalid model class '$class'");
      }

      /*
       * store reference
       */
      $this->modelMap[$type] = $data;

      $this->log( sprintf(
        "Datasource '%s': registered model of type '%s' with class '%s'",
        $this, $type, $class
      ), QCL_LOG_DATASOURCE );
    }
  }

  /**
   * Returns the types all the models registered
   * @return array
   */
  public function modelTypes()
  {
    return array_keys( $this->modelMap );
  }

  /**
   * Return the model instance for the given type
   * @param string $type
   * @return qcl_data_model_AbstractActiveRecord
   */
  public function getModelOfType( $type )
  {
    $this->checkLoaded();

    if ( ! isset( $this->modelMap[$type] ) )
    {
      throw new InvalidArgumentException("Model of type '$type' is not registered");
    }

    /*
     * get, initialize and return the model
     */
    $class = $this->modelMap[$type]['class'];
    $namedId = $this->namedId();

    if ( ! isset( $this->modelCache[$class] ) )
    {
      $model = new $class( $this );
      //$model->init();
      $this->modelCache[$class] = $model;
    }

    return $this->modelCache[$class];
  }

  /**
   * Return the model that corresponds to the given class
   * @param string $class
   * @return qcl_data_model_db_AbstractActiveRecord
   */
  public function getModelByClass( $class )
  {
    foreach( $this->modelMap as $type => $data )
    {
      if ( $data['class'] == $class )
      {
        return $this->getModelOfType( $type );
      }
    }
    throw new InvalidArgumentException("Datasource $this does not have a model of class '$class'.");
  }

  /**
   * Returns the url of the datasource, if any
   * @return string
   */
  public function getUrl()
  {
    $this->id(); // makes sure a record is loaded

    $url = $this->getType() . "://" . $this->getHost();
    if ( $port = $this->getPort() )
    {
      $url .= ":$port";
    }
    return $url;
  }

  /**
   * Returns a PDO-compatible DSN string from the currently loaded record
   * @return string
   */
  public function getDsn()
  {
    $this->id(); // makes sure a record is loaded
    return sprintf(
      "%s:host=%s;port=%s;dbname=%s",
      $this->getType(), $this->getHost(), $this->getPort(), $this->getDatabase()
    );
  }

  /**
   * Populates the model properties from a PDO-compatible DSN string
   * @param $dsn
   * @return qcl_data_datasource_DbModel returns itself
   */
  public function setDsn( $dsn )
  {
    preg_match( "/(.+):host=(.+);port=(.+);dbname=(.+)/",$dsn,$matches);
    $this->set( array(
      'type'     => $matches[1],
      'host'     => $matches[2],
      'port'     => (int) $matches[3],
      'database' => $matches[4],
    ) );
    return $this;
  }

  /**
   * Returns the database connection object of the currently
   * loaded datasource record
   * @return qcl_data_db_IAdapter
   */
  public function createAdapter()
  {
    return qcl_data_db_Manager::getInstance()->createAdapter( $this->getDsn() );
  }

  /**
   * Returns the prefix for tables used by the models connected to this database.
   * Defaults to the datasource name plus underscore if no prefix has been specified
   * in the record data.
   *
   * @return string
   */
  public function getTablePrefix()
  {
    $this->id(); /// make sure a record is loaded
    return
      $this->getQueryBehavior()->getTablePrefix() .
      either( /*$this->getPrefix(),*/ $this->namedId() ) . "_"; // FIXME
  }

  /**
   * Returns a list of fields that should be disabled in a form
   * @return array
   */
  public function unusedFields()
  {
    return array("resourcepath");
  }

  /**
   * If the datasource is a file storage. Defaults to false in normal
   * datasources
   * @return bool
   */
  public function isFileStorage()
  {
    return false;
  }


  //-------------------------------------------------------------
  // Overwritten methods
  //-------------------------------------------------------------

  /**
   * Disabled
   */
  public function destroy()
  {
    $this->init();
    $this->log( "Destroying all models of datasource $this", QCL_LOG_DATASOURCE);
    foreach( $this->modelTypes() as $type )
    {
      $this->getModelOfType( $type )->destroy();
    }
    $this->log( "Deleting datasource $this", QCL_LOG_DATASOURCE);
    $this->getQueryBehavior()->deleteWhere( array( "id" => $this->id() ) );
  }


  /**
   * Disabled
   */
  public function deleteAll()
  {
    throw new LogicException( "Not allowed.");
  }

  /**
   * Deletes the datasource model instance data and the data of all
   * the connected models from the database.
   *
   * @return boolean
   */
  public function delete()
  {
    $this->init();
    foreach( $this->modelTypes() as $type )
    {
      $this->log( "Destroying model '$type' of datasource $this", QCL_LOG_DATASOURCE);
      $this->getModelOfType( $type )->destroy();
    }
    $this->getManager()->deleteDatasource( $this->namedId(), false );
  }
}
?>