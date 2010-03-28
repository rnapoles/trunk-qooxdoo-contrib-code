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

qcl_import( "qcl_data_model_AbstractActiveRecord" );
qcl_import( "qcl_data_model_IActiveRecord" );
qcl_import( "qcl_data_model_db_PropertyBehavior" );
qcl_import( "qcl_data_model_db_QueryBehavior" );
qcl_import( "qcl_data_model_IRelationalModel" );
qcl_import( "qcl_data_model_db_RelationBehavior" );

/**
 * Abstrac class for models that are based on a relational
 * database.
 *
 * <b>Concepts:</b>
 * <ul>
 *  <li><b>model instance:</b> The instance of the active record class that can
 *      load model data for a given (named) id.</i>
 *  <li><b>record:</b> The data corresponding to a (namded) id</li>
 *  <li><b>id:</b> The number (integer) that identifies a model record in the model
 *      database</li>
 *  <li><b>named id:</b> The alphanumeric (string) identifier which can additionally
 *      be used as id in a NamedActiveRecord instance.</li>
 * </ul>
 * @todo use consistent vocabulary
 * @todo define interface
 */
class qcl_data_model_db_ActiveRecord
  extends    qcl_data_model_AbstractActiveRecord
//  implements qcl_data_model_IActiveRecord,
//             qcl_data_model_IRelationalModel
{

  //-------------------------------------------------------------
  // Clas properties
  //-------------------------------------------------------------



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
      "check"    => "integer"
    ),
    "created" => array(
      "nullable" => true,
      "check"    => "qcl_data_db_Timestamp",
      "sqltype"  => "timestamp",
      "nullable" => true,
      "init"     => null,
      "export"   => false
    ),
    "modified" => array(
      "check"    => "qcl_data_db_Timestamp",
      "sqltype"  => "current_timestamp",
      "nullable" => true,
      "init"     => null,
      "export"   => false
    )
  );

  /**
   * The name of the table that this model stores its data in.
   * If you don't provide a name here, the name of the class is
   * used.
   * @var string
   */
  protected $tableName;

  /**
   * Property behavior object. Access with getPropertyBehavior()
   * @var qcl_data_model_db_PropertyBehavior
   */
  private $propertyBehavior;

  /**
   * The query behavior object. Access with getQueryBehavior()
   * @var qcl_data_model_db_QueryBehavior
   */
  private $queryBehavior;

  /**
   * The relation behavior object. Access with getRelationBehavior()
   * @var qcl_data_model_db_RelationBehavior
   */
  private $relationBehavior;

  //-------------------------------------------------------------
  // Initialization
  //-------------------------------------------------------------

  function __construct()
  {
    $this->addProperties( $this->properties );
    parent::__construct();
  }

  //-------------------------------------------------------------
  // getters and setters
  //-------------------------------------------------------------

  /**
   * Getter for table name.
   * @return string
   */
  public function tableName()
  {
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
    if ( $this->propertyBehavior === null )
    {
      $this->propertyBehavior = new qcl_data_model_db_PropertyBehavior( $this );
    }
    return $this->propertyBehavior;
  }

  /**
   * Returns the query behavior.
   * @return qcl_data_model_db_QueryBehavior
   */
  public function getQueryBehavior()
  {
    if ( $this->queryBehavior === null )
    {
      $this->queryBehavior = new qcl_data_model_db_QueryBehavior( $this );
    }
    return $this->queryBehavior;
  }

  /**
   * Returns the relation behavior.
   * @return qcl_data_model_db_RelationBehavior
   */
  public function getRelationBehavior()
  {
    if ( $this->relationBehavior === null )
    {
      $this->relationBehavior = new qcl_data_model_db_RelationBehavior( $this );
      $this->relationBehavior->init();
    }
    return $this->relationBehavior;
  }

}
?>