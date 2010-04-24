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

qcl_import("qcl_core_Object");

/**
 * Message Bus
 */
class qcl_event_message_Bus
  extends qcl_core_Object
{

  /**
   * The message database
   * @var array
   */
  private $messages = array(
    'filters'  => array(),
    'data'     => array()
  );

  /**
   * Returns a singleton instance of this class
   * @return qcl_event_message_Bus
   */
  static function getInstance( )
  {
    return qcl_getInstance( __CLASS__ );
  }


  /**
   * Returns the message data model.
   * @return qcl_event_message_db_Message
   */
  public function getModel()
  {
    qcl_import("qcl_event_message_db_Message");
    return qcl_event_message_db_Message::getInstance();
  }

  /**
   * Adds a message subscriber. This works only for objects which have been
   * initialized during runtime. Filtering not yet supported, i.e. message name must
   * match the one that has been used when subscribing the message, i.e. no wildcards!
   *
   *
   * @param string $filter
   * @param qcl_core_Object $subscriber
   * @param string $method Callback method of the subscriber
   */
  public function addSubscriber( $filter, $subscriber, $method )
  {
    if ( ! $filter or ! $method or ! is_a( $subscriber, "qcl_core_Object" ) )
    {
      $this->raiseError("Invalid parameter.");
    }

    $message_db = $this->messages;

    /*
     * object id
     */
    $subscriberId = $subscriber->objectId();

    /*
     * search if we already have an entry for the filter
     */
    $index = array_search( $filter, $message_db['filters'] );
    if ( $index === false )
    {
      /*
       * filter not found, create new filter and data
       */
      $message_db['filters'][] = $filter;
      $index = count($message_db['filters']) -1;
      $message_db['data'][$index] = array(
        array( $subscriberId, $method )
      );
    }
    else
    {
      /*
       * filter found, add data
       */
      $message_db['data'][$index][] = array( $subscriberId, $method );
    }
  }

  /**
   * Dispatches a message. Filtering not yet supported, i.e. message name must
   * match the one that has been used when subscribing the message, i.e. no wildcards!
   *
   * @param qcl_event_message_Message $message Message
   * @param mixed $data Data dispatched with message
   * @return void
   */
  public function dispatch ( qcl_event_message_Message $message )
  {

    /*
     * message data
     */
    $name = $message->getName();
    $data = $message->getData();

    /*
     * search message database
     */
    $message_db = $this->messages;
    $index = array_search ( $name, $message_db['filters'] );

    /*
     * call registered subscriber methods
     */
    if ( $index !== false )
    {
      foreach ( $message_db['data'][$index] as $subscriberData )
      {
        list( $subscriberId, $method ) = $subscriberData;
        $subscriber = $this->getObjectById( $subscriberId );
        $subscriber->$method( $message );
      }
      return true;
    }

    /**
     * Broadcast message to connected clients
     */
    if ( $message instanceof qcl_event_message_ClientMessage )
    {
      $msgModel = $this->getModel();

      /*
       * if message is a broadcast, get the ids of all sessions and store
       * a message for each session
       */
      if ( $message->isBroadcast() )
      {
        $sessionModel = $this->getApplication()->getAccessController()->getSessionModel();
        $sessionIds = $sessionModel->getQueryBehavior()->fetchValues("sessionId");

        foreach( $sessionIds as $sessionId )
        {
          $msgModel->create( array(
            'sessionId' => $sessionId,
            'name'      => $name,
            'data'      => addSlashes( serialize( $data ) )
          ) );
        }
      }

      /*
       * else, store a message for only the connected session
       */
      else
      {
        $sessionId = $this->getApplication()->getAccessController()->getSessionId();
        $msgModel->create( array(
          'sessionId' => $sessionId,
          'name'      => $name,
          'data'      => addSlashes( serialize( $data ) )
        ) );
      }
    }
  }

  /**
   * Shorthand method for dispatching a server-only message.
   * @param qcl_core_Object $sender
   * @param string $name
   * @param mixed $data
   * @return bool Whether message was dispatched
   */
  public function dispatchMessage( $sender, $name, $data )
  {
    qcl_import( "qcl_event_message_Message" );
    $message = new qcl_event_message_Message( $name, $data );
    if ( $sender)
    {
      $message->setSender( $sender );
    }
    return $this->dispatch( $message );
  }

  /**
   * Shorthand method for dispatching a message that will be forwarded
   * to the client.
   * @param qcl_core_Object $sender
   * @param string $name
   * @param mixed $data
   * @return bool Whether message was dispatched
   */
  public function dispatchClientMessage( $sender, $name, $data )
  {
    qcl_import( "qcl_event_message_ClientMessage" );
    $message = new qcl_event_message_ClientMessage( $name, $data );
    if ( $sender)
    {
      $message->setSender( $sender );
    }
    return $this->dispatch( $message );
  }

  /**
   * Broadcasts a message to all connected clients.
   * @param qcl_core_Object $sender
   * @param mixed $message Message name or hash map of messages
   * @param mixed $data Data dispatched with message
   * @todo use into qcl_server_Response object
   */
  public function broadcastClientMessage ( $sender, $name, $data )
  {
    qcl_import( "qcl_event_message_ClientMessage" );
    $message = new qcl_event_message_ClientMessage( $name, $data );
    $message->setBroadcast( true );
    if ( $sender)
    {
      $message->setSender( $sender );
    }
    return $this->dispatch( $message );
  }

  /**
   * Returns broadcasted messages for the client with the given session
   * id.
   * @param int $sessionId
   * @return array
   *
   */
  public function getClientMessages( $sessionId )
  {
    $msgModel = $this->getModel();

    /*
     * get messages that have been stored for session id
     */
    $msgModel->findWhere( array(
      'sessionId' => $sessionId
    ) );

    $messages = array();
    while ( $msgModel->loadNext() )
    {
      $messages[] = array(
        'name'  => $msgModel->get( "name" ),
        'data'  => unserialize( stripslashes( $msgModel->get("data") ) )
      );
    };

    /*
     * delete messages
     */
    $msgModel->deleteWhere( array(
      'sessionId' => $sessionId
    ) );

    /*
     * return message array
     */
    return $messages;
  }
}
?>