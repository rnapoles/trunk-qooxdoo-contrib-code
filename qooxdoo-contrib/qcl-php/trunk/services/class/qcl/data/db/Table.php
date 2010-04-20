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

class qcl_data_db_Table
  extends qcl_core_Object
{
  /**
   * The name of the table
   * @var string
   */
  protected $name;

  /**
   * The database adapter
   * @var qcl_data_db_adapter_IAdapter
   */
  protected $adapter;

  /**
   * A counter to identify if the table has changed.
   */
  protected $transactionId = 0;

  /**
   * Constructor
   * @param string $name
   * @param qcl_db_adapter_IAdapter $adapter
   */
  function __construct( $name, $adapter )
  {
    $this->name    = $name;
    $this->adapter = $adapter;
  }

  /**
   * Getter for adapter
   * @return qcl_data_db_adapter_IAdapter
   */
  protected function getAdapter()
  {
    return $this->adapter;
  }

  /**
   * Getter for table name
   * @return string
   */
  protected function getName()
  {
    return $this->name;
  }

  /**
   * Returns the name of the column containing the record id.
   * @return string
   */
  public function idColumn()
  {
    return "id";
  }


  //-------------------------------------------------------------
  // table setup
  //-------------------------------------------------------------

  /**
   * Checks if table exists
   * @return boolean
   */
  public function exists()
  {
    return $this->getAdapter()->tableExists( $this->getName() );
  }

  /**
   * Creates the table with an numeric, unique, self-incrementing 'id' column,
   * which is also the primary key, with utf-8 as default character set. Throws
   * an error if table already exists.
   */
  function create()
  {
    qcl_log_Logger::getInstance()->log( sprintf(
     "Creating table `%s`",  $this->getName() ), QCL_LOG_TABLES );
    $this->getAdapter()->createTable( $this->getName() );
  }

  /**
   * Returns table structure as sql create statement
   * @param string $table table name
   * @return string
   */
  public function sqlDefinition()
  {
    return $this->getAdapter()->sqlDefinition( $this->getName() );
  }


  /**
   * Adds a column, throws if column exists.
   * WARNING: Input values are assumed to come from internal processing only and are therefore
   * not sanitized. Make sure not to pass user-generated data to this method!
   * @param string $column
   * @param string $definition
   * @param string $after Optional placement instruction. Must be one of (FIRST|AFTER xxx|LAST)
   */
  public function addColumn( $column, $definition, $after="")
  {
    qcl_log_Logger::getInstance()->log( sprintf(
     "Adding column `%s` to table `%s` with definition '%s' %s",
      $column, $this->getName(), $definition, $after ? "AFTER $after":""
    ), QCL_LOG_TABLES );

    return $this->getAdapter()->addColumn( $this->getName(), $column, $definition, $after );
  }

  /**
   * Checks if a column exists in the table
   * @param string $column
   * @return boolean
   */
  public function columnExists( $column )
  {
    return $this->getAdapter()->columnExists( $this->getName(), $column );
  }

  /**
   * Returns the definition of a column as specified in a column definition in a
   * CREATE TABLE statement.
   * @param string $column
   * @return mixed string defintion or null if column does not exist
   */
  public function getColumnDefinition( $column )
  {
    return $this->getAdapter()->getColumnDefinition( $this->getName(), $column );
  }

  /**
   * Modifies a column.
   * WARNING: Input values are assumed to come from internal processing only and are therefore
   * not sanitized. Make sure not to pass user-generated data to this method!
   * @param string $column
   * @param string $definition
   * @param string $after Optional placement instruction. Must be one of (FIRST|AFTER xxx|LAST)
   */
  public function modifyColumn( $column, $definition, $after="" )
  {
    qcl_log_Logger::getInstance()->log( sprintf(
     "Modifying column `%s` in table `%s` with definition '%s' %s",
      $column, $this->getName(), $definition, $after ? "AFTER $after":""
    ), QCL_LOG_TABLES );
    $this->getAdapter()->modifyColumn( $this->getName(), $column, $definition, $after );
  }

  /**
   * Renames a column.
   * WARNING: Input values are assumed to come from internal processing only and are therefore
   * not sanitized. Make sure not to pass user-generated data to this method!
   * @param string $oldColumn old column name
   * @param string $newColumn new column name
   * @param string $definition (required)
   * @param string $after Optional placement instruction. Must be one of (FIRST|AFTER xxx|LAST)
   * return void
   */
  public function renameColumn( $oldColumn, $newColumn, $definition, $after="" )
  {
    qcl_log_Logger::getInstance()->log( sprintf(
     "Renaming column `%s` to `%s` in table `%s` with definition '%s' %s",
      $oldColumn, $newColumn, $this->getName(), $definition, $after ? "AFTER $after":""
    ), QCL_LOG_TABLES );

    return $this->getAdapter()->renameColumn( $this->getName(), $oldColumn, $newColumn, $definition, $after );
  }

  /**
   * Deletes a column from the table.
   * WARNING: Input values are assumed to come from internal processing only and are therefore
   * not sanitized. Make sure not to pass user-generated data to this method!
   * @param string $table
   * @param string $column
   * return bool
   */
  public function dropColumn( $column )
  {
    qcl_log_Logger::getInstance()->log( sprintf(
     "Dropping column `%s` from table `%s`.",
      $column, $this->getName()
    ), QCL_LOG_TABLES );
    return $this->getAdapter()->dropColumn( $this->getName(), $column );
  }

  /**
   * Returns the primary key(s) from the table.
   * @param string $table table name
   * @return array array of columns
   */
  public function getPrimaryKey()
  {
    return $this->getAdapter()->getPrimaryKey( $this->getName() );
  }

  /**
   * Adds a primary key for the table
   * @param string|array $columns column(s) for the primary key
   */
  public function addPrimaryKey( $columns )
  {
    return $this->getAdapter()->addPrimaryKey( $this->getName(), $columns );
  }

  /**
   * Removes the primary key index from the table
   */
  public function dropPrimaryKey()
  {
    return $this->getAdapter()->dropPrimaryKey( $this->getName() );
  }

  /**
   * Removes an index.
   * @param string $index index name
   * @return void
   */
  public function dropIndex( $index )
  {
    return $this->getAdapter()->dropIndex( $this->getName(), $index );
  }

  /**
   * Return the columns in index
   * @param string $index
   * @return array Array of column names that belong to the index
   */
  public function getIndexColumns( $index )
  {
    return $this->getAdapter()->getIndexColumns( $this->getName(), $index );
  }

  /**
   * Returns an array of index names defined in the table
   * @return array
   */
  public function indexes()
  {
    return $this->getAdapter()->indexes( $this->getName() );
  }

  /**
   * Checks whether an index exists
   * @param $index
   * @return boolean
   */
  public function indexExists( $index )
  {
    return $this->getAdapter()->indexExists( $this->getName(), $index );
  }

  /**
   * Adds a an index.
   * WARNING: Input values are assumed to come from internal processing only and are therefore
   * not sanitized. Make sure not to pass user-generated data to this method!
   * @param string $type Any of (FULLTEXT|UNIQUE)
   * @param string $index Index name
   * @param array $columns Names of columns in the index
   */
  public function addIndex( $type, $index, $columns )
  {
    if ( ! $type or !$index or ! is_array( $columns ) or ! count( $columns ) )
    {
      throw new InvalidArgumentException("Invalid arguments");
    }

    qcl_log_Logger::getInstance()->log( sprintf(
     "Adding '%s' index `%s` to table `%s` using columns %s.",
      $type, $index, $this->getName(), implode(",",$columns)
    ), QCL_LOG_TABLES );

    return $this->getAdapter()->addIndex( $this->getName(), $type, $index, $columns );
  }

  /**
   * Creates a trigger that inserts a timestamp on
   * each newly created record.
   * @param string $column Name of column that gets the timestamp
   */
  public function createTimestampTrigger( $column )
  {
    return $this->getAdapter()->createTimestampTrigger( $this->getName(), $column );
  }

  /**
   * Creates triggers that will automatically create
   * a md5 hash string over a set of columns
   */
  public function createHashTriggers( $columns )
  {
    return $this->getAdapter()->createHashTriggers( $this->getName(), $columns );
  }

  /**
   * Deletes the table.
   * @return void
   */
  public function delete()
  {
    $this->getAdapter()->dropTable( $this->getName() );
  }



  //-------------------------------------------------------------
  // The transaction id allows to track changes to the data
  //-------------------------------------------------------------

  /**
   * Set the transaction id for the table to 0 if it hasn't been
   * initialized yet
   * @return void
   */
  public function initTransactionId()
  {
    $this->transactionId = 0;
  }

  /**
   * Return the transaction id for the table
   * @return int
   */
  public function getTransactionId()
  {
    return $this->transactionId;
  }

  /**
   * Increment the transaction id for this model.
   * @return void
   */
  public function incrementTransactionId()
  {
    $this->transactionId++;
  }

  //-------------------------------------------------------------
  // table data manipulation
  //-------------------------------------------------------------

  /**
   * Inserts a record into a table and returns its id.
   * @param array $data associative array with the column names as keys and the column data as values
   * @return int the id of the inserted row (only if auto_inceremnt-key)
   */
  public function insertRow( $data )
  {
    /*
     * remove id column
     */
    unset( $data['id'] );

    /*
     * mark change
     */
    $this->incrementTransactionId();

    /*
     * insert data
     */
    return $this->getAdapter()->insertRow( $this->getName(), $data );
  }

  /**
   * Inserts an array of rows into a table.
   * @param array $data associative array with the column names as keys and the column data as values
   * @return the id of the last row inserted
   */
  function insertRows( $rows )
  {
    $this->incrementTransactionId();
    foreach ( $rows as $data )
    {
      $id = $this->getAdapter()->insertRow( $this->getName(), $data );
    }
    return $id;
  }

  /**
   * Updates a record in the table identified by id.
   * @param string $idColumn name of column containing the record id, defaults to "id"
   * @param int|null $id Optional id value, if id is not part of the data.
   * @return bool Success
   */
  public function updateRow( $data, $id=null )
  {
    $this->incrementTransactionId();
    return $this->getAdapter()->updateRow( $this->getName(), $data, $this->idColumn(), $id );
  }

  /**
   * Updates records in the table identified by a where condition
   * @param string $table table name
   * @param array $data associative array with the column names as keys and the column data as values
   * @param string  $where where condition. Make sure not to include any user-generated content, use
   *   parameters instead.
   * @param array|null $parameters Optional parameters to the where condition, @see query()
   * @param array|null $parameter_types Optional parameter types, @see query()
   * @return int Number of affected rows
   */
  public function updateWhere ( $data, $where, $parameters=array(), $parameter_types=array() )
  {
    $this->incrementTransactionId();
    return $this->getAdapter()->updateWhere( $this->getName(), $data, $where, $parameters, $parameter_types );
  }

  /**
   * Deletes one or several records in the table identified by id(s)
   * @param int|array $ids (array of) record id(s)
   * @param string $idColumn name of column containing the record id
   * @return bool Success
   */
  public function deleteRow( $ids )
  {
    $this->incrementTransactionId();
    return $this->getAdapter()->deleteRow( $this->getName(), $ids, $this->idColumn() );
  }

  /**
   * Deletes one or more records in a table matching a where condition
   * @param string  $where where condition. Make sure not to include any user-generated content, use
   *   parameters instead.
   * @param array|null $parameters Optional parameters to the where condition, @see query()
   * @param array|null $parameter_types Optional parameter types, @see query()
   * @return int Number of affected rows
   */
  public function deleteWhere ( $where, $parameters=null, $parameter_types=null )
  {
    $this->incrementTransactionId();
    return $this->getAdapter()->deleteWhere( $this->getName(), $where, $parameters, $parameter_types );
  }

  /**
   * Deletes all records from a table and resets the id count
   * @return bool Success
   */
  public function truncate()
  {
    $this->incrementTransactionId();
    return $this->getAdapter()->truncate( $this->getName() );
  }

  //-------------------------------------------------------------
  // query the table
  //-------------------------------------------------------------


  //-------------------------------------------------------------
  // table information
  //-------------------------------------------------------------

  /**
   * Counts records in a table matching a where condition.
   * @param string  $where where condition. Make sure not to include any user-generated content, use
   *   parameters instead.
   * @param array|null $parameters Optional parameters to the where condition, @see query()
   * @param array|null $parameter_types Optional parameter types, @see query()
   */
  public function countWhere( $where, $parameters=null, $parameter_types=null )
  {
    return (int) $this->getAdapter()->countWhere( $this->getName(), $where, $parameters, $parameter_types );
  }

  /**
   * Returns the length of the table, i.e. the number of contained records.
   * @return int
   */
  public function length()
  {
    $table = $this->getAdapter()->formatTableName( $this->getName() );
    $sql   = "SELECT count(*) FROM $table";
    return (int) $this->getAdapter()->getResultValue( $sql );
  }

  /**
   * Returns the lowest id number
   * @return int
   */
  public function minId()
  {
    $idCol = $this->getAdapter()->formatColumnName( $this->idColumn() );
    $table = $this->getAdapter()->formatTableName( $this->getName() );
    return $this->getAdapter()->getResultValue("SELECT MIN($idCol) FROM $table");
  }

  /**
   * Returns the highest id number
   * @return int
   */
  public function maxId()
  {
    $idCol = $this->getAdapter()->formatColumnName( $this->idColumn() );
    $table = $this->getAdapter()->formatTableName( $this->getName() );
    return $this->getAdapter()->getResultValue("SELECT MAX($idCol) FROM $table");
  }
}
?>