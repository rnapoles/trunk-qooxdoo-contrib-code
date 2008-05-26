qx.Class.define("couch.Document",{
extend: couch.Abstract,

//////////////////////////////////////
construct:function( vId, vDatabase ){
//////////////////////////////////////

  this.base( arguments );

  this._setDocId( vId ? vId : null );
  this._setDatabase( vDatabase ? vDatabase : null );
  this.setData( {} );

  this.addEventListener('changeData', this._dataChanged, this);
  this.addEventListener('changeId',   this._idChanged, this);
  this.addEventListener('changeRev',  this._revChanged, this);

//////////////
},properties:{
//////////////

  _docId:{ check: 'String', nullable: true, event: 'changeId' },
  _rev:{ check: 'String', nullable: true, event: 'changeRev' },
  _database:{ check: 'couch.Database', nullable: true },
  _data:{ check: 'Map', nullable: false, event: 'changeData' }

///////////
},members:{
///////////

  setKey:function( k, v ){
    var d = this.getData();
    d[k] = v;
    this._setStatus('changed');
  },

  getData:function(){
    return this._getData();
  },

  setData:function( vData ){
    if( this._getDocId()  ) vData._id = this._getDocId();
    if( this._getRev() ) vData._rev = this._getRev();
    this._setData( vData );
    this._setStatus('changed');
  },

  getKey:function( k ){
    var d = this.getData();
    return d[k];
  },

  getDocId:function(){
    return this._getDocId();
  },

  getRevision:function(){
    return this._getRev();
  },

  _dataChanged:function( e ){
    var d = this.getData();
    if( d._id  ) this._setDocId( d._id );
    if( d._rev ) this._setRev( d._rev );
  },

  _idChanged:function(){
    var id = this._getDocId();
    if( id ) this.setKey( '_id', id );
  },

  _revChanged:function(){
    var rev = this._getRev();
    if( rev ) this.setKey( '_rev', rev );
  },

  replay:function(){
    this.getSet('_data', this._getDocId(), {} );
  },

  remove:function(){
    if( this._getDocId() && this._getRev() ){
      req = this.deleteRequest(this._getDocId() + '?rev=' + this._getRev());
      req.when('removed', this._updateData, this);
      req.proxyTo(this);
      req.send();
      return true;
    } else return false;
  },

  forceRemove:function(){
    this.remove();
    this.once('conflict',function(){
      this.refresh();
      this.once('available', function(){
        this.forceRemove();
      });
    });
  },

  _updateData:function( d ){
    if( d.id  ) this._setDocId( d.id );
    if( d.rev ) this._setRev( d.rev );
  },

  save:function(){
    if( !this._getDocId() ) var req = this.postRequest('', this.getData());
    else                    var req = this.putRequest(this._getDocId(), this.getData());
    req.when('stored', this._updateData, this);
    req.proxyTo(this);
    req.send();
  },

  forceSave:function(){
    this.save();
    this.once('conflict',function(){
      var data = this.getData();
      this.refresh();
      this.once('available', function(){
        this.setData( data );
        this.save();
      });
    });
  },

  getServer:function(){
    return this.getDatabase().getServer();
  },

  getDatabase:function(){
    if( !this._getDatabase() ) return couch.Default.database();
    else return this._getDatabase();
  },

  url:function( vUrl ){
    return this.getDatabase().url( vUrl );
  }

///////////
},statics:{
///////////

  cleanMap:function( vMap ){
    var result = {}
    for( var k in vMap ){
      if( k.substr(0,1) != '_') result[k] = vMap[k];
    }
    return result;
  }

////
}});
////
