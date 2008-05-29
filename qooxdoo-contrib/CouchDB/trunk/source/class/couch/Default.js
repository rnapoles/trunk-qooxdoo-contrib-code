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

  /** default server */
  server:{ check: 'couch.Server', nullable: true },
  
  /** default database */
  database:{ check: 'couch.Database', nullable: true }
  
///////////
},statics:{
///////////

  /** returns the default database 
    @returns {couch.Database}
  **/
  database:function(){
    return couch.Default.getInstance().getDatabase();
  },
  
  /** returns the default server 
   @returns {couch.Server}
  **/
  server:function(){
    return couch.Default.getInstance().getServer();
  },
  
  /** configures the default database and server.
    @param vDatabase {String} name of the database
    @param vServer   {String} path to the couchdb proxy
    @param vUsername {String} optional username for http-authentification
    @param vPassword {String} optional password for http-authentification
    @param vTimeout  {Integer} timeout for requests in miliseconds (default is 5000)
  **/
  configure:function( vDatabase, vServer, vUsername, vPassword, vTimeout ){
    couch.Default.configureServer( vServer, vUsername, vPassword, vTimeout );
    couch.Default.configureDatabase( vDatabase );
  },
  
  /** configures only the default server 
    @param vServer   {String} path to the couchdb proxy
    @param vUsername {String} optional username for http-authentification
    @param vPassword {String} optional password for http-authentification
    @param vTimeout  {Integer} timeout for requests in miliseconds (default is 5000)
  **/
  configureServer:function( vServer, vUsername, vPassword, vTimeout ){
    couch.Default.getInstance().setServer( new couch.Server( vServer, vUsername, vPassword ) );
  },
  
  /** configures only the default database 
    @param vDatabase {String} name of the database
    @param vServer   {couch.Server} a couch.Server instance
  **/
  configureDatabase:function( vDatabase, vServer ){
    couch.Default.getInstance().setDatabase( new couch.Database( vDatabase, vServer ) );
  }

////  
}});
////  
