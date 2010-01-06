/* ************************************************************************

   qooxdoo - DataManager Mixin

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Christian Boulanger

************************************************************************ */

/* ************************************************************************

#module(io.databinding)

************************************************************************ */

/**
 * Adds remotes databinding to a class. This mixin provides a number of
 * properties and methods to automagically bind a server datasource to widgets.
 * The aim is to free the user of having to write the transport handling code
 * herself. 

 * You can either bind a widget directly to a datasource or define a 
 * data provider (qx.io.databinding.DataProvider) which takes care of the data 
 * transport and provides several widgets with data or sends their data
 * to the server on demand, respectively.
 * 
 * The result sent from the server must be a hash map. If the key exists as a
 * widget property, this property will be updated directly. The result data
 * is also sent as a data event of name "dataReceived" so that event handlers
 * can use non-property key data from the hash map for whatever end.
 * 
 * NOTE: THIS CLASS IS DEPRECATED AND HAS MOVED TO A DIFFERENT NAMESPACE! 
 * USE THE qcl.databinding PACKAGE INSTEAD, AVAILABLE FROM
 * https://qooxdoo-contrib.svn.sourceforge.net/svnroot/qooxdoo-contrib/trunk/qooxdoo-contrib/qcl
 *  
 * @deprecated
 *
 */
