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

require_once "services/server/JsonRpcServer.php";

qcl_import( "qcl_server_Request" );
qcl_import( "qcl_server_Response" );
qcl_import( "qcl_application_Application" );

/**
 *
 */
class qcl_server_JsonRpcServer
  extends JsonRpcServer
{

  /**
   * The called controller object
   * @var qcl_data_controller_Controller
   */
  private $controller = null;

  //-------------------------------------------------------------
  // initialization & startup
  //-------------------------------------------------------------

  /**
   * Constructor, replaces parent constructor
   */
  function __construct()
  {
    /*
     * Initialize the server, including error
     * catching etc.
     */
    $this->initializeServer();
  }

  /**
   * Return singleton instance of the server
   * return JsonRpcServer
   */
  public static function getInstance()
  {
    return qcl_getInstance( __CLASS__ );
  }

  /**
   * Starts a singleton instance of the server. Must be called statically.
   */
  public static function run()
  {
    $_this = self::getInstance();
    $_this->start();
  }

  //-------------------------------------------------------------
  // object getters
  //-------------------------------------------------------------

  /**
   * Returns the current controller instance, if any.
   * @return qcl_data_controller_Controller
   */
  public function getController()
  {
    if ( ! $this->controller )
    {
      $this->raiseError("No controller set.");
    }
    return $this->controller;
  }

  /**
   * Returns the current request object
   * @return qcl_server_Request
   */
  public function getRequest()
  {
    return qcl_server_Request::getInstance();
  }

  /**
   * Getter for response object
   * @return qcl_server_Response
   * @todo rename to getResponse()
   */
  public function getResponseObject()
  {
    return qcl_server_Response::getInstance();
  }

  /**
   * Returns the current application or false if no application exists.
   * @return qcl_application_Application|false
   */
  public function getApplication()
  {

    if ( qcl_application_Application::getInstance() === null )
    {
      /*
       * determine application class name
       */
      $request = qcl_server_Request::getInstance();
      $service = new String( $request->getService() );
      $appClass = (string) $service
        ->substr( 0, $service->lastIndexOf(".") )
        ->replace("/\./","_")
        ->concat( "_Application" );

      try
      {
        /*
         * import class file
         */
        qcl_import( $appClass );

        /*
         * instantiate new application object
         */
        $app = new $appClass;
        if ( ! $app instanceof qcl_application_Application )
        {
          throw new qcl_InvalidClassException(
            "Application class '$appClass' must be a subclass of 'qcl_application_Application'"
          );
        }

        /*
         * store application instance
         */
        qcl_application_Application::setInstance( $app );

        /*
         * call main() method to start application
         */
        $app->main();

      }
      catch( qcl_FileNotFoundException $e )
      {
        qcl_log_Logger::getInstance()->log( "No or unfunctional application: " . $e->getMessage(), QCL_LOG_APPLICATION );
        qcl_application_Application::setInstance( false );
      }
    }
    return qcl_application_Application::getInstance();
  }

  /**
   * Returns access controller instance from application. If no
   * application exists, return the AccessibilityBehavior object
   * from the server. Both objects implement IAccessibilityBehavior,
   * however, the access controller throws a qcl_access_AccessDeniedException
   * instead of returning false if authentication fails.
   *
   * @return qcl_access_Controller
   */
  public function getAccessController()
  {
    $app = $this->getApplication();
    if ( $app)
    {
      return $app->getAccessController();
    }
    else
    {
      return $this->getAccessibilityBehavior();
    }
  }

  //-------------------------------------------------------------
  //  overridden methods
  //-------------------------------------------------------------

  /**
   * Return the input as a php object if a valid
   * request is found, otherwise throw a JsonRpcException. Overridden
   * to populate qcl_server_Request singleton from input
   * @return StdClass
   * @throws JsonRpcException
   */
  public function getInput()
  {
    $input = parent::getInput();
    $request = qcl_server_Request::getInstance();
    $request->set( $input );
    return $input;
  }

  /**
   * Overridden to store the current service object as controller
   * object.
   */
  public function getServiceObject( $className )
  {
    /*
     * get service object from parent method
     */
    $serviceObject = parent::getServiceObject( $className );

    /*
     * store service object
     */
    $this->controller = $serviceObject;

    return $serviceObject;
  }

  /**
   * Check the accessibility of service object and service
   * method. Aborts request when access is denied.
   * @return void
   */
  public function checkAccessibility( $serviceObject, $method )
  {
    $this->getAccessController()->checkAccessibility( $serviceObject, $method );
  }

  /**
   * Format the response string, given the service method output.
   * By default, wrap it in a result map and encode it in json.
   * @param mixded $output
   * @return string
   */
  public function formatOutput( $data )
  {
    /*
     * response object
     */
    $response = $this->getResponseObject();

    /*
     * request id
     */
    $requestId = $this->getId();
    $response->setId( $requestId );

    /*
     * events and messages
     */
    $app = $this->getApplication();
    if ( $app and $app->getIniValue("service.event_transport") == "on" )
    {
      $events    = $app->getEventDispatcher()->getServerEvents();
      $response->setEvents( $events );
      $sessionId = $app->getAccessController()->getSessionId();
      $messages  = $app->getMessageBus()->getServerMessages( $sessionId );
      $response->setMessages( $messages );
    }

    if( is_a( $data, "qcl_data_Result" ) )
    {
      $data = $data->toArray();
    }
    $response->setData( $data );
    return $this->json->encode( $response->toArray() );
  }

  /**
   * Hook for subclasses to locally log the error message
   * @param string $msg Error Message
   * @param bool $includeBacktrace Whether a backtrace should be printed as well
   * @return void
   */
  public function logError( $msg, $includeBacktrace = false )
  {
    qcl_log_Logger::getInstance()->error( $msg, $includeBacktrace );
  }
}
?>