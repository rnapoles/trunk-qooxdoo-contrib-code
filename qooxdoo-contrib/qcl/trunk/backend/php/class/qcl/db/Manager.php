<?php

require_once "qcl/core/StaticClass.php";

/*
 * constants for getDefaultDsn method
 */
define ("QCL_DB_USER_TABLE", true);
define ("QCL_DB_ADMIN_TABLE", false);
define ("QCL_DB_USER_ACCESS", false);
define ("QCL_DB_ADMIN_ACCESS", true);

/**
 * Database manager singleton, providing global access to a database object
 * with a unified API
 */
class qcl_db_Manager extends qcl_core_StaticClass
{
  /**
   * Returns singleton instance of the class. Must be called
   * statically.
   * @return qcl_db_Manager
   */
  function &getInstance()
  {
    return parent::getInstance(__CLASS__);
  }

  /**
   * Returns the type of the database. Can be called statically.
   * @return string
   */
  function getDbType()
  {
    return qcl_application_Application::getIniValue("database.type");
  }

  /**
   * Returns the dsn information from the service.ini data.
   * By default, return user-level access to the admin database. Can be called
   * statically.
   * @see qcl_db_Manager::connect()
   * @return string
   */
  function getDefaultDsn( $userdata=false, $adminaccess=false )
  {
    if ( $userdata )
    {
      if ( $adminaccess )
      {
        return qcl_application_Application::getIniValue("database.admin_userdb");
      }
      else
      {
        return qcl_application_Application::getIniValue("database.user_userdb");
      }
    }
    else
    {
      if ( $adminaccess )
      {
        return qcl_application_Application::getIniValue("database.admin_admindb");
      }
      else
      {
        return qcl_application_Application::getIniValue("database.user_admindb");
      }
    }
  }


  /**
   * Creates and caches a database connection object (adapter). Can
   * be called statically.
   *
   * @param mixed $first [optional] If string, treat as dsn. If boolean, whether
   * to use the userdata database (true) or the database containing
   * the application data tables (false, default)
   *
   * @param boolean $adminaccess [optional] whether
   * to use a dsn with admin-level access to create tables etc. (true) or
   * just user privileges (false, default). Is ignored if first argument is a string
   *
   * @return qcl_db_type_Abstract
   */
  function &createAdapter( $first=false, $adminaccess=false )
  {
    /*
     * if first argument is boolean, get dsn from ini values,
     * otherwise treat as string
     */
    if ( ! $first or is_bool( $first ) )
    {
      $dsn = qcl_db_Manager::getDefaultDsn( $first, $adminaccess );
    }
    elseif ( is_string( $first ) or is_array( $first ) )
    {
      $dsn = $first;
    }
    else
    {
      $this->raiseError("Invalid parameters.");
    }

    if ( ! $dsn )
    {
      qcl_db_Manager::raiseError("No dsn information available.");
    }

    /*
     * pool connection objects
     */
    $cacheId = is_array($dsn) ? implode(",", array_values($dsn) ) : $dsn;
    //$this->debug("Cache id '$cacheId'");

    global $__dbcache;

    if ( $__dbcache[$cacheId] )
    {
      //$this->debug("Using cached db object for $cacheId");
      $db =& $__dbcache[$cacheId];
    }

    /*
     * else connect to new database
     */
    else
    {
      /*
       * type and class of database adapter
       */
      $type = qcl_db_Manager::getDbType();
      $class = "qcl_db_adapter_" . strtoupper($type[0]) . substr( $type, 1 );

      /*
       * include class file
       */
      require_once ( str_replace("_","/",$class) . ".php" );

      /*
       * create and save adapter
       */
      $db =& new $class( $dsn );
      //$this->debug("Created new $class adapter... for '$dsn'.");
      if ( $db->error )
      {
        qcl_db_Manager::raiseError( $db->error );
      }
      $__dbcache[$cacheId] =& $db;
    }

    return $db;
  }
}
?>