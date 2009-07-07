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
 * Login popup singleton
 */
qx.Class.define("access.components.dialog.Login",
{
  extend : access.components.dialog.Dialog,
  
  
  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */     
  properties :
  {
  
    /**
     * A html text that is displayed below the image (if present)
     * and above the login
     */
    text :
    {
      check : "String",
      nullable : true,
      apply : "_applyText"
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
    __text : null,
    __username : null,
    __password : null,
    
    /*
    ---------------------------------------------------------------------------
       APPLY AND PRIVATE METHODS
    ---------------------------------------------------------------------------
    */ 

    _applyText : function( value, old )
    {
      this.__text.setValue( value );
      this.__text.setVisibility( value ? "visible" : "excluded" );
    },    
        
    /*
    ---------------------------------------------------------------------------
       WIDGET LAYOUT
    ---------------------------------------------------------------------------
    */     
    
    /**
     * Create the main content of the widget
     */
    _createWidgetContent : function()
    {      

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
      this.__text.setAllowStretchX(true);
      this.__text.setVisibility("excluded");
      
      groupboxContainer.add( this.__text );
      
      /* 
       * Group box with login fields  
       */
      var gridContainer = new qx.ui.container.Composite;
      var gridLayout = new qx.ui.layout.Grid(9, 5);
      gridLayout.setColumnAlign(0, "right", "top");
      gridLayout.setColumnAlign(2, "right", "top");
      gridLayout.setColumnMinWidth(0, 50);
      gridLayout.setColumnFlex(1, 2);
      gridContainer.setLayout(gridLayout);
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
      this.__message.setAllowStretchX(true);
      this.__message.setVisibility("excluded");
      groupboxContainer.add( this.__message );    
      
      /* 
       * Login Button 
       */
      var loginButton = this.__loginButton =  new qx.ui.form.Button(this.tr("Login"));
      loginButton.setAllowStretchX(false);
      loginButton.addListener("execute", function(){
        this.getCallback()(
          this.__username.getValue(),
          this.__password.getValue(),
          this._handleCheckLogin,
          this
        );
      }, this);      
      
      /* 
       * Cancel Button 
       */
      var cancelButton = this._createCancelButton();
      
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
       * Prepare effect as soon as the widget is ready 
       */
      this.addListener("appear", this.__prepareEffect, this);
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
     * Handle click on cancel button
     */
    _handleCancel : function()
    {
      this.hide();
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
   
    /**
    * @override
    */    
    hide : function()
    {
      this.__password.setValue("");
      this.setMessage(null);
      this.base(arguments);
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