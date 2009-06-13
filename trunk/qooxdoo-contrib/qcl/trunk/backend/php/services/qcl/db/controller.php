<?php
/*
 * dependencies
 */
require_once "qcl/mvc/controller.php";
require_once "qcl/access/common.php";
require_once "qcl/db/Manager.php";

/**
 * Controller for models that use a database backend
 * providing central access by all connected models to
 * a shared database connection
 * @deprecated This will be removed eventually. Use qcl_db_Manager instead
 */
class qcl_db_controller extends qcl_mvc_controller
{

  /**
   * The database connection pooled by all directly connected models
   * @var qcl_db_type_Mysql
   * @access private
   * FIXME tables persistentObjects and sessions must be predefined!
   */
  var $_connection = null;

  /**
   * constructor
   */
  function __construct( $server )
  {

    /*
     * call parent constructor first
     */
    parent::__construct( &$server );

    /*
     * establish database connection
     */
    $this->connect();

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
    return qcl_db_Manager::getDefaultDsn( $userdata, $adminaccess );
  }

  /**
   * gets a reference to the database connection object
   */
  function &getConnection()
  {
    return $this->_connection;
  }

  /**
   * @see qcl_db_Manager::getDefaultDbObject()
   */
  function connect( $first=false, $adminaccess=false )
  {
    $this->_connection =& qcl_db_Manager::createAdapter( $first, $adminaccess );
  }
}
?>