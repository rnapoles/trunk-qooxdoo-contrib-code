<?php

/*
 * dependencies
 */
require_once "qcl/core/mixin.php";

/**
 * Mixin providing access services for the Access Configuration Manager
 */
class qcl_access_services extends qcl_core_mixin
{    

  /**
   * gets a model of the given type
   * @param string $type (role|user|permission)
   * @return object
   */
  function &getModelOfType($type)
  {
    switch ( $type )
    {
      case "user":
        $model =& $this->getUserModel();
        break;
       
      case "role":
        $model =& $this->getRoleModel();
        break;
        
      case "permission":
        $model =& $this->getPermissionModel();
        break;
    }    
    return $model;
  }
  
  function extractType ( $type )
  {
    if ( strstr($type,".") )
    {
      return strtolower(substr($type,strrpos($type,".")+1));
    }
    return $type;
  }
  
  function requirePermission( $permission )
  {
    $userModel =& $this->getUserModel();
    $userModel->requirePermission( $permision );
  }


  
  /**
   * get item data 
   * @param string  $param[0] type of pattern "type" or "xxx.yyy.Type", type being user|permission|role 
   * @param int     $param[1] id
   * @return array 
   */
  function method_getItemData($params)
  {
    /*
     * @todo security
     */
    
    /*
     * arguments
     */
    $type     = (string)   $params[0]; 
    $type     =  $this->extractType($type);
    $itemId   = (int)      $params[1];

    /*
     * model
     */
    $model =& $this->getModelOfType($type);
    
    /*
     * get data
     */
    $itemData = $model->load($itemId);

    /*
     * convert to table data model
     * @todo rework this "meta" stuff
     */
    $data   = array();
    foreach($itemData as $key => $value )
    {
      $meta = $model->meta[$key];
      if ( ! is_array( $meta ) ) continue;
      $data[]   = array($key,$this->tr($key),$value,$meta);
    }
    
    /*
     * return client data
     */
    $this->set( "tabledatamodel", $data );    
    return $this->response();
  }
    
  /**
   * create a new item
   * @param string  $param[1] type of pattern "type" or "xxx.yyy.Type", type being user|permission|role 
   * @param string  $param[2] named id of new item
   * @param int     $param[3] id of parent of new item
   * @return array 
   */   
  function method_createItem($params)
  {
    /*
     * @todo security
     * 
     */

    /*
     * arguments
     */
    $type       = (string)  $this->extractType($params[1]); 
    $namedId    = (string)  $params[2];
    $parentId   = (int)     $params[3];
    
    /*
     * model
     */
    $model =& $this->getModelOfType($type);
        
    /*
     * create new item
     */
    $model->create($namedId,$parentId);
    
    /*
     * message that item has been created
     */ 
    $this->dispatchMessage( "qcl.auth.messages.{$type}.created", $itemId );
    
    /*
     * return client data
     */
    return $this->response();
  }
  
  /**
   * update item data
   * @param string  $param[1] type of pattern "type" or "xxx.yyy.Type", type being user|permission|role 
   * @param object  $param[2] map of data properties to update and including the id
   * @param int     $param[3] (optional) if the id is not contained in the data, provide it here
   * @return array
   */
  function method_updateItem($params)
  {
    /*
     * arguments
     */
    $type       = (string)  $this->extractType($params[1]); 
    $data       = (array)   $params[2];
    $id         = (int)     $params[3]; 
    
    /*
     * model
     */
    $model =& $this->getModelOfType($type);
    
    /*
     * determine id
     */
    if ( $id )
    {
      $data[$model->col_id] = $id;
    }
    elseif ( ! $data[$model->col_id] )
    {
      $this->raiseError("qcl_access_controller::method_updateItem : no id given!");
    }
    
    /*
     * update model
     */
    $model->update($data);
    
    /*
     * success message
     */
    $this->dispatchMessage(
     "qcl.auth.messages.{$type}.updated",
     $data[$model->col_id]
    );
    
    /*
     * return client data
     */
    return $this->response();
  }    
  
