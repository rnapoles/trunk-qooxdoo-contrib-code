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

    /** 
     * Turn databinding on or off 
     */
    autoComplete :
    {
      check : "Boolean",
      init : false,
      apply : "_applyAutoComplete"
    },
    
    /**  
     * Separator for multi-valued texts 
     */
    separator :
    {
      init : "",
      nullable : true
    },

    /** 
     * Service method returning the autocomplete data
     */
    serviceMethodAutoComplete :
    {
      init : "",
      nullable : true
    },
    
    /**
     * Metadata for the service method. This will be sent
     * with the rpc request and can contain additional information
     * that the service method might need to supply the right
     * autocomplete values
     */
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
      init : 100,
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
    },
    
    /**
     * Whether the autocomplete service method should send a
     * suggestion only (false) or also listItem data for 
     * the comboBox popup or similar widgets (true)
     */
    withOptions :
    {
      check : "Boolean",
      init  : false
    },
    
    /**
     * This will contain the options returned by the last
     * rpc request
     */
    options : 
    {
      check : "Array",
      init  : null,
      nullable : true,
      event : "changeOptions"
    },
    
    /**
     * This contains a reference to the qx.ui.form.List widget
     * which displays the options, if any.
     */
    listBox :
    {
      check : "qx.ui.form.List",
      nullable : true
    },
    
    /**
     * This contains a reference to the qx.ui.form.TextField
     * or qx.ui.form.TextArea that the user types in.
     */
    textBox :
    {
      check : "Object",
      nullable: false
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
     * Turn autocompletion on or off
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
          this.setTextBox( this );
          this.setListBox( null ) ;
          break;
        
        /*
         * ComboBox
         */
        case "qx.ui.form.ComboBox":
          /* 
           * if not editable, autocomplete doesn't make sense
           */       
          if ( !this.getEditable() )
          {
            return;
          }
          
          /*
           * get options
           */ 
          this.setWithOptions( true );
          
          /*
           * text field widget
           */
          this.setTextBox( this.getField() );
          
          /*
           * disable inline find and overwrite 
           * default key and mouseover actions in the list box with custom
           * functions
           */
          this.setListBox( this.getList() );
          this.getListBox().setEnableInlineFind(false);
          this.getListBox()._onkeypress  = this._onListBoxKeypress;
          
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
              this.getTextBox().focus();
            }
          }
          
          break;
          
        default:
          this.error("Invalid widget!");
          return;
      }
      
     
      /*
       * setup or remove event listeners
       */
      var tb = this.getTextBox();
       
      if ( propValue )
      {
        this._lastKeyPress = (new Date).valueOf();
        tb.setLiveUpdate(true);
        tb.addEventListener("keydown", this._handleTextFieldKeypress,this);
        tb.addEventListener("input",this._onInput,this);
        tb.addEventListener("changeValue",this._onChangeValue,this);
      }
      else
      {
        tb.removeEventListener("keydown", this._handleTextFieldKeypress,this);
        tb.removeEventListener("input",this._onInput,this);
        tb.removeEventListener("changeValue",this._onChangeValue,this);
      }
    },    


    /**
     * function that overwrites the default onkeypress action of listbox widget
     *
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
     * @param e {qx.event.type.KeyEvent} keyPress event
     * @return {void}
     */
    _handleTextFieldKeypress : function(e)
    {
      var keyEvent, key = e.getKeyIdentifier();
      //console.log("text field keypress event:" +  key );
      switch( key )
      {
        case "Enter": 

          if ( this._autoTextSelection )
          {
            var selStart  = this.getTextBox().getSelectionStart();
            var selLength = this.getTextBox().getSelectionLength();
            if ( selLength )
            {
              this.getTextBox().selectFromTo( selStart+selLength,selStart+selLength);              
            }
          }
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
     * @return {void}
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
       * been caused by this very mixin. Otherwise, we would have
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
          this.getTextBox().selectFromTo( sepPosLCont, newContent.length );
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

      // //console.log("saving content: " + this._lastContent );
    },


    /**
     * event handler for event triggering the autocomplete action
     *
     * @return {void}
     */    
    _onInput : function(e)
    {
      
      /*
       * is a request pending?
       */
      if ( this._requestPending )
      {
        //console.log("A request is pending...");
        return; 
      }
      
      var tb =  this.getTextBox();
      /*
       * get and save current content of text field
       */
      var content = tb.getValue();  
      
      /*
       * do not start query if only whitespace has been added
       */
       if ( qx.lang.String.trim( content ) != tb.getValue() )
       {
         //console.log("Only whitespace added ...");
         return;
       }
       
      /*
       * cache content
       */ 
      this._lastContent = content;
      
      //console.log( "user typed: " + content );
    
    	/*
    	 * delay before sending request
    	 */
      var now = (new Date).valueOf(); 
      
      if (( now - this._lastKeyPress) < this.getDelay() ) 
      {
        //console.log( "delay not reached");
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
        }, this.getDelay() );
        return;
      }
      
      /*
       * separator for multi-valued fields
       */
      var sep = this.getSeparator();
      
       /*
        * rewind
        */
       var selStart = tb.getSelectionStart();
       while ( selStart > 0 
               && content.charAt(selStart-1) != sep ) selStart--;
       
       /*
        * forward
        */
       var selEnd = selStart;
       while ( selEnd < content.length 
               && content.charAt(selEnd) != sep ) selEnd++;
      
      /*
       * text fragment
       */
      var input = qx.lang.String.trim( content.substring( selStart,selEnd ) );
      //console.log( "'" + input +"'");
      
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
      else
      {
        //console.log("Not enough characters...");
      }
      
    },    
    
    /**
     * Retrieves autocomplete values from server
     *
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
     * @todo streamline with data manager
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
       * application state is sent as server data
       */
      var app = qx.core.Init.getInstance().getApplication();
      rpc.setServerData( app.getStates() );  
      
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
            _this.setAutoComplete( false );
            console.warn("No autocomplete result from server!");
            return;
          }
                          
          /*
           * handle server messages
           */
          _this.__handleEventsAndMessages( _this, result );
          
          /*
           * use the autocomplete values
           */
          _this._handleAutoCompleteValues(result);
          
        } 
        else 
        {
          qx.event.message.Bus.dispatch(
              "qcl.databinding.messages.rpc.error",
              ex.message
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
       this.getWithOptions(),
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
     * @todo insert at caret position
     * @return {void}
     */  
    _handleAutoCompleteValues : function (data)
    {
      
      //console.log(data);
      /*
       * text and list box widgets
       */
      var tb = this.getTextBox();
      var lb = this.getListBox();
      
      /*
       * user input at event time
       */
      var input = data.input;  
           
      /*
       * current content of text field
       */
      var content = tb.getValue() || "";              
      
      /*
       * separator for multi-value fields
       */
      var sep = this.getSeparator();                            
      
      /*
       * rewind
       */
      var selStart = tb.getSelectionStart();
      while ( selStart > 0 
              && content.charAt(selStart-1) != sep ) selStart--;
      
      /*
       * forward
       */
      var selEnd = selStart;
      while ( selEnd < content.length 
              && content.charAt(selEnd) != sep ) selEnd++;
      
      /*
       * get text fragment
       */
      var cInput = qx.lang.String.trim( content.substring(selStart,selEnd) );
      //console.log ("trying to match '" +  input + "' with '" + cInput + "'." );
      
      /*
       * check whether input is still the same so that latecoming request
       * do not mess up the content
       */
      if ( input != cInput )
      {
        //console.log ("we're late: '" +  input + "' != '" + cInput + "'." );
        this._getAutoCompleteValues( cInput );
        return false;
      } 
      
      if (  data.options instanceof Array )
      {
        
        this.setOptions( data.options );
        
        /*
         * populate list widget and select matching entry
         */
        if ( this.getListBox() )
        {        
          if ( data.options != this.lastOptions) 
          {
            // //console.log("emptying listbox:");
            lb.removeAll();
            
            /*
             * no need for a listbox with 1 or less entries
             */
            if ( data.options.length < 2 && this._closePopup ) 
            {
              // //console.log("no data or only one result, closing listbox:");
              this._closePopup();
              return false;
            }
            
            // //console.log("populating listbox:");
            
            /*
             * populate listbox
             */
            for (var i = 0; i < data.options.length; i++) 
            {
              var l = data.options[i];
              lb.add(new qx.ui.form.ListItem(l.text, l.icon, l.value));
            }
            
            /* 
             * open popup
             */ 
            if ( ! lb.isSeeable() && this._openPopup ) {
              // //console.log("opening popup");
              this._openPopup();
            }
            
            /*
             * save options
             */
            delete this._lastOptions;
            this._lastOptions = data.options;
            
          }
     
          // //console.log("deselecting scrolling matched item into view");
          
          lb._manager._deselectAll();  
          
          /*
           * scroll matching item in the listbox into view
           */
          var matchedItem = lb.findString(input);
          if (matchedItem)
          {
            matchedItem.scrollIntoView();
          }
        }
      }

      
      /*
       * apply matched text and suggestion to content
       */
       this._autoTextSelection = null;
      if ( typeof data.suggest == "string")
      {
        
        var text = data.suggest;
        
        /* 
         * set value
         */ 
        this.__autocompleteActive = true;
        tb.selectFromTo(selStart,selEnd);     
        tb.setSelectionText( text );
        this.__autocompleteActive = false;
        this._lastContent = tb.getValue();
        
        /*
         * remember what is selected
         */
        this._autoTextSelection = text.substr(input.length);
        
        /*
         * select the added text
         */
        qx.client.Timer.once( function(){
          tb.setSelectionStart(selStart+input.length);
        },this,0);

      }
    }
  }

});
