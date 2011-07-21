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
qcl_import( "qcl_data_model_Model" );
qcl_import( "qcl_data_model_db_IModel" );
qcl_import( "qcl_data_model_db_PropertyBehavior" );
qcl_import( "qcl_data_model_db_QueryBehavior" );

/**
 * Model that can be persisted in a database.
 * For property definition, see qcl_data_model_db_PropertyBehavior.
 * @see qcl_data_model_db_PropertyBehavior
 */
class qcl_data_model_db_Model
  extends     qcl_data_model_Model
  implements  qcl_data_model_db_IModel
{

  //-------------------------------------------------------------
  // Model properties
  //-------------------------------------------------------------

  /**
   * The name of the table that this model stores its data in.
   * If you don't provide a name here, the name of the class is
   * used.
   * @var string
   */
  protected $tableName;

  /**
   * The property behavior object
   */
  private $propertyBehavior = null;

  /**
   * The query behavior object
   */
  private $queryBehavior = null;

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
    if ( $queryBehavior === null )
    {
      $queryBehavior = new qcl_data_model_db_QueryBehavior( $this );
    }
    return $queryBehavior;
  }


}
?>