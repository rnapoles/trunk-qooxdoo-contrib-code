/* ************************************************************************

   Copyright:
     2009 ACME Corporation -or- Your Name, http://www.example.com
     
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Your Name (username)

************************************************************************ */

/* ************************************************************************

#asset(rpcconsole/*)

************************************************************************ */

/**
 * This is the main class of contribution "RpcConsole"
 * 
 */
qx.Class.define("rpcconsole.RpcConsole",
{
  extend : qx.ui.container.Composite,
  
  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */  
  properties :
  {
    /**
     * A data model representing the request data. It is actually the model
     * of the form controller. You should never set the property itself, instead
     * update its properties it with getRequestModel().setX(...). This will 
     * update the form fields
     */
    requestModel :
    {
      check    : "qx.core.Object",
      nullable : true,
      event    : "changeRequestModel"
    },
    
    /**
     * A data model representing the resonse data
     * @type 
     */
    responseModel :
    {
      check    : "qx.core.Object",
      nullable : true,
      event    : "changeResponseModel"
    }
  },
  
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * Constructor
   */
  construct : function( serverUrl ) 
  {
    this.base(arguments);
    
    /*
     * draw user interface
     */
    this._createUI( serverUrl );
      
    /*
     * rpc object
     */
    this._rpc = new qx.io.remote.Rpc();    
  },
  
  
  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    
    /*
    -------------------------------------------------------------------------
      PRIVATE MEMBERS
    -------------------------------------------------------------------------
    */
    _rpc                 : null,
    _form                : null,
    _formController      : null,
    _methodComboBox      : null,
    _sendButton          : null,
    _cancelButton        : null,
    _opaqueCallReference : null,    
    
    /**
     * Creates the UI
     */
    _createUI : function( serverUrl )
    {
      this.setLayout( new qx.ui.layout.VBox(10) );
      
      /*
       * tabview
       */
      var tabview = new qx.ui.tabview.TabView();
      this.add(tabview);
      
      /*
       * main service info
       */
      var servicePage = new qx.ui.tabview.Page("Service Info");
      tabview.add(servicePage)
      var grid = new qx.ui.layout.Grid();
      grid.setSpacing(5);
      grid.setColumnAlign(0, "left", "middle"),
      grid.setColumnFlex(1,1);
      servicePage.setLayout(grid);
      
      /*
       * form
       */
      this._form = new qx.ui.form.Form()
      this._formController = new qx.data.controller.Form( null, this._form );
      
      /*
       * Server URL
       */
      var label = new qx.ui.basic.Label("Server URL:");
      servicePage.add(label, {row: 0, column: 0});
      var serverUrlTextfield = new qx.ui.form.TextField();
      servicePage.add( serverUrlTextfield, {row: 0, column: 1});
      this._form.add( serverUrlTextfield, null, null, "url" );
  
      /*
       * Service name
       */
      label = new qx.ui.basic.Label("Service name:");
      servicePage.add(label, {row: 1, column: 0});
      var serviceTextfield = new qx.ui.form.TextField("");
      serviceTextfield.setPlaceholder("The service name, i.e. qooxdoo.test");
      servicePage.add( serviceTextfield, {row: 1, column: 1});
      this._form.add( serviceTextfield, null, qx.util.Validate.regExp(/[a-zA-Z0-9\.]+/), "service" );
      
      /*
       * Service method
       */
      label = new qx.ui.basic.Label("Service method:");
      servicePage.add(label, {row: 2, column: 0});
      var hbox = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) );
      var methodComboBox = this._methodComboBox = new qx.ui.form.ComboBox();
      methodComboBox.setPlaceholder("The service method, i.e. echo");
      hbox.add( methodComboBox, { flex : 1 } );
      servicePage.add(hbox, {row: 2, column: 1});    
      this._form.add( methodComboBox, null, qx.util.Validate.regExp(/[a-zA-Z0-9]+/), "method" );
  
      /*
       * options
       */
      hbox = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) );
      var crossDomainCheckBox = new qx.ui.form.CheckBox( "Cross Domain" );
      crossDomainCheckBox.setEnabled(false); // not yet functional
      hbox.add( crossDomainCheckBox );
      this._form.add( crossDomainCheckBox, null, null, "crossDomain" );
      hbox.add( new qx.ui.basic.Label("Timeout:") );
      var timeoutSpinner = new qx.ui.form.Spinner().set({
        minimum  : 3,
        maximum  : 60,
        value    : 10,
        editable : true
      });
      hbox.add( timeoutSpinner );
      hbox.add( new qx.ui.basic.Label("seconds") );
      this._form.add( timeoutSpinner, null, null, "timeout" );
  
      servicePage.add( new qx.ui.basic.Label("Options:"), {row: 3, column: 0 });
      servicePage.add(hbox, {row: 3, column: 1 });
      
      /*
       * service parameters
       */
      servicePage.add( new qx.ui.basic.Label("Params:" ), {row: 4, column: 0} );
      var paramsTextField = new qx.ui.form.TextArea().set({
        placeholder : "Please enter the method parameters, separated by comma and properly quoted, for example: \"Hello World!\"."
      });
      servicePage.add( paramsTextField, { row: 4, column : 1} );
      this._form.add( paramsTextField, null, null, "params" );
      this._formController.addBindingOptions("params", {
        converter : function( data ) {
          if ( qx.lang.Type.isArray( data ) && data.length )
          {
            var json = qx.util.Json.stringify(  data );
            return json.substring(1,json.length-1);
          }
          return null;
        }
      }, {
        converter : function( data ) {
          if ( data )
          {
            try
            {
              return qx.util.Json.parse( "[" + data + "]");
            }
            catch(e)
            {
              this.warn(e);
            }
          }
          return [];
        }
      });      
      
      /*
       * serverData tab
       */
      var serverDataPage = new qx.ui.tabview.Page( "Server Data" );
      serverDataPage.setLayout( new qx.ui.layout.Grow() );
      tabview.add( serverDataPage );
      var serverDataTextArea = new qx.ui.form.TextArea();
      serverDataTextArea.setPlaceholder("You can send arbitrary json data with your request here.")
      serverDataPage.add( serverDataTextArea );
      this._form.add( serverDataTextArea , null, null, "serverData" );
      this._formController.addBindingOptions("serverData", {
        converter : function( data ) {
          if ( data )
          {
            return qx.util.Json.stringify( data );
          }
          return null;
        }
      }, {
        converter : function( data ) {
          if ( data )
          {
            try
            {
              return qx.util.Json.parse( data );
            }
            catch(e)
            {
              this.warn(e);
            }
          }
          return null;
        }
      });       
      
      /*
       * authentication tab
       */
      var authenticationPage = new qx.ui.tabview.Page( "Authentication" );
      var grid = new qx.ui.layout.Grid();
      grid.setSpacing(5);
      grid.setColumnAlign(0, "left", "middle"),
      grid.setColumnFlex(1,1);     
      authenticationPage.setLayout( grid );
      tabview.add( authenticationPage );
      
      /*
       * basic http auth
       */
      var authenticationCheckBox = new qx.ui.form.CheckBox("Use Basic Http Authentication");
      authenticationPage.add( authenticationCheckBox, { row: 0, column: 0, colSpan : 2 });
      this._form.add( authenticationCheckBox , null, null, "useBasicHttpAuth" );
      
      var userNameTextField = new qx.ui.form.TextField();
      this._form.add( userNameTextField , null, null, "username" );
      authenticationCheckBox.bind("value",userNameTextField,"enabled");
      var label = new qx.ui.basic.Label("User name");
      label.setBuddy(userNameTextField);
      authenticationPage.add( label,  { row: 1, column: 0} );
      authenticationPage.add( userNameTextField, { row: 1, column: 1});
      
      var passwordTextField = new qx.ui.form.PasswordField();
      this._form.add( passwordTextField , null, null, "password" );    
      authenticationCheckBox.bind("value",passwordTextField,"enabled");
      label = new qx.ui.basic.Label("Password");
      label.setBuddy(passwordTextField);
      authenticationPage.add( label,{ row: 2, column: 0});
      authenticationPage.add( passwordTextField, { row: 2, column: 1});
      
      /*
       * buttons
       */
      hbox = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) );
      this._sendButton = new qx.ui.form.Button("Send");
      this._sendButton.addListener("execute", this._onSendButtonExecute ,this );
      hbox.add( this._sendButton );
      this._cancelButton = new qx.ui.form.Button("Cancel")
      this._cancelButton.setEnabled(false);
      this._cancelButton.addListener("execute", function(){
        this.cancelRequest();
      }, this);
      hbox.add( this._cancelButton );
      this.add(hbox);
      
      /*
       * response 
       */
      this.add( new qx.ui.basic.Label("Response") );
      this._responseTextArea = new qx.ui.form.TextArea();
      this.add( this._responseTextArea, { flex : 1 } );
      this.bind("responseModel", this._responseTextArea, "value",{
        converter : function( data ) {
          return data ? qx.util.Serializer.toJson( data ) : "";
        }
      })
      
      
      /*
       * configure form controller and create model
       */      
      this.setRequestModel( this._formController.createModel(true) );
      this._formController.getModel().setUrl(serverUrl);
      
      /*
       * select first page
       */
      tabview.setSelection([servicePage]);
    },
   

    /*
    -------------------------------------------------------------------------
      EVENT HANDLERS
    -------------------------------------------------------------------------
    */      
    
    _onSendButtonExecute : function()
    {
      try
      {
        /*
         * create request data map
         */
        var json = qx.util.Serializer.toJson( this.getRequestModel() );
        
        // hack
        json = json.replace(/\[object Object\]/,qx.util.Json.stringify(this.getRequestModel().getServerData()));
        console.log(json);
        
        var requestData = qx.util.Json.parse( json );        
        
        /*
         * send
         */
        this.sendRequest( requestData );
      }
      catch(e)
      {
        this.warn(e);
      }
    },
    
    
    /*
    -------------------------------------------------------------------------
      API METHODS
    -------------------------------------------------------------------------
    */   
   
    /**
     * Returns the rpc object
     * @return {qx.io.remote.Rpc}
     */
    getRpc : function()
    {
      return this._rpc;
    },
    
    /**
     * Sends a request, either based on data supplied by the arguments or 
     * by the form. 
     * @param requestData {Map|null} Map of properties for the request. Each property will 
     *   overwrite any previously set value and update the corresponding form field. If
     *   you don't supply a value, the previous values will be used. 
     * @param callback {Function|undefined} Optional callback that is called with the 
     *   result of a successful request
     * @param context {Object|undefined} Optional context for the callback
     */
    sendRequest : function( requestData, callback, context )
    {
      
      /*
       * update request data
       */      
      if ( qx.lang.Type.isObject( requestData ) )
      {
        this.getRequestModel().set(requestData);
      }

      var requestModel = this.getRequestModel();
      
      if ( ! requestModel.getUrl() || 
           ! requestModel.getService() ||
           ! requestModel.getMethod() )
      {
        alert("Insufficient request data.");
        return; 
      }
      
      /*
       * rpc object
       */
      var rpc = this.getRpc();
      rpc.setUrl( requestModel.getUrl() );
      rpc.setServiceName( requestModel.getService() );
      
      /*
       * options
       */
      rpc.setCrossDomain( requestModel.getCrossDomain() );
      rpc.setServerData( requestModel.getServerData() );
      rpc.setTimeout( requestModel.getTimeout() * 1000 );
      
      /*
       * basic http authentication
       */
      rpc.setUseBasicHttpAuth( requestModel.getUseBasicHttpAuth() );
      if ( requestModel.getUseBasicHttpAuth() )
      {
        rpc.setUsername( requestModel.getUsername() || this.error("Missing username!") );
        rpc.setPassword( requestModel.getPassword() || this.error("Missing password!") );
      }
      
      /*
       * button status
       */
      this._sendButton.setEnabled(false);
      this._cancelButton.setEnabled(true);      
      
      /*
       * event if request fails
       */
      rpc.addListenerOnce("failed", function(e){
        this._sendButton.setEnabled(true);
        this._cancelButton.setEnabled(false);        
        alert( e.getData().toString() );
      },this);
      
      /*
       * event handler if request is successful
       */
      rpc.addListenerOnce("completed", function(e){
        
        var data = e.getData();
        
        // buttons
        this._sendButton.setEnabled(true);
        this._cancelButton.setEnabled(false);        
        
        // save response as model
        this.setResponseModel( qx.data.marshal.Json.createModel(data,true) );
        
        // callback
        if ( qx.lang.Type.isFunction( callback ) )
        {
          try
          {
            callback.call( context, data );  
          }
          catch(e)
          {
            this.warn(e);
          }
        }
        
      },this);
      
      /*
       * send rpc request
       */
      var args = [ true, requestModel.getMethod() ].concat( requestModel.getParams() );
      this._opaqueCallReference = rpc.callAsyncListeners.apply(rpc, args )
      
    }, 
    
    /**
     * Cancels the current request
     */
    cancelRequest : function()
    {
      this.rpc.abort( this._opaqueCallReference );

      /*
       * button status
       */
      this._sendButton.setEnabled(true);
      this._cancelButton.setEnabled(false);
      
    }
  }  
});
