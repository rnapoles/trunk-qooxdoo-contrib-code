/**
 * qooxdoo class containing all extracted handler code as methods.
 **/
qx.Class.define('qcl.ApplicationEventHandlers',
{
  extend : qx.application.Gui,

  members :
  {
    /**
     * Message handler for authorization-widget-left.xml, line 134
     * Massage name 'qcl.auth.messages.reload'
     * @param message {qx.event.message.Message} Message object
     * @param target {qx.core.Target} Message receiver object 
     * @return void
     */
    authorization_widget_left_00_on_qcl_auth_messages_reload : function(message,target)
    {
    
      // set service method
      target.setServiceName(target.getApplication().getUserData("serviceName"));
    
      // (re)load tree
      target.getDataModel().clearData(); target.updateClient();
    
    },
    
    /**
     * Event handler for authorization-widget-left.xml, line 136
     * Event type 'focus'
     * @param event {qx.event.type.Event} Event object
     * @param target {qx.core.Target} Event target object
     * @return void
     */
    authorization_widget_left_01_on_focus : function(event,target)
    {
    
        // we are in focus
        target.getApplication().setUserData("currentTree",target);
    
        // set drag policy
        var user = qcl.auth.user.Manager.getInstance().getActiveUser();
        if ( user.hasPermission("qcl.auth.permissions.manage") )
        {
      target.setAllowDragTypes(['qcl.auth.types.User']);
      target.setAllowDropTypes([['qcl.auth.types.User', 'qcl.auth.types.Role']]);
        }
        else
        {
      target.setAllowDragTypes(null);
      target.setAllowDropTypes(null);
        }
    },
    
    /**
     * Event handler for authorization-widget-left.xml, line 139
     * Event type 'changeSelection'
     * @param event {qx.event.type.Event} Event object
     * @param target {qx.core.Target} Event target object
     * @return void
     */
    authorization_widget_left_02_on_changeSelection : function(event,target)
    {
    
        var node = event.getData()[0];
        if ( ! node ) return;
    
        // save current node and notify subscribers
        var nodeType = target.getNodeType(node);
        node.data.sourceTree = target;
        target.getApplication().setUserData("currentNodeType",nodeType);
        target.getApplication().setUserData("currentNode",node);
        qx.event.message.Bus.dispatch( "qcl.auth.messages.changeSelection",node );
    
    },
    
    /**
     * Event handler for authorization-widget-left.xml, line 183
     * Event type 'dragdrop'
     * @param event {qx.event.type.Event} Event object
     * @param target {qx.core.Target} Event target object
     * @return void
     */
    authorization_widget_left_03_on_dragdrop : function(event,target)
    {
    
    
      var dropData    = target.getDropData(event);
      var action     = event.getAction();
      var selection  = dropData.nodeData;
      var targetNode = dropData.targetNode;
      if ( target.getNodeType(targetNode) != "qcl.auth.types.Role" ) return;
    
      var targetNodeRoleId = parseInt(targetNode.data.id);
    
      selection.forEach(function(sourceNode){
        var userId  = sourceNode.data.id;
        var sourceNodeRoleId  = target.nodeGet(sourceNode.parentNodeId).data.id;
        if ( action == "move" )
        {
          target.updateServer( target.getServiceName() + ".removeUserFromRole", userId, sourceNodeRoleId );
        }
        target.updateServer( target.getServiceName() + ".addUserToRole", userId, targetNodeRoleId );
      }, target);
    
      target.setUserData("dropData",dropData);
    
    },
    
    /**
     * Message handler for authorization-widget-left.xml, line 187
     * Massage name 'qcl.auth.messages.user.roleAdded'
     * @param message {qx.event.message.Message} Message object
     * @param target {qx.core.Target} Message receiver object 
     * @return void
     */
    authorization_widget_left_04_on_qcl_auth_messages_user_roleAdded : function(message,target)
    {
    
      var dropData = target.getUserData("dropData");
      if (dropData && dropData.nodeData[0].data.id == message.getData() )
      {
       target.moveNode(dropData);
       target.setUserData("dropData",null);
      }
    
    },
    
    /**
     * Message handler for authorization-widget-left.xml, line 190
     * Massage name 'qcl.auth.commands.user.create'
     * @param message {qx.event.message.Message} Message object
     * @param target {qx.core.Target} Message receiver object 
     * @return void
     */
    authorization_widget_left_05_on_qcl_auth_commands_user_create : function(message,target)
    {
    
      var newName = prompt(target.tr("Please enter login name of new user"));
      if ( ! newName ) return;
      roleNode = target.getApplication().getUserData("currentNode");
      if (target.getNodeType(roleNode) != "qcl.auth.types.Role" )
      {
        qx.event.message.Bus.dispatch("error-client", "Cannot create user - invalid parent node.");
        return;
      }
      target.updateServer( target.getServiceName() + ".createItem", "user", newName, roleNode.data.id );
    
    },
    
    /**
     * Message handler for authorization-widget-left.xml, line 197
     * Massage name 'qcl.auth.commands.item.delete'
     * @param message {qx.event.message.Message} Message object
     * @param target {qx.core.Target} Message receiver object 
     * @return void
     */
    authorization_widget_left_06_on_qcl_auth_commands_item_delete : function(message,target)
    {
    
      var node   = target.getApplication().getUserData("currentNode"),
          id    = node.data.id,
          namedId= node.data.namedId,
          name   = node.data.name,
          nodeType     = target.getNodeType(node),
          parentNode  = target.nodeGet(node.parentNodeId),
          parentId    = parentNode.data ? parentNode.data.id : null,
          displayName  = " '" + ( name ? name : namedId )+ "'";
    
      if ( ! confirm ( "Do you really want to delete " + displayName + "?" ) ) return;
    
      target.updateServer( target.getServiceName() + ".deleteItem", nodeType, id, parentId )
    
    
    },
    
    /**
     * Message handler for authorization-widget-left.xml, line 203
     * Massage name 'qcl.auth.commands.item.remove'
     * @param message {qx.event.message.Message} Message object
     * @param target {qx.core.Target} Message receiver object 
     * @return void
     */
    authorization_widget_left_07_on_qcl_auth_commands_item_remove : function(message,target)
    {
    
      var node   = target.getApplication().getUserData("currentNode"),
          id    = node.data.id,
          nodeType     = target.getNodeType(node),
          shortType    = nodeType.substr(nodeType.lastIndexOf(".")+1),
          parentNode  = target.nodeGet(node.parentNodeId),
          roleId= parentNode.data.id ;
    
      target.updateServer( target.getServiceName() + ".remove" + shortType +  "FromRole" , id, roleId );
    
    },
    
    /**
     * Message handler for authorization-widget-left.xml, line 204
     * Massage name 'qcl.auth.messages.user.roleRemoved'
     * @param message {qx.event.message.Message} Message object
     * @param target {qx.core.Target} Message receiver object 
     * @return void
     */
    authorization_widget_left_08_on_qcl_auth_messages_user_roleRemoved : function(message,target)
    {
      // listen to message only if target is not a drag and drop session
      if ( ! target.getUserData("dropData") )
      {
        target.getDataModel().prune(target.getApplication().getUserData("currentNode"),true);
        target.getDataModel().setData();
      }
    },
    
    /**
     * Message handler for authorization-widget-properties.xml, line 18
     * Massage name 'qcl.auth.messages.logout'
     * @param message {qx.event.message.Message} Message object
     * @param target {qx.core.Target} Message receiver object 
     * @return void
     */
    authorization_widget_properties_00_on_qcl_auth_messages_logout : function(message,target)
    {
    
        // stop editing
        if (target.isEditing())
        {
          target.stopEditing();
        }
        target.setEditable(false);
    
    },
    
    /**
     * Message handler for authorization-widget-properties.xml, line 20
     * Massage name 'qcl.auth.messages.changeSelection'
     * @param message {qx.event.message.Message} Message object
     * @param target {qx.core.Target} Message receiver object 
     * @return void
     */
    authorization_widget_properties_01_on_qcl_auth_messages_changeSelection : function(message,target)
    {
    
        // hack: preserve property view width
        target.setUserData("oldWidth", target.getWidthValue() );
    
        // set service method
        target.setServiceName(target.getApplication().getUserData("serviceName"));
    
        var node = message.getData();
    
        if ( node )
        {
          var id     = node.data.id;
          var type  = node.data.type;
          target.setUserData("id", id);
          target.setUserData("type", type);
          target.updateClient(target.getServiceName() + ".getItemData", type, id);
        }
    
    },
    
    /**
     * Event handler for authorization-widget-properties.xml, line 30
     * Event type 'dataChanged'
     * @param event {qx.event.type.Event} Event object
     * @param target {qx.core.Target} Event target object
     * @return void
     */
    authorization_widget_properties_02_on_dataChanged : function(event,target)
    {
    
      if ( event instanceof qx.event.type.DataEvent )
      {
        var changedData = event.getData();
    
        // has only one cell has changed, i.e. edited ?
        if ( changedData.firstRow==changedData.lastRow &&
             changedData.firstColumn==changedData.lastColumn )
        {
          // get changed data
          var model   = target.getTableModel();
          var key     = model.getValue(0,changedData.firstRow);
          var value   = model.getValue(changedData.firstColumn,changedData.firstRow);
    
          // send change to server
          var id       = target.getUserData("id");
          var type    = target.getUserData("type");
          var data      = {};
          data[key]   = value;
          target.updateServer( target.getServiceName()+ ".updateItem", type, data, id );
        }
      }
    
    },
    
    /**
     * Message handler for authorization-widget-right.xml, line 58
     * Massage name 'qcl.auth.messages.reload'
     * @param message {qx.event.message.Message} Message object
     * @param target {qx.core.Target} Message receiver object 
     * @return void
     */
    authorization_widget_right_00_on_qcl_auth_messages_reload : function(message,target)
    {
    
    
      // set service method
      target.setServiceName(target.getApplication().getUserData("serviceName"));
    
      // (re)load tree
      target.getDataModel().clearData();
    
      // send permission data ?
      if ( target.getUserData("permissionsSynchronized") )
      {
        target.updateClient();
      }
      else
      {
        // send permission names to server
        target.updateClient( qcl.auth.permission.Manager.getInstance().getNamedIds() );
        target.setUserData("permissionsSynchronized",true);
      }
    
    },
    
    /**
     * Event handler for authorization-widget-right.xml, line 60
     * Event type 'focus'
     * @param event {qx.event.type.Event} Event object
     * @param target {qx.core.Target} Event target object
     * @return void
     */
    authorization_widget_right_01_on_focus : function(event,target)
    {
    
      // we are in focus
      target.getApplication().setUserData("currentTree",target);
    
      // set drag policy
      var user = qcl.auth.user.Manager.getInstance().getActiveUser();
      if ( user.hasPermission("qcl.auth.permissions.manage") )
      {
        target.setAllowDragTypes(['qcl.auth.types.Permission']);
        target.setAllowDropTypes([['qcl.auth.types.Permission', 'qcl.auth.types.Role']]);
      }
      else
      {
        target.setAllowDragTypes(null);
        target.setAllowDropTypes(null);
      }
    
    },
    
    /**
     * Event handler for authorization-widget-right.xml, line 62
     * Event type 'changeSelection'
     * @param event {qx.event.type.Event} Event object
     * @param target {qx.core.Target} Event target object
     * @return void
     */
    authorization_widget_right_02_on_changeSelection : function(event,target)
    {
    
      var node = event.getData()[0];
      if ( ! node ) return;
    
      // determine and save node type and notify subscribers
      var nodeType = target.getNodeType(node);
      node.data.sourceTree = target;
      target.getApplication().setUserData("currentNodeType",nodeType);
      target.getApplication().setUserData("currentNode",node);
      qx.event.message.Bus.dispatch( "qcl.auth.messages.changeSelection",node );
    
    },
    
    /**
     * Event handler for authorization-widget-right.xml, line 81
     * Event type 'dragdrop'
     * @param event {qx.event.type.Event} Event object
     * @param target {qx.core.Target} Event target object
     * @return void
     */
    authorization_widget_right_03_on_dragdrop : function(event,target)
    {
    
      var dropData    = target.getDropData(event);
      var action     = event.getAction();
      var selection  = dropData.nodeData;
      var targetNode = dropData.targetNode;
      if ( target.getNodeType(targetNode) != "qcl.auth.types.Role" ) return;
    
      var targetNodeRoleId = parseInt(targetNode.data.id);
    
      selection.forEach(function(sourceNode){
        var permissionId    = parseInt(sourceNode.data.id);
        var sourceNodeRoleId     = parseInt(target.nodeGet(sourceNode.parentNodeId).data.id);
        if ( action == "move" )
        {
          target.updateServer( target.getServiceName() + ".removePermissionFromRole", permissionId, sourceNodeRoleId );
        }
        target.updateServer( target.getServiceName() + ".addPermissionToRole", permissionId, targetNodeRoleId );
      }, target);
    
      target.setUserData("dropData",dropData);
    
    },
    
    /**
     * Message handler for authorization-widget-right.xml, line 82
     * Massage name 'qcl.auth.messages.permission.roleAdded'
     * @param message {qx.event.message.Message} Message object
     * @param target {qx.core.Target} Message receiver object 
     * @return void
     */
    authorization_widget_right_04_on_qcl_auth_messages_permission_roleAdded : function(message,target)
    {
    
      var dropData = target.getUserData("dropData");
      if (dropData && dropData.nodeData[0].data.id == message.getData() )
      {
       target.moveNode(dropData);
       target.setUserData("dropData",null);
      }
    
    },
    
    /**
     * Message handler for authorization-widget-right.xml, line 85
     * Massage name 'qcl.auth.commands.role.create'
     * @param message {qx.event.message.Message} Message object
     * @param target {qx.core.Target} Message receiver object 
     * @return void
     */
    authorization_widget_right_05_on_qcl_auth_commands_role_create : function(message,target)
    {
    
      var newName = prompt(target.tr("Please enter dot-separated named id (foo.roles.mySpecialRole) of role"));
      if ( ! newName ) return;
      roleNode = target.getApplication().getUserData("currentNode");
      target.updateServer( target.getServiceName() + ".createItem", "role", newName, roleNode.data.id );
    
    },
    
    /**
     * Message handler for authorization-widget-right.xml, line 95
     * Massage name 'qcl.auth.commands.permission.create'
     * @param message {qx.event.message.Message} Message object
     * @param target {qx.core.Target} Message receiver object 
     * @return void
     */
    authorization_widget_right_06_on_qcl_auth_commands_permission_create : function(message,target)
    {
    
      var newName = prompt(target.tr("Please enter dot-separated named id (foo.permissions.doFoo) of permission"));
      if ( ! newName ) return;
      var roleNode = target.getApplication().getUserData("currentNode");
      var nodeType = target.getNodeType(roleNode) ;
      if ( nodeType != "qcl.auth.types.Role" )
      {
        qx.event.message.Bus.dispatch("error-client", "Cannot create permission - invalid parent node type " + nodeType );
        return;
      }
      target.updateServer( target.getServiceName() + ".createItem", "permission", newName, roleNode.data.id );
    
    },
    
    /**
     * Message handler for authorization-widget-right.xml, line 111
     * Massage name 'qcl.auth.messages.permission.roleRemoved'
     * @param message {qx.event.message.Message} Message object
     * @param target {qx.core.Target} Message receiver object 
     * @return void
     */
    authorization_widget_right_07_on_qcl_auth_messages_permission_roleRemoved : function(message,target)
    {
      // listen to message only if target is not a drag and drop session
      if ( ! target.getUserData("dropData") )
      {
        target.getDataModel().prune(target.getApplication().getUserData("currentNode"),true);
        target.getDataModel().setData();
      }
    },
    
    /**
     * Event handler for config-editor-main.xml, line 67
     * Event type 'input'
     * @param event {qx.event.type.Event} Event object
     * @param target {qx.core.Target} Event target object
     * @return void
     */
    config_editor_main_00_on_input : function(event,target)
    {
      var typedText = event.getData();
      qx.client.Timer.once(function(){
        if ( target.getValue() == typedText )
        {
          qx.event.message.Bus.dispatch( "qcl.config.messages.editor.reload", typedText );
        }
      },target,500);
    },
    
    /**
     * Message handler for config-editor-main.xml, line 157
     * Massage name 'qcl.config.messages.editor.reload'
     * @param message {qx.event.message.Message} Message object
     * @param target {qx.core.Target} Message receiver object 
     * @return void
     */
    config_editor_main_01_on_qcl_config_messages_editor_reload : function(message,target)
    {
      // get service prefix from application name
      var appClassName = qx.core.Init.getInstance().getApplication().classname;
      var appName       = appClassName.substring(0,appClassName.indexOf("."));
      target.setUserData("servicePrefix",appName + ".");
    
      // (re)load data
      target.updateClient( appName + '.configuration.getAll', message.getData() || configEditorFilter.getValue() || "" );
    },
    
    /**
     * Message handler for config-editor-main.xml, line 160
     * Massage name 'qcl.config.messages.editor.createKey'
     * @param message {qx.event.message.Message} Message object
     * @param target {qx.core.Target} Message receiver object 
     * @return void
     */
    config_editor_main_02_on_qcl_config_messages_editor_createKey : function(message,target)
    {
      var name = prompt ( target.tr("Enter config key name") );
      if ( ! name ) return;
      target.__newConfigKey = {
        'name' : name,
        'type' : "string",
        'value': "",
        'permissionRead' : null,
        'permissionWrite' : null,
        'userId' : "global"
      };
      target.updateServer( target.getUserData("servicePrefix") + 'configuration.create', target.__newConfigKey );
    },
    
    /**
     * Message handler for config-editor-main.xml, line 170
     * Massage name 'qcl.config.messages.editor.deleteKey'
     * @param message {qx.event.message.Message} Message object
     * @param target {qx.core.Target} Message receiver object 
     * @return void
     */
    config_editor_main_03_on_qcl_config_messages_editor_deleteKey : function(message,target)
    {
      if ( ! confirm( target.tr( "Do you really want to completely delete the selected keys?" ) ) ) return;
      target.getSelectionModel().iterateSelection(function(index){
        var model = target.getTableModel();
        var name = model.getValue( model.getColumnIndexById( "name" ), index );
        target.updateServer( target.getUserData("servicePrefix") +  'configuration.delete', name );
        model.removeRows( index, 1 );
      },target);
    },
    
    /**
     * Event handler for config-editor-main.xml, line 173
     * Event type 'dataChanged'
     * @param event {qx.event.type.Event} Event object
     * @param target {qx.core.Target} Event target object
     * @return void
     */
    config_editor_main_04_on_dataChanged : function(event,target)
    {
    
      // is there a data event?
      if ( ! ( event instanceof qx.event.type.DataEvent ) ) return;
    
      // get changed data
      var changedData = event.getData();
    
      // has only one cell has changed, i.e. edited, if not, it is a server update
      if ( changedData.firstRow != changedData.lastRow ||
           changedData.firstColumn != changedData.lastColumn ) return;
    
      // gather data to send
      var model   = target.getTableModel();
      var id       = model.getValue(0,changedData.firstRow);
      var key      = model.getColumnId(changedData.firstColumn);
      var value   = model.getValue(changedData.firstColumn,changedData.firstRow);
    
      // send change to server
      target.updateServer( target.getUserData("servicePrefix") + "configuration.update", id, key, value );
    
    },
    
    /**
     * Message handler for loading-popup-simple.xml, line 20
     * Massage name 'qcl.databinding.messages.rpc.*'
     * @param message {qx.event.message.Message} Message object
     * @param target {qx.core.Target} Message receiver object 
     * @return void
     */
    loading_popup_simple_00_on_qcl_databinding_messages_rpc__ : function(message,target)
    {
    
      var status = message.getName();
      var timestamp = message.getData()
      var queue = target.getUserData("queue") || [];
      switch ( status )
      {
        case "qcl.databinding.messages.rpc.start":
          queue.push(timestamp);
          break;
    
        case "qcl.databinding.messages.rpc.end":
          for ( var i=0; i < queue.length; i++)
          {
            if (queue[i]==timestamp)
            {
              queue.splice(i,1);
            }
          }
          break;
      }
      target.setUserData("queue",queue);
      if (queue.length) {
        target.getParent().show();
      } else {
        target.getParent().hide();
      }
    
    },
    

  }
});