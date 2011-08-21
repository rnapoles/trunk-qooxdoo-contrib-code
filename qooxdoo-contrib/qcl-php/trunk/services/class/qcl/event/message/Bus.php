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
qcl_import("qcl_data_store_keyvalue_Session");

/**
 * Message Bus
 */
class qcl_event_message_Bus
  extends qcl_core_Object
{

	/**
	 * Array of handlers called before a message is broadcasted to
	 * other clients
	 * 
	 * @var array
	 */
	private $onBeforeBroadcast = array();
	
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
   * @param string $filter
   * @param qcl_core_Object $subscriber
   * @param string $method Callback method of the subscriber
   * @deprecated use qcl_event_message_Bus::subscribe() instead
   */
  public function addSubscriber( $filter, $subscriber, $method )
  {
    return $this->subscribe($filter, $subscriber, $method);
  }  

  /**
   * Subscribes  to a channel/message. 
   * Filtering not yet supported, i.e. no wildcards!
   *
   * @param string $channel
   * 		Name of the channel 
   * @param qcl_core_Object|string $subscriber 
   * 		Object subscribing to the channel or the name of the class
   *    that should be instantiated when a message is dispatched
   * @param string $method 
   * 		Callback method of the subscribing object
   */
  public function subscribe( $channel, $subscriber, $method )
  {
    qcl_assert_valid_string($channel, "Invalid channel name" );
    qcl_assert_valid_string($method, "Invalid method name" );
    $filter = $channel; 
    
    if ( is_string( $subscriber ) )
    {
      qcl_assert_true( class_exists( $subscriber ), "Class '$subscriber' does not exist." );
      $subscriber = qcl_getInstance( $subscriber );  
    }
    qcl_assert_true( $subscriber instanceof qcl_core_Object, "Subscriber object/class must subclass qcl_core_Object." );
    
    if ( ! method_exists( $subscriber, $method ) )
    {
      throw new BadMethodCallException("Method $method does not exist on given object");
    }

    $message_db =& $this->messages;

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
   * Registers a callback which is called before a message is
   * broadcasted to another client. This can be used to filter 
   * the messages that are broadcasted. The callback is an array
   * with the object and the name of the method as elements.
   * The callback receives the message object and the session
   * object that the message is about to be dispatched to.
   * @param array $callback
   * @return void
   * @see qcl_event_message_Bus::filterMessage
   */
  public function registerOnBeforeBroadcastCallback( $callback )
  {
  	qcl_assert_array( $callback );
  	qcl_assert_object( $callback[0] );
  	qcl_assert_valid_string( $callback[1] );
		$this->onBeforeBroadcast[] = $callback;
  }
  
  /**
	 * Example filters callback for the registerOnBeforeBroadcastCallback()
	 * method.
	 * @param qcl_event_message_ClientMessage $message
	 * 		The message to dispatch
	 * @param qcl_access_model_Session $sessionModel
	 * 		The loaded model of the session that is to receive the message
	 * @param qcl_access_model_User $userModel
	 * 		The loaded model of the user that is to receive the message
	 * @return boolean True if message should be broadcast, false if not.
	 */
	public function filterMessage( 
		qcl_event_message_ClientMessage $message, 
		qcl_access_model_Session $sessionModel, 
		qcl_access_model_User $userModel )
	{
		return true;
	}
	
  /**
   * Publishes a message. Filtering not yet supported, i.e. message name must
   * match the one that has been used when subscribing the message, i.e. no wildcards!
   *
   * @param qcl_event_message_Message $message Message
   * @param mixed $data Data dispatched with message
   * @return void
   * @deprecated Renamed to "publish"
   */
  public function dispatch ( qcl_event_message_Message $message )	
  {
    return $this->publish( $message );
  }

  /**
   * Publishes a message. Wildcard support exists for local listeners only. 
   * @param qcl_event_message_Message $message Message
   * @param mixed $data Data dispatched with message
   * @return void
   */
  public function publish( qcl_event_message_Message $message )
  {
    /*
     * message data
     */
    $name = $message->getName();
    $data = $message->getData();

    /*
     * models
     */
    static $accessController 	= null;
    static $sessionModel 			= null;
    static $userModel 				= null;
    if( $accessController === null )
    {
			$accessController = $this->getApplication()->getAccessController();
	    $sessionModel 		= $accessController->getSessionModel();
	    $userModel				= $accessController->getUserModel();
    }
    
    $sessionId = $accessController->getSessionId();    
    
    /*
     * search message database
     */
    $message_db = $this->messages;
    if ( count ( $message_db['filters'] ) )
    {
      
      $index = array_search ( $name, $message_db['filters'] );
  
      /*
       * call registered subscriber methods if found
       */
      if ( $index !== false )
      {
        foreach ( $message_db['data'][$index] as $subscriberData )
        {
          list( $subscriberId, $method ) = $subscriberData;
          $subscriber = $this->getObjectById( $subscriberId );
          $subscriber->$method( $message );
        }
      }
      
      /*
       * otherwise try the wildcard matching
       */      
      else 
      {
        $index = 0;
        foreach( $message_db['filters'] as  $filter )
        {
          $pos = strpos( $filter, "*" );
          if( substr( $name, 0, $pos ) == substr( $filter, 0, $pos ) )
          {
            /*
             * found, call subscribers
             */
            foreach ( $message_db['data'][$index] as $subscriberData )
            {
              list( $subscriberId, $method ) = $subscriberData;
              $subscriber = $this->getObjectById( $subscriberId );
              $subscriber->$method( $message );
            }
          }
          $index++;
        }
      }
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
        $sessionModel->findAll();
        while( $sessionModel->loadNext() )
        {
        	/*
        	 * check if user of this session exists, otherwise
        	 * delete the session. This cleans up the session/user data
        	 * on-the-fly.
        	 */
          try 
			    {
			    	$userModel->load( $sessionModel->get("UserId") );	
			    } 
			    catch ( qcl_data_model_RecordNotFoundException $e) 
			    {
			    	$this->warn( "Deleting session with non-existing user: " . $sessionModel->namedId() );
			    	$sessionModel->delete();
			    	continue;
			    }        	
        	
        	/*
        	 * do not dispatch if the message should not be returned to 
        	 * the client itself
        	 */
        	if( $message->isExcludeOwnSession() and $sessionModel->namedId() == $sessionId )
        	{
        		continue;
        	}
        	
          /*
        	 * do not dispatch if the message should not go to anonymous users
        	 * the client itself
        	 */
        	if( $message->isExcludeAnonymousUsers() and $userModel->isAnonymous() )
        	{
        		continue;
        	}
        	
			    /*
			     * do not dispatch the message when one of the registered
			     * callbacks returns false
			     */
        	$cancelDispatch = false;
			    foreach( $this->onBeforeBroadcast as $callback )
			    {
			    	$callbackObject = $callback[0];
			    	$callbackMethod = $callback[1];
			    	if( $callbackObject->$callbackMethod( $message, $sessionModel, $userModel ) === false )
			    	{
			    		$cancelDispatch = true;
			    	}
			    } 
			    if ( $cancelDispatch ) 
			    {
			    	continue;
			    }
			    
			    /*
			     * create a message entry in the database
			     */
			    $data = $message->getData();
          $msgModel->create( array(
            'name'      => $name,
            'data'      => addSlashes( serialize( $data ) )
          ) );
          $msgModel->linkModel( $sessionModel );
        }
        
        return $cancelDispatch ? false : true;
      }

      /*
       * else, store a message for only the connected session
       */
      else
      {
      	$userModel = $this->getApplication()->getAccessController()->getActiveUser();
				foreach( $this->onBeforeBroadcast as $callback )
		    {
		    	$callbackObject = $callback[0];
		    	$callbackMethod = $callback[1];
		    	if( $callbackObject->$callbackMethod( $message, $sessionModel, $userModel ) === false )
		    	{
		    		return false;
		    	}
		    }       	
        $sessionModel->load( $sessionId );
        $msgModel->create( array(
          'name'      => $name,
          'data'      => addSlashes( serialize( $message->getData() ) )
        ) );
        $msgModel->linkModel( $sessionModel );
        return true;
      }
    }
  }

  /**
   * Shorthand method for dispatching a server-only message.
   * @param qcl_core_Object $sender
   * @param string $name
   * @param mixed $data
   * @return bool Whether message was dispatched
   * FIXME rename to "publishMessage" or remove
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
   * @deprecated use publishClientMessage() instead
   */
  public function dispatchClientMessage( $sender, $name, $data )
  {
    qcl_import( "qcl_event_message_ClientMessage" );
    $message = new qcl_event_message_ClientMessage( $name, $data );
    if ( $sender)
    {
      $message->setSender( $sender );
    }
    return $this->publish( $message );
  }
  
  /**
   * Shorthand method for publishing a message that will be forwarded
   * to the client.
   * @param qcl_core_Object $sender
   * @param string $name
   * @param mixed $data
   * @return bool Whether message was dispatched
   */
  public function publishClientMessage( $name, $data )
  {
    qcl_import( "qcl_event_message_ClientMessage" );
    $message = new qcl_event_message_ClientMessage( $name, $data );
    return $this->publish( $message );
  }  

  /**
   * Broadcasts a message to all connected clients.
   * @param qcl_core_Object $sender
   * @param mixed $message 
   * 		Message name or hash map of messages
   * @param mixed $data 
   * 		Data dispatched with message
   * @param bool $excludeOwnSession 
   * 		Whether the current session should be excluded from the broadcast (Default: false).
   * @todo use into qcl_server_Response object
   * @deprecated Use broadcast() instead

   */
  public function broadcastClientMessage ( $sender, $name, $data, $excludeOwnSession=false )
  {
    qcl_import( "qcl_event_message_ClientMessage" );
    $message = new qcl_event_message_ClientMessage( $name, $data );
    $message->setBroadcast( true );
    $message->setExcludeOwnSession( $excludeOwnSession );
    if ( $sender)
    {
      $message->setSender( $sender );
    }
    return $this->dispatch( $message );
  }
  
  /**
   * Broadcasts a message to all connected clients.
   * @param mixed $message 
   *    Message name or hash map of messages
   * @param mixed $data 
   *    Data dispatched with message
   * @param mixed $acl 
   *    Access control data
   * @param bool $excludeOwnSession 
   *    Whether the current session should be excluded from the broadcast (Default: false).
   */
  public function broadcast( $name, $data, $aclData=null, $excludeOwnSession=false )
  {
    qcl_import( "qcl_event_message_ClientMessage" );
    $message = new qcl_event_message_ClientMessage( $name, $data );
    $message->setBroadcast( true );
    $message->setExcludeOwnSession( $excludeOwnSession );
    $message->setAcl( $aclData );
    return $this->publish( $message );
  }  

  /**
   * Returns broadcasted messages for the client with the given session
   * id.
   * @param string $sessionId
   * @return array
   *
   */
  public function getClientMessages( $sessionId )
  {
    $msgModel = $this->getModel();
    $sessionModel = $this->getApplication()->getAccessController()->getSessionModel();
    $sessionModel->load( $sessionId );

    /*
     * find messages that have been stored for session id
     */
    try
    {
      $msgModel->findLinked( $sessionModel );
    }
    catch( qcl_data_model_RecordNotFoundException $e )
    {
    	return array();
    }

    /*
     * get name and data and delete message
     */
    $messages = array();
    $channels = $this->getChannels();
    
    while ( $msgModel->loadNext() )
    {
      $channel = $msgModel->get( "name" );
      $data    = $msgModel->get("data");
      /*
       * check if channel is subscribed
       * @todo this should be checked while dispatching and not
       * while fetching! But the way it is set up requires the
       * session active (since the subscribed channels are stored in
       * the session).
       */
      if ( array_search( $channel, $channels ) !== false )
      {
        //$this->debug( "Sending message to $sessionId, channel $channel", __CLASS__, __LINE__ );
        $messages[] = array(
          'name'  => $channel,
          'data'  => unserialize( stripslashes( $data ) )
        );   
      }
      else 
      {
        //$this->debug( "NOT sending message to $sessionId, channel $channel not in channel list " . implode(",",$channels), __CLASS__, __LINE__ );
      }
      $msgModel->delete();
    }

    /*
     * return message array
     */
    return $messages;
  }
  
  /**
   * Get a list of channels that the client is subscribed to
   * @return array
   */
  public function getChannels()
  {
    $store = new qcl_data_store_keyvalue_Session();
    $key = __CLASS__ . "_channels";
    $channels = $store->has( $key ) ? $store->get($key) : array();
    return $channels;    
  }
  
  /**
   * Adds the given channel to the list of channels that the 
   * client is listening to 
   * @param $name
   */
  public function addChannel( $name )
  {
    $store = new qcl_data_store_keyvalue_Session();
    $key = __CLASS__ . "_channels";
    $channels = $this->getChannels();
    $channels[] = $name;
    $store->set($key, array_unique( $channels ) );
    //$this->debug( "Added channel $name for session " . $this->getApplication()->getAccessController()->getSessionId(), __CLASS__, __LINE__ ); 
  }
  
  /**
   * Returns true if the channel of the given name is subscribed
   * by the current user.
   * @param string $name
   * @return boolean
   */
  public function isSubscribedChannel( $name )
  {
    return in_array($name, $this->getChannels() );
  }
  
  /**
   * Removes the given channel from the list of channels that the 
   * client is listening to 
   * @param $name
   */
  public function removeChannel( $name )
  {
    $store = new qcl_data_store_keyvalue_Session();
    $key = __CLASS__ . "_channels";
    $store->set($key, array_diff( $this->getChannels(), array( $name ) ) );
    //$this->debug( "Removed channel $name for session " . $this->getApplication()->getAccessController()->getSessionId(), __CLASS__, __LINE__ );
  } 
  
  /**
   * Removes all channels
   */
  public function removeAllChannels()
  {
    $store = new qcl_data_store_keyvalue_Session();
    $key = __CLASS__ . "_channels";
    $store->delete($key);
  } 
}
?>