<?php

/*
 * dependencies
 */
require_once "qcl/access/__index__.php";
require_once "qcl/mvc/controller.php";
require_once "qcl/config/db.php";
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
   * @var qcl_access_user
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
   * @return qcl_access_role
   */
  function &getRoleModel( $id=null )
  {
    $roleModel =& qcl_access_model_Role::getInstance();
    if ( $id ) $roleModel->load( $id );
    return $roleModel;
  }

  /**
   * Gets the role data model
   * @return qcl_access_role
   */
  function &getConfigModel()
  {
    return qcl_config_Db::getInstance();
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

    /*
     * check if given session id is valid. This simply checks
     * if the session corresponds to the existing session id
     */
    if ( ! $sessionId )
    {
      $sessionId = qcl_server_Server::getServerData("sessionId");
    }

    if ( $sessionId )
    {

      /*
       * invalid session id, log out
       */
      if ( $sessionId != $this->getSessionId() )
      {
        $this->logout();
        $this->userNotice("Invalid session id");
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
      }
    }
    else
    {
      $this->setError("No valid session.");
      return false;
    }

    /*
     * If we have an authenticated user, check for timeout etc.
     */
    if ( ! $this->checkTimeout() )
    {
      /*
       * force log out because of timeout
       */
      $this->warn( "Timeout.");
      return false;
    }

    /*
     * success!!
     */
    return true;
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
   * Logs out the the active user. If the user is anonymous, delete its record
   * in the user table.
   * @return bool success
   */
  function logout()
  {
    /*
     * send command to client to force a logout
     */
    $this->dispatchMessage("qcl.commands.logout");

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
        /*
         * check if user is already logged in
         */
        $activeUser =& $this->getActiveUser();

        if ( $activeUser and $activeUser->getId() == $userId )
        {
          /*
           * log message
           */
          $username  = $activeUser->username();
          $sessionId = $this->getSessionId();
          $logMsg = "$username already logged in. Continuing session #$sessionId.";
        }

        else
        {
          /*
           * if a username has been provided and an active
           * user exists, log out the active user
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
          qcl_registry_Session::set("activeUserId", $userId );
          $this->setActiveUser( $userModel );
          $activeUser =& $this->getActiveUser();

          /*
           * log message
           */
          $sessionId = $this->getSessionId();
          $logMsg = "Login successful. New session: $username ($sessionId)";
        }

        /*
         * reset the timestamp of the user
         */
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
     * message to indicate login success
     */
    $this->set( "username", $username );
   // $this->set( "fullname", $activUser-> );

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

    //$this->debug("bibliograph_controller::authenticate: User $activeUser, $seconds seconds since last action, timeout is $timeout seconds.");
    $activeUser->resetLastAction();

    /*
     * logout if timeout has occurred
     */
    if ( $seconds > $timeout )
    {
      $userName = $activeUser->username();
      $this->info( "$userName : $seconds seconds after last activity (Timeout $timeout seconds)." );

      /*
       * force logout on client
       */
      $this->dispatchMessage( "qcl.commands.logout" );

      return false;
    }

    /*
     * no timeout
     */
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
   * @return qcl_access_user
   */
  function &getActiveUser()
  {
    return qcl_access_Manager::getActiveUser();
  }

  /**
   * Sets the active user. This will copy the user id into the
   * session variable, in case the client doesn't provide a session id.
   * @param qcl_access_user $userObject A user object or null to logout.
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