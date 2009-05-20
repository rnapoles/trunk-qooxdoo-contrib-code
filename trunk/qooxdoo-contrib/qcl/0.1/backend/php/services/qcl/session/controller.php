<?php

/*
 * dependencies
 */
require_once "qcl/access/controller.php";
require_once "qcl/session/Session.php";
require_once "qcl/session/Message.php";

/**
 * Base class that keeps track of connected clients 
 * and dispatches or broadcasts messages. A "session" means the
 * connection established by a particular browser instance.
 */
class qcl_session_controller extends qcl_access_controller
{
    
  /**
   * session model. Access with getSessionModel()
   * @access private
   * @var qcl_session_Session
   */
  var $_sessionModel;
    
  
  /**
   * session model. Access with getMessageModel()
   * @access private
   * @var qcl_session_Message
   */
  var $_messageModel;  
  
  /**
   * The id of the active user, determined from the 
   * session id
   */
  var $_activeUserId;
  
  /**
   * constructor 
   * registers session with a database-table-based session and user model. 
   * if you want to use your custom session model, set it before
   * calling this parent constructor
   */
  function __construct( $server )
  {
    
    /*
     * call parent constructor, this will initialize database
     * connection and access/config models
     */
    parent::__construct( &$server );
    
    /*
     * session model
     */
    $this->_messageModel =& new qcl_session_Message(&$this);
        
    /*
     * session model
     */
    $this->_sessionModel =& new qcl_session_Session(&$this);    
    
  }
  
  /**
   * This overrides and extends the parent method by providing a way to determine
   * the user by a given session id in the request. 
   * @param string[optional] optional session id, if not provided, try to
   * get it from the server data
   * @see qcl_access_controller::isValidUserSession()
   * @override
   */
  function isValidUserSession( $sessionId=null )  
  {
    /*
     * Does the request contain a session id?
     */
    if ( ! $sessionId )
    {
      $sessionId       = $this->getServerData("sessionId");
      $parentSessionId = $this->getServerData("parentSessionId");
      
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
      $activeUser =& $this->getUserFromSession( $sessionId );
      if ( $activeUser )
      { 
        /*
         * set active user
         */
        $this->setActiveUser( &$activeUser );  
      }
    }

    
    /*
     * call parent method, which checks for a valid user session
     * and creates guest access
     */
    if ( ! parent::isValidUserSession() )
    {
      //$this->debug("qcl_access_controller::isValidUserSession() returns false");
      return false;
    }
    
    /*
     * register the session
     */
   //$this->debug("registering session");
    $this->registerSession();
    
    /*
     * sucess!!
     */
    return true;     
  }
  
  /**
   * @override
   * @see qcl_access_controller::logout()
   */
  function logout()
  {
    /*
     * unregister the current session
     */
    if ( $this->getSessionId() )
    {
      $this->unregisterSession();  
    }
    
    /*
     * logout
     */
    return parent::logout();
  }
  
  //-------------------------------------------------------------
  // session management
  //-------------------------------------------------------------

  /**
   * Returns the active user's id 
   * @override
   * @return int
   */
  function getActiveUserId( )
  {
    return $this->_activeUserId;
  }
  
  /**
   * Sets the active user's id 
   * @override
   * @param int $id
   */
  function setActiveUserId( $id )
  {
    $this->_activeUserId = $id;
  }
    
  /**
   * Returns the session model
   * @return qcl_session_Session
   */
  function &getSessionModel()
  {
    return $this->_sessionModel;
  }

  /**
   * Returns the message model
   * @return qcl_session_Message
   */
  function &getMessageModel()
  {
    return $this->_messageModel;
  }  
  
  /**
   * Checks if a session with the given id exists
   * @param string $sessionId
   * @return bool
   */
  function sessionExists( $sessionId )
  {
    $sessionModel =& $this->getSessionModel();
    return $sessionModel->exists( array( 
      'sessionId' => $sessionId 
    ) );
  }
  
