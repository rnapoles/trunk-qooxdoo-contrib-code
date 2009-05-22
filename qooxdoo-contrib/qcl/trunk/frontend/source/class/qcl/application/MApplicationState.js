/* ************************************************************************

  qcl qooxdoo component library

   Copyright:
     2007-2009 Christian Boulanger

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Christian Boulanger (cboulanger)

************************************************************************ */

/* ************************************************************************


************************************************************************ */

/**
 * A mixin for an application instance that provides synchronization between
 * the application's properties and the application state saved in the URL hash.
 * The syntax is the same as in the URL GET parameters, i.e. state values are
 * saved as #key1=value1&key2=value2&key3=value3 etc. Any change to the state
 * values (for example, by using the back or forward buttons or by manually
 * changing the URL) will fire a "changeXXX" event on the application instance
 * for each hash parameter that has changed.
 * 
 * It is recommended to create an application property for each state property.
 * This property will be updated whenevet the state changes and should
 * not fire a "changeXXX" event, so that the event is not dispatched twice.
 * Instead, create an apply method for each property you use which sets
 * the corresponding state.
 * 
 * <pre>
 * 
 * ...
 * properties : {
 * ...
 *   myProperty : {
 *     check : "String",
 *     nullable : true
 *     apply : "_applyMyProperty"
 *   },
 * ...
 * members: {
 * ...
 *   _applyMyProperty : function( value, old )
 *   {
 *     this.setState("myProperty",value);
 *   }
 * ...
 * 
 * Properties can also be boolean or integer and will be automatically converted
 * when the state changes.
 */
