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
require_once "qcl/data/model/PropertyBehavior.php";

/**
 * Extending the property behavior of qcl_data_model_PropertyBehavior
 * with sql database support. This property behavior is to be used
 * by subclasses of qcl_data_model_AbstractActiveRecord, which already
 * defines the properties "id", "created", "modified".
 *
 * Since the properties will be persisted in the database, non-scalar
 * value types will be serialized to a string representation. (not
 * implemented yet).
 *
 * This behavior adds the following keys to the property definition:
 *
 * 'sqltype' => The full definition of a column in a database table
 *              as it would be used in a CREATE TABLE statement.
 *              Support for a more fine-grained type definition will
 *              be added later, which will make this feature more
 *              portable across database drivers.
 *
 *              If you want to store non-scalar values, make sure to use
 *              data type (such as LONGTEXT or BLOB) that will be able to
 *              store adequately long strings or binary data.
 *              (not implemented yet)
 *
 * <pre>
 * private $properties = array(
 *   "foo" => array(
 *     "check"    => "string",
 *     "init"     => "foo",
 *     "nullable" => true,
 *     "sqltype"  => "varchar(50)"
 *    ),
 *    "bar"  => array(
 *      "check"     => "integer",
 *      "init"      => 1,
 *      "nullable"  => true,
 *      "sqltype"   => "int(11)"
 *    ),
 *    "baz"  => array(
 *      "check"     => "boolean",
 *      "init"      => true,
 *      "nullable"  => false,
 *      "sqltype"   => "int(1)"
 *    ),
 * );
 *
 * function __construct()
 * {
 *   $this->addProperties( $this->properties );
 *   parent::__construct();
 * }
 * </pre>
 *
 *
 * @see qcl_data_model_db_PropertyBehavior
 */
class qcl_data_model_db_PropertyBehavior
  extends qcl_data_model_PropertyBehavior
{
  /**
   * A registry to check if a table has already been initialized
   * @var array
   */
  private static $tables_initialized = array();

  /**
   * Getter for managed model
   * @return qcl_data_model_db_ActiveRecord
   */
  protected function getModel()
  {
    return parent::getObject();
  }

  /**
   * Constructor. Creates table if it doesn't already exist.
   * @param qcl_data_model_db_ActiveRecord $model
   */
  function __construct( qcl_data_model_db_ActiveRecord $model )
  {
    parent::__construct( $model );

    /*
     * check if table exists, otherwise create
     */
    $tableName = $model->tableName();

    if ( ! self::$tables_initialized[$tableName] )
    {
      $table = $model->getQueryBehavior()->getTable();
      if( ! $table->exists() )
      {
        $table->create();
      }
      self::$tables_initialized[$tableName] = true;
    }
  }

  /**
   * Adds a property definition. Sets up the corresponding
   * table column if it doesn't already exist.
   * @param array $properties
   * @return void
   */
  public function add( $properties )
  {
    parent::add( $properties );

    $model = $this->getModel();
    $behav = $model->getQueryBehavior();
    $table = $behav->getTable();

    foreach( $properties as $name => $prop )
    {
      /*
       * skip "id" column since it is created by default
       */
      if ( $name == "id" ) continue;

      $sqltype = $prop['sqltype'];

      /*
       * 'CURRENT_TIMESTAMP'
       */
      if( strtolower($sqltype) == "current_timestamp" )
      {
        $sqltype = $behav->getAdapter()->currentTimestampSql();
      }

      /*
       * add "NULL" to sql type if not specified (default)
       */
      if ( ! strstr( $sqltype, "NULL") and ! strstr( $sqltype, "null") )
      {
        $sqltype .= " NULL";
      }

      /*
       * check type
       */
      if ( ! isset( $prop['sqltype'] ) )
      {
        $this->raiseError("Property '$name' does not have a 'sqltype' definition.");
      }


      /*
       * if column does not exist, create it
       */
      if ( ! $table->columnExists( $name ) )
      {
        $model->log( "Adding column '$name' with definition '$sqltype'", QCL_LOG_TABLE_MAINTENANCE);
        $table->addColumn( $name, $sqltype );
      }

      /*
       * if not, check if it has changed
       */
      else
      {
        $curr_sqltype = $table->getColumnDefinition( $name );
        if (strtolower($curr_sqltype)  != strtolower($sqltype) )
        {
          $model->log( "Column '$name' has changed from '$curr_sqltype' to '$sqltype'", QCL_LOG_TABLE_MAINTENANCE);
        }
        else
        {
          $model->log( "Column '$name' has not changed.", QCL_LOG_TABLE_MAINTENANCE);
        }
      }
    }

  }

}
?>