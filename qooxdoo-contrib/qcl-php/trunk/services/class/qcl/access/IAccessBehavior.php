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

/**
 * Interface for classes that implement the backend for the qcl.access package
 */
interface qcl_access_IAccessBehavior
{

  /**
   * Returns the session id.
   * @return string
   */
  public function getSessionId();

  /**
   * Getter for session model
   * @return unknown_type
   */
  public function getSessionModel();

  /**
   * Getter for server object
   * @return unknown_type
   */
  public function getServer();


  /**
   * Returns the current access controller instance, if any.
   * @return qcl_access_SessionController
   */
  public function getAccessController();

  /**
   * Shorthand getter for the permission model of the access controller
   * @return qcl_access_model_Permission
   */
  public function getPermissionModel();

  /**
   * Shorthand getter for the user model of the access controller
   * @return qcl_access_model_User
   */
  public function getUserModel();

  /**
   * Shorthand getter for the role model of the access controller
   * @return qcl_access_model_Role
   */
  public function getRoleModel();

  /**
   * Whether guest access to the service classes is allowed
   * @return unknown_type
   */
  public function isAnonymousAccessAllowed();

  /**
   * Shorthand getter for active user object
   * @return qcl_access_model_User
   */
  public function getActiveUser();

  /**
   * Abort with error if active user doesn't have permission
   * @return void
   * @param $permission String
   */
  public function requirePermission ( $permission );

  /**
   * Checks if user has the given role
   * @param string $role
   * @return bool
   */
  public function hasRole( $role );

  /**
   * Checks if active user has a permission.
   * @return boolean
   * @param $permission String
   */
  public function hasPermission ( $permission );

  /**
   * Check the accessibility of service object and service
   * method. Aborts request when access is denied, unless when the method name is
   * "authenticate"
   * @param qcl_core_Object $serviceObject
   * @param string $method
   * @return void
   */
  public function controlAccess( qcl_core_Object $serviceObject, $method );

  /**
   * Authenticate a user with a password. Calls the corresponding method of
   * the access controller
   *
   * @param string $username
   * @param string $password (MD5-encoded) password
   * @return int The id of the user
   * @throws qcl_access_AuthenticationException
   */
  public function authenticate( $username, $password );

  /**
   * Get the active user id from the session id, if supported
   * @param int $sessionId
   * @return int
   * @throws qcl_access_InvalidSessionException
   */
  public function getUserIdFromSession( $sessionId );

  /**
   * Creates a valid user session for the given user id, i.e. creates
   * the user object and the session, if necessary
   * @param $userId
   * @return void
   */
  public function createUserSessionByUserId( $userId );

  /**
   * Grant guest access, using a new session.
   * @return int user id
   */
  public function grantAnonymousAccess();
}
?>