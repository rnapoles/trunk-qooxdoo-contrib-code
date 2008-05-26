qx.Class.define("couch.Database",{
extend: couch.Abstract,

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

  document:function( vId ){
    return new couch.Document( vId, this );
  },

  createDocument:function( vId, vType, vData ){
    var d = new couch.Document( vId, this );
    d.setData(vData);
    d.setKey( 'type', vType );
    d.save();
    return d;
  },

  removeDocument:function( vId ){
    var d = new couch.Document( vType + '_' + vId, this );
    d.refresh();
    d.once('available', function() { d.remove(); });
    return d;
  },

  design:function( vName ){
    return new couch.Design( vName, this );
  },

  getInfo:function(){
    return this._getInfo();
  },

  replay:function(){
    this.getSet('_info','');
  },

  create:function(){
    var req = this.putRequest('');
    req.when('stored', this.refresh, this);
    req.send();
  },

  remove:function(){
    var req = this.deleteRequest('');
    req.when('removed', this.refresh, this);
    req.send();
  },

  getServer:function(){
    var vServer = this._getServer();
    if( !vServer ) vServer = couch.Default.server();
    return vServer;
  },

  setServer:function( vServer ){
    this._setServer( vServer ? vServer : null );
  },

  url:function( vUrl ){
    if( vUrl ) vUrl = '/' + vUrl; else vUrl = '/';
    return this.getServer().url( this.getDatabaseName() + vUrl );
  },

  getDatabaseName:function(){
    return this._getDatabaseName().toLowerCase();
  }

////
}});
////
