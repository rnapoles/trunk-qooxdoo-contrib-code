<?php
require_once ("qcl/access/common.php");

/**
 * class providing data on permissions
 * providing a backend to the qcl.auth client package
 * 
 * Class cannot be used directly, you need to subclass it 
 * in your application service class folder
 */

class qcl_access_permission extends qcl_access_common
{    
  
  //-------------------------------------------------------------
  // class variables, override if necessary
  //-------------------------------------------------------------

	var $icon 			  = "icon/16/mimetypes/empty-x-encrypted.png";
	var $nodeType		  = "qcl.auth.types.Permission";
	var $shortName		= "permission";

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
    $roleModel  =& $controller->getRoleModel();
    
    $result = array();
		$sql = "SELECT * FROM {$this->table_link_roles_permissions} ";
		if ( ! is_null ( $roleId ) )
		{
			$roleIdList = implode (",", (array) $roleId );
			$sql .= "WHERE `{$roleModel->foreignKey}` IN ($roleIdList)";
		}
		$rows = $this->db->getAllRecords($sql);
		foreach ( $rows as $row )
		{
			$permissionId = $row[$this->foreignKey];
			$roleId = $row[$roleModel->foreignKey];
			$result[$permissionId][] = $roleId; 
		}
		return $result;
 	} 

  /**
   * creates a new permission. throws an error if permission already exists
   * @overridden
   * @param string $namedId
   * @param int[optional] $roleId 
   */
 	function create( $namedId, $roleId=null )
 	{
 	 	if ( ! $roleId )
 		{
   	  $controller =& $this->getController();
      $roleModel  =& $controller->getRoleModel();
   	  $roleId	    =  $roleModel->createIfNotExists("qcl.roles.Unassigned");
 		}
 		return parent::create( $namedId, $roleId );
 	}
 	
  /**
   * creates a new permission if it doesn't exist
   * @overridden
   * @param string $namedId
   * @param int[optional] $roleId 
   */
 	function createIfNotExists( $namedId, $roleId=null )
 	{
 		if ( $id = $this->namedIdExists ( $namedId ) )
 		{
 			return $id;
 		}
    return $this->create( $namedId, $roleId ); 	  
 	}
 	
  /**
   * adds permission(s) to role(s) 
   * @param mixed $permissionRefs (array or single value) permission ref(s) (id or namedId)
   * @param mixed $roleRef (array or single value) role refs (id or namedId)
   */
  function addToRole( $permissionRefs, $roleRefs )
  {
  	$controller =& $this->getController();
    $roleModel  =& $controller->getRoleModel();
   	$permissionRefs = (array) $permissionRefs;
  	$roleRefs 		= (array) $roleRefs;
    
  	foreach ($permissionRefs as $permissionRef)
  	{
    	$permissionId = $this->getIdFromRef($permissionRef);
    	if ( ! $permissionId )
    	{
    		$this->raiseError("qcl_access_permission::addToRole : Invalid permission reference: $permissionRef");
    	}

    	foreach ( $roleRefs as $roleRef )
    	{
    		$roleId = $roleModel->getIdFromRef($roleRef);
    		if ( !$roleId )
    		{
    			$this->raiseError("qcl_access_permission::addToRole : Invalid role reference: $roleRef");
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
    $roleModel  =& $controller->getRoleModel();
  	$permissionRefs = (array) $permissionRefs;
  	$roleRefs 	= (array) $roleRefs;
  	
  	foreach ($permissionRefs as $permissionRef)
  	{
    	$permissionId = $this->getIdFromRef($permissionRef);
    	
    	if ( ! $permissionId )
    	{
    		$this->raiseError("qcl_access_permission::removeFromRole : Invalid permission reference: $permissionRef");
    	}
    	
    	foreach ( $roleRefs as $roleRef )
    	{
    		$roleId = $roleModel->getIdFromRef($roleRef);
    		if ( !$roleId )
    		{
    			$this->raiseError("qcl_access_permission::removeFromRole : Invalid role reference: $roleRef");
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
