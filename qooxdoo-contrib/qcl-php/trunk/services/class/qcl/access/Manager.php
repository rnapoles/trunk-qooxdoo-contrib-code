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
  private $_activeUser;

  /**
   * The access controller object
   * @var qcl_access_Controller
   */
  private $_accessController;

  /**
   * The current session id
   */
  private $_sessionId;

  /**
   * The session model
   * @var qcl_access_model_Session
   */
  private $_sessionModel;

  /**
   * Returns a singleton instance of this class
   * @return qcl_access_Manager
   */
  public static function getInstance()
  {
    return qcl_getInstance(__CLASS__);
  }

  /**
   * Sets the session id. The session id must be set by the access
   * controller. Can be called statically.
   * @param $sessionId
   * @return void
   */
  public function setSessionId( $sessionId )
  {
    $this->_sessionId = $sessionId;
  }

  /**
   * Returns the session id. Can be called statically.
   * @return string
   */
  public function getSessionId()
  {
    return $this->_sessionId;
  }

  /**
   * Returns the session model used by this manager. Can be
   * called statically
   * @return qcl_access_model_Session
   */
  public function getSessionModel()
  {
    return $this->_sessionModel;
  }

  /**
   * Sets the session model used by this manager. Can be
   * called statically.
   * @param qcl_access_model_Session
   * @return void
   */
  public function setSessionModel( $sessionModel )
  {
    $this->_sessionModel = $sessionModel;
  }

  /**
   * Returns active user object. Can be called statically.
   * @return qcl_access_model_User
   */
  public function getActiveUser()
  {
    return $this->_activeUser;
  }

  /**
   * Getter for server object
   * @return unknown_type
   */
  public function getServer()
  {
    return $this->getApplication()->getServer();
  }


  /**
   * Sets the active user. This will copy the user id into the
   * session variable, in case the client doesn't provide a session id.
   * @param qcl_access_model_User $userObject A user object or null to logout.
   * @return void
   */
  public function setActiveUser( $userObject )
  {
    if ( is_a( $userObject, "qcl_core_Object" ) )
    {
      $this->_activeUser = $userObject->cloneObject();
    }
    elseif ( is_null ( $userObject ) )
    {
      $this->_activeUser  = null;
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
  public function getAccessController()
  {
    if ( ! $this->_accessController )
    {
      require_once "qcl/access/SessionController.php";
      require_once "qcl/data/persistence/db/Object.php"; // @todo fix this dependency
      $this->_accessController = new qcl_access_SessionController( $this );
    }
    return $this->_accessController;
  }

  /**
   * Check the accessibility of service object and service
   * method. Aborts request when access is denied.
   *
   * Access is granted when
   * - the called method's name is "authenticate", or
   * - $skipAuthentication property of the object is 'true', or
   * - a valid user session exists, or
   * - either no allowAccess() method exists or this method evaluated to 'true'.
   *
   * In all other cases, access is denied.
   * @override
   * @param $serviceObject
   * @param $method
   * @return void
   */
  public function controlAccess( $serviceObject, $method )
  {
    $accessController = $this->getAccessController();

    if( ! $serviceObject->skipAuthentication
        and ! $accessController->isValidUserSession()
        or ( method_exists( $serviceObject, "allowAccess")
           and ! $serviceObject->allowAccess( $method ) ) )
    {
      /*
       * abort request
       */
      $this->warn( $accessController->getError() );
      $this->getServer()->abort( qcl_application_Application::tr("Access was denied ...") );
      exit;
    }
  }

  /**
   * Abort with error if active user doesn't have permission
   * @return void
   * @param $permission String
   */
  public function requirePermission ( $permission )
  {
    if ( ! $this->hasPermission( $permission ) )
    {
      $activeUser = $this->getActiveUser();
      $userName  = $activeUser ? $activeUser->username() : "";
      qcl_application_Application::getInstance()->warn("Not allowed. User '$userName' does not have permission '$permission'" );
      $this->getServer()->abort( $this->tr("Not allowed.") );
    }
  }

  /**
   * Checks if active user has a permission.
   * @return boolean
   * @param $permission String
   */
  public function hasPermission ( $permission )
  {
    $controller = $this->getServer()->getController();

    /*
     * check if this permission has a local alias
     */
    if ( is_a( $controller, "qcl_data_controller_Controller" )
         &&  $alias = $controller->hasPermissionAlias( $permission ) )
    {
      $permission = $alias;
    }

    /*
     * check if (active) user has permission
     */
    $activeUser = $this->getActiveUser();
    if ( $activeUser and $activeUser->hasPermission( $permission ) )
    {
      return true;
    }
    else
    {
      return false;
    }
  }

}
?>