<?php

// dependencies
require_once ("qcl/jsonrpc/controller.php");

/**
 * Controller class for authentication and user, role and permission
 * management. You cannot use this controller directly - you need
 * to subclass it in your application
 */

class qcl_auth_controller extends qcl_jsonrpc_controller
{    

  //-------------------------------------------------------------
  // class variables
  //-------------------------------------------------------------
  
  //-------------------------------------------------------------
  // internal methods 
  //-------------------------------------------------------------
  
  /**
   * constructor
   * extending classes MUST set the user, role, and permission models after calling
   * this parent constructor
   */
  function __construct()
  { 
    parent::__construct();
    // extending classes MUST set the user, role, and permission models after calling
    // this parent constructor
  }  
    
  //-------------------------------------------------------------
  // public methods 
  //-------------------------------------------------------------

  function extractType ( $type )
  {
    if ( strstr($type,".") )
    {
      return strtolower(substr($type,strrpos($type,".")+1));
    }
    return $type;
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
    */
   function method_authenticate($params)
   {
		$username 	= utf8_decode($params[0]);
		$password 	= utf8_decode($params[1]);
    
    $userModel  = $this->getModel("user");
		$activeUser = $userModel->getActiveUser();
		
		// authenticate user if password matches
		if ( $username and $userModel->authenticate ( $username, $password ) )
		{
			$security = $userModel->getSecurity($username);
			$userModel->setActiveUser($security['userdata']);
			$this->addMessage("qcl.auth.messages.loginSuccess");						
		}
		elseif ( ! $username and $activeUser )
		{
			$security = $userModel->getSecurity($activeUser[$userModel->key_username]);
			$this->addMessage("qcl.auth.messages.loginSuccess");
		}
		else
		{
			$security = null;
			$userModel->setActiveUser(null);
			$this->addMessage( "qcl.auth.messages.loginFailed", $this->error );
		}
		
		$this->set("security", $security );
		
		return $this->getResult();
   }   
   
  /**
   * logout current user
   */
  function method_logout()
  {
    $userModel = $this->getModel("user");
    $userModel->setActiveUser(null);
    $this->addMessage("qcl.auth.messages.user.loggedOut");
    return $this->getResult();
  }   
	
  /**
   * get item data 
   * @param string  $param[0] type of pattern "type" or "xxx.yyy.Type", type being user|permission|role 
   * @param int     $param[1] id
   * @return array 
   */
  function method_getItemData($params)
  {
    $type     = (string)   $params[0]; 
    $itemId 	= (int)      $params[1];
    
    $result   = array();		

		// get model record
    $type      =  $this->extractType($type);
    $model     =& $this->getModel($type);
		$itemData  =  $model->getById($itemId);

		// convert to table data model
		$data = array();
		
		foreach($itemData as $key => $value )
		{
			$meta = $model->meta[$key];
			if ( ! is_array( $meta ) ) continue;
			$data[]		= array($key,__($key),$value,$meta);
		}
		
		// return data
		$this->set( "tabledatamodel", $data );		
		return $this->getResult();
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
		$type       = (string)  $this->extractType($params[1]); 
    $namedId 		= (string)  $params[2];
		$parentId 	= (int)     $params[3];
		
    $model = $this->getModel($type);
		$model->create($namedId,$parentId);
		
		// load and show item 
		$this->addMessage( "qcl.auth.messages.{$type}.created", $itemId );
		
		return $this->getResult();
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
		$type       = (string)  $this->extractType($params[1]); 
    $data       = (array)   $params[2];
    $id         = (int)     $params[3]; 
    
    // get model
    $model = $this->getModel($type);
    
    // determine id
   	if ( $id )
   	{
   		$data[$model->key_id] = $id;
   	}
   	elseif ( ! $data[$model->key_id] )
   	{
   		$this->raiseError("qcl_auth_controller::method_updateItem : no id given!");
   	}
    
    // update model
  	$model->update($data);
  	
    // success
  	$this->addMessage("qcl.auth.messages.{$type}.updated",$data[$model->key_id]);
  	return $this->getResult();
  }    
  
  /**
   * delete an item 
   * @param string  $param[1] type of pattern "type" or "xxx.yyy.Type", type being user|permission|role  
   * @param int	 $param[1] item id
   * @param int	 $param[2] parent id
   * @return array 
   */
  function method_deleteItem($params)
  {
    $type       = (string)  $this->extractType($params[1]); 
    $itemId 		= (int)     $params[2];
    $parentId 	= (int)     $params[3];
    
    // get model and delete record
    $model = $this->getModel($type);
    $model->delete($itemId);

    if ( is_a( $model, "qcl_auth_user") or is_a( $model, "qcl_auth_permission") )
    {
    	$model->removeFromRole ( $itemId, $parentId );
    }
    
    // success
    $this->addMessage("qcl.auth.messages.{$type}.deleted",$itemId);
    
    return $this->getResult();
  }    

  /**
   * add user(s) to role(s)
   * @param null  $param[0] not used
   * @param mixed $param[1] (array or number) user refs (id or namedId)
   * @param mixed $param[2] (array or number) role refs (id or namedId)
   */
  function method_addUserToRole($params)
  {
  	$this->requirePermission("qcl.auth.permissions.manage");
  	
  	$userRefs 	= $params[1];
  	$roleRefs 	= $params[2];
  	
    // add
    $userModel = $this->getModel("user");
  	$userModel->addToRole($userRefs,$roleRefs); 
    
    // success
  	$this->addMessage("qcl.auth.messages.user.roleAdded",$userRefs);
  	return $this->getResult();
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
  	
  	$userRefs 	= $params[1];
  	$roleRefs 	= $params[2];

    // remove
    $userModel = $this->getModel("user");
  	$userModel->removeFromRole($userRefs,$roleRefs);

    // success
  	$this->addMessage("qcl.auth.messages.user.roleRemoved",$userRefs); 
  	return $this->getResult();
  }
  
  /**
   * add permission(s) to role(s)
   * @param mixed $param[1] (array or number) permission refs (id or namedId)
   * @param mixed $param[2] (array or number) role refs (id or namedId)
   */
  function method_addPermissionToRole($params)
  {
  	$userModel = $this->getModel("user");
    $userModel->requirePermission("qcl.auth.permissions.manage");
  	
  	$permRefs = $params[1];
  	$roleRefs = $params[2];
  	
    // add 
    $permModel = $this->getModel("permission");
  	$permModel->addToRole($permRefs,$roleRefs); 
    
    // success
  	$this->addMessage("qcl.auth.messages.permission.roleAdded",$permRefs);
  	return $this->getResult();
  }
   
  /**
   * removes permission(s) from role(s)
   * @param mixed $param[1] (array or number) permission refs (id or namedId)
   * @param mixed $param[2] (array or number) role refs (id or namedId)
   */
  function method_removePermissionFromRole($params)
  {
  	$userModel = $this->getModel("user");
    $userModel->requirePermission("qcl.auth.permissions.manage");
  	
  	$permRefs 	= $params[1];
  	$roleRefs   = $params[2];
  
    // remove
    $permModel = $this->getModel("permission");
  	$permModel->removeFromRole($permRefs,$roleRefs);
  
    // success
  	$this->addMessage("qcl.auth.messages.permission.roleRemoved",$permRefs); 
  	return $this->getResult();
  }

  //-------------------------------------------------------------
  // data for security editor
  //-------------------------------------------------------------
    
  /**
   * get treedatamodel of users and roles
   */
  function method_getUsersAndRoles($params)
  {         									
    $userModel  =& $this->getModel("user");
    $roleModel  =& $this->getModel("role");
    $permModel  =& $this->getModel("permission");           
		$result 		= array();
        
    // get lists of users and roles ordered by name
		$users 			= $userModel->getRowsWhere(null,$userModel->key_descriptiveName);
		$roles 			= $roleModel->getRowsWhere(null,$roleModel->key_descriptiveName);
		$userRoles	= $roleModel->getByUserId();
		$parentNodeIds	= array();
		
		foreach ( $roles as $index => $role )
		{
	    $roleId 	= $role[$roleModel->key_id];
	    $namedId	= $role[$roleModel->key_namedId];
			$name		  = $role[$roleModel->key_descriptiveName];
			$label 		= $name ? $name : $namedId;			    			 
			
		  $result[] = array(
	    	'parentNode'	=> 0,
	    	'isBranch'		=> true,
				'label'			  => $label,
				'bOpened'		  => true,
				'data'			  => array (
      										type	=> "qcl.auth.types.Role",
      										id		=> $roleId,
      										namedId	=> $namedId,
      										name	=> $name
      									)
			);				
			// parent node id to which the following nodes will be added
			$parentNodeIds[$roleId]=$index+1;
		}
		
		// render tree after creating users
		$result[] = array( 'command' => "render" );
		
    foreach ( $users as $index => $user )
    {
	    $userId 	= $user[$userModel->key_id];
	    $namedId	= $user[$userModel->key_namedId];
			$name		  = $user[$userModel->key_descriptiveName];
			$label 		= "$name ($namedId)";
			
			// add to roles
			$myRoleIds 	= $userRoles[$userId];
			
			foreach ( $myRoleIds as $roleId )	    		
			{
				$parentNodeId = $parentNodeIds[$roleId];
				
			    $result[] = array(
  					'parentNodeId'	=> $parentNodeId,
  					'bOpened'		    => true,
  					'label'			    => $label,
  					'icon'			    => $this->icon,
  					'iconSelected'	=> $this->icon,
  					'data'			    => array (
              									type	  => "qcl.auth.types.User",
              									id		  => $userId,
              									namedId	=> $namedId,
              									name	  => $name
              								)
				);
			}
    }	

		// return data
		$this->set( 'treedatamodel', $result );
		return $this->getResult();
  }

	/**
	 * synchronizes permissions on the client and the server
	 * @param array		$permissionsClient	
	 * @return void	
	 */
	function synchronizePermissions( $permissionsClient )
	{
    $userModel  =& $this->getModel("user");
    $roleModel  =& $this->getModel("role");
    $permModel  =& $this->getModel("permission");           

		$permissionsServer	= $permModel->getAllNamedIds();
		$unassignedRoleId	  = $roleModel->createIfNotExists("qcl.roles.Unassigned");
		
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
   * @param array 	$params[0]	list of named ids for synchronization (optional)
   * @return array treedatamodel
   */
  function method_getRolesAndPermissions( $params )
  {         												
		
    // synchronize permissions if sent from client
    $permissions = $params[0];
    if ( is_array ( $permissions ) )
		{
			$this->synchronizePermissions($permissions);
		}

    $userModel  =& $this->getModel("user");
    $roleModel  =& $this->getModel("role");
    $permModel  =& $this->getModel("permission");  
		$result 		= array();
        
    // get ordered lists of roles and permissions 
		$roles 				    = $roleModel->getAllRows($roleModel->key_descriptiveName);
		$permissions		  = $permModel->getAllRows($roleModel->key_descriptiveName . "`,`" . $permModel->key_namedId );
		$permissionRoles	= $permModel->getByRoleId();
		$parentNodeIds		= array();
		
		// create role nodes
		foreach ( $roles as $index => $role )
		{
	    $roleId 	= $role[$roleModel->key_id];
	    $namedId	= $role[$roleModel->key_namedId];
			$name		  = $role[$roleModel->key_descriptiveName];
			$label 		= "$name ($namedId)";			    			 
			
	    $result[] = array(
	    	'parentNode'	=> 0,
	    	'isBranch'		=> true,
				'label'			=> $label,
				'bOpened'		=> true,				
				'data'			=> array (
      									type	=> "qcl.auth.types.Role",
      									id		=> $roleId,
      									namedId	=> $namedId,
      									name	=> $name
      								)
			);				
			// parent node id to which the following nodes will be added
			$parentNodeIds[$roleId]=$index+1;
		}
		
		// render tree after creating roles
		$result[] = array( 'command' => "render" );

      foreach ( $permissions as $index => $perm )
      {
		    $permissionId 	= $perm[$permModel->key_id];
		    $namedId		    = $perm[$permModel->key_namedId];
  			$name			      = $perm[$permModel->key_descriptiveName];
  			$label 			    = $name? "$name ($namedId)" : $namedId;
  			
  			// add to roles
  			$myRoleIds 	= $permissionRoles[$permissionId];
  
  			foreach ( $myRoleIds as $roleId )	    		
  			{
  				$parentNodeId = $parentNodeIds[$roleId];
  			  $result[] = array(
  					'parentNodeId'	=> $parentNodeId,
  					'bOpened'		    => true,
  					'label'			    => $label,
  					'icon'			    => $permModel->icon,
  					'iconSelected'	=> $permModel->icon,
  					'data'			=> array (
  											type	=> "qcl.auth.types.Permission",
  											id		=> $permissionId,
  											namedId	=> $namedId,
  											name	=> $name
  										)
  				);
  			}
      }	

    	// return data
    	$this->set( 'treedatamodel', $result );
    	return $this->getResult();
    
  }
    
  /**
   * get individual permission node
   * @param $param[0] permission id
   * @param $param[1] parentNodeId
   * @return array treedatamodel
   */
  function method_getPermissionNode ( $params )
  {
		$permissionId = $params[0]; 
		$parentNodeId = $params[1];
      
    $userModel  = $this->getModel("user");
    $roleModel  = $this->getModel("role");
    $permModel  = $this->getModel("permission");        
		$result = array();
		
		$permission = $permModel->getById($permissionId);
    $namedId		= $permission[$permModel->key_namedId];
		$name			  = $permission[$permModel->key_descriptiveName];
		$label 			= $name? "$name ($namedId)" : $namedId;

    $result[] = array(
			'parentNodeId'	=> $parentNodeId,
			'bOpened'		    => true,
			'bSelected'		  => true,
			'label'			    => $label,
			'icon'			    => $permModel->icon,
			'iconSelected'	=> $permModel->icon,
			'data'			    => array (
									        type	  => "qcl.auth.types.Permission",
        									id		  => $permissionId,
        									namedId	=> $namedId,
        									name	  => $name
        								)
	  );		

		$this->set( 'treedatamodel', $result );
		return $this->getResult();
  }

  /**
   * get individual user node
   * @param $param[0] user id
   * @param $param[1] parentNodeId
   * @return array treedatamodel
   */
  function method_getUserNode ( $params )
  {
		$userId 		    = $params[0]; 
		$parentNodeId 	= $params[1];
    
    $userModel  = $this->getModel("user");
    $roleModel  = $this->getModel("role");
    $permModel  = $this->getModel("permission");   		
    $result         = array();
   
		$user = $this->getById($userId);

	  $namedId	      = $user[$userModel->key_namedId];
		$name		        = $user[$userModel->key_descriptiveName];
		$label 		      = "$name ($namedId)";
	
    $result[] = array(
			'parentNodeId'	=> $parentNodeId,
			'bOpened'		    => true,
			'bSelected'		  => true,			
			'label'			    => $label,
			'icon'			    => $this->icon,
			'iconSelected'	=> $this->icon,
			'data'			    => array (
        									type	=> "qcl.auth.types.User",
        									id		=> $userId,
        									namedId	=> $namedId,
        									name	=> $name
        								)
	  );

		$this->set( 'treedatamodel', $result );
		return $this->getResult();
  }
}
?>

