<?php

/*
 * dependencies
 */
require_once "qcl/mvc/AbstractModel.php";

/**
 * Model that has a set of properties which optionally can be connected
 * to a datasource which holds all connection data etc. You need to
 * subclass this class in order to use it.
 * @todo rename methods "getX()" into "x()" if they refer to
 * the whole model or all records. "getFoo" should only be used for
 * model data.
 */
class qcl_mvc_AbstractPropertyModel extends qcl_mvc_AbstractModel
{

 /**
   * The current record cached. Access with ::getRecord()
   * @access private
   * @var array
   */
  var $currentRecord = null;

  /**
   * The result of the last query
   * @access private
   * @var array
   */
  var $_lastResult = null;

  /**
   * A blueprint of an newly initialized record.
   * you can pre-insert static values here
   * @var array
   */
  var $emptyRecord = array();


  /**
   * The datasource model object, if any
   * @var qcl_datasource_model
   */
  var $datasourceModel = null;

  /**
   * The datasource name or other information identifying the datasource
   * @var string
   */
  var $datasource;

  /**
   * The name of the model. Should be a java-like class name such as "namespace.package.ClassName"
   * @var string
   */
  var $name;

  /**
   * The type of the model, if the model implements a generic
   * type in a specific way
   *
   * @var string
   */
  var $type;

  /**
   * The class name of the model.
   *
   * @var string
   */
  var $class;


  /**
   * An associated array having the names of all properties (including linked tables) as
   * keys and the same names OR a local alias as value. To get a list of properties, use
   * qcl_db_model_xml_XmlSchemaModel::getProperties();
   * @access private
   * @var array
   */
  var $properties = array();


  /**
   * Flag to indicate whether result of an sql search
   * is to be retrieved (false) or if the search is
   * only prepared and then retrieved record by record
   * with the qcl_db_model_AbstractModel::nextRecord() function (true)
   */
  var $_isSearch = false;

  /**
   * Constructor
   * @param qcl_mvc_Controller|qcl_mvc_AbstractModel  $controller You can also pass a qcl_mvc_AbstractModel object here,
   * since the controller can be retrieved from them model.
   * @param mixed $datasource Datasource model object or null if no datasource
   */
  function __construct( $controller=null, $datasourceModel=null )
  {

    /*
     * call parent constructor
     */
    parent::__construct( &$controller );

    /*
     * if $controller parameter is a datasource model,
     * we can use this as datasource and get the
     * controller from it
     */
    if ( is_null( $datasourceModel ) and is_a( $controller, "qcl_datasource_type_db_Model" ) )
    {
      $datasourceModel =& $controller;
    }

    /*
     * debug message
     *
    $c = $this->getController();
    $this->debug( "Constructing model '" . $this->className() .
                "' controlled by '" . $c->className() . "'" .
                ( is_object( $datasourceModel ) ?
                  " and by datasource model class '" . get_class( $datasourceModel ) . "'." : ". " ),
                "framework");
    */

    /*
     *  initialize the model
     */
    $this->initialize( &$datasourceModel );

  }

  /**
   * Returns model name
   */
  function name()
  {
    return $this->name;
  }

  /**
   * Initializes the model
   * @return unknown_type
   */
  function initialize()
  {
    $this->notImplemented(__CLASS__) ;
  }


  /**
   * Stores the name or object reference of the datasource that
   * provides information on access to the data
   * @param mixed $datasource Either the name of the datasource or an
   * object reference to the datasource object
   * return void
   */
  function setDatasourceModel( $datasource )
  {
    if ( is_object ( $datasource ) and is_a( $datasource, "qcl_datasource_type_db_Model") )
    {
      $this->datasourceModel =& $datasource;
    }
    else
    {
      $this->raiseError("Argument must be a qcl_datasource_type_db_Model object");
    }
  }

  /**
   * Retrieves the datasource object
   * @return qcl_datasource_type_db_Model
   */
  function &getDatasourceModel()
  {
    return $this->datasourceModel;
  }

  //-------------------------------------------------------------
  // Properties and Columns
  //-------------------------------------------------------------

  /**
   * Return the names of all properties of this model
   * @deprecated, use ::properties() instead
   * @todo rename
   * @return array
   */
  function getProperties()
  {
    return $this->properties();
  }

  /**
   * Return the names of all properties of this model
   * @return array
   */
  function properties()
  {
    $this->notImplemented(__CLASS__);
  }

  /**
   * Checks if property exists
   *
   * @param string $name
   * @return bool
   */
  function hasProperty( $name )
  {
    $this->notImplemented(__CLASS__);
  }

  /**
   * checks if a property has a local alias
   *
   * @param string $propName property name
   */
  function hasAlias($propName)
  {
    $this->notImplemented(__CLASS__);
  }


