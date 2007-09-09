<?php

// dependencies
require_once SERVICE_PATH . "sample_app/auth/__init__.php";
require_once SERVICE_PATH . "qcl/locale/manager.php";

/**
 * Service class providing data to authConfig fronend 
 */

class class_authConfig extends class_user
{    

   //-------------------------------------------------------------
   // class variables
   //-------------------------------------------------------------

   //-------------------------------------------------------------
   // internal methods 
   //-------------------------------------------------------------

   /**
    * constructor
    */
   	function __construct()
   	{
		parent::__construct();
   	}  

   //-------------------------------------------------------------
   // public rpc methods 
   //-------------------------------------------------------------
    
    /**
     * get treedatamodel of users and roles
     */
    function method_getUsersAndRoles($params)
    {         									
		$result 		= array();
        
        // get lists of users and roles ordered by name
		$users 			= $this->getAll($this->key_descriptiveName);
		$roles 			= $this->role->getAll($this->role->key_descriptiveName);
		$userRoles		= $this->role->getByUserId();
		$parentNodeIds	= array();
		
		foreach ( $roles as $index => $role )
		{
		    $roleId 	= $role[$this->role->key_id];
		    $namedId	= $role[$this->role->key_namedId];
			$name		= $role[$this->role->key_descriptiveName];
			$label 		= $name ? $name : $namedId;			    			 
			
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
		
		// render tree after creating users
		$result[] = array( 'command' => "render" );
		
        foreach ( $users as $index => $user )
        {
		    $userId 	= $user[$this->key_id];
		    $namedId	= $user[$this->key_namedId];
			$name		= $user[$this->key_descriptiveName];
			$label 		= "$name ($namedId)";
			
			// add to roles
			$myRoleIds 	= $userRoles[$userId];
			
			foreach ( $myRoleIds as $roleId )	    		
			{
				$parentNodeId = $parentNodeIds[$roleId];
				
			    $result[] = array(
					'parentNodeId'	=> $parentNodeId,
					'bOpened'		=> true,
					'label'			=> $label,
					'icon'			=> $this->icon,
					'iconSelected'	=> $this->icon,
					'data'			=> array (
											type	=> "qcl.auth.types.User",
											id		=> $userId,
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
     * get treedatamodel of roles and permissions
     */
    function method_getRolesAndPermissions( )
    {         												
		$result 		= array();
        
        // get ordered lists of roles and permissions 
		$roles 				= $this->role->getAll($this->role->key_descriptiveName);
		$permissions		= $this->permission->getAll($this->permission->key_namedId);
		$permissionRoles	= $this->permission->getByRoleId();
		$parentNodeIds		= array();
		
		foreach ( $roles as $index => $role )
		{
		    $roleId 	= $role[$this->role->key_id];
		    $namedId	= $role[$this->role->key_namedId];
			$name		= $role[$this->role->key_descriptiveName];
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
		
		// render tree after creating users
		$result[] = array( 'command' => "render" );

        foreach ( $permissions as $index => $permission )
        {
		    $permissionId 	= $permission[$this->permission->key_id];
		    $namedId		= $permission[$this->permission->key_namedId];
			$name			= $permission[$this->permission->key_descriptiveName];
			$label 			= $name? "$name ($namedId)" : $namedId;
			
			// add to roles
			$myRoleIds 	= $permissionRoles[$permissionId];

			foreach ( $myRoleIds as $roleId )	    		
			{
				$parentNodeId = $parentNodeIds[$roleId];
				
			    $result[] = array(
					'parentNodeId'	=> $parentNodeId,
					'bOpened'		=> true,
					'label'			=> $label,
					'icon'			=> $this->permission->icon,
					'iconSelected'	=> $this->permission->icon,
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
		$result = array();
		
		$permission = $this->permission->getById($permissionId);

	    $namedId		= $permission[$this->permission->key_namedId];
		$name			= $permission[$this->permission->key_descriptiveName];
		$label 			= $name? "$name ($namedId)" : $namedId;

	    $result[] = array(
			'parentNodeId'	=> $parentNodeId,
			'bOpened'		=> true,
			'bSelected'		=> true,
			'label'			=> $label,
			'icon'			=> $this->permission->icon,
			'iconSelected'	=> $this->permission->icon,
			'data'			=> array (
									type	=> "qcl.auth.types.Permission",
									id		=> $permissionId,
									namedId	=> $namedId,
									name	=> $name
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
		$userId 		= $params[0]; 
		$parentNodeId 	= $params[1];
		$result = array();
		
		$user = $this->getById($userId);

	    $namedId	= $user[$this->key_namedId];
		$name		= $user[$this->key_descriptiveName];
		$label 		= "$name ($namedId)";
		
	    $result[] = array(
			'parentNodeId'	=> $parentNodeId,
			'bOpened'		=> true,
			'bSelected'		=> true,			
			'label'			=> $label,
			'icon'			=> $this->icon,
			'iconSelected'	=> $this->icon,
			'data'			=> array (
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

