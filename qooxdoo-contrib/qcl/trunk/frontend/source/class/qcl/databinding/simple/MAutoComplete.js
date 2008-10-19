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
     EVENTS
  *****************************************************************************
  */

  events: 
  {
    /**
     * Fired each time the user presses the "enter" key
     */
    "enter" : "qx.event.type.Event",
    
    /**
     * Fired each time the user presses the "tab" key
     */
    "tab" : "qx.event.type.Event"    
  },


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
      check : "Map",
      init : null,
      nullable : true
    },
    
    /** 
     * Delay between keysstrockes in milliseconds before autocompleting action
     * is activated. this prevents that too many requests are dispatches when
     * typing quickly.
     */
    delay :
    {
      check : "Integer",
      init : 300,
      nullable : false
    },
    
    /** 
     * Minimum number of characters that are needed before autocompletion is triggered
     * This can be used to tune the size of the results dependent on the size
     * of the data.
     */
    minCharNumber :
    {
      check : "Integer",
      init : 2,
      nullable : false
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
      /*
       * to what widget has this mixin been applied?
       */
      switch (this.classname)
      {
        /*
         * TextField and TextArea
         */
        case "qx.ui.form.TextField":
        case "qx.ui.form.TextArea":
          this._textFieldWidget = this;
          this._listBoxWidget = null;
          break;
        
        /*
         * ComboBox
         */
        case "qx.ui.form.ComboBox":
          /*
           * if not editable, autocomplete doesn't make sense
           */       
          if (!this.getEditable())
          {
            return false;
          }
          
          /*
           * text field widget
           */
          this._textFieldWidget = this.getField();
          
          /*
           * disable inline find and overwrite 
           * default key and mouseover actions in the list box with custom
           * functions
           */
          this._listBoxWidget = this.getList();
          this._listBoxWidget.setEnableInlineFind(false);
          this._listBoxWidget._onkeypress  = this._onListBoxKeypress;
          
          /*
           * hack to fix bug relating to focus management
           * Not sure about this, though
           */
          this.__focus = this.focus;
          this.focus = function ()
          {
            if ( this.getCapture() )
            {
              this.__focus();
            }
            else
            {
              this._textFieldWidget.focus();
            }
          }
          
          break;
          
        default:
          this.error("Invalid widget!");
          return false;
      }
      
      /*
       * setup key event listener
       */ 
      this._textFieldWidget.addEventListener("keydown", this._handleTextFieldKeypress,this);
      
      /*
       * setup or remove event listeners
       */
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
     * function that overwrites the default onkeypress action of listbox widget
     *
     * @type member
     * @param e {qx.event.type.KeyEvent} keyPress event
     * @return {void}
     */
    _onListBoxKeypress : function(e)
    {
      var key = e.getKeyIdentifier();
      //console.log(this + ", list box keypress event:" +  key );
      
      /*
       * selectively pass event to selection manager
       */
      switch (key) 
      {
        case "Down":
        case "Up":
        case "PageUp":
        case "PageDown":
          this._manager.handleKeyPress(e);
          break;
        case "Enter":
          // hack to capture enter in listbox
          this.createDispatchEvent("enterPressed");
          
      }
    },

    /**
     * Handles the keypress event of the textfield
     *
     * @type member
     * @param e {qx.event.type.KeyEvent} keyPress event
     * @return {void}
     */
    _handleTextFieldKeypress : function(e)
    {
      var keyEvent, key = e.getKeyIdentifier();
      //console.log("text field keypress event:" +  key );
      switch(key)
      {
        case "Enter": 
        case "Tab": 
        case "Up": 
        case "Down":
        case "Left": 
        case "Right": 
          this.createDispatchDataEvent( "cellAction", key );
          break;
      }
     
    },

    /**
     * Event handler for value change to handle change triggered by the list box 
     *
     * @type member
     * @return {Object}
     */    
    _onChangeValue : function(e)
    {
      /*
       * abort if no autocompletion session  
       */
      if ( ! this.__autocompleteActive )
      {
        return;
      }

      /*
       * compute values
       */
      var content      = e.getData() || "";
      var lastContent  = this._lastContent || "";
      var separator    = this.getSeparator();
      var sepPosCont   = content.lastIndexOf ( separator ) +1;
      var sepPosLCont  = lastContent.lastIndexOf ( separator ) +1;
      
      /*
       * skip the following action if the change has
       * been caused by it. Otherwise, we would have
       * an infinite loop.
       */
      if ( this._preventChange )
      {
        this._preventChange = false;
        return;
      }      
      
      /* 
       * add new content to existing content if
       * - there is a separator character
       * - the newly inserted content doesn't contain this character 
       * - the previous content does contain it
       * - the new content is not the old one without the final separator char - this is the  situation when backspacing  
       */
      if ( separator &&  ! sepPosCont && sepPosLCont 
            && ( content != lastContent.substr( 0, sepPosLCont-1 ) ) )
      {
        var newContent   = lastContent.substr( 0, sepPosLCont ) +  " " + content;
        //console.log("lastContent: " + lastContent + ", content: " + content + ", new content: " + newContent );
        
        //console.log("adding to existing content");
        
        /*
         * set flag to prevent the present action on insert
         */
        this._preventChange = true;
        
        /*
         * add new content
         */
        this.setValue( newContent );
        this._lastContent = newContent;
        
        /*
         * select what we have inserted
         */
        qx.client.Timer.once(function(){
          this._textFieldWidget.selectFromTo( sepPosLCont, newContent.length );
        },this,100);          
              
      }
      else
      {
        /*
         * synchronize textfield value with combobox value
         */
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
      /*
       * is a request pending?
       */
      if ( this._requestPending )
      {
        return; 
      }
      
      /*
       * get and save current content of text field
       */
      var content = this._textFieldWidget.getValue();  
      this._lastContent = content;
      
      // console.log( "user typed: " + content );
    
    	/*
    	 * delay before sending request
    	 */
      var now = (new Date).valueOf(); 
      if (( now - this._lastKeyPress) < this.getDelay() ) 
      {
        // console.log( "delay not reached");
        this._lastKeyPress = now;
        
        /*
         * if we have a timeout function, cancel it
         */
        if ( this.__deferredInput )
        {
          window.clearTimeout(this.__deferredInput);
        }
        
        /*
         * create a timeout to call this event handler again
         * after delay
         */
        var _this = this;
        this.__deferredInput = window.setTimeout(function(){
          _this._onInput(e);
        },this.getDelay() );
        return;
      }

      
      /*
       * separator for multi-valued fields
       */
      var sep = this.getSeparator();
      
      /*
       * start of text fragment to be matched
       */
      var start = sep ? ( content.lastIndexOf ( sep ) + 1 ) : 0;
      
      /*
       * strip whitespace
       */
      while ( content.charAt(start) == " ") start++;
      
      /*
       * text fragment
       */
      var input = content.substr(start).replace(/\n/,"");
      
      /*
       * Store timestamp
       */
      this._lastKeyPress = (new Date).valueOf();

      /*
       * Send request
       */
      if ( input.length >= this.getMinCharNumber() )
      {
        //console.log( "sending request for " + input );
        this._getAutoCompleteValues(input);  
      }
      
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
            this._useJsonRpc(input);
	          break;
	          
	         default:
            this.error ("Method not implemented");
            break;         
        }
    },
    
    /**
     * sending a request using jsonrpc as transport
     */
    _useJsonRpc : function (input)
    {
      /*
       * setup request object
       */
      var rpc = new qx.io.remote.Rpc();
      rpc.setTimeout(this.getTimeout());
      rpc.setUrl(this.getServiceUrl());
      rpc.setServiceName(this.getServiceName() );
      rpc.setCrossDomain(this.getAllowCrossDomainRequests());
      
      
      /*
       * define callback function
       */
      var _this = this;
      var handler = function(result, ex, id)
      {
        request.reset();
        request.dispose();
        request = null; // dispose rpc object
        _this._requestPending = false;
        
        if (ex == null) 
        {
          
          /* 
           * server does not support autocomplete
           */
          if ( result === null )
          {
            _this.setAutoComplete(false);
            return;
          }
                          
          /*
           * handle server messages
           */
          _this.__handleEventsAndMessages( _this, result );
          
          // use the autocomplete values
          _this._handleAutoCompleteValues(result);
          
        } 
        else 
        {
          qx.event.message.Bus.dispatch(
              "qcl.databinding.messages.rpc.error",
              "Async(" + id + ") exception: " + 
              "origin: " + ex.origin +
              "; code: " + ex.code +
              "; message: " + ex.message
          );
        }
      };
      
      /*
       * send request
       */
      var request = rpc.callAsync(
       handler,
       this.getServiceMethodAutoComplete(), 
       input,
       this._listBoxWidget ? true : false,
       this.getMetaData()
      );
      this._requestPending = true;      
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
      
      console.log(data);
      
      /*
       * user input at event time
       */
      var input = data.input;  
           
      /*
       * current content of text field
       */
      var content = this._textFieldWidget.getValue() || "";              
      
      /*
       * separator for multi-value fields
       */
      var sep = this.getSeparator();                            
      
      /*
       * start of text fragment that needs to be matched
       */
      var start = sep ? ( content.lastIndexOf ( sep ) + 1 ) : 0;  
      
      /*
       * trim whitespace
       */
      while ( content.charAt(start) == " ") start++;
      
      /*
       * get text fragment
       */
      var cInput  = content.substr(start).replace(/\n/,"");
      
      /*
       * check whether input is still the same so that latecoming request
       * do not mess up the content
       */
      if ( input != cInput )
      {
        //console.log ("we're late: '" +  input + "' != '" + cInput + "'." );
        return false;
      } 
          
      /*
       * populate list widget and select matching entry
       */
      if ( this._listBoxWidget && data.options instanceof Array )
      {        
        if (data.options != this.lastOptions) 
        {
          // console.log("emptying listbox:");
          this._listBoxWidget.removeAll();
          
          /*
           * no need for a listbox with 1 or less entries
           */
          if ( data.options.length < 2 ) 
          {
            // console.log("no data or only one result, closing listbox:");
            this._closePopup();
            return false;
          }
          
          // console.log("populating listbox:");
          
          /*
           * populate listbox
           */
          for (var i = 0; i < data.options.length; i++) 
          {
            var l = data.options[i];
            this._listBoxWidget.add(new qx.ui.form.ListItem(l.text, l.icon, l.value));
          }
          
          /* 
           * open popup
           */ 
          if (!this._listBoxWidget.isSeeable()) {
            // console.log("opening popup");
            this._openPopup();
          }
          
          /*
           * save options
           */
          delete this._lastOptions;
          this._lastOptions = data.options;
          
        }
   
        // console.log("deselecting scrolling matched item into view");
        
        this._listBoxWidget._manager._deselectAll();  
        
        /*
         * scroll matching item in the listbox into view
         */
        var matchedItem = this._listBoxWidget.findString(input);
        if (matchedItem)
        {
          matchedItem.scrollIntoView();
        }
      }

      
      /*
       * apply matched text and suggestion to content
       */
      if ( typeof data.suggest == "string")
      {
        var part1 = content.substr(0,start);
        var part2 = data.suggest;
        var nContent =  part1 + part2;
         
        //console.log("setting: " + part1 + " + " + part2 );
        
        /* 
         * set value
         */ 
        this.__autocompleteActive = true;
        this.setValue( nContent );
        this.__autocompleteActive = false;
        this._lastContent = nContent;
        
        /*
         * select suggested text
         */
        qx.client.Timer.once(function(){
          this._textFieldWidget.selectFromTo( content.length, nContent.length );
        },this,100);

         //console.log("selecting from " + content.length + " to " + nContent.length );

      }
    }
  }

});
