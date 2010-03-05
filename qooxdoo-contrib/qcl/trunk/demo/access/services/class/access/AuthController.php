<?php
require_once "qcl/access/SessionController.php";

/**
 * Service class exposing the methods of the parent class
 */
class class_access_AuthController
  extends qcl_access_SessionController
{

  /**
   * Tests the persistence of an object.
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


}
?>