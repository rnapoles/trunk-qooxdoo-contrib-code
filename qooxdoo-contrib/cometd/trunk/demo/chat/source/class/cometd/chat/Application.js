/*******************************************************************************
 * 
 * Copyright:
 * 
 * License:
 * 
 * Authors:
 * 
 ******************************************************************************/

/******************************************************************************* 
#asset(cometd/*)
#require(cometd/*)
#require(qx.event.message.*)
******************************************************************************/

/**
 * This is the main application class of your custom application "cometd"
 */
qx.Class.define("cometd.chat.Application", {
	extend : qx.application.Standalone,

	/*
	 ****************************************************************************
	   MEMBERS
	 ****************************************************************************
	 */

	members : 
  {
		/**
		 * This method contains the initial application code and gets called
		 * during startup of the application
		 */
		main : function() 
    {
			// Call super class
			this.base(arguments);

			// Enable logging in debug variant
			if (qx.core.Variant.isSet("qx.debug", "on")) {
				// support native logging capabilities, e.g. Firebug for Firefox
				qx.log.appender.Native;
				// support additional cross-browser console. Press F7 to toggle
				// visibility
				qx.log.appender.Console;
			}

			/*
			 -------------------------------------------------------------------------
			  Application code...
			 -------------------------------------------------------------------------
			 */

			/*
			 * container
			 */
			var vbox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));
			vbox.set({
						width : 500,
						height : 300
					});
			this.getRoot().add(vbox, {
						left : 10,
						top : 10
					});
          
      /*
       * URL of cometd server
       */
      var hbox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
      hbox.add( new qx.ui.basic.Label("Cometd server path: "));
      var serverUrlWidget = new qx.ui.form.TextField("/cometd");
      hbox.add( serverUrlWidget, {flex : 1 } );
      this._serverUrlWidget = serverUrlWidget;
      
			vbox.add( hbox );
      var label = new qx.ui.basic.Label("Note that because of the same-domain policy, the cometd server must listen on the same domain and port from which the javascript has been loaded.");
      label.setRich(true);
      vbox.add( label )
      
			/*
			 * chat message container
			 */
			hbox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
      var chat = new qx.ui.embed.Html();
			chat.set({
				overflowY : "auto",
				decorator : "main",
        backgroundColor : "white"
			});
			hbox.add(chat, {
				flex : 5
			});
			this._chatHtml = chat;

			/*
			 * member container
			 */
			var members = new qx.ui.embed.Html();
			members.set({
				overflowY : "auto",
				decorator : "main",
        backgroundColor : "white"
			});
			hbox.add(members, {
				flex : 1
			});
			this.membersHtml = members;
			vbox.add(hbox, {
				flex : 1
			});
      this._membersHtml = members;

			/*
			 * join widget
			 */
			var joinWidget = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
			this._joinWidget = joinWidget;
			var userIdWidget = new qx.ui.form.TextField("foobar");
      userIdWidget.addListener("keypress", function(e){
        if ( e.getKeyIdentifier() == "Enter" )
        {
          this._onJoinButtonExecute();
        }
      },this);  			
      this._userIdWidget = userIdWidget;

      joinWidget.add(new qx.ui.basic.Label("Please join the chat. Username: "));
			joinWidget.add(userIdWidget);
			var button = new qx.ui.form.Button("Join");
			button.addListener("execute", this._onJoinButtonExecute, this);
    
			joinWidget.add(button);
			vbox.add(joinWidget);

			/*
			 * send message widget
			 */
			var sendMessageWidget = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
			this._sendMessageWidget = sendMessageWidget;
			sendMessageWidget.add(new qx.ui.basic.Label("Chat: "));
			var messageText = new qx.ui.form.TextField();
      messageText.addListener("keypress", function(e){
        if ( e.getKeyIdentifier() == "Enter" )
        {
          this._onSendButtonExecute();
          messageText.setValue("");
        }
      },this);      
			this._messageTextWidget = messageText;
			sendMessageWidget.add(messageText, { flex : 1 });
			var button = new qx.ui.form.Button("Send");
			button.addListener("execute", this._onSendButtonExecute, this);
			sendMessageWidget.add(button);
			var button = new qx.ui.form.Button("Leave Chat");
			button.addListener("execute", this._onLeaveButtonExecute, this);
			sendMessageWidget.add(button);
			sendMessageWidget.setVisibility("excluded");
			vbox.add(sendMessageWidget);
      
      /*
       * cometd instance
       */
      this._cometd = new cometd.Client();
      
      /*
       * subscribe to comet messages
       */
      qx.event.message.Bus.subscribe("/cometd/meta", this._onServerMessage, this);      
      
		},
    
    /*
     -------------------------------------------------------------------------
       PRIVATE MEMBERS
     -------------------------------------------------------------------------
     */    
    _serverUrlWidget : null,
    _userIdWidget : null,
    _joinWidget : null,
    _chatHtml : null,
    _membersHtml : null,
    _sendMessageWidget : null,
    _messageTextWidget : null,
    
    _cometd : null,
    _last : "",
    _username : null,
    _connected : true,
    
    /*
     -------------------------------------------------------------------------
       EVENT HANDLERS
     -------------------------------------------------------------------------
     */      

		_onJoinButtonExecute : function() 
    {
		  var name = this._userIdWidget.getValue();
      if (name == null || name.length == 0) 
      {
        alert('Please enter a username!');
        return;
      }
      this.join( name );
      this._joinWidget.setVisibility("excluded");
      this._sendMessageWidget.setVisibility("visible");
    },
    
		_onSendButtonExecute : function() 
    {
      this.send( this._messageTextWidget.getValue() );
		},
		
    _onLeaveButtonExecute : function() 
    {
      this.leave();
      this._joinWidget.setVisibility("visible");
      this._sendMessageWidget.setVisibility("excluded");      
		},
    
    /**
     * Called when a chat message is received from the server
     * or a pseudo message is generated on the client
     * @param {Map} message
     * @return {Void}
     */
    _onChatMessage : function( message ) 
    {
      if (!message.data) 
      {
        this.warn("bad message format " + message);
        return;
      }

      if (message.data instanceof Array) 
      {
        var list = "";
        for (var i in message.data)
          list += message.data[i] + "<br/>";
        this._membersHtml.setHtml(list);
      } 
      else 
      {
        var from = message.data.user;
        var membership = message.data.join || message.data.leave;
        var text = message.data.chat;
        if (!text)
        {
          return;
        }
        
        if (!membership && from == this._last) 
        {
          from = "...";
        } 
        else 
        {
          this._last = from;
          from += ":";
        }

        /*
         * add new data
         */
        var html = this._chatHtml.getHtml();
        if (membership) 
        {
          html += "<span class=\"membership\"><span class=\"from\">"
              + from
              + "&nbsp;</span><span class=\"text\">"
              + text + "</span></span><br/>";
          this._last = "";
          
        } 
        else if (message.data.scope == "private") 
        {
          html += "<span class=\"private\"><span class=\"from\">"
              + from
              + "&nbsp;</span><span class=\"text\">[private]&nbsp;"
              + text + "</span></span><br/>";
        } 
        else 
        {
          html += "<span class=\"from\">" + from
              + "&nbsp;</span><span class=\"text\">" + text
              + "</span><br/>";
        }
        this._chatHtml.setHtml( html );
        
        // @todo
        var el = this._chatHtml.getContentElement().getDomElement();
        el.scrollTop = el.scrollHeight - el.clientHeight;
      }
    },


    /**
     * Called when receiving a message from the server
     */
    _onServerMessage : function(e) 
    {
      var data = e.getData();
      
      if (data.action == "handshake") 
      {
        if ( data.successful ) 
        {
          this._subscription = this._cometd.subscribe("/chat/demo", this, "_onChatMessage");
          this._cometd.publish("/chat/demo", {
                user : this._username,
                join : true,
                chat : this._username
                    + (data.reestablish
                        ? " has re-joined"
                        : " has joined")
              });
        }

        if (data.reestablish) 
        {
          this._onChatMessage({
                data : {
                  join : true,
                  user : "SERVER",
                  chat : "handshake " + data.successful
                      ? "Handshake OK"
                      : "Failed"
                }
              });
        }
      } else if (data.action == "connect") 
        {
        if ( data.successful && !this._connected) 
        {
          this._onChatMessage({
            data : {
              join : true,
              user : "SERVER",
              chat : "reconnected!"
            }
          });
        }
        if (! data.successful && this._connected) 
        {
          this._onChatMessage({
            data : {
              leave : true,
              user : "SERVER",
              chat : "disconnected!"
            }
          });
        }
        this._connected = data.successful;
      }
    },

    /*
     -------------------------------------------------------------------------
       PUBLIC API
     -------------------------------------------------------------------------
     */   

    /**
     * Join the chat with the given username
     * @param {String} name
     * @return {Void}
     */
		join : function(name) 
    {
      if ( !name )
      {
        this.error("Missing user name!");
      }
      
      /*
       * enable ack extension by default
       */
			this._cometd.ackEnabled =  true;
      
      /*
       * empty containers
       */
      this._chatHtml.setHtml("");
      this._membersHtml.setHtml("");
      
      /*
       * connect
       */
			this._cometd.init({
				url :  this._serverUrlWidget.getValue(),
				logLevel : "info"
			});

      this._connected = true;
			this._username = name;
		},

    /**
     * Leave the chat
     */
		leave : function() 
    {      
			if ( ! this._username )
      {
				return;
			}

			this._cometd.startBatch();			
			this._cometd.publish("/chat/demo", {
						user  : this._username,
						leave : true,
						chat  : this._username + " has left"
					});
			this._cometd.endBatch();
			this._cometd.disconnect();
      this._cometd.unsubscribe(this._subscription);

      
      this._membersHtml.setHtml("");
      this._chatHtml.setHtml("");
      this._username = null;
      this._connected = false;
		},
    
    /**
     * Send chat message
     * @param {String} text
     * @return {Boolean}
     */
		send : function(text) 
    {
try{      
			if (!text || !text.length) {
				return false;
			}
      
			var colons = text.indexOf("::");
			if (colons > 0) {
				this._cometd.publish("/service/privatechat", {
					room : "/chat/demo",
					user : this._username,
					chat : text.substring(colons + 2),
					peer : text.substring(0, colons)
				});
			} 
      else 
      {
				this._cometd.publish("/chat/demo", {
					user : this._username,
					chat : text
				});
			}
}catch(e){console.warn(e)}
		},
    
    terminate : function()
    {
      this.leave();
    }
	}
});
