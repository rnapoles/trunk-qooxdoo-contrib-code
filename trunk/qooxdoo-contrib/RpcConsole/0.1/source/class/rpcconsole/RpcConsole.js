/* ************************************************************************

   Copyright:
     2009 Christian Boulanger
     
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Christian Boulanger (cboulanger)

************************************************************************ */

/* ************************************************************************

#asset(rpcconsole/*)
#require(qx.ui.form.ListItem)
#require(rpcconsole.MRpcMockup)

************************************************************************ */

/**
 * A GUI client for testing JSON-RPC Requests. This widget can be embedded
 * in your application.
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
    },
    
    /**
     * The model for the list controller managing the
     * entries in the combo box for the service name
     */
    serviceListModel : 
    {
      check : "qx.data.Array",
      nullable : true,
      apply : "_applyServiceListModel",
      event : "changeServiceListModel"
    },
    
    /**
     * The model for the list controller managing the
     * entries in the combo box for the method name
     */
    methodListModel : 
    {
      check : "qx.data.Array",
      nullable : true,
      apply : "_applyMethodListModel",
      event : "changeMethodListModel"
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
     * use patched rpc object
     */
    qx.Class.patch( qx.io.remote.Rpc, rpcconsole.MRpcMockup );
    this.__rpc = new qx.io.remote.Rpc();    
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
    __tabview               : null,
    __rpc                   : null,
    __form                  : null,
    __formController        : null,
    __serviceComboBox       : null,
    __serviceListController : null,
    __methodComboBox        : null,
    __methodListController  : null,
    __sendButton            : null,
    __cancelButton          : null,
    __opaqueCallReference   : null,    
    __responseTextArea      : null,
    __logTextArea           : null,
    __logPage               : null,
    __paramsCache           : null,
    __listenersAdded        : null,
    
    /**
     * Creates the UI
     */
    _createUI : function( serverUrl )
    {
      this.setLayout( new qx.ui.layout.VBox(10) );
      
      /*
       * variable initialization
       */
      this.__paramsCache = {};
      
      /*
       * tabview
       */
      var tabview = this.__tabview = new qx.ui.tabview.TabView();
      this.add(tabview);
      
      /*
       * main service info
       */
      var servicePage = new qx.ui.tabview.Page("Service Info");
      tabview.add(servicePage);
      var grid = new qx.ui.layout.Grid();
      grid.setSpacing(5);
      grid.setColumnAlign(0, "left", "middle"); 
      grid.setColumnFlex(1,1);
      servicePage.setLayout(grid);
      
      /*
       * form
       */
      this.__form = new qx.ui.form.Form()
      this.__formController = new qx.data.controller.Form( null, this.__form );
      
      /*
       * Server URL
       */
      var label = new qx.ui.basic.Label("Server URL:");
      servicePage.add(label, {row: 0, column: 0});
      var serverUrlTextfield = new qx.ui.form.TextField();
      servicePage.add( serverUrlTextfield, {row: 0, column: 1});
      this.__form.add( serverUrlTextfield, null, null, "url" );
       // function to automatically (un)check cross-domain
      var converterFunc = qx.lang.Function.bind( function( url ) 
      {
        if ( url && this.getRequestModel() )
        {
          var domain = window.location.protocol + "//" +
            window.location.hostname + ":" +
            window.location.port;
          this.getRequestModel().setCrossDomain(
           url.substr(0,domain.length) != domain 
           && url.substr(0,1) != "." 
          );
        }
        return url;
      }, this);     
      this.__formController.addBindingOptions("url", {
        converter : converterFunc
      }, {
        converter : converterFunc
      });
  
      /*
       * Service name
       */
      label = new qx.ui.basic.Label("Service name:");
      servicePage.add(label, {row: 1, column: 0});
      var serviceComboBox = this.__serviceComboBox = new qx.ui.form.ComboBox("");
      serviceComboBox.setPlaceholder("The service name, i.e. qooxdoo.test");
      servicePage.add( serviceComboBox, {row: 1, column: 1});
      this.__form.add( serviceComboBox, null, qx.util.Validate.regExp(/[a-zA-Z0-9\.]+/), "service" );
      // list controller to manage the combobox list
      this.__serviceListController = new qx.data.controller.List(new qx.data.Array(),serviceComboBox);
       // function to add the last used service name to the combobox list      
      var converterFunc = qx.lang.Function.bind( function( service ) 
      {
        if ( service )
        {
          var list = this.getServiceListController().getModel();
          if ( list.contains( service ) )
          {
            list.removeAt( list.indexOf( service ) )
          }
          list.unshift( service );
          if ( list.length > 10 )
          {
            list.pop();
          }
        }
        return service;
      }, this);     
      this.__formController.addBindingOptions("service", {
        converter : converterFunc
      }, {
        converter : converterFunc
      });
      
      /*
       * Service method
       */
      label = new qx.ui.basic.Label("Service method:");
      servicePage.add(label, {row: 2, column: 0});
      var hbox = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) );
      var methodComboBox = this.__methodComboBox = new qx.ui.form.ComboBox();
      methodComboBox.setPlaceholder("The service method, i.e. echo");
      hbox.add( methodComboBox, { flex : 1 } );
      servicePage.add(hbox, {row: 2, column: 1});    
      this.__form.add( methodComboBox, null, qx.util.Validate.regExp(/[a-zA-Z0-9]+/), "method" );
      // list controller to manage the combo box list
      this.__methodListController = new qx.data.controller.List(new qx.data.Array(),methodComboBox);
       // function to add the last used service name to the combobox list      
      var converterFunc = qx.lang.Function.bind( function( method ) 
      {
        if ( method )
        {
          var list = this.getMethodListController().getModel();
          if ( list.contains( method ) )
          {
            var index = list.indexOf( method );
            list.removeAt( index );
          }
          list.unshift( method );
          if ( list.length > 10 )
          {
            list.pop();
          }
        }
        return method;
      }, this);     
      this.__formController.addBindingOptions("method", {
        converter : converterFunc
      }, {
        converter : converterFunc
      });

         
      /*
       * Cross domain
       */
      hbox = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) );
      var crossDomainCheckBox = new qx.ui.form.CheckBox( "Cross Domain" );
      hbox.add( crossDomainCheckBox );
      this.__form.add( crossDomainCheckBox, null, null, "crossDomain" );
      
      /*
       * Timeout
       */
      hbox.add( new qx.ui.basic.Label("Timeout:") );
      var timeoutSpinner = new qx.ui.form.Spinner(10,10,60);
      timeoutSpinner.set({
        editable : true
      });
      hbox.add( timeoutSpinner );
      hbox.add( new qx.ui.basic.Label("sec.") );
      this.__form.add( timeoutSpinner, null, null, "timeout" );
      
      /*
       * Mockup generation
       */
      var mockupControl = new qx.ui.form.SelectBox();
      mockupControl.add( new qx.ui.form.ListItem("Off") );
      mockupControl.add( new qx.ui.form.ListItem("Monitor") );
      mockupControl.add( new qx.ui.form.ListItem("On") );
      mockupControl.addListener("changeSelection",function(e){
        var sel = e.getData();
        var label = sel[0].getLabel();
        this.__rpc.setMockupMode(label.toLowerCase() );
      },this);
      hbox.add( new qx.ui.basic.Label("Mockup:") );
      hbox.add(mockupControl);
      
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
      this.__form.add( paramsTextField, null, null, "params" );
      this.__formController.addBindingOptions("params", {
        converter : qx.lang.Function.bind( function( data ) {
          if ( qx.lang.Type.isArray( data ) && data.length )
          {
            var json = qx.util.Json.stringify(  data );
            return json.substring(1,json.length-1);
          }
          return null;
        }, this )
      }, {
        converter : qx.lang.Function.bind( function( data ) {
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
        }, this )
      });   
      
      /*
       * save the parameters for a given method and automagically 
       * fill out when a value is selected from the combobox drop-down.
       */
      // save parameters for a method
      paramsTextField.addListener("changeValue",function(e){
        var method = this.getRequestModel().getMethod();
        this.__paramsCache[method]=e.getData();
      },this);
      // fill params from cache when a method is selected from the dropdown
      methodComboBox.getChildrenContainer().addListener("changeSelection",function(e){
        var selection = e.getData();
        if ( selection.length )
        {
          var method = selection[0].getModel();
          paramsTextField.setValue( this.__paramsCache[method] || null );
        }
      },this);      
      
      /*
       * serverData tab
       */
      var serverDataPage = new qx.ui.tabview.Page( "Server Data" );
      serverDataPage.setLayout( new qx.ui.layout.Grow() );
      tabview.add( serverDataPage );
      var serverDataTextArea = new qx.ui.form.TextArea();
      serverDataTextArea.setPlaceholder("You can send arbitrary json data with your request here.")
      serverDataPage.add( serverDataTextArea );
      this.__form.add( serverDataTextArea , null, null, "serverData" );
      this.__formController.addBindingOptions("serverData", {
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
      grid.setColumnAlign(0, "left", "middle");
      grid.setColumnFlex(1,1);     
      authenticationPage.setLayout( grid );
      tabview.add( authenticationPage );
      
      /*
       * basic http auth
       */
      var authenticationCheckBox = new qx.ui.form.CheckBox("Use Basic Http Authentication");
      authenticationPage.add( authenticationCheckBox, { row: 0, column: 0, colSpan : 2 });
      this.__form.add( authenticationCheckBox , null, null, "useBasicHttpAuth" );
      
      var userNameTextField = new qx.ui.form.TextField();
      this.__form.add( userNameTextField , null, null, "username" );
      authenticationCheckBox.bind("value",userNameTextField,"enabled");
      var label = new qx.ui.basic.Label("User name");
      label.setBuddy(userNameTextField);
      authenticationPage.add( label,  { row: 1, column: 0} );
      authenticationPage.add( userNameTextField, { row: 1, column: 1});
      
      var passwordTextField = new qx.ui.form.PasswordField();
      this.__form.add( passwordTextField , null, null, "password" );    
      authenticationCheckBox.bind("value",passwordTextField,"enabled");
      label = new qx.ui.basic.Label("Password");
      label.setBuddy(passwordTextField);
      authenticationPage.add( label,{ row: 2, column: 0});
      authenticationPage.add( passwordTextField, { row: 2, column: 1});
      
      /*
       * buttons
       */
      hbox = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) );
      this.__sendButton = new qx.ui.form.Button("Send");
      this.__sendButton.addListener("execute", this._onSendButtonExecute ,this );
      hbox.add( this.__sendButton );
      this.__cancelButton = new qx.ui.form.Button("Cancel")
      this.__cancelButton.setEnabled(false);
      this.__cancelButton.addListener("execute", function(){
        this.cancelRequest();
      }, this);
      hbox.add( this.__cancelButton );
      var clearLogButton = new qx.ui.form.Button("Clear log");
      clearLogButton.addListener("execute",function(){
        this.__logTextArea.setValue("");
      },this);
      hbox.add( clearLogButton );
      this.add(hbox);
      
      /*
       * response 
       */
      this.add( new qx.ui.basic.Label("Response") );
      this.__responseTextArea = new qx.ui.form.TextArea();
      this.add( this.__responseTextArea, { flex : 1 } );
      this.bind("responseModel", this.__responseTextArea, "value",{
        converter : function( data ) {
          return data ? qx.util.Serializer.toJson( data ) : "";
        }
      });
      
      /*
       * log
       */
      var logPage = this.__logPage = new qx.ui.tabview.Page( "Log" );
      logPage.setLayout( new qx.ui.layout.Grow() );
      tabview.add( logPage );
      var logTextArea = this.__logTextArea = new qx.ui.form.TextArea();
      logPage.add( logTextArea );
      
      
      /*
       * configure form controller and create model
       */      
      this.setRequestModel( this.__formController.createModel(true) );
      this.__formController.getModel().setUrl(serverUrl);
      
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
      APPLY METHODS
    -------------------------------------------------------------------------
    */     
    
    /**
     * Applies a new value to the serviceListModel property
     * @param value {qx.data.Array|null}
     * @param old {qx.data.Array|null}
     */
    _applyServiceListModel : function( value, old )
    {
      this.getServiceListController().setModel( value );
    },
    
    /**
     * Applies a new value to the methodListModel property
     * @param value {qx.data.Array|null}
     * @param old {qx.data.Array|null}
     */
    _applyMethodListModel : function( value, old )
    {
      this.getMethodListController().setModel( value );
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
      return this.__rpc;
    },
    
    /**
     * Returns the controller that manages the list of entries
     * for the service name
     * @return {qx.data.controller.List}
     */
    getServiceListController : function()
    {
      return this.__serviceListController;
    },

    /**
     * Returns the controller that manages the list of entries
     * for the method name
     * @return {qx.data.controller.List}
     */
    getMethodListController : function()
    {
      return this.__methodListController;
    },
    
    
    /**
     * Returns text area containing the response data
     * @return {qx.ui.form.TextArea}
     */
    getResponseTextArea : function()
    {
      return this.__responseTextArea;
    }, 
    
    /**
     * Returns text area containing the response data
     * @return {qx.ui.form.TextArea}
     */
    getLogTextArea : function()
    {
      return this.__logTextArea;
    },     
    
    /**
     * Returns form widget
     * @return {qx.ui.form.Form}
     */
    getForm : function()
    {
      return this.__form;
    },

    /**
     * Returns form widget
     * @return {qx.ui.form.Form}
     */
    getFormController : function()
    {
      return this.__formController;
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
      this.__sendButton.setEnabled(false);
      this.__cancelButton.setEnabled(true);      
     
      /*
       * handler
       */
      var handler = qx.lang.Function.bind( function( result, error, id )
      {
        if ( error )
        {
          this.__sendButton.setEnabled(true);
          this.__cancelButton.setEnabled(false);
          if ( typeof error == "xml" )
          {
            this.handleError( "Unparseable XML response." ); 
          }
          else
          {
            // save response as model
            var response = {
              "id" : id,
              "result" : null,
              "error" : {
                "origin" : error.origin,
                "message" : error.message,
                "code" : error.code
              }
            }
            this.getResponseTextArea().setValue( qx.util.Json.stringify(response) );
            this.handleError( error.toString() );  
          }
          this.cancelRequest();
        }
        else
        {
          // buttons
          this.__sendButton.setEnabled(true);
          this.__cancelButton.setEnabled(false);        
          
          // save response as model
          var response = {
            "id" : id,
            "result" : result,
            "error" : null
          }
          this.setResponseModel( qx.data.marshal.Json.createModel(response,true) );
        
          // callback
          if ( qx.lang.Type.isFunction( callback ) )
          {
            try
            {
              callback.call( context, response );  
            }
            catch(e)
            {
              this.warn(e);
            }
          }
        }
      },this);

      /*
       * send rpc request
       */
      var args = [ handler, requestModel.getMethod() ].concat( requestModel.getParams() );
      this.__opaqueCallReference = rpc.callAsync.apply(rpc, args )
      
    },
    
    /**
     * Handles the error message. By default, log it. For more sophisticated
     * behavior, override this method.
     * @param error {String}
     * @return {void}
     */
    handleError : function( error )
    {
      this.log( "!!! " + error);  
    },
    
    /**
     * Cancels the current request
     */
    cancelRequest : function()
    {
      if ( this.rpc && this.__opaqueCallReference )
      {
        this.rpc.abort( this.__opaqueCallReference );
      }
      
      /*
       * button status
       */
      this.__sendButton.setEnabled(true);
      this.__cancelButton.setEnabled(false);
      
    },
    
    /**
     * Log to the logging text area and display log. 
     * @param text {String}
     */
    log : function( text )
    {
      this.__tabview.setSelection( [this.__logPage] );
      this.getLogTextArea().setValue( (this.getLogTextArea().getValue() || "") + text + "\n" );
      this.getLogTextArea().getContentElement().scrollToY(10000); 
    }
  }  
});
