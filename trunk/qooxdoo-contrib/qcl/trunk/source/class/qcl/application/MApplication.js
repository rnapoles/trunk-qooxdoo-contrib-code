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
#require(qcl.application.*)
************************************************************************ */

/**
 * A mixin for the application instance that provides access to Managers
 * that support:
 * <ul>
 * <li>application state saved in the URL / history support</li>
 * <li>authentication with backend</li>
 * <li>synchronization of configuration values with backend</li>
 * <li>generic json-rpc backend communication</li>
 * <li>addressing widgets by unique ids</li>
 * <li>cross-window clipboard</li>
 * </ul>
 */
qx.Mixin.define("qcl.application.MApplication",
{
 
  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties : {
    
    /**
     * The name of the application
     */
    applicationName : 
    {
      check : "String",
      nullable : false,
      init : "qooxdoo"
    },
    
    /**
     * Whether this is the main application window or a dependent
     * child window
     */
    mainApplication : 
    {
      check : "Boolean",
      init : true
    },
    
    /** 
     * The current session id, unique for each browser window in which an application
     * instance exists.
     */
    sessionId :
    {
      check : "String",
      nullable : true,
      event : "changeSessionId",
      apply : "_applySessionId"
    },
    
    /**
     * The manager for rpc backend calls
     * @type 
     */
    rpcManager :
    {
      check    : "qx.core.Object", // @todo: create interface
      nullable : false,
      event    : "changeRpcManager"
    },
    
    /**
     * The manager responsible for authentication
     * @type 
     */
    accessManager :
    {
      check    : "qx.core.Object", // @todo: create interface
      nullable : false,
      event    : "changeAccessManager"
    },
    
    /**
     * The manager synchronizing configuration values between client and 
     * server 
     * @type 
     */
    configManager :
    {
      check    : "qx.core.Object", // @todo: create interface
      nullable : false,
      event    : "changeConfigManager"
    },
    
    /**
     * The manager for state maintenance in the URL and application state history
     * @type 
     */
    stateManager :
    {
      check    : "qx.core.Object", // @todo: create interface
      nullable : false,
      event    : "changeStateManager"
    },
    
    /**
     * The manager for maintaining a central clipboard that interacts
     * with the clipboard of the OS
     * @type 
     */
    clipboardManager :
    {
      check    : "qx.core.Object", // @todo: create interface
      nullable : false,
      event    : "changeClipboardManager"
    }
    
  },

  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */  

  /**
   * Contructor, wich initializes the application.
   * Creates the necessary manager instances. If you want to use
   * different manager classes, override them in the constructor of the
   * application.
   */
  construct : function()
  {
    
    /*
     * cache for widget ids
     */
    this._widgetById = {};
    
    /*
     * Mixins
     */
    qx.Class.include( qx.core.Object, qcl.application.MGetApplication );
    qx.Class.include( qx.core.Object, qcl.application.MWidgetId );
    
    /*
     * setup managers
     */
    this.setStateManager( new qcl.application.StateManager );
    this.setRpcManager( new qcl.io.RpcManager );
    this.setAccessManager( new qcl.access.AccessManager );
    this.setConfigManager( new qcl.application.ConfigManager );
    this.setClipboardManager ( new qcl.application.ClipboardManager );
    
    /*
     * session id
     */
    var sid =  this.getStateManager().getState("sessionId");
    if ( sid )
    {
      this.setSessionId( sid );  
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
    
    _widgetById : {},
    _sessionId : null,    
    
    /*
    ---------------------------------------------------------------------------
       APPLY METHODS
    ---------------------------------------------------------------------------
    */          
    
    _applySessionId : function( sessionId, old )
    {
      if ( sessionId )
      {
        this.getStateManager().setState( "sessionId", sessionId );
      }
      else
      {
        this.getStateManager().removeState("sessionId");
      }
    },
        
    /*
    ---------------------------------------------------------------------------
       WIDGET ID
    ---------------------------------------------------------------------------
    */             
    
    /**
     * Store a reference to a widget linked to its id.
     * @param id {String}
     * @param widget {Object}
     * @return void
     */
    setWidgetById : function(id,widget)
    {
      this._widgetById[id] = widget;
    },
    
    /**
     * gets a reference to a widget by its id
     * @param id {String}
     * @return widget {Object}
     */
    getWidgetById : function(id)
    {
      return this._widgetById[id];
    },
    
    /*
    ---------------------------------------------------------------------------
       STARTUP AND TERMINATION
    ---------------------------------------------------------------------------
    */     
    
    /**
     * Called before the page is closed. If you would like to override this
     * method, define a close method in your main application. 
     * @return
     */
    close : function()
    {  
      if ( this.isMainApplication() )
      {  
        return this.tr("Do you really want to quit %1?",  this.getApplicationName() );
      }
      return undefined;
    },
    
    /**
     * Called when the page is closed. Calls the terminate() method of the
     * rpc manager. Override by definining a terminate() method in your application
     * class
     */
    terminate : function()
    {
      this.getRpcManager().terminate();
    },

    /*
    ---------------------------------------------------------------------------
       CHILD WINDOWS
    ---------------------------------------------------------------------------
    */         
    
    /**
     * Child windows opened by this application
     */
    _windows : {},
    
    /**
     * Sets the window title/caption. If the window is connected to a 
     * menu button, set the label of this button.
     * @param title {String}
     * @return
     */
    setWindowTitle : function( title )
    {
      document.title = title;
      if ( window.menuButton )
      {
        window.menuButton.setLabel(title);
      }
      
    },    
    
    /** 
     * Start an application in a new window or bring the
     * window to the front if it has already been opened.
     *
     * @param application {String} class name of application
     * @param state {Map} application state
     * @param width {Int} Width of window
     * @param height {Int} Height of window     
     * @return {qx.bom.Window} 
     */
    startApplication : function( application, state, width, height )
    {
      /*
       * add session id and access mode to the state
       */
      state.parentSessionId = this.getSessionId();
      state.access = "continue";
      
      /*
       * convert into string
       */
      var stateArr = [];
      for ( var key in state )
      {
        stateArr.push( key + "=" + encodeURIComponent( state[key] ) )
      }
      var stateStr = "#" + stateArr.join("&");
      var w = this._windows[stateStr];
      if ( w instanceof qx.bom.Window ) 
      {
        w.focus();
        return w;
      }
      
      /*
       * open new window
       */
      w = new qx.bom.Window("?application=" + application + stateStr );      
      w.setAllowScrollbars(false);
      if (width && height) 
      {
        w.setDimension(width, height);
      }
      else
      {
         w.setDimension(800, 400);
      }
      w.open();

      /*
       * check if window has been blocked
       */
      if (! w.isOpen() )
      {
        alert("Cannot open popup window. Please disable your popup blocker.");
        return null;
      }

      /*
       * delete reference on close
       */
      w.addEventListener("close", function() {
        delete this._windows[stateStr];
        delete w;
      }, this);

      /*
       * save window in registry
       */
      this._windows[stateStr] = w;
      
      return w;
    },

    
   /** 
    * Starts an application in a new window and creates a menu button connected with 
    * this window. When the button is clicked, the window gets the focus. Returns a 
    * qx.ui.menu.Button widget with the connected window reference attached as the 
    * "window" property
    *
    * @param application {String} class name of application
    * @param state {Map} application state
    * @param width {Int} Width of window
    * @param height {Int} Height of window
    * @param label {String} Label of the menu button connected to the window
    * @return {qx.ui.menu.Button} 
    */
   startApplicationWithMenuButton : function( application, state, width, height, label ) 
   {
     /*
      * window
      */
     var win = this.startApplication( application, state, width, height );
     
     /*
      * menu button
      */
     var menuButton = new qx.ui.menu.Button( label );
     
     /*
      * attach reference to window as the "window" property
      * and vice versa
      */
     console.log(menuButton.window);
     menuButton.window = win;
     win._window.menuButton = menuButton;
     
     /*
      * when button is clicked, give the focus to the window
      */
     menuButton.addEventListener("execute", function() {
       win.focus();
     });
     
     /*
      * when the window is closed, delete the button
      */
     win.addEventListener("close", function() {
       menuButton.getParent().remove(menuButton);
       menuButton.dispose();
       menuButton.destroy();
       win.dispose();
       delete win;
     });

     return menuButton;
   },        
    
    /**
     * Returns a reference to the main application
     *
     * @return {qx.application.Standalone}
     */
    getMainApplication : function()
    {
       if ( window.opener ) 
       {
         var app = opener.qx.core.Init.getApplication();
       } 
       else 
       {
         var app = this;
       }
       return app;
    }
  }
});