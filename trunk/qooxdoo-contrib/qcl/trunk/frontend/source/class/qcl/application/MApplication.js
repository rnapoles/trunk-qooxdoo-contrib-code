/* ************************************************************************

  qcl qooxdoo component library
  
  qcl.application.MApplication mixin
  
  provides 
    - central state storage, 
    - browser history support 
    - access to the top appication with the clipboard

   Copyright:
     2007 Christian Boulanger

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Christian Boulanger (cboulanger)

************************************************************************ */

/* ************************************************************************

#module(qcl.application)

************************************************************************ */
qx.Mixin.define("qcl.application.MApplication",
{

  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties : {
    
    /** the backwards history **/
    backHistoryStack :
    {
      check : "Array",
      init : []
    },
    
    /** the forward history **/
    forwardHistoryStack :
    {
      check : "Array",
      init : []
    }   

  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  
  members :
  {
    /**
     * gets a reference to the main application
     *
     * @type member
     * @return {var} TODOC
     */
    getMainApplication : function()
    {
      if (window.opener) {
        return opener.qx.core.Init.getInstance().getApplication();
      } else {
        return qx.core.Init.getInstance().getApplication();
      }
    },


    /**
     * gets a reference to the global clipboard instance
     *
     * @type member
     * @return {var} TODOC
     */
    getClipboard : function()
    {
      if (window.opener) {
        return opener.qcl.clipboard.Manager.getInstance();
      } else {
        return qcl.clipboard.Manager.getInstance();
      }
    },

    /**
     * TODOC
     *
     * @type member
     * @return {Map} TODOC
     */
    _analyzeSearchString : function()
    {
      var s = window.location.search;
      var gP = window.location.parameters = {};

      if (s)
      {
        var parts = s.substr(1).split("&");

        for (var i=0; i<parts.length; i++)
        {
          var p = parts[i].split('=');
          gP[p[0]] = typeof p[1] == "string" ? decodeURIComponent(p[1].replace(/\+/g, ' ')) : true;
        }
      }

      return gP;
    },


    /**
     * TODOC
     *
     * @type member
     * @param key {var} TODOC
     * @return {String} TODOC
     */
    getGetParam : function(key)
    {
      var gP = this._analyzeSearchString();
      return gP[key];
    },


    /**
     * TODOC
     *
     * @type member
     * @param first {var} TODOC
     * @param second {var} TODOC
     * @return {void} 
     */
    setGetParam : function(first, second)
    {
      var gP = this._analyzeSearchString();

      if (typeof first == "object")
      {
        for (var key in first) 
        {
          gP[key] = first[key];
        }
      }
      else
      {
        gP[first] = second;
      }

      var p = [];

      for (var key in gP) 
      {
        p.push(key + "=" + encodeURIComponent(gP[key]));
      }

      window.location.search = p.join("&");

    },


    /**
     * TODOC
     *
     * @type member
     * @param string {String} optional string to analyze instead of location.hash
     * @return {Map} TODOC
     */
    _analyzeHashString : function(string)
    { 
      var h  = string || location.hash || "";
      h = h.replace(/%3D/g,"=").replace(/%26/g,"&"); // safari doesn't properly decodes the URI, therefore a manual replacement
      var hP = {};
      if (h)
      {
        var parts = h.substr(1).split("&");

        for (var i=0; i<parts.length; i++)
        {
          var p = parts[i].split('=');
          hP[p[0]] = typeof p[1] == "string" ? decodeURIComponent(p[1].replace(/\+/g, ' ')) : true;
        }
      }
      if ( ! string ) location.hashParams = hP;
      return hP;
    },


    /**
     * TODOC
     *
     * @type member
     * @param key {var} TODOC
     * @return {var} TODOC
     */
    getHashParam : function(key)
    {
      var hP = this._analyzeHashString();
      return hP[key];
    },


    /**
     * TODOC
     *
     * @type member
     * @param first {var} TODOC
     * @param second {var} TODOC
     * @return {void} 
     */
    setHashParam : function(first, second)
    {
      var hP = this._analyzeHashString();

      if (typeof first == "object")
      {
        for (var key in first) 
        {
          hP[key] = first[key];
        }
      }
      else
      {
        hP[first] = second;
      }

      var p = [];

      for (var key in hP) 
      {
        p.push(key + "=" + encodeURIComponent(hP[key]));
      }

      window.location.hash = p.join("&");
    },
    
    /**
     * sets a state aspect of the application. the state is exclusively stored in the hash
     * parameter of the url, thus it must always be a string. Each change of a state
     * fires an event: this.getApplication().setState("foo", "bar") will 
     * dispatch a data event "changeFoo" with the value "bar" on the application singleton.
     * @param {String} name
     * @param {String} value
     * @param {String} optional description of the state that will appear in the title bar and the browser history
     */
    setState : function( name, value, description )
    {
      if ( typeof(name) != "string" )
      {
        this.error("Invalid parameters");
      }
			
			// convert to string
			if ( typeof(value) != "string" )
			{
				value = new String(value);
			}
			
			var oldValue = this.getState(name);
			
			//console.log("New state for '" + name + "' :'" +value +"', old state :'" + oldValue +"'");
			
			// only dispatch events if value actually changes
      if ( value != oldValue )
      {
        // this will also fire the changeState event
        //console.log("Setting hash param '" + name + "' to " +value);
        this.setHashParam( name, value );
        
        // qooxdoo browser navigation button support
        this.addToHistory(location.hash.substr(1),description);        
      }
    },
    
    /**
     * Gets the string value of a state
     * @param {String} name
     */
    getState : function ( name )
    {
      return this.getHashParam( name );
    },
    
    /**
     * fires a "change state" event
     * @param {String} name
     * @param {String} data
     * @return void
     */
    _fireStateEvent : function ( name, data )
    {
      var eventName = "change" + name.substr(0,1).toUpperCase() + name.substr(1);
      //console.log("Firing Event '" + eventName + "' with data :" + data );
      qx.core.Init.getInstance().getApplication().createDispatchDataEvent(eventName,data);
    },
    
    
    /**
     * Support qooxdoo history manager 
     * @param {Boolean} value
     */
    setHistorySupport : function (value)
    {
      if( value )
      {        
        var state = qx.client.History.getInstance().getState();
        // console.log("Initial state: " + state);
        this.__lastHash    = state; 
        this.__hashParams  = this._analyzeHashString();
        //console.log(this.__hashParams);
        qx.client.History.getInstance().addEventListener("request", function(e) {
          var state = e.getData();
          //console.log("'request' event received with hash'"+state+"'");
          
          // application specific state update
          var hP = this._analyzeHashString(state);
          for ( var key in hP )
          {
            var value = hP[key]; 
            //console.log("State param '"+key+"': new value '"+value+"', stored value '"+this.__hashParams[key]+"'.");
            if ( value != this.__hashParams[key] )
            {
              this.__hashParams[key] = value;
              this._fireStateEvent(key,value);
            }
          }
        }, this);
      }     
    },
		
		
		/**
		 * updates the current state, firing all change events even if 
		 * the state hasn't changed.
		 */
		updateState : function()
		{
			var stateMap = this._analyzeHashString();
			for(var key in stateMap)
		 	{
			   this._fireStateEvent( key, stateMap[key] );
			}
		},
    
    /**
     * wraps qx.client.History.getInstance().navigateBack();
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
        
        // for some reason, this has to be executed twice to trigger the back action
        qx.client.History.getInstance().navigateBack();
        qx.client.History.getInstance().navigateBack();

        return true;
      }
      return false;
    },
    
    /**
     * wraps qx.client.History.getInstance().navigateForward()
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
        
        // for some reason, this has to be executed twice to trigger the forward action
        qx.client.History.getInstance().navigateForward();
        qx.client.History.getInstance().navigateForward();
        return true;
      }
      return false;
    },
    
    /**
     * Wraps the qooxdoo history function and tries to guess wether the move was forward or backwards
     * @param hash {String}
     * @param description {String|undefined}
     */
    addToHistory : function( hash, description )
    {
      
      // check if state has changed
      if ( hash == this.__lastHash )
      {
        console.log("Hash hasn't changed, not adding it to history...");
        return;
      }
      this.__lastHash = hash;
      
      var fHist = this.getForwardHistoryStack();
      var bHist = this.getBackHistoryStack();

      bHist.unshift(hash);

      qx.client.History.getInstance().addToHistory( hash, description );
    },

    canNavigateBack : function()
    {
      return ( this.getBackHistoryStack().length > 1 );
    },
    
    canNavigateForward : function()
    {
      return ( this.getForwardHistoryStack().length > 1 );
    }
  }
});