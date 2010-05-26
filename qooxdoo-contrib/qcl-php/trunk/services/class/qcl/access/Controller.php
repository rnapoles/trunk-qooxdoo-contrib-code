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
   * Access control list. Determines what role has access to what kind
   * of information.
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

  //-------------------------------------------------------------
  // Object getters
  //-------------------------------------------------------------

  /**
   * Shorthand getter for access controller. Overridden to return itself
   * @return qcl_access_Controller
   */
  public function getAccessController()
  {
    return $this;
  }

  /**
   * Gets the user data model
   * @param string|int $id Load record if given. Deprecated.
   * @return qcl_access_model_User
   * @deprecated Do not pass id as argument
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
   * @deprecated Do not pass id as argument
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
   * @deprecated Do not pass id as argument
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
   * @deprecated Do not pass id as argument
   * FIXME Get from access datasource
   */
  public function getGroupModel()
  {
    qcl_import("qcl_access_model_Group");
    return qcl_access_model_Group::getInstance();
  }

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
   * FIXME
   */
  public function isAnonymousAccessAllowed()
  {
    return $this->getApplication()->allowAnonymousAccess();
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

    try
    {
      $this->createUserSession();
    }
    catch( qcl_access_AccessDeniedException $e)
    {
      if ( $this->isAnonymousAccessAllowed() or $method=="authenticate" )
      {
        $this->log("No valid session, granting anonymous access", QCL_LOG_ACCESS );
        $this->grantAnonymousAccess();
      }
      else
      {
        throw new $e;
      }
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
      throw new qcl_access_InvalidSessionException("Invalid session id #$sessionId.");
    }
    $old = $this->getSessionId();
    if ( $sessionId != $old )
    {
      if ( $this->isValidSessionId( $old ) )
      {
        $this->destroySession( $old );
      }
      $this->log("Starting new session id #$sessionId",QCL_LOG_ACCESS);
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
    return $sessionId and is_string( $sessionId ) and strlen( $sessionId ) == 32;
  }

  /**
   * Destroys a session by its id
   * @param $sessionId
   * @return void
   */
  public function destroySession( $sessionId )
  {
    $this->log("Destroying old session #$sessionId",QCL_LOG_ACCESS);
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
   * Gets the session id from the server data.
   * @return string|null The session id, if it can be retrieved by the server data. Null if
   * no valid session id can be determined from the server data
   */
  public function getSessionIdFromServerData()
  {
    return qcl_server_Request::getInstance()->getServerData("sessionId");
  }

  //-------------------------------------------------------------
  // authentication
  //-------------------------------------------------------------


  /**
   * Checks if the requesting client is an authenticated user.
   * @return bool True if request can continue, false if it should be aborted with
   * a "access denied" exception.
   * @return int userId
   * @todo adapt to overriding method, using Exceptions!
   *
   */
  public function createUserSession()
  {

    /*
     * on-the-fly authentication
     */
    $sessionId = $this->getSessionIdFromServerData();

    if ( $sessionId )
    {

      /*
       * invalid session id, log out
       */
      if ( $sessionId != $this->getSessionId() )
      {
        $this->forceLogout();
        throw new qcl_access_AccessDeniedException("Invalid session id");
      }

      /*
       * we have a valid session id, get the active user from the
       * session
       */
      else
      {
        $userId = qcl_util_registry_Session::get("activeUserId");
        $activeUser = $this->getUserModel();
        $activeUser->load($userId);
        $this->setActiveUser( $activeUser );

        /*
         * If we have an authenticated user, check for timeout
         */
        if ( ! $this->checkTimeout() )
        {
          /*
           * force log out because of timeout
           */
          $this->forceLogout();
          throw new qcl_access_TimeoutException("Your session has expired.");
          return false;
        }
      }
    }
    else
    {
      throw new qcl_access_InvalidSessionException("Invalid session.");
    }

    /*
     * success!!
     */
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
      throw new qcl_access_AuthenticationException("Invalid user name.");
    }

    /*
     * compare provided password with stored password
     */
    $savedPw = $userModel->getPassword();

    if ( ! $savedPw or
      $password === $savedPw or
      md5( $password ) === $savedPw or
      $password === md5 ( $savedPw ) )
    {
      return $userModel->getId();
    }
    else
    {
      throw new qcl_access_AuthenticationException("Wrong password.");
    }
  }

  /**
   * Terminates and destroys the active session
   * @return unknown_type
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
    $this->destroySession( $sessionId );

    return true;
  }

  /**
   * Grant guest access, using a new session.
   * @return int user id
   */
  public function grantAnonymousAccess()
  {

    /*
     * create a new guest user
     */
    $userModel = $this->getUserModel();
    $userId = $userModel->createAnonymous();

    /*
     * create new session id and user session for this user
     */
    $this->log ("Granting anonymous access user #$userId.",QCL_LOG_ACCESS);
    $this->createSessionId();
    $this->createUserSessionByUserId( $userId );
    $this->dispatchClientMessage("setSessionId", $this->getSessionId() );
    return $userId;
  }

  /**
   * Creates a valid user session for the given user id, i.e. creates
   * the user object if needed. A valid session must already exist.
   * @param $userId
   * @return void
   */
  public function createUserSessionByUserId( $userId )
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

  /**
   * Checks whether a timeout has occurred for a given user
   * @param int $userid id of user
   * @return bool true if user can stay logged in, false if logout should be forced
   */
  public function checkTimeout( $userId )
  {
    return true; // FIXME!!
    $configModel = $this->getApplication()->getConfigModel();
    $userModel   = $this->getUserModel( $userId );
    $userName    = $userModel->username();

    /*
     * timeout
     */
    if ( $configModel->keyExists("qcl.session.timeout") )
    {
      $timeout = $configModel->getKey("qcl.session.timeout");
    }
    else
    {
      $timeout = QCL_ACCESS_TIMEOUT;
    }
    $seconds = $userModel->getSecondsSinceLastAction();
    $this->log("User #$userId, $seconds seconds since last action, timeout is $timeout seconds.",QCL_LOG_ACCESS);

    /*
     * logout if timeout has occurred
     */
    if ( $seconds > $timeout )
    {
      return false;
    }

    /*
     * reset the timestamp
     */
    $userModel->resetLastAction();
    return true;
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