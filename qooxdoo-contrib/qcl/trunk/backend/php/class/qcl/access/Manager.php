<?php
require_once "qcl/core/Object.php";

/**
 * Static class containing methods that handle user management etc.
 * @author bibliograph
 */
class qcl_access_Manager
  extends qcl_core_Object
{

  /**
   * The currently active user or null
   * @var qcl_access_model_User
   */
  var $_activeUser;

  /**
   * The access controller object
   * @var qcl_access_Controller
   */
  var $_accessController;

  /**
   * The current session id
   */
  var $_sessionId;

  /**
   * The session model
   * @var qcl_access_model_Session
   */
  var $_sessionModel;

  /**
   * Returns a singleton instance of this class
   * @return qcl_access_Manager
   */
  function &getInstance( )
  {
    if ( ! is_object( $GLOBALS[__CLASS__] ) )
    {
      $GLOBALS[__CLASS__] =& new qcl_access_Manager;
    }
    return $GLOBALS[__CLASS__];
  }

  /**
   * Sets the session id. The session id must be set by the access
   * controller. Can be called statically.
   * @param $sessionId
   * @return void
   */
  function setSessionId( $sessionId )
  {
    $_this =& qcl_access_Manager::getInstance();
    $_this->_sessionId = $sessionId;
  }

  /**
   * Returns the session id. Can be called statically.
   * @return string
   */
  function getSessionId()
  {
    $_this =& qcl_access_Manager::getInstance();
    return $_this->_sessionId;
  }

  /**
   * Returns the session model used by this manager. Can be
   * called statically
   * @return qcl_access_model_Session
   */
  function &getSessionModel()
  {
    $_this =& qcl_access_Manager::getInstance();
    return $_this->_sessionModel;
  }

  /**
   * Sets the session model used by this manager. Can be
   * called statically.
   * @param qcl_access_model_Session
   * @return void
   */
  function &setSessionModel( $sessionModel )
  {
    $_this =& qcl_access_Manager::getInstance();
    $_this->_sessionModel =& $sessionModel;
  }

  /**
   * Returns active user object. Can be called statically.
   * @return qcl_access_model_User
   */
  function &getActiveUser()
  {
    $_this =& qcl_access_Manager::getInstance();
    return $_this->_activeUser;
  }


  /**
   * Sets the active user. This will copy the user id into the
   * session variable, in case the client doesn't provide a session id.
   * @param qcl_access_model_User $userObject A user object or null to logout.
   * @return void
   */
  function setActiveUser( $userObject )
  {
    if ( is_a( $userObject, "qcl_core_Object" ) )
    {
      $_this =& qcl_access_Manager::getInstance();
      $_this->_activeUser = $userObject->cloneObject();
    }
    elseif ( is_null ( $userObject ) )
    {
      $_this->_activeUser  = null;
    }
    else
    {
      $this->raiseError("Invalid parameters");
    }
  }


  /**
   * Returns the current access controller instance, if any.
   * @return qcl_access_SessionController
   */
  function &getAccessController()
  {
    $_this =& qcl_access_Manager::getInstance();
    if ( ! $_this->_accessController )
    {
      require_once "qcl/access/SessionController.php";
      require_once "qcl/persistence/db/Object.php"; // @todo fix this dependency
      $_this->_accessController =& new qcl_access_SessionController( &$this );
    }
    return $_this->_accessController;
  }

  /**
   * Check the accessibility of service object and service
   * method. Aborts request when access is denied. Access is
   * granted when
   * - the called method's name is "authenticate"
   * - or $skipAuthentication property of the object is 'true'
   * - or a valid user session exists
   * - or the no allowAccess() method exist or this method evaluated to 'true'.
   * In all other cases, access is denied.
   * @override
   * @param $serviceObject
   * @param $method
   * @return void
   */
  function controlAccess( $serviceObject, $method )
  {
    $_this =& qcl_access_Manager::getInstance();
    $accessController =& $_this->getAccessController();

    if( ! $serviceObject->skipAuthentication
        and ! $accessController->isValidUserSession()
        or ( method_exists( $serviceObject, "allowAccess")
           and ! $serviceObject->allowAccess( $method ) ) )
    {
      /*
       * abort request
       */
      $this->warn( $accessController->getError() );
      qcl_server_Server::abort( qcl_application_Application::tr("Access was denied ...") );
      exit;
    }
  }

  /**
   * Abort with error if active user doesn't have permission
   * @return void
   * @param $permission String
   */
  function requirePermission ( $permission )
  {
    $_this =& qcl_access_Manager::getInstance();
    if ( ! $_this->hasPermission( $permission ) )
    {
      $activeUser =& $_this->getActiveUser();
      $userName  = $activeUser ? $activeUser->username() : "";
      qcl_application_Application::warn("Not allowed. User '$userName' does not have permission '$permission'" );
      qcl_server_Server::abort( $this->tr("Not allowed.") );
    }
  }

  /**
   * Checks if active user has a permission
   * @return boolean
   * @param $permission String
   */
  function hasPermission ( $permission )
  {
    $_this =& qcl_access_Manager::getInstance();
    $controller =& qcl_server_Server::getController();

    /*
     * check if this permission has a local alias
     */
    if ( $controller &&  $alias = $this->hasPermissionAlias($controller, $permission) )
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
   * @param qcl_data_Controller $controller
   * @param string $permission
   */
  function hasPermissionAlias( $controller, $permission )
  {
    if ( is_array($controller->permisssionAliasMap) )
    {
      return $controller->permisssionAliasMap[$permission];
    }
    else
    {
      return false;
    }
  }

}
?>