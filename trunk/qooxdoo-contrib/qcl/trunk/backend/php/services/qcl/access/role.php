<?php
require_once ("qcl/access/common.php");

/**
 * class providing data on roles
 * providing a backend to the qcl.auth client package
 * 
 * Class cannot be used directly, you need to subclass it 
 * in your application service class folder
 */

class qcl_access_role extends qcl_access_common
{    
  //-------------------------------------------------------------
  // class variables, override if necessary
  //-------------------------------------------------------------

	var $table				  = "roles";
	var $icon 				  = "icon/16/apps/system-users.png";
	var $nodeType			  = "qcl.auth.types.Role";
	var $shortName			= "role";
	var $foreignKey			= "roleId";
	
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
  // public non rpc methods 
  //-------------------------------------------------------------
  
  /**
   * get list of permission (ids) that belong to a role
   * @param mixed $roleRef role name or id
   * @param boolean $getNamedIds 
   * 	If true (default), get the names of the permissions,
   * 	if null, return all the whole rows ,
   * 	otherwise just ids
   * @return array Array of string names or numeric ids 
   */
  function getPermissions($roleRef,$getNamedIds=true)
  {
    $controller =& $this->getController();		
    $permModel  =& $controller->getModel("permission");
		
		$roleId = $this->getIdFromRef($roleRef);
		if ( ! $roleId )
		{
			$this->raiseError("qx::security::role::getPermissions : invalid role reference '$roleRef'.");
		}

		if ($getNamedIds === null)
		{
			return $this->db->getAllRows("
				SELECT
					p.*
				FROM 
					`{$permModel->table}` as p,
					`{$this->table_link_roles_permissions}` as l
				WHERE
					p.`{$permModel->key_id}` = l.`{$permissionModel->foreignKey}`
					AND l.`{$this->foreignKey}` = $roleId
			"); 

		}
		$rows = $this->db->getAllRows("
			SELECT
				p.`{$permModel->key_id}` as id,
				p.`{$permModel->key_namedId}` as namedId
			FROM 
				`{$permModel->table}` as p,
				`{$this->table_link_roles_permissions}` as l
			WHERE
				p.`{$permModel->key_id}` = l.`{$permModel->foreignKey}`
				AND l.`{$this->foreignKey}` = $roleId
		");
		
		$result = array();
		foreach ( $rows as $row )
		{
			$result[] = $getNamedIds ? $row['namedId'] : (int) $row['id'];
		}
		return $result;
  }   

  /**
   * get a list of roles for one or all user
   * @param mixed $userId null for all, array for a list of and integer for a single user id
   * @return array An array, key: userId, values: array of roleIds
   */
  function getByUserId($userId = null)
  {
		$controller =&  $this->getController();
    $userModel  =&  $controller->getModel("user");
    
    $result = array();
		$sql = "SELECT * FROM {$this->table_link_user_roles} ";
		if ( ! is_null ( $userId ) )
		{
			$userIdList = implode (",", (array) $userId );
			$sql .= "WHERE `{$userModel->foreignKey}` IN ($userIdList)";
		}
		$rows = $this->db->getAllRows($sql);
		foreach ( $rows as $row )
		{
			$userId = $row[$userModel->foreignKey];
			$roleId = $row[$this->foreignKey];
			$result[$userId][] = $roleId; 
		}
		return $result;
  } 
}
?>
