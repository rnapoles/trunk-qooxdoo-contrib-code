/* ************************************************************************

   qooxdoo - Autocompletion Mixin

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Christian Boulanger

************************************************************************ */

/* ************************************************************************

#require(qx.io.databinding.MDataManager)

************************************************************************ */

/**
 * Adds autocompletion to a widget that allows entering values
 * NOTE: THIS CLASS IS DEPRECATED AND HAS MOVED TO A DIFFERENT NAMESPACE! 
 * USE THE qcl.databinding PACKAGE INSTEAD, AVAILABLE FROM
 * https://qooxdoo-contrib.svn.sourceforge.net/svnroot/qooxdoo-contrib/trunk/qooxdoo-contrib/qcl
 *  
 * @deprecated
 */
qx.Mixin.define("qx.io.databinding.MAutoComplete",
{

  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /*
    ---------------------------------------------------------------------------
      PROPERTIES
    ---------------------------------------------------------------------------
    */

    /** switch to turn databinding on or off */
    autoComplete :
    {
      check : "Boolean",
      init : false,
      apply : "_applyAutoComplete"
    },
    
    /** separator for multi-valued texts */
    separator :
    {
      check : "String",
      init : "",
      nullable : true
    },

    /** separator for multi-valued texts */
    serviceMethodAutoComplete :
    {
      check : "String",
      init : "",
      nullable : true
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
     * turn autocompletion on or off
     * @return {void}
     */
    _applyAutoComplete : function(propValue,oldPropValue)
    {
      // check for correct widgets
      switch (this.classname)
      {
        case "qx.ui.form.TextField":
        case "qx.ui.form.TextArea":
          this.__textFieldWidget = this;
          this.__listBoxWidget = null;
          break;
        case "qx.ui.form.ComboBox":
        case "qx.ui.form.ComboBoxEx":
          if (!this.getEditable())
          {
            return false;
          }
          this.__textFieldWidget = this.getField();
          this.__listBoxWidget = this.getList();
          break;
        default:
          this.error("Invalid widget!");
          return false;
      }
      
      // setup or remove event listeners
      if (propValue)
      {
        this.__textFieldWidget.setLiveUpdate(true);
        this.__textFieldWidget.addEventListener("changeValue",this._handleAutoCompleteEvent,this);
      }
      else
      {
        this.__textFieldWidget.removeEventListener("changeValue",this._handleAutoCompleteEvent,this);
      }
    },    

    /**
     * event handler for event triggering the autocomplete action
     *
     * @type member
     * @return {Object}
     */    
    _handleAutoCompleteEvent : function(evt)
    {
    	// flag to prevent matching
    	if ( this._preventMatch )
    	{
    		this._preventMatch = false;
    		return true;
    	};
    	
    	// get input from the last separator or the beginning of the line
    	var content = evt.getData() || "";
      var sep     = this.getSeparator();
      var start   = sep ? ( content.lastIndexOf ( sep ) + 1 ) : 0;
      while ( content.charAt(start) == " ") start++;
      var input   = content.substr(start);
      
      // is popup visible - then no lookup
      if ( this.__listBoxWidget )
      {
        if ( this.getPopup().isSeeable() ) return false;
      }
      
    	// small timeout to detect if user has typed ahead or deleted input
    	var _this = this;
    	window.setTimeout(function(){
    	   if ( content != _this.__textFieldWidget.getValue() ) return false;
    	   _this._getAutoCompleteValues(input);  
    	}, 400 );
    },    
    
    /**
     * retrieves autocomplete values from server
     *
     * @type member
     * @return {void}
     */
    _getAutoCompleteValues : function(input)
    {
        
        switch (this.getTransport())
        {
          // use JSON-RPC
          case "jsonrpc":
          
			      var rpc = new qx.io.remote.Rpc();
			      rpc.setTimeout(this.getTimeout());
			      rpc.setUrl(this.getServiceUrl());
			      rpc.setServiceName(this.getServiceName() );
		        rpc.setCrossDomain(this.getAllowCrossDomainRequests());
		        var _this = this;
		        
		        // start request
			      var request = rpc.callAsync(
			       function(result, ex, id){
			        request.reset();
			        request.dispose();
	            request = null; // dispose rpc object
	            
	            if (ex == null) {
	              
	              // server messages
	              if( qx.messagebus && typeof result.__messages == "object" )
	              {
	                for (var key in result.__messages)
	                {
	                  qx.messagebus.Bus.dispatch( new qx.messagebus.Message( key, result.__messages[key] ) ); 
	                }
	                delete (result.__messages);
	              }
	              
	              // use the autocomplete values
	              _this._handleAutoCompleteValues(result);
	              
	            } else {
	              // generic error handling; todo: delegate to event listeners
	              _this.error ("Async(" + id + ") exception: " + 
                    "origin: " + ex.origin +
                    "; code: " + ex.code +
                    "; message: " + ex.message
                );
	            }
	           }, 
	           this.getServiceMethodAutoComplete(), 
	           input,
	           this.__listBoxWidget ? true : false
	          );
	          break;
	          
	         default:
            this.error ("Method not implemented");
            break;         
        }
    },
    

    /**
     * handles autocompletion data sent by the server
     * expects data in the following format:
     * { input : "the search query that was submitted, i.e. a word fragment",
     *   suggest : "an autocomplete suggestion for the textfield",
     *   options : [  { text : "text of first listItem", value : "value of first listItem", icon : "URI of icon" },
     *                { ... }, ... ]
     * }
     *  
     *
     * @type member
     * @return {Object}
     */  
    _handleAutoCompleteValues : function (data)
    {

      var input   = data.input;
      var content = this.__textFieldWidget.getValue();
      var sep     = this.getSeparator();
      var start   = sep ? ( content.lastIndexOf ( sep ) + 1 ) : 0;
      while ( content.charAt(start) == " ") start++;
      var cInput  = content.substr(start);
      
      // check whether input is still the same so that latecoming request
      // do not mess up the content
      if (input != cInput) return false;
          
      // populate list widget and select matching entry
      if ( this.__listBoxWidget && typeof data.options == "object" )
      {
        if ( ! data.options.length ) return false;
        this.__listBoxWidget.removeAll();
        for (var i=0; i<data.options.length; i++) 
        {
          var l = data.options[i];
          this.__listBoxWidget.add( new qx.ui.form.ListItem ( l.text, l.icon, l.value ) );
        }
        this._preventMatch = true;
        if ( this._openPopup ) this._openPopup();
        if ( this.setSelected ) this.setSelected( this.__listBoxWidget.findString( input ) );
        this._preventMatch = false;
      }
      
      // apply matched text and suggestion to content
      if (typeof data.suggest == "string")
      {
        var nContent = content.substr(0,start) + data.suggest;
        // set value without matching 
        this._preventMatch = true;
        this.__textFieldWidget.setValue( nContent );
        this._preventMatch = false;
        
        // select suggested text
        this.__textFieldWidget.selectFromTo( content.length, nContent.length );
      }
    }
  }

});
