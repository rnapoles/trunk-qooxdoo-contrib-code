/**

  Configure and maintain optional default server and database.
  When creating instances of documents or views you do not need to specify any
  server or database. The onces configured here are assumed.
  
  Please note that changing the default database or server will only affect newly
  created instances. 
  
  Typical usage:
  
<pre>

  couch.Default.configure('mydatabase', 'path/to/couchdb', 'username', 'password');
  var myDoc = new couch.Document('mydocument');
  
</pre> 

**/
qx.Class.define("couch.Default",{
extend: qx.core.Target,
type: 'singleton',

//////////////////////
construct:function(){
//////////////////////

  this.base(arguments);  

//////////////
},properties:{
//////////////

  // default server
  server:{ check: 'couch.Server', nullable: true },
  
  // default database
  database:{ check: 'couch.Database', nullable: true }
  
///////////
},statics:{
///////////

  /** returns the default database */
  database:function(){
    return couch.Default.getInstance().getDatabase();
  },
  
  /** returns the default server */
  server:function(){
    return couch.Default.getInstance().getServer();
  },
  
  /** configures the default database and server */
  configure:function( vDatabase, vServer, vUsername, vPassword, vTimeout ){
    couch.Default.configureServer( vServer, vUsername, vPassword, vTimeout );
    couch.Default.configureDatabase( vDatabase );
  },
  
  /** configures only the default server */
  configureServer:function( vServer, vUsername, vPassword, vTimeout ){
    couch.Default.getInstance().setServer( new couch.Server( vServer, vUsername, vPassword ) );
  },
  
  /** configures only the default database */
  configureDatabase:function( vDatabase, vServer ){
    couch.Default.getInstance().setDatabase( new couch.Database( vDatabase, vServer ) );
  }

////  
}});
////  
