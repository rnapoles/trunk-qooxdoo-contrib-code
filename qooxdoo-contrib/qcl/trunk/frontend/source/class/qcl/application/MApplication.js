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
      h = h.replace(/#/,"").replace(/%3D/g,"=").replace(/%26/g,"&"); // safari doesn't properly decodes the URI, therefore a manual replacement
      var hP = {};
      if (h)
      {
        var parts = h.split("&");

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
     * TODOC
     *
     * @type member
     * @param name {String} TODOC
     * @return {Map}  
     */
    removeHashParam : function(name)
    {
      var hP = this._analyzeHashString();
      
      if ( typeof(hP[name]) != "undefined") 
      {
        delete hP[name];
        
        var p = [];
        
        for (var key in hP) 
        {
          p.push(key + "=" + encodeURIComponent(hP[key]));
        }
        
        window.location.hash = p.join("&");
      }
      return hP;
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
     * @return {String}
     */
    getState : function ( name )
    {
      return this.getHashParam( name );
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
      return this.removeHashParam( name );
    },
    
    /**
     * Fires a "change state" event
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
     * Wraps qx.client.History.getInstance().navigateBack();
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
     * Wraps the qooxdoo history function
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
    },
    
    /**
     * sets up the default context menu behaviour: traverse the widget tree upwards until
     * a context menu ist found, which is then displayed
     */
    setupContextMenu : function()
    {

      // add contextmenu event handler to client document
      qx.ui.core.ClientDocument.getInstance().addEventListener("contextmenu",function(e){
                
        var target = e.getOriginalTarget();
        
        while ( target && typeof target=="object" && target.getParent )
        {
          if ( target.getContextMenu && target.getContextMenu() )
          {
            var contextMenu = target.getContextMenu();
            contextMenu.setLeft( e.getClientX() );
            contextMenu.setTop( e.getClientY() );
            contextMenu.setOpener( target );
            contextMenu.show();
            qx.event.message.Bus.dispatch("qcl.messages.contextmenu.changed",contextMenu);
            return true;
          }
          else
          {
            target = target.getParent();
          }
        } 
      },this);      
    },

    /**
     * Handles 'qcl.commands.alert' message.
     * @param message {qx.event.message.Message} Message object
     * @param target {qx.core.Target} Message receiver object 
     * @return void
     */     
    handleAlertMessage : function(message)
    {
      this.alert( message.getData() );
    },
    
   /**
     * Handles 'qcl.commands.confirmRemote' message.
     * @param message {qx.event.message.Message} Message object
     * @param target {qx.core.Target} Message receiver object 
     * @return void
     */
    handleConfirmRemote : function(message,target)
    {
    
      var data       = message.getData();
      var display    = data.display;
      var service    = data.service;
      var params     = data.params;
      
      this.confirm(display,null,null,function(result){
        if ( result )
        {
          params.push( true );
          params.unshift( service );
          this.updateServer.apply( this, params );
        }
      });
    
    }    
    
    
  }
});