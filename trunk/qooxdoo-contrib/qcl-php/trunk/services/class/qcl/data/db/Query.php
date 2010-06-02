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
 *  * Oliver Friedrich (jesus77)
 */

/**
 * An object holding data for use in a SQL query by a QueryBehavior class.
 * The data should be evaluated by the behavior class as follows:
 * <ul>
 * <li>
 *
 *
 *
 * @param
 * @param
 * @param [optional]  $properties
 * @param string[optional] $link
 * @param bool $distinct Whether only distinct values should be returned
 *
 *
 * @todo Remove dependency on qcl_core_Object by providing manual getter and
 * setter methods for all properties
 * @todo Rewrite using the planned qcl_data_query_* architecture
 */

class qcl_data_db_Query
  extends qcl_core_Object
{

  //-------------------------------------------------------------
  // Properties
  //-------------------------------------------------------------

  /**
   * Data for the SELECT statement. If "*" or null (default),
   * select all columns. if array, select the columns specified in
   * the array. If the array elements are associative arrays, evaluate
   * their keys as follows:  'column' => name of the column, 'as' => name
   * of the key in which the value is returned in the result row, this
   * allows to use tables that differ from the property schema.
   * @var string|array|null.
   */
  public $select = null;

  /**
   * Array of properties to retrieve. If "*" or null (default), retrieve all.
   * When using joined tables, the parameter must be an array containing two
   * arrays, the first with the properties of the model table, and the second
   * with the properties of the joined table. Alternatively, you can use the
   * syntax "prop1,prop2,prop3" for an unlinked, and
   * "prop1,prop2,prop3|prop1,prop2,prop3" for a linked model. It is also
   * possible to use "*" or "*|*" to get all properties from unlinked and
   * linked models, respectively.
   * @var string|array|null
   */
  public $properties = null;

  /**
   * The name of the affected table. Usually not needed since the
   * behavior takes care of this.
   * @var string
   */
  public $table = null;

  /**
   * 'Where' condition to match. If null, get all. if array, match all
   * key -> value combinations. If string, the table name is available as
   * the alias "t1", joined tables as "t2".
   * @var string|array|null
   */
  public $where = null;

  /**
   * A condition for index matches
   * @var array
   */
  public $match = null;

  /**
   * Order by property/properties.
   * @var string|array|null
   */
  public $orderBy  =null;

  /**
   * Group by property/properties.
   * @var string|array|null
   */
  public $groupBy  =null;

  /**
   * The first row to retrieve
   * @var int|null
   */
  public $firstRow = null;

  /**
   * The last row to retrieve
   * @var int|null
   */
  public $lastRow = null;


  /**
   * Optional flag to select distict rows only
   * @var boolean
   */
  public $distinct = false;

  /**
   * Optional link condition. If provided, this will
   * cause the query behavior to automatically generate the necessary
   * join query.
   * @var array|null
   */
  public $link = null;

  /**
   * The parameters used to execute dynamic sql statements by controlled
   * replacement of placeholders
   * @see PDO::prepare()
   * @var array
   */
  public $parameters = array();

  /**
   * The types of the parameters used to execute dynamic sql statements
   * @see PDO::prepare()
   * @var array
   */
  public $parameter_types = array();

  /**
   * The reference to the PDOStatement object that is returned
   * by a PDO::prepare() call.
   * @var PDOStatement
   */
  public $pdoStatement;


  /**
   * The number of rows affected or retrieved by the last
   * query
   */
  public $rowCount;


  /**
   * Maps property names to keys that should replace the
   * property names in the result data
   * @var array
   */
  public $as = array();


  //-------------------------------------------------------------
  // Constructor
  //-------------------------------------------------------------

  /**
   * Constructor
   * @param array $map Map of properties to be set.
   */
  function __construct( $map )
  {
    $this->set( $map );
  }

  //-------------------------------------------------------------
  // Getters
  //-------------------------------------------------------------

  public function getProperties()
  {
    return $this->properties;
  }

  public function getTable()
  {
    return $this->table;
  }

  public function getWhere()
  {
    return $this->where;
  }

  public function getMatch()
  {
    return $this->match;
  }

  public function getParameters()
  {
    return $this->parameters;
  }

  public function getParameterTypes()
  {
    return $this->parameter_types;
  }

  public function getPdoStatement()
  {
    return $this->pdoStatement;
  }

  public function getRowCount()
  {
    return $this->rowCount;
  }

  /**
   * @return array
   */
  public function getLink()
  {
    return $this->link;
  }
}
?>