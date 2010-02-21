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
require_once "qcl/core/StaticClass.php";
require_once "qcl/server/Server.php";
require_once "qcl/config/Manager.php";
require_once "qcl/event/message/Bus.php";


/**
 * Application class. All public methods of this class and of its subclasses
 * should be statically callable and work with an sigleton instance of this
 * class internally.
 *
 */
class qcl_application_Application
  extends qcl_core_StaticClass
{
  /**
   * The server instance
   * @var AbstractServer
   */
  var $_server;

  /**
   * The intial configuration values, saved in the config.ini.php file
   * @var array
   */
  var $_ini = null;

  /**
   * Returns the version of the application. Can be called
   * statically. Must be implemented by the inheriting class
   * @return string
   */
  function version()
  {
    return qcl_core_Object::notImplemented();
  }


  /**
   * Return the application singleton instance. Extending classes
   * must define this method and call parent::getInstance(__CLASS__);
   * A subclass will share the singleton with this class, so that qcl
   * classes calling methods of this class will work with the subclasses
   * instance.
   * @param string class name
   * @return qcl_application_Application
   */
  function &getInstance( $class = __CLASS__ )
  {
    if ( ! isset( $GLOBALS['QCL_APPLICATION_INSTANCE'] ) or ! is_object( $GLOBALS['QCL_APPLICATION_INSTANCE'] ) )
    {
      $GLOBALS['QCL_APPLICATION_INSTANCE'] =& new $class;
    }
    return $GLOBALS['QCL_APPLICATION_INSTANCE'];
  }

  /**
   * Return the current server instance. Can be called statically.
   * @return AbstractServer
   */
  function &getServer()
  {
    $server =& qcl_server_Server::getInstance();
    return $server->serverObject;
  }

  /**
   * Returns the current controller instance, if any. Can be called statically
   * @return qcl_data_controller_Controller
   * @deprecated Get directly from server
   */
  function &getController()
  {
    $server =& qcl_server_Server::getInstance();
    return $server->getController();
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
  function start()
  {

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

     /*
      * set the default models for config, session and messages. If you
      * want to use different models, set them before calling this method
      */
     if ( ! qcl_config_Manager::getModel() )
     {
       require_once "qcl/config/Db.php";
       qcl_config_Manager::setModel( qcl_config_Db::getInstance() );
     }
     if ( ! qcl_access_Manager::getSessionModel() )
     {
       require_once "qcl/access/model/Session.php";
       qcl_access_Manager::setSessionModel( qcl_access_model_Session::getInstance() );
     }
     if ( ! qcl_event_message_Bus::getModel() )
     {
       require_once "qcl/event/message/db/Message.php";
       qcl_event_message_Bus::setModel( qcl_event_message_db_Message::getInstance() );
     }
  }

  //-------------------------------------------------------------
  // ini values
  //-------------------------------------------------------------

  /**
   * Reads initial configuration. looks for service.ini.php file in the
   * directory of the topmost including script. Can be called statically.
   * @todo re-implement old behavior that services can ovverride individual
   * settings by service directory
   **/
  function getIniConfig()
  {
    /*
     * get singleton instance
     */
    $_this =& qcl_application_Application::getInstance();

    /*
     * return config array if already parsed
     */
    if ( is_array( $_this->_ini ) )
    {
      return $_this->_ini;
    }

    /*
     * file containing intial configuration
     */
    $ini_path = dirname( $_SERVER["SCRIPT_FILENAME"] ). "/" . QCL_SERVICE_CONFIG_FILE;
    if ( ! file_exists( $ini_path) )
    {
      $_this->warn("Configuration file '$ini_path' not found for " . get_class($_this) . " ." );
      return array();
    }

    /*
     * PHP 5.3
     */
    if ( defined("INI_SCANNER_RAW") )
    {
      $_this->_ini = parse_ini_file ( $ini_path, true, INI_SCANNER_RAW );
    }

    /*
     * PHP < 5.3
     */
    else
    {
      $_this->_ini = parse_ini_file ( $ini_path, true );
    }

    return $_this->_ini;
  }

  /**
   * Returns a configuration value of the pattern "foo.bar.baz"
   * This retrieves the values set in the service.ini.php file.
   */
  function getIniValue($path)
  {
    /*
     * if called recursively
     */
    if ( is_array($path) )
    {
      $path= $path[1];
    }

    $_this =& qcl_application_Application::getInstance();
    $parts   = explode(".",$path);
    $value   = $_this->getIniConfig();

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
        array(&$_this,"getIniValue"), $value
      ) );
    }

    //$this->debug("Ini value '$path'= '$value'");

    return $value;
  }


  /**
   * Returns the config model singleton instance used by the application
   * @return qcl_config_Db
   */
  function &getConfigModel()
  {
    return qcl_config_Db::getInstance();
  }


  //-------------------------------------------------------------
  // logging
  //-------------------------------------------------------------


  /**
   * Logs a message
   */
  function log( $msg, $filters)
  {
    if ( is_a($this,"qcl_application_Application") )
    {
      parent::log( $msg, $filters );
    }
    else
    {
      $_this = qcl_application_Application::getInstance();
      $_this->log( $msg, $filters );
    }
  }

  /**
   * Logs a debug message, which will always be printed.
   */
  function debug( $msg, $class, $line )
  {
    if ( is_a($this,"qcl_application_Application") )
    {
      parent::debug( $msg, $class, $line );
    }
    else
    {
      $_this = qcl_application_Application::getInstance();
      $_this->debug( $msg, $class, $line );
    }
  }

  /**
   * Logs an info message. Can be called statically
   */
  function info( $msg )
  {
    if ( is_a($this,"qcl_application_Application") )
    {
      parent::info( $msg );
    }
    else
    {
      $_this = qcl_application_Application::getInstance();
      $_this->info( $msg, $filters );
    }
  }


  /**
   * Logs a warning
   */
  function warn( $msg )
  {
    if ( is_a($this,"qcl_application_Application") )
    {
      parent::warn( $msg );
    }
    else
    {
      $_this = qcl_application_Application::getInstance();
      $_this->warn( $msg );
    }
  }

  /**
   * Raises an error, qcl-style. Can be called statically.
   */
  function raiseError( $msg )
  {
    if ( is_a($this,"qcl_application_Application") )
    {
      parent::raiseError( $msg );
    }
    else
    {
      $_this = qcl_application_Application::getInstance();
      $_this->raiseError( $msg );
    }
  }

  //-------------------------------------------------------------
  // translation (modeled after qooxdoo syntax)
  //-------------------------------------------------------------

  /**
   * gets the locale controller and sets the default locale. default is
   * a qcl_locale_Manager (see there). if you want to use a different
   * controller, override this method
   * @return qcl_locale_Manager
   */
  function &getLocaleManager()
  {
    require_once "qcl/locale/Manager.php";
    return qcl_locale_Manager::getInstance();
  }

  /**
   * Translates a message. Can be called statically.
   * @return  String
   * @param   String  $msgId    Message id of the string to be translated
   * @param   Mixed   $varargs  (optional) Variable number of arguments for the sprintf formatting either as an array
   * or as parameters
   */
  function tr( $msgId, $varargs=null )
  {
    if ( ! is_array($varargs) )
    {
      $varargs = func_get_args();
      array_shift($varargs);
    }
    $manager =& qcl_application_Application::getLocaleManager();
    return $manager->tr($msgId, $varargs);
  }

  /**
   * Translate a plural message.Depending on the third argument the plursl or the singular form is chosen.
   * Can be called statically.
   *
   * @param string   $singularMessageId Message id of the singular form (may contain format strings)
   * @param string   $pluralMessageId   Message id of the plural form (may contain format strings)
   * @param int      $count             If greater than 1 the plural form otherwhise the singular form is returned.
   * @param Array    $varargs           (optional) Variable number of arguments for the sprintf formatting
   * @return string
   */
  function trn ( $singularMessageId, $pluralMessageId, $count, $varargs=array() )
  {
    $manager =& qcl_application_Application::getLocaleManager();
    return $manager->trn( $singularMessageId, $pluralMessageId, $count, $varargs );
  }


}
?>