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
qcl_import( "qcl_access_Controller" );

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
  private $activeUserId;

  /**
   * The session model object
   * @var qcl_access_model_Session
   */
  private $sessionModel;

  /**
   * seconds of inactivity after which anonymous users or
   * sessions will be deleted
   * @var int
   */
  public $secondsUntilPurge = 3600;

  /**
   * Returns singleton instance of this class
   * @return qcl_access_SessionController
   */
  public static function getInstance()
  {
    return qcl_getInstance( __CLASS__ );
  }

  /**
   * This overrides and extends the parent method by providing a way to determine
   * the user by a given session id in the request.
   *
   * @override
   * @throws qcl_access_InvalidSessionException
   * @throws qcl_access_TimeoutException
   * @return int user id
   */
  public function createUserSession()
  {

    /*
     * on-the-fly authentication
     */
    $sessionId = $this->getSessionIdFromServerData();

    if ( ! $sessionId )
    {
      $sessionId = $this->getSessionIdFromParentSessionId();
    }

    /*
     * we have no valid session
     */
    if ( ! $sessionId )
    {
      throw new qcl_access_InvalidSessionException($this->tr("No valid session."));
    }

    /*
     * get user id from session. deny access if not valid
     */
    $userId = $this->getUserIdFromSession( $sessionId );
    if ( ! $userId )
    {
      $this->warn( $this->getError() );
      throw new qcl_access_InvalidSessionException("Invalid session id.");
    }

    /*
     * We have a valid user now.
     */
    $this->log("Got user id from session: #$userId", QCL_LOG_ACCESS );

    /*
     * Check if the user's session has timed out
     */
    if ( ! $this->checkTimeout( $userId ) )
    {
      $this->forceLogout();
      throw new qcl_access_TimeoutException("Session timed out.");
    }

    /*
     * We have a valid session referring to a valid user.
     * Set sessioniId and make a copy of the user object as the
     * active user and return the user id.
     */
    $this->setSessionId( $sessionId );
    $this->createUserSessionByUserId( $userId );
    return $userId;
  }

  /**
   * Creates a valid user session for the given user id, i.e. creates
   * the user object and the session. Overridden to create session record.
   * @param $userId
   * @return void
   */
  public function createUserSessionByUserId( $userId )
  {
    parent::createUserSessionByUserId( $userId );
    $this->registerSession();
  }

  /**
   * Creates a new session from a parent session, for example, when opening
   * child windows that share the session.
   * @return string
   */
  public function getSessionIdFromParentSessionId()
  {

    /*
     * Is this a sub-session of a parent session?
     */
    $parentSessionId = qcl_server_Request::getInstance()->getServerData("parentSessionId");

    if ( $parentSessionId )
    {
      $sessionId = $this->createChildSession( $parentSessionId );
      $this->log("Created and changed to child session id: $sessionId from parent session: $parentSessionId",QCL_LOG_ACCESS);
    }
    else
    {
      throw new qcl_access_AccessDeniedException("Could not create child session");
    }
    return $sessionId;
  }

 /**
   * Authenticates with data in the server data, either by a given session id or
   * by a username - password combination.
   * @return string|null The session id, if it can be retrieved by the server data. Null if
   * no valid session id can be determined from the server data
   */
  public function getSessionIdFromServerData()
  {


    /*
     * if we have a session id in the server data, return it
     */
    $sessionId = parent::getSessionIdFromServerData();
    if ( $sessionId )
    {
      return $sessionId;
    }

    /*
     * otherwise, try getting a session id from authenticating a
     * user
     */
    $username = qcl_server_Request::getInstance()->getServerData("username");
    $password = qcl_server_Request::getInstance()->getServerData("password");

    if ( $username and $password )
    {
      $this->log("Authenticating from server data, user '$username'", QCL_LOG_ACCESS );

      /*
       * can we authenticate with the server data?
       */
      $userId = $this->authenticate( $username, $password );
      if ( $userId )
      {
        $logMsg = $this->createUserSessionByUserId( $userId );
        $this->info( $logMsg );
      }
      else
      {
        $this->warn( $this->getError() );
        throw new qcl_access_AccessDeniedException("Server data authentication failed.");
      }
    }
    else
    {
      $this->log(sprintf(
        "Getting session id from PHP session: '%s'", $this->getSessionId()
      ), QCL_LOG_ACCESS );
    }

    /*
     * return the (new) session id
     */
    return $this->getSessionId();
  }

