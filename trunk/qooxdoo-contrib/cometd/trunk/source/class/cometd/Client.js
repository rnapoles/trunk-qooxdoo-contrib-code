/* ************************************************************************

   Copyright:
     2009 ACME Corporation -or- Your Name, http://www.example.com
     
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Christian Boulanger (cboulanger)
     * 
************************************************************************ */

/* ************************************************************************

#asset(cometd/*)

************************************************************************ */

/**
 * This is the main class of contribution "cometd-qx"
 * 
 * TODO: Replace the sample code of a custom button with the actual code of 
 * your contribution.
 */
qx.Class.define("cometd.Client",
{
  extend : qx.core.Object,
  
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * Initialize the cometd client
   */
  construct : function() 
  {
    this.base(arguments);
    
    /*
     * check for required libraries
     * @todo remove dojo dependency
     */
    if ( ! window.dojo )
    {
      this.error("For the moment, you must load the dojo.js library in your index.html");
    }
    if ( ! window.org || ! org.cometd )
    {
      this.error("You must load the cometd.js library in your index.html");
    }
    
    /*
     * Remap cometd JSON functions to qx JSON functions
     */
    org.cometd.JSON.toJSON = function( data )
    {
      return qx.util.Json.stringify(data);
    }
    org.cometd.JSON.fromJSON = function( data )
    {
      return qx.util.Json.parse(data);
    }
    
    /*
     * Remap comet AJAX functions to dojo AJAX functions
     * @todo remap to qooxdoo transport
     */
    org.cometd.AJAX.send = function(packet)
    {
        var transportType = packet.transport.getType();
        
        if (transportType == 'long-polling')
        {
            // @todo qx'ify
            var deferred = dojo.rawXhrPost({
                url: packet.url,
                contentType: 'text/json;charset=UTF-8',
                headers: packet.headers,
                postData: packet.body,
                handleAs: 'json',
                load: packet.onSuccess,
                error: function(error) {           
                  packet.onError(error.message, deferred.ioArgs.error); 
                }
            });
            return deferred.ioArgs.xhr;
        }
        else if (transportType == 'callback-polling')
        {
            // @todo qx'ify
            dojo.io.script.get({
                url: packet.url,
                callbackParamName: 'jsonp',
                content: {
                    // In callback-polling, the content must be sent via the 'message' parameter
                    message: packet.body
                },
                load: packet.onSuccess,
                error: function(error) { packet.onError(error.message, deferred.ioArgs.error); }
            });
            return undefined;
        }
        else
        {
            throw 'Unsupported transport ' + transportType;
        }
    };
    
    /*
     * The default cometd instance
     */
    this.cometd = new org.cometd.Cometd();
    
    /*
     * Add listeners for server event, dispatching a
     * message called "/cometd/meta" with the event
     */
    this.cometd.addListener('/meta/handshake', this, function(event)
    {
        event.action="handshake";
        qx.event.message.Bus.dispatch("/cometd/meta",event);
    });
    this.cometd.addListener('/meta/connect', this, function(event)
    {
        event.action="connect";
        qx.event.message.Bus.dispatch("/cometd/meta",event);
    });
        
    /*
     * register extensions
     */
    if ( org.cometd.AckExtension )
    {
      this.registerExtension('ack', new org.cometd.AckExtension());  
    }
    
    if ( org.cometd.ReloadExtension )
    {
      // Remap cometd COOKIE functions to qooxdoo cookie functions
      org.cometd.COOKIE.set = qx.bom.Cookie.set;
      org.cometd.COOKIE.get = qx.bom.Cookie.get;
      this.registerExtension('reload', new org.cometd.ReloadExtension());
    }
    
    if ( org.cometd.TimeStampExtension )
    {
      this.registerExtension('timestamp', new org.cometd.TimeStampExtension());
    }
    
    if ( org.cometd.TimeSyncExtension )
    {
      this.cometd.timesync=new org.cometd.TimeSyncExtension();
      this.registerExtension('timesync', this.cometd.timesync);
    }
  },
  
  /*
  *****************************************************************************
    MEMBERS
  *****************************************************************************
  */ 
  members :
  {
    /**
     * org.cometd.Cometd instance
     */
    cometd : null,
    
    /**
     * Configures the initial Bayeux communication with the Bayeux server.
     * Configuration is passed via an object that must contain a mandatory field <code>url</code>
     * of type string containing the URL of the Bayeux server.
     * @param configuration the configuration object
     */
    configure : function(configuration)
    {
        this.cometd.configure(configuration);
    },
    
    /**
     * Configures and establishes the Bayeux communication with the Bayeux server
     * via a handshake and a subsequent connect.
     * @param configuration the configuration object
     * @param handshakeProps an object to be merged with the handshake message
     * @see #configure(configuration)
     * @see #handshake(handshakeProps)
     * @return {Void}
     */
    init : function(configuration, handshakeProps)
    {
        this.cometd.init(configuration, handshakeProps);
    },
    
    /**
     * Establishes the Bayeux communication with the Bayeux server
     * via a handshake and a subsequent connect.
     * @param handshakeProps an object to be merged with the handshake message
     * @return {Void}
     */
    handshake : function(handshakeProps)
    {
        this.cometd.handshake(handshakeProps);
    },
    
    /**
     * Disconnects from the Bayeux server.
     * @param disconnectProps an object to be merged with the disconnect message
     */
    disconnect : function(disconnectProps)
    {
        this.cometd.disconnect(disconnectProps)
    },
    
    /**
     * Marks the start of a batch of application messages to be sent to the server
     * in a single request, obtaining a single response containing (possibly) many
     * application reply messages.
     * Messages are held in a queue and not sent until {@link #endBatch()} is called.
     * If startBatch() is called multiple times, then an equal number of endBatch()
     * calls must be made to close and send the batch of messages.
     * @see #endBatch()
     */
    startBatch : function()
    {
        this.cometd.startBatch();
    },
    
    /**
     * Marks the end of a batch of application messages to be sent to the server
     * in a single request.
     * @see #startBatch()
     */
    endBatch : function()
    {
        this.cometd.endBatch();
    },
    
    /**
     * Adds a listener for bayeux messages, performing the given callback in the given scope
     * when a message for the given channel arrives.
     * @param channel the channel the listener is interested to
     * @param scope the scope of the callback, may be omitted
     * @param callback the callback to call when a message is sent to the channel
     * @returns the subscription handle to be passed to {@link #removeListener(object)}
     * @see #removeListener(object)
     */
    addListener : function(channel, scope, callback)
    {
        return this.cometd.addListener(channel, scope, callback);
    },
    
    /**
     * Removes the subscription obtained with a call to {@link #addListener(string, object, function)}.
     * @param subscription the subscription to unsubscribe.
     */
    removeListener : function(subscription)
    {
        this.cometd.removeListener(subscription);
    },
    
    /**
     * Removes all listeners registered with {@link #addListener(channel, scope, callback)} or
     * {@link #subscribe(channel, scope, callback)}.
     */
    clearListeners : function()
    {
        this.cometd.clearListeners();
    },
    
    /**
     * Subscribes to the given channel, performing the given callback in the given scope
     * when a message for the channel arrives.
     * @param channel the channel to subscribe to
     * @param scope the scope of the callback, may be omitted
     * @param callback the callback to call when a message is sent to the channel
     * @param subscribeProps an object to be merged with the subscribe message
     * @return the subscription handle to be passed to {@link #unsubscribe(object)}
     */
    subscribe : function(channel, scope, callback, subscribeProps)
    {
       return this.cometd.subscribe(channel, scope, callback, subscribeProps);
    },
    
    /**
     * Unsubscribes the subscription obtained with a call to {@link #subscribe(string, object, function)}.
     * @param subscription the subscription to unsubscribe.
     */
    unsubscribe : function(subscription, unsubscribeProps)
    {
       this.cometd.unsubscribe(subscription, unsubscribeProps);
    },
    
    /**
     * Removes all subscriptions added via {@link #subscribe(channel, scope, callback, subscribeProps)},
     * but does not remove the listeners added via {@link addListener(channel, scope, callback)}.
     */
    clearSubscriptions : function()
    {
        this.cometd.clearSubscriptions();
    },
    
    /**
     * Publishes a message on the given channel, containing the given content.
     * @param channel the channel to publish the message to
     * @param content the content of the message
     * @param publishProps an object to be merged with the publish message
     */
    publish : function(channel, content, publishProps)
    {
        this.cometd.publish(channel, content, publishProps);
    },
    
    /**
     * Returns a string representing the status of the bayeux communication with the Bayeux server.
     */
    getStatus : function()
    {
        return this.cometd.getStatus();
    },
    
    /**
     * Sets the backoff period used to increase the backoff time when retrying an unsuccessful or failed message.
     * Default value is 1 second, which means if there is a persistent failure the retries will happen
     * after 1 second, then after 2 seconds, then after 3 seconds, etc. So for example with 15 seconds of
     * elapsed time, there will be 5 retries (at 1, 3, 6, 10 and 15 seconds elapsed).
     * @param period the backoff period to set
     * @see #getBackoffIncrement()
     */
    setBackoffIncrement : function(period)
    {
        this.cometd.setBackoffIncrement(period);
    },
    
    /**
     * Returns the backoff period used to increase the backoff time when retrying an unsuccessful or failed message.
     * @see #setBackoffIncrement(period)
     */
    getBackoffIncrement : function()
    {
        return this.cometd.getBackoffIncrement();
    },
    
    /**
     * Returns the backoff period to wait before retrying an unsuccessful or failed message.
     */
    getBackoffPeriod : function()
    {
        return this.cometd.getBackoffPeriod();
    },
    
    /**
     * Sets the log level for console logging.
     * Valid values are the strings 'error', 'warn', 'info' and 'debug', from
     * less verbose to more verbose.
     * @param level the log level string
     */
    setLogLevel : function(level)
    {
        this.cometd.setLogLevel(level);
    },
    
    /**
     * Registers an extension whose callbacks are called for every incoming message
     * (that comes from the server to this client implementation) and for every
     * outgoing message (that originates from this client implementation for the
     * server).
     * The format of the extension object is the following:
     * <pre>
     * {
     *     incoming: function(message) { ... },
     *     outgoing: function(message) { ... }
     * }
     * </pre>
     * Both properties are optional, but if they are present they will be called
     * respectively for each incoming message and for each outgoing message.
     * @param name the name of the extension
     * @param extension the extension to register
     * @return true if the extension was registered, false otherwise
     * @see #unregisterExtension(name)
     */
    registerExtension : function(name, extension)
    {
        return this.cometd.registerExtension(name, extension);
    },
    
    /**
     * Unregister an extension previously registered with
     * {@link #registerExtension(name, extension)}.
     * @param name the name of the extension to unregister.
     * @return true if the extension was unregistered, false otherwise
     */
    unregisterExtension : function(name)
    {
       return this.cometd.unregisterExtension(name);
    },
    
    /**
     * Find the extension registered with the given name.
     * @param name the name of the extension to find
     * @return {Function} the extension found or null if no extension with the given name has been registered
     */
    getExtension : function(name)
    {
      return this.cometd.getExtension(name);
    },
    
    /**
     * Returns the name assigned to this Cometd object, or the string 'default'
     * if no name has been explicitely passed as parameter to the constructor.
     * @return {String}
     */
    getName : function()
    {
        return this.cometd.getName();
    },
    
    /**
     * Returns the clientId assigned by the Bayeux server during handshake.
     * @return {Integer}
     */
    getClientId : function()
    {
        return this.cometd.getClientId();
    },
    
    /**
     * Returns the URL of the Bayeux server.
     * @return {String}
     */
    getURL : function()
    {
        return this.cometd.getURL();
    }
  }
});
