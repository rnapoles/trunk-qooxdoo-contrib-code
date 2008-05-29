/**

  Models a CouchDB database.
  
  Typical usage:  
<pre>
  
  var myServer = new couch.Server('path/to/my/couch/proxy');
  var myDatabase = myServer.database('myDatabase');
  myDatabase.create();
  myDatabase.once('available', function(){
    alert('database created!');    
  });

  
**/
qx.Class.define("couch.Database",{
extend: couch.Abstract,

/**

 @param vName {String} name of database
 @param vServer {couch.Server} optional server instance to use instead of the default

**/
//////////////////////////////////////
construct:function( vName, vServer ){
//////////////////////////////////////

  this.base( arguments );
  this._setDatabaseName( vName );
  if( vServer ) this._setServer( vServer );
  this.refresh();

//////////////
},properties:{
//////////////

  /** server that is hosting the database */
  _server:{ check: 'couch.Server', nullable: true },

  /** intentional name of the database */
  _databaseName:{ check: 'String' },

  /** information about the database */
  _info:{ check: 'Map', nullable: true, event: 'changeInfo' }

///////////
},members:{
///////////

/** create or use a named Document. 
The document does not yet have to exist. 
      
  @param vId {String} Document-ID  
  
**/

  document:function( vId ){
    return new couch.Document( vId, this );
  },
  
/** create a document and store it on the server.
      
  @param vId {String} Document-ID  
  @param vType {String} a key named 'type' is set to this value
  @param vData {Map} a map containing all the other keys and values
  
**/  

  createDocument:function( vId, vType, vData ){
    var d = new couch.Document( vId, this );
    d.setData(vData);
    d.setKey( 'type', vType );
    d.save();
    return d;
  },
  
/** remove a document from the server.
      
  @param vId {String} Document-ID  
  
**/  

  removeDocument:function( vId ){
    var d = new couch.Document( vType + '_' + vId, this );
    d.refresh();
    d.once('available', function() { d.remove(); });
    return d;
  },
  
/** get a new couch.Design instance given the name of the design. 
This name should not contain the '_design' prefix.
      
  @param vName {String} Name of the design document without the _design prefix
  @returns {couch.Design}
  
**/  

  design:function( vName ){
    return new couch.Design( vName, this );
  },
  
/** request info about the database. 
  @returns {Map} 
**/

  getInfo:function(){
    return this._getInfo();
  },

  _replay:function(){
    this._getSet('_info','');
  },
  
/** create this database on the configured server. */  

  create:function(){
    var req = this.putRequest('');
    req.when('stored', this.refresh, this);
    req.send();
  },
  
/** remove this database from the server. This can not be undone. */

  remove:function(){
    var req = this.deleteRequest('');
    req.when('removed', this.refresh, this);
    req.send();
  },
  
/** get the associated server instance. If not configured this will return the default
server instance. 

  @returns {couch.Server}
*/  

  getServer:function(){
    var vServer = this._getServer();
    if( !vServer ) vServer = couch.Default.server();
    return vServer;
  },
  
/** set a specific couchDB server.
      
  @param vServer {couch.Server} a couch.Server instance
  
**/  

  setServer:function( vServer ){
    this._setServer( vServer ? vServer : null );
  },
  
/** construct an url for this server

  @param vUrl {String} the local part of the url
  @returns {String}
  
**/  
  

  url:function( vUrl ){
    if( vUrl ) vUrl = '/' + vUrl; else vUrl = '/';
    return this.getServer().url( this.getDatabaseName() + vUrl );
  },
  
/** retrieve the name of the database. 
  @returns {String}
**/  

  getDatabaseName:function(){
    return this._getDatabaseName().toLowerCase();
  }

////
}});
////
