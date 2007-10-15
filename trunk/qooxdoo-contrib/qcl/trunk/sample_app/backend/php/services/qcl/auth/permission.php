<?php

/**
 * class providing data on permissions
 * providing a backend to the qcl.auth client package
 * 
 * Class cannot be used directly, you need to subclass it 
 * in your application service class folder
 */

class qcl_auth_permission extends qcl_auth_common
{    

   //-------------------------------------------------------------
   // class variables, override if necessary
   //-------------------------------------------------------------

	var $table			= "permissions";
	var $icon 			= "icon/16/mimetypes/empty-x-encrypted.png";
	var $nodeType		= "qcl.auth.types.Permission";
	var $shortName		= "permission";
	var $foreignKey		= "permissionId";

   //-------------------------------------------------------------
   // internal methods 
   //-------------------------------------------------------------
   
   /**
    * constructor calls parent constructor for database intiatization
    */
   	function __construct()
   	{
		parent::__construct(); 	
   	}   

   //-------------------------------------------------------------
   // public non-rpc methods 
   //-------------------------------------------------------------
      
   /**
    * get a list of permissions for one or all roles
    * @param mixed $roleId null for all, array for a list of and integer for a single user id
    * @return array An array, key: roleId, values: array of roleIds
    */
   	function getByRoleId($roleId = null)
   	{
		$result = array();
		$sql = "SELECT * FROM {$this->table_link_roles_permissions} ";
		if ( ! is_null ( $roleId ) )
		{
			$roleIdList = implode (",", (array) $roleId );
			$sql .= "WHERE `{$this->role->foreignKey}` IN ($roleIdList)";
		}
		$rows = $this->db->getAllRows($sql);
		foreach ( $rows as $row )
		{
			$permissionId = $row[$this->foreignKey];
			$roleId = $row[$this->role->foreignKey];
			$result[$permissionId][] = $roleId; 
		}
		return $result;
   	} 

   /**
    * adds permission(s) to role(s) 
    * @param mixed $permissionRefs (array or single value) permission ref(s) (id or namedId)
    * @param mixed $roleRef (array or single value) role refs (id or namedId)
    */
    function addToRole( $permissionRefs, $roleRefs )
    {
    	$permissionRefs = (array) $permissionRefs;
    	$roleRefs 		= (array) $roleRefs;
    	
    	foreach ($permissionRefs as $permissionRef)
    	{
	    	$permissionId = $this->getIdFromRef($permissionRef);
	    	if ( ! $permissionId )
	    	{
	    		$this->raiseError("qcl_auth_permission::addToRole : Invalid permission reference: $permissionRef");
	    	}

	    	foreach ( $roleRefs as $roleRef )
	    	{
	    		$roleId = qcl_auth_role::getIdFromRef($roleRef);
	    		if ( !$roleId )
	    		{
	    			$this->raiseError("qcl_auth_permission::addToRole : Invalid role reference: $roleRef");
	    		} 
	    		$row = array();
	    		$row[$this->role->foreignKey] = $roleId;
	    		$row[$this->foreignKey] = $permissionId; 
	    		$this->db->insert($this->table_link_roles_permissions,$row);
	    	}
    	}
    	return true;
    }
   
   /**
    * removes role(s) from permission(s)
    * @param mixed $permissionRefs (array or single value) permission ref(s) (id or namedId)
    * @param mixed $roleRef (array or single value) role refs (id or namedId)
    */
    function removeFromRole( $permissionRefs, $roleRefs )
    {
    	$permissionRefs = (array) $permissionRefs;
    	$roleRefs 	= (array) $roleRefs;
    	
    	foreach ($permissionRefs as $permissionRef)
    	{
	    	$permissionId = $this->getIdFromRef($permissionRef);
	    	
	    	if ( ! $permissionId )
	    	{
	    		$this->raiseError("qcl_auth_permission::removeFromRole : Invalid permission reference: $permissionRef");
	    	}
	    	
	    	foreach ( $roleRefs as $roleRef )
	    	{
	    		$roleId = qcl_auth_role::getIdFromRef($roleRef);
	    		if ( !$roleId )
	    		{
	    			$this->raiseError("qcl_auth_permission::removeFromRole : Invalid role reference: $roleRef");
	    		} 
				$this->db->execute("
					DELETE FROM `{$this->table_link_roles_permissions}`
					WHERE 	`{$this->foreignKey}` = $permissionId
					AND 	`{$this->role->foreignKey}` = $roleId
				");
	    	}
    	}
    	return "OK";
    }   
   
   //-------------------------------------------------------------
   // public rpc methods 
   //-------------------------------------------------------------

   /**
    * add permission(s) to role(s)
    * @param null  $param[0] not used
    * @param mixed $param[1] (array or number) permission refs (id or namedId)
    * @param mixed $param[2] (array or number) role refs (id or namedId)
    */
    function method_addToRole($params)
    {
    	$this->user->requirePermission("qcl.auth.permissions.manage");
    	
    	$permissionRefs 	= $params[1];
    	$roleRefs 			= $params[2];
    	
    	$this->addToRole($permissionRefs,$roleRefs); 
    	$this->addMessage("qcl.auth.messages.permission.roleAdded",$permissionRefs);
    	return $this->getResult();
    }
   
   /**
    * removes permission(s) from role(s)
    * @param null  $param[0] not used
    * @param mixed $param[1] (array or number) permission refs (id or namedId)
    * @param mixed $param[2] (array or number) role refs (id or namedId)
    */
    function method_removeFromRole($params)
    {
    	$this->user->requirePermission("qcl.auth.permissions.manage");
    	
    	$permissionRefs 	= $params[1];
    	$roleRefs 			= $params[2];

    	$this->removeFromRole($permissionRefs,$roleRefs);

    	$this->addMessage("qcl.auth.messages.permission.roleRemoved",$permissionRefs); 
    	return $this->getResult();
    }
   
}


?>
