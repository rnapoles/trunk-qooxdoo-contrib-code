<?php

/*
 * qooxdoo - the new era of web development
 *
 * http://qooxdoo.org
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
qcl_import( "qcl_data_model_db_ActiveRecord" );

class User extends qcl_data_model_db_ActiveRecord
{
  /*
   * Model properties. Foreign key properties will be
   * automatically created
   */
  private $properties = array(
    "name" => array(
      "check"     => "string",
      "sqltype"   => "varchar(32)"
    )
  );

  /*
   * table in which to store the model data.
   * Can be omitted,  Default to "data_" plus class name
   * (here: "data_User")
   */
  protected $tableName = "data_User";

  /*
   * the key with which the model id is identified in
   * "foreign" tables. Can be omitted, defaults to
   * class name plus "Id" (here, "UserId")
   */
  protected $foreignKey = "UserId";

  /*
   * relations (associations) of the model
   */
  private $relations = array(
    /*
     * user belongs to exactly one group
     */
    "User_Group" => array(
      "type"      => QCL_RELATIONS_HAS_ONE, //"n:1"
      "target"    => array( "class" => "Group")
    ),

    /*
     * user belongs to several categories
     * the "jointable" key can can be omitted, defaults to "join_" plus
     * relation name (here, "join_user_category")
     */
    "User_Category" => array(
      "type"      => QCL_RELATIONS_HAS_AND_BELONGS_TO_MANY,  // "n:n"
      "jointable" => "join_user_category", // can be omitted, see above
      "target"    => array( "class" => "Category" )
    ),

    /*
     * users have a history of actions which needs to be
     * deleted when the user is deleted
     */
    "User_History" => array(
      "type"    => QCL_RELATIONS_HAS_MANY, // "1:n"
      "target"  => array(
        "class"     => "History",
        "dependent" => true // dependent targets are removed upon deletion of the "parent" model record
      )
    )
  );

  /**
   * Constructor. Initializes the properties and relationships
   */
  function __construct()
  {
    $this->resetBehaviors(); // comment this out when in production

    $this->addProperties( $this->properties );
    $this->addRelations( $this->relations, __CLASS__ );
    parent::__construct();
  }
}

class Group extends qcl_data_model_db_ActiveRecord
{
  private $properties = array(
    "name" => array(
      "check"     => "string",
      "sqltype"   => "varchar(32)"
    )
  );

  private $relations = array(
    /*
     * group has many users
     */
    "User_Group" => array(
      "type"      => QCL_RELATIONS_HAS_MANY, // "1:n"
      "target"    => array( "class" => "User" )
    )
  );

  function __construct()
  {
    $this->addProperties( $this->properties );
    $this->addRelations( $this->relations, __CLASS__ );
    parent::__construct();
  }
}

/**
 * Categories
 */
class Category extends qcl_data_model_db_ActiveRecord
{

  private $properties = array(
    "name" => array(
      "check"     => "string",
      "sqltype"   => "varchar(32)"
    )
  );

  private $relations = array(
    /*
     * A category has many users and the other way round
     */
    "User_Category" => array(
      "type"      => QCL_RELATIONS_HAS_AND_BELONGS_TO_MANY, //  "n:n"
      "target"    => array( "class" => "User" )
    )
  );

  function __construct()
  {
    parent::__construct();
    $this->addProperties( $this->properties );
    $this->addRelations( $this->relations, __CLASS__ );

  }
}



class History extends qcl_data_model_db_ActiveRecord
{

  private $relations = array(
    /*
     * A history record belongs to exactly one user and
     * will be deleted with that user (this is set up in
     * the "relations/user_history/target/dependent" entry
     * in the User model class).
     */
    "User_History" => array(
      "type"      => QCL_RELATIONS_HAS_ONE, // "n:1"
      "target"    => array(
        "class" => "User"
      )
    ),
    /*
     * A history record is also linked to an Action
     * model
     */
    "Action_History" => array(
      "type"      => QCL_RELATIONS_HAS_ONE, //  "n:1"
      "target"    => array(
        "class" => "Action"
      )
    )
  );

  function __construct()
  {
    $this->addRelations( $this->relations, __CLASS__ );
    parent::__construct();
  }
}

class Action extends qcl_data_model_db_ActiveRecord
{

  private $properties = array(
    "description" => array(
      "check"     => "string",
      "sqltype"   => "varchar(32)"
    )
  );

  private $relations = array(
    "Action_History" => array(
      "type"      => QCL_RELATIONS_HAS_MANY, // same as "1:n"
      "target"    => array(
        "class"   => "History"
      )
    )
  );

  function __construct()
  {
    $this->addProperties( $this->properties );
    $this->addRelations( $this->relations, __CLASS__ );
    parent::__construct();
  }
}

/**
 * Service class containing test methods
 */
