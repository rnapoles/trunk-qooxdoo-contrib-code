/* ************************************************************************

   qcl - the qooxdoo component library
  
   http://qooxdoo.org/contrib/project/qcl/
  
   Copyright:
     2007-2009 Christian Boulanger
  
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.
  
   Authors:
   *  Christian Boulanger (cboulanger)
  
************************************************************************ */

/* ************************************************************************
#asset(qx.icontheme/22/actions/dialog-cancel.png)
#asset(qx.icontheme/22/actions/dialog-ok.png)
************************************************************************ */


/**
 * Base class for dialog widgets
 */
qx.Class.define("qcl.ui.dialog.Dialog",
{
  extend : qx.ui.container.Composite,
  
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */     
  statics :
  {
    /**
     * A map of instances
     * @var {Map}
     */
    _instances : {},
    
    /**
     * A queue of dialogs waiting to be displayed
     * @var {Array}
     */
    _dialogQueue : [],
  
    /**
     * Returns a singleton instance of the dialog type
     * @param type {String}
     * @return qcl.ui.dialog.Dialog
     */
    getInstanceByType : function(type)
    {      
      if ( ! this._instances[type] )
      {
        this._instances[type] = new qcl.ui.dialog[qx.lang.String.firstUp(type)];
      }
      this._instances[type].addListener( "hide", this._nextDialog, this );
      return this._instances[type];
    },
    
    /**  
     * Show a dialog by the given type and set the property map. If another
     * dialog (or the same one) is already active and visible, defer the
     * showing of the dialog until the other one is closed.
     * 
     * @param type {String}
     * @param properties {Map}
     * @return {void}
     */    
    show : function( type, properties )
    {
      var instance = this.getInstanceByType( type );
      
      /*
       * if no dialogs in the queue, show right away and put a marker
       * in the queue
       */
      if ( this._dialogQueue.length == 0 )
      {
        if (properties) {
          instance.set(properties);
        }
        instance.show();
        this._dialogQueue.push(true);
      }
      else
      {
        /*
         * otherwise, push dialog and properties on the queue and add
         * listener to display next dialog when this one is hidden
         */
        this._dialogQueue.push( { instance: instance, properties : properties } );
      }
    },
    
    /**
     * This is supposed to allow consecutive dialogs without using callbacks
     * It is not working, though.
     */
    _nextDialog : function( )
    {
      if ( this._dialogQueue.length )
      {
        var next = this._dialogQueue.shift();
        if ( next === true ) next = this._dialogQueue.shift();
        if ( next )
        {
          next.instance.set(next.properties);
          next.instance.show();
        }
      }
    },
    
    /**
     * Turns remote server control on or off. If turned on, you can trigger the
     * display of dialogs using messages which can come from the server.
     * @see #_onMessage
     */
    allowServerControl : function( value )
    {
      var messageName = "qcl.components.dialog.Dialog.show";
      if ( value )
      {
        qx.event.message.Bus.getInstance().subscribe( messageName, this._onMessage,this);
      }
      else
      {
        qx.event.message.Bus.getInstance().unsubscribe( messageName, this._onMessage,this);
      }
    },
    
    /**
     * Handles the message. The message data has to be a map with of the following
     * structure: <pre>
     * {
     *   type : "(alert|confirm|form|login|select)",
     *   properties : { the dialog properties WITHOUT a callback },
     *   service : "the.name.of.the.rpc.service",
     *   method : "serviceMethod",
     *   params : [ the, parameters, passed, to, the, service, method ]
     * }
     * </pre>
     */
    _onMessage : function( message )
    {
      var data = message.getData();
      if ( data.service )
      {
        data.properties.callback = function( result )
        {
          /*
           * push the result to the beginning of the parameter array
           */
          if ( ! data.params || ! data.params instanceof Array )
          {
            data.params = [];
          }
          data.params.unshift(result);
          
          /*
           * send reqeust back to server
           */
          qx.core.Init.getApplication().executeService( 
              data.service, data.method, data.params 
          );
        }
      }
      qcl.ui.dialog.Dialog.show(data.type,data.properties);
    }
  },
    
  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */     
  properties :
  {
  
    /**
     * Callback function that will be called when the user 
     * has interacted with the widget. See sample callback
     * method supplied in the source code of each dialog 
     * widget.
     */
    callback : 
    {
      check : "Function",
      nullable : true
    },
    
    /**
     * A banner image/logo that is displayed on the widget,
     * if applicable
     */
    image : 
    {
      check : "String",
      nullable : true,
      apply : "_applyImage"
    },
    
    /**
     * The message that is displayed
     */
    message :
    {
      check : "String",
      nullable : true,
      apply : "_applyMessage"
    }, 
    
    /**
     * Whether to block the ui while the widget is displayed
     */
    useBlocker :
    {
      check : "Boolean",
      init : true
    },
    
    /**
     * The blocker's color
     */
    blockerColor :
    {
      check : "String",
      init : "black"
    },
    
    /**
     * The blocker's opacity
     */
    blockerOpacity :
    {
      check : "Number",
      init : 0.5
    },
    
    /**
     * Whether to allow cancelling the dialog
     */
    allowCancel :
    {
      check : "Boolean",
      init : false,
      event : "changeAllowCancel"
    }
  },
  
  /*
  *****************************************************************************
     EVENTS
  *****************************************************************************
  */    
  events : 
  {   
    /**
    * Event dispatched when widget is shown
    */
   "show" : "qx.event.type.Event",
   
   /**
    * Data event dispatched when widget is hidden
    */
   "hide"  : "qx.event.type.Hidden"   
  },
  
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */   
  
  /**
   * @param properties {Map|String|undefined} If you supply a map, all the 
   * corresponding properties will be set. If a string is given, use it 
   * as to set the 'message' property.
   */
  construct: function( properties )
  {
    this.base(arguments);
    
    /*
     * basic settings
     */
    this.set({
      'visibility' : "hidden",
      'decorator'  : "shadow-popup"
    });
    this.setLayout( new qx.ui.layout.Grow() );
    
    /*
     * automatically add to application's root
     */
    qx.core.Init.getApplication().getRoot().add(this);
    
    /*
     * set a very high Z-Index
     */
    this.setZIndex( 1E7 );
    
    /*
     * make it a focus root
     */
    qx.ui.core.FocusHandler.getInstance().addRoot(this);
    
    /* 
     * resize event 
     */
    this.getApplicationRoot().addListener("resize", function(e)
    {
      var bounds = this.getBounds();
      this.set({
        marginTop: Math.round( ( qx.bom.Document.getHeight() -bounds.height ) / 2),
        marginLeft : Math.round( ( qx.bom.Document.getWidth() -bounds.width) / 2)
      });
    }, this);
    
    /* 
     * appear event 
     */
    this.addListener("appear", function(e)
    {
      var bounds = this.getBounds();
      this.set({
        marginTop: Math.round( ( qx.bom.Document.getHeight() -bounds.height ) / 2),
        marginLeft : Math.round( ( qx.bom.Document.getWidth() -bounds.width) / 2)
      });
    }, this);   
    
    /*
     * create widget content
     */
    this._createWidgetContent();
    
    /*
     * set properties if given
     */
    if ( typeof properties == "object" )
    {
      this.set(properties);
    }
    /*
     * if argument is a string, assume it is a message
     */
    else if ( typeof properties == "string" )
    {
      this.setMessage(properties);
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
       PRIVATE MEMBERS
    ---------------------------------------------------------------------------
    */  
    _image : null,
    _message : null,
    _okButton : null,
    _cancelButton : null,       
    
    /*
    ---------------------------------------------------------------------------
       WIDGET LAYOUT
    ---------------------------------------------------------------------------
    */  
    
 
    /**
     * Extending classes must implement this method.
     */
    _createWidgetContent : function()
    {
      this.error("_createWidgetContent not implemented!");
    },  
    
    /**
     * Create a cancel button
     * @return {qx.ui.form.Button}
     */    
    _createOkButton : function()
    {
      var okButton = this._okButton =  new qx.ui.form.Button(this.tr("OK"));
      okButton.setIcon("icon/22/actions/dialog-ok.png")
      okButton.setAllowStretchX(false);
      okButton.addListener("execute", this._handleOk, this);  
      return okButton;
    },
    
    /**
     * Create a cancel button, which is hidden by default and will be shown
     * if allowCancel property is set to true.
     * @return {qx.ui.form.Button}
     */
    _createCancelButton : function()
    {
      var cancelButton = this._cancelButton =  new qx.ui.form.Button(this.tr("Cancel"));
      cancelButton.setAllowStretchX(false);
      cancelButton.setIcon("icon/22/actions/dialog-cancel.png");
      cancelButton.addListener("execute", this._handleCancel, this);  
      this.bind("allowCancel",cancelButton,"visibility",{
        converter : function( value )
        {
          return value ? "visible" : "excluded";
        }
      });      
      return cancelButton;
    },
    

    
    /*
    ---------------------------------------------------------------------------
       APPLY METHODS
    ---------------------------------------------------------------------------
    */ 
    _applyImage : function( value, old )
    {
      this._image.setSource( value );
      this._image.setVisibility( value ? "visible" : "excluded" );
    }, 
    
    _applyMessage : function( value, old )
    {
      this._message.setValue( value );
      this._message.setVisibility( value ? "visible" : "excluded" );
    },     
    
    /*
    ---------------------------------------------------------------------------
      API METHODS
    ---------------------------------------------------------------------------
    */     
    
    /**
     * Show the widget. Overriding methods must call this parent method
     */
    show : function()
    {
      if ( this.isUseBlocker() )
      {
        var root = this.getApplicationRoot();
        root.setBlockerOpacity( this.getBlockerOpacity() );
        root.setBlockerColor( this.getBlockerColor() );  
        root.blockContent( this.getZIndex()-1 );
      }    
      this.setVisibility("visible");
      this.fireEvent("show");
    },
    
    /**
     * Hide the widget. Overriding methods must call this parent method
     */    
    hide : function()
    {
      this.setVisibility("hidden");
      if ( this.isUseBlocker() )
      {
        this.getApplicationRoot().unblockContent();
      }
      this.fireEvent("hide");
    },
    
    /*
    ---------------------------------------------------------------------------
       EVENT HANDLERS
    ---------------------------------------------------------------------------
    */     
    
    /**
     * Handle click on ok button. Calls callback with a "true" argument
     */
    _handleOk : function()
    {
      this.hide();
      if( this.getCallback() )
      {
        this.getCallback()(true);
      }
      this.resetCallback();
    },  

    /**
     * Handle click on cancel button. Calls callback with 
     * an "undefined" argument
     */
    _handleCancel : function()
    {
      this.hide();
      if( this.getCallback() )
      {
        this.getCallback()();
      }
      this.resetCallback();
    } 
  }
});