/*
 * Code adapted from the example shipped with the Socket.IO server
 */

/*
 * configuration
 */
const HTTP_SERVER_PORT = 8088;

/*
 * import objects
 */
var
  qx     = require('./qx-oo').qx
  url    = require('url'),
  fs     = require('fs'),
  sys    = require('sys');      

/**
 * Server classs
 */  
qx.Class.define("nodesocket.demo.server",
{ 
  extend : qx.core.Object,
  
  /*
   ****************************************************************************
     PROPERTIES
   ****************************************************************************
   */    
  properties : 
  {
    
    /**
     * The port this server listens on
     * @type 
     */
    port : 
    {
      check : "Integer",
      nullable : false
    },
    
    /**
     * The file server object responsible for serving static content
     * @type 
     */
    fileServer :
    {
      check : "Object",
      nullable : true
    },
    
    /**
     * The event listener object which is responsible for managing the
     * client connections
     */
    socketEventListener :
    {
      check : "Object",
      nullable : true
    }
  },
  
  
  /*
   ****************************************************************************
     CONSTRUCTOR
   ****************************************************************************
   */    
  
  /**
   * Class constructor
   */
  construct : function( port )
  {
    this.base(arguments);
    
    this.setPort( port );
    
    /*
     * initialize private properties
     */
    this.__buffer  = [];
    this.__members = [];
    this.__membersIndex = {};
  },
    
  /*
   ****************************************************************************
     MEMBERS
   ****************************************************************************
   */  
  members :
  {
   
    /*
     -------------------------------------------------------------------------
       PRIVATE MEMBERS
     -------------------------------------------------------------------------
     */    
    __buffer       : null,
    __members      : null,
    __membersIndex : null,
    
    /*
     -------------------------------------------------------------------------
       MAIN METHODS
     -------------------------------------------------------------------------
     */   
    
    /**
     * Start the server
     */
    start : function()
    {
      
      /*
       * create static file server
       */
      var server = require('http').createServer( qx.lang.Function.bind( this._onServerRequest, this ) );
      server.listen( this.getPort() );
      this.setFileServer(server);
      
      /*
       * create socket.IO event server
       */
      var socket = require('./socket.io');
      var listener = socket.listen(server);
      listener.on('connection', qx.lang.Function.bind( this._onListenerConnection, this ) );
      this.setSocketEventListener( listener );
    },
    
    /*
     -------------------------------------------------------------------------
       EVENT LISTENERS
     -------------------------------------------------------------------------
     */       
    
    /**
     * Callback for the static file server
     * @param {} req
     * @param {} res
     */
    _onServerRequest : function(req, res)
    {
      /*
       * parse request
       */
      var path = url.parse(req.url).pathname;
      var documentRoot = __dirname + "/../../..";
      //console.log( "Requesting  '" + documentRoot + path + "'");
      
      /*
       * serve static files
       * @todo replace with static file server with caching
       * @see http://wiki.github.com/ry/node/modules
       */
      try 
      {
        switch (  path.substr( path.lastIndexOf(".") ) )
        {
          case ".swf":
            res.writeHead(200, { 'Content-Type': 'application/x-shockwave-flash'});
            res.write( fs.readFileSync(  documentRoot + path, 'binary'), 'binary' );
            break;
            
          case ".js": 
            res.writeHead(200, { 'Content-Type': 'text/javascript'});
            res.write(fs.readFileSync(  documentRoot + path, 'utf8' ), 'utf8' );  
            break;
            
          case ".html": 
            res.writeHead(200, { 'Content-Type': 'text/html'});
            res.write(fs.readFileSync(  documentRoot + path, 'utf8' ), 'utf8' );
            break;
            
          case ".png":  
          case ".gif":
          case ".ico":
            res.writeHead(200, { 
              'Content-Type': 'image/' + path.substr( path.lastIndexOf(".") +1 )
            });
            res.write(fs.readFileSync(  documentRoot + path, 'binary' ), 'binary' );
            break;
            
          default:
            this._send404(req,res); 
        }
        
        /*
         * end of response
         */
        res.end();
      } 
      catch(e)
      { 
        console.log(e);
        this._send404(req,res); 
      }
    }, 
    
    /**
     * Send 404 response
     * @param {} req
     * @param {} res
     */
    _send404 : function(req,res)
    {
      res.writeHead(404);
      res.write('The page you requested cannot be found:' + req.url );
      res.end();
    },    
        

    /**
     * Called when the listener has established a new connection
     * @param {} client
     */
    _onListenerConnection: function(client)
    {
      /*
       * send buffer content
       */
      client.send(JSON.stringify({ 'buffer': this.__buffer }));
      
      /*
       * update the members list on this client
       */
      this.updateMemberList(client);
    
      /*
       * register callbacks for this client
       */
      var self = this;
      client.on('message', function(message){
        self._onClientMessage( client, message );
      } ); 
      client.on('disconnect', function(){
        self._onClientDisconnect( client );
      } );
    },  
    
    /**
     * Called when a message is received from the client
     * @param {} message
     */
    _onClientMessage : function(client,message)
    {
      //console.log(message);
      
      /*
       * perform chat-specific actions
       */
      var msg = JSON.parse(message);
      this.chatActions(client,msg);
      
      /*
       * add to the buffer and limit it to 15 entries
       */
      this.__buffer.push(msg);
      if (this.__buffer.length > 15)
      { 
        this.__buffer.shift();
      }
      
      /*
       * broadcast to all other clients
       */
      client.broadcast(message);
    },    
    
    /**
     * Called when client disconnects
     * @param {} client
     */
    _onClientDisconnect : function( client )
    {
      this.updateMemberList(client);
    },
    
    
    /*
     -------------------------------------------------------------------------
       MAIN CHAT METHODS
     -------------------------------------------------------------------------
     */       
    
    /**
     * Check messages for actions to perform
     * @param {} client
     * @param {} msg
     */
    chatActions : function( client, msg )
    {
      /*
       * keep member list for display
       */
      switch( msg.channel )
      {
        case "/chat/join":
          this.__membersIndex[client.sessionId] = this.__members.length;
          this.__members.push({
            'user' : msg.data.user,
            'mood' : msg.data.mood
          });
          this.updateMemberList(client);
          break;  
          
        case "/chat/leave":
          var index = this.__membersIndex[client.sessionId];
          this.__members.splice(index,1);
          delete this.__membersIndex[client.sessionId];
          this.updateMemberList(client);
          break;        
      }  
    },
        
    /**
     * Broadcast the contest of the updated member list
     * @param {} client
     */
    updateMemberList : function( client )
    {
     var msg = JSON.stringify({
       'channel' : "/chat/members",
       'data'    : this.__members
     });
     client.broadcast(msg);  
     client.send(msg);
    }
  }
});

/*
 * start the server
 */
(new nodesocket.demo.server(HTTP_SERVER_PORT)).start();