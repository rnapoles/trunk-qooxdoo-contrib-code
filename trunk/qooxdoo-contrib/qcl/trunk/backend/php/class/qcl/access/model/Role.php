<?php
require_once "qcl/access/model/Common.php";

/**
 * class providing data on roles
 * providing a backend to the qcl.auth client package
 *
 * Class cannot be used directly, you need to subclass it
 * in your application service class folder
 */

class qcl_access_model_Role extends qcl_access_model_Common
{
   var $schemaXmlPath  = "qcl/access/model/Role.model.xml";

  /**
   * Returns singleton instance.
   * @static
   * @return qcl_access_model_Role
   */
  function &getInstance( $class=__CLASS__ )
  {
    return parent::getInstance( $class );
  }

  /**
   * Return the permission model containing only those
   * permissions that are connected to the current role
   * @return qcl_access_model_Permission
   */
  function &linkedPermissionModel( $properties="*")
  {
    $permModel =& qcl_access_model_Permission::getInstance();
    $permModel->findByLinkedModel( &$this,null,$properties);
    return $permModel;
  }

  /**
   * Returns a list of permissions connected to the current model.
   * @param string property name, defaults to "namedId"
   * @return array
   */
  function getPermissions( $prop="namedId" )
  {
    $permissions = array();
    $permModel =& $this->linkedPermissionModel();
    if ( $permModel->foundSomething() )
    {
      do
      {
        $permissions[] = $permModel->getProperty( $prop );
      }
      while( $permModel->nextRecord() );
    }
    return $permissions;
  }

  function getPermissionIds()
  {
    return $this->getPermissions("id");
  }


  /**
   * Return the user model containing only those
   * users that are connected to the current role
   * @return qcl_access_model_User
   */
  function &linkedUserModel( $properties="*")
  {
    $controller =& $this->getController();
    $userModel  =& $controller->getUserModel();
    $userModel->findByLinkedModel($this,null,$properties);
    return $userModel;
  }

   /**
   * Returns a list of users connected to the current model.
   * @param string property name, defaults to "namedId"
   */
  function getUsers($prop="namedId")
  {
    $users = array();
    $userModel =& $this->linkedUserModel($prop);
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

  function getUserIds()
  {
    return $this->getUses("id");
  }

}
?>
