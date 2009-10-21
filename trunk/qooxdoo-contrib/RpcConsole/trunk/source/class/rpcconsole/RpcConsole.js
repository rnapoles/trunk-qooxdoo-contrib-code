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
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * Constructor
   */
  construct : function( serverUrl ) 
  {
    this.base(arguments);
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
     * Server URL
     */
    var label = new qx.ui.basic.Label("Server URL:");
    page.add(label, {row: 0, column: 0});
    this._serverUrlTextfield = new qx.ui.form.TextField( serverUrl || "");
    page.add(this._serverUrlTextfield, {row: 0, column: 1});

    /*
     * Service name
     */
    label = new qx.ui.basic.Label("Service name:");
    page.add(label, {row: 1, column: 0});
    this._serviceTextfield = new qx.ui.form.TextField("");
    this._serviceTextfield.setPlaceholder("The service name, i.e. qooxdoo.test");
    page.add(this._serviceTextfield, {row: 1, column: 1});
    
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

    /*
     * options
     */
    hbox = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) );
    this._crossDomainCheckBox = new qx.ui.form.CheckBox( "Cross Domain" );
    this._crossDomainCheckBox.setEnabled(false); // not yet functional
    hbox.add( this._crossDomainCheckBox );
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
    
    /*
     * buttons
     */
    hbox = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) );
    this._sendButton = new qx.ui.form.Button("Send");
    this._sendButton.addListener("execute", function(){
      this.sendRequest(
        this._serverUrlTextfield.getValue(),
        this._serviceTextfield.getValue(),
        this._methodComboBox.getValue(),
        qx.util.Json.parse( "[" + this._paramsTextField.getValue() + "]"),
        {
          crossDomain : this._crossDomainCheckBox.getValue()
        },
        function( data ){
          this._responseTextArea.setValue( qx.util.Json.stringify( data ) );
        },this
      );
    }, this);
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
    
    /*
     * rpc object
     */
    this.rpc = new qx.io.remote.Rpc();
  },
  
  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    rpc : null,
    _serverUrlTextfield : null,
    _serviceTextfield : null,
    _methodComboBox : null,
    _responseTextArea : null,
    _crossDomainCheckBox : null,
    _paramsTextField : null,
    _sendButton : null,
    _cancelButton : null,
    _opaqueCallReference : null,
    
    _onIntrospectButtonExecute : function()
    {

    },
    
    
    /**
     * Sends a request, either based on data supplied by the arguments or 
     * by the form. 
     * @param url {String|undefined}
     * @param service {String|undefined}
     * @param method {String|undefined}
     * @param params {Array|undefined}
     * @param options {Map|undefined}
     * @param callback {Function|undefined}
     * @param context {Object|undefined}
     */
    sendRequest : function( url, service, method, params, options, callback, context )
    {
      /*
       * rpc object
       */
      var rpc = this.rpc;
      rpc.setUrl( url );
      rpc.setServiceName( service );
      
      /*
       * options
       */
      rpc.setCrossDomain( options.crossDomain );
      
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
      args = [ true, method ].concat(params);
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
