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
   * getter for database name
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
   * Deletes a table from the database
   * @param string $table
   */
  function dropTable( $table );

}
?>