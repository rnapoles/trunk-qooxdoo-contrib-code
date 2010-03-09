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
 * The name of the file containing the initial configuration
 */
if ( ! defined("QCL_SERVICE_CONFIG_FILE") )
{
  define("QCL_SERVICE_CONFIG_FILE","service.ini.php");
}

/*
 * Dependencies
 */
require_once "qcl/__init__.php";


/**
 * Application class. All public methods of this class and of its subclasses
 * should be statically callable and work with an sigleton instance of this
 * class internally.
 *
 */
class qcl_application_Application
  extends qcl_core_Object
{
  /**
   * The server instance
   * @var AbstractServer
   */
  private $_server;

  /**
   * Flag indicating if application has already been started
   * @var unknown_type
   */
  private $_isStarted = false;

  /**
   * The intial configuration values, saved in the config.ini.php file
   * @var array
   */
  private $_ini = null;

  /**
   * Returns the version of the application. Can be called
   * statically. Must be implemented by the inheriting class
   * @return string
   */
  public function version()
  {
    return $this->notImplemented();
  }

  /**
   * Return the application singleton instance. Extending classes
   * must define this method and call parent::getInstance();
   *
   * A subclass will share the singleton with this class, so that qcl
   * classes calling methods of this class will work with the subclasses
   * instance.
   *
   * @param string class name
   * @return qcl_application_Application
   */
  static function getInstance( )
  {
    return qcl_getInstance(__CLASS__);
  }

  /**
   * Return the current server instance.
   * @return qcl_server_JsonRpc
   */
  public function getServer()
  {
    $server = qcl_server_Server::getInstance();
    return $server->getServerObject();
  }

  /**
   * Returns the current controller instance, if any. Can be called statically
   * @return qcl_data_controller_Controller
   * @deprecated Get directly from server
   */
  public function getController()
  {
    return $this->getServer()->getController();
  }


  /**
   * Returns the config model singleton instance used by the application
   * @return qcl_config_DbModel
   */
  public function getConfigModel()
  {
    require_once "qcl/config/DbModel.php";
    return qcl_config_DbModel::getInstance();
  }

  /**
   * gets the locale controller and sets the default locale. default is
   * a qcl_locale_Manager (see there). if you want to use a different
   * controller, override this method
   * @return qcl_locale_Manager
   */
  public function getLocaleManager()
  {
    require_once "qcl/locale/Manager.php";
    return qcl_locale_Manager::getInstance();
  }

  /**
   * Sborthand getter for access behavior attached
   * @return qcl_access_Behavior
   */
  public function getAccessBehavior()
  {
    return $this->getServer()->getAccessBehavior();
  }


  //-------------------------------------------------------------
  // startup methods
  //-------------------------------------------------------------

  /**
   * Start the application. You MUST override this method in your
   * application class. In the overriding class, call getInstance()
   * to instantiate the application object, and then call this
   * method with 'parent::start()'.
   * @return unknown_type
   */
  public function start()
  {

    /*
     * set flag
     */
    if ( $this->_isStarted )
    {
      $this->raiseError("Application has already started.");
    }
    $this->_isStarted = true;

    /*
     * Initialize a dummy qcl_data_model_xmlSchema_DbModel object to create tables
     * @todo this can be removed once qcl_data_db_SimpleModel does
     * automatic table creation.
     */
     require_once "qcl/data/persistence/db/Setup.php";
     qcl_data_persistence_db_Setup::setup();

     /*
      * now we can include the real persistent object class
      * @todo this is still a hack
      */
     require_once "qcl/data/persistence/db/Object.php";
  }

  /**
   * Checks if application has started
   * @return boolean
   */
  public function isStarted()
  {
    return $this->_isStarted;
  }


  //-------------------------------------------------------------
  // ini values
  //-------------------------------------------------------------

  /**
   * Reads initial configuration. looks for service.ini.php file in the
   * directory of the topmost including script.
   * @todo re-implement old behavior that services can ovverride individual
   * settings by service directory
   **/
  public function getIniConfig()
  {
    /*
     * return config array if already parsed
     */
    if ( is_array( $this->_ini ) )
    {
      return $this->_ini;
    }

    /*
     * file containing intial configuration
     */
    $ini_path = dirname( $_SERVER["SCRIPT_FILENAME"] ). "/" . QCL_SERVICE_CONFIG_FILE;
    if ( ! file_exists( $ini_path) )
    {
      $this->warn("Configuration file '$ini_path' not found for " . get_class($this) . " ." );
      return array();
    }

    /*
     * PHP 5.3
     */
    if ( defined("INI_SCANNER_RAW") )
    {
      $this->_ini = parse_ini_file ( $ini_path, true, INI_SCANNER_RAW );
    }

    /*
     * PHP < 5.3
     */
    else
    {
      $this->_ini = parse_ini_file ( $ini_path, true );
    }

    return $this->_ini;
  }

  /**
   * Returns a configuration value of the pattern "foo.bar.baz"
   * This retrieves the values set in the service.ini.php file.
   */
  public function getIniValue( $path )
  {
    /*
     * if called recursively
     */
    if ( is_array($path) )
    {
      $path= $path[1];
    }

    $parts   = explode(".",$path);
    $value   = $this->getIniConfig();

    /*
     * traverse array
     */
    while( is_array($value) and $part = array_shift($parts) )
    {
      $value = $value[$part];
    }

    /*
     * expand strings
     */
    if ( is_string( $value ) )
    {
      $value = trim( preg_replace_callback(
        '/\$\{([^}]+)\}/',
        array($this,"getIniValue"), $value
      ) );
    }

    //$this->debug("Ini value '$path'= '$value'");

    return $value;
  }
}
?>