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
  // class variables
  //-------------------------------------------------------------

	var $icon 				  = "icon/16/apps/system-users.png";
	var $nodeType			  = "qcl.auth.types.Role";
	var $shortName			= "role";
	

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
		$roleId = $this->getIdFromRef($roleRef);
		if ( ! $roleId )
		{
			$this->raiseError("Ivalid role '$roleRef'.");
		}
    if ( $getNamedIds===true)
    {
      $this->findWhere("t1.{$this->col_id}=$roleId",null,array("","namedId"),"permission");
    }
    elseif ( $getNamedIds === false )
    {
      $this->findWhere("t1.{$this->col_id}=$roleId",null,array("","id"),"permission");
    }
    elseif ( is_null($getNamedIds) )
    {
      return $this->findWhere("t1.{$this->col_id}=$roleId",null,array("","*"),"permission");
    }
    return $this->getValues();
  }   

  /**
   * get a list of roles for one or all user
   * @param mixed $userId null for all, array for a list of and integer for a single user id
   * @return array An array, key: userId, values: array of roleIds
   */
  function getByUserId($userId = null)
  {
		$controller =&  $this->getController();
    $userModel  =&  $controller->getUserModel();
    
    $result = array();
		$sql = "SELECT * FROM {$this->table_link_user_roles} ";
		if ( ! is_null ( $userId ) )
		{
			$userIdList = implode (",", (array) $userId );
			$sql .= "WHERE `{$userModel->foreignKey}` IN ($userIdList)";
		}
		$rows = $this->db->getAllRecords($sql);
		foreach ( $rows as $row )
		{
			$userId = $row[$userModel->foreignKey];
			$roleId = $row[$this->foreignKey];
			$result[$userId][] = $roleId; 
		}
		return $userId ? $result[$userId] : $result;
  } 
}
?>
