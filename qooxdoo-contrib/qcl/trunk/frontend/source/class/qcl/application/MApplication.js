
/**
 * Mixin for application 
 */
qx.Mixin.define("qcl.application.MApplication",
{
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

      with (window.location) 
      {
        href = protocol + "//" + host + pathname + "?" + p.join("&") + hash;
      }
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

      with (window.location) 
      {
        href = protocol + "//" + host + pathname + search + "#" + p.join("&");
      }
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
      this.setHashParam( name, value );
			//console.log("Setting '" + name + "' to " +value);
			
			// qooxdoo browser navigation button support
			// this will also fire the changeState event
			qx.client.History.getInstance().addToHistory(location.hash.substr(1),description);
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
				//console.log("Initial state: " + state);
				this.__hashParams  = this._analyzeHashString();
				console.log(this.__hashParams);
				qx.client.History.getInstance().addEventListener("request", function(e) {
				  var state = e.getData();
					//console.log("State: " + state);
					
				  // application specific state update
					var hP = this._analyzeHashString(state);
					for ( var key in hP )
					{
						var value = hP[key]; 
						if ( value != this.__hashParams[key] )
						{
							this.__hashParams[key] = value;
							this._fireStateEvent(key,value);
						}
					}
				}, this);
			}			
		}
  }
});