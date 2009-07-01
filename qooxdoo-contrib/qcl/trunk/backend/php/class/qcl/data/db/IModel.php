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

/**
 * Interface for a database-based model
 */
interface qcl_data_db_IModel
{

  /**
   * Initializes the model. This is called from the constructor.
   * @param mixed $datasourceModel Object reference to the datasource object,
   * or null if model is independent of a datasource
   * @return bool Success
   */
  function initialize( $datasourceModel=null );

  /**
   * Returns the database adapter object for this model
   * @return qcl_data_db_IAdapter
   */
  function &db();

  /**
   * Returns the name of the main table that is used by this model
   * @return string
   */
  function table();

  /**
   * Connects to database. if this model is connected to
   * a datasource model, reuse the datasource's database
   * handler. Otherwise, get DSN from framework
   * @return bool Success
   */
  function connect();

  /**
   * Returns the name of the column that holds the unique (numeric) id of this table.
   * @return string
   */
  function getIdColumn();

  /**
   * Returns the column name from a property name.
   * @return string
   * @param string $property Property name
   */
  function getColumnName ( $name );

  //-------------------------------------------------------------
  // Record Retrieval (find... methods)
  //-------------------------------------------------------------

  /**
   * gets all database records optionally sorted by field
   * @param string|null     $orderBy  (optional) order by field
   * @return Array Array of db record sets
   * @deprecated use new findX.. methods
   */
  function findAll($orderBy=null);

  /**
   * Returns all values of a model property that match a where condition
   * @param string $property Name of property
   * @param string|null[optional] $where Where condition to match, if null, get all
   * @param string|null[optional] $orderBy Property to order by
   * @param bool[optional, default false] If true, get only distinct values
   * @return array Array of values
   */
  function findValues( $property, $where=null, $orderBy=null, $distinct=false );

  /**
   * Returns a records by property value
   * @param string $propName Name of property
   * @param string|array $value Value or array of values to find. If an array, retrieve all records
   * that match any of the values.
   * @param string|null[optional] $orderBy  Field to order by
   * @param array|null[optional]  $properties  Array of properties to retrieve or null (default) if all
   * properties are to be retrieved
   * @param string[optional] $link Name of the link in the schema xml. If provided, this will
   * automatically generate the necessary join query.
   * @return array recordset
   */
  function findBy( $propName, $value, $orderBy=null, $properties=null, $link=null  );

  /**
   * Returns a records that compare to a property value. This is like findBy, but using
   * the "LIKE" operator. Works only with string values
   * @param string $propName Name of property
   * @param string $value Value to find
   * @param string|null[optional] $orderBy  Field to order by
   * @param array|null[optional]  $properties  Array of properties to retrieve or null (default) if all
   * properties are to be retrieved
   * @param string[optional] $link Name of the link in the schema xml. If provided, this will
   * automatically generate the necessary join query.
   * @return array recordset
   * @todo this should be automatic by resolving the type from the schema xml
   */
  function findLike( $propName, $value, $orderBy=null, $properties=null, $link=null  );

  /**
   * Finds all database records or those that match a where condition.
   * in the "where" expression the table name is available as the alias "t1", the joined tables as "t2".
   *
   * @param string|array|null  $where 'Where' condition to match. If null, get all. if array,
   * match all key -> value combinations
   *
   * @param string|array|null[optional] $orderBy Order by property/properties.
   * If an array is given, the last element of the array will be searched for "ASC" or "DESC" and
   * used as sort direction.
   *
   * @param string|array|null[optional]  $properties  Array of properties to retrieve or null (default)
   * if all. When using joined tables, the parameter must be an array containing two arrays,
   * the first with the properties of the model table, and the second with the properties of the joined
   * table. Alternatively, you can use the syntax "prop1,prop2,prop3" for an unlinked, and
   * "prop1,prop2,prop3|prop1,prop2,prop3" for a linked model. It is also possible to use "*" or "*|*" to
   * get all properties from unlinked and linked models, respectively.
   *
   * @param string[optional] $link Name of the link in the schema xml. If provided, this will
   * automatically generate the necessary join query.
   *
   * @param array[optional] $conditions FIXME
   *
   * @param bool $distinct Whether only distinct values should be returned
   *
   * @return Array Array of db record sets. The array keys are already converted to the property names,
   * so you do not have to deal with column names at all.
   */
  function findWhere( $where, $orderBy=null, $properties=null, $link=null, $conditions=null, $distict=false );


  /**
   * Find database records by their primary key
   * @param array|int $ids Id or array of ids
   * @param string|null[optional] $orderBy     Order by property
   * @param array|null[optional]  $properties  Array of properties to retrieve or null (default) if all
   * @param string[optional] $link Name of the link in the schema xml.
   * @see qcl_data_model_xmlSchema_DbModel::findeWhere() for details
   * @return Array Array of db record sets
   */
  function findById( $ids, $orderBy=null, $properties=null, $link=null );

