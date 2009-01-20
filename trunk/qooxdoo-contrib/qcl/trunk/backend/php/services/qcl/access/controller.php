<?php

/*
 * dependencies
 */
require_once "qcl/db/controller.php";
require_once "qcl/access/user.php";
require_once "qcl/access/role.php";
require_once "qcl/access/permission.php";
require_once "qcl/config/db.php";

/*
 * constants
 */
define('QCL_ACTIVE_USER_ID_VAR', "qcl_access_user_activeUserId");
define('QCL_ANONYMOUS_USER_PREFIX', "anonymous_");

/**
 * Base class thathandles authentication, access control
 * and configuration
 */
class qcl_access_controller extends qcl_db_controller
{
  /**
   * user model singleton. 
   * To access, use getUserModel()
   * @access private
   * @var qcl_access_user or subclass
   */
  var $userModel = null;
  
  
  /**
   * The currently active user, determined from request or 
   * from session variable. Is a user model instance
   * @access private
   * @var qcl_access_user
   */
  var $_activeUser = null;
  
  /**
   * role model singleton.
   * To access, use getRoleModel()
   * @access private
   * @var qcl_access_role or subclass
   */
  var $roleModel = null;  

  /**
   * permission model singleton.
   * To access, use getPermissionModel()
   * @access private
   * @var qcl_access_permission or subclass
   */
  var $permissionModel = null;

  /**
   * configuration data model singleton.
   * To access, use getConfigModel()
   * @access private
   * @var qcl_config or subclass
   */
  var $configModel = null;

  /**
   * Map pairing permission names with local aliases
   * @var array
   */
  var $permisssionAliasMap;  
  
  /**
   * Constructor. initializes access/config model
   */
  function __construct()
  {
  
    /*
     * call parent constructor, this will initialize database
     * connection
     */
    parent::__construct();
    
    /*
     * initialize access and config models based on connection
     */
    $this->initializeModels();
    
  }     

  /**
   * Initializes all the models needed for the controller. All models
   * are database-based and are singletons.
   * @return void
   */
  function initializeModels()
  { 
    
    /*
     * user model
     */
    $this->userModel =& $this->getSingleton("qcl_access_user");
    
    /*
     * role model
     */
    $this->roleModel =& $this->getSingleton("qcl_access_role");
    
    /*
     * permission model
     */
    $this->permissionModel =& $this->getSingleton("qcl_access_permission");

    /*
     * configuration model
     */
    $this->configModel =& $this->getSingleton("qcl_config_db");
    
    /*
     * @todo
     * PHP4 hack!!!! The controller object's reference is not correctly
     * passed on to the model objects - somewhere there is a copy 
     * passed for whatever reason.
     */
    $this->userModel->_controller =& $this;
    $this->roleModel->_controller =& $this;
    $this->permissionModel->_controller =& $this;
    $this->configModel->_controller =& $this;
    
  }   
  
