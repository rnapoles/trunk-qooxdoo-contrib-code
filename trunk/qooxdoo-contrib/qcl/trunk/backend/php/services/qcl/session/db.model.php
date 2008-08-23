<?php

require_once "qcl/db/model.php";
require_once "qcl/message/db.model.php";

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
    $this->deleteWhere( array(
      'sessionId'  => " =  '$sessionId' AND ",
      'user'       => " != '$userId'" 
    ) );
    
    $this->insert( array (
      'sessionId'  => $sessionId,
      'user'       => $userId
    ) );    
  }

	/**
	 * unregisters a session
	 * @return void
	 * @param string $sessionId 
	 */
  function unregisterSession( $sessionId )
  {
    $this->deleteWhere(array( 'sessionId' => " = '$sessionId'" ) ); 
  }


  /**
	 * expunge all sessions that have exceeded the timeout
	 * @param int $timeout Timeout in seconds
	 * @return void
	 */
	function expungeStaleSessions( $timeout )
  {
    $this->deleteWhere("
      TIME_TO_SEC( TIMEDIFF( NOW(), `{$this->col_modified}` ) ) > $timeout
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
    $msgModel = new qcl_message_db_model(&$this->controller);
    $msgModel->create();
    $msgModel->setProperty("sessionId",$sessionId);
    $msgModel->setName($message);
    $msgModel->setData(addSlashes(serialize($data)));
    $msgModel->update();
  }
  
  /**
   * gets broadcasted messages for the connected client
   * @return array
   * @param int $sessionId 
   */
  function getBroadcastedMessages( $sessionId )
  {
    $msgModel = new qcl_message_db_model(&$this->controller);
    
    /*
     * get messages that have been stored for session id
     * 
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
