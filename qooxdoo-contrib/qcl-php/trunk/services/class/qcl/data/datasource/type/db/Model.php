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
require_once "qcl/data/model/xmlSchema/DbModel.php";

/**
 * Class modeling datasource information that is stored in a
 * typical sql database. Note that this is not the datasource itself,
 * which can be of any type, but only the information ON the datasource
 * plus some methods to operate with this information. This is the normal
 * case, all other datasource models inherit from this. If you want to
 * use a different storage for your datasource information, you must write
 * custom child classes for the other datasource models.
 *
 * @todo rename to qcl_data_datasource_storage_Db
 */
class qcl_data_datasource_type_db_Model
  extends qcl_data_model_xmlSchema_DbModel
{

  /**
   * The name of the schema
   */
  var $schemaName = "qcl_db";

  /**
   * Datasource name
   * @var string
   */
  var $datasource;

  /**
   * Models that are attached to this datasource
   * @var array
   */
  var $models = array();

  /**
   * The current dsn as an array
   * @var array
   */
  var $dsn = null;

  /**
   * The path to the model schema xml file
   * @var string
   */
  var $schemaXmlPath = "qcl/data/datasource/type/db/Model.xml";

  /**
   * the database connection object of the currently loaded record
   * @var qcl_data_db_type_Mysql
   */
  var $datasourceConnectionObj;

  /**
   * Whether the global table prefix from the service.ini.php file
   * should be used or not.
   * @var boolean
   */
  var $useGlobalTablePrefix = true;

  /**
   * Returns singleton instance of this class.
   * @return qcl_data_datasource_type_db_Model
   */
  function getInstance()
  {
    return qcl_getInstance(__CLASS__);
  }

  /**
   * Returns the name of the datasource schema
   */
  function schemaName()
  {
    return $this->schemaName;
  }

  /**
   * Initializes all models that belong to this datasource. Empty stub to be
   * overridden.
   *
   * @abstract
   * @param string $datasource Name of the datasource
   */
  function initializeModels( $datasource ){}

  function getDatasourceName()
  {
    return $this->datasource;
  }


  /**
   * Returns the url of the datasource, if any
   * @return string
   */
  function getUrl()
  {
    $url = $this->getType() . "://" . $this->getHost();
    if ( $port = $this->getPort() )
    {
      $url .= ":$port";
    }
    return $url;
  }

  /**
   * gets dsn information as array from the currently loaded datasource record
   * @return array
   */
  function getDatasourceDsn()
  {
    if ( ! $this->dsn )
    {
      $this->dsn = array(
         'phptype'  => either($this->getType(),'mysql'),
         'dbsyntax' => false,
         'username' => $this->getUsername(),
         'password' => $this->getPassword(),
         'protocol' => "tcp",
         'hostspec' => $this->getHost(),
         'port'     => either( $this->getPort(), false),
         'socket'   => false,
         'database' => $this->getDatabase(),
      );
    }
    return $this->dsn;
  }

  /**
   * Returns the database connection object of the currently
   * loaded datasource record
   * @todo unhardcode type mysql
   * @return qcl_data_db_type_Mysql
   */
  function getDatasourceConnection()
  {
    if ( ! $this->datasourceConnectionObj )
    {
      //$this->debug("Connecting current datasource ...");

      $dsn = $this->getDatasourceDsn();

      //$this->debug("Datasource model connecting to ");
      //$this->debug($dsn);

      $db = qcl_data_db_Manager::createAdapter( $dsn );

      $this->datasourceConnectionObj = $db;
    }
    return $this->datasourceConnectionObj;
  }

  /**
   * Returns the prefix for tables used by the models connected to this database.
   * Defaults to the datasource name plus underscore if there is a datasource.
   * If the $useGlobalTablePrefix property is true, add a global prefix set in
   * service.ini.php.
   *
   * @return string
   */
  function getTablePrefix()
  {
    if ( $this->foundSomething() )
    {
      $prefix = either( $this->getPrefix(), $this->getNamedId() ) . "_";
      if ( $this->getUseGlobalTablePrefix() )
      {
        $prefix = parent::getTablePrefix() . $prefix;
      }
    }
    else
    {
      $prefix = parent::getTablePrefix();
    }
    return $prefix;
  }

  function getUseGlobalTablePrefix()
  {
    return $this->useGlobalTablePrefix;
  }

  function isActive()
  {
    return (bool) $this->getProperty("active");
  }

  function isHidden()
  {
    return (bool) $this->getProperty("hidden");
  }

  /**
   * checks if datasource is read-only
   * @return bool result
   */
  function isReadOnly ()
  {
    return (boolean) $this->getReadonly();
  }

  /**
   * Returns a list of fields that should be disabled in a form
   * @return array
   */
  function unusedFields()
  {
    return array("resourcepath");
  }

  /**
   * Checks a datasource name to be created
   */
  function _checkCreate( $datasource )
  {

    if ( ! $datasource )
    {
      $this->setError ("No datasource name given.");
      return false;
    }

    /*
     * check if datasource name exists
     */
    $this->findByNamedId( $datasource );
    if ( $this->foundSomething() )
    {
       $this->setError( $this->tr( "A datasource with this name already exists." ) );
       return false;
    }
    return true;
  }


  /**
   * Creates a new native sql datasource
   * @todo implement external dsn
   * @param string $datasource datasource name
   * @param array  $options    connection data etc.
   * @return void
   */
  function create ( $datasource, $options = array()  )
  {
     /*
     * check datasource name
     */
    if ( ! $this->_checkCreate($datasource) ) return false;

    /*
     * get database connection information
     */
    if ( $options['dsn'] )
    {
      $db = new qcl_data_db_type_Mysql( $options['dsn'], $this );
      //$this->info("Using custom dsn:" . print_r($options,true) );
    }
    else
    {
      $db = $this->db;
    }

    /*
     * create entry
     */
    $this->insert(array(
      "namedId"      => $datasource,
      "active"       => isset($options['active']) ? $options['active'] : 1,
      "readonly"     => isset($options['readonly']) ? $options['readonly'] : 0,
      "native"       => isset($options['native']) ? $options['native'] : 1,
      "name"         => either($options['name'], $datasource),
      "schema"       => either($options['schema'], $this->schemaName() ),
      "type"         => either($options['type'], "mysql"),
      "host"         => either($options['host'], $db->getHost() ),
      "port"         => either($options['port'], $db->getPort() ),
      "database"     => either($options['database'], $db->getDatabase() ),
      "username"     => either($options['username'], $db->getUser() ),
      "password"     => either($options['password'], $db->getPassword() ),
      "encoding"     => either($options['encoding'],"utf8"),
      "description"  => (string) $options['description'],
      "owner"        => either($options['owner'],""),
      "hidden"       => isset($options['hidden']) ? $options['hidden'] : 0,
    ));

   return true;
  }

  /**
   * If the datasource is a file storage. Defaults to false in normal
   * datasources
   * @return bool
   */
  function isFileStorage()
  {
    return false;
  }

  /**
   * Returns an array of the type of models that this datasource provides.
   * Defaults to an empty array.
   * @return array
   */
  function providesModelTypes()
  {
    return array();
  }
}

?>