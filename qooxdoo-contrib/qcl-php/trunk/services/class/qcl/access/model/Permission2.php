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
 * Permission class
 */
class qcl_access_model_Permission2
  extends qcl_data_model_db_NamedActiveRecord
{
  /**
   * The table storing model data
   */
  protected $tableName = "data_Permission";

  /**
   * Properties
   */
  private $properties = array(
    'name'  => array(
      'check'     => "string",
      'sqltype'   => "varchar(100)"
    ),
    'description'  => array(
      'check'     => "string",
      'sqltype'   => "varchar(255)"
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
  protected $foreignKey = "PermissionId";

  /**
   * Relations
   */
  private $relations = array(
    'Permission_Role' => array(
      'type'        => QCL_RELATIONS_HAS_AND_BELONGS_TO_MANY,
      'target'      => array( 'class' => "qcl_access_model_Role2" )
    ),
//    'Permission_Config' => array(
//      'type'        => QCL_RELATIONS_HAS_MANY,
//      'target'      => array( 'class' => "qcl_config_ConfigModel" )
//    )
  );

  /**
   * Constructor
   */
  function __construct()
  {
    $this->addProperties( $this->properties );
    $this->addRelations( $this->relations, __CLASS__ );
    parent::__construct();
  }

  /**
   * Returns singleton instance.
   * @return qcl_access_model_Permission2
   */
  static function getInstance()
  {
    return qcl_getInstance(__CLASS__);
  }
}
?>