  /**
   * Gets the simple type of the model property (string, int, etc.)
   *
   * @param string $name
   * @return string
   */
  function getPropertyType ( $name )
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
  function getId()
  {
    $id = $this->currentRecord['id'];
    if ( ! $id )
    {
      $this->raiseError("No record loaded in model " . $this->className() );
    }
    return $id;
  }

  /**
   * Alias of getId()
   * return int
   */
  function id()
  {
    return $this->getId();
  }

  /**
   * Returns the named id if it exists as property
   * @return string
   */
  function getNamedId()
  {
    return $this->getProperty("namedId");
  }


  /**
   * Sets the named id if it exists as property
   * @return string
   */
  function setNamedId( $namedId )
  {
    return $this->setProperty("namedId",$namedId);
  }

  /**
   * Checks whether model has 'namedId' property
   * @return bool
   */
  function _checkHasNamedId()
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
  function getIdByNamedId( $namedId )
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
  function getNamedIdById( $id )
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
  function namedIdExists( $namedId )
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
  function findBy( $propName, $value, $orderBy=null, $properties=null )
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
  function searchBy( $propName, $value, $orderBy=null, $properties=null )
  {
    $this->_isSearch = true;
    return $this->findBy(  $propName, $value, $orderBy, $properties );
  }


  /**
   * Returns all database records optionally sorted by property
   * @param string|null[optional] $orderBy     Order by property
   * @param array|null[optional]  $properties  Array of properties to retrieve or null (default) if all
   * @return array
   */
  function findAll( $orderBy=null, $properties=null )
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
  function searchAll( $orderBy=null, $properties=null )
  {
    $this->_isSearch = true;
    return $this->findWhere( null, $orderBy, $properties );
  }

  /**
   * Returns all distinct values of a model property that match a where condition
   * @param string $property Name of property
   * @param string|null[optional] $where Where condition to match, if null, get all
   * @param string|null[optional] $orderBy Property to order by
   * @return array Array of values
   */
  function findDistinctValues( $property, $where=null, $orderBy=null)
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
  function findWhere( $where=null, $orderBy=null, $properties=null )
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
  function searchWhere( $where=null, $orderBy=null, $properties=null )
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
  function findDistinct( $property, $where=null, $orderBy=null )
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
  function findValues( $property, $where=null, $orderBy=null, $distinct=false )
  {
    $this->notImplemented( __CLASS__ );
  }

  /**
   * Whether the last query didn't find any records
   * @return boolean
   */
  function foundNothing()
  {
    return is_null( $this->currentRecord );
  }

  /**
   * Whether the last query was successful
   * @return boolean
   */
  function foundSomething()
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
  function findById( $ids, $orderBy=null, $properties=null )
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
  function searchById( $ids, $orderBy=null, $properties=null )
  {
    $this->_isSearch = true;
    return $this->findById( $ids, $orderBy, $properties);
  }

  /**
   * Return database records by their named id
   * @param array|string $ids Id or array of ids
   * @param string|null[optional] $orderBy     Order by property
   * @param array|null[optional]  $properties  Array of properties to retrieve or null (default) if all
   * @return Array Array of db record sets
   */
  function findByNamedId( $ids, $orderBy=null, $properties=null )
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
  function searchByNamedId( $ids, $orderBy=null, $properties=null )
  {
    $this->_isSearch = true;
    return $this->findByNamedId( $ids, $orderBy, $properties );
  }


  //-------------------------------------------------------------
  // Retrieving query results in different formats
  //-------------------------------------------------------------