  /**
   * Loads a model record identified by id.
   * Alias of qcl_data_model_xmlSchema_DbModel::findById().
   *
   * @param int $id
   * @return arrray()
   */
  function load( $id, $requestId=null );

  /**
   * find database records by their named id
   * @param array|string $ids Id or array of ids
   * @param string|null[optional] $orderBy     Order by property
   * @param array|null[optional]  $properties  Array of properties to retrieve or null (default) if all
   * @param string[optional] $link Name of the link in the schema xml.
   * @see qcl_data_model_xmlSchema_DbModel::findeWhere() for details
   * @return Array Array of db record sets
   */
  function findByNamedId( $ids, $orderBy=null, $properties=null, $link=null );

  //-------------------------------------------------------------
  // Data creation and manipulation
  //-------------------------------------------------------------

  /**
   * Converts array data to a 'where' compliant sql string
   * @param string|array $where
   * @todo rename method name and rewrite this
   */
  function toSql( $where );

  /**
   * creates a new record and optionally links it to a foreign table (must be implemented in ::create() )
   * @param string  $namedId
   * @param int     $foreignId
   * @return int the id of the inserted or existing row
   */
  function createIfNotExists( $namedId, $foreignId=null );

  /**
   * Inserts a record into a table and returns last_insert_id()
   * @param array|stdClass $data associative array with the column names as keys and the column data as values
   * @return int the id of the inserted row or 0 if the insert was not successful
   */
  function insert( $data );

  /**
   * updates a record in a table identified by id
   * @param array       $data   associative array with the column names as keys and the column data as values
   * @param int|string  $id   if the id key is not provided in the $data paramenter, provide it here (optional)
   * @param bool        $keepTimestamp If true, do not overwrite the 'modified' timestamp
   * @return boolean success
   */
  function update ( $data=null, $id=null, $keepTimestamp= false );

  /**
   * Update the records matching the where condition with the key-value pairs
   * @param array $data
   * @param string|array $where
   * @return result
   */
  function updateWhere( $data, $where );

  /**
   * Checks wheter a record exists that matches a query
   * @param array|string $where Where query
   */
  function exists( $where );

  /**
   * If a row with a matching id/namedId exists, replace it. If not, insert data
   * @param array $data
   * @return int id of row
   */
  function replace( $data );

  /**
   * Inserts data or updates a record according to the following rules:
   *
   * a) If id property is provided, look for the record with this primary key and
   * update all the other values. If the record does not exist, throw an error.
   *
   * b) If no id is provided, check if a record matching the
   * given key-value pairs exist. If yes, update its 'modified' property. If not,
   * insert the data.
   *
   * Before returning, the found or created record is loaded
   *
   * @param array $data
   * @return int The id of the existing or newly created record
   */
  function insertOrUpdate( $data );




  /**
   * Deletes the currently loaded record or one or more records in a table identified by id
   * @todo: should be called statically
   * @param mixed[optional] $ids (array of) record id(s)
   */
  function delete ( $ids=null );

  /**
   * Deletes one or more records in a table matching a where condition.
   * This does not delete dependencies!
   * @param string  $where where condition
   * @return void
   */
  function deleteWhere ( $where );

  /**
   * Deletes all rows of a table
   * @return void
   */
  function truncate();


  /**
   * Counts records in a table matching a where condition.
   * @param string  $where where condition
   * @return int
   */
  function countWhere ( $where );

  //-----------------------------------------------------------------------
  // Information on records
  //-----------------------------------------------------------------------

  /**
   * Returns number of records in the database
   * @return int
   */
  function countRecords();

  /**
   * Returns number of records in the last query resultset
   * @return int
   */
  function countResult();

  /**
   * Returns the lowest id number
   * @return int
   */
  function minId();

  /**
   * Returns the highest id number
   * @return int
   */
  function maxId();

  //-------------------------------------------------------------
  // Timestamp management
  //-------------------------------------------------------------

  /**
   * updates the modification date without changing the data
   * @param int|array $ids One or more record ids
   * @return void
   * @todo rewrite without raw sql
   */
  function updateTimestamp( $ids=null );

  /**
   * gets the current timestamp from the database
   * @return string
   */
  function getTimestamp();


  /**
   * Calculates the number of seconds passed between the
   * timestamp value parameter. The difference is calculated
   * by the db engine, not by php.
   * @todo Implement in db-class, not here
   * @param string $timestamp Timestamp value
   * @return float
   */
  function getSecondsSince($timestamp);



  /**
   * returns the prefix for tables used by this
   * model. defaults to the datasource name plus underscore
   * or an empty string if there is no datasource
   * @return string
   */
  function getTablePrefix();

  /**
   * Whether the model has the given index
   * @param $index
   * @return boolean
   */
  function hasIndex( $index );

  /**
   * Returns a list of index names of the table
   * which holds the records of this model
   * @return array
   */
  function indexes();

}
?>