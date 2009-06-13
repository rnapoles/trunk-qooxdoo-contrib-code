<?php

/*
 * dependencies
 */
require_once "qcl/mvc/controller.php";
require_once "qcl/access/user.php";
require_once "qcl/access/role.php";
require_once "qcl/access/permission.php";
require_once "qcl/config/db.php";

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
class qcl_access_controller
  extends qcl_mvc_controller
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
   * @return qcl_access_user
   */
  function &getUserModel()
  {
    return qcl_access_User::getInstance();
  }

  /**
   * Gets the permission data model
   * @return qcl_access_permission
   */
  function &getPermissionModel()
  {
    return qcl_access_Permission::getInstance();
  }

  /**
   * Gets the role data model
   * @return qcl_access_role
   */
  function &getRoleModel()
  {
    return qcl_access_Role::getInstance();
  }


  /**
   * Checks if the requesting client is an authenticated user.
   * @return bool True if request can continue, false if it should be aborted with
   * a "access denied" exception.
   * @return bool success
   */
  function isValidUserSession()
  {

    /*
     * models
     */
    $activeUser  =& $this->getActiveUser();

    /*
     * if we don't have an active user yet, grant guest access if
     * allowed
     */
    if ( ! $activeUser  )
    {
      if ( qcl_application_Application::getIniValue("service.allow_guest_access") )
      {
        $this->grantGuestAccess();
      }
      else
      {
        $this->warn( "Guest access was denied.");
        return false;
      }
    }

    /*
     * If we have an authenticated user, check for timeout etc.
     */
    elseif ( ! $this->checkTimeout() )
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
   * @return boolean success
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
      $this->setError( $this->tr("Unknown user name.") );
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
      /*
       * reset the timestamp of the user
       */
      $activeUser->resetLastAction();

      /*
       * save it as active user
       */
      $this->setActiveUser( $activeUser );
      return true;
    }
    else
    {
      $this->setError($this->tr( "Wrong Password" ) );
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
   * Provide guest access to backend services
   * @todo Rework this
   */
  function method_guestAccess()
  {
    /*
     * Check if guest access is allowed at all
     */
    if ( ! $this->getIniValue("service.allow_guest_access") )
    {
      return $this->alert( $this->tr("Guest access denied.") );
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
    return $this->method_authenticate();
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
   * Actively authenticate the user with username and password. This is different
   * from the (passive) authenticate() method, which normally checks for a already
   * authenticated user.
   * @see qcl_access_controller::authenticate()
   * @param string $param[0] username
   * @param string $param[1] (MD5-encoded) password
   * @return qcl_jsonrpc_Response Data for qcl.auth.user.Manager.setSecurity()
   */
  function method_authenticate( $params=array() )
  {

    /*
     * arguments
     */
    $username   = utf8_decode($params[0]);
    $password   = utf8_decode($params[1]);

    /*
     * is the request part of a valid user session?
     * this will setup the active user or create guest access,
     * if allowed.
     */
    $isValidUserSession = $this->isValidUserSession();

    /*
     * Get active user object
     */
    $activeUser =& $this->getActiveUser();

    /*
     * if a username has been provided and an active
     * user exists, log out the active user
     */
    if ( $username and $activeUser )
    {
      $this->logout();
    }

    /*
     * otherwise, this is a passive authentication which was requested
     * to retrieve access data for anonymous guests
     */
    else
    {
      /*
       * if guest access fails, abort request
       */
      if ( ! $isValidUserSession )
      {
        $this->warn("Guest access was denied.");
        return $this->alert(
          $this->tr("Access denied")
        );
      }
    }

    /*
     * Authenticate user if user name has been provided
     * and password matches
     */
    if ( $username )
    {

      /*
       * if password-authentication is successful ...
       */
      if ( $this->authenticate( $username, $password ) )
      {
        /*
         * ... create new session
         */
        $this->createSessionId();
        $this->registerSession();
        $sessionId = $this->getSessionId();
        $logMsg = "Login successful. New session: $username ($sessionId)";
      }

      /*
       * else, abort request
       */
      else
      {
        /*
         * authentication failed
         */
        $this->info("Login failed.");
        return $this->alert(
          $this->tr("Wrong username or password.")
        );
        return $this->response();
      }
    }

    /*
     * we are continuing an existing sesstion
     */
    else
    {
      $sessionId = $this->getSessionId();
      $activeUser =& $this->getActiveUser();
      $username = $activeUser->username();
      $logMsg = "Continuing session: $username ($sessionId).";
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
    $timeout = (int) either( $configModel->get("qcl.session.timeout"), 30*60 ); // timeout in seconds, defaults to 30 minutes
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