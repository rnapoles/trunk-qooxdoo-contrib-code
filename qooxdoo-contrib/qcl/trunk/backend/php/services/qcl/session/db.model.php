<?php
/*
 * dependencies
 */
require_once "qcl/db/model.php";
require_once "qcl/message/db.model.php";

/**
 * Model for session data bases on a mysql database model.
 * 'Session' here means the connection established by a particular
 * browser instance. 
 */
class qcl_session_db_model extends qcl_db_model 
{

  /**
   * the path to the model schema xml file
   * @see qcl_db_model::getSchmemaXmlPath()
   * @var string
   */
  var $schemaXmlPath = "qcl/session/db.model.xml";  
   
	//-------------------------------------------------------------
  // public methods
  //-------------------------------------------------------------
	
	/**
	 * Registers a session. adds an entry with the current timestamp if the session 
	 * doesn't exist, otherwise leaves the last action column alone.
	 * @return void
	 * @param string $sessionId 
	 * @param int $userId 
	 */
  function registerSession( $sessionId, $userId )
  {
    /*
     * Delete sessions that exist with the same id but
     * a different user
     * @todo: this can be removed when session ids are
     * no longer tied to the php session.
     * remove AND user != 0 and update table schema
     */
    $this->deleteWhere("
      `sessionId`  = '$sessionId' AND 
      `userId`    != '$userId' AND user != 0
    ");
    
    $this->insert( array (
      'sessionId'  => $sessionId,
      'userId'     => $userId
    ) );    
  }

  /**
   * Checks whether a user is registered with a session
   */
  function isRegistered( $sessionId, $userId )
  {
    $this->findWhere("
      `sessionId` = '$sessionId' AND 
      `userId`    = $userId
    ");
    return $this->foundSomething();
  }
  
	/**
	 * Unregisters a session
	 * @return void
	 * @param string $sessionId 
	 */
  function unregisterSession( $sessionId, $userId )
  {
    $this->deleteWhere("
      `sessionId` = '$sessionId'
    ");
  }

 /**
   * Unregisters all sessions for a user
   * @return void
   * @param int $userId 
   */
  function unregisterAllSessions(  $userId )
  {
    $this->deleteWhere("
      `userId`  = $userId
    ");
  } 
  
  /**
	 * expunge all sessions that have exceeded the timeout
	 * @param int $timeout Timeout in seconds
	 * @return void
	 */
	function expungeStaleSessions( $timeout )
  {
    $this->deleteWhere("
      TIME_TO_SEC( TIMEDIFF( NOW(), `modified` ) ) > $timeout
    ");
  }
  
  /**
   * Adds a message for all client
   * @return void
   * @param string $message 
   * @param mixed  $data
   * @todo base64encode and separate with CR
   */
  function addMessageBroadcast( $message, $data )
  {
    /*
     * get ids of sessions
     */  
    $sessionIds = $this->findValues("sessionId");
    
    $msgModel =& new qcl_message_db_model( &$this );
    
    foreach( $sessionIds as $sessionId )
    {
      $msgModel->create();
      $msgModel->setProperty("sessionId",$sessionId);
      $msgModel->setName($message);
      $msgModel->setData(addSlashes(serialize($data)));
      $msgModel->update();      
    }
    
  }
  
  /**
   * gets broadcasted messages for the connected client
   * @return array
   * @param int $sessionId 
   */
  function getBroadcastedMessages( $sessionId )
  {
    $controller =& $this->getController();
    $msgModel   =& new qcl_message_db_model(&$controller);
    
    /*
     * get messages that have been stored for session id
     */
    $rows = $msgModel->findWhere(
      "`sessionId`='$sessionId'",
      null,
      array('name','data')
    );
    
    $messages = array();
    foreach ($rows as $row)
    {
      $messages[] = array(
        'name'  => $row['name'],
        'data'  => unserialize(stripslashes($row['data']))
      );
    }
    
    /*
     * delete messages
     */
    $msgModel->deleteWhere("`sessionId`='$sessionId'");
    
    /*
     * return message array
     */
    return $messages;
  } 
}
?>