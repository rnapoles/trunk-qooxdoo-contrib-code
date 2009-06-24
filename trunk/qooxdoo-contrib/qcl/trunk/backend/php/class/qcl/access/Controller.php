<?php

/*
 * dependencies
 */
require_once "qcl/access/__index__.php";
require_once "qcl/mvc/controller.php";
require_once "qcl/config/Manager.php";
require_once "qcl/registry/Session.php";

/*
 * interfaces
 */
require_once "qcl/access/IAuthentication.php";

/*
 * constants
 */
define('QCL_ANONYMOUS_USER_PREFIX', "anonymous_");

/**
 * Accessibility behavior class thathandles authentication, access control
 * and configuration
 */
class qcl_access_Controller
  extends qcl_mvc_Controller
  implements qcl_access_IAuthentication
{

  /**
   * The currently active user, determined from request or
   * from session variable. Is a user model instance
   * @access private
   * @var qcl_access_model_User
   */
  var $_activeUser = null;

  /**
   * Map pairing permission names with local aliases
   * @var array
   */
  var $permisssionAliasMap;

 /**
   * Gets the user data model
   * @param int[optional] $id Load record if given
   * @return qcl_access_model_User
   */
  function &getUserModel( $id=null )
  {
    $userModel =& qcl_access_model_User::getInstance();
    if ( $id ) $userModel->load( $id );
    return $userModel;
  }

  /**
   * Gets the permission data model
   * @param int[optional] $id Load record if given
   * @return qcl_access_model_Permission
   */
  function &getPermissionModel( $id = null)
  {
    $permModel =& qcl_access_model_Permission::getInstance();
    if ( $id ) $permModel->load( $id );
    return $permModel;
  }

  /**
   * Gets the role data model
   * @param int[optional] $id Load record if given
   * @return qcl_access_model_Role
   */
  function &getRoleModel( $id=null )
  {
    $roleModel =& qcl_access_model_Role::getInstance();
    if ( $id ) $roleModel->load( $id );
    return $roleModel;
  }

  /**
   * Gets the role data model
   * @return qcl_access_model_Role
   */
  function &getConfigModel()
  {
    return qcl_config_Manager::getModel();
  }


  /**
   * Checks if the requesting client is an authenticated user.
   * @return bool True if request can continue, false if it should be aborted with
   * a "access denied" exception.
   * @param $sessionId[optional] If not given, get from request
   * @return bool success
   */
  function isValidUserSession( $sessionId = null )
  {

    if ( ! $sessionId )
    {
      /*
       * on-the-fly authentication
       */
      $sessionId = $this->checkServerDataAuthentication();
    }

    if ( $sessionId )
    {

      /*
       * invalid session id, log out
       */
      if ( $sessionId != $this->getSessionId() )
      {
        $this->forceLogout();
        $this->setError("Invalid session id");
        return false;
      }

      /*
       * we have a valid session id, get the active user from the
       * session
       */
      else
      {
        $userId = qcl_registry_Session::get("activeUserId");
        $userModel =& $this->getUserModel( $userId );
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
          $this->setError( "Timeout.");
          return false;
        }
      }
    }
    else
    {
      $this->setError("No valid session.");
      return false;
    }


    /*
     * success!!
     */
    return true;
  }

  /**
   * Authenticates with data in the server data
   * @param $sessionId
   * @return string New Session Id
   * FIXME This is not functional yet
   */
  function checkServerDataAuthentication()
  {
    $username  = qcl_server_Server::getServerData("username");
    $password  = qcl_server_Server::getServerData("password");
    $sessionId = qcl_server_Server::getServerData("sessionId");

    if ( $username  )
    {
      $userId = $this->authenticate( $username,$password );
      if ( $userId )
      {
        $logMsg = $this->setActiveUserById( $userId );
        $this->info( $logMsg );
      }
    }

    /**
     * grant guest access if allowed
     */
    elseif ( is_null( $sessionId) and $this->guestAccessAllowed() )
    {
      $this->grantGuestAccess();
    }

    /*
     * otherwise, no serverdata authentication
     */
    else
    {
      return $sessionId;
    }

    /*
     * session id
     */
    $sessionId = $this->getSessionId();

    /*
     * dispatch a message to set the new session id
     */
    $this->dispatchMessage("qcl.commands.setSessionId", $sessionId);

    /*
     * return the new session id
     */
    return $sessionId;
  }

  /**
   * Authenticate a user with a password.
   * If no username is given, check if a user has already been logged in,
   * so you can use this method in your service class without parameters
   * to make sure a login has taken place.
   * @param string $username or null
   * @param string $password (MD5-encoded) password or null
   * @return int|false The id of the user or false if authentication failed
   */
  function authenticate ( $username=null, $password=null )
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
      $this->setError( "Unknown user name: $username" );
      return false;
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
      $this->setError( "Wrong password for: $username" );
      return false;
    }
  }

  /**
   * Service method to log out the active user. Automatically creates guest
   * access. Override this method if this is not what you want.
   * @return qcl_jsonrpc_Response
   */
  function method_logout()
  {
    $this->logout();
    return $this->response();
  }

  /**
   * Forces a logout on client and server
   * @return unknown_type
   */
  function forceLogout()
  {
    /*
     * send command to client to force a logout
     */
    $this->dispatchMessage("qcl.commands.logout");
    $this->logout();
  }

  /**
   * Logs out the the active user. If the user is anonymous, delete its record
   * in the user table.
   * @return bool success
   */
  function logout()
  {

    /*
     * check whether anyone is logged in
     */
    $activeUser =& $this->getActiveUser();

    if ( ! $activeUser )
    {
      //$this->warn("Cannot log out, nobody is logged in");
      return false;
    }

    $username  = $activeUser->username();
    $sessionId = $this->getSessionId();

    $this->info("Logging out: $username ($sessionId)." );

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
    $this->setActiveUser(null);

    return true;
  }

  /**
   * Whether guest access to the service classes is allowed
   * @return unknown_type
   */
  function guestAccessAllowed()
  {
    return $this->getIniValue("service.allow_guest_access");
  }


  /**
   * Provide guest access to backend services
   * @todo Rework this
   */
  function method_guestAccess()
  {
    /*
     * Check if guest access is allowed at all
     */
    if ( ! $this->guestAccessAllowed() )
    {
      return $this->userNotice( $this->tr("Guest access denied.") );
    }

    /*
     * logout any previous user
     */
    $this->logout();

    /*
     * create new guest user
     */
    $this->grantGuestAccess();

    /*
     * return permissions
     */
    return $this->method_authenticate(null);
  }

  /**
   * Grant guest access
   * @todo config data should be written to config table and deleted when guest user sessions are deleted.
   * @return void
   */
  function grantGuestAccess()
  {
    /*
     * create a new session
     */
    $this->createSessionId();

    /*
     * create a new guest user
     */
    $userModel =& $this->getUserModel();
    $userModel->createGuestUser();
    $this->setActiveUser( $userModel );

    $userId = $userModel->getId();
    $sessionId = $this->getSessionId();

    /*
     * log message
     */
    $this->info ("Granting guest access (user id #$userId, session id #$sessionId ).");
  }


  /**
   * Actively authenticate the user with username and password.
   * Returns data for the authentication store.
   *
   * @param string $param[0] username
   * @param string $param[1] (MD5-encoded) password
   * @return qcl_jsonrpc_Response
   */
  function method_authenticate( $params )
  {

    /*
     * check for valid user session
     */
    $validUserSession = $this->isValidUserSession();

    /*
     * authentication with
     */
    if ( count ( $params ) == 2 )
    {

      /*
       * arguments
       */
      $username   = utf8_decode($params[0]);
      $password   = utf8_decode($params[1]);

      /*
       * username-password-authentication
       */
      $userId = $this->authenticate( $username, $password );
      if ( $userId )
      {
        $logMsg = $this->setActiveUserById( $userId );

        /*
         * reset the timestamp of the user
         */
        $activeUser =& $this->getActiveUser();
        $activeUser->resetLastAction();
      }

      /*
       * authentication failed, abort request
       */
      else
      {
        /*
         * log message
         */
        $this->info( $this->getError() );

        return $this->userNotice(
          $this->tr("Wrong username or password.")
        );
      }
    }

    /*
     * one parameter, session Id
     */
    elseif ( count( $params ) == 1 )
    {

      $sessionId = $params[0];

      /*
       * guest acces
       */
      if ( is_null( $sessionId ) )
      {
        if ( $this->guestAccessAllowed() )
        {
          $this->grantGuestAccess();
        }
        else
        {
          $this->userNotice("Guest access denied.");
        }
      }

      /*
       * requesting guest access
       */
      elseif ( is_string( $sessionId ) )
      {

        if ( $this->isValidUserSession( $sessionId ) )
        {
          $activeUser =& $this->getActiveUser();
          $username = $activeUser->username();
          $logMsg = "Continuing session: $username ($sessionId).";
        }
        else
        {
          $this->raiseError("Invalid session id.");
        }
      }

      /*
       * error
       */
      else
      {
        $this->raiseError("Invalid parameters");
      }
    }

    /*
     * error
     */
    else
    {
      $this->raiseError("Wrong parameter count");
    }

    /*
     * access data
     * @todo rename security -> access
     */
    $activeUser =& $this->getActiveUser();
    $permissions = $activeUser->getPermissions();
    $this->set( "permissions", $permissions );

    /*
     * session id
     */
    $sessionId  = $this->getSessionId();
    $this->set( "sessionId",$sessionId);

    /*
     * user data
     */
    $this->set( "userId", $activeUser->getId() );
    $this->set( "username", "anonymous" );
    $this->set( "fullname", $activeUser->get("name") );

    /*
     * log message
     */
    $this->info( $logMsg );

    /*
     * return data to client
     */
    return $this->response();
  }

  /**
   * Sets the active user by a given user id
   * @param $userId
   * @return string log message
   */
  function setActiveUserById( $userId )
  {
    /*
     * check if user is already logged in
     */
    $activeUser =& $this->getActiveUser();

    /*
     * user is already logged in
     */
    if ( $activeUser and $activeUser->getId() == $userId )
    {
      /*
       * log message
       */
      $username  = $activeUser->username();
      $sessionId = $this->getSessionId();
      $logMsg = "$username already logged in. Continuing session #$sessionId.";
    }


    /*
     * user is different from user that owns the session
     */
    else
    {
      /*
       * if an active user exists, log out
       */
      if ( $activeUser )
      {
        $this->logout();
      }

      /*
       * ... create new session
       */
      $this->createSessionId();

      /*
       * save a copy of the current user model as
       * the new active user
       */
      $userModel =& $this->getUserModel( $userId );
      $this->setActiveUser( $userModel );
      $activeUser =& $this->getActiveUser();

      /*
       * save the user id in the session
       */
      qcl_registry_Session::set("activeUserId", $userId );

      /*
       * log message
       */
      $sessionId = $this->getSessionId();
      $logMsg = "Login successful. New session: $username ($sessionId)";
    }

    return $logMsg;
  }

  /**
   * Checks whether a timeout has occurred for a given user
   * @param string $userName user name
   * @return bool true if user can stay logged in, false if logout should be forced
   */
  function checkTimeout()
  {
    /*
     * models
     */
    $configModel =& $this->getConfigModel();
    $activeUser  =& $this->getActiveUser();

    /*
     * timeout
     */
    $timeout = (int) either( /*$configModel->get("qcl.session.timeout")*/null, 30*60 ); // timeout in seconds, defaults to 30 minutes
    $seconds = (int) $activeUser->getSecondsSinceLastAction();

    //$this->debug("User $activeUser, $seconds seconds since last action, timeout is $timeout seconds.");


    /*
     * logout if timeout has occurred
     */
    if ( $seconds > $timeout )
    {
      $userName = $activeUser->username();
      $this->info( "$userName : $seconds seconds after last activity (Timeout $timeout seconds)." );
      return false;
    }

    /*
     * reset the timestamp
     */
    $activeUser->resetLastAction();
    return true;
  }


  /**
   * Returns the current session id. Defaults to PHP session id.
   * Override in parent classes for more sophisticated session handling
   * @return string session id
   */
  function getSessionId()
  {
    return session_id();
  }

  /**
   * Sets the session id. Breaks the current session!
   * @param string $sessionId
   * @return void
   */
  function setSessionId( $sessionId )
  {
    if ( $sessionId != $this->getSessionId() )
    {
      session_destroy();
      session_id( $sessionId );
      session_start();
    }
    qcl_access_Manager::setSessionId( $sessionId );
  }

  /**
   * Creates a new session id.
   * @return string The session id
   */
  function createSessionId( )
  {
    /*
     * create random session id
     */
    $sessionId = md5(microtime());
    $this->setSessionId( $sessionId );
    return $sessionId;
  }

  /**
   * Returns active user object
   * @return qcl_access_model_User
   */
  function &getActiveUser()
  {
    return qcl_access_Manager::getActiveUser();
  }

  /**
   * Sets the active user. This will copy the user id into the
   * session variable, in case the client doesn't provide a session id.
   * @param qcl_access_model_User $userObject A user object or null to logout.
   * @return void
   */
  function setActiveUser( $userObject )
  {
    qcl_access_Manager::setActiveUser( $userObject );
  }

  /**
   * Terminates a session. This logs out the current user.
   * @override
   */
  function method_terminate()
  {
    $this->logout();
    return $this->response();
  }
}
?>