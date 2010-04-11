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
   * The model properties
   */
  private $properties = array(
    'schema' => array(
      'check'   => "string",
      'sqltype' => "varchar(50)"
    ),
    'name' => array(
      'check'   => "string",
      'sqltype' => "varchar(50)"
    ),
    'description' => array(
      'check'   => "string",
      'sqltype' => "varchar(255)"
    ),
    'prefix' => array(
      'check'   => "string",
      'sqltype' => "varchar(20)"
    ),
    'type' => array(
      'check'   => "string",
      'sqltype' => "varchar(20)"
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
      'sqltype' => "varchar(20)"
    ),
    'resourcepath' => array(
      'check'   => "string",
      'sqltype' => "varchar(255)"
    ),
    'active' => array(
      'check'   => "boolean",
      'sqltype' => "tinyint(1)"
    ),
    'readonly' => array(
      'check'   => "boolean",
      'sqltype' => "tinyint(1)"
    ),
    'hidden' => array(
      'check'   => "boolean",
      'sqltype' => "tinyint(1)"
    )
  );

  //-------------------------------------------------------------
  // Class properties
  //-------------------------------------------------------------

  /**
   * Models that are attached to this datasource
   * @var array
   */
  var $modelMap = array();


  //-------------------------------------------------------------
  // Initialization
  //-------------------------------------------------------------

  /**
   * Returns singleton instance of this class.
   * @return qcl_data_datasource_DbModel
   */
  public static function getInstance()
  {
    return qcl_getInstance(__CLASS__);
  }

  /**
   * Initializes all models that belong to this datasource.
   *
   */
  public function init()
  {
    parent::init();
    foreach( $this->modelTypes() as $type )
    {
      $this->getModelOfType($type)->init();
    }
  }

  //-------------------------------------------------------------
  // API methods
  //-------------------------------------------------------------

  /**
   * Registers the models that are part of the datasource
   * @param array $modelMap Associative array that maps the
   * type of model to the model instance
   * @return void
   */
  public function registerModels( $modelMap )
  {
    if ( ! is_map( $modelMap ) )
    {
      $this->raiseError( "Invalid argument" );
    }
    foreach( $modelMap as $type => $model )
    {
      if ( ! $model instanceof qcl_data_model_AbstractActiveRecord
        and ! $model instanceof qcl_data_model_IActiveRecord )
      {
        throw new InvalidArgumentException("Invalid model class");
      }

      /*
       * store reference
       */
      $this->modelMap[$type] = $model;
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
    if ( ! isset( $this->modelMap[$type] ) )
    {
      throw new InvalidArgumentException("Model of type '$type' does not exist");
    }
    return $this->modelMap[$type];
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
      'port'     => $matches[3],
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
    return qcl_data_db_Manager::getInstance()->createAdapter( $this->dsn() );
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

  /**
   * Returns an array of the type of models that this datasource provides.
   * Defaults to an empty array.
   * @return array
   */
  public function providesModelTypes()
  {
    return array();
  }
}

?>