  /**
   * delete an item 
   * @param string  $param[1] type of pattern "type" or "xxx.yyy.Type", type being user|permission|role  
   * @param int     $param[1] item id
   * @param int     $param[2] parent id
   * @return array 
   */
  function method_deleteItem($params)
  {
    /*
     * @todo security!
     */ 
    
    /*
     * arguments
     */
    $type       = (string)  $this->extractType($params[1]); 
    $itemId     = (int)     $params[2];
    $parentId   = (int)     $params[3];
    
    /*
     * get model and delete item
     */
    switch ( $type )
    {
      case "user":
        $model =& $this->getUserModel();
        $model->delete($itemId);
        //@todo this should be automatic 
        $model->removeFromRole ( $itemId, $parentId ); 
        break;
        
      case "permission": 
        $model =& $this->getPermissionModel();
        $model->delete($itemId); 
        //@todo this should be automatic
        $model->removeFromRole ( $itemId, $parentId ); 
        break;
        
      case "role": 
        $model =& $this->getRoleModel();
        $model->delete($itemId); 
        break;    
    }
        
    /*
     * message
     */
    $this->dispatchMessage("qcl.auth.messages.{$type}.deleted",$itemId);
    
    /*
     * return client data
     */
    return $this->response();
  }    

  /**
   * add user(s) to role(s)
   * @param null  $param[0] not used
   * @param mixed $param[1] (array or number) user refs (id or namedId)
   * @param mixed $param[2] (array or number) role refs (id or namedId)
   */
  function method_addUserToRole($params)
  {
    /*
     * security
     */
    $this->requirePermission("qcl.auth.permissions.manage");
    
    /*
     * arguments
     */
    $userRefs   = $params[1];
    $roleRefs   = $params[2];
    
    /*
     * model
     */
    $userModel =& $this->getUserModel();
    
    /*
     * action
     */
    $userModel->addToRole($userRefs,$roleRefs); 
    
    /*
     * message
     */
    $this->dispatchMessage("qcl.auth.messages.user.roleAdded",$userRefs);
    
    /*
     * return client data
     */
    return $this->response();
  }
   
  /**
   * removes user(s) from role(s)
   * @param null  $param[0] not used
   * @param mixed $param[1] (array or number) user refs (id or namedId)
   * @param mixed $param[2] (array or number) role refs (id or namedId)
   */
  function method_removeUserFromRole($params)
  {
    $this->requirePermission("qcl.auth.permissions.manage");
    
    $userRefs   = $params[1];
    $roleRefs   = $params[2];

    // remove
    $userModel =& $this->getUserModel();
    $userModel->removeFromRole($userRefs,$roleRefs);

    // success
    $this->dispatchMessage("qcl.auth.messages.user.roleRemoved",$userRefs); 
    return $this->response();
  }
  
  /**
   * add permission(s) to role(s)
   * @param mixed $param[1] (array or number) permission refs (id or namedId)
   * @param mixed $param[2] (array or number) role refs (id or namedId)
   */
  function method_addPermissionToRole($params)
  {
    /*
     * security
     */
    $this->requirePermission("qcl.auth.permissions.manage");

    /*
     * arguments
     */
    $permRefs = $params[1];
    $roleRefs = $params[2];
        
    /*
     * models
     */
    $permModel =& $this->getPermissionModel();
    
    /*
     * add permission to role
     */
    $permModel->addToRole($permRefs,$roleRefs); 
    
    /*
     * message
     */
    $this->dispatchMessage("qcl.auth.messages.permission.roleAdded",$permRefs);
    
    /*
     * return client data
     */
    return $this->response();
  }
   
  /**
   * removes permission(s) from role(s)
   * @param mixed $param[1] (array or number) permission refs (id or namedId)
   * @param mixed $param[2] (array or number) role refs (id or namedId)
   */
  function method_removePermissionFromRole($params)
  {
    /*
     * security
     */
    $this->requirePermission("qcl.auth.permissions.manage");
    
    /*
     * arguments
     */
    $permRefs   = $params[1];
    $roleRefs   = $params[2];
  
    /*
     * model
     */
    $permModel =& $this->getPermissionModel();
    
    /*
     * action
     */
    $permModel->removeFromRole($permRefs,$roleRefs);
  
    /*
     * message
     */
    $this->dispatchMessage("qcl.auth.messages.permission.roleRemoved",$permRefs); 
    
    /*
     * return client data
     */
    return $this->response();
  }

  //-------------------------------------------------------------
  // data for security editor
  //-------------------------------------------------------------
    
