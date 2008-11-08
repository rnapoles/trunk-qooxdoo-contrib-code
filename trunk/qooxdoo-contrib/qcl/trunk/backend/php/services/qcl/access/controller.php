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
   * Authenticate the user
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
     * user model
     */
    $userModel =& $this->getUserModel();
    
    /*
     * get the active user data (or null if nobody is logged in)
     */
    $activeUser = $userModel->getActiveUser();
    
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
      $username     = $activeUser->getNamedId();
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
     * username
     */
    if ( $activeUser )
    {
      $this->info ( $activeUser->getNamedId() . " logs out." );  
    }
    
    /*
     * delete active user
     */
    $userModel->setActiveUser(null);
    
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
   * @see qcl_access_user::authenticate()
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
    $userModel   =& $this->getUserModel();
    $activeUser  =& $userModel->getActiveUser();

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
   * gets active user
   * @return qcl_access_user
   */
  function getActiveUser()
  {
    $userModel =& $this->getUserModel();
    return $userModel->getActiveUser();
  }
  
  /**
   * abort with error if active user doesn't have permission
   * @return void
   * @param $permission String
   */
  function requirePermission ( $permission )
  {
    $userModel =& $this->getUserModel();
    $userModel->requirePermission( $permission );
  }
  
  /**
   * checks if active user doesn't has permission
   * @return boolean
   * @param $permission String
   */
  function hasPermission ( $permission )
  {
    $userModel =& $this->getUserModel();
    return $userModel->hasPermission( $permission );
  }   
   
} 
?>