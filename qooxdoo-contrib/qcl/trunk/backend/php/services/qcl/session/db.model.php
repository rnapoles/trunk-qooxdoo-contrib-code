<?php

require_once ("qcl/db/model.php");

/**
 * model for session data bases on a mysql database model
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
	 * registers a session. adds an entry with the current timestamp if the session 
	 * doesn't exist, otherwise leaves the last action
	 * @return void
	 * @param string $sessionId 
	 * @param string $userId 
	 */
  function registerSession( $sessionId, $userId )
  {
    $this->db->execute("
      DELETE FROM `{$this->table}`
      WHERE `{$this->col_sessionId}` = '$sessionId'
      AND   `{$this->col_user}`   != '$userId' 
    ");
    $this->insert( array (
      $this->col_sessionId => $sessionId,
      $this->col_user    => $userId
    ) );    
  }

	/**
	 * unregisters a session
	 * @return void
	 * @param string $sessionId 
	 */
  function unregisterSession( $sessionId )
  {
    $this->db->execute("
      DELETE FROM `{$this->table}`
      WHERE `{$this->col_sessionId}` = '$sessionId'
    ");
  }


  /**
	 * expunge all sessions that have exceeded the timeout
	 * @param int $timeout Timeout in seconds
	 * @return void
	 */
	function expungeStaleSessions( $timeout )
  {
    $this->db->execute("
      DELETE FROM `{$this->table}`
      WHERE TIME_TO_SEC( TIMEDIFF( NOW(), `{$this->col_modified}` ) ) > $timeout
    ");
  }
  
  /**
   * adds a message for all client except the requesting client
   * @return void
   * @param string $sessionId 
   * @param string $message 
   * @param mixed  $data
   * @todo base64encode and separate with CR
   */
  function addMessageBroadcast( $sessionId, $message, $data )
  {
    $serializedData = addSlashes(serialize(array($message,$data)));
    $boundary = "af8asdf8h3o434af3h";
    $this->db->execute("
      UPDATE `{$this->table}`
      SET `{$this->col_messages}` = CONCAT(`{$this->col_messages}`,'$boundary$serializedData') 
    ");
  }
  
  /**
   * gets broadcasted messages for the connected client
   * @return array
   * @param $sessionId Object
   * @todo sepatate with CR and base64decode 
   */
  function getBroadcastedMessages( $sessionId )
  {
    $msgData = $this->db->getValue("
      SELECT `{$this->col_messages}`
      FROM `{$this->table}`
      WHERE `{$this->col_sessionId}` = '$sessionId'
    ");
   
    $messages = array();
        
    if ( trim($msgData) )
    {
      $boundary = "af8asdf8h3o434af3h";
      $serializedVars = explode($boundary,$msgData);

      foreach ( $serializedVars as $serializedData )
      {
        $data = unserialize($serializedData);
        if ( is_array($data) )
        {
          $messages[] = array(
            'name'  => $data[0],
            'data'  => $data[1]
          );
        }        
      }
      $this->db->execute("
        UPDATE `{$this->table}`
        SET `{$this->col_messages}` = ''
        WHERE `{$this->col_sessionId}` = '$sessionId'
      ");
    }
    return $messages;
  }
  
}

?>