  /**
   * get treedatamodel of users and roles
   */
  function method_getUsersAndRoles($params)
  {                           
    /*
     * models
     */
    $userModel  =& $this->getUserModel();
    $roleModel  =& $this->getRoleModel();
    $permModel  =& $this->getPermissionModel();           
        
    /*
     * get lists of users and roles ordered by name
     */
    $users      = $userModel->findWhere(null,$userModel->col_descriptiveName);
    $roles      = $roleModel->findWhere(null,$roleModel->col_descriptiveName);
    $userRoles  = $roleModel->getByUserId();
    
    $parentNodeIds  = array();
    $result     = array();
    
    foreach ( $roles as $index => $role )
    {
      $roleId   = $role[$roleModel->col_id];
      $namedId  = $role[$roleModel->col_namedId];
      $name     = $role[$roleModel->col_descriptiveName];
      $label    = $name ? $name : $namedId;                
      
      $result[] = array(
        'parentNodeId' => 0,
        'isBranch'     => true,
        'label'        => $label,
        'bOpened'      => true,
        'data'         => array (
                            type  => "qcl.auth.types.Role",
                            id    => $roleId,
                            namedId => $namedId,
                            name  => $name
                          )
      );        
      // parent node id to which the following nodes will be added
      $parentNodeIds[$roleId]=$index+1;
    }
    
    // render tree after creating users
    $result[] = array( 'command' => "render" );
    
    foreach ( $users as $index => $user )
    {
      $userId   = $user[$userModel->col_id];
      $namedId  = $user[$userModel->col_namedId];
      $name     = $user[$userModel->col_descriptiveName];
      $label    = "$name ($namedId)";
      
      // add to roles
      $myRoleIds  = $userRoles[$userId];
      
      foreach ( $myRoleIds as $roleId )         
      {
        $parentNodeId = $parentNodeIds[$roleId];
        
          $result[] = array(
            'parentNodeId'  => $parentNodeId,
            'bOpened'       => true,
            'label'         => $label,
            'icon'          => $this->icon,
            'iconSelected'  => $this->icon,
            'data'          => array (
                                type    => "qcl.auth.types.User",
                                id      => $userId,
                                namedId => $namedId,
                                name    => $name
                              )
        );
      }
    } 

    // return data
    $this->set( 'treedatamodel', $result );
    return $this->response();
  }

  /**
   * synchronizes permissions on the client and the server
   * @param array   $permissionsClient  
   * @return void 
   */
  function synchronizePermissions( $permissionsClient )
  {
    /*
     * models
     */
    $userModel  =& $this->getUserModel();
    $roleModel  =& $this->getRoleModel();
    $permModel  =& $this->getPermissionModel();           

    /*
     * permissions on the server
     */
    $permissionsServer  = $permModel->getAllNamedIds();
    
    /*
     * get or create a role for permissions that 
     * haven't been assigned to a role and add
     * these new permissions to this role
     */
    $unassignedRoleId   = $roleModel->createIfNotExists("qcl.roles.Unassigned");
    foreach($permissionsClient as $namedId)
    {
      if ( ! in_array( $namedId, $permissionsServer ) )
      {
        $permModel->create($namedId,$unassignedRoleId);
      }
    }
  } 
  
  /**
   * get treedatamodel of roles and permissions
   * @param array   $params[0]  list of named ids for synchronization (optional)
   * @return array treedatamodel
   */
  function method_getRolesAndPermissions( $params )
  {                                 
    /*
     * arguments
     */
    $permissions = $params[0];
    
    /*
     * models
     */
    $userModel  =& $this->getUserModel();
    $roleModel  =& $this->getRoleModel();
    $permModel  =& $this->getPermissionModel();  
    
    /*
     * synchronize permissions if sent from client
     */
    if ( is_array ( $permissions ) )
    {
      $this->synchronizePermissions($permissions);
    }

    $result     = array();
        
    /*
     * get ordered lists of roles and permissions
     */ 
    $roles            = $roleModel->findAll($roleModel->col_descriptiveName);
    $permissions      = $permModel->findAll($roleModel->col_descriptiveName . "`,`" . $permModel->col_namedId );
    $permissionRoles  = $permModel->getByRoleId();
    
    $parentNodeIds    = array();
    
    /*
     * create role nodes
     */
    foreach ( $roles as $index => $role )
    {
      $roleId   = $role[$roleModel->col_id];
      $namedId  = $role[$roleModel->col_namedId];
      $name     = $role[$roleModel->col_descriptiveName];
      $label    = "$name ($namedId)";                
      
      $result[] = array(
        'parentNodeId'  => 0,
        'isBranch'      => true,
        'label'         => $label,
        'bOpened'       => true,        
        'data'          => array (
                            type  => "qcl.auth.types.Role",
                            id    => $roleId,
                            namedId => $namedId,
                            name  => $name
                          )
      );        
      /*
       * remember arent node id to which the following 
       * nodes will be added
       */
      $parentNodeIds[$roleId]=$index+1;
    }
    
    /*
     * render tree after creating roles
     */
    $result[] = array( 'command' => "render" );

    /*
     * now add permissions to roles
     */
    foreach ( $permissions as $index => $perm )
    {
      $permissionId   = $perm[$permModel->col_id];
      $namedId        = $perm[$permModel->col_namedId];
      $name           = $perm[$permModel->col_descriptiveName];
      $label          = $name? "$name ($namedId)" : $namedId;
      
      /*
       * get the roles of each permission and 
       * add permission nodes to it
       */
      $myRoleIds  = $permissionRoles[$permissionId];
      
      foreach ( $myRoleIds as $roleId )         
      {
        $parentNodeId = $parentNodeIds[$roleId];
        $result[] = array(
          'parentNodeId'  => $parentNodeId,
          'bOpened'       => true,
          'label'         => $label,
          'icon'          => $permModel->icon,
          'iconSelected'  => $permModel->icon,
          'data'      => array (
                      type  => "qcl.auth.types.Permission",
                      id    => $permissionId,
                      namedId => $namedId,
                      name  => $name
                    )
        );
      }
    } 

    /*
     * return client data
     */
    $this->set( 'treedatamodel', $result );
    return $this->response();    
  }
    
