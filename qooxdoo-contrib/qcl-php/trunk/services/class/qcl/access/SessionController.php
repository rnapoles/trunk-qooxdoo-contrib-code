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
require_once "qcl/access/Controller.php";
require_once "qcl/access/model/Session.php";

/**
 * Base class that keeps track of connected clients
 * and dispatches or broadcasts messages. A "session" means the
 * connection established by a particular browser instance.
 */
class qcl_access_SessionController
  extends qcl_access_Controller
{

  /**
   * The id of the active user, determined from the
   * session id
   */
  private $_activeUserId;

  /**
   * This overrides and extends the parent method by providing a way to determine
   * the user by a given session id in the request.
   * @param string[optional] optional session id, if not provided, try to
   * get it from the server data
   * @see qcl_access_Controller::isValidUserSession()
   * @override
   */
  public function isValidUserSession( $sessionId=null )
  {

    if ( ! $sessionId )
    {
      /*
       * on-the-fly authentication
       */
      $sessionId = $this->checkServerDataAuthentication();
    }

    /*
     * Does the request contain a session id?
     */
    if ( ! $sessionId )
    {
      $parentSessionId = qcl_server_Server::getInstance()->getServerData("parentSessionId");

      /*
       * Is this a sub-session of a parent session?
       */
      if ( $parentSessionId and ! $this->sessionExists($sessionId) )
      {
        $sessionId = $this->createChildSession($parentSessionId);
        //$this->debug("Created and changed to child session id: $sessionId from parent session: $parentSessionId");
      }
    }

    /*
     * if we have a session id by now, set it and try to
     * get the user from the session
     */
    if ( $sessionId )
    {

      $this->setSessionId( $sessionId );
     //$this->debug("Getting session id from request: $sessionId");

      /*
       * get user from session. if session data is invalid,
       * do not authenticate
       */
      $userId = $this->getUserIdFromSession( $sessionId );

      if ( $userId )
      {
        $userModel = $this->getUserModel( $userId );
        $this->setActiveUser( $userModel );

        /*
         * If we have an authenticated user, check for timeout etc.
         */
        if ( ! $this->checkTimeout() )
        {
          /*
           * force log out because of timeout
           */
          $this->forceLogout();
          $this->setError( "Timeout.");
          return false;
        }
      }

      /*
       * error
       */
      else
      {
        $this->forceLogout();
        $this->setError("No valid user id from session.");
        return false;
      }
    }

    /*
     * we have no valid session
     */
    else
    {
      $this->setError("No valid session.");
      return false;
    }

    /*
     * sucess!!
     */
    return true;
  }

  /**
   * Grant guest access
   * @todo config data should be written to config table and deleted when guest user sessions are deleted.
   * @return void
   */
  public function grantAnonymousAccess()
  {
    /*
     * parent method does all the work
     */
    parent::grantAnonymousAccess();

    /*
     * now register the new session
     */
    $this->registerSession();
  }

  /**
   * Actively authenticate the user with username and password.
   * Returns data for the authentication store.
   *
   * @param string $param[0] username
   * @param string $param[1] (MD5-encoded) password
   * @return qcl_data_Result
   */
  public function method_authenticate( $params )
  {
    $response = parent::method_authenticate( $params );
    $this->registerSession();
    $this->cleanUp();
    return $response;
  }

  /**
   * @override
   * @see qcl_access_Controller::logout()
   */
  public function logout()
  {
    /*
     * unregister the current session
     */
    if ( $this->getSessionId() )
    {
      $this->unregisterSession();
    }

    /*
     * remove other stale sessions as well
     */
    $this->cleanUp();

    /*
     * logout
     */
    return parent::logout();
  }

  //-------------------------------------------------------------
  // session management
  //-------------------------------------------------------------

  /**
   * Returns the session model singleton instance
   * @return qcl_access_model_Session
   */
  public function getSessionModel()
  {
    return $this->getApplication()->getAccessManager()->getSessionModel();
  }


  /**
   * Checks if a session with the given id exists
   * @param string $sessionId
   * @return bool
   */
  public function sessionExists( $sessionId )
  {
    $sessionModel = $this->getSessionModel();
    return $sessionModel->exists( array(
      'sessionId' => $sessionId
    ) );
  }

  /**
   * Registers session and user. call from extending controller's constructor
   * requires a user and a session model
   * @param int $timeout Timeout in seconds, defaults to 30 Minutes
   */
  public function registerSession($timeout=null)
  {
    /*
     * models
     */
    $activeUser   = $this->getActiveUser();
    $sessionModel = $this->getSessionModel();

    /*
     * register current session
     */
    $sessionModel->registerSession(
      $this->getSessionId(),
      $activeUser->getId(),
      qcl_server_Server::getInstance()->getRemoteIp()
    );

    /*
     * Raise error if session model returns false
     */
    if ( $sessionModel->getError() )
    {
      $this->raiseError( $sessionModel->getError() );
    }
  }

  /**
   * Unregisters the current session and deletes all messages
   */
  public function unregisterSession()
  {
    $sessionId = $this->getSessionId();
    $sessionModel = $this->getSessionModel();
    $sessionModel->unregisterSession( $sessionId );
  }


  /**
   * Removes stale and invalid sessions
   */
  public function cleanUp()
  {
    $sessionModel = $this->getSessionModel();
    $sessionModel->cleanUp();
  }

  /**
   * Terminates a session
   * @return void
   * @override
   */
  public function terminate()
  {

    $sessionModel = $this->getSessionModel();
    $activeUser   = $this->getActiveUser();
    $sessionId = $this->getSessionId();
    $username  = $activeUser->username();
    $this->info("Session #$sessionId ($username) is terminated.");
    $this->logout();
  }

  /**
   * Set the active user id from the session id
   * @param int $sessionId
   * @return int|bool if this method returns false, the request should be
   * aborted since the session data refers to a non-existing or expired
   * user.
   */
  public function getUserIdFromSession( $sessionId )
  {

    /*
     * look if session exists
     */
    $sessionModel = $this->getSessionModel();
    $sessionModel->findBy( "sessionId", $sessionId );

    /*
     * if yes, get user id
     */
    if ( $sessionModel->foundSomething() )
    {
      $activeUserId = $sessionModel->get("userId");
      if ( ! $activeUserId )
      {
        $this->setError("Session $sessionId is not connected with a user id!");
        return false;
      }
      $userModel = $this->getUserModel();
      if ( ! $userModel->exists( array("id" => $activeUserId ) ) )
      {
        $this->setError("Session $sessionId refers to a non-existing user.");
        return false;
      }
      return $activeUserId;
    }
    else
    {
      $this->setError("Session $sessionId does not exist.");
      return false;
    }
  }


  /**
   * Returns a new session id that depends on a parent session and
   * will be deleted when the parent session is deleted.
   */
  public function createChildSession( $parentSessionId )
  {
    if ( ! $parentSessionId )
    {
      $this->raiseError("Invalid parent session id.");
    }

    /*
     * get user id from parent session
     */
    $sessionModel = $this->getSessionModel();
    $sessionModel->findBy("sessionId",$parentSessionId);
    if ( $sessionModel->foundNothing() )
    {
      $this->warn("Parent session $parentSessionId not found...");
      return null;
    }
    $userId = $sessionModel->get("userId");

    /*
     * create random new session id and pass it to the client
     */
    $sessionId = $this->createSessionId();

    //$this->debug("Spawning child session #$sessionId form parent session #$parentSessionId");

    /*
     * register new session
     */
    $sessionModel->insert(array(
      'sessionId'       => $sessionId,
      'userId'          => $userId,
      'ip'              => qcl_server_Server::getInstance()->getRemoteIp(),
      'parentSessionId' => $parentSessionId
    ));

    return $sessionId;
  }
}
?>