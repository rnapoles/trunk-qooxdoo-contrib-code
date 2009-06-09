<?php
require_once "qcl/access/Common.php";

/**
 * class providing data on permissions
 * providing a backend to the qcl.auth client package
 * 
 * Class cannot be used directly, you need to subclass it 
 * in your application service class folder
 */

class qcl_access_Permission extends qcl_access_Common
{    
  
	
	/**
	 * Node type for drag & drop support
	 */
	var $nodeType = "qcl.auth.types.Permission";
	
	/**
	 * Short name for type
	 */
	var $shortName = "permission";

  /**
   * Returns singleton instance.
   * @static 
   * @return qcl_access_role 
   */  
  function &getInstance( $class=__CLASS__ )
  {
    return parent::getInstance( $class );
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
   * adds permission(s) to role(s) 
   * @param mixed $permissionRefs (array or single value) permission ref(s) (id or namedId)
   * @param mixed $roleRef (array or single value) role refs (id or namedId)
   */
  function addToRole( $permissionRefs, $roleRefs )
  {
    $this->raiseError("Not implemented");
  }
   
  /**
   * removes role(s) from permission(s)
   * @param mixed $permissionRefs (array or single value) permission ref(s) (id or namedId)
   * @param mixed $roleRef (array or single value) role refs (id or namedId)
   */
  function removeFromRole( $permissionRefs, $roleRefs )
  {
    $this->raiseError("Not implemented.");
  }
  
}
?>