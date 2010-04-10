/* ************************************************************************

   qcl - the qooxdoo component library
  
   http://qooxdoo.org/contrib/project/qcl/
  
   Copyright:
     2007-2010 Christian Boulanger
  
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.
  
   Authors:
   *  Christian Boulanger (cboulanger)
  
************************************************************************ */

/**
 * FIXME Unfunctional
 */
qx.Class.define("qcl.io.eventTransport.JsonRpc",
{
  extend : qx.core.Object,
  
  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    enabled : 
    {
      check : "Boolean",
      init : false
    }
  },
  
  /*
  *****************************************************************************
      CONSTRUCTOR
  *****************************************************************************
  */

  construct : function()
  {  
    this.base(arguments);
    this.__rpc = new qcl.data.store.JsonRpc( null, "exchangeEvents" );

  },
  
  /*
  *****************************************************************************
      MEMBERS
  *****************************************************************************
  */

  members :
  { 
    /* 
    ---------------------------------------------------------------------------
       WIDGETS
    ---------------------------------------------------------------------------
    */

    
    /* 
    ---------------------------------------------------------------------------
       PRIVATE MEMBERS
    ---------------------------------------------------------------------------
    */       
    __rpc : null,
    __timerId : null,
    __dataEvents : [],
    
    /* 
    ---------------------------------------------------------------------------
       APPLY METHODS
    ---------------------------------------------------------------------------
    */   
    
    /**
     * Turn event transport on or off
     * @param value
     * @param old
     * @return
     */
    _applyEnabled : function ( value, old )
    {
       /*
        * remove the old timer, if exists
        */
       if ( this.__timerId  )      
       {
         qx.util.TimerManager.getInstance().stop( this.__timerId );
         this.__rpc.unregister();
       }
       
        if ( value )
        {
         /*
          * start the timer
          */    
         this.__timerId = qx.util.TimerManager.getInstance().start(
           this._poll,
           this.getInterval() * 1000,
           this
         );
         this.__rpc.register();
        }
     },  
     
    /* 
    ---------------------------------------------------------------------------
       INTERNAL METHODS
    ---------------------------------------------------------------------------
    */
     
    /**
     * Polls the server, passing the events in the queue
     * and retrieving the events on the server.
     * FIXME Unfunctional
     * @return {Void}
     */
    _poll : function()
    {
      try{
      var events = {};
      this.getProxiedStores().forEach(function(store){
        var storeId = store.getStoreId();
        events[storeId] = store.getDataEvents();
      });
      this.execute( 
        this.getServiceMethodExchangeEvents(),
        [ events ],
        function(data)
        {
          try{
            this.getProxiedStores().forEach(function(store){
              var events = data.events[store.getStoreId()];
              if ( qx.lang.Type.isArray(events) )
              {
                store._handleServerEvents(events);
              }
            });
          }catch(e){console.warn(e)}
        }, 
        this 
      ); 
      }catch(e){console.warn(e)}
    },     

    
    /* 
    ---------------------------------------------------------------------------
       API METHODS
    ---------------------------------------------------------------------------
    */   
     
    /** 
     * Returns the event store object
     * @return qcl.data.store.JsonRpc
     */
    getEventStore : function()
    {
      return this._eventStore;
    },
    
    
    /**
     * Returns the current event queue and empties it.
     * @return {Array}
     */
    getServerEvents : function()
    {
      var events = this.__dataEvents;
      this.__dataEvents = [];
      return events;
    },
    
    /* 
    ---------------------------------------------------------------------------
       INTERFACE METHODS
    ---------------------------------------------------------------------------
    */    
    
    /**
     * Start a central mechanism for registered databinding controllers
     * to transport their events to the server through period polling
     *  
     */
    start : function()
    {

      if ( this._eventStore )
      {
        this.warn("Event transport is already running.");
        return;
      }
      this.setEnabled(true);
    },
    
    /**
     * Stop the event transport
     * @return {Void}
     */
    stop : function()
    {
      if ( ! this.getEnabled() )
      {
        this.warn("Event transport is not running.");
        return;
      }
      this.setEnabled(true);
    },
    
    /**
     * Adds an event to the event queue that is transported to
     * the server upon the next connection
     * @param event {qx.event.type.Data}
     * @return {Void}
     */
    dispatchServerEvent : function( event )
    {
       if ( ! event  ) return;
            
       /*
        * dispatch a copy for listening controllers
        */
       this.dispatchEvent( event.clone() );
       
       /*
        * abort if no event transport
        */
       if ( ! this.getUseEventTransport() && ! this.getEventStore() ) return;
      
       /*
        * convert the event for propagation to the server
        */
      var data = event.getData();
      var type = event.getType();
      
      if ( ! data || ! type )
      {
        this.warn("Invalid event!");
        return;
      }
      
      /*
       * delete event target hash code in event data since we should not get
       * our own events back anyways
       */
      delete data.hashCode;
     
      data.eventType = type;

      /*
       * save the event
       */
      this.__dataEvents.push( data );
    }    
  }
});