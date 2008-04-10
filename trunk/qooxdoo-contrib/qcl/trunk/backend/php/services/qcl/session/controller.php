<?php

// dependencies
require_once ("qcl/jsonrpc/controller.php");

/**
 * base class for controllers who use a sesion model to keep track of connected
 * clients
 */

class qcl_session_controller extends qcl_jsonrpc_controller
{
  
	//-------------------------------------------------------------
  // internal methods
  //-------------------------------------------------------------

  /**
   * constructor 
   * registers session with a database-table-based session and user model. 
   * if you want to use your custom session model, set it before
   * calling this parent constructor
   */
	function __construct()
  {
		parent::__construct();
    if ( ! $this->getModel("session") )
    {
      $sessionModel =& $this->getSingleton("qcl_session_model");
      $this->setModel("session", &$sessionModel);
    }	
	}   	

	//-------------------------------------------------------------
  // session registration
  //-------------------------------------------------------------

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
    $sessionModel =& $this->getModel("session");
    
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
	    $sessionModel =& $this->getModel("session");
      $sessionModel->addMessageBroadcast( $this->getSessionId(), $message, $data );
		}
		else
		{
			trigger_error ("Invalid broadcast parameter");
		}
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
		$sessionModel =& $this->getModel("session");
    $messages = $sessionModel->getBroadcastedMessages($this->getSessionId());
    //$this->info(count($messages) . " broadcasted messages.");
    foreach( $messages as $message )
    {
      $this->addMessage($message['name'],$message['data']);
      //$this->info($message['name']);
    }
    return parent::getResponseData();
	}


	 
}	

?>