  /**
   * Registers session and user. call from extending controller's constructor 
   * requires a user and a session model
   * @param int $timeout Timeout in seconds, defaults to 30 Minutes
   */
  function registerSession($timeout=null)
  {
    /*
     * models
     */
    $configModel  =& $this->getConfigModel();
    $activeUser   =& $this->getActiveUser();
    $sessionModel =& $this->getSessionModel(); 
    
    /*
     * register current session 
     */
    $reqObj =& $this->requestObject();
    $sessionModel->registerSession( 
      $this->getSessionId(), 
      $activeUser->getId(),
      $reqObj->getIp()
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
  function unregisterSession()
  {
    $sessionId = $this->getSessionId();
    $sessionModel =& $this->getSessionModel();
    $sessionModel->unregisterSession( $sessionId );
  }
  
  /**
   * Terminates a session
   * @override
   */
  function method_terminate()
  {
    
    $sessionModel =& $this->getSessionModel();
    $activeUser   =& $this->getActiveUser();

    $sessionId = $this->getSessionId();
    $username  = $activeUser->username();
    
    $this->info("Session #$sessionId ($username) wird beendet.");
    $sessionModel->unregisterSession( $sessionId );  
    
    return $this->response();
  }  
  
  /**
   * Set the active user from the session id
   * @param int $sessionId
   * @return qcl_access_user|bool if this method returns false, the request should be 
   * aborted since the session data refers to a non-existing or expired
   * user.
   */
  function getUserFromSession( $sessionId )
  {
    
    /*
     * look if session exists
     */
    $sessionModel =& $this->getSessionModel();
    $sessionModel->findBy( "sessionId", $sessionId );
    
    /*
     * if yes, get user id
     */
    if ( $sessionModel->foundSomething() )
    {
      $activeUserId = $sessionModel->get("userId");
      if ( ! $activeUserId )
      {
        $this->warn("Session $sessionId is not connected with a user id!");
        return false;
      }
      $userModel =& $this->getUserModel();
      $userModel->load( $activeUserId );
      if ( $userModel->foundNothing() )
      {
        $this->warn("Session $sessionId refers to a non-existing user."); 
        return false;       
      }
      $this->setActiveUserId( $activeUserId );
      return $userModel->cloneObject();
    }
    else
    {
      $this->warn("Session $sessionId does not exist."); 
      return false;
    }
  }
  
  /**
   * Returns a new session id that depends on a parent session and
   * will be deleted when the parent session is deleted.
   */
  function createChildSession( $parentSessionId )
  {
    if ( ! $parentSessionId )
    {
      $this->raiseError("Invalid parent session id.");
    }
    
    /*
     * get user id from parent session
     */
    $sessionModel =& $this->getSessionModel();
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
    $reqObj =& $this->requestObject();
    $sessionModel->insert(array( 
      'sessionId'       => $sessionId, 
      'userId'          => $userId,
      'ip'              => $reqObj->getIp(),
      'parentSessionId' => $parentSessionId
    ));
    
    return $sessionId;
  }
  
  //-------------------------------------------------------------
  // messages and events
  //-------------------------------------------------------------

  /**
   * Broadcasts a message to all connected clients
   * @param mixed $messages Message name or hash map of messages
   * @param mixed $data Data dispatched with message
   * @todo use into qcl_jsonrpc_Response object
   */
  function broadcastMessage ( $message, $data=true )
  {
    //$this->info("Broadcast $message");
    
    if ( is_string ($message) )
    {
      $sessionModel =& $this->getSessionModel();
      $sessionModel->addMessageBroadcast( 
        $message, 
        $data 
      );
    }
    else
    {
      trigger_error ("Invalid broadcast parameter");
    }
  }
  
  /**
   * Dummy method called simply to forwards messages to client 
   * and send logout message when timeout.
   * @return qcl_jsonrpc_Response
   */
  function method_getMessages($params)
  {
    return $this->response();
  }

  //-------------------------------------------------------------
  // Response
  //-------------------------------------------------------------

  
  /**
   * gets result for json response inclusing result data, events, and messages
   * overriding parent method to include message broadcasts
   * @override
   * @return array
   * @todo use into qcl_jsonrpc_Response object
   */
  function &response()
  {
    $this->addBroadcastMessagesToResponse(); 
    return parent::response();
  }

  /**
   * adds the messages from the broadcast to the response message queue
   * @return void
   */
  function addBroadcastMessagesToResponse()
  {
    $sessModel =& $this->getSessionModel();
    $messages  =  $sessModel->getBroadcastedMessages($this->getSessionId());
    
    //$this->info(count($messages) . " broadcasted messages.");
    
    foreach( $messages as $message )
    {
      $this->addMessage($message['name'],$message['data']);
      //$this->info($message);
    }
  }  
  
} 

?>