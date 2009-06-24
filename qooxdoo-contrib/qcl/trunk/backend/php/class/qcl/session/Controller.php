<?php

/*
 * dependencies
 */
require_once "qcl/access/Controller.php";
require_once "qcl/session/Session.php";
require_once "qcl/session/Message.php";
require_once "qcl/server/Server.php";

/**
 * Base class that keeps track of connected clients
 * and dispatches or broadcasts messages. A "session" means the
 * connection established by a particular browser instance.
 */
class qcl_session_Controller extends qcl_access_Controller
{

  /**
   * The id of the active user, determined from the
   * session id
   */
  var $_activeUserId;

  /**
   * This overrides and extends the parent method by providing a way to determine
   * the user by a given session id in the request.
   * @param string[optional] optional session id, if not provided, try to
   * get it from the server data
   * @see qcl_access_Controller::isValidUserSession()
   * @override
   */
  function isValidUserSession( $sessionId=null )
  {

    if ( ! $sessionId )
    {
      /*
       * on-the-fly authentication
       */
      $sessionId = $this->checkServerDataAuthentication();
    }

    /*
     * Does the request contain a session id?
     */
    if ( ! $sessionId )
    {
      $parentSessionId = qcl_server_Server::getServerData("parentSessionId");

      /*
       * Is this a sub-session of a parent session?
       */
      if ( $parentSessionId and ! $this->sessionExists($sessionId) )
      {
        $sessionId = $this->createChildSession($parentSessionId);
        //$this->debug("Created and changed to child session id: $sessionId from parent session: $parentSessionId");
      }
    }

    /*
     * if we have a session id by now, set it and try to
     * get the user from the session
     */
    if ( $sessionId )
    {

      $this->setSessionId( $sessionId );
     //$this->debug("Getting session id from request: $sessionId");

      /*
       * get user from session. if session data is invalid,
       * do not authenticate
       */
      $userId =& $this->getUserIdFromSession( $sessionId );

      if ( $userId )
      {
        $userModel =& $this->getUserModel( $userId );
        $this->setActiveUser( $userModel );

        /*
         * If we have an authenticated user, check for timeout etc.
         */
        if ( ! $this->checkTimeout() )
        {
          /*
           * force log out because of timeout
           */
          $this->forceLogout();
          $this->setError( "Timeout.");
          return false;
        }
      }

      /*
       * error
       */
      else
      {
        $this->raiseError("No valid user id from session.");
        return false;
      }
    }

    /*
     * we have no valid session
     */
    else
    {
      $this->setError("No valid session.");
      return false;
    }

    /*
     * sucess!!
     */
    return true;
  }

  /**
   * Grant guest access
   * @todo config data should be written to config table and deleted when guest user sessions are deleted.
   * @return void
   */
  function grantGuestAccess()
  {
    /*
     * parent method does all the work
     */
    parent::grantGuestAccess();

    /*
     * now register the new session
     */
    $this->registerSession();
  }

  /**
   * Actively authenticate the user with username and password.
   * Returns data for the authentication store.
   *
   * @param string $param[0] username
   * @param string $param[1] (MD5-encoded) password
   * @return qcl_jsonrpc_Response
   */
  function method_authenticate( $params )
  {
    $response = parent::method_authenticate( $params );
    $this->registerSession();
    $this->cleanUp();
    return $response;
  }

  /**
   * @override
   * @see qcl_access_Controller::logout()
   */
  function logout()
  {
    /*
     * unregister the current session
     */
    if ( $this->getSessionId() )
    {
      $this->unregisterSession();
    }

    /*
     * remove other stale sessions as well
     */
    $this->cleanUp();

    /*
     * logout
     */
    return parent::logout();
  }

  //-------------------------------------------------------------
  // session management
  //-------------------------------------------------------------

  /**
   * Returns the session model singleton instance
   * @return qcl_session_Session
   */
  function &getSessionModel()
  {
    return qcl_session_Session::getInstance();
  }

  /**
   * Returns the message model singleton instance
   * @return qcl_session_Message
   */
  function &getMessageModel()
  {
    return qcl_session_Message::getInstance();
  }

  /**
   * Checks if a session with the given id exists
   * @param string $sessionId
   * @return bool
   */
  function sessionExists( $sessionId )
  {
    $sessionModel =& $this->getSessionModel();
    return $sessionModel->exists( array(
      'sessionId' => $sessionId
    ) );
  }

  /**
   * Registers session and user. call from extending controller's constructor
   * requires a user and a session model
   * @param int $timeout Timeout in seconds, defaults to 30 Minutes
   */
  function registerSession($timeout=null)
  {
    /*
     * models
     */
    $activeUser   =& $this->getActiveUser();
    $sessionModel =& $this->getSessionModel();

    /*
     * register current session
     */
    $reqObj =& $this->requestObject();
    $sessionModel->registerSession(
      $this->getSessionId(),
      $activeUser->getId(),
      $reqObj->getIp()
    );

    /*
     * Raise error if session model returns false
     */
    if ( $sessionModel->getError() )
    {
      $this->raiseError( $sessionModel->getError() );
    }
  }

