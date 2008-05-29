/**

  This models a CouchDB document.
  When you instantiate this class, the data is _not_ automatically fetched.
  You need to call 'refresh' first. 
  
  Typical usage of reading a document:
<pre>  
  var myServer = new couch.Server('path/to/my/couch/proxy');
  var myDatabase = myServer.database('myDatabase');
  var myDoc = myDatabase.document('myDocument');
  myDoc.refresh();
  myDoc.once('availabe', function(){
   alert( myDoc.getKey('country') + " is the country!");
  });
</pre>

  Typical usage of creating a document:
<pre>
  var myServer = new couch.Server('path/to/my/couch/proxy');
  var myDatabase = myServer.database('myDatabase');
  var myDoc = myDatabase.document('myDocument');
  myDoc.setData({country: 'Netherlands', language: 'dutch'});
  myDoc.save();
  myDoc.once('available', function(){
    alert('the document has been saved!');
  });
  myDoc.once('conflict',function(){
    alert('the document could not be saved because it already exists');
  });
</pre>

**/
qx.Class.define("couch.Document",{
extend: couch.Abstract,

/**

  @param vId {String} optional document-id
  @param vDatabase {Couch.Database} associated database to use instead of default
  
**/

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

  /** set a key in this document 
    @param k {String} name of key
    @param v {Object} value of key
  */
  
  setKey:function( k, v ){
    var d = this.getData();
    d[k] = v;
    this._setStatus('changed');
  },
  
  
  /** get all data as a map.
    @returns {Map}
  **/

  getData:function(){
    return this._getData();
  },
  
  
  /** set all data at once.
    @param vData {Map} map of data
  */

  setData:function( vData ){
    if( this._getDocId()  ) vData._id = this._getDocId();
    if( this._getRev() ) vData._rev = this._getRev();
    this._setData( vData );
    this._setStatus('changed');
  },
  
  /** get a specific key.
    @param k {String} name of the key 
    @returns {Object}
  **/
  getKey:function( k ){
    var d = this.getData();
    return d[k];
  },
  
  /** get the document-id.
    @returns {String} 
  **/
  getDocId:function(){
    return this._getDocId();
  },
  
  /** get the current revision.
    @returns {String} 
  **/
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

  _replay:function(){
    this._getSet('_data', this._getDocId(), {} );
  },
  
  
  /** remove this document from the server */
  remove:function(){
    if( this._getDocId() && this._getRev() ){
      req = this.deleteRequest(this._getDocId() + '?rev=' + this._getRev());
      req.when('removed', this._updateData, this);
      req.proxyTo(this);
      req.send();
      return true;
    } else return false;
  },

  /** remove this document from the server, even if it was updated in the mean time */
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
  
  /** save this document on the server */

  save:function(){
    if( !this._getDocId() ) var req = this.postRequest('', this.getData());
    else                    var req = this.putRequest(this._getDocId(), this.getData());
    req.when('stored', this._updateData, this);
    req.proxyTo(this);
    req.send();
  },
  
  /** save this document on the server, even if it was updated in the mean time */

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
  
  /** get the associated server 
    @returns {couch.Server}
  **/

  getServer:function(){
    return this.getDatabase().getServer();
  },
  
  /** get the associated database.
    @returns {couch.Database} 
  **/

  getDatabase:function(){
    if( !this._getDatabase() ) return couch.Default.database();
    else return this._getDatabase();
  },
  
  /** construct an url for the database that contains this document.
    @param vUrl {String} local url 
    @returns {String} a fully qualified url
  **/
   
  

  url:function( vUrl ){
    return this.getDatabase().url( vUrl );
  }

///////////
},statics:{
///////////

  /** cleans a javascript map from all keys starting with an underscore. 
    @param vMap {Map} the map to clean
    @returns {Map} a new map with only the keys not starting with an underscore
  **/
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
