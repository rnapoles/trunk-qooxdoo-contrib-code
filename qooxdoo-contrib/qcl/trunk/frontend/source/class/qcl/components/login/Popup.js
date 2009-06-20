/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Christian Boulanger (cboulanger)
     * Jonathan Weiss (jonathan_rass) (original code from demo browser)

************************************************************************ */

/**
 * Login popup singleton
 */
qx.Class.define("qcl.components.login.Popup",
{
  extend : qx.ui.container.Composite,
  
  type : "singleton",
    
  
  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */     
  properties :
  {
  
    /**
     * Callback function that takes the username, password and
     * another callback function, plus the execution context
     * as parameters. The passed function
     * is called with a boolean value (true=authenticated, false=
     * authentication failed) and a string value which contains 
     * an error message. 
     * @see link qcl.components.login.Popup#sampleCallbackFunc
     */
    callback : 
    {
      check : "Function",
      nullable : true
    },
    
    /**
     * A banner image/logo that is displayed above the login
     * fields
     */
    image : 
    {
      check : "String",
      nullable : true,
      apply : "_applyImage"
    },
    
    /**
     * A html text that is displayed below the username/password
     * fields, for example, if there was an error during login.
     */
    message :
    {
      check : "String",
      nullable : true,
      apply : "_applyMessage"
    },
    
    /**
     * A html text that is displayed below the image (if present)
     * and above the login
     */
    text :
    {
      check : "String",
      nullable : true,
      apply : "_applyText"
    },    
    
    /**
     * Whether to block the ui below the login window.
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
     * Whether to allow cancelling the login process
     */
    allowCancel :
    {
      check : "Boolean",
      init : true,
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
     * Event dispatched when login was successful
     */
    "loginSuccess" : "qx.event.type.Event",
    
    /**
     * Data event dispatched when login failed, event data
     * contains a reponse message
     */
    "loginSucces"  : "qx.event.type.Data"    
  },
  
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */   
  construct: function()
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
     * groupbox
     */
    var groupboxContainer = new qx.ui.groupbox.GroupBox().set({
      contentPadding: [16, 16, 16, 16]
    });
    groupboxContainer.setLayout( new qx.ui.layout.VBox );
    this.add( groupboxContainer );
    
    /*
     * add image 
     */
    this.__image = new qx.ui.basic.Image();
    this.__image.setVisibility("excluded");
    groupboxContainer.add( this.__image );
    
    /*
     * add text
     */
    this.__text = new qx.ui.basic.Label();
    this.__text.setRich(true);
    this.__text.setVisibility("excluded");
    groupboxContainer.add( this.__text );
    
    /* 
     * Group box with login fields  
     */
    var gridContainer = new qx.ui.container.Composite;
    var layout = new qx.ui.layout.Grid(9, 5);
    layout.setColumnAlign(0, "right", "top");
    layout.setColumnAlign(2, "right", "top");
    gridContainer.setLayout(layout);
    gridContainer.setAllowStretchX(true);
    groupboxContainer.add( gridContainer );
    
    /* 
     * Labels 
     */
    var labels = ["Name", "Password"];
    for (var i=0; i<labels.length; i++) {
      gridContainer.add(new qx.ui.basic.Label(labels[i]).set({
        allowShrinkX: false,
        paddingTop: 3
      }), {row: i, column : 0});
    }

    /* 
     * Text fields  
     */
    this.__username = new qx.ui.form.TextField();
    this.__password = new qx.ui.form.PasswordField();

    gridContainer.add(this.__username.set({
      allowShrinkX: false,
      paddingTop: 3
    }), {row: 0, column : 1});

    gridContainer.add(this.__password .set({
      allowShrinkX: false,
      paddingTop: 3
    }), {row: 1, column : 1});

    /*
     * Add message label
     */
    this.__message = new qx.ui.basic.Label();
    this.__message.setRich(true);
    this.__message.setVisibility("excluded");
    groupboxContainer.add( this.__message );    
    
    /* 
     * Login Button 
     */
    var loginButton = this.__okButton =  new qx.ui.form.Button(this.tr("Login"));
    loginButton.setAllowStretchX(false);
    
    /* 
     * Cancel Button 
     */
    var cancelButton = this.__okButton =  new qx.ui.form.Button(this.tr("Cancel"));
    cancelButton.setAllowStretchX(false);
    this.bind("allowCancel",cancelButton,"visibility",{
      converter : function( value )
      {
        return value ? "visible" : "excluded";
      }
    });
    
    /*
     * buttons pane
     */
    var buttonPane = new qx.ui.container.Composite;
    buttonPane.setLayout(new qx.ui.layout.HBox(5));
    buttonPane.add(loginButton);
    buttonPane.add(cancelButton);
    gridContainer.add(
       buttonPane,{ row : 3, column : 1}
    );

    /* 
     * Check input on click 
     */
    loginButton.addListener("execute", function(){
      this.getCallback()(
        this.__username.getValue(),
        this.__password.getValue(),
        this._handleCheckLogin,
        this
      );
    }, this);
    
    /* 
     * Hide login popup on cancel
     */
    cancelButton.addListener("execute", this.hide, this);    

    /* 
     * Prepare effect as soon as the widget is ready 
     */
    this.addListener("appear", this.__prepareEffect, this);
    
    /*
     * Blocker effect
     */
    if ( this.isUseBlocker() )
    {
      this.addListener("appear",function(){
        var root = this.getApplicationRoot();
        root.setBlockerOpacity( this.getBlockerOpacity() );
        root.setBlockerColor( this.getBlockerColor() );  
        root.blockContent( this.getZIndex()-1 );
      },this);
      this.addListener("disappear",function(){
        this.getApplicationRoot().unblockContent();
      },this);
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
    __text : null,
    __username : null,
    __password : null,
    __message : null,
    
    /*
    ---------------------------------------------------------------------------
       APPLY AND PRIVATE METHODS
    ---------------------------------------------------------------------------
    */ 
    _applyImage : function( value, old )
    {
      this.__image.setSource( value );
      this.__image.setVisibility( value ? "visible" : "excluded" );
    },

    _applyText : function( value, old )
    {
      this.__text.setValue( value );
      this.__text.setVisibility( value ? "visible" : "excluded" );
    },    
    
    _applyMessage : function( value, old )
    {
      this.__message.setValue( value );
      this.__message.setVisibility( value ? "visible" : "excluded" );
    },  
    
    /**
     * Sets up the effect that is triggered when the login fails
     * @return {void}
     */
    __prepareEffect : function()
    {
      this.__effect = new qx.fx.effect.combination.Shake(this.getContainerElement().getDomElement());
    },
    
    /**
     * Handler function called with the result of the authentication
     * process.
     * @param result {Boolean}
     * @param message {String|Null} Optional HTML message that might contain
     * error information, such as "Wrong password".
     * @return
     */
    _handleCheckLogin : function( result, message )
    {
      /*
       * clear password field and message label
       */
      this.__password.setValue("");
      this.setMessage(null);
       
      /*
       * check result
       */
      if ( result )
      {
        this.fireEvent("loginSuccess");
        this.hide();
      }
      else
      {
        this.__effect.start();
        this.fireDataEvent("loginFail", message );
      }
    },
    
    /*
    ---------------------------------------------------------------------------
      API METHODS
    ---------------------------------------------------------------------------
    */     
    
    show : function()
    {
      if ( typeof this.getCallback() != "function" )
      {
        this.error("You must supply a callback function");
      }     
      this.setVisibility("visible");
    },
    
    hide : function()
    {
      this.setVisibility("hidden");
    },
    
    /**
    * Sample callback function that takes the username, password and
    * another callback function as parameters. The passed function
    * is called with a boolean value (true=authenticated, false=
    * authentication failed) and a string value which contains 
    * an error message like so: 
    * callback.call( context, {Boolean} result, {String} message);
    * @param username {String}
    * @param password {String}
    * @param callback {Function} The callback function
    * @param context {Object} The execution context
    */    
   sampleCallbackFunc : function( username, password, callback, context )
   {
      if ( username == "username" && password == "password" )
      {
        callback.call( context, true );
      }
      else
      {
        callback.call( context, false, "<span style='color:red'>Wrong password</span>" );
      }
    }
  }
});