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
    $sessionId = $this->getSessionIdFromRequest();

    /*
     * we have no valid session
     */
    if ( ! $sessionId )
    {
      /*
       * if the application allows unauthenticated acces,
       * try to use the PHP session id
       */
      if ( $this->getApplication()->skipAuthentication() )
      {
        $sessionId = session_id();
        $this->log("Skipping authentication, using PHP session id: #$sessionId", QCL_LOG_ACCESS );
      }
      else
      {
        throw new qcl_access_InvalidSessionException($this->tr("No valid session."));
      }
    }

    /*
     * get user id from session. deny access if not valid
     */
    $userId = $this->getUserIdFromSession( $sessionId );
    if ( ! $userId )
    {
      /*
       * if the application allows unauthenticated acces,
       * and the PHP session id is not yet linked to a user,
       * create an anonymous user for all unauthenticated
       * requests
       */
      if ( $this->getApplication()->skipAuthentication() )
      {
        $userId = $this->grantAnonymousAccess();
      }

      /*
       * else, deny access
       */
      else
      {
        $this->warn( $this->getError() );
        throw new qcl_access_InvalidSessionException("Invalid session id.");
      }
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
   * Authenticates with data in the request data, either by a given session id or
   * by a username - password combination.Supports child and sibling sessions
   * @return string|null The session id, if it can be retrieved by the server data. Null if
   * no valid session id can be determined from the request
   * @override
   */
  public function getSessionIdFromRequest()
  {
    /*
     * if we have a session id in the request data, return it
     */
    $sessionId = parent::getSessionIdFromRequest();
    
   /*
    * Sub-session of a parent session: creates a new session 
    * from a parent session, for example, when opening
    * child windows hat share the user's access rights, but has to have
    * a different session to keep its data apart. The child windows session will be 
    * deleted when the parent's session ends.
    */
    if( substr($sessionId,0,2) == "P_" )
    {
      $sessionId = $this->createChildSession( substr($sessionId,2) );
    }
    
    /*
     * Creates a new session from a session, for example, when opening
     * a new windows that share the user's access rights, but has to have
     * a different session to keep its data apart. These session will continue
     * to exist when the other session ends. 
     * @return string
     */
    if( substr($sessionId,0,2) == "S_" )
    {
      $sessionId = $this->createSiblingSession( substr($sessionId,2) );
    }
    
    /*
     * do we have a valid id already, return it
     */
    if ( $sessionId )
    {
      return $sessionId;
    }
    
    /*
     * otherwise, try getting a session id from authenticating a
     * user on-the-fly
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
    
    /*
     * getting it from the PHP session id
     */
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


  
  /**
   * Logs out a user
   * @return void
   */
  public function logout()
  {

    /*
     * unregister the current session
     */
    $this->unregisterSession();
    //$this->cleanup();
    
		/*
     * mark user as offline if no more sessions exist
     */
    $this->checkOnlineStatus( $this->getActiveUser()->id() );

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
      
      /*
       * mark user as online
       */
      $this->getUserModel()->set("online",true);
    }
    catch ( qcl_data_model_RecordNotFoundException $e )
    {
      throw new qcl_access_InvalidSessionException("Session #$sessionId refers to a non-existing user.");
    }
    return $activeUserId;
  }

  /**
   * Checks if any session exists that are connected to the user id. 
   * If not, set the user's online status to false
   * @param integer $userId
   * @return boolean
   * @throws qcl_data_model_RecordNotFoundException if invalid user id is given
   */
  public function checkOnlineStatus( $userId )
  {
    $userModel = $this->getUserModel()->load( $userId );
    try
    {
      $this->getSessionModel()->findLinked($userModel);
      return true;
    }
    catch(qcl_data_model_RecordNotFoundException $e)
    {
       $userModel->set("online", false)->save();
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
    $ip = qcl_server_Server::getInstance()->getServerInstance()->getRequest()->getIp();
    $sessionModel = $this->getSessionModel();
    try
    {
      $sessionModel->load( $parentSessionId );
      if( $sessionModel->getIp() !== $ip )
      {
        $this->raiseError("Invalid IP");
      }      
    }
    catch ( qcl_data_model_RecordNotFoundException $e )
    {
      $this->raiseError("Parent session $parentSessionId not found...");
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
     * FIXME this is a manual hack, use API for this
     */
    $sessionModel->create($sessionId, array(
      'UserId'          => $userId,
      'ip'              => qcl_server_Server::getInstance()->getServerInstance()->getRequest()->getIp(),
      'parentSessionId' => $parentSessionId
    ));
    
    $this->setSessionId($sessionId);

    return $sessionId;
  }
  
  /**
   * Returns a new session of the user that owns the given session id.
   */
  public function createSiblingSession( $siblingSessionId )
  {
    if ( ! $siblingSessionId )
    {
      $this->raiseError("Invalid sibling session id.");
    }

    /*
     * get user id from sibling session
     */
    $ip = qcl_server_Server::getInstance()->getServerInstance()->getRequest()->getIp();
    $sessionModel = $this->getSessionModel();
    try
    {
      $sessionModel->load( $siblingSessionId );
      if( $sessionModel->getIp() !== $ip )
      {
        $this->raiseError("Invalid IP");
      }
    }
    catch ( qcl_data_model_RecordNotFoundException $e )
    {
      $this->raiseError("Sibling session $siblingSessionId not found...");
    }
      
    $userId = $sessionModel->get( $this->getUserModel()->foreignKey() );

    /*
     * create random new session id and pass it to the client
     */
    $sessionId = $this->createSessionId();

    $this->log( sprintf(
      "Spawning sibling session #%s from session #%s",
      $sessionId,$siblingSessionId
    ), QCL_LOG_ACCESS );

    /*
     * register new session
     * FIXME this is a manual hack, use API for this
     */
    $sessionModel->create($sessionId, array(
      'UserId'          => $userId,
      'ip'              => $ip
    ));
    
    $this->setSessionId($sessionId);
    
    return $sessionId;
  }  
}
?>