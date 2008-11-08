<?php  

// dependencies
require_once ("qcl/jsonrpc/model.php");


/**
 * simple controller-model architecture for jsonrpc
 * 
 * xml-based implementation:
 * <pre>
 * <root>
 *  <record id="1" namedId="foo.bar.baz">
 *    <field1>content2</field1>
 *    <field2>content2</field2>
 *    ...
 *  </record>
 *  <record id="2" ...>
 *  ...
 *  </record>
 * </root>
 * 
 */

class qcl_xml_model extends qcl_jsonrpc_model
{
  //-------------------------------------------------------------
  // class properties
  //-------------------------------------------------------------   
  
  /**
   * properties of the model that should be indexed
   * @var array
   */
  var $indexedProperties = array ("id","namedId","name");
  
  /**
   * parser class
   * @var qcl_xml_simpleXML
   */
  var $parser;
  
  //-------------------------------------------------------------
  // API methods
  //-------------------------------------------------------------   
  
  /**
   * gets the simpleXml document object
   * return SimpleXmlElement  
   */
  function &getDocument()
  {
    return $this->parser->getDocument();
  }
  
  /**
   * loads and parses and xml file
   * @param string $xmlfile
   * @return void
   */
  function load($xmlfile)
  {
    // load xml file
    require_once("qcl/xml/simpleXML.php");
    $this->parser =& new qcl_xml_simpleXML;
    $this->parser->createIfNotExists($xmlfile);
    $this->parser->load($xmlfile,true,$this->indexedProperties);      
  }
  
  /**
   * saves the current state of the xmlfile
   * @return void
   */
  function save()
  {
    $this->parser->save();
  }
  
  /**
   * add index for a property. Needs to be called before the xml 
   * document is loaded
   * @param string $name
   */
  function addIndex($name)
  {
    $this->indexedProperties[] = $name;
  }
  
  /**
   * gets all records contained in the xml file optionally sorted by field
   * @param string|null     $orderBy  (optional) order by field
   * @return Array Array of record sets
   */
  function getAllRecords($orderBy=null)
  {  
    return $this->getRecordsWhere(null,$orderBy);
  }  
  
  /**
   * gets all records or those that match a where condition. 
   * @param mixed         $where    where condition. 
   * if null, get all. if array, match properties (key) to values.
   * if there are more than one condition, retrieved records have
   * to match all conditions (AND-query).
   * In php4, you can only query indexed attributes
   * @param string|null   $orderBy  (optional) order by field
   * @param array|null    $fields   (optional) Array of fields to retrieve 
   * @return Array Array of db record sets
   */
  function getRecordsWhere($where=null,$orderBy=null,$fields=null)
  {
    /*
     * get nodes
     */
    $nodes = $this->getNodesWhere($where,$orderBy);
    
    /*
     * return result as map
     */
    $result = array();
    foreach ( $nodes as $node )
    {
      $result[] = (array) $node;
      //@todo: filter out columns
    }
    return $result;
  }

 /**
   * gets all nodes or those that match a where condition. 
   * @param mixed         $where    where condition. 
   * if null, get all. if array, match properties (key) to values.
   * if there are more than one condition, retrieved records have
   * to match all conditions (AND-query).
   * In php4, you can only query indexed attributes
   * @param string|null   $orderBy  (optional) order by field
   * @return array Array of nodes
   */
  function getNodesWhere($where=null,$orderBy=null)
  {
    /*
     * check parameters
     */
    if ( !( is_null($where) or is_array($where) ) )
    {
      $this->raiseError("qcl_xml_model::getNodesWhere(): 'where' argument must be null or an array");
    }
    
    /*
     * check if we have an xml parser
     */
    if ( ! is_object($this->parser) )
    {
      $this->raiseError("qcl_xml_model::getNodesWhere(): Parser is not initialized.");
    }
    
    /*
     * retrieve nodes for each where condition and keep those which are
     * present in all result sets (== AND query)
     */
    $nodes = null;
    foreach ($where as $property => $value )
    {
      $tmp = $this->parser->getNodesByAttributeValue($property,$value);
      if ( $nodes )
      {
        $nodes = array_intersect($nodes,$tmp);
      }
      else
      {
        $nodes = $tmp;
      }
    }
    return $nodes;
  }  
  