class class_qcl_test_data_model_db_RelationalModel
  extends qcl_test_AbstractTestController
{

  public function method_testModel()
  {

    $user     = new User();
    $history  = new History();
    $action   = new Action();
    $group    = new Group();
    $category = new Category();

    /*
     * create users
     */
    $user->deleteAll();
    $users = array(
      "mehmet", "ling", "john",
      "fritz", "cathrine", "peer",
      "enrico", "anusheh","akiko"
    );
    foreach( $users as $name )
    {
      $user->create( array( "name" => $name ) );
    }




    /*
     * create groups
     */
    $group->deleteAll();
    $groups = array( "customer", "employee", "manager" );
    foreach( $groups as $name )
    {
      $group->create( array( "name" => $name ) );
    }

    /*
     * create category
     */
    $category->deleteAll();
    $categories = array( "music", "sports", "health", "computer" );
    foreach( $categories as $name )
    {
      $category->create( array( "name" => $name ) );
    }

    /*
     * create user-group relations
     */
    $groups = array(
      "customer"  => array( "fritz", "cathrine","anusheh", "enrico" ),
       "employee" => array( "ling", "john","peer" ),
       "manager"  => array( "mehmet","akiko" )
    );
    foreach( $groups as $groupName => $users )
    {
      $this->info("Adding users to group '$groupName'");
      $group->loadWhere( array( "name" => $groupName ) );
      foreach ( $users as $userName )
      {
        $this->info("   Adding user '$userName'...");
        $user->loadWhere( array( "name" => $userName ) );
        $group->linkModel( $user );
        $this->assertEquals(true, $group->islinkedModel( $user ) );

//        $this->info("   Removing user '$userName'...");
        $group->unlinkModel( $user );
        $this->assertEquals(false, $group->islinkedModel( $user ) );

//        $this->info("   Re-adding user '$userName'...");
        $group->linkModel( $user );
        $this->assertEquals(true, $group->islinkedModel( $user ) );
      }
    }

    /*
     * create user-category relations
     */
    $categories = array(
       "music"    => array( "fritz", "cathrine","anusheh", "ling" ),
       "sports"   => array( "ling", "john","cathrine", "mehmet"),
       "health"   => array( "mehmet","akiko",  "enrico" ),
       "computer" => array( "fritz", "anusheh", "enrico", "peer", "ling" )
    );
    foreach( $categories as $categoryName => $users )
    {
      $this->info("Adding users to category '$categoryName'");
      $category->loadWhere( array( "name" => $categoryName ) );
      foreach ( $users as $userName )
      {
        $this->info("   Adding user '$userName'...");
        $user->loadWhere( array( "name" => $userName ) );
        $category->linkModel( $user );
        $this->assertEquals(true, $category->islinkedModel( $user ) );

//        $this->info("   Removing user '$userName'...");
        $category->unlinkModel( $user );
        $this->assertEquals(false, $category->islinkedModel( $user ) );

//        $this->info("   Re-adding user '$userName'...");
        $category->linkModel( $user );
        $this->assertEquals(true, $category->islinkedModel( $user ) );
      }
    }

    $this->info("Creating random user history...");
    $history->deleteAll();
    $action->deleteAll();

    /*
     * create actions
     */
    $actions = array(
      "logged on", "logged off", "bought stuff",
      "wrote review","asked question","answered question"
    );
    foreach ( $actions as $description )
    {
      $action->create( array(
        'description' => $description
      ) );
    }

    /*
     * create a user history
     */
    foreach( $users as $name )
    {
      /*
       * load the user record
       */
      $user->loadWhere( array( 'name' => $name ) );

      for( $i=0; $i < rand( 5,10 ); $i++)
      {
        /*
         * load a random action record
         */
        $action->load( rand(1,6) );

        /*
         * create a history record and link it to the action
         */
        $history->create();
        $history->linkModel( $action );

        /*
         * link the user and the history record
         */
        $user->linkModel( $history );

//        $this->info( sprintf(
//          "  %s: %s %s",
//          $history->getCreated(), $user->getName(), $action->getDescription()
//        ) );
      }
    }

    //$this->startLogging();

    /*
     * iterate through the groups.
     */
    $q1 = $group->findAll();
    $this->assertEquals(3, $q1->getRowCount() );
    $this->info( sprintf( "We have %s groups", $q1->getRowCount() ), null, __CLASS__,__METHOD__ );

    while( $group->nextRecord() )
    {
      $q2 = $user->findLinkedModels( $group );
      $members = array();
      while( $user->nextRecord() )
      {
        $members[] = $user->getName();
      }
      $this->info( sprintf(
        "Group '%s' has %s members: %s",
        $group->getName(), $q2->getRowCount(), implode( ",", $members )
      ) );
    }

    /*
     * delete a user, this should delete his/her history
     */
    $user->loadWhere( array( 'name' => "peer" ) );
    $id = $user->id();
    $count = $history->find( new qcl_data_db_Query( array(
      'where' => array( 'UserId' => $id )
    ) ) );
    $this->info("'peer' has $count history records.");

    $this->info("Deleting user 'peer' with id#$id");
    $user->delete();

    $this->assertEquals( 0, $user->countWhere( array( 'name' => "peer" ) ) , null, __CLASS__,__METHOD__);

    $count = $history->find( new qcl_data_db_Query( array(
      'where' => array( 'UserId' => $id )
    ) ) );
    $this->info("'peer' has $count history records.");
    $this->assertEquals( 0, $count , null, __CLASS__,__METHOD__);

    /*
     * Cleanup
     */
    $user->destroy();
    $group->destroy();
    $category->destroy();
    $action->destroy();
    $history->destroy();

    return "OK";
  }


  function startLogging()
  {
    //$this->getLogger()->setFilterEnabled( QCL_LOG_DB, true );
    $this->getLogger()->setFilterEnabled( QCL_LOG_TABLES, true );
    $this->getLogger()->setFilterEnabled( QCL_LOG_MODEL, true );
    $this->getLogger()->setFilterEnabled( QCL_LOG_PROPERTIES, true );
    $this->getLogger()->setFilterEnabled( QCL_LOG_MODEL_RELATIONS, true );
  }

  function endLogging()
  {
    $this->getLogger()->setFilterEnabled( QCL_LOG_DB, false );
    $this->getLogger()->setFilterEnabled( QCL_LOG_TABLES, false );
    $this->getLogger()->setFilterEnabled( QCL_LOG_MODEL, true );
    $this->getLogger()->setFilterEnabled( QCL_LOG_PROPERTIES, false );
    $this->getLogger()->setFilterEnabled( QCL_LOG_MODEL_RELATIONS, false );
  }
}

?>