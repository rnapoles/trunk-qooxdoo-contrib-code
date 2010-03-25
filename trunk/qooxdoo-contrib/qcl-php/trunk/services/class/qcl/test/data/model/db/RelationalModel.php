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
   * table in which to store the model data
   */
  protected $tableName = "test_relational_users";

  /*
   * model properties
   */
  private $properties = array(
    "name" => array(
      "check"     => "string",
      "sqltype"   => "varchar(32)"
    ),
    "groupId" => array(
      "check"     => "integer",
      "sqltype"   => "int(11)"
    )
  );

  /*
   * model relationships
   */
  protected $foreignKey = "userId";

  private $relations = array(
    /*
     * user belongs to exactly one group
     */
    "user_group" => array(
      "type"      => "n:1", // same as QCL_RELATIONS_HAS_ONE
      "target"    => array( "class" => "Group")
    ),

    /*
     * user belongs to several categories
     */
    "user_category" => array(
      "type"      => "n:n", // same as QCL_RELATIONS_HAS_AND_BELONGS_TO_MANY
      "jointable" => "test_relational_join_user_category",
      "target"    => array( "class" => "Category" )
    )
  );

  /**
   * Constructor. Initializes the properties and relationships
   */
  function __construct()
  {
    $this->addProperties( $this->properties );
    $this->addRelations( $this->relations );
    parent::__construct();
  }
}

class Group extends qcl_data_model_db_ActiveRecord
{

  protected $tableName = "test_relational_groups";

  protected $foreignKey = "groupId";

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
    "user_group" => array(
      "type"      => QCL_RELATIONS_HAS_MANY, // same as "1:n"
      "target"    => array( "class" => "User" )
    )
  );

  function __construct()
  {
    $this->addProperties( $this->properties );
    $this->addRelations( $this->relations );
    parent::__construct();
  }
}

class Category extends qcl_data_model_db_ActiveRecord
{

  protected $tableName = "test_relational_categories";

  protected $foreignKey = "categoryId";

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
    "user_category" => array(
      "type"      => QCL_RELATIONS_HAS_AND_BELONGS_TO_MANY, // == "n:n"
      "jointable" => "test_relational_join_user_category",
      "target"    => array( "class" => "User" )
    )
  );

  function __construct()
  {
    $this->addProperties( $this->properties );
    $this->addRelations( $this->relations );
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


    /*
     * create users
     */
    $user = new User();
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
    $group = new Group();
    $group->deleteAll();
    $groups = array( "customer", "employee", "manager" );
    foreach( $groups as $name )
    {
      $group->create( array( "name" => $name ) );
    }

    /*
     * create category
     */
    $category = new Category();
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

        $this->info("   Removing user '$userName'...");
        $group->unlinkModel( $user );
        $this->assertEquals(false, $group->islinkedModel( $user ) );

        $this->info("   Re-adding user '$userName'...");
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

        $this->info("   Removing user '$userName'...");
        $category->unlinkModel( $user );
        $this->assertEquals(false, $category->islinkedModel( $user ) );

        $this->info("   Re-adding user '$userName'...");
        $category->linkModel( $user );
        $this->assertEquals(true, $category->islinkedModel( $user ) );
      }
    }

    $this->endLogging();
    return "OK";
  }


  function startLogging()
  {
    //$this->getLogger()->setFilterEnabled( QCL_LOG_DB, true );
    $this->getLogger()->setFilterEnabled( QCL_LOG_TABLES, true );
    $this->getLogger()->setFilterEnabled( QCL_LOG_MODEL_RELATIONS, true );
  }

  function endLogging()
  {
    $this->getLogger()->setFilterEnabled( QCL_LOG_DB, false );
    $this->getLogger()->setFilterEnabled( QCL_LOG_TABLES, false );
    $this->getLogger()->setFilterEnabled( QCL_LOG_MODEL_RELATIONS, false );
  }
}

?>