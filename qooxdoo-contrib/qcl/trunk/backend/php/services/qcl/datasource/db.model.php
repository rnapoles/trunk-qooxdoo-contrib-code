<?php

/*
 * dependencies
 */
require_once "qcl/db/model.php";

/**
 * Class modeling a datasource 
 */
class qcl_datasource_db_model extends qcl_db_model
{
  /**
   * datasource name
   * @var string
   */
  var $datasource;
  
  /**
   * models that are attached to this datasource
   * @var array
   */
  var $models = array();
  
  /**
   * the current dsn as an array
   * @var array
   */
  var $dsn = null;

  /**
   * the path to the model schema xml file
   * @var string
   */
  var $schemaXmlPath = "qcl/datasource/db.model.xml";

  /**
   * the database connection object of the currently loaded record
   * @var qcl_db_mysql
   */
  var $datasourceConnectionObj;
    
  /**
   * initializes all models that belong to this datasource
   * @abstract
   * @param string $datasource Name of the datasource
   */
  function initializeModels( $datasource )
  {
    $this->raiseError("Abstract method initializeModel not yet implemented in class qcl_datasource_db_model. You need to subclass this class in order to use it.");
    
    /* Example:
    $controller =& $this->getController();
    $this->recordModel     =& new bibliograph_models_record_default( &$controller, &$this );
    $this->folderModel     =& new bibliograph_models_record_default( &$controller, &$this );
    $this->attachmentModel =& new bibliograph_models_attachment_default( &$controller, &$this );
    $this->noteModel       =& new bibliograph_models_note_default( &$controller, &$this );
     */
  }
  
  function getDatasourceName()
  {
    return $this->datasource;
  }
  
  /**
   * Gets a stored model by name
   * @param string $name
   * @return qcl_datasource_db_model   
   */
  function &getModel ( $name )
  {
    return $this->models[$name];
  }
  
  /** 
   * Stores a model object by name
   * @param string $name
   * @param qcl_datasource_db_model
   * @return void
   */
  function setModel ( $name, $model )
  {
    $this->models[$name] =& $model;
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
   * @return qcl_db_mysql
   */
  function &getDatasourceConnection()
  {
    if ( ! $this->datasourceConnectionObj )
    {
      $this->log("Connecting current datasource ...");
      
      require_once("qcl/db/mysql.php"); 
      
      $dsn = $this->getDatasourceDsn();
      $this->log("Connecting to ");
      $this->log($dsn);
      
      /*
       * connect to new database 
       */
      $db =& new qcl_db_mysql($dsn, &$this);
      
      if ( $db->error )
      {
        $this->raiseError( $db->error );
      }
      $this->datasourceConnectionObj =& $db;
    }
    return $this->datasourceConnectionObj;
  }
 
  /*
   * get table prefix for datasource tables.
   * this get the value of the column "prefix" or, if empty, the named id of the
   * datasource.
   */
  function getTablePrefix()
  {
    if ( is_array($this->currentRecord) )
    {
      $prefix = either( $this->getPrefix(), $this->getNamedId() );
      return $prefix . "_";
    }
    return "";
  }
  
  /**
   * checks if datasource is read-only
   */
  function isReadOnly ()
  {
    return (boolean) $this->getReadonly();
  }   
  
  /**
   * creates a new native datasource
   * @todo: implement external dsn
   * @return void
   * @param string $datasource datasource name
   * @param array  $options    connection data etc.
   */
  function create ($datasource, $options = array()  )
  {
    if ( $options['dsn'] )
    {
      $db = new qcl_db_mysql(&$this,$options['dsn']);
    }
    else
    {
      $db = $this->db;
    }
    
    // create entry
    $this->insert(array(
      "namedId"      => $datasource,
      "active"       => isset($options['active']) ? $options['active'] : 1,
      "readonly"     => isset($options['readonly']) ? $options['readonly'] : 0,
      "native"       => isset($options['native']) ? $options['native'] : 1,
      "name"         => either($options['name'],$datasource),
      "schema"       => either($options['schema'],"default"),
      "type"         => either($options['type'],"mysql"),
      "host"         => either($options['host'],$db->getHost()),
      "port"         => either($options['port'],$db->getPort()),
      "database"     => either($options['database'],$db->getDatabase()),
      "username"     => either($options['user'],$db->getUser()),
      "password"     => either($options['password'],$db->getPassword()),
      "encoding"     => either($options['encoding'],"utf8"),
      "description"  => (string) $options['description'],
      "owner"        => either($options['owner'],""),
      "hidden"       => isset($options['hidden']) ? $options['hidden'] : 0,  
    ));

   return true;
  }
}

?>