  /**
   * Unregisters the current session and deletes all messages
   */
  function unregisterSession()
  {
    $sessionId = $this->getSessionId();
    $sessionModel =& $this->getSessionModel();
    $sessionModel->unregisterSession( $sessionId );
  }


  /**
   * Removes stale and invalid sessions
   */
  function cleanUp()
  {
    $sessionModel =& $this->getSessionModel();
    $sessionModel->cleanUp();
  }

  /**
   * Terminates a session
   * @override
   */
  function method_terminate()
  {

    $sessionModel =& $this->getSessionModel();
    $activeUser   =& $this->getActiveUser();

    $sessionId = $this->getSessionId();
    $username  = $activeUser->username();

    $this->info("Session #$sessionId ($username) wird beendet.");
    $sessionModel->unregisterSession( $sessionId );

    return $this->response();
  }

  /**
   * Set the active user id from the session id
   * @param int $sessionId
   * @return int|bool if this method returns false, the request should be
   * aborted since the session data refers to a non-existing or expired
   * user.
   */
  function getUserIdFromSession( $sessionId )
  {

    /*
     * look if session exists
     */
    $sessionModel =& $this->getSessionModel();
    $sessionModel->findBy( "sessionId", $sessionId );

    /*
     * if yes, get user id
     */
    if ( $sessionModel->foundSomething() )
    {
      $activeUserId = $sessionModel->get("userId");
      if ( ! $activeUserId )
      {
        $this->setError("Session $sessionId is not connected with a user id!");
        return false;
      }
      $userModel =& $this->getUserModel();
      if ( ! $userModel->exists( array("id" => $activeUserId ) ) )
      {
        $this->setError("Session $sessionId refers to a non-existing user.");
        return false;
      }
      return $activeUserId;
    }
    else
    {
      $this->setError("Session $sessionId does not exist.");
      return false;
    }
  }


  /**
   * Returns a new session id that depends on a parent session and
   * will be deleted when the parent session is deleted.
   */
  function createChildSession( $parentSessionId )
  {
    if ( ! $parentSessionId )
    {
      $this->raiseError("Invalid parent session id.");
    }

    /*
     * get user id from parent session
     */
    $sessionModel =& $this->getSessionModel();
    $sessionModel->findBy("sessionId",$parentSessionId);
    if ( $sessionModel->foundNothing() )
    {
      $this->warn("Parent session $parentSessionId not found...");
      return null;
    }
    $userId = $sessionModel->get("userId");

    /*
     * create random new session id and pass it to the client
     */
    $sessionId = $this->createSessionId();

    //$this->debug("Spawning child session #$sessionId form parent session #$parentSessionId");

    /*
     * register new session
     */
    $reqObj =& $this->requestObject();
    $sessionModel->insert(array(
      'sessionId'       => $sessionId,
      'userId'          => $userId,
      'ip'              => $reqObj->getIp(),
      'parentSessionId' => $parentSessionId
    ));

    return $sessionId;
  }

  //-------------------------------------------------------------
  // messages and events
  //-------------------------------------------------------------

  /**
   * Broadcasts a message to all connected clients
   * @param mixed $messages Message name or hash map of messages
   * @param mixed $data Data dispatched with message
   * @todo use into qcl_jsonrpc_Response object
   */
  function broadcastMessage ( $message, $data=true )
  {
    //$this->info("Broadcast $message");

    if ( is_string ($message) )
    {
      $sessionModel =& $this->getSessionModel();
      $sessionModel->addMessageBroadcast(
        $message,
        $data
      );
    }
    else
    {
      trigger_error ("Invalid broadcast parameter");
    }
  }

  /**
   * Dummy method called simply to forwards messages to client
   * and send logout message when timeout.
   * @return qcl_jsonrpc_Response
   */
  function method_getMessages($params)
  {
    return $this->response();
  }

  //-------------------------------------------------------------
  // Response
  //-------------------------------------------------------------


  /**
   * gets result for json response inclusing result data, events, and messages
   * overriding parent method to include message broadcasts
   * @override
   * @return array
   * @todo use into qcl_jsonrpc_Response object
   */
  function &response()
  {
    $this->addBroadcastMessagesToResponse();
    return parent::response();
  }

  /**
   * adds the messages from the broadcast to the response message queue
   * @return void
   */
  function addBroadcastMessagesToResponse()
  {
    $sessModel =& $this->getSessionModel();
    $messages  =  $sessModel->getBroadcastedMessages($this->getSessionId());

    //$this->info(count($messages) . " broadcasted messages.");

    foreach( $messages as $message )
    {
      $this->addMessage($message['name'],$message['data']);
      //$this->info($message);
    }
  }
}
?>