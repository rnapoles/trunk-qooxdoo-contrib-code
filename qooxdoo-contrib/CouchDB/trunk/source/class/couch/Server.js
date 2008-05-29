/**

  This models a CouchDB server.

**/
qx.Class.define("couch.Server",{
extend: couch.Abstract,

/**

  vPath {String} the path of the server
  vUsername {String} optional username for http-authentification
  vPassword {String} optional password for http-authentification
  vTimeout {Integer ? 5000} optional timeout in miliseconds. 

**/

/////////////////////////////////////////////////////////////
construct:function( vPath, vUsername, vPassword, vTimeout ){
/////////////////////////////////////////////////////////////

  this.base( arguments );
  this.addEventListener( 'changePath', this._updateUrl, this );

  // setting server url if provided
  if( vPath ) this.setPath( vPath );

  // setting authentification if provided
  if( vUsername ) this.setUsername( vUsername );
  if( vPassword ) this.setPassword( vPassword );

  // setting timeout if provided
  if( vTimeout ) this.setTimeout( vTimeout );

  // refresh server info
  this.refresh();

//////////////
},properties:{
//////////////

  /** path to server, the host has to be the same anyway */
  path:{ check: 'String', init: '', event: 'changePath' },

  /** fully qualified url with correct slashes */
  _url:{ check: 'String', init: '/'},

  /** username used for http authentification. */
  username:{ check: 'String', nullable: true },

  /** password used for http authentification */
  password:{ check: 'String', nullable: true },

  /** default timeout value in miliseconds. Use null to use qooxdoo's default */
  timeout:{ check: 'Integer', nullable: true },

  /** list of available databases */
  _databases:{ check: 'Array', nullable: true, event: 'changeDatabases' }

///////////
},members:{
///////////

  /** create or use a database 
    
    @param vName {String} The name of the database
  */
  database:function( vName ){
    return new couch.Database( vName, this );
  },

  /** retrieve all databases */
  getDatabases:function(){
    return this._getDatabases();
  },

  _replay:function(){
    this.getSet('_databases', '_all_dbs');
  },

  /** construct an url on this server 
  
    @param vUrl {String} the local part of the url
  */
  url:function( vUrl ){
    return( this._getUrl() + vUrl );
  },

  /** get the associated server. Just return itself */
  getServer:function(){
    return this;
  },

  /** creates a restfull request instance 
  
    @param vMethod {GET | PUT | POST | DELETE} the request method
    @param vUrl    {String} the local request url 
    
  */
  createRequestObject:function( vMethod, vUrl ){

    if( qx.lang.String.startsWith( vUrl, '/' ) ) vUrl = vUrl.substr(1);

    var req = new couch.Request( vUrl, vMethod, qx.util.Mime.JSON );
    req.set({
      timeout:  this.getTimeout(),
      username: this.getUsername(),
      password: this.getPassword(),
      useBasicHttpAuth:( this.getUsername() != null )
    });

    return req;
  },


  /** fixes the server url to a fully qualified version ending with a slash */
  _updateUrl:function( vEvent ){

    var fSW =qx.lang.String.startsWith
    var fEW = qx.lang.String.endsWith
    var vServer = this.getPath();

    if( !fSW( vServer, 'http') ){
      vServer = ( fSW( vServer, '/' ) ? '' : '/' ) + vServer;
      vServer = 'http://' + location.host + vServer;
    }
    if( !fEW( vServer, '/' ) ) vServer = vServer + '/';
    var fSW = qx.lang.String.startsWith;

    this._setUrl( vServer );
  }

////
}});
////
