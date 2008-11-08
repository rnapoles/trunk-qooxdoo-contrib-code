<?php
require_once "qcl/access/controller.php";

/**
 * Service class containing test methods
 */
class class_qcl_access_Tests extends qcl_access_controller
{
  
  function method_testUser()
  {
    $userModel =& $this->getUserModel();
    $userModel->findByNamedId('cboulanger');
    
    //$this->info($userModel->securityData());
    
    //$this->info($userModel->roles("namedId"));
    
    
  }
  
  function method_testRole()
  {
    $roleModel =& $this->getRoleModel();
    $roleModel->findByNamedId("bibliograph.roles.User");
    
    $this->info($roleModel->users('namedId'));
    
    $this->info($roleModel->permissions('namedId'));
    
  }

 
  /**
   * @return 
   * @param $params Object
   */
  function method_hasPermission($params)
  {
    list($username,$permission) = $params;
    $userModel =& $this->getUserModel();
    $userModel->findByNamedId($username);
    return $userModel->hasPermission($permission);
  }
}
?>