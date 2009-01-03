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
   * constructor 
   * registers session with a database-table-based session and user model. 
   * if you want to use your custom session model, set it before
   * calling this parent constructor
   */
  function __construct()
  {

    /*
     * call parent constructor, this will initialize database
     * connection and access/config models
     */
    parent::__construct();

    /*
     * session model
     */
    $this->_messageModel =& new qcl_session_Message(&$this);
        
    /*
     * session model
     */
    $this->_sessionModel =& new qcl_session_Session(&$this);
   
    
    /*
     * Does the request contain a session id?
     */
    $sessionId = $this->getServerData("sessionId");
    if ( $sessionId )
    {
      /*
       * yes, set session id (this will also set the active user)
       */
      $this->setSessionId( $sessionId );
      //$this->debug("Getting session id from request: $sessionId");
    }    
    else
    {
      /*
       * no, create a new session 
       */
      $sessionId = $this->getSessionId();
      //$this->debug("New session id: $sessionId ");
    }
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
    $this->unregisterSession();
    
    /*
     * logout
     */
    return parent::logout();
  }
  
  //-------------------------------------------------------------
  // session management
  //-------------------------------------------------------------

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
    $sessionModel =& $this->getSessionModel();
    $sessionModel->unregisterSession( $this->getSessionId() );
  }
  
  /**
   * Sets the session id and the active user, if any
   * @override
   */
  function setSessionId( $sessionId )
  {
    parent::setSessionId( $sessionId );
    
    /*
     * if session already exists, get user id
     */
    $sessionModel =& $this->getSessionModel();
    $sessionModel->findBy( "sessionId", $sessionId );
    if ( $sessionModel->foundSomething() )
    {
      $activeUserId = $sessionModel->get("userId");
      if ( ! $activeUserId )
      {
        $this->raiseError("Session is not connected with a user id!"); 
      }
      $userModel =& $this->getUserModel();
      $userModel->load($activeUserId);
      $this->setActiveUser( $userModel->cloneObject() );
    }
  }
  
  /**
   * Returns the current session id. 
   * @override
   * @return string session id
   */
  function getSessionId()
  {
    if ( ! $this->_sessionId )
    {
      /*
       * create random session id
       */
      $sessionId = md5(microtime());
      $this->_sessionId = $sessionId;
      
      /*
       * notify client of session id
       */
      $this->dispatchMessage("qcl.commands.setSessionId", $sessionId );
    }
    return $this->_sessionId;
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