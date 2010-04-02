<?php
/*
 * qcl - the qooxdoo component library
 *
 * http://qooxdoo.org/contrib/project/qcl/
 *
 * Copyright:
 *   2007-2009 Christian Boulanger
 *
 * License:
 *   LGPL: http://www.gnu.org/licenses/lgpl.html
 *   EPL: http://www.eclipse.org/org/documents/epl-v10.php
 *   See the LICENSE file in the project's top-level directory for details.
 *
 * Authors:
 *  * Christian Boulanger (cboulanger)
 */

qcl_import( "qcl_data_model_db_NamedActiveRecord" );

/**
 * Role class
 */
class qcl_access_model_Role2
  extends qcl_data_model_db_NamedActiveRecord
{

  /**
   * The table storing model data
   */
  protected $tableName = "data_Role";

  /**
   * Properties
   */
  private $properties = array(
    'name'  => array(
      'check'     => "string",
      'sqltype'   => "varchar(100)"
    ),
    'active'  => array(
      'check'     => "boolean",
      'sqltype'   => "int(1)",
      'nullable'  => false,
      'init'      => false
    )
  );

  /**
   * The foreign key of this model
   */
  protected $foreignKey = "RoleId";

  /**
   * Relations
   */
  private $relations = array(
    'Permission_Role' => array(
      'type'        => QCL_RELATIONS_HAS_AND_BELONGS_TO_MANY,
      'target'      => array( 'class' => "qcl_access_model_Permission2" )
    ),
    'User_Role' => array(
      'type'        => QCL_RELATIONS_HAS_AND_BELONGS_TO_MANY,
      'target'      => array( 'class' => "qcl_access_model_User2" )
    ),
  );

  /**
   * Constructor
   */
  function __construct()
  {
    parent::__construct();
    $this->addProperties( $this->properties );
    $this->addRelations( $this->relations, __CLASS__ );
  }

  /**
   * Returns singleton instance.
   * @static
   * @return qcl_access_model_Role2
   */
  public static function getInstance()
  {
    return qcl_getInstance(__CLASS__);
  }

  /**
   * Getter for permission model instance
   * @return qcl_access_model_Permission2
   */
  protected function getPermissionModel()
  {
    return $this->getRelationBehavior()->getTargetModel("Permission_Role");
  }

  /**
   * Getter for user model instance
   * @return qcl_access_model_User2
   */
  protected function getUserModel()
  {
    return $this->getRelationBehavior()->getTargetModel("User_Role");
  }

  /**
   * Returns a list of permissions connected to the current model record.
   * @return array
   */
  public function permissions()
  {
    $permModel = $this->getPermissionModel();
    $permModel->findLinkedModels( $this );
    $permissions =  array();
    while ( $permModel->loadNext() )
    {
      $permissions[] = $permModel->namedId();
    }
    return $permissions;
  }

  /**
   * Returns a list of users connected to the current model record.
   * @return array
   */
  public function users()
  {
    $userModel = $this->getUserModel();
    $userModel->findLinkedModels( $this );
    $users =  array();
    while ( $userModel->loadNext() )
    {
      $users[] = $userModel->namedId();
    }
    return $users;
  }
}
?>