  /**
   * Gets the data as an associated array from the data provided
   * @param array|stdClass|qcl_db_model_xml_XmlSchemaModel $data
   * @return array
   */
  function _getArrayData( $data )
  {
    if ( is_a( $data, "qcl_db_model_AbstractModel" ) )
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
  function getRecord()
  {
    return $this->currentRecord;
  }


  /**
   * Sets the data of the currently loaded record
   * @param mixed $record
   * @return void
   */
  function setRecord($record)
  {
    $this->currentRecord = $record;
  }

  /**
   * If the last query has found more then one record, get the text one
   * @return array
   */
  function nextRecord()
  {
    if ( $this->_isSearch )
    {
      return $this->_nextRecord();
    }
    else
    {
      if ( ! count( $this->_lastResult ) )
      {
        return false;
      }

      /*
       * throw away the first record
       */
      array_shift($this->_lastResult);

      /*
       * and set the first element as current record
       */
      $this->setRecord( $this->_lastResult[0] );
    }
    return $this->getRecord();
  }

  /**
   * Function that needs to be implemented by model if the
   * result set is to be retrieved record by record after
   * calling a search...() method.
   * @return array
   */
  function _nextRecord()
  {
    $this->raiseError("Not implemented for Model " . $this->className() );
  }


  /**
   * Gets the data of the currently loaded record as a stdClass object
   * so you can use $record->foo instead of $record['foo']
   * @return stdClass
   */
  function getRecordObject()
  {
    $obj = (object) $this->currentRecord;
    return $obj;
  }


  /**
   * Gets the data from the last find query
   * @return array
   */
  function getResult()
  {
    return $this->_lastResult;
  }

  /**
   * Sets the data from the last find query
   * @param array $result
   * @return void
   */
  function setResult( $result )
  {
    $this->_lastResult = $result;
  }

  /**
   * return query result as a an
   */
  function getResultTree( $property )
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
  function values()
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
  function compareWith( $compare, $fields=null )
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
  function getProperty( $name, $id = null )
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
        $this->raiseError("Cannot get property '$name' from model '{$this->name}: no record loaded.");
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
        $this->raiseError("Cannot get property '$name' from model '{$this->name}: Record #$id does not exist.");
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

  function getRawProperty( $name )
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
  function listProperties()
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
  function typecast($propertyName, $value)
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
  function get($property)
  {
    return $this->getProperty($property);
  }

  /**
   * Sets a property in the current model recordset. Unless you provide an id,
   * you need to call the update() method to commit the property change to the database.
   * Alias of setProperty
   * @return void
   * @param string|array $first If $first is an associated array, set all
   * key/value pairs as properties.
   * @param mixed  $value
   * @param int $id if given, find and update property recordId
   * @todo
   */
  function set( $first, $value=null, $id=null )
  {
    if ( is_array($first) )
    {
      foreach( $first as $key => $value )
      {
        $this->setProperty($key, $value, $id);
      }
      return true;
    }
    elseif ( is_a( $first, "qcl_db_model_xml_XmlSchemaModel" ) )
    {
      $this->raiseError("Passing a qcl_db_model_xml_XmlSchemaModel as argument is deprecated for ::set(). Use copySharedProperties() instead.");
      return $this->set( $first->getRecord() );
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
   * @param qcl_db_model_xml_XmlSchemaModel $model
   * @return array
   */
  function getSharedPropertyValues ( $model )
  {
    $myProperties    = $this->getProperties();
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
   * @param qcl_db_model_xml_XmlSchemaModel $model
   * @return void
   */
  function copySharedProperties ( $model, $exclude=array() )
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
   * @param qcl_db_model_xml_XmlSchemaModel $that Other model
   * @param array[optional] $diff Array that needs to be passed by reference that will contain a list of parameters that differ
   * @return bool True if all property values are identical, false if not
   */
  function compareSharedProperties ( $that, &$diff )
  {
    $diff = array();
    $properties = array_intersect(
                    $this->getProperties(),
                    $that->getProperties()
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
  function setProperty( $name, $value, $id=null )
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
  function unsetProperties( $properties=null )
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
  function createIfNotExists( $namedId  )
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
  function create( $namedId = null )
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
  function insert( $data )
  {
    $this->notImplemented(__CLASS__);
  }

  /**
   * Converts property names to the local aliases
   * @param array $data Associative array with the property names as keys
   * @return array
   */
  function unschematize ( $data=null )
  {

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
   * updates a record in a table identified by id
   * @param array       $data   associative array with the column names as keys and the column data as values
   * @param int|string  $id   if the id key is not provided in the $data paramenter, provide it here (optional)
   * @param bool        $keepTimestamp If true, do not overwrite the 'modified' timestamp
   * @return boolean success
   */
  function update ( $data=null, $id=null, $keepTimestamp= false )
  {
    $this->notImplemented(__CLASS__);
  }


  /**
   * Alias for update() without parameters
   */
  function save()
  {
    return $this->update();
  }

  /**
   * deletes one or more records in a table identified by id
   * @param mixed $ids (array of) record id(s)
   */
  function delete ( $ids )
  {
    $this->raiseError("Not implemented for class " . $this->className() );
  }


  /**
   * Finds a record by its namedId or creates it if necessary
   * @param  string $namedId
   * @return int Id of found or newly created record
   */
  function createOrFind( $namedId )
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
  function countRecords()
  {
    $this->raiseError("Not implemented for class " . $this->className() );
  }

  /**
   * Returns the ids of all records in the database
   * @return array
   */
  function ids()
  {
    return $this->findValues($this->getColumnName("id"));
  }

  /**
   * Gets the timestamp of the last modification
   * @param int[optional] $id Optional id, if omitted, use current record
   */
  function getModified($id=null)
  {
    return $this->getProperty("modified",$id);
  }

  /**
   * Gets the timestamp of the creation of the record
   * @param int[optional] $id Optional id, if omitted, use current record
   */
  function getCreated($id=null)
  {
    return $this->getProperty("created",$id);
  }

}
?>