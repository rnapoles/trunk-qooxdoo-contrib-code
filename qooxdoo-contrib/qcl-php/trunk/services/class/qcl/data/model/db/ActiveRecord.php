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
require_once "qcl/data/db/__init__.php";
require_once "qcl/util/registry/Persist.php";
require_once "qcl/data/model/AbstractActiveRecord.php";


/**
 * Abstrac class for models that are based on a relational
 * database.
 * @todo define interface
 */
class qcl_data_model_db_ActiveRecord
  extends qcl_data_model_AbstractActiveRecord
{

  //-------------------------------------------------------------
  // Model properties
  //-------------------------------------------------------------

  /**
   * Property information for the property behavior. Similar to the
   * qooxdoo property definition syntax, with some additional features.
   * @see qcl_data_model_PropertyBehavior
   * @var array
   */
  private $properties = array(
    "id" => array(
      "check"    => "integer",
      "sqltype"  => "int(11)",
      "nullable" => false,
    ),
    "created" => array(
      "nullable" => true,
      "check"    => "DateTime",
      "sqltype"  => "timestamp",
      "init"     => null
    ),
    "modified" => array(
      "check"    => "DateTime",
      "sqltype"  => "timestamp",
      "nullable" => true,
      "init"     => null
    )
  );

  /**
   * The name of the table that this model stores its data in.
   * If you don't provide a name here, the name of the class is
   * used.
   * @var string
   */
  protected $tableName;

  //-------------------------------------------------------------
  // Initialization
  //-------------------------------------------------------------

  function __construct()
  {
    $this->addProperties( $this->properties );
    parent::__construct();
  }

  /**
   * Overrides the init method with an empty stub
   */
  protected function init(){}

  //-------------------------------------------------------------
  // getters and setters
  //-------------------------------------------------------------

  /**
   * Getter for table name. If no name is set, use class name
   * as table name
   * @return string
   */
  public function tableName()
  {
    if ( ! isset( $this->tableName ) )
    {
      $this->tableName = get_class( $this );
    }
    return $this->tableName;
  }

  //-------------------------------------------------------------
  // Behaviours
  //-------------------------------------------------------------

  /**
   * Returns the behavior object responsible for maintaining the object
   * properties and providing access to them.
   * @override
   * @return qcl_data_model_db_PropertyBehavior
   */
  public function getPropertyBehavior()
  {
    static $propertyBehavior = null;
    if ( $propertyBehavior === null )
    {
      require_once "qcl/data/model/db/PropertyBehavior.php";
      $propertyBehavior = new qcl_data_model_db_PropertyBehavior( $this );
    }
    return $propertyBehavior;
  }

  /**
   * Returns the query behavior.
   * @return qcl_data_model_db_QueryBehavior
   */
  public function getQueryBehavior()
  {
    static $queryBehavior = null;
    if ( $queryBehavior === null )
    {
      require_once "qcl/data/model/db/QueryBehavior.php";
      $queryBehavior = new qcl_data_model_db_QueryBehavior( $this );
    }
    return $queryBehavior;
  }
}
?>