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
    
    /*
     * Cleanup: Delete sessions that exist with the same id but
     * a different user
     * @todo this can be removed when session ids are
     * no longer tied to the php session.
     * remove AND user != 0 and update table schema
     */
    $this->deleteWhere("
      `sessionId`  = '$sessionId' AND 
      `userId`    != '$userId' AND user != 0
    ");

    /*
     * Cleanup: Delete sessions that have been deleted, refer to non-existing users, or
     * to the same user with a different session id
     */
    $userModel =& $controller->getUserModel();
    $userTable =  $userModel->getTableName();    
    $this->deleteWhere("
      markedDeleted = 1 OR
      userId NOT IN ( SELECT id FROM users ) OR
      ( userId = $userId AND sessionId != '$sessionId' )
    ");    
    
    /*
     * insert new session data
     */
    $this->insert( array (
      'sessionId'  => $sessionId,
      'userId'     => $userId,
      'ip'         => $ip
    ) );
    
    return true;
    
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
	 * Unregisters a session
	 * @return void
	 * @param string $sessionId 
	 */
  function unregisterSession( $sessionId, $userId )
  {
    $this->db->execute("
      UPDATE {$this->table}
      SET `markedDeleted` = 1
      WHERE `sessionId` = '$sessionId'
    ");
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