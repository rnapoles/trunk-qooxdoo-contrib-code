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
 * Interface for all classes that implement an active record object
 */

interface qcl_data_model_IActiveRecord
{

  //-------------------------------------------------------------
  // Getters & setters
  //-------------------------------------------------------------

  /**
   * Getter for modification date
   * @return qcl_data_db_Timestamp
   */
  public function getModified();

  /**
   * Getter for creation date
   * @return qcl_data_db_Timestamp
   */
  public function getCreated();


  /**
   * Gets the data of the currently loaded record as a stdClass object
   * so you can use $record->foo instead of $record['foo']
   * @todo really needed?
   * @return stdClass
   */
  public function dataObject();

  //-------------------------------------------------------------
  // Numeric and Named Id
  //-------------------------------------------------------------

  /**
   * Gets the id of the current record. Raises error if no record
   * is loaded.
   * @return int
   */
  public function getId();

  /**
   * Alias of getId()
   * return int
   */
  public function id();

  //-------------------------------------------------------------
  // Record Retrieval (load methods)
  //-------------------------------------------------------------

  /**
   * Returns the query behavior. Must be implemented by the subclass.
   * @return qcl_data_model_IQueryBehavior
   */
  public function getQueryBehavior();

  /**
   * Loads a model record identified by id. Does not return anything.
   * Throws an exception if no model data could be found.
   * @param int $id
   * @return void
   */
  public function load( $id );

  /**
   * If query is successful, load the first row of the result set into the
   * model.
   * @param qcl_data_db_Query|array $query
   * @return int Number of rows retrieved
   */
  public function loadWhere( $query );

  /**
   * If the last query has found more then one record, get the text one.
   * If the end of the records has been reached, return null.
   * @return array|null
   */
  public function nextRecord();

  //-------------------------------------------------------------
  // Data creation and manipulation
  //-------------------------------------------------------------

  /**
   * Creates a new model record, optionally, with preconfigured data.
   * @param array|null Optional map of properties to set
   * @return int Id of the record
   */
  public function create( $data= null );

  /**
   * Save the model properties to the database
   * @return boolean
   */
  public function save();

  /**
   * Deletes the record from the database. Does not delete the
   * active record object.
   * @return boolean
   */
  public function delete();

  /**
   * Deletes the model records that match the 'where' data..
   * @param array $where
   * @return int number of affected rows
   */
  public function deleteWhere( $where );

  /**
   * Deletes all records from the database.
   *  @return number of affected rows
   */
  public function deleteAll();

  /**
   * Updates the given properties with new values of those model records
   * that match the 'where' data.
   * @param array $data
   * @param array $where
   * @return int number of affected rows
   */
  public function updateWhere( $data, $where );



  //-----------------------------------------------------------------------
  // Information on records/queries
  //-----------------------------------------------------------------------

  /**
   * Number of rows affected/selected by the last statement
   * @return int
   */
  public function rowCount();

  /**
   * Returns true if the last query didn't find any records
   * @return boolean
   */
  public function foundNothing();

  /**
   * Whether the last query was successful
   * @return boolean
   */
  public function foundSomething();

  /**
   * Returns number of records in the database
   * @return int
   */
  public function countRecords();

  /**
   * Returns the number of records matching the where
   * @param array $where Data for where statement, see qcl_data_model_IQueryBehavior::create
   * @return int
   */
  public function countWhere( $where );
}
?>