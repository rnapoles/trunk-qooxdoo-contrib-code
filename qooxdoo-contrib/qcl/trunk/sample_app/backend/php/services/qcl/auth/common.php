<?php

// dependencies
require_once ("qcl/jsonrpc/controller.php");
require_once ("qcl/db/db.php");
require_once ("qcl/locale/manager.php");

/**
 * common base class for permissions, roles and users
 * providing a backend to the qcl.auth client package
 * @todo: this class is controller and model at the same time, this needs to be changed!
 */

class qcl_auth_common extends qcl_jsonrpc_controller	
{

   //-------------------------------------------------------------
   // common class variables to be overridden
   //-------------------------------------------------------------

	var $table;
	var $key_id							= "id";
	var $key_namedId					= "namedId";
	var $key_descriptiveName			= "name";
	var $table_link_user_roles			= "link_user_roles";
	var $table_link_roles_permissions	= "link_roles_permissions";
	var $icon;
	var $foreignKey						= "Needs to be overridden!";

	//-------------------------------------------------------------
    // internal methods
    //-------------------------------------------------------------

   /**
    * constructor 
    * @param object refernce $controller
    */
   function __construct()
   {
		parent::__construct();
	 	$this->db = &qcl_db::getSubclass(&$this);
   }   

	//-------------------------------------------------------------
   	// public non-rpc methods 
	//-------------------------------------------------------------   
   
