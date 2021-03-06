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
   * Returns the session id from the request. Overridden to support parent and 
   * sibling sessions
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
    elseif( substr($sessionId,0,2) == "S_" )
    {
      $sessionId = $this->createSiblingSession( substr($sessionId,2) );
    }    

    /*
     * return the (new) session id
     */
    return $sessionId;
  }


  
  /**
   * Logs out a user
   * @param $userId Optional id of user to logout
   * @return void
   */
  public function logout($userId=null)
  {
    /*
     * logout
     */
    $this->unregisterSession( $userId );
    
		/*
     * mark user as offline if no more sessions exist
     */
    if ( is_null($userId) ) $userId = $this->getActiveUser()->id();
    $sessionsLeft = $this->checkOnlineStatus( $userId );

    /*
     * logout
     */
    parent::logout( $userId, !$sessionsLeft );
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
   * @param int $userId 
   * 		Optional id of user. If given and different from active user id, 
   * 		delete all of this user's sessions
   */
  public function unregisterSession( $userId=null )
  {
    /*
     * if user is given
     */
    if( ! is_null( $userId ) )
    {
      try 
      {
        $sessionModel = $this->getSessionModel();
        $sessionModel->findLinked( $this->getUserModel()->load($userId) );
        while( $sessionModel->loadNext() )
        {
          $sessionModel->delete();
        }
      }
      catch(qcl_data_model_RecordNotFoundException $e ) 
      {
        //
      }
      return; 
    }
    $sessionId = $this->getSessionId();
    $this->log("Unregistering session #$sessionId.", QCL_LOG_ACCESS );
    $this->getSessionModel()->unregisterSession( $sessionId );
  }

  /**
   * Destroys a session by its id
   * @param $sessionId
   * @return void
   */
  public function destroySession()
  {
    $this->unregisterSession();
    parent::destroySession();
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
    qcl_assert_valid_string( $sessionId );

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
       * //FIXME wrong place !!
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
    if ( ! $parentSessionId  or ! strstr( $parentSessionId, "_") )
    {
      $this->raiseError("Invalid parent session id.");
    }

    /*
     * split parent id from client-generated session id
     */
    $ids = explode( "_",$parentSessionId);
    $parentSessionId  = $ids[0];
    $sessionId        = $ids[1];    

    /*
     * check if child session has already been created
     */
    $sessionModel = $this->getSessionModel();
    if( ! $sessionModel->namedIdExists($sessionId) )
    {
      
      /*
       * check ip and parent session
       */
      $ip = qcl_server_Server::getInstance()->getServerInstance()->getRequest()->getIp();//@todo
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
      }
      
      /*
       * get user id from parent session
       */    
      $userId = $sessionModel->get( $this->getUserModel()->foreignKey() );
  
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
    }
    else
    {
       $this->log( sprintf(
        "Child session #%s from parent session #%s already exists",
        $sessionId,$parentSessionId
      ), QCL_LOG_ACCESS );
    }
      
    $this->setSessionId($sessionId);

    return $sessionId;
  }
  
  /**
   * Returns a new session of the user that owns the given session id.
   */
  public function createSiblingSession( $siblingSessionId )
  {
    if ( ! $siblingSessionId  or ! strstr( $siblingSessionId, "_") )
    {
      $this->raiseError("Invalid sibling session id.");
    }

    /*
     * split parent id from client-generated session id
     */
    $ids = explode( "_",$siblingSessionId);
    $siblingSessionId = $ids[0];
    $sessionId        = $ids[1];    

    /*
     * check if child session has already been created
     */
    $sessionModel = $this->getSessionModel();
    if( ! $sessionModel->namedIdExists($sessionId) )
    {    
      /*
       * check ip and sibling session
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
      
      /*
       * get user id from parent session
       */    
      $userId = $sessionModel->get( $this->getUserModel()->foreignKey() );

      $this->log( sprintf(
        "Spawning sibling session #%s from session #%s",
        $sessionId, $siblingSessionId
      ), QCL_LOG_ACCESS );

      /*
       * register new session
       * FIXME this is a manual hack, use API for this
       */
      $sessionModel->create($sessionId, array(
        'UserId'          => $userId,
        'ip'              => $ip
      ));
    }
    else
    {
       $this->log( sprintf(
        "Sibling session #%s from parent session #%s already exists",
        $sessionId, $siblingSessionId
      ), QCL_LOG_ACCESS );
    }
    
    $this->setSessionId($sessionId);
    
    return $sessionId;
  }  
}
?>