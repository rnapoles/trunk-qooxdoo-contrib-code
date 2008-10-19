<?php  

/*
 * dependencies
 */
require_once "qcl/jsonrpc/model.php";
require_once "qcl/xml/simpleXML.php";

/**
 * Model that has a set of properties defined by an xml schema
 * and which optionally can be connected to a datasource which
 * holds all connection data etc. 
 * @todo: rename methods "getX()" into "x()" if they refer to 
 * the whole model or all records. "getFoo" should only be used for
 * model data.
 */
class qcl_core_PropertyModel extends qcl_jsonrpc_model
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
   * The schema as an simpleXml object, containing all
   * included xml files. Acces with qcl_db_model::getSchemaXml();
   * @access private
   * @var qcl_xml_simpleXML
   */
  var $schemaXml;
  
  /**
   * Shortcuts to property nodes in schema xml. Access with qcl_db_model::getPropertyNode($name)
   * @array array of object references
   */
  var $propertyNodes;

  /**
   * An associated array having the names of all properties (including linked tables) as
   * keys and the same names OR a local alias as value. To get a list of properties, use
   * qcl_db_model::getProperties();
   * @access private
   * @var array
   */
  var $properties = array();  

  /**
   * An associated array having the names of all alias as
   * keys and the property names as value.
   * @access private
   * @var array
   */
  var $aliases = array();    
  
  /**
   * Shortcuts to property nodes which belong to metadata
   * @array array of object references
   */
  var $metaDataProperties;  
  
  /**
   * The path to the model schema xml file. ususally automatically resolved.
   * @see qcl_db_model::getSchmemaXmlPath()
   * @var string
   */
  var $schemaXmlPath = null;  
  

  /**
   * Constructor 
   * @param qcl_jsonrpc_controller  $controller
   * @param mixed $datasource Datasource model object or null if no datasource 
   */
  function __construct( $controller, $datasourceModel=null )
  {
  
    parent::__construct(&$controller);
  
    $this->log("Constructing '" . get_class($this) . "' with controller and '" . get_class($datasourceModel) . "'.");
  
    /*
     * overload the outmost class. only needed in PHP 4.
     */
    if ( phpversion() < 5)
    {
      overload( get_class($this) );
    }
    
    /*
     *  initialize the model
     */
    $this->initialize( &$datasourceModel );
       
  }
  
  //-------------------------------------------------------------
  // overloading
  //-------------------------------------------------------------   

  /**
   * method called when called method does not exist. This will check whether 
   * method name is 
   * 
   * - getXxx or setXxx and then call getProperty("xxx") 
   *    or setProperty("xxx", $arguments[0]). 
   * - findByXxx to call findBy("xxx",...)
   * 
   * Otherwise, raise an error.
   * @param string $function  Method name
   * @param array  $arguments Array or parameters passed to the method
   * @param mixed  $return    call-time reference to return value (PHP4-only)
   * @return mixed return value (PHP5 only) 
   */
  function __call( $function, $arguments, &$return) 
  {
    /*
     * we need to reimplement the mixin behavior from 
     * qcl_object because we cannot call the parent 
     * class method
     * @see qcl_object::__call()
     */
    if ( phpversion() >= 5 and isset($this->_mixinlookup[$method] ) )
    {
      $elems = array();
      for ($i=0, $_i=count($args); $i<$_i; $i++) $elems[] = "\$args[$i]";
      eval("\$result = ".$this->_mixinlookup[$method]."::"
          .$method."(".implode(',',$elems).");");
      return $result;
    }
    
    /*
     * php4 or no matching mixin methods found.
     * Now we intercept method calls
     */
    $startsWith = strtolower( substr( $function, 0, 3 ) );
    $endsWith   = strtolower( substr( $function, 3 ) );
    
    /*
     * get.. and set... for property access
     * @todo: correct calling of method with variable arguments
     */
    if ( $startsWith == "set" )
    {
      //$this->info("setting $endsWith = " . $arguments[0] . "(" . gettype($arguments[0]) . ")." . print_r($arguments,true));
      $this->setProperty( $endsWith, $arguments[0], $arguments[1], $arguments[2] );
    }
    elseif ( $startsWith == "get" )
    { 
      $return = $this->getProperty( $endsWith, $arguments[0], $arguments[1], $arguments[2] );
      //$this->info("getting $endsWith = $return");
    }
    
    /*
     * findBy...
     */
    elseif ( strtolower( substr( $function, 0, 6 ) ) == "findby" )
    {
      $propName = strtolower( substr( $function, 6 ) );
      $return = $this->findBy($propName,$arguments[0],$arguments[1],$arguments[2]);
    }
    
    /*
     * method not known, raise error
     */
    else
    {
      $this->raiseError("Unknown method " . get_class($this) . "::$function().");
    }
    
    /*
     * return result
     */
    if ( phpversion() < 5) 
    {
      return true; // PHP 4: return value is in &$return
    }
    else
    {
      return $return; // PHP 5  
    }
  } 
      
  //-------------------------------------------------------------
  // Initialization
  //-------------------------------------------------------------   

  /**
   * initializes the model
   * @param mixed $datasource Object reference to
   * the datasource object, or null if model is independent of a datasource
   * @return void
   */
  function initialize( $datasource=null )
  {
  
    $this->log("Initializing '" . get_class($this) . "' with '" . get_class($datasource) . "'." );
  
    /*
     * datasource model
     */
    if ( is_object($datasource) )
    {
      $this->setDatasourceModel( &$datasource );
    }
    
        
    /*
     * parse schema document into $this->schemaXml
     */
    $this->getSchemaXml();
    
    /*
     * setup properties 
     */
    $this->setupProperties();    
    

  }   

  //-------------------------------------------------------------
  // Datasource
  //-------------------------------------------------------------     

  /**
   * Stores the name or object reference of the datasource that
   * provides information on access to the data
   * @param mixed $datasource Either the name of the datasource or an 
   * object reference to the datasource object
   * return void
   */
  function setDatasourceModel( $datasource )
  {
    if ( is_object ( $datasource ) and is_a( $datasource, "qcl_datasource_db_model") )
    {
      $this->datasourceModel =& $datasource;
    }
    else
    {
      $this->raiseError("Argument must be a qcl_datasource_db_model object");
    }
  }  
  
  /**
   * Retrieves the datasource object
   * @return qcl_datasource_db_model
   */
  function &getDatasourceModel()
  {
   //if ( is_object ( $this->datasourceModel ) )
   //{ 
    return $this->datasourceModel;
   //}
   //$this->raiseError("No datasource model set.");
  }
  
  //-------------------------------------------------------------
  // Properties and Columns
  //-------------------------------------------------------------   

  /**
   * Return the names of all properties of this model
   * @return array
   */
  function getProperties()
  {
    $this->getSchemaXml(); // make sure schema has been initialized
    return array_keys($this->properties);
  }
  
  /**
   * Checks if property exists
   *
   * @param string $name
   * @return bool
   */
  function hasProperty( $name )
  {
    $this->getSchemaXml(); // make sure schema has been initialized
    return isset( $this->properties[$name] );    
  }
  
  /**
   * checks if a property has a local alias 
   *
   * @param string $propName property name
   */
  function hasAlias($propName)
  {
    $this->getSchemaXml(); // make sure schema has been initialized
    return ( $this->properties[$propName] != $propName );
  }
  
  
  /**
   * gets the name the property has in the model schema (i.e. either
   * the unchanged name or a local alias)
   * @param string $name
   * @return string
   */
  function getPropertySchemaName ( $name )
  {
    $this->getSchemaXml(); // make sure schema has been initialized
    return $this->properties[$name];
  }
    
  /**
   * Gets the node in the schema xml that contains information on 
   * the property
   *
   * @param string $name
   * @return SimpleXmlElement  
   */
  function &getPropertyNode ( $name )
  {
    $this->getSchemaXml(); // make sure schema has been initialized
    return $this->propertyNodes[ $name ];
  }

  /**
   * Gets the simple type of the model property (string, int, etc.)
   *
   * @param string $name
   * @return string
   */
  function getPropertyType ( $name )
  {
    $node  =& $this->getPropertyNode( $name );
    $attrs =  $node->attributes();
    return $attrs['type']; 
  }
  
  /**
   * gets the property name corresponding to a column name
   * @return string Field Name
   * @param string $columnName
   */
  function getPropertyName ( $columnName )
  {
    $this->getSchemaXml(); // make sure aliasMap is initialized
    static $reverseAliasMap = null;
    if ( !$reverseAliasMap )
    {
      $reverseAliasMap = array_flip($this->properties);
    }
    return $reverseAliasMap[$columnName];
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
    $id = $this->getProperty("id");
    if ( ! $id )
    {
      $this->raiseError("No record loaded.");
    }
    return $id; 
  }
 
  /**
   * Checks whether model has 'namedId' property
   * @return void
   */
  function _checkHasNamedId()
  {
    if ( ! $this->hasProperty("namedId") )
    {
      $this->raiseError("Model " . $this->getClassName() . " has no 'namedId' property.");  
    }
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
  // Record Retrieval (find... methods)
  //-------------------------------------------------------------   
 
  /**
   * Returns a records by property value
   * @param string $propName Name of property
   * @param string $value Value to find
   * @param string|null[optional] $orderBy  Field to order by
   * @param array|null[optional]  $properties  Array of properties to retrieve or null (default) if all
   * properties are to be retrieved
   * @return array recordset
   */
  function findBy( $propName, $value, $orderBy=null, $properties=null )
  {
    $this->raiseError("Not implemented for Model " . $this->getClassName() );
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
   * Find database records by their primary key
   * @param array|int $ids Id or array of ids
   * @param string|null[optional] $orderBy     Order by property
   * @param array|null[optional]  $properties  Array of properties to retrieve or null (default) if all
   * @return Array Array of db record sets
   */
  function findById( $ids, $orderBy=null, $properties=null )
  {
    $this->raiseError("Not implemented for Model " . $this->getClassName() );
  }

  /**
   * find database records by their named id
   * @param array|string $ids Id or array of ids
   * @param string|null[optional] $orderBy     Order by property
   * @param array|null[optional]  $properties  Array of properties to retrieve or null (default) if all
   * @return Array Array of db record sets
   */
  function findByNamedId( $ids, $orderBy=null, $properties=null )
  {
    $this->raiseError("Not implemented for Model " . $this->getClassName() );
  }   
  

  //-------------------------------------------------------------
  // Retrieving query results in different formats
  //-------------------------------------------------------------     

  /**
   * Gets the data as an associated array from the data provided
   * @param array|stdClass|qcl_db_model $data
   * @return array
   */
  function _getArrayData( $data )
  {
    if ( is_a( $data, "qcl_db_model" ) )
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
  function getValues()
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
    //$this->info("The data is " . ($isEqual ? "equal" : "not equal") ); 
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
     * property exists, return straight
     */    
    if ( isset( $this->currentRecord[$name] ) )
    {
      return $this->currentRecord[$name];
    }
    else
    {
      /*
       * property doesn't exist, either the current record is in a unconverted
       * (column) format or there is a letter case problem
       */
      foreach ( $this->currentRecord as $key => $value )
      {
        if ( strtolower($key) == strtolower($name) )
        {
          return $value;
        }
        elseif ( strtolower( $this->aliases[$key] ) == strtolower($name) )
        {
          return $value;
        }
      }
    }
    
    /*
     * property name was not found
     */
    if ( $this->hasProperty($name) )
    {
      return null;
    }
    else
    {
      $this->raiseError("Property '$name' does not exist.'");
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
   * @todo: 
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
    elseif ( is_a( $first, "qcl_db_model" ) )
    {
      $this->raiseError("Passing a qcl_db_model as argument is deprecated for ::set(). Use copySharedProperties() instead.");
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
   * @param qcl_db_model $model
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
   * Copies all properties that exists in both models.
   * @param qcl_db_model $model
   * 
   */
  function copySharedProperties ( $model )
  {
    $myProperties    = $this->getProperties();
    $data            = $model->getRecord();
    
    foreach( $data as $key => $value )
    {
      if ( in_array($key, $myProperties) )
      {
        $this->setProperty($key,$value);
      }
    } 
  } 
  
  

  /**
   * Compares all properties that exists in both models.
   * @param qcl_db_model $that Other model
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
      //$this->info("$prop1 => $prop2");
      
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
    //$this->info("set property '$name' = '$value' (" . gettype($value) .") on record #$id");
    
    /*
     * retrieve record if id is given
     */
    if ( ! is_null( $id ) )
    {
      $this->findById( $id );
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
     $this->raiseError("Model " . $this->getClassName() . " has no 'id' property."); 
    } 
    
    /*
     * if property name exists, set it
     */    
    if ( isset( $this->currentRecord[$name] ) )
    {
      $this->currentRecord[$name] = $value;
      $data[$name] = $value;
    }
    
    /*
     * if property name doesn't exist, either the current 
     * record is in a unconverted 
     * (column) format or there is a letter case problem
     */    
    else
    {
      $found = false;
      foreach ( $this->getProperties() as $key ) 
      {
        if ( strtolower($key) == strtolower($name) )
        {
          $this->currentRecord[$key] = $value;
          $data[$key] = $value;
          $found = true;
        }
        elseif ( strtolower($this->getColumnName($key) ) == strtolower($name) )
        {
          $this->currentRecord[$key] = $value;
          $data[$key] = $value;
          $found = true;
        }
      }
      
      /*
       * if still not found, raise error
       */
      if ( ! $found )
      {
        $this->raiseError("Property '$name' does not exist.'");
      }
    }
    
    /*
     * commit property if id was given
     */
    if ( ! is_null( $id ) )
    {
      $this->update($data);
    }
    
    return true;
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
    $this->setRecord($this->emptyRecord); 
    
    /*
     * set named id if given
     */
    if ( $namedId )
    {
      $this->_checkHasNamedId();
      $this->setNamedId($namedId);  
    }
    
    /*
     * insert data
     */
    $id = $this->insert( $this->getRecord() );
    
    /*
     * load record, which might now contain additional values
     * set by the database
     */
    $this->findById($id);
    
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
    $this->raiseError("Not implemented for class " . $this->getClassName() );
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
      elseif ( isset( $this->properties[$key] ) )
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

      //$this->info("$key => $columnName : $value"); 

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
    $this->raiseError("Not implemented for class " . $this->getClassName() );
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
    $this->raiseError("Not implemented for class " . $this->getClassName() );
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
    $this->raiseError("Not implemented for class " . $this->getClassName() );
  }

  /**
   * Returns the ids of all records in the database
   * @return array
   */
  function ids()
  {
    return $this->getColumnValues($this->getColumnName("id"));
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
 
  //-------------------------------------------------------------
  // Model Setup methods
  //-------------------------------------------------------------
  
  /**
   * gets the path of the file that contains the initial
   * data for the model
   */
  function getDataPath()
  {
    $class = get_class($this);
    $path  = str_replace("_","/",$class) . ".data.xml";    
    return $path;
  }
  
  /**
   * setup model properties
   */
  function setupProperties()
  {

    /*
     * defintion node
     */
    $schemaXml  =& $this->getSchemaXml(); 
    $definition =& $schemaXml->getNode("/schema/model/definition");
    if ( ! $definition )
    {
      $this->raiseError("Model schema xml does not have a 'definition' node.");
    }
    
    /*
     * properties
     */
    $properties =& $definition->properties;
    $children   =& $properties->children();

    if ( ! is_object($properties) )
    {
      $this->raiseError("Model has no properties.");
    }
    
    foreach ( $children as $propNode)
    {
      $attrs     = $propNode->attributes(); 
      $propName  = $attrs['name'];
      
      
      /*
       * store shorcut object property for easy
       * sql string coding: "SELECT {$this->col_id} ..."
       */
      $columnVar = "col_$propName";
      $this->$columnVar = $propName;
      
      /*
       * store property node
       */
      $this->propertyNodes[$propName] = $propNode;
      
      /*
       * store property name as key and value
       */
      $this->properties[$propName] = $propName; 
      //$this->info(gettype($propNode)); 
    } 
    
//    $this->info("Properties:");
//    $this->info(array_keys($this->propertyNodes));
//    $this->info(array_keys(get_object_vars($this)));
    
    /*
     * aliases
     */
    $aliases =& $definition->aliases;
    if ( $aliases )
    {
      $aliasMap = array();
      foreach($aliases->children() as $alias)
      {
        
        /*
         * get alias
         */
        $attrs    = $alias->attributes();
        $propName = $attrs['for'];
        $column   = qcl_xml_simpleXML::getData(&$alias);
        
        /*
         * store in alias map
         */
        $aliasMap[$propName] = $column; 
        
        /*
         * overwrite object property
         */
        $columnVar = "col_$propName"; 
        $this->$columnVar = $column;
        
        /*
         * overwrite property name with alias
         */
        $this->properties[$propName] = $column; 
        
        /*
         * store in aliases array
         */
        $this->aliases[$column] = $propName;
      }
    }    
    //$this->info("Alias Map:");
    //$this->info($aliasMap);
    
    /*
     * setup metadata array with shortcuts to property nodes
     */
    $propGroups =& $definition->propertyGroups;
    if ( $propGroups )
    {
      $metaDataNode =& qcl_xml_simpleXML::getChildNodeByAttribute($propGroups,"name","metaData"); 
      if ( $metaDataNode )
      {
        foreach ( $metaDataNode->children() as $metaDataPropNode )
        {
          $attrs = $metaDataPropNode->attributes();
          $name  = $attrs['name'];
          //$this->info("$name => " . gettype($this->propertyNodes[$name]) );
          if ( isset($this->propertyNodes[$name]) )
          {
            $this->metaDataProperties[$name] =& $this->propertyNodes[$name];  
          }
        }
      }
      //$this->info("Metadata properties:"); 
      //$this->info( array_keys($this->metaDataProperties));      
    }
  }  
  
  /**
   * returns the absolute path of the xml file that
   * is connected by default to this model. It is located
   * in the same directory as the class file 
   * path/to/class/classname.schema.xml
   * return string
   */
  function getSchmemaXmlPath()
  {
    if ( $this->schemaXmlPath )
    {
      return $this->schemaXmlPath;
    }
    $class = get_class($this);
    return str_replace("_","/",$class) . ".model.xml";
  }
  
  /**
   * get the model schema as an simpleXml object
   * @param string $path path of schema xml file or null if default file is used
   * @return qcl_xml_simpleXML
   */  
  function &getSchemaXml($path=null)
  {
    
    /*
     * if schema file has already been parsed, return it
     */
    if ( is_object( $this->schemaXml ) )
    {
      return $this->schemaXml;
    }

    /*
     * parse schema file
     */
    $path = either( $path, $this->getSchmemaXmlPath() );
    if ( ! is_valid_file($path) )
    {
      $this->raiseError("No valid file path: '$path'");
    }
    
    /*
     * get and return schema document 
     */
    $this->schemaXml =& $this->parseXmlSchemaFile($path);
    return $this->schemaXml;     
  }
  
  /**
   * parses an xml schema file, processing includes
   * @param string $file
   * @return qcl_xml_simpleXML
   */
  function &parseXmlSchemaFile($file)
  {

    /*
     * load model schema xml file
     */
    //$this->info("Loading model schema file '$file'...");
    $modelXml =& new qcl_xml_simpleXML($file);
    $modelXml->removeLock(); // we don't need a lock, since this is read-only

    $doc =& $modelXml->getDocument();
    
    /*
     * does the model schema inherit from another schema?
     */
    $rootAttrs   = $doc->attributes();
    $includeFile = $rootAttrs['include'];
    
    if ( $includeFile  )
    {
      //$this->info("Including '$includeFile' into '$file'...");
      $parentXml   =& $this->parseXmlSchemaFile($includeFile);
      $modelXml->extend($parentXml);
      //$this->info($modelXml->asXml());
    }
    
    /*
     * return the aggregated schema object
     */
    return $modelXml;
  }
 
  //-------------------------------------------------------------
  // Import and export of model data
  //-------------------------------------------------------------  
  
  /**
   * exports model data to an xml file
   *
   * @param string $path file path, defaults to the location of the inital data file
   */
  function export($path=null)
  {
    /*
     * schema document
     */
    $schemaXml    =& $this->getSchemaXml(); 
    $schemaXmlDoc =& $schemaXml->getDocument();
      
    /*
     * path of exported file
     */
    $path    = either($path,$this->getDataPath());
    $this->info("Exporting {$this->name} data to $path");
    
    /*
     * remove old file
     */
    @unlink($path);
    
    /*
     * create new xml file
     */
    $dataXml =& new qcl_xml_simpleXML();
    $dataXml->createIfNotExists($path);
    $dataXml->load($path); 
    
    /*
     * create the main nodes
     */
    $doc         =& $dataXml->getDocument();
    $dataNode    =& $doc->addChild("data");
    $recordsNode =& $dataNode->addChild("records");

    /*
     * property groups in model schema
     */
    $propGrpsNode =& $schemaXml->getNode("/model/definition/propertyGroups");
    //$this->info($propGrpsNode->asXml());
    
    /*
     * metatdata property names
     */
    $metaDataProperties = array_keys($this->metaDataProperties);
    
    /*
     * list of properties minus those which should be
     * skipped
     */
    $propList     =  array_keys($this->properties); 
    $skipExpNode  =& $schemaXml->getChildNodeByAttribute(&$propGrpsNode,"name","skipExport");
    if ( $skipExpNode )
    {
      foreach($skipExpNode->children() as $skipPropNode )
      {
        $skipPropAttr = $skipPropNode->attributes();
        $skipPropList[] = $skipPropAttr['name'];
      }
    }
    $propList = array_diff($propList,$skipPropList);
    $this->info("Exporting properties " . implode(",",$propList) . ", skipping properties " . implode(",",$skipPropList) . ".");
    
    /*
     * export all records
     */ 
    $records = $this->findAll();
    
    foreach($records as $record)
    {
      $recordNode =& $recordsNode->addChild("record");
      
      /*
       * dump each column value 
       */
      foreach ($propList as $propName )
      {
        /*
         * property node
         */
        $propNode =& $this->propertyNodes[$propName];
        
        /*
         * column name is either alias or property name
         */
        $column = $this->getColumnName($propName);
    
        /*
         * column data; skip empty columns
         */
        $columnData = $record[$column];
        if ( empty($columnData) )
        {
          continue;  
        }
        
        $data = xml_entity_encode($columnData);
         
        if ( in_array($propName,$metaDataProperties) )
        {
          /*
           * if property is part of metadata, use attribute
           */          
          $recordNode->addAttribute($propName,$data); 
        }
        else
        { 
          /*
           * otherwise, create property data node 
           */
          $propDataNode =& $recordNode->addChild("property");
          $propDataNode->addAttribute("name",$propName);
          $dataXml->setData(&$propDataNode,$data);
        }
      }
    }
    
    /*
     * save xml
     */
    $dataXml->save();
  }
  

  
  /**
   * imports initial data for the model from an xml 
   * document into the database. The schema of the xml file is the following:
   * <pre>
   * <?xml version="1.0" encoding="utf-8"?>
   * <root>
   *  <data>
   *    <records>
   *      <record col1="a" col2="b">
   *        <property name="col3">c</property>
   *        <property name="col4">d</property>
   *        ...
   *      </record>
   *      <record col1="x" col2="y">
   *        property name="col3">z</property>
   *        ...
   *      </record>
   *      ...
   *    </records>
   *  <data>
   * </root>
   * </pre>
   * In this example, col1 and col2 are metadata columns/properties which allow
   * searching the xml document easily via xpath. both attributes and child nodes of
   * a <record> node will be imported into the database
   */
  function import($path)
  {
    /*
     * check file
     */
    if ( !is_valid_file($path) )
    {
      $this->raiseError("qcl_db_model::import: '$path' is not a valid file.");
    }

    /*
     * schema document
     */
    $schemaXml    =& $this->getSchemaXml();
    $schemaXmlDoc =& $this->schemaXml->getDocument();
    
    $this->info("Importing data from '$path' into {$this->name}..." );
    
    /*
     * open xml data file and get record node
     */
    $dataXml     =& new qcl_xml_simpleXML($path);
    $dataDoc     = $dataXml->getDocument(); // don't use pass by reference here
    $recordsNode = $dataXml->getNode("/data/records");
    
    if ( ! is_object($recordsNode) )
    {
      $this->raiseError("Data document has no records node!");
    }
    
    /*
     * iterate through all records and import them
     */
    $count = 0;
    foreach ( $recordsNode->children() as $record)
    {
      /*
       * populate properties with attributes
       */
      $properties = $record->attributes();
      
      /*
       * add child node data to properties
       */
      foreach ( $record->children() as $propNode )
      {
        $propAttrs = $propNode->attributes();
        $propName  = $propAttrs['name'];
        $propData  = $schemaXml->getData(&$propNode);
        $properties[$propName] =$propData;
      }
      
      /*
       * populate columns with de-xml-ized property data, using aliases for property
       * names for column names
       */
      $data = array();
      foreach( $properties as $propName => $propData )
      {
        $colName = $this->getColumnName($propName);
        $data[$colName] =  xml_entity_decode($propData);
      }
      
      /*
       * insert data into database
       * this will not overwrite existing entries which are primary keys or are part
       * of a "unique" index. 
       */
      $id = $this->insert($data);
      if ($id) $count++;
    }
    $this->info("$count records imported.");
  }
  
  //-------------------------------------------------------------
  // Queries
  //-------------------------------------------------------------  
  
  /**
   * Checks whether model supports query operators
   * @return bool
   */
  function hasQueryOperators()
  {
    $schemaXml =& $this->getSchemaXml();
    $opNodes   =& $this->getNode("/schema/model/queries/operators");
    return is_object($opNodes) && count( $opNodes->operator ); 
  }
  
  /**
   * gets all nodes from the schema xml that contain
   * information on query operators for a certain
   * property type (string, int, etc.)
   *
   * @param string $type  Type of property
   * @return array Array of SimpleXmlElement (PH4)  objects
   */
  function getQueryOperatorNodes( $type )
  {
    if ( ! $this->hasQueryOperators() )
    {
      $this->raiseError("Model '{$this->name}'' does not support query operators.");
    }
    
    /*
     * return cached data if available, otherwise retrieve it from schema xml
     */
    static $queryOperators = array();
    
    if ( ! is_array( $queryOperators[$type] ) )
    {
      $schemaXml =& $this->getSchemaXml();
      $operators =& $this->getNode("/schema/model/queries/operators/operator");
      
      foreach ( $operators as $operatorNode )
      {
        $attrs = $operatorNode->attributes();
        if ( $attrs['type'] == $type )
        {
          $queryOperators[$type][] =& $operatorNode;
        }
      }
    }
    
    /*
     * return result
     */
    return $queryOperators[$type];
  }
    
  
} 
?>