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

qcl_import( "qcl_test_AbstractTestController");
qcl_import( "qcl_access_model_User" );


class class_qcl_test_access_ModelAccessControl
  extends qcl_test_AbstractTestController
{

  /**
   * Access control list. Determines what role has access to what kind
   * of information.
   * @var array
   */
  private $modelAcl = array(

    /*
     * access to user data
     */
    array(

      'datasource'  => "access",
      'modelType'   => "user",

      /*
       * which roles have generally access to this model?
       * Here: all
       */
      'roles'       => "*",

      /*
       * now we set up some rules
       */
      'rules'         => array(

        /*
         * anonymous and user can only read
         */
        array(
          'roles'       => array(
            QCL_ROLE_ANONYMOUS,
            "user"
          ),
          'access'      => array( QCL_ACCESS_READ ),
          'properties'  => array( NAMED_ID )
        ),

        /*
         * admin and manager can also write
         */
        array(
          'roles'       => array(
            "admin",
            "manager"
          ),
          'access'      => array(
            QCL_ACCESS_READ,
            QCL_ACCESS_WRITE,
            QCL_ACCESS_CREATE,
            QCL_ACCESS_DELETE
          ), // equvivalent to QCL_ACCESS_ALL or "*"
          'properties'  => "*"
        )
      )
    )
  );

  /**
   * Constructor. Adds model acl
   */
  function __construct()
  {
    parent::__construct();
    $this->addModelAcl( $this->modelAcl );
  }

  /**
   * @rpctest {
   *   "requestData" : {
   *     "service" : "qcl.test.access.ModelAccessControl",
   *     "method"  : "testModel",
   *     "timeout" : 30
   *   },
   *   "checkResult" : "OK"
   * }
   */
  public function method_testModel()
  {
    /*
     * programmatically log in as administrator
     */
    //qcl_log_Logger::getInstance()->setFilterEnabled(QCL_LOG_ACCESS,true);
    qcl_import( "qcl_access_Service" );
    $service = new qcl_access_Service();
    $service->method_authenticate("admin","admin");

    /*
     * read from the "access" datasources
     */
    $where = new stdClass();
    $where->anonymous = false;
    $users = $this->method_fetchValues( "access", "user", "namedId", $where );
    $this->assertEquals( array( "user1","user2","user3","admin" ), $users, null, __CLASS__, __LINE__ );

    $query = new stdClass();
    $query->properties = array( NAMED_ID, "name", "password" );
    $query->where = array( "anonymous" => false );
    $data = $this->method_fetchRecords( "access","user", $query );
    $expected =  array (
      array (
        'namedId' => 'user1',
        'name' => 'User 1',
        'password' => 'user1'
      ),
      array (
        'namedId' => 'user2',
        'name' => 'User 2',
        'password' => 'user2'
      ),
      array (
        'namedId' => 'user3',
        'name' => 'User 3',
        'password' => 'user3'
      ),
      array (
        'namedId' => 'admin',
        'name' => 'Administrator',
        'password' => 'admin'
      )
    );
    $this->assertEquals( $expected, $data, null, __CLASS__, __LINE__ );

    /*
     * create new user
     */
    $newUser = new stdClass();
    $newUser->namedId = "user4";
    $newUser->name = "User 4";
    $newUser->password = "user4";
    $this->method_createRecord("access","user", $newUser );
    $userModel = $this->getModel( "access", "user" );
    $userModel->load("user4");
    $this->assertEquals( "user4", $userModel->getPassword(), null, __CLASS__, __LINE__ );

    /*
     * change user property
     */
    $data = new stdClass();
    $data->email = "foo@bar.com";
    $this->method_updateRecord( "access", "user", "user4", $data );
    $userModel->load("user4");
    $this->assertEquals( $data->email, $userModel->getEmail(), null, __CLASS__, __LINE__ );

    /*
     * delete user
     */
    $this->method_deleteRecord( "access", "user", "user4" );
    $this->assertEquals( false, $userModel->namedIdExists('user4'), null, __CLASS__, __LINE__ );

    /*
     * now logout and try the same
     */
    $service->method_logout();

    /*
     * this should work
     */
    $where = new stdClass();
    $where->anonymous = false;
    $users = $this->method_fetchValues( "access", "user", "namedId", $where );
    $this->assertEquals( array( "user1","user2","user3","admin" ), $users, null, __CLASS__, __LINE__ );

    /*
     * the following test must all fail, otherwise there is a failure
     */
    try
    {
      $query = new stdClass();
      $query->properties = array( NAMED_ID, "name", "password" );
      $query->where = array( "anonymous" => false );
      $data = $this->method_fetchRecords( "access","user", $query );
      $failed = false;
    }
    catch( qcl_access_AccessDeniedException $e)
    {
      $this->warn( $e );
      $failed = true;
    }

    try
    {
      $newUser = new stdClass();
      $newUser->namedId = "user4";
      $newUser->name = "User 4";
      $newUser->password = "user4";
      $this->method_createRecord("access","user", $newUser );
      $userModel = $this->getModel( "access", "user" );
      $failed = false;
    }
    catch( qcl_access_AccessDeniedException $e)
    {
      $this->info( $e->getMessage() );
      $failed = true;
    }

    try
    {
      $data = new stdClass();
      $data->email = "foo@bar.com";
      $this->method_updateRecord( "access", "user", "user4", $data );
      $failed = false;
    }
    catch( qcl_access_AccessDeniedException $e)
    {
      $this->info( $e->getMessage() );
      $failed = true;
    }

    try
    {
      $this->method_deleteRecord( "access", "user", "user4" );
      $failed = false;
    }
    catch( qcl_access_AccessDeniedException $e)
    {
      $this->info( $e->getMessage() );
      $failed = true;
    }
    $this->assertEquals( true, $failed, null, __CLASS__, __LINE__ );

    return "OK";
  }
}
?>