/**

  Abstract Class for CouchDB related classes. 
  The abstract methods are <i>url</i> and <i>getServer</i>

**/

qx.Class.define("couch.Abstract",{
extend: qx.core.Target,
type: 'abstract',

//////////////////////
construct:function(){
//////////////////////

  this.base( arguments );  
  this._setOnce( {} );
  this._catchStatus(['removed','missing'], 'missing');
  this._catchStatus(['stored','received'], 'available');
  this._catchStatus(['conflict'], 'conflict');
  this._catchStatus(['error','unsupported','forbidden', 'unauthorized','timeout'], 'problem');
  this._catchStatus(['sending','receiving','configured','aborted'],'unknown'); 
  this.addEventListener('changeStatus', function(){
    var s = this._getStatus(); var m = this._getOnce();
    if( m[s] ){
      var once = m[s]; var l = once.length;
      for( var i=0; i<l; i++){
        var cb = once[i];
        once[i] = null;
        if( cb ) cb.func.call(cb.target, this);        
      }  
      m[s] = [];      
    }
  },this);

//////////////
},properties:{
//////////////

  _status: { check: ['unknown','missing','problem','available','conflict','changed'], init: 'unknown', event: 'changeStatus' },
  
  _once:   { check: 'Map', nullable: false }

//////////
},events:{
//////////

  /** 200 Succesfully retrieved requested information **/
  "received":      "qx.event.type.DataEvent",  

  /** 201 Database/document succesfully created/updated **/
  "stored":       "qx.event.type.DataEvent", 

  /** 202 Succesfull removed database/document **/
  "removed":      "qx.event.type.DataEvent", 

  /** 203 Accepted; request is still being procced **/
  "accepted":  "qx.event.type.DataEvent", 
  
  /** 404/410 Database/document/revision was not found **/
  "missing":      "qx.event.type.DataEvent",
  
  /** 409/412 Conflict with existing data or more recent revision **/
  "conflict":      "qx.event.type.DataEvent", 
  
  /** 408/5** Some error with the server, not your fault **/
  "error":         "qx.event.type.DataEvent",  

  /** 4** Some problem with the request; likely your fault  **/
  "unsupported":   "qx.event.type.DataEvent" ,

  /** 403 forbidden, no access never  **/
  "forbidden":     "qx.event.type.DataEvent",  
  
  /** 401/407 unauthorized access, you should use proper username and password  **/
  "unauthorized":  "qx.event.type.DataEvent",
  
  "completed":  "qx.io.remote.Response",
  "failed":     "qx.io.remote.Response",
  "timeout":    "qx.io.remote.Response",
  "aborted":    "qx.io.remote.Response",
  "created":    "qx.event.type.Event",
  "configured": "qx.event.type.Event",
  "sending":    "qx.event.type.Event",
  "receiving":  "qx.event.type.Event"

///////////
},members:{
///////////

  /** catch many events concerning the status at once */ 
  _catchStatus:function( vEvents, vStatus ){  
    var l = vEvents.length; var f = function(){ this._setStatus( vStatus ); };
    for( var i=0; i<l; i++ ) this.addEventListener( vEvents[i], f, this);    
  },
  
  /** execute a function once on a given status */
  once:function( vStatus, vFunc, vTarget ){
    var vTarget = vTarget ? vTarget : this;
    if( this.getStatus() == vStatus ){
      vFunc.call(vTarget, this);
    }else{
      var m = this._getOnce();    
      if( !m[vStatus] ) m[vStatus] = [];
      m[vStatus].push({ func: vFunc, target: vTarget });    
    }
  },
  
  /** execute a function everytime a given status occurs */
  whenever:function( vStatus, vFunc, vTarget ){
    var vTarget = vTarget ? vTarget : this;
    this.addEventListener('changeStatus', function(){
      if( this.getStatus() == vStatus ) vFunc.call( vTarget, this );
    },this);
  },
  
  /** refresh bound information */
  refresh:function(){
    this._setOnce({});
    this.createDispatchEvent('refresh');
    if( this.replay ) this.replay();
  },  

  /** retrieve the current status */
  getStatus:function(){
    return this._getStatus();
  },

  /** create a get request */  
  getRequest:function( vUrl, nParams, jParams, vResponseType ){  
    var req = this.createRequest( 'GET', vUrl, vResponseType );
    req.setParams( nParams, jParams );            
    return req;    
  },  
  
  /** create a get request and use it to set a property. Also proxy all events. */
  getSet:function( vKey, vUrl, vFallBack, vEvent, vFail ){
    if( !vEvent ) vEvent = 'received';
    if( !vFail  ) vFail  = 'failed';
    if( !vFallBack) vFallBack = null;
    var req = this.getRequest( vUrl );
    req.when(vEvent, function( e ){
      var setmap = {};
      setmap[vKey] = e;
      this.set( setmap );
    }, this);
    req.when(vFail, function( e ){
      var setmap = {};
      setmap[vKey] = vFallBack;
      this.set( setmap );
    }, this);  
    req.proxyTo( this );
    req.send();
  },  
  
  /** create a post request */
  postRequest:function( vUrl, vData, vResponseType ){  
    var req = this.createRequest( 'POST', vUrl, vResponseType );
    req.jsonData( vData );                
    return req;    
  }, 
  
  /** create a put request */
  putRequest:function( vUrl, vData, vResponseType ){  
    var req = this.createRequest( 'PUT', vUrl, vResponseType );
    req.jsonData( vData );            
    return req;    
  }, 
  
  /** create a delete request */
  deleteRequest:function( vUrl, vResponseType ){  
    var req = this.createRequest( 'DELETE', vUrl, vResponseType );      
    return req;    
  },
  
  /** create a request object */
  createRequest:function( vMethod, vUrl, vResponseType ){
    var req  = this.getServer().createRequestObject( vMethod, this.url( vUrl ), vResponseType );         
    return req;
  }
  
////
}});
////
