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

qcl_import( "qcl_data_model_db_NamedActiveRecord" );

/**
 * Model for session data bases on a mysql database model.
 * 'Session' here means the connection established by a particular
 * browser instance.
 */
class qcl_access_model_Session2
  extends qcl_data_model_db_NamedActiveRecord
{

  /**
   * Table name
   */
  protected $tableName = "data_Session";

  /**
   * Properties of the model
   * @var unknown_type
   */
  private $properties = array(
    'parentSessionId' => array(
      'check'     => QCL_PROPERTY_CHECK_STRING,
      'sqltype'   => "varchar(50)"
    ),
    'ip' => array(
      'check'     => QCL_PROPERTY_CHECK_STRING,
      'sqltype'   => "varchar(32)"
    )
  );

  /**
   * Indexes
   */
  private $indexes = array(
    "session_index" => array(
      "type"        => "unique",
      "properties"  => array("namedId","ip")
    )
  );

  /**
   * Relations of the model
   */
  private $relations = array(
    'User_Session'  => array(
      'type'    => QCL_RELATIONS_HAS_ONE,
      'target'  => array( 'class'  => "qcl_access_model_User2" )
    )
  );

  /**
   * Constructor
   */
  function __construct()
  {
    parent::__construct();
    $this->addProperties( $this->properties );
    $this->addRelations( $this->relations, __CLASS__ );
    $this->addIndexes( $this->indexes );
  }

  /**
   * Returns singleton instance.
   * @static
   * @return qcl_access_model_Session2
   */
  public static function getInstance()
  {
    return qcl_getInstance(__CLASS__);
  }

  /**
   * Shorthand getter for access behavior
   * @return qcl_access_Behavior
   */
  function getAccessBehavior()
  {
    return $this->getApplication()->getAccessBehavior();
  }

	//-------------------------------------------------------------
  // API methods
  //-------------------------------------------------------------

	/**
	 * Registers a session. adds an entry with the current timestamp if the session
	 * doesn't exist, otherwise leaves the last action column alone.
	 *
	 * @return void
	 * @param string $sessionId The id of the current session
	 * @param qcl_access_model_User2 $user
	 * @param string $ip The IP address of the requesting client. This makes sure
	 * session ids cannot be "stolen" by an intercepting party
	 */
  function registerSession( $sessionId, qcl_access_model_User2 $user, $ip )
  {

    $this->log( sprintf("Registering session '%s', for %s from IP %s ", $sessionId, $user, $ip ), QCL_LOG_ACCESS );

    /*
     * if session id is present but linked to a different IP
     * there is a security breach, unless the request was originated
     * on the local host
     */
    $localhost    = ( $ip=="::1" or $ip=="127.0.0.1" );
    $sessionMismatch = $this->countWhere( array(
      'namedId' => $sessionId,
      'ip'      => array( "!=", $ip )
    ) );
    if ( ! $localhost and $sessionMismatch )
    {
      throw new qcl_access_AccessDeniedException("Access denied");
    }

    /*
     * create new session data if it doesn't already exist
     */
    $this->createIfNotExists( $sessionId, array(
      $user->foreignKey()  => $user->id(),
      'ip'                 => $ip
    ) );

    return true;

  }

  /**
   * Check if user is registered
   * @param $sessionId
   * @param qcl_access_model_User2 $user
   * @param $ip
   * @return unknown_type
   */
  function isRegistered( $sessionId, qcl_access_model_User2 $user, $ip )
  {
    return $this->countWhere( array(
      'namedId'              => $sessionId,
       $user->foreignKey()   => $user->id(),
      'ip'                   => $ip
    ) );
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
    $this->load( $sessionId );
    $this->delete();
  }
}
?>