  /**
   * gets database records by their primary key
   * @param array|int     $ids    
   * @param string|null   $orderBy  (optional) order by field
   * @param array|null    $fields   (optional) Array of fields to retrieve 
   * @return Array Array of db record sets
   */
  function getRowsById( $ids, $orderBy=null, $fields=null )
  {
    if ( ! is_numeric($ids) and !is_array($ids) )
    {
      $this->raiseError("qcl_xml_model::getRowsById() : invalid parameter id: '$ids'");
    }
    $rowIds = implode(",", (array) $ids );
    if ( ! empty($rowIds) )
    {
      
    }  
  }
  
  
  /**
   * gets values of database columns that match a where condition
   * @param string|array    $column   name of column(s) 
   * @param string          $where    where condition to match, if null, get all
   * @param string|null     $orderBy  (optional) order by field
   * @return array Array of values
   */
  function getColumnValues($column,$where=null,$orderBy=null)
  { 
    $this->raiseError("Not implemented.");  
  }


  /**
   * get and cache record by id 
   * @param mixed $id
   * @return Array Db record set
   */
  function getById( $id = null )
  {
    $this->raiseError("Not implemented");
    if ( $id !== null )
    {
      if ( ! is_numeric($id) )
      {
        $id = "'$id'";
      }
      $this->currentRecord = $this->db->getRow("
        SELECT * 
        FROM `{$this->table}` 
        WHERE `{$this->col_id}` = $id;
      ");           
    }
    else
    {
      if ( ! is_array( $this->currentRecord ) )
      {
        $this->raiseError("qcl_db_model::getById : no id given, but no record cached!");
      }
    }
    return $this->currentRecord;
  }

  /**
   * get record by its unique string id
   * @deprecated 12.10.2007  
   * @return Array Db record set
   */
  function getByName($name)
  {
    return $this->getByNamedId($name);
  }

   /**
    * get record by its unique string id
    * @return Array Db record set
    */
  function getByNamedId($namedId)
  {
    $this->raiseError("Not implemented");
    if ( $this->col_namedId )
    {
      $row = $this->db->getRow("
        SELECT * 
        FROM `{$this->table}` 
        WHERE `{$this->col_namedId}` = '$namedId'
      ");
      $this->currentRecord = $row;
      return $row;
    }
    else
    {
      $this->raiseError("qcl_db_model::getByNamedId : model does not have a named id property");  
    }
  }

  /**
   * gets the record id from a reference which can be the id itself or an 
   * identifiying (dot-separated) name
   * @param mixed $ref numeric id or string name
   * @return integer id
   */
  function getIdFromRef($ref)
  {     
    $this->raiseError("Not implemented");
    if ( $ref === null or is_numeric ($ref) ) 
    {
      return $ref;
    }
    
    if ( ! is_string ( $ref ) ) 
    {
      $this->raiseError("qcl_db_model::getIdFromRef : integer or string expected, got '$ref'"); 
    }
    
    return $result;
   }
   
  /**
   * get record by reference (string id or numeric id)
   * @param mixed $ref numeric id or string name
   */
  function getByRef($ref)
  {
    if ( is_numeric ($ref) )
    {
      return $this->getById($ref); 
    }
    elseif ( is_string ($ref) )
    {
      return $this->getByName($ref);
    }
    else
    {
      $this->raiseError("qcl_db_model::getByRef : integer or string expected, got '$ref'");
    }
  }

  /**
   * gets numeric id by string id
   * @param string  $namedId
   * @param int id or null if record does not exist
   */
  function getIdByNamedId( $namedId )
  {
    $row    = $this->getByNamedId($namedId);
    return count($row) ? $row[$this->col_id] : null;
  }

  /**
   * gets string id by numeric id
   * @param int $id
   * @param string id or null if record does not exist
   */
  function getNamedIdById( $id )
  {
    $row    = $this->getById($id);
    return count($row) ? $row[$this->col_namedId] : null;
  }

  /**
   * checks if record with $namedId exists
   * @param string  $namedId
   * @param int id of existing record of false
   */
  function namedIdExists( $namedId )
  {
    $row = $this->getByNamedId ( $namedId );
    return count($row) ? $row[$this->col_id] : false;
  }
  
  /**
   * gets the record in this table that is referred to by the record from a different table (argument) 
   * @return array
   * @param Array   $record  record from a different table that contains a key corresponding to the foreign id of this table
   * @param Boolean $idOnly if true, return only the value of the foreign key column
   */
  function getByForeignKey( $record, $idOnly = false )
  {
    $id = $record[ $this->getForeignKeyColumn() ];
    if ( $idOnly )
    {
      return $id;
    }
    else
    {
      return $this->getById( $id );
    }
  }

  /**
   * creates a new record and 
   * optionally links it to a role
   * @param string  $namedId
   * @param int   $parentId   id of role (unused if class is qcl_access_role)
   * @return int the id of the inserted or existing row 
   */
  function createIfNotExists( $namedId, $parentId=null )
  {
    if ( $this->namedIdExists( $namedId ) )
    {
      return $this->getIdByNamedId( $namedId );
    } 
    return $this->create( $namedId, $parentId );
  }   
 
  /**
   * Get a property. By default, properties are "fields". This can be overridden as necessary
   * @param string       $name Property name
   * @param int|string   $id Optional - set property for id, otherwise operate on cached record
   * @return mixed value of property
   */
  function getProperty( $name, $id = null )
  {
    $this->raiseError("Not implemented");
  }
  
  /**
   * Set a property. By default, properties are "fields". This can be overridden as necessary
   * @return void 
   * @param string     $name
   * @param mixed      $value 
   * @param int|string $id Optional - set property for id, otherwise operate on cached record
   */
  function setProperty( $name, $value, $id = null )
  {
    $this->raiseError("Not implemented");
  }


  //-------------------------------------------------------------
  // standard creat/insert/update/delete methods
  //-------------------------------------------------------------

  /**
   * inserts a record into a table and returns last_insert_id()
   * @return int the id of the inserted row 
   */
  function create()
  {
    $this->raiseError("Not implemented");
    $data = $this->emptyRecord;
    $data[$this->col_id]=null; // so at least one field is set
    $id = $this->insert( $data );
    
    $this->currentRecord = $this->getById($id);
    return $id;
  }

  /**
   * inserts a record into the container and return the id
   * @param array $data associative array with the column names as keys and the column data as values
   * @return int the id of the inserted row 
   */
  function insert( $data )
  {
    $this->raiseError("Not implemented");
    // created timestamp
    if ( $this->col_created and ! isset ( $data[$this->col_created] ) )
    {
      $data[$this->col_created] = strftime("%Y-%m-%d %T");
    }
    
    // modified timestamp
    if ( $this->col_modified and ! isset ( $data[$this->col_created] )  )
    {
      $data[$this->col_modified] = strftime("%Y-%m-%d %T");
    } 
    
    return $this->db->insert( $this->table,$data );
  }

  /**
   * updates the model
   * @param array       $data   associative array with the column names as keys and the column data as values
   * @param int|string  $id   if the id key is not provided in the $data paramenter, provide it here (optional)
   * @return boolean success 
   */
  function update ( $data=null, $id=null )    
  {
    if ($data !== null)
    {
      $this->raiseError("Updating xml model with data as argument not implemented");
    }
    $this->parser->save();
  }     
  
  /**
   * deletes one or more records in a table identified by id
   * @param mixed $ids (array of) record id(s)
   */
  function delete ( $ids )
  {
    $this->raiseError("Not implemented");
  } 
  
  /**
   * deletes one or more records in a table matching a where condition
   * @param string  $where where condition
   */
  function deleteWhere ( $where )
  {
    $this->raiseError("Not implemented");
  } 

  
  /**
   * Returns a hash map of ids the modification timestamp
   * @return array
   */
  function getModificationList()
  {
    $this->raiseError("Not implemented");
  }
  
  /**
   * updates the modification date without changing the data
   * @param int|array $ids One or more record ids
   * @return void
   */
  function updateTimestamp( $ids )
  {
    $this->raiseError("Not implemented");
  }
  
  /**
   * gets the current timestamp from the database
   * @return string
   */
  function getTimestamp()
  {
    return $this->db->getValue("SELECT NOW()");
  }
  
} 
?>