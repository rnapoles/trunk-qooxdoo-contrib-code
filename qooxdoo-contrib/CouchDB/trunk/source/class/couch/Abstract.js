/**

  Abstract Class for CouchDB related classes. 
  This provides the default event-system and utility functions to easily catch events.  

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

  /** 200 Succesfully retrieved requested information */
  "received":      "qx.event.type.DataEvent",  

  /** 201 Database/document succesfully created/updated */
  "stored":       "qx.event.type.DataEvent", 

  /** 202 Succesfull removed database/document */
  "removed":      "qx.event.type.DataEvent", 

  /** 203 Accepted; request is still being procced */
  "accepted":  "qx.event.type.DataEvent", 
  
  /** 404/410 Database/document/revision was not found */
  "missing":      "qx.event.type.DataEvent",
  
  /** 409/412 Conflict with existing data or more recent revision */
  "conflict":      "qx.event.type.DataEvent", 
  
  /** 408/5** Some error with the server, not your fault */
  "error":         "qx.event.type.DataEvent",  

  /** 4** Some problem with the request; likely your fault  */
  "unsupported":   "qx.event.type.DataEvent" ,

  /** 403 forbidden, no access never  */
  "forbidden":     "qx.event.type.DataEvent",  
  
  /** 401/407 unauthorized access, you should use proper username and password  */
  "unauthorized":  "qx.event.type.DataEvent",
  
  /** the request is finished */
  "completed":  "qx.io.remote.Response",
  
  /** something went wrong */  
  "failed":     "qx.io.remote.Response",
  
  /** it took too long */
  "timeout":    "qx.io.remote.Response",
  
  /** the request was aborted */ 
  "aborted":    "qx.io.remote.Response",
  
  /** the request was created */
  "created":    "qx.event.type.Event",
  
  /** the request was configured */
  "configured": "qx.event.type.Event",
  
  /** sending data to the server */
  "sending":    "qx.event.type.Event",
  
  /** receicing data from the server */
  "receiving":  "qx.event.type.Event"

///////////
},members:{
///////////

  /** catch many events concerning the status at once */ 
  _catchStatus:function( vEvents, vStatus ){  
    var l = vEvents.length; var f = function(){ this._setStatus( vStatus ); };
    for( var i=0; i<l; i++ ) this.addEventListener( vEvents[i], f, this);    
  },
  
  /** execute a function once on a given status. A use-once event-listener. 
  
    @param vStatus {String} status to catch
    @param vFunc {Function} function to execute
    @param vTarget {Object} optional execution context
  
  */
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
  
  /** execute a function everytime a given status occurs. Event-listener Lite (tm). 
  
    @param vStatus {String} status to catch
    @param vFunc {Function} function to execute
    @param vTarget {Object} optional execution context
  
  */

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
    if( this._replay ) this._replay();
  },  

  /** retrieve the current status */
  getStatus:function(){
    return this._getStatus();
  },

  /** create a get request 
    @param vUrl {String} local url
    @param nParams {Map} parameters that should be escaped normally
    @param jParams {Map} paremeters that should be escaped as JSON  
    @returns {couch.Request}
  */  
  getRequest:function( vUrl, nParams, jParams ){  
    var req = this.createRequest( 'GET', vUrl );
    req.setParams( nParams, jParams );           
    return req;    
  },  
  
  /** create a get request and use it to set a property. Also proxy all events.  */
  _getSet:function( vKey, vUrl, vFallBack, vEvent, vFail ){
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
  
  /** create a post request. 
    @param vUrl {String} local url
    @param vData {Map} the data to send with the request
    @returns {couch.Request}
  **/
  postRequest:function( vUrl, vData ){  
    var req = this.createRequest( 'POST', vUrl );
    req.jsonData( vData );                
    return req;    
  }, 
  
  /** create a put request.
    @param vUrl {String} local url
    @param vData {Map} the data to send with the request
    @returns {couch.Request}
  **/
  putRequest:function( vUrl, vData ){  
    var req = this.createRequest( 'PUT', vUrl );
    req.jsonData( vData );            
    return req;    
  }, 
  
  /** create a delete request.
      @param vUrl {String} local url
      @returns {couch.Request}
  **/
  deleteRequest:function( vUrl ){  
    var req = this.createRequest( 'DELETE', vUrl );      
    return req;    
  },
  
  /** create a request object.
    @param vMethod {GET|PUT|POST|DELETE} http-method of request
    @param vUrl {String} local url
    @returns {couch.Request}
  **/
  createRequest:function( vMethod, vUrl ){
    var req  = this.getServer().createRequestObject( vMethod, this.url( vUrl ) );         
    return req;
  }
  
////
}});
////
