/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2007-2008 Christian Boulanger

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Christian Boulanger (cboulanger)

************************************************************************ */

/* ************************************************************************
 
#module(qcl.databinding)

************************************************************************ */

/**
 * Adds remotes databinding to a class. This mixin provides a number of
 * properties and methods to automagically bind a server datasource to widgets.
 * The aim is to free the user of having to write the transport handling code
 * herself. 

 * You can either bind a widget directly to a datasource or define a 
 * data provider (qcl.databinding.simple.DataProvider) which takes care of the data 
 * transport and provides several widgets with data or sends their data
 * to the server on demand, respectively.
 * 
 * Most of the time, the only methods that will be called is updateClient() (to 
 * pull data from the server to update the client object) and updateServer() 
 * (to send client data to the server). if the last argument passed to the methods
 * is a function, this will be used as a callback function after the request
 * has returned without error.
 * 
 * The result sent from the server must be a hash map of the following structure.:
 * <pre>
 * {
 *   // result property should always be provided in order to allow events and messages to be transported
 *   result : 
 *   {
 *     result : { (... result data ...) },
 *     events : [ { type : "event1", data : ... }, { type : "event2", data: ... }, ... ],
 *     messages : [ { name : "appname.messages.foo", data : ... }, { name : "appname.messages.bar", data: ... }, ... ]
 *   }
 *   // error property only exists if an error occurred 
 *   error : 
 *   {
 *     (... error data ...)
 *   }
 *   id : (int id of rpc request)
 * }
 * </pre>
 * 
 * The "events" and "messages" array elements will be dispatched as events on the
 * sending/receiving object or as public messages. 
 * 
 * The "result" object returned from a "updateClient" call must be a hashmap. 
 * If a key in this hashmap exists as a
 * widget property, this property will be updated directly. The result data
 * is also sent as a data event of name "dataReceived" so that event handlers
 * can use non-property key data from the hash map for whatever end.
 * 
 * A tutorial will be written soon.
 *
 */
