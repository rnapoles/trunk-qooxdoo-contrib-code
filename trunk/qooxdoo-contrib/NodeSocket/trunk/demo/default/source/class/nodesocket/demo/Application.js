/*******************************************************************************
   Copyright:
     The authors of this code
     
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Christian Boulanger (cboulanger)
     * 
 ******************************************************************************/

/* ************************************************************************
#asset(socket.demo/*)
#asset(qx/icon/${qx.icontheme}/16/emotes/*)
#ignore(io.*)
************************************************************************ */

/**
 * This is the main application class of your custom application "socket"
 */
qx.Class.define("nodesocket.demo.Application",
{
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
      Create the UI
     -------------------------------------------------------------------------
     */

      /*
       * container
       */
      var vbox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));
      vbox.set({ width : 500, height : 300});
      this.getRoot().add(vbox, {left : 10,top : 10});
      
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
      hbox.add(chat, {flex : 5 });
      this._chatHtml = chat;

      /*
       * member container
       */
      this._membersList = new qx.ui.list.List(null).set({
        width : 150,
        backgroundColor : "white",        
        labelPath: "user",
        iconPath: "mood",
        iconOptions: {converter : function(data) {
          return "icon/16/emotes/face-" + data + ".png";
        }}
      });

      hbox.add(this._membersList );
      vbox.add(hbox, {flex : 1});

      /*
       * join widget
       */
      var joinWidget = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
      this._joinWidget = joinWidget;
      var userIdWidget = new qx.ui.form.TextField("user" + ( "" + Math.random() ).substr(-4) );
      userIdWidget.addListener("keypress", function(e){
        if ( e.getKeyIdentifier() == "Enter" )
        {
          this._onJoinButtonExecute();
        }
      },this);        
      this._userIdWidget = userIdWidget;

      joinWidget.add(new qx.ui.basic.Label("Please join the chat. Username: "));
      joinWidget.add(userIdWidget);
      
      joinWidget.add(new qx.ui.basic.Label("Mood:"));
      this._emoteSelectBox = new qx.ui.form.SelectBox().set({
        width : 50
      });
      var emotes = ["smile","angel","embarrassed","kiss","laugh","plain","raspberry","sad","smile-big","surprise"]
      emotes.forEach( function(name) {
        var icon = "icon/16/emotes/face-" + name + ".png";
        var item = new qx.ui.form.ListItem(null,icon,name);
        this._emoteSelectBox.add(item);
      },this);
      joinWidget.add(this._emoteSelectBox);
      
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

      // small timeout to make sure socket.io files are loaded and initalized.
      qx.util.TimerManager.getInstance().start(function(){
        /*
         * initialize the socket 
         */
        var chatSocket = new nodesocket.Socket( location.hostname, location.port );
        
        /*
         * redirect "/chat/*" message channel to server
         */
        chatSocket.addServerChannel("/chat/*");
        
        /*
         * listen to channel messages that originate from the server
         */
        qx.event.message.Bus.subscribe("/chat/*", this._onChatMessage, this);
      },null,this,null,500);

      

    },
    
    /*
     -------------------------------------------------------------------------
       PRIVATE MEMBERS
     -------------------------------------------------------------------------
     */    
    _userIdWidget : null,
    _joinWidget : null,
    _chatHtml : null,
    _membersList : null,
    _sendMessageWidget : null,
    _messageTextWidget : null,
    _emoteSelectBox : null,
    
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
      
      var mood = this._emoteSelectBox.getSelection()[0].getModel();
      
      this.join( name, mood );
      this._joinWidget.setVisibility("excluded");
      this._sendMessageWidget.setVisibility("visible");
    },
    
    _onSendButtonExecute : function() 
    {
      this.send( this._messageTextWidget.getValue() );
      this._messageTextWidget.setValue("");
    },
    
    _onLeaveButtonExecute : function() 
    {
      this.leave();
      this._joinWidget.setVisibility("visible");
      this._sendMessageWidget.setVisibility("excluded");      
    },
       
    
    /**
     * Called when a chat message is received from the server
     * @param e {qx.event.message.Message}
     * @return {Void}
     */
    _onChatMessage : function( e ) 
    {
      var channel = e.getName();
      var data    = e.getData();

      /*
       * action depending on channel
       */
      switch ( channel )
      {
        /*
         * member list
         */
        case "/chat/members":
          this._membersList.setModel( qx.data.marshal.Json.createModel(data) );
          break;
        
        case "/chat/join":
          this._addChatText( data.user + " has joined.");
          break;
          
        case "/chat/leave":
          this._addChatText( data.user + " has left.");
          break;
          
        case "/chat/message":
          var from = data.user;
          var text = data.text;
          this._addChatText ( from + ": " + text );
          break;          
      }
    },
    
    _addChatText : function( html )
    {
      this._chatHtml.setHtml( ( this._chatHtml.getHtml() || "" ) + html + "<br/>" );
      var el = this._chatHtml.getContentElement().getDomElement();
      el.scrollTop = el.scrollHeight - el.clientHeight;
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
    join : function( name, mood ) 
    {

      if ( ! mood ) mood = "smile";
      
      /*
       * send message
       */
      qx.event.message.Bus.dispatchByName( "/chat/join", {
        'user' : name,
        'mood' : mood
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
      
      /*
       * send message
       */
      qx.event.message.Bus.dispatchByName( "/chat/leave", { user : this._username } );
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
      qx.event.message.Bus.dispatchByName("/chat/message", {
        'user' : this._username,
        'text' : text
      });
    },
    
    /**
     * Terminate the application
     */
    terminate : function()
    {
      this.leave();
    }
  }
});