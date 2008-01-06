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
		$this->info("Broadcast $message");
		if ( is_string ($message) )
		{
	    $sessionModel =& $this->getModel("session");
      $sessionModel->addMessageBroadcast( $this->getSessionId, $message, $data );
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
    $broadcastedMessages = $sessionModel->getBroadcastedMessages($this->getSessionId());
    foreach( $broadcastedMessages as $message )
    {
      $this->addMessage($message['name'],$message['data']);
    }
    return $this->_response;
	}

	//-------------------------------------------------------------
  // message polling - deprecated!
  //-------------------------------------------------------------
	
	/**
	 * server messages
	 * @param string 	$params[0]	request id
	 */
	function method_getServerMessages( $params )
	{
		$requestId 	= $params[0]; 
		$className	= get_class($this);
		$sessionId 	= session_id();
		
		// get messages from database and delete them
		$db =& $this->getSingleton("qcl_db_pear");
		if ( $requestId )
		{
			$whereQuery = "`session_id` = '$sessionId' AND `class` = '$className' AND `request_id` = '$requestId'";
		}
		else
		{
			$whereQuery = "`session_id` = '$sessionId' AND `class` = '$className'";			
		}

		// get messages
		$messages = $db->getAllRows("
			SELECT * FROM `messages`
			WHERE $whereQuery
		");	
		
		$this->log("### Polled for ". count($messages) . " messages.");
		
		// and delete them
		$db->execute("
			DELETE FROM `messages`
			WHERE $whereQuery
		");
		
		// send to server 
		foreach ($messages as $message )
		{ 
			$this->dispatchMessage( $message['name'], unserialize($message['data']) );
		}
		return $this->getResponseData();
	}

	/**
	 * add server message
	 * @param string 	$message
	 * @param mixed		$data
	 * @param string	$requestId 	(optional)
	 */
	function addServerMessage( $name, $data, $requestId = null)
	{ 
		$className	= get_class($this);
		$sessionId 	= session_id();
		
		// create data row
		$row = array(
			'class'			=> $className,
			'session_id'	=> $sessionId,
			'request_id'	=> $requestId,
			'name'			=> $name,
			'data'			=> serialize($data)
		);
		
		// insert messages into database
		$db =& $this->getSingleton("qcl_db_pear");
		$db->insert("messages",$row);
		
		return;
	}

	 
}	

?>