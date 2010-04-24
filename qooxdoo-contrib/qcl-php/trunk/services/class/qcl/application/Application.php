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

qcl_import( "qcl_access_model_User" ); // this imports all the other required models
qcl_import( "qcl_application_ApplicationCache" );

/**
 * Base class for applications. This class mainly provides access to the
 * different application models and to the access controller
 *
 */
abstract class qcl_application_Application
  extends qcl_core_Object
{
  //-------------------------------------------------------------
  // class properties
  //-------------------------------------------------------------

  /**
   * Whether anoynmous access is allowed
   * @var boolean
   */
  protected $allowAnonymousAccess = true;

  /**
   * The path to the ini file containing initial configuration
   * such as database connectivity etc.
   * @var string
   */
  protected $iniPath = null;

  /**
   * The manager for the initial application configuration
   * @var qcl_config_IniConfigManager
   */
  private $iniManager;

  /**
   * The current application instance
   * @var qcl_application_Application
   */
  static private $application;

  //-------------------------------------------------------------
  // initialization
  //-------------------------------------------------------------

  //-------------------------------------------------------------
  // property getters
  //-------------------------------------------------------------

  /**
   * Whether anonymous access is allowed or not
   * @return bool
   */
  public function allowAnonymousAccess()
  {
    return $this->allowAnonymousAccess;
  }

  /**
   * Returns the path to the ini file containing initial configuration
   * such as database connectivity etc. if set by as a class property
   * @return string
   */
  public function iniPath()
  {
    return $this->iniPath;
  }

  //-------------------------------------------------------------
  // object getters
  //-------------------------------------------------------------

  /**
   * Static getter for current application instance.
   * @return qcl_application_Application|false
   */
  static public function getInstance()
  {
    return self::$application;
  }

  /**
   * Static setter for current application instance. Returns false
   * if no application exists
   * @param qcl_application_Application|false
   */
  static public function setInstance( $application )
  {
    self::$application = $application;
  }

  /**
   * Return the current server instance.
   * @return qcl_server_JsonRpc
   */
  public function getServerInstance()
  {
    return qcl_server_Server::getInstance()->getServerInstance();
  }

  /**
   * Returns the config model singleton instance used by the application
   * @return qcl_config_ConfigModel
   */
  public function getConfigModel()
  {
    qcl_import( "qcl_config_ConfigModel" );
    return qcl_config_ConfigModel::getInstance();
  }

  /**
   * gets the locale controller and sets the default locale. default is
   * a qcl_locale_Manager (see there). if you want to use a different
   * controller, override this method
   * @return qcl_locale_Manager
   */
  public function getLocaleManager()
  {
    qcl_import( "qcl_locale_Manager" );
    return qcl_locale_Manager::getInstance();
  }

  /**
   * Sborthand getter for access behavior attached
   * @return qcl_access_SessionController
   */
  public function getAccessController()
  {
    qcl_import( "qcl_access_SessionController" );
    return qcl_access_SessionController::getInstance();
  }


  //-------------------------------------------------------------
  // event dispatcher and message bus
  //-------------------------------------------------------------

  /**
   * Getter for event dispatcher
   * @return qcl_event_Dispatcher
   */
  public function getEventDispatcher()
  {
    qcl_import( "qcl_event_Dispatcher" );
    return qcl_event_Dispatcher::getInstance();
  }

  /**
   * Getter for message bus object
   * @return qcl_event_message_Bus
   */
  public function getMessageBus()
  {
    qcl_import( "qcl_event_message_Bus" );
    return qcl_event_message_Bus::getInstance();
  }

  //-------------------------------------------------------------
  // ini values
  //-------------------------------------------------------------

  /**
   * Returns initial configuration data manager
   * @return qcl_config_IniConfigManager
   */
  public function getIniManager()
  {
    if ( ! $this->iniManager )
    {
      qcl_import( "qcl_config_IniConfigManager" );
      $this->iniManager = new  qcl_config_IniConfigManager( $this );
    }
    return $this->iniManager;
  }

  /**
   * Returns a configuration value of the pattern "foo.bar.baz"
   * This retrieves the values set in the service.ini.php file.
   */
  public function getIniValue( $path )
  {
    return $this->getIniManager()->getIniValue( $path );
  }

  /**
   * Returns an array of values corresponding to the given array of keys from the
   * initialization configuration data.
   * @param array $arr
   * @return array
   */
  public function getIniValues( $arr )
  {
    return $this->getIniManager()->getIniValues( $arr );
  }

  //-------------------------------------------------------------
  // initial data
  //-------------------------------------------------------------

  /**
   * Imports initial data
   * @param array $datat - map of model types and paths to the
   * xml data files
   */
  protected function importInitialData( $data )
  {
    qcl_import( "qcl_data_model_import_Xml" );
    qcl_import( "qcl_io_filesystem_local_File" );
    qcl_import( "qcl_data_datasource_Manager" );
    qcl_import( "qcl_access_DatasourceModel" );

    /*
     * Register the access models as a datasource to make
     * them accessible to client queries
     */
    try
    {
      $this->log( "Registering 'access' datasource schema" , QCL_LOG_APPLICATION );
      $dsManager = qcl_data_datasource_Manager::getInstance();
      $dsManager->registerSchema("access",array(
        'class'       => "qcl_access_DatasourceModel",
        'description' => "Datasource for the user, permission, role, config and userconfig models"
      ) );
    }
    catch( qcl_data_model_RecordExistsException $e )
    {
      $this->warn("'Access' datasource schema already exists.");
    }

    /*
     * create datasources
     */
    $dsManager = qcl_data_datasource_Manager::getInstance();
    try
    {
      $this->log( "Creating 'access' datasource" , QCL_LOG_APPLICATION );
      $dsManager->createDatasource("access","access");
    }
    catch( qcl_data_model_RecordExistsException $e )
    {
      $this->warn("'Access' datasource already exists.");
    }

    /*
     * Import data
     */
    foreach( $data as $type => $path )
    {
      $this->info("*** Importing '$type' data...");

      /*
       * get model from datasource
       */
      $dsModel = $dsManager->getDatasourceModelByName( "access" );
      $model   = $dsModel->getModelOfType( $type );

      /*
       * delete all data
       * @todo check overwrite
       */
      $model->deleteAll();

      /*
       * import new data
       */
      $xmlFile = new qcl_io_filesystem_local_File( "file://" . $path );
      $this->log( "     ... from $path" , QCL_LOG_APPLICATION );
      $model->import( new qcl_data_model_import_Xml( $xmlFile ) );
    }
  }

  //-------------------------------------------------------------
  // services that belong to this application
  //-------------------------------------------------------------

  /**
   * Registers service names that will be used by this application and
   * maps them to the classes that implement them. Takes an asoociative
   * array. The keys are the service names, the values the implementing
   * classes.
   *
   * @param array $serviceClassMap
   * @return unknown_type
   */
  public function registerServices( $serviceClassMap )
  {
    $server = qcl_server_Server::getInstance()->getServerInstance();
    foreach( $serviceClassMap as $service => $class )
    {
      $server->mapServiceToClass( $service, $class );
    }
  }

  //-------------------------------------------------------------
  // database connectivity
  //-------------------------------------------------------------

  /**
   * Returns the DSN for the user database
   * @return string
   */
  public function getUserDsn()
  {
    $dsn = $this->getIniValue("macros.dsn_user");
    return str_replace("&",";", $dsn );
  }

  /**
   * Returns the DSN for the admin database
   * @return string
   */
  public function getAdminDsn()
  {
    $dsn = $this->getIniValue("macros.dsn_admin");
    return str_replace("&",";", $dsn );
  }

  //-------------------------------------------------------------
  // required main() method
  //-------------------------------------------------------------

  public function main()
  {
    throw new JsonRpcException(sprintf(
      "Application class '%s' must implement main() method.", $this->className()
    ) );
  }
}
?>