qx.Mixin.define("qcl.application.MApplicationState",
{


  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  
  members :
  {
  
  
    /*
    ---------------------------------------------------------------------------
       PRIVATE MEMBERS
    ---------------------------------------------------------------------------
    */   
    __lastHash : null, 
    __hashParams  : null,
    
    /*
    ---------------------------------------------------------------------------
       GET PARAMETERS
    ---------------------------------------------------------------------------
    */     

    /**
     * Returns a map of GET parameters from the URL
     *
     * @return {Map} 
     */
    _analyzeSearchString : function()
    {
      var search = window.location.search;
      var getParams = window.location.parameters = {};
      if (search)
      {
        var parts = search.substr(1).split("&");
        for (var i=0; i<parts.length; i++)
        {
          var p = parts[i].split('=');
          getParams[p[0]] = typeof p[1] == "string" ? decodeURIComponent(p[1].replace(/\+/g, ' ')) : true;
        }
      }
      return getParams;
    },


    /**
     * Returns a specific GET parameter
     *
     * @param key {var} The parameter name
     * @return {String}
     */
    getGetParam : function(key)
    {
      return this._analyzeSearchString()[key];
    },


    /**
     * Sets a GET parameter in the URL, triggering a reload of the page
     * if the parameter has changed
     *
     * @param first {String|Map} If a map, set each key-value pair, if a string, treat as key and set the value
     * @param second {String|null} If first parameter is a string, use this as value.
     * @return {void} 
     */
    setGetParam : function(first, second)
    {
      var getParams = this._analyzeSearchString();
      if (typeof first == "object")
      {
        for (var key in first) 
        {
          getParams[key] = first[key];
        }
      }
      else
      {
        getParams[first] = second;
      }
      var p = [];
      for (var key in getParams) 
      {
        p.push(key + "=" + encodeURIComponent(getParams[key]));
      }
      window.location.search = p.join("&");
    },

    /*
    ---------------------------------------------------------------------------
       HASH PARAMETERS
    ---------------------------------------------------------------------------
    */ 
    
    /**
     * Returns a Map of the parameterized hash string
     *
     * @param string {String} Optional string to analyze instead of location.hash
     * @return {Map} 
     */
    _analyzeHashString : function(string)
    { 
      var hash  = string || location.hash || "";
      /*
       * Safari bug
       */
      while ( hash.search(/%25/) != -1 )
      {
        hash = hash.replace(/%25/g,"%");
      }      
      
      hash = hash.replace(/#/,"").replace(/%3D/g,"=").replace(/%26/g,"&"); 
      var hashParams = {};
      if (hash)
      {
        var parts = hash.split("&");

        for (var i=0; i<parts.length; i++)
        {
          var p = parts[i].split('=');
          hashParams[p[0]] = typeof p[1] == "string" ? decodeURIComponent(p[1].replace(/\+/g, ' ')) : true;
        }
      }
      if ( ! string ) location.hashParams = hashParams;
      return hashParams;
    },


    /**
     * Returns a specific parameter in the hash string
     *
     * @type member
     * @param key {var} TODOC
     * @return {var} TODOC
     */
    getHashParam : function(key)
    {
       return this._analyzeHashString()[key];
    },


    /** 
     * Sets an url hash parameter
     *
     * Sets a parameter in the URL hash. This does not trigger a reload of the page
     * if the parameter has changed.
     *
     * @param first {String|Map} If a map, set each key-value pair, if a string, treat as key and set the value
     * @param second {String|null} If first parameter is a string, use this as value.
     * @return {Map} 
     */
    setHashParam : function(first, second)
    {
      var hashParams = this._analyzeHashString();

      if (typeof first == "object")
      {
        for (var key in first) 
        {
          hashParams[key] = first[key];
        }
      }
      else
      {
        hashParams[first] = second;
      }

      var p = [];

      for (var key in hashParams) 
      {
        p.push(key + "=" + encodeURIComponent(hashParams[key]));
      }

      window.location.hash = p.join("&");
      
      /*
       * Safari bug
       */      
      while ( window.location.hash.search(/%25/) != -1 )
      {
        window.location.hash = window.location.hash.replace(/%25/g,"%");
      }
      
      //console.log(window.location.hash);
      return hashParams;
    },

    /**
     * Removes a hash parameter
     *
     * @param name {String} TODOC
     * @return {Map}  
     */
    removeHashParam : function(name)
    {
      var hashParams = this._analyzeHashString();
      
      if ( typeof(hashParams[name]) != "undefined") 
      {
        delete hashParams[name];
        var p = [];
        for (var key in hashParams) 
        {
          p.push(key + "=" + encodeURIComponent( hashParams[key] ) );
        }
        window.location.hash = p.join("&");
        
        /*
         * Safari bug
         */        
        while ( window.location.hash.search(/%25/) != -1 )
        {
          window.location.hash = window.location.hash.replace(/%25/g,"%");
        }
        
      }
      return hashParams;
    },
    
    /*
    ---------------------------------------------------------------------------
       STATE
    ---------------------------------------------------------------------------
    */     
    
    /** 
     * Sets a state aspect of the application. 
     * 
     * @param name {String} 
     * @param value {String} 
     * @param description {String} Optional description of the state that will appear in the title bar and the browser history
     */
    setState : function( name, value, description )
    {
      if ( typeof name  != "string" )
      {
        this.error( "Invalid parameters" );
      }
      
      /*
       * convert to string
       */
      if ( typeof value != "string" )
      {
        value = new String(value);
      }
      
      var oldValue = this.getState( name );
      //console.log("New state for '" + name + "' :'" +value +"', old state :'" + oldValue +"'");
      
      /*
       * only dispatch events if value actually changes
       */
      if ( value != oldValue )
      {
        /*
         * setting hash parameter and property
         */
        this.setHashParam( name, value );
         
        /*
         * Update application property, if exists
         */ 
        var clazz = qx.Class.getByName( this.classname );
        
        if ( qx.Class.hasProperty( clazz, name ) )
        { 
          switch( qx.Class.getPropertyDefinition( clazz, name ).check )
          {
            case "Integer":
              if ( isNaN( parseInt( value )  ) )
              {
                this.error("Trying to set non-integer state property to integer application property");
              }
              value = parseInt( value );
              break;
            
            case "Boolean":
              value = new Boolean( value );
              break;
              
            case "String":
              break;
              
            default:
              this.error( "Cannot set application property for state " +  name + ": invalid type");
              
          }
          this.set( name, value );
        }
        
        /*
         * qooxdoo browser navigation button support
         */
        this.addToHistory( location.hash.substr(1), description );        
      }
    },
    
    /**
     * Gets the string value of a state
     * @param {String} name
     * @return {String}
     */
    getState : function ( name )
    {
      var value = this.getHashParam( name );
      switch (value)
      {
        case "null": return null;
        case "false": return false;
        case "true": return true; 
        case "undefined": return undefined;
        case "NaN" : return undefined;
        default: return value;
      }
    },
    
    /**
     * Returns a map with the complete application state
     * @return {Map}
     */
    getStates : function()
    {
      return this._analyzeHashString();
    },

    /**
     * Updates the current state, firing all change events even if 
     * the state hasn't changed. If you don't supply any argument,
     * all states will be updated. If you supply an array of strings
     * or a variable number of string arguments, only the states 
     * in the array or arguments will be updated.
     * @param state {var} optional. a variable number of string arguments or an array
     * @return {Map}
     */
    updateState : function()
    {
      var states = {};
      var stateMap = this._analyzeHashString();
      if ( arguments[0] instanceof Array )
      {
        arguments[0].forEach(function(name){
         states[name] = true; 
        }); 
      }
      else if ( arguments.length)
      {
        for (var i=0; i<arguments.length; i++)
        {
          states[arguments[i]] = true; 
        }
      }
      else
      {
        states = null;
      }
      
      for(var key in stateMap)
      {
         if ( states && ! states[key] ) continue;
         this._fireStateEvent( key, stateMap[key] );
      }
      return stateMap;
    },

    /**
     * Removes a state
     * @param {String} name
     * @return {Map}
     */
    removeState : function ( name )
    {
      this.removeHashParam( name );
      this.addToHistory(location.hash.substr(1),null);
    },
    
    /**
     * Fires a "change state" event
     * @param {String} name
     * @param {String} data
     * @return void
     * @todo: either change event name or tie state to property
     */
    _fireStateEvent : function ( name, data )
    {
      var eventName = "change" + name.substr(0,1).toUpperCase() + name.substr(1);
      //console.log("Firing Event '" + eventName + "' with data :" + data );
      this.createDispatchDataEvent(eventName,data);
    },
    
    /*
    ---------------------------------------------------------------------------
       HISTORY SUPPORT
    ---------------------------------------------------------------------------
    */     
    
    /**
     * Support qooxdoo history manager 
     * @param {Boolean} value
     */
    setHistorySupport : function (value)
    {
      if( value )
      {            
    
        var state = qx.bom.History.getInstance().getState();  
        //console.log("Initial state: " + state);
        this.__lastHash    = state; 
        this.__hashParams  = this._analyzeHashString();
        //console.log(this.__hashParams);
        
        /*
         * setup event listener for history changes
         */
        qx.bom.History.getInstance().addEventListener("request", function(e) 
        {
          var state = e.getData();
          //console.log("'request' event received with hash'"+state+"'");
          
          /*
           * application specific state update
           */ 
          var hashParams = this._analyzeHashString(state);
          
          /*
           * check all hash keys
           */
          for ( var key in hashParams )
          {
            var value = hashParams[key]; 
            //console.log("State param '"+key+"': new value '"+value+"', previous value '"+this.__hashParams[key]+"'.");
                        
            /*
             * fire events
             */
            if ( value != this.__hashParams[key] )
            {
              this.__hashParams[key] = value;
              this.set( key, value );
              this._fireStateEvent(key,value);
            }
          }
        }, this);
      }     
    },
  
    /**
     * Wraps qx.bom.History.getInstance().navigateBack();
     */
    navigateBack : function()
    {
      var bHist = this.getBackHistoryStack();
      var fHist = this.getForwardHistoryStack();
      //console.log("Trying to navigate backwards, stack length is "+ bHist.length);
      if ( bHist.length )
      {
        var hash = bHist.shift(); // get from backward stack
        fHist.unshift(hash); // and put on forward stack
        
        /*
         * for some reason, this has to be executed twice to trigger the back action
         */
        qx.bom.History.getInstance().navigateBack();
        qx.bom.History.getInstance().navigateBack();

        return true;
      }
      return false;
    },
    
    /**
     * Wraps qx.bom.History.getInstance().navigateForward()
     */
    navigateForward : function()
    {
      var fHist = this.getForwardHistoryStack();
      var bHist = this.getBackHistoryStack();
      //console.log("Trying to navigate forwards, stack length is "+ fHist.length);
      if ( fHist.length )
      {
        var hash = fHist.shift(); // get from forward stack
        bHist.unshift(hash); // and put on backward stack
        
        /*
         * for some reason, this has to be executed twice to trigger the forward action
         */
        qx.bom.History.getInstance().navigateForward();
        qx.bom.History.getInstance().navigateForward();
        return true;
      }
      return false;
    },
    
    /**
     * Wraps the qooxdoo history function
     * @param hash {String}
     * @param description {String|undefined}
     */
    addToHistory : function( hash, description )
    {
      /*
       * check if state has changed
       */
      if ( hash == this.__lastHash )
      {
        //console.log("Hash hasn't changed, not adding it to history...");
        return;
      }
      this.__lastHash = hash;
      var bHist = this.getBackHistoryStack();
      bHist.unshift(hash);
      qx.bom.History.getInstance().addToHistory( hash, description );
    },

    /**
     * Checks if there is something to navigate back to.
     * @return {Boolean}
     */
    canNavigateBack : function()
    {
      return ( this.getBackHistoryStack().length > 1 );
    },

   /**
    * Checks if there is something to navigate forward to.
    * @return {Boolean}
    */    
    canNavigateForward : function()
    {
      return ( this.getForwardHistoryStack().length > 1 );
    }
  }
});