   /**
    * gets the record id from a reference which can be the id itself or an 
    * identifiying (dot-separated) name
    * @param mixed $ref numeric id or string name
    * @return integer id
    */
   function getIdFromRef($ref)
   {   	
	   	if ( $ref === null or is_numeric ($ref) ) 
	   	{
	   		return $ref;
	   	}
	   	
	   	if ( ! is_string ( $ref ) ) 
	   	{
	   		$this->raiseError("qcl_auth_common::getIdFromRef : integer or string expected, got '$ref'");	
	   	}
	   	$row = $this->db->getRow("
			SELECT `{$this->key_id}` 
			FROM `{$this->table}` 
			WHERE `{$this->key_namedId}` = '$ref'  
		");
		$result=$row[$this->key_id];
		return $result;
   }
   
   /**
    * gets all database records
    * @param string (optional, default null) order by field 
    * @return Array Array of db record sets
    */
   function getAll($orderBy=null)
   {
		if ($orderBy)
		{
			$sql = "SELECT * FROM {$this->table} ORDER BY `$orderBy`"; 
		}
		else
		{
			$sql = "SELECT * FROM {$this->table}";			
		}
        return $this->db->getAllRows($sql);   	
   }
   
   /**
    * get record by id 
    * @return Array Db record set
    */
   function getById($id)
   {
		return $this->db->getRow("
            SELECT * 
			FROM `{$this->table}` 
			WHERE `{$this->key_id}` = $id;
        ");   	
   }
   
   /**
    * get record by its (dot-separated) identifying name
    * @deprecated 12.10.2007  
    * @return Array Db record set
    */
	function getByName($name)
	{
		return $this->getByNamedId($name);
	}

   /**
    * get record by its (dot-separated) identifying name  
    * @return Array Db record set
    */
	function getByNamedId($namedId)
	{
		return $this->db->getRow("
	            SELECT * 
				FROM `{$this->table}` 
				WHERE `{$this->key_namedId}` = '$namedId'
        ");   	
	}
	
	/**
    * get record by reference
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
   			$this->raiseError("qcl_auth_common::getByRef : integer or string expected, got '$ref'");
   		}
   	}

   /**
    * get descriptive name of role
    * @param mixed $ref numeric id or string name
    * @return string
    */
   	function getDescriptiveName($ref)
   	{
   		$row = $this->getByRef($ref);
   		return $row[$this->key_descriptiveName];
   	}
   
   /**
    * gets all identifying names
    */
   function getAllNames()
   {
		$rows = $this->getAll();
        $result = array();
        foreach ( $rows as $row )
        {
        	$result[] = $row[$this->key_namedId];
        }
        return $result;
   }

	/**
	 * creates a new record and optionally links it to a role
	 * @param string	$namedId
	 * @param int		$parentId 	id of role (unused if class is qcl_auth_role)
	 * @return int the id of the inserted row 
	 */
	function create( $namedId, $parentId=null )
   	{
   		if ( $this->namedIdExists ( $namedId ) )
   		{
   			$this->raiseError ( get_class($this) . "::create : '$namedId' already exists." );
   		}
   		
   		// insert new empty record
		$data = array();
		$data[$this->key_namedId] = $namedId;
		$itemId = $this->insert($data);
		
		// link to role
		if ( is_a( $this, "qcl_auth_user") )
		{
			$this->addToRole ( $itemId, $parentId );
		}
		elseif ( is_a( $this, "qcl_auth_permission") )
		{
			$this->addToRole ( $itemId, $parentId );	
		}	
		return $itemId;
   	}   

	/**
	 * gets id by namedId
	 * @param string	$namedId
	 * @param int id or null if record does not exist
	 */
	function getIdByNamedId( $namedId )
	{
		$row 		= $this->getByNamedId($namedId);
		$namedId	= $row[$this->key_namedId];
		return $namedId ? $namedId : null;
	}

	/**
	 * checks if record with $namedId exists
	 * @param string	$namedId
	 * @param boolean result
	 */
	function namedIdExists( $namedId )
	{
		$namedId = $this->getIdByNamedId ( $namedId );
		return $namedId ? true : false;
	}

	/**
	 * creates a new record if the namedId id does not already exist and optionally links it to a role
	 * @param string	$namedId
	 * @param int		$parentId 	id of role (unused if class is qcl_auth_role)
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
	 * inserts a record into a table and returns last_insert_id()
	 * @param array $data associative array with the column names as keys and the column data as values
	 * @return int the id of the inserted row (only if auto_incremnt-key)
	 */
	function insert( $row )
   	{
   		return $this->db->insert($this->table,$row);
   	}

	/**
	 * updates a record in a table identified by id
	 * @param array $data associative array with the column names as keys and the column data as values
	 * @return boolean success 
	 */
	function update ( $data )   	
	{
		return $this->db->update( $this->table, $data,$this->key_id );
	}   	
	
	/**
	 * deletes a record in a table identified by id
	 * @todo : check for linked entries, either delete them or refuse to delete
	 * @param mixed $ids (array of) record id(s)
	 */
	function delete ( $ids )
	{
		$this->db->delete ( $this->table, $ids, $this->key_id );
	} 


   //-------------------------------------------------------------
   // public rpc methods 
   //-------------------------------------------------------------
	
    /**
     * get item data 
     * @param int $param[0] id
     * @return array 
     */
    function method_getData($params)
    {
       $itemId 	= $params[0];
       $result  = array();		

		// get record
		$itemData = $this->getById($itemId);

		// convert to table data model
		$data = array();
		
		foreach($itemData as $key => $value )
		{
			$meta = $this->meta[$key];
			if ( ! is_array( $meta ) ) continue;
			$data[]		= array($key,__($key),$value,$meta);
		}
		
		// return data
		$this->set( "tabledatamodel", $data );		
		return $this->getResult();
    }
    
    /**
     * create a new item
     * @param $param[1] named id of new item
	 * @param $param[2] id of parent of new item
	 * @return array 
     */		
	function method_create($params)
	{
		$namedId 		= $params[1];
		$parentId 		= $params[2];
		
		$this->create($namedId,$parentId);
		
		// load and show item 
		$this->addMessage( "qcl.auth.messages.{$this->shortName}.created", $itemId );
		
		return $this->getResult();
	}
	
	/**
     * update item data
     * @param object $param[1] map of data properties to update and including the id
     * @param int $param[2] (optional) if the id is not contained in the data, provide it here
     * @return array
     */
    function method_update($params)
    {
       	if ( is_object( $params[1] ) )
       	{
       		$data = (array)$params[1]; 
       	}
       	else
       	{
       		$this->raiseError("qcl.auth.item.update : invalid parameter");
       	}
       	
       	if ( is_numeric( $id = $params[2] ) )
       	{
       		$data[$this->key_id] = $id;
       	}
       	elseif ( ! $data[$this->key_id] )
       	{
       		$this->raiseError("qcl_auth_common::method_update : no id given!");
       	}
       	
		$this->update($data);
		
		$this->addMessage("qcl.auth.messages.{$this->shortName}.updated",$data[$this->key_id]);
		return $this->getResult();
    }    
    
    /**
     * delete an item 
     * @param int	 $param[1] item id
     * @param int	 $param[2] parent id
     * @return array 
     */
    function method_delete($params)
    {
       $itemId 		= (int) $params[1];
       $parentId 	= (int) $params[2];
       $this->delete($itemId);

		if ( is_a( $this, "qcl_auth_user") or is_a( $this, "qcl_auth_permission") )
		{
			$this->removeFromRole ( $itemId, $parentId );
		}

		$this->addMessage("qcl.auth.messages.{$this->shortName}.deleted",$itemId);

		return $this->getResult();

    }

}

?>