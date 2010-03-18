<?php
/*
 * qcl - the qooxdoo component library
 *
 * http://qooxdoo.org/contrib/project/qcl/
 *
 * Copyright:
 *   2007-2010 Christian Boulanger
 *
 * License:
 *   LGPL: http://www.gnu.org/licenses/lgpl.html
 *   EPL: http://www.eclipse.org/org/documents/epl-v10.php
 *   See the LICENSE file in the project's top-level directory for details.
 *
 * Authors:
 *  * Christian Boulanger (cboulanger)
 */

require_once "qcl/test/AbstractTestController.php";

/**
 * Service class containing test methods for access package
 */
class class_qcl_test_access_Tests
  extends qcl_test_AbstractTestController
{

  /**
   * Tests the access mechanism
   * @return int
   * @rpctest {
   *   "requestData" : {
   *     "method" : "authenticate",
   *     "params" : [null]
   *   },
   *   "checkResult" : function( result )
   *   {
   *
   *     return "Expected: number > 0, got: " + count;
   *   }
   * }
   */
  public function method_testConnect()
  {

  }

  // rest is not migrated

  function method_dummy()
  {

    return $this->result();

  }

  function method_testUser()
  {


    $logger = $this->getLogger();
    $logger->setFilterEnabled("propertyModel",true);

    $user = either ($params[0], "admin");
    //$this->debug("Testing user $user");
    $userModel = $this->getUserModel();
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
    return $this->result();
  }

  function method_testRole()
  {
    $roleModel = $this->getRoleModel();
    $roleModel->findByNamedId("qcl.roles.User");

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
    $userModel = $this->getUserModel();
    $userModel->findByNamedId($username);
    return $userModel->hasPermission($permission);
  }
}
?>