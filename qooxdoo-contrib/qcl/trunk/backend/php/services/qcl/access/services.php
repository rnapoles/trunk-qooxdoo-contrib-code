<?php

/*
 * dependencies
 */
require_once ("qcl/mixin.php");

/**
 * Mixin providing access services (authentication etc.)
 * to an application service
 */
class qcl_access_services extends qcl_mixin
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
  
  //-------------------------------------------------------------
  // public rpc methods 
  //-------------------------------------------------------------

   /**
    * default update client method: authenticate user
    */
   function method_updateClient($params)
   {
     return $this->method_authenticate($params);
   }  

  /**
   * default update client method: authenticate user
   * @param string $param[0] username
   * @param string $param[1] (MD5-encoded) password
   * @todo: the logic in this method is somewhat confusing
   */
  function method_authenticate( $params=array(null,null) )
  {
    /*
     * arguments
     */
    $username   = utf8_decode($params[0]);
    $password   = utf8_decode($params[1]);
    
    /*
     * user model
     */
    $userModel  =& $this->getUserModel();
    
    /*
     * get the active user data (or null if nobody is logged in)
     */
    $activeUser = $userModel->getActiveUser();
    
    /*
     * authenticate user if user name has been provided
     * and password matches
     */
    if ( $username and $userModel->authenticate ( $username, $password ) )
    {
      
      /*
       * get client security data
       */
      $security = $userModel->getSecurity($username);
      
      /*
       * set active user data
       */
      $userModel->setActiveUser($security['userdata']);
      
      /*
       * message that login was successful
       */
      $this->dispatchMessage("qcl.messages.login.success"); 
      
      $this->info ("Logging on user $username.");   
    }
    
    /*
     * otherwise, if we have no username, but a user is already
     * logged in, use the data of this user
     */
    elseif ( ! $username and is_array( $activeUser ) )
    {
      /*
       * user already logged in, get security data from active user
       */
      $userName = $activeUser[$userModel->col_username];
      $security = $userModel->getSecurity($userName);
      
      /*
       * message that login was successful
       */
      $this->dispatchMessage("qcl.messages.login.success", $username );
    }
    
    
    /*
     * otherwise, we assume that invalid authentication data has been 
     * provided
     */
    else
    {
      /*
       * authentication failed
       */
      $security = null;
      $userModel->setActiveUser(null);
      
      /*
       * message
       */
      $this->dispatchMessage( "qcl.messages.login.failed", $this->tr("Wrong username or password.") );
    }
    
    /*
     * return client data
     */
    $this->set("security", $security ); 
    return $this->getResponseData();
  }   
   
  /**
   * logout current user
   */
  function method_logout()
  {
    /*
     * user model
     */
    $userModel =& $this->getUserModel();
    
    /*
     * username
     */
    $username = $userModel->getActiveUserNamedId();
    if ( $username)
    {
      $this->info ("Logging out user $username.");  
    }
    
    /*
     * delete active user
     */
    $userModel->setActiveUser(null);
    
    /*
     * message
     */
    $this->dispatchMessage("qcl.messages.user.logout");
    
    /*
     * return client data
     */
    return $this->getResponseData();
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
     * @todo: security
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
    $itemData = $model->getById($itemId);

    /*
     * convert to table data model
     * @todo: rework this "meta" stuff
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
    return $this->getResponseData();
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
     * @todo: security
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
    return $this->getResponseData();
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
    return $this->getResponseData();
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
     * @todo: security!
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
        //@todo: this should be automatic 
        $model->removeFromRole ( $itemId, $parentId ); 
        break;
        
      case "permission": 
        $model =& $this->getPermissionModel();
        $model->delete($itemId); 
        //@todo: this should be automatic
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
    return $this->getResponseData();
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
    return $this->getResponseData();
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
    return $this->getResponseData();
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
    return $this->getResponseData();
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
    return $this->getResponseData();
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
    $users      = $userModel->getRecordsWhere(null,$userModel->col_descriptiveName);
    $roles      = $roleModel->getRecordsWhere(null,$roleModel->col_descriptiveName);
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
    return $this->getResponseData();
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
    $roles            = $roleModel->getAllRecords($roleModel->col_descriptiveName);
    $permissions      = $permModel->getAllRecords($roleModel->col_descriptiveName . "`,`" . $permModel->col_namedId );
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
    return $this->getResponseData();    
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
    $permission = $permModel->getById($permissionId);
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
    return $this->getResponseData();
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
    $user           = $this->getById($userId);
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
    return $this->getResponseData();
  }
  
  
  /**
   * export to xml
   */
  function method_exportXML()
  {
    /*
     * models
     */
    $roleModel =& $this->getRoleModel();
    $permModel =& $this->getPermissionModel();
    $userModel =& $this->getUserModel();
    
    require_once("qcl/xml/model.php");
    $path = "../var/tmp/security.xml"; 
    unlink($path);
    
    $xmlModel = new qcl_xml_model($this);
    $xmlModel->load($path);
    $doc =& $xmlModel->getDocument();
    
    /*
     * permissions
     */
    $permissions =& $doc->addChild("permissions");
    foreach($permModel->getAllRecords() as $record)
    {
      $permission =& $permissions->addChild("permission");
      $permission->addAttribute("name",$record['namedId']);
      if ( $record['name'] )
        $permission->addChild("description", htmlentities($record['name']));
      if ( $record['note'] )
        $permission->addChild("note",htmlentities($record['note']));
    }
    
    /*
     * roles
     */
    $roles =& $doc->addChild("roles");
    foreach($roleModel->getAllRecords() as $record)
    {
      $role =& $roles->addChild("role");
      $role->addAttribute("name",$record['namedId']);
      
      if ( $record['name'] )
        $role->addChild("description", htmlentities($record['name']));
      if ( $record['note'] )
        $role->addChild("note",htmlentities($record['note']));
        
      /*
       * add role permissions
       */
      $rolePermNode =& $role->addChild("permissions");
      foreach( $roleModel->getPermissions($record['namedId']) as $permId )
      {
        $rp =& $rolePermNode->addChild("permission");
        $rp->addAttribute("name",$permId);
      }
      
    }
    
    /*
     * users
     */
    $users =& $doc->addChild("users");
    foreach($userModel->getAllRecords() as $record)
    {
      $user =& $users->addChild("user");
      $user->addAttribute("username",$record['username']);
      if ( $record['name'] )
        $user->addChild("name", htmlentities($record['name']));
      if ( $record['email'] )
        $user->addChild("email", htmlentities($record['email']));
      $user->addChild("password", htmlentities($record['password']));  

      /*
       * add roles
       */
      $userPermNode =& $user->addChild("roles");
      $userRoles = $roleModel->getByUserId($record['id']);
      foreach( $userRoles as $roleId )
      {
        $node =& $userPermNode->addChild("role");
        $role =  $roleModel->getById($roleId);
        $node->addAttribute("name",$role['namedId']);
      }
    }    
    
    $xmlModel->save();
  }
}

?>