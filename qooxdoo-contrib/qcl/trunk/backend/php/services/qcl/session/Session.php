<?php
/*
 * dependencies
 */
require_once "qcl/db/model.php";

/**
 * Model for session data bases on a mysql database model.
 * 'Session' here means the connection established by a particular
 * browser instance. 
 */
class qcl_session_Session extends qcl_db_model 
{

  /**
   * the path to the model schema xml file
   * @see qcl_db_model::getSchmemaXmlPath()
   * @var string
   */
  var $schemaXmlPath = "qcl/session/Session.model.xml";  
   
	//-------------------------------------------------------------
  // public methods
  //-------------------------------------------------------------
	
	/**
	 * Registers a session. adds an entry with the current timestamp if the session 
	 * doesn't exist, otherwise leaves the last action column alone.
	 * @return void
	 * @param string $sessionId The id of the current session
	 * @param int $userId The id of the current user
	 * @param string $ip The IP address of the requesting client. This makes sure
	 * session ids cannot be "stolen" by an intercepting party
	 */
  function registerSession( $sessionId, $userId, $ip )
  {
    $controller =& $this->getController();
    
    /*
     * if session id is present but linked to a different IP
     * there is a security breach, unless the request was originated 
     * on the local host
     */
    $localhost = ( $ip=="::1" or $ip=="127.0.0.1" );
    if ( ! $localhost and $this->exists("`sessionId` = '$sessionId' AND `ip` != '$ip'") )
    {
      $this->setError("Access denied.");
      return false;
    }

    $this->cleanUp();
    
    /*
     * insert new session data
     */
    $this->insertOrUpdate( array (
      'sessionId'        => $sessionId,
      'userId'           => $userId,
      'ip'               => $ip
    ) );
    
    return true;
    
  }
  
  /**
   * Cleanup sessions and messages,
   * @todo rewrite without raw sql
   */  
  function cleanUp()
  {
    /*
     * Delete sessions that have been deleted, refer to non-existing users, or
     * to the same user with a different session id.
     * @todo unhardcode timeout
     */
    $controller =& $this->getController();
    $userModel =& $controller->getUserModel();
    //$userTable =  $userModel->getTableName();    
    $this->deleteWhere("
      markedDeleted = 1 
      OR userId NOT IN ( SELECT id FROM users )
      OR TIME_TO_SEC( TIMEDIFF( NOW(), `modified` ) ) > 3600 
    ");
    
    /*
     * Delete messages that have been deleted, or refer to non-existing sessions
     */     
    $msgModel   =& $controller->getMessageModel();
    $msgModel->deleteWhere("
      markedDeleted = 1 OR
      sessionId NOT IN ( SELECT sessionId FROM sessions ) 
    ");      

  }

  /**
   * Checks whether a user is registered with a session
   */
  function isRegistered( $sessionId, $userId, $ip )
  {
    return $this->exists("
      `sessionId` = '$sessionId' AND 
      `userId`    = $userId AND
      `ip`        = '$ip'
    ");
  }
  
	/**
	 * Unregisters a session. We cannot delete them right away since
	 * the request has not completed yet, so we mark them to be deleted
	 * when the next session is registered.
	 * @return void
	 * @param string $sessionId 
	 */
  function unregisterSession( $sessionId )
  {
    if ( ! $sessionId )
    {
      $this->raiseError("Invalid session id");
    }
    
    //$this->debug($sessionId);
    /*
     * delete session
     */
    $this->updateWhere(
      array('markedDeleted' => 1),
      "`sessionId`='$sessionId' OR `parentSessionId`='$sessionId'"
    );
    
    /*
     * delete messages belonging to session
     */
    $controller =& $this->getController();
    $msgModel   =& $controller->getMessageModel();
    $msgModel->updateWhere(
      array('markedDeleted' => 1),
      array('sessionId' => $sessionId)
    );
  }

 /**
   * Unregisters all sessions for a user
   * @return void
   * @param int $userId 
   */
  function unregisterAllSessions( $userId )
  {
    $this->db->execute("
      UPDATE {$this->table}
      SET `markedDeleted` = 1
      WHERE `userId`  = $userId
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
    
    $controller =& $this->getController();
    $msgModel =& $controller->getMessageModel();
    
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
    $msgModel   =& $controller->getMessageModel();
    
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