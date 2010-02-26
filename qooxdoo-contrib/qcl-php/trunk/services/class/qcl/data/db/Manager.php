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

/*
 * constants for getDefaultDsn method
 */
define ("qcl_data_db_USER_TABLE", true);
define ("qcl_data_db_ADMIN_TABLE", false);
define ("qcl_data_db_USER_ACCESS", false);
define ("qcl_data_db_ADMIN_ACCESS", true);

/**
 * Database manager singleton, providing global access to a database object
 * with a unified API
 */
class qcl_data_db_Manager extends qcl_core_Object
{

  /**
   * Cache of database connections
   * @var array
   */
  private $cache = array();

  /**
   * Returns singleton instance of the class. Must be called
   * statically.
   * @return qcl_data_db_Manager
   */
  static function getInstance()
  {
    return qcl_getInstance(__CLASS__);
  }

  /**
   * Returns the type of the database. Can be called statically.
   * @return string
   */
  public function getDbType()
  {
    return $this->getApplication()->getIniValue("database.type");
  }

  /**
   * Returns the dsn information from the service.ini data.
   * By default, return user-level access to the admin database. Can be called
   * statically.
   * @see qcl_data_db_Manager::connect()
   * @return string
   */
  public function getDefaultDsn( $userdata=false, $adminaccess=false )
  {
    if ( $userdata )
    {
      if ( $adminaccess )
      {
        return $this->getApplication()->getIniValue("database.admin_userdb");
      }
      else
      {
        return $this->getApplication()->getIniValue("database.user_userdb");
      }
    }
    else
    {
      if ( $adminaccess )
      {
        return $this->getApplication()->getIniValue("database.admin_admindb");
      }
      else
      {
        return $this->getApplication()->getIniValue("database.user_admindb");
      }
    }
  }


  /**
   * Creates and caches a database connection object (adapter).
   *
   * @param mixed $first [optional] If string, treat as dsn. If boolean, whether
   * to use the userdata database (true) or the database containing
   * the application data tables (false, default)
   *
   * @param boolean $adminaccess [optional] whether
   * to use a dsn with admin-level access to create tables etc. (true) or
   * just user privileges (false, default). Is ignored if first argument is a string
   *
   * @return qcl_data_db_type_Abstract
   */
  public function createAdapter( $first=false, $adminaccess=false )
  {
    /*
     * if first argument is boolean, get dsn from ini values,
     * otherwise treat as string
     */
    if ( ! $first or is_bool( $first ) )
    {
      $dsn = $this->getDefaultDsn( $first, $adminaccess );
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
      $this->raiseError("No dsn information available.");
    }

    /*
     * pool connection objects
     */
    $cacheId = is_array($dsn) ? implode(",", array_values($dsn) ) : $dsn;
    //$this->debug("Cache id '$cacheId'");

    if ( $this->cache[$cacheId] )
    {
      //$this->debug("Using cached db object for $cacheId");
      $db = $this->cache[$cacheId];
    }

    /*
     * else connect to new database
     */
    else
    {
      /*
       * type and class of database adapter
       */
      $type = $this->getDbType();
      $class = "qcl_data_db_adapter_" . strtoupper($type[0]) . substr( $type, 1 );

      /*
       * include class file
       */
      require_once ( str_replace("_","/",$class) . ".php" );

      /*
       * adapter
       */
      $db = new $class( $dsn );
      //$this->debug("Created new $class adapter... for '$dsn'.");

      /*
       * check for errors
       */
      if ( $db->error )
      {
        $this->raiseError( $db->error );
      }

      /*
       * save adapter
       */
      $this->cache[$cacheId] = $db;
    }

    return $db;
  }
}
?>