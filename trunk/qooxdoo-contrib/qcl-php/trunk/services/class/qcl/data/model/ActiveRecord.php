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
require_once "qcl/core/Object.php";

/**
 * Abstract class for all classes that implement a data model based on
 * the "Active Record" pattern. The object holds data for one record at
 * the time, but provides ways of cycling through a record set if more
 * than one record is retrieved by a query to the data container.
 */

class qcl_data_model_ActiveRecord
  extends qcl_core_Object
{

	/**
	 * The default record data that will be used when creating a new
	 * model record. You can preset static data here.
	 */
  protected $emptyRecord = array();

 /**
   * A cached version of the current record. Access with ::getRecord()
   * @access private
   * @var array
   */
  protected $currentRecord = null;

  /**
   * The object instance of the datasource that this model belongs to.
   * The datasource provides shared resources for models.
   * @var qcl_data_datasource_model
   */
  protected $datasourceModel = null;

  /**
   * The name of the model. Should be a java-like class name such as
   * "namespace.package.ClassName"
   * @var string
   */
  protected $name;

  /**
   * The type of the model, if the model implements a generic type in a specific
   * way.
   *
   * @var string
   */
  protected $type;

  /**
   * Property information for the property behavior
   * @var mixed
   */
  protected $properties;

  /**
   * The result of the last query
   * @access private
   * @var array
   */
  protected $lastResult = null;

  /**
   * Returns model name
   */
  public function name()
  {
    return $this->name;
  }

 	/**
 	 * Shorthand method which returns the current controller object
 	 * @todo remove
 	 * @return qcl_data_controller_Controller
 	 */
  public function getController()
  {
    $controller = $this->getApplication()->getController();
    return $controller;
  }

  /**
   * Returns the server object
   * @todo remove
   */
  public function server()
  {
    return $this->getApplication()->getServer();
  }

  /**
   * Stores the name or object reference of the datasource that
   * provides information on access to the data
   * @param mixed $datasource Either the name of the datasource or an
   * object reference to the datasource object
   * return void
   */
  public function setDatasourceModel( $datasourceModel )
  {
    // @todo use interface
    if (  $datasourceModel instanceof qcl_data_datasource_type_db_Model )
    {
      $this->datasourceModel = $datasourceModel;
    }
    else
    {
      $this->raiseError("Invalid datasource model. Must be instance of qcl_data_datasource_type_db_Model object:" . get_class( $datasourceModel ) );
    }
  }

  /**
   * Retrieves the datasource object
   * @return qcl_data_datasource_type_db_Model
   */
  public function getDatasourceModel()
  {
    return $this->datasourceModel;
  }

  //-------------------------------------------------------------
  // Properties and Columns
  //-------------------------------------------------------------


  /**
   * Return the names of all properties of this model
   * @return array
   */
  public function properties()
  {
    $this->notImplemented(__CLASS__);
  }

  /**
   * Checks if property exists
   *
   * @param string $name
   * @return bool
   */
  public function hasProperty( $name )
  {
    $this->notImplemented(__CLASS__);
  }

  /**
   * checks if a property has a local alias
   *
   * @param string $propName property name
   */
  public function hasAlias($propName)
  {
    $this->notImplemented(__CLASS__);
  }


  /**
   * Gets the simple type of the model property (string, int, etc.)
   *
   * @param string $name
   * @return string
   */
  public function getPropertyType ( $name )
  {
    $this->notImplemented(__CLASS__);
  }

  //-------------------------------------------------------------
  // Numeric and Named Id
  //-------------------------------------------------------------

  /**
   * Gets the id of the current record. Raises error if no record
   * is loaded.
   * @return int
   */
  public function getId()
  {
    $id = $this->currentRecord['id'];
    if ( ! $id )
    {
      $this->raiseError("No record loaded in model " . $this->className() );
    }
    return (int) $id;
  }

  /**
   * Alias of getId()
   * return int
   */
  public function id()
  {
    return $this->getId();
  }

  /**
   * Returns the named id if it exists as property
   * @return string
   */
  public function getNamedId()
  {
    return $this->getProperty("namedId");
  }


  /**
   * Sets the named id if it exists as property
   * @return string
   */
  public function setNamedId( $namedId )
  {
    return $this->setProperty("namedId",$namedId);
  }

  /**
   * Checks whether model has 'namedId' property
   * @return bool
   */
  public function _checkHasNamedId()
  {
    if ( ! $this->hasProperty("namedId") )
    {
      $this->raiseError("Model " . $this->className() . " has no 'namedId' property.");
    }
    return true;
  }

  /**
   * Returns numeric id by string id
   * @param string  $namedId
   * @param int id or null if record does not exist
   */
  public function getIdByNamedId( $namedId )
  {
    $this->_checkHasNamedId();
    $this->findByNamedId($namedId);
    if ( $this->foundSomething() )
    {
      return $this->getId();
    }
    return null;
  }

  /**
   * gets string id by numeric id
   * @param int $id
   * @param string id or null if record does not exist
   */
  public function getNamedIdById( $id )
  {
    $this->_checkHasNamedId();
    $this->findById($id);
    if ( $this->foundSomething() )
    {
      return $this->getNamedId();
    }
    return null;
  }

  /**
   * checks if record with $namedId exists
   * @param string  $namedId
   * @param int id of existing record of false
   */
  public function namedIdExists( $namedId )
  {
    $this->_checkHasNamedId();
    $this->findByNamedId ( $namedId );
    return $this->foundSomething();
  }



  //-------------------------------------------------------------
  // Record Retrieval (search/find... methods)
  //-------------------------------------------------------------

  /**
   * Returns records by property value
   * @param string $propName Name of property
   * @param string $value Value to find
   * @param string|null[optional] $orderBy  Field to order by
   * @param array|null[optional]  $properties  Array of properties to retrieve or null (default) if all
   * properties are to be retrieved
   * @return array recordset
   */
  public function findBy( $propName, $value, $orderBy=null, $properties=null )
  {
    $this->raiseError("Not implemented for Model " . $this->className() );
  }

  /**
   * Prepares a search of records by property value and returns the first record
   * found (if any).
   * @param string $propName Name of property
   * @param string $value Value to find
   * @param string|null[optional] $orderBy  Field to order by
   * @param array|null[optional]  $properties  Array of properties to retrieve or null (default) if all
   * properties are to be retrieved
   * @return array recordset
   */
  public function searchBy( $propName, $value, $orderBy=null, $properties=null )
  {
    $this->isSearch = true;
    return $this->findBy(  $propName, $value, $orderBy, $properties );
  }


  /**
   * Returns all database records optionally sorted by property
   * @param string|null[optional] $orderBy     Order by property
   * @param array|null[optional]  $properties  Array of properties to retrieve or null (default) if all
   * @return array
   */
  public function findAll( $orderBy=null, $properties=null )
  {
    return $this->findWhere( null, $orderBy, $properties );
  }

  /**
   * Prepares a search for all database records optionally sorted by property and
   * returns the first record found (if any)
   * @param string|null[optional] $orderBy     Order by property
   * @param array|null[optional]  $properties  Array of properties to retrieve or null (default) if all
   * @return array
   */
  public function searchAll( $orderBy=null, $properties=null )
  {
    $this->isSearch = true;
    return $this->findWhere( null, $orderBy, $properties );
  }

  /**
   * Returns all distinct values of a model property that match a where condition
   * @param string $property Name of property
   * @param string|null[optional] $where Where condition to match, if null, get all
   * @param string|null[optional] $orderBy Property to order by
   * @return array Array of values
   */
  public function findDistinctValues( $property, $where=null, $orderBy=null)
  {
    return $this->findValues($property,$where,$orderBy,true);
  }

  /**
   * Returns all database records or those that match a  condition.
   *
   * @param string|array|null  $where 'Where' condition to match. If null, get all.
   * @param string|array|null[optional] $orderBy Order by property/properties.
   * @param string|array|null[optional]  $properties  Array of properties to retrieve or null (default)
   * @return Array Array of db record sets. The array keys are already converted to the property names,
   * so you do not have to deal with column names at all.
   */
  public function findWhere( $where=null, $orderBy=null, $properties=null )
  {
    $this->notImplemented(__CLASS__);
  }

  /**
   * Prepares a search for all database records or those that match a  condition.
   *
   * @param string|array|null  $where 'Where' condition to match. If null, get all.
   * @param string|array|null[optional] $orderBy Order by property/properties.
   * @param string|array|null[optional]  $properties  Array of properties to retrieve or null (default)
   * @return Array Array of db record sets. The array keys are already converted to the property names,
   * so you do not have to deal with column names at all.
   */
  public function searchWhere( $where=null, $orderBy=null, $properties=null )
  {
    $this->notImplemented(__CLASS__);
  }

  /**
   * Returns all distinct values of a model property that match a where condition
   * @param string $property Name of property
   * @param string|null[optional] $where Where condition to match, if null, get all
   * @param string|null[optional] $orderBy Property to order by
   * @param bool[optional, default false] If true, get only distinct values
   * @return array Array of values
   */
  public function findDistinct( $property, $where=null, $orderBy=null )
  {
    return $this->findBy( $property, $where, $orderBy, true );
  }

  /**
   * Returns all values of a model property that match a where condition
   * @param string $property Name of property
   * @param string|null[optional] $where Where condition to match, if null, get all
   * @param string|null[optional] $orderBy Property to order by
   * @param bool[optional, default false] If true, get only distinct values
   * @return array Array of values
   */
  public function findValues( $property, $where=null, $orderBy=null, $distinct=false )
  {
    $this->notImplemented( __CLASS__ );
  }

  /**
   * Whether the last query didn't find any records
   * @return boolean
   */
  public function foundNothing()
  {
    return is_null( $this->currentRecord );
  }

  /**
   * Whether the last query was successful
   * @return boolean
   */
  public function foundSomething()
  {
    return ! is_null( $this->currentRecord );
  }

  /**
   * Return database records by their primary key
   * @param array|int $ids Id or array of ids
   * @param string|null[optional] $orderBy     Order by property
   * @param array|null[optional]  $properties  Array of properties to retrieve or null (default) if all
   * @return Array Array of db record sets
   */
  public function findById( $ids, $orderBy=null, $properties=null )
  {
    $this->raiseError("Not implemented for Model " . $this->className() );
  }

  /**
   * Prepares a search for database records by their primary key and returns
   * the first record (if any).
   * @param array|int $ids Id or array of ids
   * @param string|null[optional] $orderBy     Order by property
   * @param array|null[optional]  $properties  Array of properties to retrieve or null (default) if all
   * @return Array Array of db record sets
   */
  public function searchById( $ids, $orderBy=null, $properties=null )
  {
    $this->isSearch = true;
    return $this->findById( $ids, $orderBy, $properties);
  }

  /**
   * Return database records by their named id
   * @param array|string $ids Id or array of ids
   * @param string|null[optional] $orderBy     Order by property
   * @param array|null[optional]  $properties  Array of properties to retrieve or null (default) if all
   * @return Array Array of db record sets
   */
  public function findByNamedId( $ids, $orderBy=null, $properties=null )
  {
    $this->raiseError("Not implemented for Model " . $this->className() );
  }

  /**
   * Prepares a search for database records by their named id and returns
   * the first record (if any).
   * @param array|string $ids Id or array of ids
   * @param string|null[optional] $orderBy     Order by property
   * @param array|null[optional]  $properties  Array of properties to retrieve or null (default) if all
   * @return Array Array of db record sets
   */
  public function searchByNamedId( $ids, $orderBy=null, $properties=null )
  {
    $this->isSearch = true;
    return $this->findByNamedId( $ids, $orderBy, $properties );
  }


  //-------------------------------------------------------------
  // Retrieving query results in different formats
  //-------------------------------------------------------------

  /**
   * Gets the data as an associated array from the data provided
   * @param array|stdClass|qcl_data_model_xmlSchema_DbModel $data
   * @return array
   */
  public function _getArrayData( $data )
  {
    if ( is_a( $data, "qcl_data_model_db_Abstract" ) )
    {
      $array = $data->getRecord();
    }
    elseif ( is_array( $data ) or is_a( $data, "stdClass" ) )
    {
      $array = (array) $data;
    }
    else
    {
      $this->raiseError("Invalid parameter");
    }
    return $array;
  }

  /**
   * Gets the data of the currently loaded record as an associative
   * array.
   *
   * @return array
   */
  public function getRecord()
  {
    return $this->currentRecord;
  }


  /**
   * Sets the data of the currently loaded record
   * @param mixed $record
   * @return void
   */
  public function setRecord($record)
  {
    $this->currentRecord = $record;
  }

  /**
   * If the last query has found more then one record, get the text one
   * @return array
   */
  public function loadNext()
  {

    if ( ! count( $this->lastResult ) )
    {
      return false;
    }

    /*
     * throw away the first record
     */
    array_shift( $this->lastResult );

    /*
     * and set the first element as current record
     */
    $this->setRecord( $this->lastResult[0] );

    return $this->getRecord();
  }

  /**
   * Gets the data of the currently loaded record as a stdClass object
   * so you can use $record->foo instead of $record['foo']
   * @return stdClass
   */
  public function getRecordObject()
  {
    $obj = (object) $this->currentRecord;
    return $obj;
  }


  /**
   * Gets the data from the last find query
   * @return array
   */
  public function getResult()
  {
    if ( ! is_array( $this->lastResult ) )
    {
      $this->raiseError("No data exists - probably missing or failed previous query.");
    }
    return $this->lastResult;
  }

  /**
   * Sets the data from the last find query
   * @param array $result
   * @return void
   */
  public function setResult( $result )
  {
    $this->lastResult = $result;
  }

  /**
   * return query result as a an
   */
  public function getResultTree( $property )
  {
    if ( ! $this->hasProperty($property) )
    {
      $this->raiseError("Cannot create result tree: Property '$property' does not exist.'");
    }

    $result = $this->getResult();
    $tree   = array();
    foreach ( $result as $record )
    {
      $key = $record[$property];
      unset($record[$property]);
      $tree[$key][] = $record;
    }
    return $tree;
  }

  /**
   * Returns the values of the first column in the result set
   * as an array.
   *
   * @return array
   */
  public function values()
  {
    $result = $this->getResult();
    $values = array();
    foreach( $result as $record )
    {
      $v = array_values($record);
      $values[] = $v[0];
    }
    return $values;
  }

  /**
   * Compare current record with array. This will only compare
   * the keys existing in the array or the fields that are
   * provided as second argument.
   *
   * @param object|array $compare Model object or array data
   * @param array $fields
   * @return bool whether the values are equal or not
   */
  public function compareWith( $compare, $fields=null )
  {
    /*
     * check arguments to get what we should compare with
     */
    $array = $this->_getArrayData($compare);

    /*
     * assume data is equal as default and change this to false
     * as difference is found
     */
    $isEqual = true;

    /*
     * do the comparison
     */
    if ( is_array($fields) )
    {
      foreach ( $fields as $key  )
      {
        if ( $this->currentRecord[$key] !== $array[$key] )
        {
          $isEqual = false;
        }
      }

    }
    else
    {
      foreach ( $array as $key => $value )
      {
        if ( $this->currentRecord[$key] !== $value )
        {
          $isEqual = false;
        }
      }
    }

    /*
     * return the result
     */
    //$this->debug("The data is " . ($isEqual ? "equal" : "not equal") );
    return $isEqual;
  }

  //-------------------------------------------------------------
  // Get property and column values & convert between properties
  // and column data
  //-------------------------------------------------------------

  /**
   * Gets a property from the current model recordset
   * @param string   $name Property name
   * @param int[optional]  $id if given, load record
   * @return mixed value of property
   */
  public function getProperty( $name, $id = null )
  {

    if ( ! $this->hasProperty($name) )
    {
      $this->raiseError("Model does not have property '$name'");
    }

    /*
     * check if record is loaded
     */
    if ( is_null($id) )
    {
      if ( ! is_array($this->currentRecord ) or count($this->currentRecord) == 0)
      {
        $this->raiseError("Cannot get property '$name' from model '" .
          $this->name() . "': no record loaded.");
      }
    }

    /*
     * retrieve record if id is given
     */
    else
    {
      $this->findById( $id );
      if ( $this->foundNothing() )
      {
        $this->raiseError("Cannot get property '$name' from model '" .
          $this->name() . "': Record #$id does not exist.");
      }
    }

    /*
     * typecast and return value
     */
    $value = $this->currentRecord[$name];
    $value = $this->typecast($name, $value);

    // $this->debug("Getting $name -> " . substr($value,0,10) . (strlen($value)>10 ? "..." : "" ) );

    return $value;
  }

  /**
   * Get the property without type conversion
   * @param $name
   * @return mixed
   */
  public function getRawProperty( $name )
  {
    if ( ! $this->hasProperty($name) )
    {
      $this->raiseError("Model does not have property '$name'");
    }
    return $this->currentRecord[$name];
  }

  /**
   * Returns a list of properties
   * @param $prop1
   * @param $prop2
   * @param $prop3 ...
   * @return array
   */
  public function listProperties()
  {
    $result = array();
    foreach ( func_get_args() as $property )
    {
      $result[] = $this->getProperty($property);
    }
    return $result;
  }

  /**
   * Cast the given value to the correct php type according to its
   * property type
   *
   * @param string $propertyName
   * @param string $value
   * @return unknown
   */
  public function typecast($propertyName, $value)
  {
    $type = $this->getPropertyType( $propertyName );
    switch ( $type )
    {
      case "int":
        return (int) $value;
      case "boolean":
      case "bool":
        return (bool) $value;
      case "string":
        return (string) $value;
      default:
        return $value;
    }
  }

  /**
   * Shortcut to get a property on the current record
   */
  public function get($property)
  {
    return $this->getProperty($property);
  }

  /**
   * Sets a property in the current model recordset. Unless you provide an id,
   * you need to call the update() method to commit the property change to the database.
   * Returns the object.
   *
   * @param string|array $first If $first is an associated array, set all
   * key/value pairs as properties.
   * @param mixed  $value
   * @param int $id if given, find and update property recordId
   * @return qcl_data_model_ActiveRecord
   */
  public function set( $first, $value=null, $id=null )
  {
    if ( is_array($first) )
    {
      foreach( $first as $key => $value )
      {
        $this->setProperty($key, $value, $id);
      }
      return $this;
    }
    elseif ( is_a( $first, "qcl_data_model_xmlSchema_DbModel" ) )
    {
      $this->raiseError("Passing a qcl_data_model_xmlSchema_DbModel as argument is deprecated for ::set(). Use copySharedProperties() instead.");
    }
    elseif ( is_string( $first ) )
    {
      return $this->setProperty( $first, $value, $id);
    }
    else
    {
      $this->raiseError("Illegal first argument.");
    }
  }


  /**
   * Returns all property values that exists in both models.
   * @param qcl_data_model_xmlSchema_DbModel $model
   * @return array
   */
  public function getSharedPropertyValues ( $model )
  {
    $myProperties    = $this->properties();
    $data            = $model->getRecord();

    foreach( $data as $key => $value )
    {
      if ( ! in_array($key, $myProperties) )
      {
        unset($data[$value]);
      }
    }
    return $data;
  }

  /**
   * Copies all properties that exists in both models except the 'id' property.
   * @param qcl_data_model_xmlSchema_DbModel $model
   * @return void
   */
  public function copySharedProperties ( $model, $exclude=array() )
  {
    $myProperties    = $this->getProperties();
    $data            = $model->getRecord();

    foreach( $data as $key => $value )
    {
      if ( $key != "id" and in_array( $key, $myProperties ) and ! in_array( $key, $exclude ) )
      {
        $this->setProperty($key,$value);
      }
    }
  }


  /**
   * Compares all properties that exists in both models.
   * @param qcl_data_model_xmlSchema_DbModel $that Other model
   * @param array[optional] $diff Array that needs to be passed by reference that will contain a list of parameters that differ
   * @return bool True if all property values are identical, false if not
   */
  public function compareSharedProperties ( $that, $diff )
  {
    $diff = array();
    $properties = array_intersect(
                  $this->properties(),
                  $that->properties()
                );

    $isEqual = true;
    foreach( $properties as $name )
    {
      $prop1 = trim($this->getProperty( $name ));
      $prop2 = trim($that->getProperty( $name ));
      //$this->debug("$prop1 => $prop2");

      if ( $prop1 !== $prop2  )
      {
        $isEqual = false;
        $diff[$name] = array($prop1,$prop2);
      }
    }
    return $isEqual;
  }

  /**
   * Sets a property in the current model recordset. Unless you provide an id,
   * you need to call the update() method to commit the property change to the database.
   * @return void
   * @param string     $name
   * @param mixed      $value
   * @param int        $id if given, find and update property recordd
   */
  public function setProperty( $name, $value, $id=null )
  {
    if ( ! $this->hasProperty($name) )
    {
      $this->raiseError("Model does not have property '$name'.");
    }


    /*
     * retrieve record if id is given
     */
    if ( ! is_null( $id ) )
    {
      $this->load( $id );
      $data['id'] = $id;
    }

    /*
     * else use current record
     */
    elseif ( $this->hasProperty("id") )
    {
      if ( $name == "id" )
      {
        $data['id'] = $id;
      }
      else
      {
        $data['id'] = $this->getId();
      }
    }
    else
    {
      $this->raiseError("Model " . $this->className() . " has no 'id' property.");
    }

    //$this->debug("Setting property '$name' = '$value' (" . gettype($value) .") on record #$id");

    /*
     * typecast all values except NULL to the types determined
     * by the property
     */
    if ( ! is_null($value) )
    {
      $value = $this->typecast($name, $value);
    }
    $this->currentRecord[$name] = $value;
    $data[$name] = $value;

    /*
     * commit property if id was given
     */
    if ( ! is_null( $id ) )
    {
      $this->update($data);
    }

    return true;
  }

  /**
   * Removes the given properties from the current record
   * This has no effect on the property schema or the data stored
   * in the database.
   * @param array $properties
   * @return void
   */
  public function unsetProperties( $properties=null )
  {
    if ( ! is_array($properties ) )
    {
      $this->raiseError("Invalid parameter.");
    }
    foreach ( $properties as $p )
    {
      if ( ! $this->hasProperty($p) )
      {
        $this->raiseError("Model does not have property '$p'");
      }
      unset( $this->currentRecord[$p] );
    }
  }

  //-------------------------------------------------------------
  // Data creation and manipulation
  //-------------------------------------------------------------


  /**
   * creates a new record and optionally links it to a foreign table (must be implemented in ::create() )
   * @param string  $namedId
   * @return int the id of the inserted or existing row
   */
  public function createIfNotExists( $namedId  )
  {
    if ( $this->namedIdExists( $namedId ) )
    {
      return $this->getIdByNamedId( $namedId );
    }
    return $this->create( $namedId );
  }

  /**
   * Inserts a new empty record amd returns the id of the record,
   * if any.
   * @param string[optional, default] $namedId
   * @return int the id of the inserted row
   */
  public function create( $namedId = null )
  {

    /*
     * get default data record
     */
    $this->setRecord( $this->emptyRecord );

    /*
     * set named id if given
     */
    if ( $namedId )
    {
      $namedIdCol = $this->_checkHasNamedId();
      $this->currentRecord[$namedIdCol] = $namedId; // You cannot use setNamedId here because we don't have an id yet
    }

    /*
     * insert data
     */
    $id = $this->insert( $this->getRecord() );
    if ( ! $id )
    {
      $this->warn( "Could not create '$namedId', probably already exists.");
    }

    /*
     * return new id
     */
    return $id;

  }


  /**
   * Inserts a record into the model data
   * @param array|stdClass $data associative array with the column names as keys and the column data as values
   * @return int the id of the inserted row or 0 if the insert was not successful
   * @abstract
   */
  public function insert( $data )
  {
    $this->notImplemented(__CLASS__);
  }


  /**
   * Converts property names to the local aliases
   * @param array $data Associative array with the property names as keys
   * @return array
   */
  public function unschematize ( $data )
  {
    return $data;

    /*
     * convert property names to column names if necessary
     */
    foreach ($data as $key => $value)
    {

      /*
       * property equals column name. nothing to do.
       */
      if ( $this->properties[$key] == $key)
      {
        continue;
      }

      /*
       * key is an alias ( = column name). this occurs when the data is in
       * the native table format. nothing to do
       */
      elseif ( isset( $this->aliases[$key] ) )
      {
        continue;
      }

      /*
       * key is a property, get the column name. this should be
       * default. we need
       * to copy the property value to the column key and delete the
       * property key
       */
      elseif ( $this->hasProperty($key) )
      {
        $columnName = $this->getPropertySchemaName($key);
        $data[ $columnName ] = $value;
        unset( $data[ $key ] );
      }

      /*
       * otherwise, the key is invalid.  delete key and value
       */
      else
      {
        $this->warn("Ignoring nonexistent model property '$key' ({$this->name}).");
        unset( $data[ $key ] );
      }

      //$this->debug("$key => $columnName : $value");

    }

    return $data;
  }

  /**
   * Updates a record in a table identified by id
   * @param array       $data   associative array with the column names as keys and the column data as values
   * @param int|string  $id   if the id key is not provided in the $data paramenter, provide it here (optional)
   * @param bool        $keepTimestamp If true, do not overwrite the 'modified' timestamp
   * @return boolean success
   */
  public function update ( $data=null, $id=null, $keepTimestamp= false )
  {
    $this->notImplemented(__CLASS__);
  }


  /**
   * Alias for update() without parameters
   */
  public function save()
  {
    return $this->update();
  }

  /**
   * deletes one or more records in a table identified by id
   * @param mixed $ids (array of) record id(s)
   */
  public function delete ( $ids )
  {
    $this->raiseError("Not implemented for class " . $this->className() );
  }


  /**
   * Finds a record by its namedId or creates it if necessary
   * @param  string $namedId
   * @return int Id of found or newly created record
   */
  public function createOrFind( $namedId )
  {
    $this->findByNamedId( $namedId );
    if ( $this->foundNothing() )
    {
      $this->create( $namedId );
    }
    return $this->getId();
  }

  //-----------------------------------------------------------------------
  // Information on records
  //-----------------------------------------------------------------------

  /**
   * Returns number of records in the database
   * @return int
   */
  public function countRecords()
  {
    $this->raiseError("Not implemented for class " . $this->className() );
  }

  /**
   * Returns the ids of all records in the database
   * @return array
   */
  public function ids()
  {
    return $this->findValues($this->getColumnName("id"));
  }

  /**
   * Gets the timestamp of the last modification
   * @param int[optional] $id Optional id, if omitted, use current record
   */
  public function getModified($id=null)
  {
    return $this->getProperty("modified",$id);
  }

  /**
   * Gets the timestamp of the creation of the record
   * @param int[optional] $id Optional id, if omitted, use current record
   */
  public function getCreated($id=null)
  {
    return $this->getProperty("created",$id);
  }
}
?>