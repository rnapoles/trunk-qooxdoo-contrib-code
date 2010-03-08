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
require_once "qcl/access/IAccessBehavior.php";

/**
 * Whether the application allows anonymous access. Defaults to false
 * @var bool
 */
if( ! defined("QCL_ACCESS_ANONYMOUS_LOGIN") )
{
  define("QCL_ACCESS_ANONYMOUS_LOGIN", false);
}


/**
 * Behavior that handles access to the service methods
 * @author bibliograph
 */
class qcl_access_Behavior
  extends qcl_core_Object
  implements qcl_access_IAccessBehavior
{

  /**
   * Returns the session id.
   * @return string
   */
  public function getSessionId()
  {
    return $this->getAccessController()->getSessionId();
  }

  /**
   * Getter for session model
   * @return unknown_type
   */
  public function getSessionModel()
  {
    return $this->getAccessController()->getSessionModel();
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
   * Returns the current access controller instance, if any.
   * @return qcl_access_SessionController
   */
  public function getAccessController()
  {
    static $accessController = null;
    if ( is_null( $accessController ) )
    {
      require_once "qcl/access/SessionController.php";
      $accessController = new qcl_access_SessionController( $this );
    }
    return $accessController;
  }

  /**
   * Shorthand getter for the permission model of the access controller
   * @return qcl_access_model_Permission
   */
  public function getPermissionModel()
  {
    return $this->getAccessController()->getPermissionModel();
  }

  /**
   * Shorthand getter for the user model of the access controller
   * @return qcl_access_model_User
   */
  public function getUserModel()
  {
    return $this->getAccessController()->getUserModel();
  }

  /**
   * Shorthand getter for the role model of the access controller
   * @return qcl_access_model_Role
   */
  public function getRoleModel()
  {
    return $this->getAccessController()->getRoleModel();
  }

  /**
   * Whether guest access to the service classes is allowed
   * @return unknown_type
   */
  public function isAnonymousAccessAllowed()
  {
    return QCL_ACCESS_ANONYMOUS_LOGIN;
  }

  /**
   * Shorthand getter for active user object
   * @return qcl_access_model_User
   */
  public function getActiveUser()
  {
    return $this->getAccessController()->getActiveUser();
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
      $this->warn("Not allowed. User '$userName' does not have permission '$permission'" );
      throw new qcl_access_AccessDeniedException("Access denied");
    }
  }

  public function hasRole( $role )
  {
    $activeUser = $this->getActiveUser();
    return $activeUser->hasRole( $role );
  }

  /**
   * Checks if active user has a permission.
   * @return boolean
   * @param $permission String
   */
  public function hasPermission ( $permission )
  {
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

  /**
   * Check the accessibility of service object and service
   * method. Aborts request when access is denied, unless when the method name is
   * "authenticate"
   * @param qcl_core_Object $serviceObject
   * @param string $method
   * @return void
   */
  public function controlAccess( qcl_core_Object $serviceObject, $method )
  {
    $this->log("Checking access to service object '" . $serviceObject->className() . "'", "access" );
    $accessController =  $this->getAccessController();
    try
    {
      $accessController->createUserSession();
    }
    catch( qcl_access_AccessDeniedException $e)
    {
      if ( $this->isAnonymousAccessAllowed() or $method=="authenticate" )
      {
        $this->log("No valid session, granting anonymous access", "access" );
        $accessController->grantAnonymousAccess();
      }
      else
      {
        throw new $e;
      }
    }
  }

  /**
   * Authenticate a user with a password. Calls the corresponding method of
   * the access controller
   *
   * @param string $username
   * @param string $password (MD5-encoded) password
   * @return int The id of the user
   * @throws qcl_access_AuthenticationException
   */
  public function authenticate( $username, $password )
  {
    $this->log("Authenticating with username and password...", "access" );
    $accessController = $this->getAccessController();
    $userId = $accessController->authenticate( $username, $password );
    return $userId;
  }

  /**
   * Get the active user id from the session id.
   * @param int $sessionId
   * @return int
   * @throws qcl_access_InvalidSessionException
   */
  public function getUserIdFromSession( $sessionId )
  {
    return $this->getAccessController()->getUserIdFromSession( $sessionId );
  }

  /**
   * Creates a valid user session for the given user id, i.e. creates
   * the user object and the session, if necessary
   * @param $userId
   * @return void
   */
  public function createUserSessionByUserId( $userId )
  {
    return $this->getAccessController()->createUserSessionByUserId( $userId );
  }

  /**
   * Grant guest access, using a new session.
   * @return int user id
   */
  public function grantAnonymousAccess()
  {
    return $this->getAccessController()->grantAnonymousAccess();
  }
}
?>