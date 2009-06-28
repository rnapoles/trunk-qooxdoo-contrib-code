<?php


/**
 * Interface for database adapter
 */
interface qcl_db_IAdapter
{

  /**
   * Getter for DSN
   * @return mixed array or string, according to how it was initialized
   */
  function getDsn();

  /**
   * Return dsn information as an array of connectin info.
   * @return array
   */
  function getDsnAsArray();

  /**
   * Return dsn information as a PEAR::DB compatible dsn string
   * @return string
   */
  function getDsnAsString();

  /**
   * sets and analyzes the dsn for this database
   * @param  string dsn
   * @return void
   */
  function setDsn($dsn);

  /**
   * Returns database type, such as "mysql"
   * @return string
   */
  function getType();

  /**
   * getter for database user
   * @return string
   */
  function getUser();

  /**
   * getter for database password
   * @return string
   */
  function getPassword();

  /**
   * getter for database host
   * @return string
   */
  function getHost();

  /**
   * getter for database port
   * @return string
   */
  function getPort();

  /**
   * Returns current database name
   * @return string
   */
  function getDatabase();

  /**
   * Creates connection
   * @param array|string[optional] $dsn Connects with given dsn or, if not
   * argument provided, with the dsn set by qcl_db_IAdapter::setDsn()
   * @return object Adapter object or false if no connection was possible
   */
  function &connect( $dsn=null );

  /**
   * Queries database
   * @param string $dsn
   * @param bool $abortOnError
   * @return mixed
   */
  function query ( $sql, $abortOnError=true );

  /**
   * Executes a query without expecting return data
   * @param string $dsn
   * @param bool $abortOnError
   * @return mixed
   */
  function execute ( $sql, $abortOnError=true  );


  /**
   * get first row of result set
   */
  function getRow ( $sql );


  /**
   * Returns the value of the first cell cell of the first row of the result set.
   * Useful for example for "SELECT count(*) ... " queries
   * @return mixed
   */
  function getValue ( $sql );


  /**
   * Returns whole result set mapped to array
   * @return array
   */
  function getAllRecords( $sql );

  /**
   * Returns the next record from the database
   * @param boolean $withColumnNames  if true (default), map values to column names
   */
  function nextRecord( $withColumnNames=true );

  /**
   * Inserts a record into a table and returns last_insert_id()
   * @param string $table table name
   * @param array $data associative array with the column names as keys and the column data as values
   */
  function insert ( $table, $data );

  /**
   * updates a record in a table identified by id
   * @param string $table table name
   * @param array $data associative array with the column names as keys and the column data as values
   * @param string $idColumn name of column containing the record id
   */
  function update ( $table, $data, $idColumn="id" );

  /**
   * deletes a record in a table identified by id
   * @param string $table table name
   * @param string $idColumn name of column containing the record id
   */
  function delete ( $table, $data, $idColumn="id" );

  /**
   * deletes one or more records in a table matching a where condition
   * @param string $table Name of table
   * @param string $where where condition
   */
  function deleteWhere ( $table, $where );

  /**
   * Escapes strings for use in sql queries
   */
  function escape ( $string );

  /**
   * Returns last inserted primary key
   */
  function getLastInsertId();

  /**
   * Disconnects from database
   */
  function disconnect();

  /**
   * Format a table name for use in the sql query.
   * @param string $table Table name
   * @return string
   */
  function formatTableName( $table );

  /**
   * Creates a table wit an numeric, unique, self-incrementing 'id' column,
   * which is also the primary key, with utf-8 as default character set
   * @param string $table
   */
  function createTable($table);

  /**
   * creates a temporary table and fills it with data
   * @return array of citekeys
   * @param string    $name     name of the table
   * @param array     $columns  map: column name => column definition
   * @param array     $data     map: column name => column value
   */
  function createTemporaryTable ( $name, $columnData, $data );



  /**
   * Deletes a table from the database
   * @param string $table
   */
  function dropTable( $table );

  /**
   * gets the sql to do a fulltext search. Uses boolean mode
   * @return string
   * @param string $table
   * @param string $indexName
   * @param string $expr
   */
  function getFullTextSql( $table, $indexName, $expr );

