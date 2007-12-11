<?php

// dependencies
require_once ("qcl/db/model.php");

/**
 * common base class for permission, role and user models
 */

class qcl_auth_common extends qcl_db_model	
{

  //-------------------------------------------------------------
  // common class variables to be overridden
  //-------------------------------------------------------------

	var $table;
	var $key_id							          = "id";
	var $key_namedId					        = "namedId";
	var $key_descriptiveName			    = "name";
	var $table_link_user_roles			  = "link_user_roles";
	var $table_link_roles_permissions	= "link_roles_permissions";
	var $icon;
	var $foreignKey						        = "Needs to be overridden!";

	//-------------------------------------------------------------
  // internal methods
  //-------------------------------------------------------------

  /**
   * constructor 
   * @param object reference $controller
   */
  function __construct($controller)
  {
    parent::__construct(&$controller);
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
		$rows = $this->getAllRows();
        $result = array();
        foreach ( $rows as $row )
        {
        	$result[] = $row[$this->key_namedId];
        }
        return $result;
   }

	/**
	 * creates a new record and optionally links it to a role
	 * @override
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

}

?>