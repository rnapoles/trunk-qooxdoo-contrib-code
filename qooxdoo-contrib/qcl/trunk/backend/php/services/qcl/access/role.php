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

  /**
   * Icon representing this object
   */
	var $icon 				  = "icon/16/apps/system-users.png";
	
  /**
   * Node type for drag & drop support
   */	
	var $nodeType			  = "qcl.auth.types.Role";
	
  /**
   * Short name for type
   */  	
	var $shortName			= "role";
	
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
   * Return the permission model containing only those
   * permissions that are connected to the current role
   * @return qcl_access_role
   */
  function &getPermissionModel()
  {
    $controller =& $this->getController();
    $permModel  =& $controller->getPermissionModel();
    $permModel->findByLinkedId($this->getId(),"role");
    return $permModel;
  }   
  
  /**
   * Returns a list of permissions connected to the current model.
   * @param string property name, defaults to "id"
   */
  function permissions($prop="id")
  {
    $permissions = array();
    $permModel =& $this->getPermissionModel();
    if ( $permModel->foundSomething() )
    {
      do
      {
        $permissions[] = $permModel->getProperty($prop);
      }
      while( $permModel->nextRecord() );
    }  
    return $permissions;
  }
  
  /**
   * Return the user model containing only those
   * users that are connected to the current role
   * @return qcl_access_user
   */
  function &getUserModel()
  {
    $controller =& $this->getController();
    $userModel  =& $controller->getUserModel();
    $userModel->findByLinkedId($this->getId(),"role");
    return $userModel;
  }     
    
   /**
   * Returns a list of users connected to the current model.
   * @param string property name, defaults to "id"
   */
  function users($prop="id")
  {
    $users = array();
    $userModel =& $this->getUserModel();
    if ( $userModel->foundSomething() )
    {
      do
      {
        $users[] = $userModel->getProperty($prop);
      }
      while( $userModel->nextRecord() );
    }  
    return $users;
  }
  
}
?>