qx.Mixin.define("qcl.databinding.simple.MDataManager",
{

  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /** 
     * switch to turn databinding on or off 
     */
    dataBinding :
    {
      check : "Boolean",
      init: false
    },

    /**  
     * which direction should the update go to the server only (ignore updateClient), 
     * to the client only (ignore updateServer), or both ways
     */
    updateTarget :
    {
      check : ["server","client","both"],
      init: "both"
    },
    
    /**  
     * the external data manager, if set. 
     */
    dataProvider :
    {
      check : "qcl.databinding.simple.DataProvider",
      apply : "_applyDataProvider" 
    },

    /**  
     * the name of the widget similar to the name of form elements
     * identifying it on the server and inside a bound data provider
     */
    bindName :
    {
      check : "String",
      init : ""
    },
    
   /**  
    * The property that is bound to the result of the remote service
    */
   boundProperty :
   {
     check : "String",
     init : ""
   },    
    
    /**  
     * the method to be used for data transport 
     */
    transport :
    {
      check : [ "get", "post", "jsonrpc" ],
      init : "jsonrpc"
    },

    /**  
     * The remote uri of the datasource 
     * defaults to php backend
     * @todo set default path in qx:application attribute
     */ 
    serviceUrl :
    {
      check : "String",
      init : "../../backend/php/services/index.php"
    },

    /** 
     * The service class name on the server 
     */
    serviceName :
    {
      check : "String"
    },

    /**  
     * The service name on the server to pull the local state from  
     */
    serviceMethodUpdateClient :
    {
      check : "String",
      init: "updateClient"
    },

    /** 
     * The service name on the server receiving the local state  
     */
    serviceMethodUpdateServer :
    {
      check : "String",
      init : "updateServer"
    },

    /**  
     * Timeout for request 
     */
    timeout :
    {
      check : "Integer",
      init : 30000
    },

    /**  
     * If jsonrpc is used, whether cross-domain requests will be used  
     */
    allowCrossDomainRequests :
    {
      check : "Boolean",
      init : false
    },
    
    /** 
     * Generic setter for options  
     */
    itemSelected :
    {
      check : "Boolean",
      init : false,
      apply : "_applyItemSelected"
    },
    
    /**
     * Contains the currently ongoing request, if any
     * This will only contain the last request dispatched.
     */
    currentRequest :
    {
      check : "qx.io.remote.Rpc",
      event : "changeCurrentRequest",
      nullable : true,
      init : null
    }
  },

  
  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * Binds widget to a data provider
     * @return {void}
     */
    _applyDataProvider : function( newDataProvider )
    {
       //console.log(this + " bound to " + newDataProvider + " as " + this.getBindName() );
       newDataProvider.bindWidget( this );
      
    },    

    /**
     * Generic getter for options that can be selected
     * retrieves selection manager and selects the widget
     */
    _applyItemSelected : function()
    {
      /*  
       * item might have not yet be attached to parent, set with timeout
       */
      qx.client.Timer.once( function(){
        var parent = this;
        while (parent)
        {
          switch (parent.classname)
          {
            case "qx.ui.form.List":
              return parent.getManager().setSelectedItem(this);
            case "qx.manager.selection.RadioManager":
              return parent.setSelected(this);
          }
          var parent = parent.getParent();         
        }
        this.error("Did not find appropriate parent widget.");
      },this,500);
    },
    
    
    /** 
     * Public API function to update the widget from the server.
     * Can have a variable number of arguments
     * overriding classes can pass the arguments on like so:
     * this._updateClient.apply(this,arguments)
     * 
     * @return {void}
     */
    updateClient : function()
    {
      this._updateClient.apply(this,arguments);
    },

    /** 
     * public API function to execute a method on the server.
     * Can have a variable number of arguments.
     * Actually exactly the same function as updateClient, but 
     * doesn't expect any data response and added for the purpose
     * of clearer code.
     * 
     * @return {void}
     */
    executeService : function()
    {
      this._updateClient.apply(this,arguments);
    },

    /**
     * private function doing the actual work of updating the widget
     * from the server
     *
     * 
     * @return {void}
     */
    _updateClient : function()
    {

      /*
       * abort if databinding is turned off
       */
      if ( ! this.getDataBinding() ) return false;
      
      /*
       * abort if updates should only be made to the server
       */        
      if ( this.getUpdateTarget() == "server" ) return false;
      
      /*
       * turn arguments into a real array object 
       */
      for (var i=0, args=[]; i < arguments.length; i++) args.push(arguments[i]);
      
      /*
       * choose transport mechanism
       */
      switch (this.getTransport())
      {         
        // use JSON-RPC
        case "jsonrpc":
          this._updateClientJsonRpc(args);
           break;
        
        default:
          this.error ("Transport method " + this.getTransport() + " not implemented");
          break; 
      }
    },
    
    /**
     * the data returned by the server
     */
    __responseData : null,

    /**
     * update the client using jsonrpc
     * @access private
     */
    _updateClientJsonRpc : function(args)
    {
     
      /*
       * assemble service method and parameters
       */
      if ( typeof args[0] == "string" && args[0].indexOf(".") > 0 )
      {
        var serviceName    = args[0].substr(0,args[0].lastIndexOf("."));
        var serviceMethod  = args[0].substr(args[0].lastIndexOf(".")+1);      
        var params         = args.slice(1);
      }
      else
      {
        var serviceName    = this.getServiceName();
        var serviceMethod  = this.getServiceMethodUpdateClient();
        var params         = args;
      }      
      
      /*
       * check wether the last argument is a function as use
       * this as the final callback function
       */
      var finalCallbackFunc = ( typeof params[ params.length-1] == "function" ) ? params.pop() : null;
      
      /*
       * configure new request object
       */
      var rpc = new qx.io.remote.Rpc();
      this.setCurrentRequest(rpc);
      rpc.setTimeout(this.getTimeout());
      rpc.setUrl(this.getServiceUrl());
      rpc.setServiceName(serviceName);
      rpc.setCrossDomain(this.getAllowCrossDomainRequests());
      
      /*
       * application state is sent as server data
       */
      var app = qx.core.Init.getInstance().getApplication();
      rpc.setServerData( app.getStates() );  
      
      /*
       * tag the current object instance for closures
       */
      var _this = this;
      
      /* 
       * notify of start of request
       */
      var timestamp = new Date().getTime();
      var msg = new qx.event.message.Message("qcl.databinding.messages.rpc.start",timestamp);
      msg.setSender(this);
      qx.event.message.Bus.dispatch(msg);
            
      /*
       * create callback function
       */
      var callbackFunc = function(data, ex, id) 
      {

        /*
         * save data
         */
        _this.__responseData = data;
      
        
        /* 
         * notify of end of request
         */
        var m = new qx.event.message.Message("qcl.databinding.messages.rpc.end", timestamp );
        m.setSender( _this );
        qx.event.message.Bus.dispatch( m );

        /*
         * dispose request @todo: recycle object
         */
        rpc.dispose();
        _this.setCurrentRequest(null);
        delete rpc;

        /*
         *  handle messages and events
         */
        if ( data && ( data.messages || data.events ) ) 
        {
          _this.__handleEventsAndMessages( _this, data );
        }        
        
        /*
         * check for error
         */
        if ( ex == null ) 
        {  
           
           /*
            * handle received data  
            */              
           if ( data.result )
           {
             _this.__handleDataReceived ( data.result );
           }
                    
           /*
            * notify that data has been received
            */
           _this.createDispatchDataEvent("dataReceived", data.result);
           
         } 
         else 
         {
           /*
            * dispatch error message
            */
           qx.event.message.Bus.dispatch( 
               "qcl.databinding.messages.rpc.error",
               ex.message
           );
           _this.warn ( "Async exception (#" + id + "): " + ex.message );

           /* 
            * notify that data has been received but failed
            */
           _this.createDispatchDataEvent("dataReceived",null);
         }

        /*
         * call final callback function if defined
         */
        if ( finalCallbackFunc )
        {
          finalCallbackFunc(data, ex, id);
        }  
  
      };
       
       /*
        * send request 
        */
       params.unshift( serviceMethod );
       params.unshift( callbackFunc );
       var request = rpc.callAsync.apply( rpc, params );
        
       /*
        * pass request object to subscribers and event listeners
        */  
       qx.event.message.Bus.dispatch( "qcl.databinding.messages.rpc.object", request );
       this.createDispatchDataEvent( "requestSent", request ); 
    },

    /**
     * returns the data that was received from the server
     */
    getResponseData : function()
    {
      return this.__responseData;
    },

    /**
     * handles events and messages received with server response
     */
    __handleEventsAndMessages : function ( obj, data )
    {
      /*
       * server messages
       */
      if( data.messages && data.messages instanceof Array )
      {
        data.messages.forEach( function(message){
          qx.event.message.Bus.dispatch( message.name, message.data ); 
        });
      }

      // server events
      if( data.events && data.events instanceof Array )
      {
        data.events.forEach( function(event)
        {
          obj.createDispatchDataEvent( event.type, event.data ); 
        });
      }       
    },

    /** 
     * handles the data sent from the server to update the local state
     *
     */    
    __handleDataReceived : function(result)
    {
      /* 
       * choose method according to class 
       * @todo: this is not very elegant
       */
      if ( this.classname == "qcl.databinding.simple.DataProvider" )
      {
        this.populateBoundWidgets(result);
      }
      else
      {
        this.setWidgetData(result);  
      }
      
      /*
       * dispatch message that widget has been updated
       */
      this.createDispatchDataEvent("updated",result);      
    },
    
    /** 
     * Sets the widget state from the received data. Data must be a 
     * hash map. 
     * - When the data is a scalar value, update the bound widget property
     *   with it
     * - If the data is a map and a property exists that corresponds to a key,
     *   this property will be set with the value. 
     * - If the key is "children", the data will be added as children
     *
     * @param data {String|Int|Map} hash map
     * @return {void}
     */  
    setWidgetData : function (data)
    {

      /* 
       * simple setter using auto-lookup of property name
       */
      if ( typeof data != "object" )
      {
        key = this._getWidgetDataProperties();
        
        /*
         * special case: combobox: this will select the listItem that has 
         * the corresponding value if editable or set the textfield value if 
         * editable
         */
        if ( key == "combobox" )
        {
            if ( this.getEditable() )
            {
              this.setValue( data );
            } 
            else
            {
              this.setSelected( this.getList().findValue(data) );
            }
        }
        else
        {
          //console.log(this + " setting " + key + " to '" + data + "'" );
          this.set( key, data );
        }
      }
      
      /*
       * extended setter using a hash map
       */
      for ( var key in data )
      {
        switch (key)
        {
          /* 
           * add arbitrary children to widgets, including event listeners 
           */
          case "children":
          
            var i, w, children = data[key];
            
            /*
             * remove children first
             */
            this.removeAll();
            
            /*
             * now add new children
             */
            for ( i=0; i<children.length;i++)
            {
              
              var props = children[i];
              
              /*
               * create new child widget 
               * @todo: eval security problem!!!
               */
              try 
              {
                /*
                 * classname
                 */
                w = eval ( "(new " + props.classname + ")" );
                delete props.classname;
                
                /*
                 *  event listeners
                 */
                if ( typeof props.events == "object" )
                {
                  for ( var type in props.events )
                  { 
                    eval('var f= function(event){'+props.events[type]+'};');
                    
                    /*
                     * attach to widget parent
                     */
                    if ( type.substr(0,7) == "parent." )
                    {
                      try
                      {
                        var t = type.substr(7);
                        if ( ! this.__eventsAttached )
                        {
                          this.__eventsAttached = [];
                        }
                        if ( ! this.__eventsAttached[t] )
                        {
                          this.addEventListener(t,f,this);
                          this.__eventsAttached[t] =true;  
                        }                
                      }
                      catch (e)
                      {
                        console.warn(e);
                      }
                    }
                    
                    /*
                     * attach to widget
                     */
                    else
                    {
                      try
                      {
                        w.addEventListener(type,f,w);  
                      }  
                      catch (e)
                      {
                        console.warn(e);
                      }
                    }
                  }
                  delete props.events;
                }

                /*
                 * set properties
                 */
                w.set(props);
                
                /*
                 * listItems and menu items have to be fitted into container
                 */
                if ( w instanceof qx.ui.form.ListItem  ) 
                {
                  w.setMaxWidth(qx.bom.element.Dimension.getWidth(this.getElement())-5);
                }

                /*
                 * all others are added to widget
                 */
                this.add(w);
             
              }
              catch (e)
              {
                this.warn(e);
              }
            }
            break;
            
          /*
           * menus are added to document and connected to widget
           */          
          case "menu":
            if ( this.getMenu() )
            {
              var w = this.getMenu();
              w.removeAll();
            }  
            else
            {
              var w = new qx.ui.menu.Menu;
              w.addToDocument();
              this.setMenu(w);  
            }
            w.setWidgetData({'children':data.menu});
            
            break;    
            
          /*
           * set selected item on combo box or selection manager
           */
          case "selected":
            if ( ! data[key] ) break;
            switch (this.classname)
            {
              case "qx.ui.form.ComboBox":
              case "qx.ui.form.ComboBoxEx":
                var item = this.getList().findValue(data[key]);
                if (item) this.setSelected(item);
                break;
              
              case "qx.ui.form.List":
                var item = this.findValue(data[key]);
                if (item) this.getManager().setItemSelected(item,true);
                break;
                
              case "qx.manager.selection.RadioManager":
                var items = this.getItems();
                for (var i=0; i<items.length; i++)
                {
                  if ( items[i].getValue() == data[key] )
                  {
                    this.setSelected(items[i]);
                  }
                }
                break;               
            }
            break;
          
          /* 
           * qx.ui.treeVirtual.SimpleTreeDataModel
           */
          case "treedatamodel":
            if (! this instanceof qx.ui.treevirtual.TreeVirtual )
            {
              this.error("Rpc datatype 'treedatamodel' only valid for qx.ui.treevirtual.TreeVirtual!");
              return false;
            }
            this.handleServerData(data.treedatamodel);
            break;
          
          /* 
           * qx.ui.table.model.Simple 
           */
          case "tabledatamodel":
            if ( ! this instanceof qx.ui.table.Table )
            {
              this.error("Rpc datatype 'tabledatamodel' only valid for qx.ui.table.Table and subclasses!");
              return false;
            }          
            var dataModel = this.getTableModel();
            var data = data.tabledatamodel;
            
            /*
             * just replace the whole table, for dynamic loading use remoteTableModel
             */
            if ( data && data instanceof Array && data.length )
            {
              dataModel.setData(data);            
            }
            else if ( data && data instanceof Array )
            {
              dataModel.setData([]);            
            }
            else
            {
              this.warn("Invalid rpc data!");
            }
            break;
          
          /* 
           * qcl.auth 
           */
          case "security":
            this.setSecurity(data.security);
            break;
          
          /* 
           * qcl.config 
           */
          case "configMap":
            this.setConfigMap(data.configMap);
            break;  
           
          /* 
           * enabled, set with timeout to not conflict with form enabling / disabling 
           */
          case "enabled":
            var _this = this;
            qx.client.Timer.once(function(){
              _this.setEnabled(data.enabled);
            },50);
            break;
         
          /* 
           * default: set property 
           */    
          default:
            var setter = "set" + key.charAt(0).toUpperCase() + key.substr(1);
            if (typeof this[setter] == "function" )
            { 
              this[setter](data[key]);  
            }
            else
            {
              this.warn( "Cannot set property" + key + ": " + this + " has no method " + setter + "()" );
            }
        }
      }
    },


    /**
     * public API function to update the server with widget data.
     * Can have a variable number of arguments which will be passed onto
     * the receiving server method after the first argument which is always
     * the widget data
     * overriding classes can pass the arguments on like so:
     * this._updateServer.apply(this,arguments)
     * 
     * 
     * @return {void}
     */
    updateServer : function()
    {
      this._updateServer.apply(this,arguments);
    },
    
    /**
     * private function doing the actual work of updating the server.
     * Can have a variable number of arguments which will be passed onto
     * the receiving server method after the first argument which is always
     * the widget data.
     *
     * 
     * @return {void}
     */
    _updateServer : function()
    {
        if ( ! this.getDataBinding() ) return false;
        if ( this.getUpdateTarget() == "client" ) return false;
        
        for (var i=0, args=[]; i < arguments.length; i++) args.push(arguments[i]);
        
        switch (this.getTransport())
        {
          // use JSON-RPC
          case "jsonrpc":
            this._updateServerJsonRpc(args);
            break;
           
          // simple post, to do: file upload 
          case "post":
           this._updateServerPost(args);
          
          // unknown method  
          default:
            this.error ("Method " + this.getTransport() + " not implemented");
            break;         
        }
    },
    
    /**
     * update server using jsonrpc
     */
    _updateServerJsonRpc : function (args)
    {      
   
      /*
       * assemble service method and parameters
       */
      if ( typeof args[0] == "string" && args[0].indexOf(".") > 0 )
      {
        var serviceName   = args[0].substr(0,args[0].lastIndexOf("."));
        var serviceMethod = args[0].substr(args[0].lastIndexOf(".")+1);
        var params = args.slice(1);
      }
      else
      {
        var serviceName   = this.getServiceName();
        var serviceMethod = this.getServiceMethodUpdateServer();
        var params = args;
      }    
      
      /*
       * check wether the last argument is a function as use
       * this as the final callback function
       */
      var finalCallbackFunc = ( typeof params[ params.length-1] == "function" ) ? params.pop() : null;             

      /*
       * configure request object
       */
      var rpc = new qx.io.remote.Rpc();  
      this.setCurrentRequest(rpc);
      rpc.setServiceName( serviceName );
      rpc.setTimeout( this.getTimeout() );
      rpc.setUrl( this.getServiceUrl() );
      rpc.setCrossDomain(this.getAllowCrossDomainRequests());

      /*
       * application state is sent as server data
       */
      var app = qx.core.Init.getInstance().getApplication();
      rpc.setServerData( app.getStates() );  
      
      /*
       * reference present object instance for closures
       */
      var _this = this;
      
      /* 
       * notify of start of request
       */
      var timestamp = new Date().getTime();
      var msg = new qx.event.message.Message("qcl.databinding.messages.rpc.start",timestamp);
      msg.setSender(this);
      qx.event.message.Bus.dispatch(msg);
      
      /*
       * get widget data
       */
      var widgetData = this.__getWidgetData();
      
      /*
       * callback function
       */
      var callbackFunc = function(data, ex, id)
      {
        /*
         * save data
         */
        _this.__responseData = data;
        
        /* 
         * notify of end of request
         */
        var m = new qx.event.message.Message("qcl.databinding.messages.rpc.end",timestamp);
        m.setSender(_this);
        qx.event.message.Bus.dispatch( m );
        
        /*
         * dispose request @todo: recycle
         */            
        rpc.dispose();
        _this.setCurrentRequest(null);
        delete rpc; 
        
        /*
         *  handle messages and events
         */
        if ( data && ( data.messages || data.events ) ) 
        {
          _this.__handleEventsAndMessages( _this, data );
        }              
        
        if (ex == null) 
        {          
          /*
           * notify about sent data only if sending was successful
           */
          _this.createDispatchDataEvent("dataSent",data.result);
          
        } 
        else 
        {
          /*
           * dispatch error message
           */
          qx.event.message.Bus.dispatch( 
             "qcl.databinding.messages.rpc.error",
             ex.message
          );
          _this.warn ( "Async exception (#" + id + "): " + ex.message );
        }
        
        /*
         * call final callback function if defined
         */
        if ( finalCallbackFunc )
        {
          finalCallbackFunc(data, ex, id);
        }  
                
      };

      /* 
       * send request
       */ 
      params.unshift(widgetData);
      params.unshift(serviceMethod);
      params.unshift(callbackFunc);
      var request = rpc.callAsync.apply(rpc,params);
      
      /*
       * pass request object to message subscribers and event listeners
       */
      qx.event.message.Bus.dispatch("qcl.databinding.messages.rpc.object",request); 
      this.createDispatchDataEvent("requestSent",request);     
    },
    
    
    /**
     * update server using a post request
     */
    _updateServerPost : function(finalCallbackFunc)
    {
      // create new request object
      var req = new qx.io.remote.Request(this.getServiceUrl(), qx.net.Http.METHOD_POST, qx.util.Mime.TEXT);
      req.setRequestHeader( "Content-Type", "application/x-www-form-urlencoded" );
      req.setCrossDomain( this.getAllowCrossDomainRequests() );
      //req.setTimeout(this.getTimeout());
      
      // add form data
      var data = this.__getWidgetData();
    
      if ( !data || typeof data != "object" ) return false;
      
      for (var key in data)
      {
        if ( ! data[key] ) 
        {
          continue;
        }
        if ( data[key].selected ) 
        {
          data[key] = data[key].selected;
        }
        req.setFormField( key, data[key].value || data[key].text || data[key].checked ||  "" );
      }
      
      // event listeners
      _this=this;
      req.addEventListener("completed", function(e)
      {
        qx.event.message.Bus.dispatch(new qx.event.message.Message("qcl.databinding.messages.post.end",req));
        req = null;
        var result = e.getData().getContent();
        _this.createDispatchDataEvent("dataSent",result);
        
        /*
         * call final callback function if defined
         */
        if ( finalCallbackFunc )
        {
          finalCallbackFunc(data, ex, id);
        }          
      });
      
      var failureFunc = function(e){
        qx.event.message.Bus.dispatch(new qx.event.message.Message("qcl.databinding.messages.post.abort",req));
        req=null;
        this.warn (e.getData().getStatusCode().toString());
      }

      req.addEventListener("failed", failureFunc);
      req.addEventListener("timeout", failureFunc);
      req.addEventListener("aborted", failureFunc);
      
      qx.event.message.Bus.dispatch(new qx.event.message.Message("qcl.databinding.messages.post.start",req));
      req.send();        
    },

    /**
     * gets the data that should be sent to the server
     *
     * 
     * @return {Object}
     */    
    __getWidgetData : function()
    {
      return (this.classname == "qcl.databinding.simple.DataProvider") ? this.getBoundWidgetsData() : this.getWidgetData();
    },    

    /**
     * gets the widget data, i.e. all data relevant properties
     * which should be sent to the server.
     *
     * 
     * @return {Object}
     */  
    getWidgetData : function ()
    {
      var stateProps = this._getWidgetDataProperties();
      if (!stateProps) return null;
      stateProps = stateProps.split(",");
      var data = {};
      for ( var i=0; i<stateProps.length; i++ )
      {
        var prop = stateProps[i];
        switch (prop)
        {
          // skip widget
          case null:
            this.warn(this.classname + " has no data properties. Skipping.");
            break;
          
          // get data of widget chidren
          case "children":
            data[prop]=[];
            this.forEachChild(function(){
              data[prop].push(this.getWidgetData());
            });
            break;

          // get data from user data "content"
          case "userData":
            data[prop]= this.getUserData("content");
            break;
            
          // get combobox value / selected item value
          case "combobox":
            if (this.getEditable()) 
            {
              data = this.getValue();
            }
            else 
            {
              var sel = this.getManager().getSelectedItem();
              if (sel) 
              {
                data = sel.getValue();
              }
              else 
              {
                data = null;
              }
            }
            break;
          
          // get data from selection
          case "selected":
            var sel = this.getSelected();
            data[prop]= sel ? sel.getWidgetData() : null;
            break;
            
          // selected items
          case "selectedItems":
            var sel = this.getSelectedItems();
            if (typeof sel != "object" ) break;
            data[prop]=[];
            for (var i=0; i<sel.length; i++ )
            {
              data[prop].push(sel[i].getWidgetData());
            }
            break;

          // selected items
          case "tabledatamodel":
            var sel = this.getSelectedItems();
            if (typeof sel != "object" ) break;
            data[prop]=[];
            for (var i=0; i<sel.length; i++ )
            {
              data[prop].push(sel[i].getWidgetData());
            }
            break;
          
          // get property value directly  
          default:
            var getter = "get" + prop.charAt(0).toUpperCase() + prop.substr(1);
            if (typeof this[getter] == "function" )
            { 
              if (stateProps.length > 1)
              {
                data[prop] = this[getter]();  
              }
              else
              {
                data = this[getter]();
              }
            }
            else
            {
              this.warn(this.classname + " has no method " + getter + ". Please update qcl.databinding.simple.MDataManager._getWidgetDataProperties().");
            }
         } 
       }
       return data;
    },
    
    /** 
     * Returns the properties of the widget that hold the state of the widget.
     * This is either the "boundProperty" or, if this is not set, a default
     * value determined from the class name. 
     * @return {String}
     */  
    _getWidgetDataProperties : function ()
    {
      if ( this.getBoundProperty() )
      {
        return this.getBoundProperty();
      }
      switch ( this.classname )
      {
          case "qx.ui.form.CheckBox":
            return "checked";
          case "qx.ui.form.List":
            return "selected";
          case "qx.manager.selection.RadioManager":
          case "qx.ui.listview.ListView":
          case "qx.ui.tree.Tree":
            return "selected";
          case "qx.ui.form.ComboBox":
            return "combobox";
          case "qx.ui.basic.Label":
            return "text";
          case "qx.ui.embed.HtmlEmbed":
            return "html";
          case "qx.ui.embed.Iframe":
            return "userData"; // remove this
          default:
            return "value";
      }
    },    
    

    /** 
     * Clears widget content 
     * @return {void}
     */
    clearWidget : function()
    {
      var stateProps = this._getWidgetDataProperties();
      if (!stateProps) return null;
      stateProps = stateProps.split(",");
      var data = {};
      for ( var i=0; i<stateProps.length; i++ )
      {
        var prop = stateProps[i];
        switch (prop)
        {
          // skip widget
          case null:
            break;
          
          // remove chidren
          case "children":
            this.removeAll();
            break;
          
          // remove selection
          case "selected":
            this.setSelected(null);
            break;
            
          // selected items
          case "selectedItems":
            break;

          // remove checked
          case "checked":
            this.setChecked(false);
            break;
            
          // set property value directly  
          default:
            var setter = "set" + prop.charAt(0).toUpperCase() + prop.substr(1);
            if (typeof this[setter] == "function" )
            { 
              data[prop] = this[setter]("");  
            }
         } 
       }
      return;
    },
    
    /**
     * enables widget
     */
    enable : function()
    {
      this.setEnabled(true);
    },
    
    /**
     * disables widget
     */
    disable : function()
    {
      this.setEnabled(false);
    }
    
  }

});
