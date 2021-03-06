<?php
require_once "qcl/access/controller.php";
require_once "qcl/persistence/db/Object.php";

/**
 * Service class containing test methods
 */
class class_qcl_access_Tests extends qcl_access_controller
{
  
  function method_dummy()
  {

    return $this->response();  
    
  }
  
  function method_testUser()
  {
    
    
    $logger =& $this->getLogger();
    $logger->setFilterEnabled("propertyModel",true);
        
    $user = either ($params[0], "admin");
    //$this->debug("Testing user $user");
    $userModel =& $this->getUserModel();
    $userModel->findByNamedId($user);
    
    if ( $userModel->foundSomething() )
    {
      $this->info($userModel->securityData() );
      $this->info($userModel->roles("namedId") );
    }
    else
    {
      $this->info("User $user not found.");
    }
    
    $logger->setFilterEnabled("propertyModel",false);
    $this->info("blabla!");
    echo"ljlljl";
    return $this->result();
  }
  
  function method_testRole()
  {
    $roleModel =& $this->getRoleModel();
    $roleModel->findByNamedId("bibliograph.roles.User");
    
    $this->info($roleModel->users('namedId'));
    
    $this->info($roleModel->permissions('namedId'));
    return $this->result();
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