  /**
   * This is the main access control function. It will check whether a valid
   * user session exists, and do nothing if this is so. If not, it checks whether 
   * guest access is enabled, and grant guest access if this is the case. 
   * Otherwise (no valid session and no guest access), it refuses access to
   * the called function by aborting the request. 
   */
  function controlAccess()
  {
    /*
     * check for valid user session unless the requested method
     * is an authentication or one requesting guest access 
     */ 
    if (  ! in_array( $this->request->getMethod(), array( "authenticate", "guestAccess" ) ) )
    {
      /*
       * initiate logut if no valid user session
       */
      if ( ! $this->isValidUserSession() )
      { 
        /*
         * logout on server
         */
        $this->logout();
        
        /*
         * logout on client
         */
        $this->dispatchMessage("qcl.commands.logout");
        $this->dispatchMessage("qcl.commands.setSessionId","");
        $this->alert($this->tr("Session is invalid or has expired. Please log in again."));
        
        /*
         * make sure that method call is not executed
         */
        $this->abortRequest();
        
        return;
      }  
    }      
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
     * @todo: authenticate with credentials
     * sent by the request itself
     */
    
    /*
     * models
     */
    $configModel =& $this->getConfigModel();
    $activeUser  =& $this->getActiveUser();    
        
    /*
     * if we don't have an active user yet, grant guest access if
     * allowed
     */
    if ( ! $activeUser  )
    {
      if ( $this->getIniValue("service.allow_guest_access") )
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
      $activeUser = $userModel->cloneObject();
      $activeUser->resetLastAction();
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
     * return security data
     */
    return $this->method_authenticate();
  }  
  
  /**
   * Grant guest access
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
    $this->setActiveUser( $userModel->cloneObject() );
    $userId = $userModel->getId();
    $sessionId = $this->getSessionId();

    /*
     * change config model to read-only mode for guest access
     */
    $this->configModel =& $this->getSingleton("qcl_config_session");      

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
        return $this->alert("Access denied");
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
        $this->dispatchMessage( 
          "qcl.messages.login.failed", 
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
      $logMsg = "Continuing session: $username ($sessionId).";  
    }

    /*
     * access data
     * @todo rename security -> access
     */
    $activeUser = $this->getActiveUser();
    $securityData = $activeUser->securityData();
    $this->set("security", $securityData );
    
    /*
     * session id
     */
    $sessionId  = $this->getSessionId();
    $this->dispatchMessage("qcl.commands.setSessionId",$sessionId);
    
    /*
     * message to indicate login success
     */
    $this->dispatchMessage( "qcl.messages.login.success" );
    
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
   * @todo Active user should not be stored in user model, but in controller - is one copy of a user model!!!
   */
  function &getActiveUser()
  {
    $activeUserId = $this->getActiveUserId();
    
    /*
     * no active user
     */
    if ( ! $activeUserId )
    {
      return null;
    }
        
    /*
     * create a user model instance and load user data
     */
    if ( ! $this->_activeUser )
    {
      $userModel =& $this->getUserModel();
      $this->_activeUser =& $userModel->cloneObject();
      $this->_activeUser->load( $activeUserId );
    }
    
    /*
     * return the existing or created instance
     */
    return $this->_activeUser;
  }
  
  /**
   * Returns the active user's id for a simple session model
   * based on a PHP session.
   * @return int
   */
  function getActiveUserId( )
  {
    return $_SESSION[QCL_ACTIVE_USER_ID_VAR];
  }
  
  /**
   * Sets the active user. This will copy the user id into the 
   * session variable, in case the client doesn't provide a session id.
   * @param qcl_access_user $userObject A user object or null to logout.
   * @return void
   */
  function setActiveUser( $userObject )
  {
    $userModel =& $this->getUserModel();
    
    /*
     * set new active user
     */
    if ( is_null( $userObject ) or is_a( $userObject, $userModel->className() ) )
    {
      if ( $userObject )
      {
        $this->setActiveUserId( $userObject->getId() );
        $this->_activeUser =& $userObject;
      }
      else
      {
        $this->setActiveUserId( null );
        $this->_activeUser = null;
      }
    }
    else
    {
      $this->raiseError("Active user object must be NULL or of class '". $userModel->className() . "', but is '" .
       ( is_object($userObject) ? get_class($userObject) : gettype( $userObject) ) . "'.");
    }
  }  
  
  /**
   * Sets the active user's id for a simple session model
   * based on a PHP session.
   * @param int $id
   */
  function setActiveUserId( $id )
  {
    $_SESSION[QCL_ACTIVE_USER_ID_VAR] = $id;
  }
  
  
  /**
   * Abort with error if active user doesn't have permission
   * @return void
   * @param $permission String
   */
  function requirePermission ( $permission )
  {
    if ( ! $this->hasPermission( $permission ) )
    {
      $activeUser =& $this->getActiveUser();
      $userName  = $activeUser ? $activeUser->username() : "";
      $this->warn("Not allowed. User '$userName' does not have permission '$permission'" );
      $this->userNotice( $this->tr("Not allowed.") );
    }
  }
  
  /**
   * checks if active user doesn't has permission
   * @return boolean
   * @param $permission String
   */
  function hasPermission ( $permission )
  {
    /*
     * check if this permission has a local alias
     */
    if ( $alias = $this->hasPermissionAlias($permission) )
    {
      $permission = $alias;
    }
    
    /*
     * check if (active) user has permission 
     */
    $activeUser =& $this->getActiveUser();
    if ( $activeUser and $activeUser->hasPermission( $permission ) )
    {
      return true;  
    }
    else
    {
      return false;
    }
  } 
  
  /**
   * Checks if permission has an application-specific
   * name. This allows to reuse a global permission for a
   * specific service class without giving the user the same
   * right in a different service class. Simple implementation
   * uses a hash map to pair permissions with their
   * local aliases. More elaborate implementations are certainly
   * possible. 
   * @param string $permission
   */
  function hasPermissionAlias( $permission )
  {
    return $this->permisssionAliasMap[$permission];    
  }
  
  /**
   * Overrridden method to allow debugging of response data
   * @override
   * @return array
   * @todo json debug 
   */
  function &response()
  {
    /*
     * get response object from parent method
     */
    $response =& parent::response(); 
    
    /*
     * check if we should do a dump of it
     */
    $configModel =& $this->getConfigModel();
    if ( $configModel->get("qcl.jsonrpc.Server.dumpResponse") )
    {
      $this->info((array) $response );
    }
    
    return $response;
  }   
  
} 
?>