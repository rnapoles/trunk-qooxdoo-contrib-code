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

require_once "qcl/data/controller/Controller.php";
require_once "qcl/access/IAccessService.php";
require_once "qcl/access/AuthenticationResult.php";

/**
 * Service providing methods for authentication and authorization
 *
 */
class qcl_access_Service
  extends qcl_data_controller_Controller
  implements qcl_access_IAccessService
{
  /**
   * Actively authenticate the user with session id or with username and password.
   * Returns data for the authentication store.
   *
   * @param string $first If two arguments, this is the username. If one argument,
   * this is the session id. If no argument, use the session id that has already
   * been established by the access behavior.
   * @param string $password (MD5-encoded) password
   * @return qcl_access_AuthenticationResult
   */
  public function method_authenticate( $first=null, $password=null )
  {
    $accessBehavior   = $this->getApplication()->getAccessBehavior();

    /*
     * authentication with session id
     */
    if ( is_null( $first )  or is_null( $password ) )
    {
      $sessionId = either( $first, $this->getSessionId() );
      $this->log("Authenticating from existing session '$sessionId'...", "access");
      $userId = $accessBehavior->getUserIdFromSession($sessionId);
    }

    /*
     * username-password-authentication
     */
    else
    {
      $username   = utf8_decode($first);
      $password   = utf8_decode($password);
      $this->log("Authenticating from username/password ...", "access");
      $userId = $accessBehavior->authenticate( $username, $password );
    }

    /*
     * create (new) valid user session
     */
    $accessBehavior->createUserSessionByUserId( $userId );

    /*
     * response data
     */
    $response = new qcl_access_AuthenticationResult();
    $activeUser = $accessBehavior->getActiveUser();
    $permissions = $activeUser->getPermissions();
    $response->set( "permissions", $permissions );

    /*
     * session id
     */
    $sessionId  = $this->getSessionId();
    $response->set( "sessionId",$sessionId);

    /*
     * user data
     */
    $response->set( "userId", (int) $activeUser->getId() );
    $response->set( "anonymous", $activeUser->isAnonymous() );
    $response->set( "username", $activeUser->username() );
    $response->set( "fullname", $activeUser->get("name") );

    /*
     * no error
     */
    $response->set( "error", false );

    /*
     * return data to client
     */
    return $response;
  }


  /**
   * Service method to log out the active user. Automatically creates guest
   * access. Override this method if this is not what you want.
   * @return qcl_data_Result
   */
  public function method_logout()
  {
    $accessController = $this->getApplication()->getAccessBehavior()->getAccessController();
    $accessController->logout();
    /*
     * create guest access if allowed.
     */
    return $this->method_authenticate(null);
  }

  /**
   * Service method to terminate a session (remove session and user data).
   * Useful for example when browser window is closed.
   * @return qcl_data_Result
   */
  public function method_terminate()
  {
    $accessController = $this->getApplication()->getAccessBehavior()->getAccessController();
    $accessController->terminate();

    /*
     * return an empty instance
     */
    $response =  new qcl_access_AuthenticationResult();
    return $response;
  }
}
?>