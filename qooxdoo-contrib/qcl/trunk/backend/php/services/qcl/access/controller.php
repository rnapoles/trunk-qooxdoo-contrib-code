<?php

/*
 * dependencies
 */
require_once "qcl/db/controller.php";
require_once "qcl/access/user.php";
require_once "qcl/access/role.php";
require_once "qcl/access/permission.php";
require_once "qcl/config/db.php";


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
     * hack!!!! The controller object's reference is not correctly
     * passed on to the model objects - somewhere there is a copy 
     * passed for whatever reason.
     */
    $this->userModel->_controller =& $this;
    $this->roleModel->_controller =& $this;
    $this->permissionModel->_controller =& $this;
    $this->configModel->_controller =& $this;
    
  }   
 
  /**
   * Provide guest access to backend services
   * @todo Rework this 
   */
  function method_guestAccess()
  {
    $this->logout();
    $this->authenticate(); // this creates guest access
    return $this->method_authenticate();
  }
  
  
  /**
   * Actively authenticate the user with username and password. This is different
   * from the (passive) authenticate() method.
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
     * Get user model and active user object
     */
    $userModel  =& $this->getUserModel();
    $activeUser =& $userModel->getActiveUser();

    /*
     * Authenticate user if user name has been provided
     * and password matches
     */
    if ( $username and $userModel->authenticate ( $username, $password ) )
    {

      /*
       * get client security data
       */
      $securityData = $userModel->securityData();

      /*
       * message that login was successful
       */
      $this->dispatchMessage("qcl.messages.login.success"); 
      $this->info ("Logging on user $username.");   
    }
    
    /*
     * otherwise, if we have no username, but a user is already
     * logged in, use the data of this user
     */
    elseif ( ! $username and $activeUser  )
    {
      
      /*
       * user already logged in, get username and security data from active user
       */
      $username     = $activeUser->username();
      $securityData = $activeUser->securityData();
      
      /*
       * message that login was successful
       */
      $this->dispatchMessage("qcl.messages.login.success", $username );
    }
    
    /*
     * otherwise, we assume that invalid authentication data has been 
     * provided
     */
    else
    {
      /*
       * authentication failed
       */
      $securityData = null;
      
      /*
       * message
       */
      $this->dispatchMessage( "qcl.messages.login.failed", $this->tr("Wrong username or password.") );
    }

    /*
     * return client data
     */
    $this->set("security", $securityData ); 
    return $this->response();
  }   
   
  /**
   * Logout current user
   * @return void
   */
  function logout()
  {
    /*
     * user model
     */
    $userModel  =& $this->getUserModel();
    $activeUser =& $userModel->getActiveUser();
    
    /*
     * delete active user
     */
    if ( $activeUser )
    {
      $this->info ( $activeUser->username() . " logs out." );  
      $userModel->setActiveUser(null);      
    }
        
    /*
     * message to indicate that server has logged out
     */
    $this->dispatchMessage("qcl.messages.logout");
  }   
  
  /**
   * rpc service method to log out the active user.
   * @return qcl_jsonrpc_Response
   */
  function method_logout()
  {
    $this->logout();
    
    /*
     * return client data
     */
    return $this->response();
  }
  
  /**
   * Passively checks if the requesting client is an authenticated user.
   * For the actual active authentication, use qcl_access_user::authenticate()
   * @see qcl_access_user::method_authenticate()
   * @return bool True if request can continue, false if it should be aborted
   */
  function authenticate()
  {

    /*
     * models
     */
    $userModel   =& $this->getUserModel();
    $configModel =& $this->getConfigModel();
    $activeUser  =& $userModel->getActiveUser();
    
    /*
     * check authentication 
     */
    if ( $activeUser )
    {
      /*
       * user has been authenticated
       * check the user session for timeouts etc.
       */
      if ( $this->checkTimeout() )
      {
        /*
         * user is authenticated, simply return
         */
        return true;     
      }
      
      /*
       * force log out because of timeout
       */
      $this->logout();
      return false;         
    }
    else
    {
      /*
       * we have an anonymous user, grant guest access
       * @todo: each guest user should have an individual
       * userid.
       */
      $userModel->guestAccess();
    
      /*
       * change config model to read-only mode for guest access
       */
      $this->configModel =& $this->getSingleton("qcl_config_session");    
      
      /*
       * shorthand to check if we have guest access
       * @todo remove
       */
      $this->guestAccess = true;
      
      return true;
    }  
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
     * no timeout check if not authenticated or guest access
     */    
    if ( ! $activeUser or $activeUser->isGuest() )
    {
      return true;
    }
    
    /*
     * timeout
     */
    $timeout = (int) either( $configModel->get("qcl.session.timeout"), 1800 ); // timeout in seconds, defaults to 30 minutes
    $seconds = (int) $activeUser->getSecondsSinceLastAction();
    
    /*
     * register this session if parent class provides this. 
     */
    $this->registerSession( $userName, $timeout );
        
    //$this->info("bibliograph_controller::authenticate: User $activeUser, $seconds seconds since last action, timeout is $timeout seconds.");
    $activeUser->resetLastAction();
    
    /*
     * logout if timeout has occurred
     */
    if ( $seconds > $timeout )
    {
      $userName = $activeUser->username();
      $this->info( "$userName : $seconds seconds after last activity (Timeout $timeout seconds). Logging out." );
      return false;
    }     
    
    /*
     * no timeout
     */
    return true;
  }
  
  /**
   * empty stub to be overridden by parent classes
   */
  function registerSession() {}
  
  /**
   * Returns active user object
   * @return qcl_access_user
   */
  function &getActiveUser()
  {
    $userModel =& $this->getUserModel();
    return $userModel->getActiveUser();
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
      $this->info("Not allowed. User '" . $activeUser->username() . "' does not have permission '$permission'" );
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
     * check if this permission has a local 
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