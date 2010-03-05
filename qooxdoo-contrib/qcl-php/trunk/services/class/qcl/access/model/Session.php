<?php
/*
 * qcl - the qooxdoo component library
 *
 * http://qooxdoo.org/contrib/project/qcl/
 *
 * Copyright:
 *   2007-2009 Christian Boulanger
 *
 * License:
 *   LGPL: http://www.gnu.org/licenses/lgpl.html
 *   EPL: http://www.eclipse.org/org/documents/epl-v10.php
 *   See the LICENSE file in the project's top-level directory for details.
 *
 * Authors:
 *  * Christian Boulanger (cboulanger)
 */
require_once "qcl/data/model/xmlSchema/DbModel.php";

/**
 * Model for session data bases on a mysql database model.
 * 'Session' here means the connection established by a particular
 * browser instance.
 */
class qcl_access_model_Session
  extends qcl_data_model_xmlSchema_DbModel
{

  /**
   * the path to the model schema xml file
   * @see qcl_data_model_xmlSchema_DbModel::getSchmemaXmlPath()
   * @var string
   */
  var $schemaXmlPath = "qcl/access/model/Session.model.xml";


  /**
   * Returns singleton instance.
   * @static
   * @return qcl_access_model_Session
   */
  function getInstance()
  {
    return qcl_getInstance(__CLASS__);
  }

  /**
   * Getter for access manager
   * @return unknown_type
   */
  function getAccessManager()
  {
    return qcl_access_Manager::getInstance();
  }

	//-------------------------------------------------------------
  // API methods
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
    $controller = $this->getController();

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
     * @todo build this into the model code
     */
    $activeUser = $this->getAccessManager()->getActiveUser();
    if( ! $activeUser ) return;
    $userTable =  $activeUser->getTableName();
    $this->deleteWhere("
      markedDeleted = 1
      OR userId NOT IN ( SELECT id FROM `$userTable` )
      OR TIME_TO_SEC( TIMEDIFF( NOW(), `modified` ) ) > 3600
    ");

    /*
     * Delete messages that have been deleted, or refer to non-existing sessions
     * @todo this should all be done automatically through association
     * management
     */
    $msgModel = $this->getMessageBus()->getModel();
    if ( $msgModel )
    {
      $sessTable  = $this->getTableName();
      $msgModel->deleteWhere("
        markedDeleted = 1 OR
        sessionId NOT IN ( SELECT sessionId FROM `$sessTable` )
      ");
    }
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
    $msgModel = $this->getMessageBus()->getModel();
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
    $table = $this->table();
    $this->db->execute("
      UPDATE `$table`
      SET `markedDeleted` = 1
      WHERE `userId`  = $userId
    ");
  }
}
?>