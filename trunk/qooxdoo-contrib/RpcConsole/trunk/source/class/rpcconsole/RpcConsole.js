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
     * A data model representing the request data. Has the following properties:
     * <pre>
     * url {String}
     * service {String}
     * method {String}
     * params {Array}
     * crossDomain {Boolean}
     * serverData {Map}
     * </pre>
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
    _serverUrlTextfield  : null,
    _serviceTextfield    : null,
    _methodComboBox      : null,
    _responseTextArea    : null,
    _crossDomainCheckBox : null,
    _paramsTextField     : null,
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
      var page = new qx.ui.tabview.Page("Service Info");
      tabview.add(page)
      var grid = new qx.ui.layout.Grid();
      grid.setSpacing(5);
      grid.setColumnAlign(0, "left", "middle"),
      grid.setColumnFlex(1,1);
      page.setLayout(grid);
      
      /*
       * form
       */
      this._form = new qx.ui.form.Form()
      this._formController = new qx.data.controller.Form( null, this._form );
      
      /*
       * Server URL
       */
      var label = new qx.ui.basic.Label("Server URL:");
      page.add(label, {row: 0, column: 0});
      this._serverUrlTextfield = new qx.ui.form.TextField();
      page.add(this._serverUrlTextfield, {row: 0, column: 1});
      this._form.add( this._serverUrlTextfield, null, null, "url" );
  
      /*
       * Service name
       */
      label = new qx.ui.basic.Label("Service name:");
      page.add(label, {row: 1, column: 0});
      this._serviceTextfield = new qx.ui.form.TextField("");
      this._serviceTextfield.setPlaceholder("The service name, i.e. qooxdoo.test");
      page.add(this._serviceTextfield, {row: 1, column: 1});
      this._form.add( this._serviceTextfield, null, null, "service" );
      
      /*
       * Service method
       */
      label = new qx.ui.basic.Label("Service method:");
      page.add(label, {row: 2, column: 0});
      var hbox = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) );
      this._methodComboBox = new qx.ui.form.ComboBox();
      this._methodComboBox.setPlaceholder("The service method, i.e. echo");
      hbox.add( this._methodComboBox, { flex : 1 } );
      var button = new qx.ui.form.Button("Introspect");
      button.setEnabled(false);
      button.addListener("execute", this._onIntrospectButtonExecute, this );
      hbox.add( button );
      page.add(hbox, {row: 2, column: 1});    
      this._form.add( this._methodComboBox, null, null, "method" );
  
      /*
       * options
       */
      hbox = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) );
      this._crossDomainCheckBox = new qx.ui.form.CheckBox( "Cross Domain" );
      this._crossDomainCheckBox.setEnabled(false); // not yet functional
      hbox.add( this._crossDomainCheckBox );
      this._form.add( this._crossDomainCheckBox, null, null, "crossDomain" );
      page.add( new qx.ui.basic.Label("Options:"), {row: 3, column: 0 });
      page.add(hbox, {row: 3, column: 1 });
      
      
      /*
       * service parameters
       */
      page.add( new qx.ui.basic.Label("Params:" ), {row: 4, column: 0} );
      this._paramsTextField = new qx.ui.form.TextArea().set({
        placeholder : "Please enter the method parameters, separated by comma and properly quoted, for example: \"Hello World!\"."
      });
      page.add( this._paramsTextField, { row: 4, column : 1} );
      this._form.add( this._paramsTextField, null, null, "params" );
      
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
      this._form.add( this._responseTextArea, null, null, "responseText" );
      
      /*
       * create model
       */
      this._formController.createModel(true);
      this._formController.getModel().setUrl(serverUrl);
      
    },    
    
    /*
    -------------------------------------------------------------------------
      EVENT HANDLERS
    -------------------------------------------------------------------------
    */     
    _onIntrospectButtonExecute : function()
    {

    },    
    
    _onSendButtonExecute : function()
    {
      /*
       * create request data map
       */
      var model = this._formController.getModel();
      var requestData = {
        url         : model.getUrl(),
        service     : model.getService(),
        method      : model.getMethod(),
        params      : qx.util.Json.parse( "[" + model.getParams() + "]"),
        crossDomain : model.getCrossDomain(),
        serverData  : null
      }
      
      /*
       * send
       */
      this.sendRequest( requestData, function( data ){
        this._formController.getModel().setResponseText( qx.util.Json.stringify( data ) );
      }, this);   
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
     * @param requestData {Map} Map of properties for the request.
     * @param callback {Function|undefined} Optional callback that is called with the 
     *   result of a successful request
     * @param context {Object|undefined} Optional context for the callback
     */
    sendRequest : function( requestData, callback, context )
    {
      if ( ! qx.lang.Type.isObject( requestData ) )
      {
        this.error("Invalid request data");
        return;
      }
      
      /*
       * rpc object
       */
      var rpc = this.getRpc();
      rpc.setUrl( requestData.url || this.error("Missing url") );
      rpc.setServiceName( requestData.service || this.error("Missing service name") );
      
      /*
       * options
       */
      rpc.setCrossDomain( requestData.crossDomain );
      rpc.setServerData( requestData.serverData );
      
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
        this._sendButton.setEnabled(true);
        this._cancelButton.setEnabled(false);                
        callback.call(context,e.getData());
      },this);
      
      /*
       * send rpc request
       */
      var args = [ 
        true, 
        requestData.method || this.error("Missing method name") 
      ].concat( requestData.params || this.error("Missing parameters." ) );
      
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
