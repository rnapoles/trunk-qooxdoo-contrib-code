<?php
/*
 * dependencies
 */
require_once "qcl/jsonrpc/controller.php";
require_once "qcl/access/common.php";

/**
 * controller for models that use a database backend
 * providing central access by all connected models to
 * a shared database connection
 */
class qcl_db_controller extends qcl_jsonrpc_controller
{

  /**
   * the database connection pooled by all directly connected models
   * @var qcl_db_type_Mysql
   * @access private
   */
  var $_connection = null;
  
  /**
   * constructor 
   */
  function __construct()
  {    
    
    /*
     * call parent constructor first
     */
    parent::__construct();

    /*
     * establish database connection
     */
    $this->connect();
    
    
   
    /*
     * hack!!
     * FIXME qcl_persistence_db_Model must be SimpleModel!
     * FIXME move to setup class!
     */
    $db =& $this->getConnection();
    if ( ! $db->tableExists("persistentObjects") )
    {
      /*
       * create table manually
       * @todo unhardcode sql definition, i.e. 
       *  $table = $db->createTable("foo"); 
       *  $table->createColumn( "user", qcl_db_type_Varchar100, qcl_db_NOT_NULL, qcl_db_NOT_NULL );
       *  $table->createColumn( "created", qcl_db_type_Timestamp, qcl_db_NOT_NULL, QCL_DB_TIMESTAMP_ZERO);
       *  $table->createColumn( "modified", qcl_db_type_Timestamp, qcl_db_NOT_NULL, QCL_DB_CURRENT_TIMESTAMP);
       */
      $this->debug("Set up persistent object table manually");
      $this->dbAdminAccess();
      $db =& $this->db();
      $database =  $controller->getIniValue("database.admindb");          
      $db->createTable("`$database`.persistentObjects");
      $db->addColumn("`$database`.persistentObjects","class"," varchar(100) collate utf8_unicode_ci NOT NULL");
      $db->addColumn("`$database`.persistentObjects","data","longblob");
      $db->addColumn("`$database`.persistentObjects","objectId","varchar(100) collate utf8_unicode_ci default NULL");
      $db->addColumn("`$database`.persistentObjects","userId","int(11) default NULL");
      $db->addColumn("`$database`.persistentObjects","sessionId","varchar(32) collate utf8_unicode_ci default NULL");
      $db->addColumn("`$database`.persistentObjects","instanceId","varchar(100) collate utf8_unicode_ci default NULL");
      $db->addColumn("`$database`.persistentObjects","created","timestamp NOT NULL default '0000-00-00 00:00:00'");
      $db->addColumn("`$database`.persistentObjects","modified","timestamp NOT NULL default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP");
    }        
    
  }     
  
  /**
   * Returns the dsn information from the service.ini data.
   * By default, return user-level access to the admin database.
   * @param boolean $userdata [optional,] whether 
   * to use the userdata database (true) or the database containing 
   * the application data tables (false, default)
   * @param boolean $adminaccess [optional] whether
   * to use a dsn with admin-level access to create tables etc. (true) or
   * just user privileges (false, default)
   */
  function getDsn( $userdata=false, $adminaccess=false )
  {
    if ( $userdata )
    {
      if ( $adminaccess )
      {
        return $this->getIniValue("database.admin_userdb");
      }
      else
      {
        return $this->getIniValue("database.user_userdb");  
      }
    }
    else
    {
      if ( $adminaccess )
      {
        return $this->getIniValue("database.admin_admindb");
      }
      else
      {
        return $this->getIniValue("database.user_admindb");
      }
    }
  }
  
  /**
   * gets a reference to the database connection object 
   */
  function &getConnection()
  {
    if ( ! $this->_connection )
    {
      $this->connect(); 
    }
    return $this->_connection;
  }  
  
  /**
   * Connects to a database. This is the default database connection when
   * no model with its own connection is used.
   * 
   * @param mixed $first [optional] If string, treat as dsn. If boolean, whether 
   * to use the userdata database (true) or the database containing 
   * the application data tables (false, default)
   * @param boolean $adminaccess [optional] whether
   * to use a dsn with admin-level access to create tables etc. (true) or
   * just user privileges (false, default). Is ignored if first argument is a string
   * @return void
   * @todo align API with qcl_datasource_db_Model
   */
  function connect( $first=false, $adminaccess=false ) 
  {
    /*
     * if first argument is boolean, get dsn from ini values,
     * otherwise treat as string
     */
    if ( is_bool($first) )
    {
      $dsn = $this->getDsn( $first, $adminaccess );
    }
    else
    {
      $dsn = $first;
    }
    
    if ( ! $dsn or ! is_string($dsn) )
    {
      $this->raiseError("No dsn information available.");
    }
    
    require_once "qcl/db/type/Mysql.php"; 
    
    //$this->debug( "Connecting to " );
    //$this->debug( $dsn );
    
    /*
     * connect to new database 
     * @todo unhardcode type mysql
     */
    $db =& new qcl_db_type_Mysql( $dsn, &$this );
    
    /*
     * check for error
     */
    if ( $db->error )
    {
      $this->raiseError( $db->error );
    }
    
    /*
     * save connection class
     */
    $this->_connection =& $db;
  }

  
}
?>