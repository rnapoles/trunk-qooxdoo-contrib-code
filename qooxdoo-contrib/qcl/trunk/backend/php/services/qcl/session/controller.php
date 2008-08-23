<?php

/*
 * dependencies
 */
require_once "qcl/access/controller.php";
require_once "qcl/session/db.model.php";

/**
 * Base class that keeps track of connected clients 
 * and dispatches or broadcasts messages.
 */
class qcl_session_controller extends qcl_access_controller
{
    
  /**
   * session model. Access with getSessionModel()
   * @access private
   * @var qcl_session_db_model
   */
  var $sessionModel;
    
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
     * add session model
     */
    $this->sessionModel =& $this->getNew("qcl_session_db_model");
    

  }     
    
  //-------------------------------------------------------------
  // session management
  //-------------------------------------------------------------

  /**
   * gets the session model
   * @return qcl_session_db_model
   */
  function &getSessionModel()
  {
    return $this->sessionModel;
  }
  
  /**
   * returns the current session id
   * @return string session id
   */
  function getSessionId()
  {
    return session_id();
  }

  /**
   * registers session and user. call from extending controller's constructor 
   * requires a user and a session model
   * @param string $user user name
   * @param int $timeout Timeout in seconds, defaults to 600 seconds
   */
  function registerSession($user, $timeout=600)
  {
    $sessionModel =& $this->getSessionModel();
    
    // delete all expired sessions
    $sessionModel->expungeStaleSessions($timeout);
    
    // register current session (will be ignored if already present)
    $sessionModel->registerSession( $this->getSessionId(), $user);
  }


  
  //-------------------------------------------------------------
  // messages and events
  //-------------------------------------------------------------

  /**
   * broadcasts a message to all connected clients
   * @param mixed $messages Message name or hash map of messages
   * @param mixed $data Data dispatched with message
   */
  function broadcastMessage ( $message, $data=true )
  {
    //$this->info("Broadcast $message");
    
    if ( is_string ($message) )
    {
      $sessionModel =& $this->getSessionModel();
      $sessionModel->addMessageBroadcast( 
        $this->getSessionId(), 
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
   * Forwards messages to client and send logout message when timeout.
   * @return array
   */
  function method_getMessages($params)
  {

    /*
     * set client-side log level
     */
    //$this->setSessionVar("qcl.logLevel.client",$logLevel);        
    
    /*
     * models
     */
    $userModel   =& $this->getUserModel();
    
    /*
     * if authenticated, check timeout 
     */
    if ( $userModel->authenticate() )
    {
      $activeUser = $userModel->getActiveUserNamedId();
      
      /*
       * check the user session for timeouts etc.
       */
      if ( ! $this->checkTimeout($activeUser) )
      {
        /*
         * force log out
         */
        $this->dispatchMessage("qcl.commands.logout");
        $userModel->setActiveUser(null);
      }         
    }
    return $this->getResponseData();
  }

  //-------------------------------------------------------------
  // response
  //-------------------------------------------------------------

  /**
   * gets result for json response inclusing result data, events, and messages
   * overriding parent method to include message broadcasts
   * @override
   * @return array
   */
  function getResponseData()
  {
    $this->addBroadcastMessagesToResponse(); 
    return parent::getResponseData();
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
  
  /**
   * gets the path to a file that has been uploaded with uploader.php
   * @param string $file filename (must not have any path information)
   * @return string fully qualified path to file
   */
  function getTmpUploadPath($file)
  {
    $prefix  = session_id();
    $path = "../../var/upload/tmp/{$prefix}_{$file}";
    return realpath($path);
  }
   
} 

?>