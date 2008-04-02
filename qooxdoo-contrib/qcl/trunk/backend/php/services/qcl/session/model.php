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
	 * registers a session
	 * @return void
	 * @param string $sessionId 
	 * @param string $userId 
	 */
  function registerSession( $sessionId, $userId )
  {
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
   * @param $sessionId Object
   * @param $message Object
   * @param $data Object
   */
  function addMessageBroadcast( $sessionId, $message, $data )
  {
    $serializedData = addSlashes(serialize($data));
    $this->db->execute("
      UPDATE `{$this->table}`
      SET `{$this->key_messages}` = CONCAT(`{$this->key_messages}`,'[[$message][$serializedData]]') 
      WHERE `{$this->key_namedId}` != '$sessionId'
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
    preg_match_all( "/\[\[([^\]]+)\]\[([^\]]+)\]\]/", $msgData, $matches );
    $messages = array();
    for( $i=0; $i<count($matches[0]); $i++)
    {
      if ( $matches[1][$i] )
      {
        $messages[] = array(
          'name'  => $matches[1][$i],
          'data'  => unserialize($matches[2][$i])
        );        
      }
    }
    $this->db->execute("
      UPDATE `{$this->table}`
      SET `{$this->key_messages}` = ''
      WHERE `{$this->key_namedId}` = '$sessionId'
    ");
    return $messages;
  }
  
}

?>
