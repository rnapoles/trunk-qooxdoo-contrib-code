<?php

/*
 * dependencies
 */
require_once "qcl/db/controller.php";

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
   * name of anonymous user
   */
  var $anonymous_name      = "guest";
  
  /**
   * password of anonymous user
   */
  var $anonymous_password  = "guest";  
    
  /**
   * constructor. initializes access/config model
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

  //-------------------------------------------------------------
  // setup models 
  //-------------------------------------------------------------
  
  /**
   * Initializes all the models needed for the controller. All models
   * are database-based and are singletons
   * override if necessary
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
  }   

  //-------------------------------------------------------------
  // authentication and access control
  //-------------------------------------------------------------
 
  /**
   * whether the given user name is the name of a guest (anonymous) user
   * @param string $userName 
   * @return bool True if user name is guest
   * @todo: we need some more sophisticated stuff here
   */
  function isGuest($userName)
  {
    return ( $userName == $this->anonymous_name ) ;
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
    
    /*
     * check authentication 
     */
    if ( $userModel->authenticate() )
    {
      /*
       * user has been authenticated
       */
      $activeUser = $userModel->getActiveUserNamedId();
      
      /*
       * check the user session for timeouts etc.
       */
      if ( $this->checkTimeout($activeUser) )
      {
        /*
         * user is authenticated, simply return
         */
        return true;     
      }
      
      /*
       * force log out
       */
      $this->dispatchMessage("qcl.commands.logout");
      $userModel->setActiveUser(null);
      return false;         
    }
    else
    {
      /*
       * we have an anonymous user, grant guest access
       * @todo: each guest user should have an individual
       * userid.
       */
      $userModel->authenticate($this->anonymous_name,$this->anonymous_password);
    
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
  function checkTimeout( $userName )
  {
    /*
     * models
     */
    $configModel =& $this->getConfigModel();
    $userModel   =& $this->getUserModel();

    if ( $this->isGuest( $userName ) )
    {
      /*
       * guests have no timeout
       */
      return true;
    }
    
    /*
     * timeout
     */
    $timeout = (int) either( $configModel->get("qcl.session.timeout"), 1800 ); // timeout in seconds, defaults to 30 minutes
    $seconds = (int) $userModel->getSecondsSinceLastAction();
    
    /*
     * register this session if parent class provides this. 
     */
    $this->registerSession( $userName, $timeout );
        
    //$this->info("bibliograph_controller::authenticate: User $activeUser, $seconds seconds since last action, timeout is $timeout seconds.");
    $userModel->resetLastAction( $userName );
    
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
  
  //-------------------------------------------------------------
  // convenience methods
  //-------------------------------------------------------------
  
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