<?php

require_once ("qcl/db/model.php");

/**
 * model for session data bases on a mysql database model
 */
class qcl_session_model extends qcl_db_model 
{

	//-------------------------------------------------------------
  // class variables
  //-------------------------------------------------------------

  var $table             = "sessions";
  var $key_id            = null;  // no numeric id
  var $key_namedId       = "sessionId";
  var $key_lastAction    = "lastAction";
  var $key_messages      = "messages";
  var $key_user          = "user";

  //-------------------------------------------------------------
  // internal methods 
  //-------------------------------------------------------------
 
  /**
   * constructor 
   * @param object reference $controller
   */
 	function __construct($controller)
  {
    parent::__construct(&$controller);
    $this->initializeTables($this->table);
	}   
  
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
      WHERE `{$this->key_namedId}` = '$sessionId'
      AND   `{$this->key_user}`   != '$userId' 
    ");
    $this->insert( array (
      $this->key_namedId => $sessionId,
      $this->key_user    => $userId
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
      WHERE `{$this->key_namedId}` = '$sessionId'
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
      WHERE TIME_TO_SEC( TIMEDIFF( NOW(), `{$this->key_lastAction}` ) ) > $timeout
    ");
  }
  
  /**
   * adds a message for all client except the requesting client
   * @return void
   * @param string $sessionId 
   * @param string $message 
   * @param mixed  $data
   */
  function addMessageBroadcast( $sessionId, $message, $data )
  {
    $serializedData = addSlashes(serialize(array($message,$data)));
    $boundary = "af8asdf8h3o434af3h";
    $this->db->execute("
      UPDATE `{$this->table}`
      SET `{$this->key_messages}` = CONCAT(`{$this->key_messages}`,'$boundary$serializedData') 
    ");
  }
  
  /**
   * gets broadcasted messages for the connected client
   * @return array
   * @param $sessionId Object
   */
  function getBroadcastedMessages( $sessionId )
  {
    $msgData = $this->db->getValue("
      SELECT `{$this->key_messages}`
      FROM `{$this->table}`
      WHERE `{$this->key_namedId}` = '$sessionId'
    ");
   
    $this->info($msgData);
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
      $this->info($messages);
      $this->db->execute("
        UPDATE `{$this->table}`
        SET `{$this->key_messages}` = ''
        WHERE `{$this->key_namedId}` = '$sessionId'
      ");
    }
    return $messages;
  }
  
}

?>
