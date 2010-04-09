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

/**
 * Database manager singleton, providing global access to a database object
 * with a unified API
 */
class qcl_data_db_Manager
  extends qcl_core_Object
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
   * Returns the type of the database, based on the dsn string
   * @return string
   */
  public function getDbType( $dsn )
  {
    return substr( $dsn, 0, strpos( $dsn, ":" ) );
  }

  /**
   * Creates and caches a database connection object (adapter).
   * @param string|null $dsn Use dsn if given, otherwise use dsn
   *  of admin database as specified in the service.ini.php of the
   *  application.
   * @param string $user user name used for accesing the database
   * @param string $pass password
   * @return qcl_data_db_type_Abstract
   */
  public function createAdapter( $dsn=null, $user=null, $pass=null )
  {
    if ( $dsn === null )
    {
      $dsn = $this->getApplication()->getIniValue("macros.dsn_admin");
      $dsn = str_replace("&",";", $dsn );
    }
    elseif ( ! is_string( $dsn ) ) // @todo use regexp
    {
      $this->raiseError("Invalid dsn '$dsn'.");
    }
    //$this->debug("Using dsn '$dsn' ",__CLASS__,__LINE__);

    /*
     * pool connection objects
     */
    if ( isset( $this->cache[$dsn] ) )
    {
      //$this->debug("Getting adapter from cache ",__CLASS__,__LINE__);
      $adapter = $this->cache[$dsn];
    }

    /*
     * else connect to new database
     */
    else
    {
      /*
       * type and class of database adapter
       */
      $type  = $this->getDbType( $dsn );
      $class = "qcl_data_db_adapter_PDO" . ucfirst( $type ); // FIXME

      /*
       * include class file
       */
      require_once ( str_replace("_","/",$class) . ".php" );

      /*
       * user/password
       */
      if ( $user === null )
      {
        $user = $this->getApplication()->getIniValue("database.adminname");
        $pass = $this->getApplication()->getIniValue("database.adminpassw");
      }

      /*
       * create adapter
       */
      //$this->debug("New Connection with '$user', '$pass ",__CLASS__,__LINE__);
      $adapter = new $class( $dsn, $user, $pass );

      /*
       * save adapter
       */
      $this->cache[$dsn] = $adapter;
    }

    return $adapter;
  }
}
?>