//  public function authenticate( $username, $password )
//  {
//    $userId = parent::authenticate( $username,$password );
//    $this->registerSession();
//    return $userId;
//  }

  /**
   * Logs out a user
   * @return void
   */
  public function logout()
  {

    /*
     * unregister the current session
     * and cleanup session data
     */
    $this->unregisterSession();
    //$this->cleanup();

    /*
     * logout
     */
    parent::logout();
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
    if ( $this->sessionModel === null )
    {
       qcl_import( "qcl_access_model_Session" );
       $this->sessionModel = new qcl_access_model_Session();
    }
    return $this->sessionModel;
  }


  /**
   * Checks if a session with the given id exists
   * @param string $sessionId
   * @return bool
   */
  public function sessionExists( $sessionId )
  {
    $sessionModel = $this->getSessionModel();
    return $sessionModel->namedIdExists( $sessionId );
  }

  /**
   * Registers the current session with the current user. Cleans up stale
   * sessions
   */
  public function registerSession()
  {
    $sessionId = $this->getSessionId();
    $user      = $this->getActiveUser();
    $remoteIp  = qcl_server_Request::getInstance()->getIp();

    /*
     * register current session
     */
    $this->log( sprintf("Registering session '%s', for %s from IP %s ", $sessionId, $user, $remoteIp ), QCL_LOG_ACCESS );
    $this->getSessionModel()->registerSession( $sessionId, $user, $remoteIp );

    /*
     * remove stale users and sessions, doesn't work really well yet
     */
    $this->cleanup();
  }

  /**
   * Unregisters the current session and deletes all messages
   */
  public function unregisterSession()
  {
    $sessionId = $this->getSessionId();
    $this->log("Unregistering session #$sessionId.", QCL_LOG_ACCESS );
    $this->getSessionModel()->unregisterSession( $sessionId );
  }

  /**
   * Destroys a session by its id
   * @param $sessionId
   * @return void
   */
  public function destroySession( $sessionId )
  {
    parent::destroySession( $sessionId );
    $this->getSessionModel()->unregisterSession( $sessionId );
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
    $sessionId    = $this->getSessionId();
    $username     = $activeUser->username();
    $this->log("Session #$sessionId ($username) is terminated.", QCL_LOG_ACCESS );
    $this->logout();
  }

  /**
   * Get the active user id from the session id.
   * @param int $sessionId
   * @return int
   * @throws qcl_access_InvalidSessionException
   */
  public function getUserIdFromSession( $sessionId )
  {
    if ( ! $sessionId )
    {
      throw new qcl_access_InvalidSessionException( "Missing session id.");
    }

    $sessionModel = $this->getSessionModel();
    try
    {
      $sessionModel->load( $sessionId );
    }
    catch ( qcl_data_model_RecordNotFoundException $e )
    {
      throw new qcl_access_InvalidSessionException( "Session #$sessionId does not exist.");
    }

    $activeUserId = (int) $sessionModel->get( $this->getUserModel()->foreignKey() );
    if ( ! $activeUserId )
    {
      throw new qcl_access_InvalidSessionException( "Session #$sessionId is not connected with a user id!");
    }

    try
    {
      $this->getUserModel()->load( $activeUserId );
    }
    catch ( qcl_data_model_RecordNotFoundException $e )
    {
      throw new qcl_access_InvalidSessionException("Session #$sessionId refers to a non-existing user.");
    }
    return $activeUserId;
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
    try
    {
      $sessionModel->loadWhere( array( "sessionId" => $parentSessionId) );
    }
    catch ( qcl_data_model_RecordNotFoundException $e )
    {
      $this->warn("Parent session $parentSessionId not found...");
      return null;
    }
    $userId = $sessionModel->get( $this->getUserModel()->foreignKey() );

    /*
     * create random new session id and pass it to the client
     */
    $sessionId = $this->createSessionId();

    $this->log( sprintf(
      "Spawning child session #%s form parent session #%s",
      $sessionId,$parentSessionId
    ), QCL_LOG_ACCESS );

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

  /**
   * Clean up the access data:
   * - Purge all anonymous guests that are inactive for more than
   *   one day
   * - delete all state sessions.
   * FIXME rewrite as portable query!
   */
  public function cleanup()
  {
    /*
     * clean up stale users
     */
    $userModel = $this->getUserModel();
    $seconds = $this->secondsUntilPurge;
    if ( $seconds )
    {
      $ids = $userModel->getQueryBehavior()->fetchValues("id",
          "anonymous = 1 AND
          ( TIME_TO_SEC( TIMEDIFF( NOW(), lastAction ) ) > 86400
            OR TIME_TO_SEC( TIMEDIFF( NOW(), modified ) ) > 86400 )"
      );
      foreach( $ids as $id )
      {
        $userModel->load( $id );
        $userModel->delete();
      }

      /* FIXME
       * clean up stale sessions
       */
      $sessionModel = $this->getSessionModel();
      $ids = $sessionModel->getQueryBehavior()->deleteWhere(
        "TIME_TO_SEC( TIMEDIFF( NOW(), modified ) ) > 86400"
      );
      // FIXME
      $msgModel = $this->getMessageBus()->getModel();
      $msgModel->getQueryBehavior()->deleteWhere(
        "sessionId NOT IN (SELECT namedId FROM data_Session )"
      );
    }
  }
}
?>