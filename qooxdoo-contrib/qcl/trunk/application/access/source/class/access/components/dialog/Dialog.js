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


/**
 * Base class for dialog widgets
 */
qx.Class.define("access.components.dialog.Dialog",
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
    __instances : {},
    
    /**
     * A queue of dialogs waiting to be displayed
     * @var {Array}
     */
    __dialogQueue : [],
  
    /**
     * Returns a singleton instance of the dialog type
     * @param type {String}
     * @return access.components.dialog.Dialog
     */
    getInstanceByType : function(type)
    {      
      if ( ! this.__instances[type] )
      {
        this.__instances[type] = new access.components.dialog[qx.lang.String.firstUp(type)];
      }
      this.__instances[type].addListener( "hide", this._nextDialog, this );
      return this.__instances[type];
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
      if ( this.__dialogQueue.length == 0 )
      {
        if (properties) {
          instance.set(properties);
        }
        instance.show();
        this.__dialogQueue.push(true);
      }
      else
      {
        /*
         * otherwise, push dialog and properties on the queue and add
         * listener to display next dialog when this one is hidden
         */
        this.__dialogQueue.push( { instance: instance, properties : properties } );
      }
    },
    
    /**
     * This is supposed to allow consecutive dialogs without using callbacks
     * It is not working, though.
     */
    _nextDialog : function( )
    {
      if ( this.__dialogQueue.length )
      {
        var next = this.__dialogQueue.shift();
        if ( next === true ) next = this.__dialogQueue.shift();
        if ( next )
        {
          next.instance.set(next.properties);
          next.instance.show();
        }
      }
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
     * Automatically add to application's root
     */
    qx.core.Init.getApplication().getRoot().add(this);
    
    /*
     * Set a very high Z-Index
     */
    this.setZIndex( 1E7 );
    
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
    if ( properties )
    {
      this.set(properties);
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
    __image : null,
    __message : null,
    __okButton : null,
    __cancelButton : null,       
    
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
      var okButton = this.__okButton =  new qx.ui.form.Button(this.tr("OK"));
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
      var cancelButton = this.__cancelButton =  new qx.ui.form.Button(this.tr("Cancel"));
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
      this.__image.setSource( value );
      this.__image.setVisibility( value ? "visible" : "excluded" );
    }, 
    
    _applyMessage : function( value, old )
    {
      this.__message.setValue( value );
      this.__message.setVisibility( value ? "visible" : "excluded" );
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