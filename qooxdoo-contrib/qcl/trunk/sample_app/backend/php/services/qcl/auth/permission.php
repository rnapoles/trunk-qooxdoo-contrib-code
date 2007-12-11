<?php
require_once ("qcl/auth/common.php");

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

	var $table			  = "permissions";
	var $icon 			  = "icon/16/mimetypes/empty-x-encrypted.png";
	var $nodeType		  = "qcl.auth.types.Permission";
	var $shortName		= "permission";
	var $foreignKey		= "permissionId";

  //-------------------------------------------------------------
  // internal methods 
  //-------------------------------------------------------------
 
  /**
   * constructor 
   */
 	function __construct($controller)
 	{
		parent::__construct(&$controller); 	
 	}   

  //-------------------------------------------------------------
  // public methods 
  //-------------------------------------------------------------
      
  /**
   * get a list of permissions for one or all roles
   * @param mixed $roleId null for all, array for a list of and integer for a single user id
   * @return array An array, key: roleId, values: array of roleIds
   */
 	function getByRoleId($roleId = null)
 	{
		$controller =& $this->getController();
    $roleModel  =& $controller->getModel("role");
    
    $result = array();
		$sql = "SELECT * FROM {$this->table_link_roles_permissions} ";
		if ( ! is_null ( $roleId ) )
		{
			$roleIdList = implode (",", (array) $roleId );
			$sql .= "WHERE `{$roleModel->foreignKey}` IN ($roleIdList)";
		}
		$rows = $this->db->getAllRows($sql);
		foreach ( $rows as $row )
		{
			$permissionId = $row[$this->foreignKey];
			$roleId = $row[$roleModel->foreignKey];
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
  	$controller =& $this->getController();
    $roleModel  =& $controller->getModel("role");
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
    		$roleId = $roleModel->getIdFromRef($roleRef);
    		if ( !$roleId )
    		{
    			$this->raiseError("qcl_auth_permission::addToRole : Invalid role reference: $roleRef");
    		} 
    		$row = array();
    		$row[$roleModel->foreignKey] = $roleId;
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
  	$controller =& $this->getController();
    $roleModel  =& $controller->getModel("role");
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
    		$roleId = $roleModel->getIdFromRef($roleRef);
    		if ( !$roleId )
    		{
    			$this->raiseError("qcl_auth_permission::removeFromRole : Invalid role reference: $roleRef");
    		} 
				$this->db->execute("
					DELETE FROM `{$this->table_link_roles_permissions}`
					WHERE 	`{$this->foreignKey}` = $permissionId
					AND 	`{$roleModel->foreignKey}` = $roleId
				");
    	}
  	}
  	return "OK";
  }   
}


?>
