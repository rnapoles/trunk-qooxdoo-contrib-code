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

require_once "qcl/access/__init__.php";
require_once "qcl/data/controller/Controller.php";
require_once "qcl/util/registry/Session.php";

/*
 * the prefix for the anonymous user
 */
if ( ! defined('QCL_ACCESS_ANONYMOUS_USER_PREFIX') )
{
  define('QCL_ACCESS_ANONYMOUS_USER_PREFIX', "anonymous_");
}

/*
 * the default timeout
 */
if ( ! defined('QCL_ACCESS_TIMEOUT') )
{
  define('QCL_ACCESS_TIMEOUT', 30*60 );
}

/*
 * Exceptions thrown in this class and subclasses
 */
class qcl_access_AccessDeniedException extends JsonRpcException {}
class qcl_access_AuthenticationException extends qcl_access_AccessDeniedException {}
class qcl_access_InvalidSessionException extends qcl_access_AccessDeniedException {}
class qcl_access_TimeoutException extends qcl_access_InvalidSessionException {}

/**
 * Accessibility behavior class thathandles authentication, access control
 * and configuration
 */
class qcl_access_Controller
  extends qcl_data_controller_Controller
{

  /**
   * The currently active user, determined from request or
   * from session variable. Is a user model instance
   * @access private
   * @var qcl_access_model_User
   */
  private $_activeUser = null;


  /**
   * Gets the user data model
   * @param int[optional] $id Load record if given
   * @return qcl_access_model_User
   */
  public function getUserModel( $id=null )
  {
    $userModel = qcl_access_model_User::getInstance();
    if ( $id ) $userModel->load( $id );
    return $userModel;
  }

  /**
   * Gets the permission data model
   * @param int[optional] $id Load record if given
   * @return qcl_access_model_Permission
   */
  public function getPermissionModel( $id = null)
  {
    $permModel = qcl_access_model_Permission::getInstance();
    if ( $id ) $permModel->load( $id );
    return $permModel;
  }

  /**
   * Gets the role data model
   * @param int[optional] $id Load record if given
   * @return qcl_access_model_Role
   */
  public function getRoleModel( $id=null )
  {
    $roleModel = qcl_access_model_Role::getInstance();
    if ( $id ) $roleModel->load( $id );
    return $roleModel;
  }

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
        $userModel = $this->getUserModel( $userId );
        $this->setActiveUser( $userModel );

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
   * Gets the session id from the server data.
   * @return string|null The session id, if it can be retrieved by the server data. Null if
   * no valid session id can be determined from the server data
   */
  public function getSessionIdFromServerData()
  {
    $server = $this->getApplication()->getServer();
    $sessionId = $server->getServerData("sessionId");
    return $sessionId;
  }

  /**
   * Authenticate a user with a password. Returns an integer with
   * the user id if successful and false if unsuccessful. Throws errors
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
    $userModel->findByNamedId( $username );
    if ( $userModel->foundNothing() )
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
    /*
     * send command to client to force a logout
     */
    $this->fireServerEvent("logout");
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
      $this->log("No need to log out, nobody is logged in","access");
      return false;
    }

    $username  = $activeUser->username();
    $userId    = $activeUser->getId();
    $sessionId = $this->getSessionId();

    $this->log("Logging out: user '$username' user #$userId, session #$sessionId.","access" );

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
    $this->log("Deleting active user ...","access" );
    $this->setActiveUser(null);

    /*
     * destroy php session
     */
    $this->log("Destroying session ...","access" );
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
    $this->log ("Granting anonymous access user #$userId.","access");
    $this->createSessionId();
    $this->createUserSessionByUserId( $userId );

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
        throw new qcl_access_AuthenticationException("A different user is already logged in.");
      }
      else
      {
        $this->log("User #$userId already logged in. Continuing session #$sessionId.","access");
        return;
      }
    }

    /*
     * save a copy of the current user model as
     * the new active user and reset its timestamp
     */
    $userModel  = $this->getUserModel( $userId );
    $activeUser = $userModel->cloneObject();
    $this->setActiveUser( $activeUser );
    $activeUser->resetLastAction();

    /*
     * save the user id in the session
     */
    qcl_util_registry_Session::set("activeUserId", $userId );

    /*
     * log message
     */
    $this->log( "New user session: user #$userId, session #$sessionId","access");
  }

  /**
   * Checks whether a timeout has occurred for a given user
   * @param int $userid id of user
   * @return bool true if user can stay logged in, false if logout should be forced
   */
  public function checkTimeout( $userId )
  {
    $configModel = $this->getApplication()->getConfigModel();
    $userModel   = $this->getUserModel( $userId );
    $userName    = $userModel->username();

    /*
     * timeout
     */
    if ( $configModel->hasKey("qcl.session.timeout") )
    {
      $timeout = $configModel->getKey("qcl.session.timeout");
    }
    else
    {
      $timeout = QCL_ACCESS_TIMEOUT;
    }
    $seconds = $userModel->getSecondsSinceLastAction();
    $this->log("User #$userId, $seconds seconds since last action, timeout is $timeout seconds.","access");

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
      $this->log("Starting new session id #$sessionId","access");
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
    $this->log("Destroying old session #$sessionId","access");
    session_destroy();
  }

  /**
   * Creates a new session id and sets it.
   * @return string The session id
   */
  public function createSessionId( )
  {
    /*
     * create random session id
     */
    $sessionId = md5( microtime() );
    $this->log("Creating new session id ...","access");
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
   * Returns active user object
   * @return qcl_access_model_User
   */
  public function getActiveUser()
  {
    return $this->_activeUser;
  }

  /**
   * Sets the active user.
   * @param qcl_access_model_User $userObject A user object or null to logout.
   * @return void
   */
  public function setActiveUser( $userObject )
  {
    if ( $userObject === null or $userObject instanceof qcl_access_model_User )
    {
      $this->_activeUser = $userObject;
    }
    else
    {
      $this->raiseError("Invalid user object");
    }
  }

  /**
   * Fires a server event which will be transported to the client
   * and dispatched by the jsonrpc data store.
   * @param string $type Message Event type
   */
  public function fireServerEvent ( $type )
  {
    $this->getEventDispatcher()->fireServerEvent( $this, $type, $data );
  }

  /**
   * Fires a server data event which will be transported to the client
   * and dispatched by the jsonrpc data store.
   * @param mixed $event Message Event type
   * @param mixed $data Data dispatched with event
   */
  public function fireServerDataEvent ( $type, $data )
  {
    $this->getEventDispatcher()->fireServerDataEvent( $this, $type, $data );
  }
}
?>