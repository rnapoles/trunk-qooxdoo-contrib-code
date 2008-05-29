/**

  This adds some restFULL events to the standard {@link qx.io.remote.Request}.
  It also defaults to caching, unlike the ordinary constructor.

**/
qx.Class.define("couch.Request",{
extend: qx.io.remote.Request,

////////////////////////////////////////////////////
/**
      @param vUrl    {String} the requested url
      @param vMethod {'GET'|'PUT'|'POST'|'DELETE'} request method
      @param vResponseType  {var} type of response

**/
////////////////////////////////////////////////////
construct:function( vUrl, vMethod, vResponseType ){ 
////////////////////////////////////////////////////

  this.base(arguments, vUrl, vMethod, vResponseType);

  // caching should work properly with restfull servers
  this.setProhibitCaching(false);

  // generating http status code related events
  this.addEventListener( 'completed', this._dispatchHttpStatus, this );
  this.addEventListener( 'failed',    this._dispatchHttpStatus, this );

//////////////
},properties:{ 
//////////////


///////////
},members:{ 
///////////

  _dispatchHttpStatus:function( e ){
    var eventName = couch.Request.EVENT_TABLE[ 'ev' + e.getStatusCode() ]
    //console.log( e.getStatusCode() + " is de http-status code ");
    this.createDispatchDataEvent( eventName, e.getContent() );
  },
  

  /** proxy all events to some other object
   @param vTarget {qx.core.Target} the event-target that should receive the events   
  **/
  proxyTo:function( vTarget ){
    // setting up proxy events
    var re = couch.Request.REQUEST_EVENTS;
    var rel = re.length;
    for( var i=0; i<rel; i++ )
    this.addEventListener( re[i], function( e ){
      vTarget.dispatchEvent( e, false );
    }, this );
  },
  
  /** setup a request parameters that should be encoded as JSON 
    @param k {String} key of the parameter
    @param v {Object} json limited datastructure (no fuctions, no dates)
  **/
  
  jsonParameter:function( k, v ){
    this.setParameter( k, couch.Request.toJSON( v ) )
  },
  
  /** setup the associated data for a put or post request encoded as JSON
   @param vData {Object} json limited datastructure (no fuctions, no dates)
  **/
  
  jsonData:function( vData ){
    this.setData( couch.Request.toJSON( vData ) );
  },
  
  /** setup all parameters at once 
    @param vNormal {Map} parameters that should be encoded normally
    @param vJson   {Map} parameters that should be encoded as JSON
  **/
  
  setParams:function( vNormal, vJson ){
    if( !vNormal ) vNormal = {};
    if( !vJson   ) vJson   = {};
    for( k in vNormal ) this.setParameter( k, vNormal[k] );
    for( k in vJson   ) this.jsonParameter( k, vJson[k] );    
  },
  
  /** setup an event-listener, the lite version
    @param vEvent {String} name of the event
    @param vFunc  {Function} function that gets either the content of the response or associated data.
    @param vTarget {Object} target of execution
  **/
  when:function( vEvent, vFunc, vTarget ){
    this.addEventListener(vEvent, function( e ){    
      if( e instanceof qx.io.remote.Response )      
        vFunc.call( vTarget, e.getContent() ); 
      else
        vFunc.call( vTarget, e.getData? e.getData() : undefined );
    },vTarget);
  }

//////////
},events:{ 
//////////

  /** 202 Succesfull removed database/document */
  "removed":   "qx.event.type.DataEvent", 
  
  /** 404/410 Database/document/revision was not found */
  "missing":   "qx.event.type.DataEvent",
   
  /** 201 Database/document succesfully created/updated */
  "stored":    "qx.event.type.DataEvent", 
  
  /** 203 Accepted; request is still being procced */
  "accepted":  "qx.event.type.DataEvent", 
  
  /** 409/412 Conflict with existing data or more recent revision */
  "conflict":  "qx.event.type.DataEvent", 
  
  /** 200 Succesfully retrieved requested information */
  "received":  "qx.event.type.DataEvent",
  
  /** 408/5** Some error with the server, not your fault */
  "error":     "qx.event.type.DataEvent",  

  /** 4** Some problem with the request; likely your fault */
  "unsupported":     "qx.event.type.DataEvent" ,

  /** 403 forbidden, no access never  */
  "forbidden":     "qx.event.type.DataEvent",  
  
  /** 401/407 unauthorized access, you should use proper username and password  */
  "unauthorized":  "qx.event.type.DataEvent"
    

///////////
},statics:{ 
///////////

/** 

 converts any javascript object to json. This currently uses {@link qx.io.Json} but
 it's not entirely clear wether that always returns legal json and wether CouchDB can
 deal with that.
  
   @param vData {var} any javascript value
   @return {String} (supposedly) legal JSON encoded representation of the supplied data

**/

  toJSON:function( vData )
  { return qx.io.Json.stringify( vData ); },

/** 

 lookup table that maps status code to event-name 

**/

  EVENT_TABLE:{
    ev200: 'received',
    ev201: 'stored', 
    ev202: 'removed',
    ev203: 'accepted',
    ev400: 'unsupported',
    ev401: 'unauthorized',
    ev403: 'forbidden',
    ev405: 'unsupported',
    ev406: 'unsupported',
    ev407: 'unauthorized',
    ev408: 'error',  
    ev404: 'missing',
    ev409: 'conflict',
    ev410: 'missing',
    ev412: 'conflict', 
    ev413: 'unsupported',
    ev414: 'unsupported',
    ev415: 'unsupported',
    ev416: 'unsupported',
    ev417: 'conflict',
    ev421: 'error',
    ev500: 'error',
    ev501: 'error',
    ev502: 'error',
    ev503: 'error',
    ev504: 'error',
    ev505: 'error',          
    ev506: 'error',
    ev507: 'error',
    ev509: 'error',
    ev510: 'error'  
 },
 
 /** lookup table used to proxy events */
 REQUEST_EVENTS:[
  'timeout','completed', 'failed', 'aborted', 
  'receiving', 'sending', 'created', 'configured',
  'received','accepted','stored',
  'unsupported', 'conflict', 'missing','error', 'forbidden', 'removed' 
 ]   
  
////  
}});
////  
