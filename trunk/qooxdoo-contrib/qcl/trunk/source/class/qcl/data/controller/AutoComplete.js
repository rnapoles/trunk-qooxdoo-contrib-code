/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2008 Christian Boulanger

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
 * Adds autocompletion to a widget that allows entering values.
 * Currently, qx.ui.form.(TextField|TextArea|ComboBox) are supported.
 * 
 * If you want to use this mixin stand-alone you need to uncomment
 * some code in the "properties" section. 
 * 
 * Use the following way:
 * 
 * var widget = new qx.ui.form.(TextField|TextArea|ComboBox);
 * new qcl.data.controller.AutoComplete( model, widget);
 * 
 * The model can be populated by hand or retrieved from a server with
 * a store
 * 
 * The model structure looks like this:
 * 
 * { "input" : "fragment",
 *   "suggestions" : ["fragment","fragmentation","fragmentabolous","fragmentive",...]
 * }
 */
qx.Class.define("qcl.data.controller.AutoComplete",
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

    /** 
     * The autocomplete data model 
     */
    model :
    {
      check    : "qx.core.Object",
      nullable : true,
      apply    : "_applyModel"
    },

    /** 
     * The autocomplete target
     */
    target :
    {
      check    : "qx.core.Object",
      nullable : true,
      apply    : "_applyTarget"
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
     * Property that is set when user has typed in a value that should
     * be autocompleted. This property can be used to bind to trigger the
     * reloading of store data. 
     */
    input :
    {
      check    : "String",
      nullable : true,
      event    : "changeInput"
    },    
    
    /**
     * The text field used for autocompletion
     */
    textField :
    {
      check : "qx.ui.form.AbstractField",
      nullable : true
    }

  },
  
  
  /*
  *****************************************************************************
     EVENTS
  *****************************************************************************
  */

  events: 
  {

  },  
  
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function( model, target )  
  {
	  if ( model )
    {
      this.setModel( model );
    }
    
    if ( target )
    {
      this.setTarget( target );
    }
    
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
       APPLY METHODS
    ---------------------------------------------------------------------------
    */   
    
    /**
     * Apply the model. This can also be the result of a json store that
     * has loaded from the server
     * @param model {qx.core.Object ? null}
     * @param old {qx.core.Object ? null}
     */
    _applyModel : function( model, old )
    {
      if ( model )
      {
        this._handleAutoCompleteValues();
      }
    },
    
    /**
     * Apply the target
     * @param model {qx.core.Object ? null}
     * @param old {qx.core.Object ? null}
     */
    _applyTarget : function( target, old )
    {
      /*
       * to what widget has this mixin been applied?
       */
      switch ( target.classname )
      {
        /*
         * valid widgets
         */
        case "qx.ui.form.TextField":
        case "qx.ui.form.TextArea":
          this.setTextField(target);
          break;
        case "qx.ui.form.ComboBox":
          this.setTextField( target.getChildControl("textfield") );
          break;
          
        default:
          this.error("Invalid widget!");
          return;
      }
      
     
      /*
       * setup or remove event listeners
       */
      var tf = this.getTextField();
      if ( tf )
      {
        tf.removeEventListener("keydown", this._handleTextFieldKeypress,this);
        tf.removeEventListener("input",this._onInput,this);
        tf.removeEventListener("changeValue",this._onChangeValue,this);
      }      
      
      if ( target )
      {
        this._lastKeyPress = (new Date).valueOf();
        tf.addEventListener("keydown", this._handleTextFieldKeypress,this);
        tf.addEventListener("input",this._onInput,this);
        tf.addEventListener("changeValue",this._onChangeValue,this);
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
      var content = this.getTextField().getValue();
      var tf = this.getTextField();
      
      console.log("Text field content:" + content + ", keypress event:" +  key );
      switch( key )
      {
        case "Enter": 

          /* 
           * pressing enter when text is selected should
           * not delete the text, this is the common
           * user experience for autocomplete, i.e. in 
           * openoffice
           */
          var selLength = tf.getTextSelectionLength();
          console.log("Selection length:" + selLength, ", auto text selection: " + this._autoTextSelection);
          if ( selLength )
          {
            if ( this._autoTextSelection )
            {
              console.log("Auto-Selection: Putting caret at the end of the selection");
              var selStart  = tf.getTextSelectionStart();
              tf.setTextSelection( selStart+selLength,selStart+selLength);              
            }
          }

        case "Tab": 
        case "Up": 
        case "Down":
        case "Left": 
        case "Right": 
          break;
      }
     
    },

    
    /**
     * Replaces a text fragment at the current position of the
     * caret. If a separator has been defined, the text will replace
     * all characters between the previous and the next separator
     * seen from the current caret position. When no separator
     * has been defined, replace the whole textbox content.
     * This will select the inserted text.
     * @param text {String}
     */
    replaceAtCaretPosition : function ( text )
    {
      var tf = this.getTextField();
      var content  = tf.getValue();
      var sep      = this.getSeparator();
      
      if ( sep )
      {
      
        /*
         * rewind
         */
        var selStart = this.getTextSelectionStart();
        while ( selStart > 0 
                && content.charAt(selStart-1) != sep ) selStart--;
        
        /*
         * forward
         */
        var selEnd = selStart;
        while ( selEnd < content.length 
                && content.charAt(selEnd) != sep ) selEnd++;
        //console.log("Selecting from " + selStart + " to " + selEnd );
      }
      else
      {
        //console.log("Selecting all");
        var selStart = 0;
        var selEnd   = content.length;
      }
      
      this.setTextSelection(selStart,selEnd);
      this.setTextSelectionText( text );
      
      /*
       * set caret to the end of the inserted text
       */
      qx.client.Timer.once( function(){
        this.setTextSelection(selStart+text.length,0);     
      },this,50);      
    },


    /**
     * event handler for event triggering the autocomplete action
     */    
    _onInput : function(e)
    {
      
      
      var tf =  this.getTextField();
      /*
       * get and save current content of text field
       */
      var content = tf.getValue();  
      
      /*
       * do not start query if only whitespace has been added
       */
       if ( qx.lang.String.trim( content ) != tf.getValue() )
       {
         console.log("Only whitespace added ...");
         return;
       }
       
      /*
       * cache content
       */ 
      this._lastContent = content;
      
      console.log( "user typed: " + content );
    
    	/*
    	 * delay before sending request
    	 */
      var now = (new Date).valueOf(); 
      
      if (( now - this._lastKeyPress) < this.getDelay() ) 
      {
        console.log( "delay not reached");
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
       
      if ( sep )
      {  
         /*
          * rewind
          */
         var selStart = tf.getTextSelectionStart();
         while ( selStart > 0 
                 && content.charAt(selStart-1) != sep ) selStart--;
         
         /*
          * forward
          */
         var selEnd = selStart;
         while ( selEnd < content.length 
                 && content.charAt(selEnd) != sep ) selEnd++;
      }
      else
      {
        var selStart = 0;
        var selEnd   = content.length-1;
      }
      
      /*
       * text fragment
       */
      var input = qx.lang.String.trim( content.substring( selStart,selEnd ) );
      console.log( "Input is '" + input +"'");
      
      /*
       * Store timestamp
       */
      this._lastKeyPress = (new Date).valueOf();

      /*
       * check if we have a matching model
       */
      if ( this.getModel() && this.getModel().getInput() == input )
      {
        this._handleAutoCompleteValues();  
      }
      else
      {
        /*
         * Send request if we have enough characters
         */
        if ( input.length >= this.getMinCharNumber() )
        {
          console.log( "sending request for " + input );
          this.setInput(input);  
        }
        else
        {
          console.log("Not enough characters...");
        }
      }
    },    
  
    /**
     * Called when autocomplete data is available
     */  
    _handleAutoCompleteValues : function ()
    {
      /*
       * compare the input that was used to query
       * the autocompletion data and the current input
       */
      var tf = this.getTextField();
      var model = this.getModel();
      var content = tf.getValue() || ""; 
      var input = model.getInput();  
      var suggestions = model.suggestions();
      
      /*
       * if no suggestions, abort
       */
      if ( ! suggestions || suggestions.length == 0 )
      {
        return false;
      }
      
      /*
       * separator for multi-value fields
       */
      var sep = this.getSeparator();                            
      console.log("Separator '"+sep+"'");
      if ( sep )
      { 
        /*
         * rewind
         */
        var selStart = tf.getTextSelectionStart();
        while ( selStart > 0 
                && content.charAt(selStart-1) != sep ) selStart--;
        
        /*
         * forward
         */
        var selEnd = selStart;
        while ( selEnd < content.length 
                && content.charAt(selEnd) != sep ) selEnd++;
        console.log("Selecting from " + selStart + " to " + selEnd);
      }
      else
      {
        console.log("Selecting all...");
        var selStart = 0;
        var selEnd   = content.length-1;
      }
      
      /*
       * get text fragment
       */
      var cInput = qx.lang.String.trim( content.substring(selStart,selEnd) );
      console.log ("trying to match '" +  input + "' with '" + cInput + "'." );
      
      /*
       * check whether input is still the same so that latecoming request
       * do not mess up the content
       */
      if ( input != cInput )
      {
        console.log ("we're late: '" +  input + "' != '" + cInput + "'." );
        return false;
      }
      
      /*
       * apply matched text and suggestion to content
       */
      var text = suggestions[0];
      console.log("Suggestion: " + text );
      console.log("Matching '" + text.substr(0,input.length) + "' with '" + input + "'");
      
      /*
       * replace all if suggestion is not like the input
       */
      if ( text.substr(0,input.length) != input )
      {
        selStart = 0;
        selEnd   = text.length -1
      }
      
      /* 
       * set value, preventing that other parts of this 
       * controller to mess this up.
       */ 
      this.__autocompleteActive = true;
      this.__preventChange = true;
      
      tf.setTextSelection(selStart,selEnd);     
      //tf.setTextSelectionText( text );
      
      this.__preventChange = false;
      this.__autocompleteActive = false;
      this._lastContent = tf.getValue();
      
      /*
       * remember what is selected
       */
      this._autoTextTextSelection = text.substr(input.length);
      
      /*
       * select the added text
       */
      if ( text.substr(0,input.length) == input )
      {
        qx.client.Timer.once( function(){
          //console.log("TextSelection start " + (selStart+input.length) );
          tf.setTextSelectionStart( selStart+input.length );
        },this,0);
      }
      else
      {
        qx.client.Timer.once( function(){
          //console.log("selectAll()" );
          tf.selectAll();
        },this,0);          
      }
    }
  }

});