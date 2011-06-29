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

require_once "services/server/access/IAccessibilityBehavior.php";

qcl_import( "qcl_data_controller_Controller" );
qcl_import( "qcl_util_registry_Session" );

/**
 * Accessibility behavior class thathandles authentication, access control
 * and configuration
 *
 */
class qcl_access_Controller
  extends qcl_data_controller_Controller
  implements IAccessibilityBehavior
{

	/**
   * Class-based access control list. 
   * Determines what role has access to what kind of model data.
   * @var array
   */
  private $modelAcl = array(

    /*
     * ruleset for all models in the "access" datasource
     */
    array(
      /*
       * this ruleset
       */
      'datasource'  => "access",
      'modelType'   => "*",

      /*
       * which roles have generally access to this model?
       * Here: all.
       */
      'roles'       => "*",

      /*
       * now we set up some rules
       */
      'rules'         => array(

        /*
         * only admin can read or change through the generic
         * functions
         */
        array(
          'roles'       => array( QCL_ROLE_ADMIN ),
          'access'      => "*",
          'properties'  => array( "allow" => "*" )
        )
      )
    )
  );

  /**
   * The id of the currently active user, determined from request or
   * from session variable.
   * @var int
   */
  private $activeUserId = null;

  /**
   * The active user object
   * @var qcl_access_model_User
   */
  private $activeUser = null;

  //-------------------------------------------------------------
  // initialization
  //-------------------------------------------------------------

  /**
   * Constructor
   */
  function __construct()
  {
    $this->addModelAcl( $this->modelAcl );

    /*
     * instantiate the user model
     */
    qcl_access_model_User::getInstance();

  }

  /**
   * Shorthand getter for access controller. Overridden to return itself
   * when called from from subclasses
   * @return qcl_access_Controller
   */
  public function getAccessController()
  {
    return $this;
  }

  //-------------------------------------------------------------
  // model getters
  //-------------------------------------------------------------

  /**
   * Returns the datasource that provides access to the different
   * access models
   * @return qcl_access_DatasourceModel
   */
  public function getAccessDatasource()
  {
    static $accessDatasource = null;
    if( $accessDatasource === null )
    {
      $accessDatasource = $this->getDatasourceModel("access");
    }
    return $accessDatasource;
  }

  /**
   * Gets the user data model
   * @param string|int $id Load record if given. Deprecated.
   * @return qcl_access_model_User
   * FIXME Do not pass id as argument
   * FIXME Get from access datasource
   * FIXME Remove argument
   */
  public function getUserModel( $id=null )
  {
    $userModel = qcl_access_model_User::getInstance();
    if ( $id ) $userModel->load( $id );
    return $userModel;
  }

  /**
   * Gets the permission data model
   * @param string|int $id Load record if given.Deprecated.
   * @return qcl_access_model_Permission
   * FIXME Do not pass id as argument
   * FIXME Get from access datasource
   * FIXME Remove argument
   */
  public function getPermissionModel( $id = null)
  {
    $permModel = qcl_access_model_Permission::getInstance();
    if ( $id ) $permModel->load( $id );
    return $permModel;
  }

  /**
   * Gets the role data model
   * @param string|int $id Load record if given.Deprecated.
   * @return qcl_access_model_Role
   * FIXME Do not pass id as argument
   * FIXME Get from access datasource
   * FIXME Remove argument
   */
  public function getRoleModel( $id=null )
  {
    $roleModel = qcl_access_model_Role::getInstance();
    if ( $id ) $roleModel->load( $id );
    return $roleModel;
  }

  /**
   * Gets the group data model
   * @return qcl_access_model_Role
   * FIXME Do not pass id as argument
   * FIXME Get from access datasource
   */
  public function getGroupModel()
  {
    return qcl_access_model_Group::getInstance();
  }

  /**
   * Returns the configuration data model
   * @return qcl_config_ConfigModel
   */
  public function getConfigModel()
  {
    return qcl_config_ConfigModel::getInstance();
  }

  //-------------------------------------------------------------
  // active user
  //-------------------------------------------------------------

  /**
   * Returns active user object
   * @return qcl_access_model_User
   */
  public function getActiveUser()
  {
    return $this->activeUser;
  }

  /**
   * Sets the active user.
   * @param qcl_access_model_User $userObject A user object or null to logout.
   * @return void
   */
  public function setActiveUser( $userObject )
  {
    if ( $userObject === null )
    {
      $this->activeUser = null;
    }
    elseif ( $userObject instanceof qcl_access_model_User )
    {
      $activeUserClass = $userObject->className();
      $this->activeUser = new $activeUserClass;
      $this->activeUser->load( $userObject->namedId() );
    }
    else
    {
      $this->raiseError("Invalid user object");
    }
  }

  //-------------------------------------------------------------
  // access control on the session level
  //-------------------------------------------------------------


  /**
   * Whether guest access to the service classes is allowed
   * @return boolean
   */
  public function isAnonymousAccessAllowed()
  {
    return $this->getApplication()->isAnonymousAccessAllowed();
  }

  /**
   * Check the accessibility of service object and service
   * method. Aborts request when access is denied, unless when the method name is
   * "authenticate"
   * @param qcl_core_Object $serviceObject
   * @param string $method
   * @return void
   */
  public function checkAccessibility( $serviceObject, $method )
  {
    if ( ! $serviceObject instanceof qcl_server_Service )
    {
      $this->raiseError("Service object must be subclass of qcl_server_Service");
    }

    $this->log( sprintf(
      "Checking access to service object '%s'", $serviceObject->className()
    ), QCL_LOG_ACCESS );
    
    /*
     * check session id
     */
    $sessionId = $this->getSessionIdFromRequest();
    if ( ! $sessionId )
    {
      /*
       * if authentication is not necessary, create an anonymous
       * user based on the php session
       */
      if( $this->getApplication()->skipAuthentication() )
      {
        $sessionId = $this->getSessionId();
        $this->debug( "session id #### $sessionId", __CLASS__, __LINE__ );
        $userId = $this->createAnonymous( $sessionId );
        $this->debug( "anon granted", __CLASS__, __LINE__ );
        $this->setActiveUserById( $userId );
        $this->debug( "active user created", __CLASS__, __LINE__ );
        $this->log("Temporary anonymous user #$userId with php session #$sessionId ...", QCL_LOG_ACCESS );
      }
      
      /*
       * otherwise, reject access
       */
      else 
      {
        throw new qcl_access_InvalidSessionException("No access: Missing session id.");
      }
    }
    
    /*
     * we have a session id, check if valid
     */
    else 
    {
      $this->configureUserSession($sessionId);
    }
  }

  //-------------------------------------------------------------
  // session id
  //-------------------------------------------------------------

  /**
   * Returns the current PHP session id.
   * @return string session id
   */
  public function getSessionId()
  {
    return session_id();
  }

  /**
   * Sets the PHP session id, which deletes the PHP session data.
   * @param string $sessionId
   * @return void
   */
  public function setSessionId( $sessionId )
  {
    if ( ! $this->isValidSessionId( $sessionId ) )
    {
      throw new qcl_access_InvalidSessionException("Malformed session id #$sessionId.");
    }
    $old = $this->getSessionId();
    if ( $sessionId != $old )
    {
      $this->log("(Re-)starting session #$sessionId",QCL_LOG_ACCESS);
      session_id( $sessionId );
      session_start();
    }
  }

  /**
   * Checks if session id is legal
   * @param $sessionId
   * @return bool
   */
  public function isValidSessionId( $sessionId )
  {
    return $sessionId and is_string( $sessionId ) and strlen( $sessionId ) < 50;
  }

  /**
   * Destroys a session by its id
   * @param $sessionId
   * @return void
   */
  public function destroySession()
  {
    $this->log("Destroying PHP session",QCL_LOG_ACCESS);
    session_destroy();
  }

  /**
   * Creates a new session id and sets it.
   * @return string The session id
   */
  public function createSessionId()
  {
    /*
     * create random session id
     */
    $sessionId = md5( microtime() );
    $this->log("Creating new session id ...",QCL_LOG_ACCESS);
    $this->setSessionId( $sessionId );
    return $sessionId;
  }

  /**
   * Get the active user id from the session id.
   * @param int $sessionId
   * @return int
   * @throws qcl_access_InvalidSessionException
   */
  public function getUserIdFromSession( $sessionId )
  {
    throw new qcl_access_InvalidSessionException("Controller does not support sessions");
  }

  /**
   * Gets the session id from the request, from a variety of alternative sources, in order:
   *  - from the 'sessionId' key in the server data part of the json-rpc request (deprecated)
   *  - from the 'x-qcl-sessionid' request header
   *  - from the QCLSESSID in the request parameters
   *  - from the QCLSESSID cookie
   *  - the PHP session
   * @return the session id.
   * @todo move into request object
   */
  public function getSessionIdFromRequest()
  {
    $sessionId = null;
    
    // server_data, deprecated
    if ( $sessionId = qcl_server_Request::getInstance()->getServerData("sessionId") )
    {
      $source = "server data";
    }
    // request header 
    elseif ( $sessionId = qcl_get_request_header('x-qcl-sessionid') )
    {
      $source = "request header";
    }
    // request param 
    elseif ( $sessionId = $_REQUEST['QCLSESSID'] )
    {
      $source = "request parameter";
    }   
    // cookie
    elseif ( $sessionId =  $_COOKIE['QCLSESSID'] )
    {
      $source = "cookie";
    }
    if( $sessionId )
    {
      $this->log("Got session id from $source: #$sessionId", QCL_LOG_ACCESS );
    }
    else
    {
      $this->log("Request contains no session id.", QCL_LOG_ACCESS );
    }
    return $sessionId;
  }

  //-------------------------------------------------------------
  // authentication
  //-------------------------------------------------------------


  /**
   * Checks if the requesting client is an authenticated user.
   * @param string $sessionId
   * @return int userId
   * @todo reimplement timeouts
   */
  public function configureUserSession($sessionId)
  {
    /*
     * in this implementation, we ignore the session id and get the 
     * active user's id from the php session 
     */
    $userId = qcl_util_registry_Session::get("activeUserId");
    $this->setActiveUserById($userId);
    return $userId;
  }

  /**
   * Authenticate a user with a password. Returns an integer with
   * the user id if successful. Throws qcl_access_AuthenticationException
   * if unsuccessful
   *
   * @param string $username or null
   * @param string $password (MD5-encoded) password
   * @throws qcl_access_AuthenticationException
   * @return int|false The id of the user or false if authentication failed
   */
  public function authenticate( $username, $password )
  {
    /*
     * user model
     */
    $userModel = $this->getUserModel();

    /*
     * try to authenticate
     */
    try
    {
      $userModel->load( $username );
    }
    catch( qcl_data_model_RecordNotFoundException $e)
    {
      throw new qcl_access_AuthenticationException( $this->tr("Invalid user name.") );
    }

    /*
     * Compare provided password with stored password
     */
    $savedPw = $userModel->getPassword();

    if ( $password == $savedPw or
      $this->generateHash( $password, $savedPw ) == $savedPw )
    {
      return $userModel->getId();
    }
    else
    {
      throw new qcl_access_AuthenticationException( $this->tr("Wrong password.") );
    }
  }

  /**
   * Registers a new user. When exposing this method in a
   * service class, make sure to protect it adequately.
   *
   * @param string $username
   * @param string $password
   * @param array $data
   *    Optional user data
   * @return qcl_access_model_User
   *    The newly created user model instance
   */
  public function register( $username, $password, $data= array() )
  {
    qcl_assert_valid_string( $username );
    qcl_assert_valid_string( $password );

    $userModel = $this->getUserModel();
    $data['password'] = $this->generateHash( $password );
    if( ! $data['name'])
    {
      $data['name'] = $username;
    }
    $userModel->create( $username, $data );
    return $userModel;
  }


  /**
   * Calling this method with a single argument (the plain text password)
   * will cause a random string to be generated and used for the salt.
   * The resulting string consists of the salt followed by the SHA-1 hash
   * - this is to be stored away in your database. When you're checking a
   * user's login, the situation is slightly different in that you already
   * know the salt you'd like to use. The string stored in your database
   * can be passed to generateHash() as the second argument when generating
   * the hash of a user-supplied password for comparison.
   *
   * See http://phpsec.org/articles/2005/password-hashing.html
   * @param $plainText
   * @param $salt
   * @return string
   */
  public function generateHash( $plainText, $salt = null)
  {
    if ( $salt === null )
    {
      $salt = substr( md5(uniqid(rand(), true)), 0, QCL_ACCESS_SALT_LENGTH);
    }
    else
    {
      $salt = substr($salt, 0, QCL_ACCESS_SALT_LENGTH );
    }
    return $salt . sha1( $salt . $plainText);
  }


  /**
   * Terminates and destroys the active session
   * @return void
   */
  public function terminate()
  {
    $this->logout();
    session_destroy();
  }

  /**
   * Forces a logout on client and server
   * @return unknown_type
   */
  public function forceLogout()
  {
    $this->fireClientEvent("logout");
    $this->logout();
  }

  /**
   * Logs out the the active user. If the user is anonymous, delete its record
   * in the user table.
   * @return bool success
   */
  public function logout()
  {

    /*
     * check whether anyone is logged in
     */
    $activeUser = $this->getActiveUser();

    if ( ! $activeUser )
    {
      $this->log("No need to log out, nobody is logged in.", QCL_LOG_ACCESS);
      return false;
    }

    $username  = $activeUser->username();
    $userId    = $activeUser->getId();
    $sessionId = $this->getSessionId();

    $this->log("Logging out: user '$username' user #$userId, session #$sessionId.",QCL_LOG_ACCESS );
    
    /*
     * delete user data if anonymous guest
     */
    if ( $activeUser->isAnonymous() )
    {
      $activeUser->delete();
    }

    /*
     * unset active user
     */
    $this->log("Deleting active user ...",QCL_LOG_ACCESS );
    $this->setActiveUser(null);

    /*
     * destroy php session
     */
    $this->log("Destroying session ...",QCL_LOG_ACCESS );
    $this->destroySession();

    return true;
  }

  /**
   * Grant guest access, using a new session.
   * @param string $sessionId Optional session id, if not given, one is
   * generated
   * @return int user id
   */
  public function createAnonymous( $sessionId )
  {
    /*
     * create new anonymous user session 
     */
    $userModel = $this->getUserModel();
    $userId = $userModel->createAnonymous();
    $this->log ("Creating anonymous user #$userId.",QCL_LOG_ACCESS);
    
    /*
     * create a session id if none was passed
     */
    if( ! $sessionId  )
    {
      $this->createSessionId();  
    }
    else
    {
      $this->setSessionId($sessionId);      
    }
    return $userId;
  }

  /**
   * Creates a valid user session for the given user id, i.e. creates
   * the user object if needed. A valid session must already exist.
   * @param $userId
   * @return void
   */
  public function setActiveUserById( $userId )
  {

    $sessionId = $this->getSessionId();

    /*
     * check if user is already logged in or is not the one
     * we're supposed to log in
     */
    $activeUser = $this->getActiveUser();

    if ( $activeUser )
    {
      if ( $activeUser->getId() != $userId )
      {
        $this->warn(sprintf(
          "User %s (#%s) is already logged in, although we're about to login in user with id #%s. This should normally not be the case",
          $activeUser, $activeUser->id(), $userId
        ) );
      }
      else
      {
        $this->log("User #$userId already logged in. Continuing session #$sessionId.",QCL_LOG_ACCESS);
        return;
      }
    }

    /*
     * save the current user model as
     * the new active user and reset its timestamp
     */
    $activeUser = $this->getUserModel();
    $activeUser->load( $userId );
    $this->setActiveUser( $activeUser );
    $activeUser->resetLastAction();

    /*
     * save the user id in the session
     */
    qcl_util_registry_Session::set("activeUserId", $userId );

    /*
     * log message
     */
    $this->log( "New user session: user #$userId, session #$sessionId",QCL_LOG_ACCESS);
  }


  //-------------------------------------------------------------
  // events and messages
  //-------------------------------------------------------------

  /**
   * Fires a server event which will be transported to the client
   * and dispatched by the jsonrpc data store.
   * @param string $type Message Event type
   */
  public function fireClientEvent ( $type )
  {
    $this->getEventDispatcher()->fireClientEvent( $this, $type, $data );
  }

  /**
   * Fires a server data event which will be transported to the client
   * and dispatched by the jsonrpc data store.
   * @param mixed $event Message Event type
   * @param mixed $data Data dispatched with event
   */
  public function fireClientDataEvent ( $type, $data )
  {
    $this->getEventDispatcher()->fireClientDataEvent( $this, $type, $data );
  }

  //-------------------------------------------------------------
  // IAccessibilityBehavior
  //-------------------------------------------------------------

  /**
   * Unused, simply here for implementing IAccessibilityBehavior.
   */
  function getErrorMessage()
  {
    throw new Exception( __METHOD__ . " is not implemented");
  }

  /**
   * Unused, simply here for implementing IAccessibilityBehavior.
   */
  function getErrorNumber()
  {
    throw new Exception( __METHOD__ . " is not implemented");
  }
}
?>