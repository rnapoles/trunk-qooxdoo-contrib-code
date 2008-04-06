
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
     * @return {Map} TODOC
     */
    _analyzeHashString : function()
    {
      var h = location.hash;
      var hP = location.hashParams = {};

      if (h)
      {
        var parts = h.substr(1).split("&");

        for (var i=0; i<parts.length; i++)
        {
          var p = parts[i].split('=');
          hP[p[0]] = typeof p[1] == "string" ? decodeURIComponent(p[1].replace(/\+/g, ' ')) : true;
        }
      }

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
     */
    setState : function( name, value )
    {
      if ( typeof(name) != "string" || typeof(value) != "string" )
			{
				this.error("Invalid parameters");
			}
      this.setHashParam( name, value );
			this._fireStateEvent( name, value );
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
			this.createDispatchDataEvent(eventName,data);
		},
		
		/**
		 * Turn on or off a periodic check of the url for changes of the state variables. If one
		 * of the states change, the corresponding data event is fired. 
		 * @param {Boolean} value
		 */
		setUrlMonitoring : function( value, interval )
		{
			var interval = interval || 300;
			
			if ( value && ! this.__intervalObj ) 
			{
				var self = this;
				this.__hash = location.hash;
				this.__hashParams  = this._analyzeHashString();
				
				this.__intervalObj = window.setInterval(function(){
					if ( self.__hash != location.hash )
					{
						var hP = self._analyzeHashString();
						for ( var key in hP )
						{
							var value = hP[key]; 
							if ( value != self.__hashParams[key] )
							{
								self.__hashParams[key] = value;
								self._fireStateEvent(key,value);
							}
						}
					}
				},interval);					
			}
			else if ( ! value && this.__intervalObj )
			{
				window.clearInterval( this.__intervalObj );
				this.__intervalObj = null;
				this.__hash = null;
				this.__hashParameters = null;
			}				
		}
  }
});