qx.Mixin.define("qx.io.databinding.MDataManager",
{

  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /*
    ---------------------------------------------------------------------------
      PROPERTIES
    ---------------------------------------------------------------------------
    */

    /** switch to turn databinding on or off */
    dataBinding :
    {
      check : "Boolean",
      init: false
    },
    
    /** the external data manager, if set. */
    dataProvider :
    {
      check : "qx.io.databinding.DataProvider",
      apply : "_applyDataProvider" 
    },

    /** the name of the widget similar to the name of form elements
     * identifying it on the server and inside a bound data provider
     */
    bindName :
    {
      check : "String",
      init : ""
    },
    
    /** the method to be used for data transport */
    transport :
    {
      check : [ "get", "post", "jsonrpc" ],
      init : "jsonrpc"
    },

    /** 
     * jsonrpc/get/post: the remote uri of the datasource 
     * defaults to php backend
     * @todo set default path in qx:application attribute
     */ 
    serviceUrl :
    {
      check : "String",
      init : "../../backend/php/services/index.php"
    },

    /** jsonrpc: the service class name on the server */
    serviceName :
    {
      check : "String"
    },

    /** jsonrpc: the service name on the server to pull the local state from  */
    serviceMethodUpdateClient :
    {
      check : "String",
      init: "updateClient"
    },

    /** jsonrpc: the service name on the server receiving the local state  */
    serviceMethodUpdateServer :
    {
      check : "String",
      init : "updateServer"
    },

    /** timeout for request */
    timeout :
    {
      check : "Integer",
      init : 10000
    },

    /** if jsonrpc is used, whether cross-domain requests will be used  */
    allowCrossDomainRequests :
    {
      check : "Boolean",
      init : false
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
     * binds widget to a data provider
     * @return {void}
     */
    _applyDataProvider : function(newDataProvider,oldDataProvider)
    {
      if (oldDataProvider)
      {
        oldDataProvider.unbindWidget(this);
      }
      newDataProvider.bindWidget(this);
    },    
    
    /**
     * update server using jsonrpc
     */
    _updateServerJsonRpc : function (args)
    {
      // request objecgt
      var rpc = new qx.io.remote.Rpc();
      
      // service method and parameters
      if ( typeof args[0] == "string" && args[0].indexOf(".") > 0 )
      {
        var serviceName   = args[0].substr(0,args[0].lastIndexOf("."));
        var serviceMethod = args[0].substr(args[0].lastIndexOf(".")+1);
        var param1 = args[1] || null;
        var param2 = args[2] || null;
        var param3 = args[3] || null;
      }
      else
      {
        var serviceName   = this.getServiceName();
        var serviceMethod = this.getServiceMethodUpdateServer();
        var param1 = args[0] || null;
        var param2 = args[1] || null;
        var param3 = args[2] || null;
      }			      
      
      rpc.setServiceName( serviceName )
      rpc.setTimeout(this.getTimeout());
      rpc.setUrl(this.getServiceUrl());
      rpc.setCrossDomain(this.getAllowCrossDomainRequests());
      var _this = this;
      
      // start request
      var timestamp = new Date().getTime();
      qx.event.message.Bus.dispatch(new qx.event.message.Message("qcl.databinding.messages.rpc.start",timestamp));
      
      // get widget data
      var widgetData = this.__getWidgetData();
      
      // callback function
      var callbackFunc = function(result, ex, id)
      {
         // notify of end of request
        qx.event.message.Bus.dispatch(new qx.event.message.Message("qcl.databinding.messages.rpc.end",timestamp));		         
        request.reset();
        request.dispose();
        request = null; // dispose rpc object
        
        if (ex == null) {
          
          // server messages
          if( qx.event.message && typeof result.__messages == "object" )
          {
            for (var key in result.__messages)
            {
              qx.event.message.Bus.dispatch( new qx.event.message.Message( key, result.__messages[key] ) ); 
            }
            delete (result.__messages);
          }
          
          // notify about sent data
          _this.createDispatchDataEvent("dataSent",result);
          
        } else {
          // dispatch error message, todo
          qx.event.message.Bus.dispatch( 
           new qx.event.message.Message(
             "qcl.databinding.messages.rpc.error",
             "Async exception (#" + id + "): " + ex.message
            )
          );
        }
       };

      // send request 
      var request = rpc.callAsync(callbackFunc,serviceMethod,widgetData,param1,param2,param3);
      
      // pass request object to subscribers  
      qx.event.message.Bus.dispatch(new qx.event.message.Message("qcl.databinding.messages.rpc.object",request));      
    },
    
    
    /**
     * update server using a post request
     */
    _updateServerPost : function()
    {
      // create new request object
      var req = new qx.io.remote.Request(this.getServiceUrl(), qx.net.Http.METHOD_POST, qx.util.Mime.TEXT);
      req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      req.setCrossDomain(this.getAllowCrossDomainRequests());
      //req.setTimeout(this.getTimeout());
      
      // add form data
      var data = this.__getWidgetData();
    
      if ( !data || typeof data != "object" ) return false;
      
      for (var key in data)
      {
        if ( ! data[key] ) continue;
        if (data[key].selected) data[key] = data[key].selected;
        req.setFormField(key, data[key].value || data[key].text || data[key].checked ||  "" );
      }
      
      // event listeners
      _this=this;
      req.addEventListener("completed", function(e)
      {
        qx.event.message.Bus.dispatch(new qx.event.message.Message("qcl.databinding.messages.post.end",req));
        req = null;
        var result = e.getData().getContent();
        _this.createDispatchDataEvent("dataSent",result);
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
     * updates remote datasource, i.e. transports widget state to the server
     *
     * @type member
     * @return {void}
     */
    updateServer : function()
    {
        if ( ! this.getDataBinding() ) return false;
        
        switch (this.getTransport())
        {
          // use JSON-RPC
          case "jsonrpc":
            this._updateServerJsonRpc(arguments);
            break;
	         
	        // simple post, to do: file upload 
	        case "post":
	         this._updateServerPost(arguments);
   	      
   	      // unknown method  
	        default:
            this.error ("Method " + this.getTransport() + " not implemented");
            break;         
        }
    },
    
    /**
     * gets the data that should be sent to the server
     *
     * @type member
     * @return {Object}
     */    
    __getWidgetData : function()
    {
      return (this.classname == "qx.io.databinding.DataProvider") ? this.getBoundWidgetsData() : this.getWidgetData();
    },    

    /**
     * gets the widget data, i.e. all data relevant properties
     * which should be sent to the server.
     *
     * @type member
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
              data[prop] = this[getter]();  
            }
            else
            {
              this.warn(this.classname + " has no method " + getter + ". Please update qx.io.databinding.MDataManager._getWidgetDataProperties().");
            }
         } 
       }
       return data;
    },
    
    /**
     * gets the widget state properties
     * since there is no introspection method, we have to manually
     * do this for each individual widget (not very elegant).
     * returns a string list of properties separated by comma.
     * unfinished!
     * 
     * @type member
     * @return {String}
     */  
    _getWidgetDataProperties : function ()
    {
 
      switch ( this.classname )
      {
          case "qx.ui.form.CheckBox":
            return "checked";
          case "qx.ui.form.List":
            return "selected,children";
          case "qx.ui.form.ComboBox":
          case "qx.ui.form.ComboBoxEx":
            return "value,selected";          
        	case "qx.manager.selection.RadioManager":
          case "qx.ui.listview.ListView":
	        case "qx.ui.tree.Tree":
            return "selected";
	        case "qx.ui.form.PasswordField":
          case "qx.ui.form.TextField":
	        case "qx.ui.form.TextArea":
          case "qx.ui.form.ListItem":
          case "qx.ui.form.Spinner":
          case "qx.ui.form.RadioButton":
            return "value";
          case "qx.ui.basic.Label":
            return "text";
        	default:
        	 return null;
      }
    },    
    
    
    /**
     * update the client using jsonrpc
     */
    _updateClientJsonRpc : function(args)
    {
      var rpc = new qx.io.remote.Rpc();
      
      // service method and parameters
      if ( typeof args[0] == "string" && args[0].indexOf(".") > 0 )
      {
        var serviceName   = args[0].substr(0,args[0].lastIndexOf("."));
        var serviceMethod = args[0].substr(args[0].lastIndexOf(".")+1);        
        var param1 = args[1]|| null;
        var param2 = args[2]|| null;
        var param3 = args[3] || null;
      }
      else
      {
        var serviceName = this.getServiceName();
        var serviceMethod = this.getServiceMethodUpdateClient();
        var param1 = args[0] || null;
        var param2 = args[1] || null;
        var param3 = args[2] || null;
      }      
      
      rpc.setTimeout(this.getTimeout());
      rpc.setUrl(this.getServiceUrl());
      rpc.setServiceName(serviceName);
      rpc.setCrossDomain(this.getAllowCrossDomainRequests());
      var _this = this;
      
      // start request
      
      // notify of start of request
      var timestamp = new Date().getTime();
      qx.event.message.Bus.dispatch(new qx.event.message.Message("qcl.databinding.messages.rpc.start",timestamp));
      
      // callback function
      var callbackFunc = function(result, ex, id) {
        // notify of end of request
        qx.event.message.Bus.dispatch(new qx.event.message.Message("qcl.databinding.messages.rpc.end",timestamp));
        request.reset();
        request.dispose();
        request = null; // dispose rpc object
          
        if (ex == null) 
        {  
          // server messages
          if( qx.event.message && typeof result.__messages == "object" )
          {
            for (var key in result.__messages)
            {
              qx.event.message.Bus.dispatch( new qx.event.message.Message( key, result.__messages[key] ) ); 
            }
            delete (result.__messages);
           }
          
           // handle received data	              
           _this.__handleDataReceived (result);
           
           // notify that data has been received
           _this.createDispatchDataEvent("dataReceived",result);
           
         } else {
           // generic error handling; todo: delegate to event listeners
           // dispatch error message
           qx.event.message.Bus.dispatch( 
             new qx.event.message.Message(
               "qcl.databinding.messages.rpc.error",
               "Async exception (#" + id + "): " + ex.message
             )
           );
         }
       }
       
       // send request 
       var request = rpc.callAsync(callbackFunc,serviceMethod,param1,param2,param3);
        
       // pass request object to subscribers  
       qx.event.message.Bus.dispatch(new qx.event.message.Message("qcl.databinding.messages.rpc.object",request));       
    },


    /**
     * updates local widget, i.e. pulls widget state from the server
     *
     * @type member
     * @return {void}
     */
    updateClient : function()
    {
        if ( ! this.getDataBinding() ) return false;
        
        switch (this.getTransport())
        {         
          // use JSON-RPC
          case "jsonrpc":
            this._updateClientJsonRpc(arguments);
	           break;
	        
	        default:
            this.error ("Transport method " + this.getTransport() + " not implemented");
            break; 
        }
    },
    
    /**
     * handles the data sent from the server to update the local state
     *
     * @type member
     * @return {void}
     */    
    __handleDataReceived : function(result)
    {
      if ( this.classname == "qx.io.databinding.DataProvider" )
      {
        this.populateBoundWidgets(result);
      }
      else
      {
        this.setWidgetData(result);  
      }
    },
    
    /**
     * sets the widget state from the received data. Data must be a 
     * hash map. 
     * - When a property exists that corresponds to a key,
     *   this property will be set with the value. 
     * - If the key is "children", the data will be added as children
     * - in other cases, it will be saved as userdata.
     *
     * @param data {Object} hash map
     * @type member
     * @return {void}
     */  
    setWidgetData : function (data)
    {
      // simple setter using auto-lookup of property name
      if ( typeof data != "object" )
      {
        key = this._getWidgetDataProperties().split(",")[0]; // just use first one
        this.set(key,data);
        return;
      }
      
      // extended setter using a hash map
      for ( var key in data )
      {
        switch (key)
        {
          // set children
          case "children":
            var i, w, children = data[key];
            this.removeAll();
            for ( i=0; i<children.length;i++)
            {
              var props = children[i];
              // create new child widget Todo: ouch eval security problem!!!
              try 
              {
                w = eval ( "(new " + props.classname + ")" );
                delete props.classname;
                w.set(props);
                this.add(w);
              }
              catch (e)
              {
                this.error (e);
              }
            }
            break;
            
          // set selected item
          
          case "selected":
            if ( ! data[key] ) break;
            switch (this.classname)
            {
              case "qx.ui.form.ComboBox":
              case "qx.ui.form.ComboBoxEx":
                this.setSelected(this.getList().findValue(data[key]['value']));
                break;
              case "qx.manager.selection.RadioManager":
                var items = this.getItems();
                for (var i=0; i<items.length; i++)
                {
                  if ( items[i].getValue() == data[key]['value'] )
                  {
                    this.setSelected(items[i]);
                  }
                }
                break;               
            }
            break;
            
          case "treedatamodel":
            if (this.classname != "qx.ui.treevirtual.TreeVirtual")
            {
              this.error("Rpc datatype 'treedatamodel' only valid for qx.ui.treevirtual.TreeVirtual!");
              return false;
            }
            var dataModel = this.getDataModel();
            var data = data.treedatamodel;
						var pruneParent = true; // prune parent node once
            
            if ( data && typeof data == "object" && data.length )
            {
						  
              // prune parent of first node, this assumes that all nodes 
              // sent have the same parent.
              var parentNode = this.nodeGet(data[0].parentNodeId||0); 
              dataModel.prune(parentNode);  
              dataModel.setState(parentNode,{bOpened:true});
              
              for (var i=0; i<data.length;i++)
						  {
						    var node = data[i];
						    
								// check node for commands; MUST NEVER BE FIRST NODE SENT!
								if ( node.command )
								{
										switch(node.command)
										{
											case "render":
												dataModel.setData();
												break;		
										}
										continue;
								}
								
						    // create node
						    if( node.isBranch )
						    {
						      var nodeId = dataModel.addBranch( node.parentNodeId || 0 );
						    }
						    else
						    {
						      var nodeId = dataModel.addLeaf( node.parentNodeId || 0 );								      
						    }
						    
						    // set node state, including custom properties
						    delete node.parentNodeId;
								dataModel.setState( nodeId, node );
								
								// drag data alias
								if (this.setNodeType && node.data && node.data.type)
								{
									this.setNodeType( nodeId, node.data.type );
								}
 
						  }
						  // update tree
						  dataModel.setData();            
            }
            else
            {
              this.warn("Invalid rpc data!");
            }
            break;
            
          case "tabledatamodel":
            if (this.classname != "qx.ui.table.Table")
            {
              this.error("Rpc datatype 'tabledatamodel' only valid for qx.ui.table.Table!");
              return false;
            }          
            var dataModel = this.getTableModel();
            var data = data.tabledatamodel;
            
            // just replace the whole table, for dynamic loading use remoteTableModel
            if ( data && typeof data == "object" && data.length )
            {
						  dataModel.setData(data);            
            }
            else if ( data && typeof data == "object" )
            {
						  dataModel.setData([]);            
            }
            else
            {
              this.warn("Invalid rpc data!");
            }
            break;
						
					case "security":
						this.setSecurity(data.security);
						break;
						    
          
          default:
            try
            {
              this.set( key, data[key] );
            }          
            catch(e)
            {
              this.warn( e );
            }
        }
      }
    },

    /**
     * clears widget content
     *
     * @type member
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
    }
  }

});