  /**
   * get individual permission node
   * @param $param[0] permission id
   * @param $param[1] parentNodeId
   * @return array treedatamodel
   */
  function method_getPermissionNode ( $params )
  {
    /*
     * arguments
     */
    $permissionId = $params[0]; 
    $parentNodeId = $params[1];
    
    /*
     * models
     */
    $userModel  =& $this->getUserModel();
    $roleModel  =& $this->getRoleModel();
    $permModel  =& $this->getPermissionModel();        
    
    /*
     * construct node
     */
    $result     = array();
    $permission = $permModel->load($permissionId);
    $namedId    = $permission[$permModel->col_namedId];
    $name       = $permission[$permModel->col_descriptiveName];
    $label      = $name? "$name ($namedId)" : $namedId;

    $result[] = array(
      'parentNodeId'  => $parentNodeId,
      'bOpened'       => true,
      'bSelected'     => true,
      'label'         => $label,
      'icon'          => $permModel->icon,
      'iconSelected'  => $permModel->icon,
      'data'          => array (
                          type    => "qcl.auth.types.Permission",
                          id      => $permissionId,
                          namedId => $namedId,
                          name    => $name
                        )
    );    

    /*
     * return client data
     */
    $this->set( 'treedatamodel', $result );
    return $this->response();
  }

  /**
   * get individual user node
   * @param $param[0] user id
   * @param $param[1] parentNodeId
   * @return array treedatamodel
   */
  function method_getUserNode ( $params )
  {
    /*
     * arguments
     */
    $userId         = $params[0]; 
    $parentNodeId   = $params[1];
    
    /*
     * models
     */
    $userModel  =& $this->getUserModel();
    $roleModel  =& $this->getRoleModel();
    $permModel  =& $this->getPermissionModel();

    /*
     * construct node
     */
    $result         = array();
    $user           = $this->load($userId);
    $namedId        = $user[$userModel->col_namedId];
    $name           = $user[$userModel->col_descriptiveName];
    $label          = "$name ($namedId)";
  
    $result[] = array(
      'parentNodeId'  => $parentNodeId,
      'bOpened'       => true,
      'bSelected'     => true,      
      'label'         => $label,
      'icon'          => $this->icon,
      'iconSelected'  => $this->icon,
      'data'          => array (
                          type  => "qcl.auth.types.User",
                          id    => $userId,
                          namedId => $namedId,
                          name  => $name
                        )
    );

    $this->set( 'treedatamodel', $result );
    return $this->response();
  }
 
  /**
   * Drops all tables related to roles and permissions
   * to reloads the data upon next request.
   */   
  function method_reloadRolesPermissions()
  {
    /*
     * security
     */    
    $this->requirePermission("qcl.access.permissions.manage");
    
    /*
     * db
     */
    $roleModel =& $this->getRoleModel();
    $db =& $roleModel->db();
    $db->dropTable( array("roles","permissions","link_roles_permissions") );

    return $this->response();    
  }  
  
  /**
   * Drops all tables related to access data (users, roles, permissions)
   * to reloads the data upon next request.
   */ 
  function method_reloadAccessData($params)
  {
    /*
     * security
     */
    $this->requirePermission("qcl.access.permissions.manage");
    
    /*
     * db
     */
    $roleModel =& $this->getRoleModel();
    $db =& $roleModel->db();
    $db->dropTable( array("users","roles","permissions","link_user_roles","link_roles_permissions") );

    /*
     * enable logging
     */
    $logger =& $this->getLogger();
    $logger->setFilterEnabled(QCL_LOG_TABLE_MAINTENANCE, false );
    $logger->setFilterEnabled(QCL_LOG_PROPERTY_MODEL, false );       

    return $this->response();
  }      
}
?>