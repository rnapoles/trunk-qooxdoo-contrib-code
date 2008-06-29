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
   * checks if the requesting client is an authenticated use
   * to do the actual authentication, use qcl_access_user::authenticate()
   * @see qcl_access_user::authenticate()
   * @return void
   */
  function authenticate()
  {
    /*
     * models
     */
    $userModel   =& $this->getUserModel();
    $configModel =& $this->getConfigModel();
    
    /*
     * timeout
     */
    $timeout = (int) either( $configModel->get("qcl.session.timeout"), 1800 ); // timeout in seconds, defaults to 30 minutes
    
    /*
     * check authentication and timeout
     */
    if ( $userModel->authenticate() )
    {
      /*
       * user has been authenticated
       */
      $activeUser = $userModel->getActiveUserNamedId();
      
      /*
       * register this session
       */
      $this->registerSession( $activeUser, $timeout );
      
      /*
       * guests have no timeout, check for all others
       */
      if ( $activeUser != $this->anonymous_name )
      {
        $seconds = (int) $userModel->getSecondsSinceLastAction();
        
        //$this->info("bibliograph_controller::authenticate: User $activeUser, $seconds seconds since last action, timeout is $timeout seconds.");
        $userModel->resetLastAction();
        
        if ( $seconds > $timeout )
        {
          // add logout command to message queue
          $this->info( "$seconds seconds after last activity (Timeout $timeout seconds). Logging out user " . $this->userModel->getActiveUserNamedId() . "." );
          $this->dispatchMessage("qcl.commands.logout");
          $userModel->setActiveUser(null);
          return $this->getResponseData();
        } 
        return true; // user is authenticated        
      }
    }
    else
    {
      /*
       * grant guest access
       */
      $userModel->authenticate($this->anonymous_name,$this->anonymous_password);
    }
    
    /*
     * change config model to read-only mode for guest access
     */
    $this->configModel =& $this->getSingleton("qcl_config_session");    
    
    /*
     * shorthand to check if we have guest access
     */
    $this->guestAccess = true;
  }  

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