  //-------------------------------------------------------------
  // database introspection
  //-------------------------------------------------------------

  /**
   * Returns table structure as sql create statement
   * @param string $table table name
   * @return string
   */
  function getCreateTableSql($table);



  /**
   * Returns information on the columns contained in a given table
   * in the currently selected database
   * @param string $table
   * @return array Associated array with the keys name, default, nullable, type and key.
   */
  function getColumnMetaData($table);


  /**
   * checks if table exists
   * @return boolean
   * @param $table string
   */
  function tableExists($table);

  /**
   * checks if a function or stored procedure of this name exists in the database
   * @return
   * @param $routine
   */
  function routineExists($routine);


  /**
   * checks if a column exists in the database
   * @param string $table
   * @param string $column
   * @return boolean
   */
  function hasColumn($table, $column);

  /**
   * gets the definition of a column as in
   * a column defintion in a CREATE TABLE statement
   * @param string $table
   * @param string $column
   * @return mixed string defintion or null if column does not exist
   */
  function getColumnDefinition($table,$column);

  /**
   * Adds a column, issues a warning if column exists
   * @param string $table
   * @param string $column
   * @param string $definition
   * @param string $after [optional] "FIRST|AFTER xxx|LAST"
   */
  function addColumn($table,$column,$definition,$after="");

  /**
   * Modify a column
   * @param string $table
   * @param string $column
   * @param string $definition
   * @param string $after [optional] "FIRST|AFTER xxx|LAST"
   */
  function modifyColumn($table,$column,$definition,$after="");

  /**
   * rename a column
   * @param string $table
   * @param string $oldColumn old column name
   * @param string $newColumn new column name
   * @param string $definition (required)
   * @param string $after [optional] "FIRST|AFTER xxx|LAST"
   */
  function renameColumn($table,$oldColumn,$newColumn,$definition,$after);

  /**
   * Returns name(s) of primary key(s) from table
   * @param string $table table name
   * @return array array of columns
   */
  function getPrimaryKey($table);

  /**
   * Add primary key(s) for the table
   * @param string $table table name
   * @param string|array $columns column(s) for the primary key
   */
  function addPrimaryKey($table,$columns);

  /**
   * Drops primary key of a table
   * @param string $table
   */
  function dropPrimaryKey($table);

  /**
   * Removes an index
   * @param string $table table name
   * @param string $index index name
   * @return void
   */
  function dropIndex($table,$index);

  /**
   * Return the columns in index
   * @param string $table
   * @param string $index
   * @return array Array of column names that belong to the index
   */
  function getIndexColumns($table, $index);

  /**
   * Returns an array of index names defined in the table
   * @param $table
   * @return array
   */
  function indexes( $table );

  /**
   * Checks whether an index exists
   * @param $table
   * @param $index
   * @return boolean
   */
  function hasIndex( $table, $index );

  /**
   * Adds a an index
   * @param string $type FULLTEXT|UNIQUE
   * @param string $table
   * @param string $index index name
   * @param string|array  $columns name(s) of column(s) in the index
   */
  function addIndex( $type, $table, $index, $columns );

  /**
   * updates table structure to conform with sql create table statement passed
   * @deprecated Use new xml-based table creation / update
   * @return void
   * @param string $table table name
   * @param string $sql   sql create table statement
   */
  function updateTableStructure($table,$sql);

  /**
   * creates functions that help maintain a tree structure in the
   * database:
   *
   * table_getHierarchyPath( int folderId ):
   * returns a slash-separated hierarchy path
   * table_getHierarchyIds( int folderId )
   *
   * Having these functions will significantly speed up tree
   * path lookup
   * @param string $table Table name
   * @param string $col_id Name of id column
   * @param string $col_parentId Name of parent id column
   * @param string $col_label Name of node label/name
   */
  function createHierarchyFunctions($table, $col_id, $col_parentId, $col_label);

  /**
   * creates a trigger that inserts a timestamp on
   * each newly created record
   * @param string $table Name of table
   * @param string $col_created Name of column that gets the timestamp
   */
  function createTimestampTrigger( $table, $col_created );

  /**
   * creates triggers that will automatically create
   * a md5 hash string over a set of columns
   */
  function createHashTriggers ( $table, $columns);
}
?>