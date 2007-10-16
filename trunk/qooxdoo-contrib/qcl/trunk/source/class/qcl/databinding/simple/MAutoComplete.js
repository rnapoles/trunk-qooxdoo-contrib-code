/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

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

#require(qcl.databinding.simple.MDataManager)

************************************************************************ */

/**
 * Adds autocompletion to a widget that allows entering values
 */
qx.Mixin.define("qcl.databinding.simple.MAutoComplete",
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
      init : "",
      nullable : true
    },

    /** service method returning the autocomplete data */
    serviceMethodAutoComplete :
    {
      init : "",
      nullable : true
    },
    
    /** metadata for the service method  */
    metaData :
    {
      init : null,
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
          this._textFieldWidget = this;
          this._listBoxWidget = null;
          break;
          
        case "qx.ui.form.ComboBox":
          if (!this.getEditable())
          {
            return false;
          }
          // text field
          this._textFieldWidget = this.getField();
          
          // disable inline find and default key and mouseover actions in the list box
          this._listBoxWidget = this.getList();
          this._listBoxWidget.setEnableInlineFind(false);
          this._listBoxWidget._onkeypress  = this._onListBoxKeypress;
          
          break;
          
        default:
          this.error("Invalid widget!");
          return false;
      }
      
      // setup key event listener 
      this._textFieldWidget.addEventListener("keypress", this._handleTextFieldKeypress,this);
      
      // setup or remove event listeners
      if (propValue)
      {
        this._textFieldWidget.setLiveUpdate(true);
        this._lastKeyPress = (new Date).valueOf();
        this._textFieldWidget.addEventListener("input",this._onInput,this);
        this._textFieldWidget.addEventListener("changeValue",this._onChangeValue,this);
      }
      else
      {
        this._textFieldWidget.removeEventListener("input",this._onInput,this);
        this._textFieldWidget.removeEventListener("changeValue",this._onChangeValue,this);
      }
    },    

    /**
     * overwrites the default onkeypress action of listbox widget
     *
     * @type member
     * @param e {qx.event.type.KeyEvent} keyPress event
     * @return {void}
     */
    _onListBoxKeypress : function(e)
    {
      // console.log("list box keypress event:" +  e.getKeyIdentifier());
      
      // selectively pass event to selection manager
      switch (e.getKeyIdentifier()) 
      {
        case "Down":
        case "Up":
        case "PageUp":
        case "PageDown":
          this._manager.handleKeyPress(e);
          break;
                
      }
      
    },

    /**
     * handles the keypress event of the textfield
     *
     * @type member
     * @param e {qx.event.type.KeyEvent} keyPress event
     * @return {void}
     */
    _handleTextFieldKeypress : function(e)
    {
      // console.log("text field keypress event:" +  e.getKeyIdentifier() );
    },

    /**
     * event handler for value change to handle change triggered by the list box 
     *
     * @type member
     * @return {Object}
     */    
    _onChangeValue : function(e)
    {
      if ( this._preventChange )
      {
        this._preventChange = false;
        return;
      }
      
      var content      = e.getData() || "";
      var lastContent  = this._lastContent || "";
      var separator    = this.getSeparator();
      var sepPosCont   = content.lastIndexOf ( separator ) +1;
      var sepPosLCont  = lastContent.lastIndexOf ( separator ) +1;
       
      // console.log("lastContent: " + lastContent + ", new content: " + content );
      
      /* add new content to existing content if
       * - there is a separator character
       * - the newly inserted content doesn't contain this character 
       * - the previous content does contain it
       * - the new content is not the old one without the final separator char - this is the  situation when backspacing  
       */
      if ( separator &&  !sepPosCont && sepPosLCont && ( content != lastContent.substr(0,sepPosLCont-1) ) )
      {
        this._preventChange = true;
        var newContent = lastContent.substr(0,sepPosLCont) + " " + content;
        this.setValue( newContent );
        console.log("adding to existing content");
        this._lastContent = newContent;
      }
      else
      {
        // synchronize textfield value with combobox value
        this._preventChange = true;
        this.setValue( content );
        this._lastContent = content;
      }

      // console.log("saving content: " + this._lastContent );
    },


    /**
     * event handler for event triggering the autocomplete action
     *
     * @type member
     * @return {Object}
     */    
    _onInput : function(e)
    {
      // get and save current content of text field
      var content = this._textFieldWidget.getValue();  
      this._lastContent = content;
      
      // console.log( "user typed: " + content );
    
    	// timeout before sending request
      var now = (new Date).valueOf(); 
      if (( now - this._lastKeyPress) < 500) 
      {
        // console.log( "timeout not reached");
        this._lastKeyPress = now;
        return;
      }
    	      
      // separator for multi-valued fields
      var sep     = this.getSeparator();
      
      // start of text fragment to be matched
      var start   = sep ? ( content.lastIndexOf ( sep ) + 1 ) : 0;
      
      // strip whitespace
      while ( content.charAt(start) == " ") start++;
      
      // text fragment
      var input = content.substr(start);
      
      // Store timestamp
      this._lastKeyPress = (new Date).valueOf();

      // Send request
      // console.log( "sending request for " + input );
      this._getAutoCompleteValues(input);
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
	              if( qx.event.message && typeof result.__messages == "object" )
	              {
	                for (var key in result.__messages)
	                {
	                  qx.event.message.Bus.dispatch( key, result.__messages[key] ); 
	                }
	                delete (result.__messages);
	              }
	              
	              // use the autocomplete values
	              _this._handleAutoCompleteValues(result);
	              
	            } else {
	              qx.event.message.Bus.dispatch(
                    "qcl.databinding.messages.rpc.error",
                    "Async(" + id + ") exception: " + 
                    "origin: " + ex.origin +
                    "; code: " + ex.code +
                    "; message: " + ex.message
                );
	            }
	           }, 
	           this.getServiceMethodAutoComplete(), 
	           input,
	           this._listBoxWidget ? true : false,
             this.getMetaData()
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
      // user input at event time
      var input = data.input;  
           
      // current content of text field
      var content = this._textFieldWidget.getValue();              
      
      // separator for multi-value fields
      var sep = this.getSeparator();                            
      
      // start of text fragment that needs to be matched
      var start = sep ? ( content.lastIndexOf ( sep ) + 1 ) : 0;  
      
      // trim whitespace
      while ( content.charAt(start) == " ") start++;
      
      // get text fragment
      var cInput  = content.substr(start);
      
      // check whether input is still the same so that latecoming request
      // do not mess up the content
      if (input != cInput)
      {
        // console.log ("we're late: " +  input + " != " + cInput );
        return false;
      } 
          
      // populate list widget and select matching entry
      if ( this._listBoxWidget && typeof data.options == "object" )
      {        
        if (data.options != this.lastOptions) 
        {
          // console.log("emptying listbox:");
          this._listBoxWidget.removeAll();
          
          if (!data.options.length) {
            // console.log("no data, closing listbox:");
            this._closePopup();
            return false;
          }
          
          // console.log("populating listbox:");
          
          for (var i = 0; i < data.options.length; i++) {
            var l = data.options[i];
            this._listBoxWidget.add(new qx.ui.form.ListItem(l.text, l.icon, l.value));
          }
          
          // open popup 
          if (!this._listBoxWidget.isSeeable()) {
            // console.log("opening popup");
            this._openPopup();
          }
          
          delete this._lastOptions;
          this._lastOptions = data.options;
        }
      }

      // console.log("deselecting scrolling matched item into view");
      // deselect to prevent messing up the textbox
      this._listBoxWidget._manager._deselectAll();
      
      // scroll matching item in the listbox into view
      var matchedItem = this._listBoxWidget.findString(input);
      if (matchedItem)
      {
        matchedItem.scrollIntoView();
      }
      
      // apply matched text and suggestion to content
      if (typeof data.suggest == "string")
      {
        var part1 = content.substr(0,start);
        var part2 = data.suggest;
        var nContent =  part1 + part2;
         
        // console.log("setting: " + part1 + " + " + part2 );
        
        // set value 
        this.setValue( nContent );
        this._lastContent = nContent;
        
        // select suggested text
        this._textFieldWidget.selectFromTo( content.length, nContent.length );
        // console.log("selecting from " + content.length + " to " + nContent.length );
      }
    }
  }

});
