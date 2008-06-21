<?php

// dependencies
require_once ("qcl/db/model.php");

/**
 * common base class for permission, role and user models
 */

class qcl_access_common extends qcl_db_model	
{

  //-------------------------------------------------------------
  // common class variables to be overridden
  //-------------------------------------------------------------

	var $table;
	var $col_id							          = "id";
  var $col_namedId                  = "namedId";
	var $col_descriptiveName			    = "name";
	var $table_link_user_roles			  = "link_user_roles";
	var $table_link_roles_permissions	= "link_roles_permissions";
	var $icon;
	var $foreignKey						        = "Needs to be overridden!";
  var $reservedNames                = array(); 

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
    // initialize tables
    $this->initializeTables(array(
      $this->table,
      $this->table_link_user_roles,
      $this->table_link_roles_permissions
    )); 
	}   

	//-------------------------------------------------------------
	// public non-rpc methods 
	//-------------------------------------------------------------   
   

   /**
    * get descriptive name of role
    * @param mixed $ref numeric id or string name
    * @return string
    */
   	function getDescriptiveName($ref)
   	{
   		$row = $this->getByRef($ref);
   		return $row[$this->col_descriptiveName];
   	}
   
   /**
    * gets all identifying names
    * @return array an array of all distinct values of the namedId column
    */
   function getAllNamedIds()
   {
   	if ( ! $this->col_namedId )
    {
   		$this->raiseError("qcl_access_common::getAllNamedIds : model does not have a named id property");	
   	}
    return $this->getDistinctValues($this->col_namedId,null,$this->col_namedId);
   }

	/**
	 * creates a new record and optionally links it to a role. Raises an error
	 * if the namedId of the record already exists
	 * @override
	 * @param string	$namedId
	 * @param int		$parentId 	id of role (unused if class is qcl_access_role)
	 * @return int the id of the inserted row 
	 */
	function create( $namedId, $parentId=null )
  {
 		if ( in_array($namedId, $this->$reservedNames ) )
 		{
 			$this->raiseError ( "'$namedId' is a reserved name and cannto be used." );
 		}

 		if ( $this->namedIdExists ( $namedId ) )
 		{
 			$this->raiseError ( "'$namedId' already exists." );
 		}
   		
   	// insert new empty record
		$data = array();
		$data[$this->col_namedId] = $namedId;
		$itemId = $this->insert($data);
		
		// link to role
    if ( $parentId )
    {
  		if ( is_a( $this, "qcl_access_user") )
  		{
  			$this->addToRole ( $itemId, $parentId );
  		}
  		elseif ( is_a( $this, "qcl_access_permission") )
  		{
  			$this->addToRole ( $itemId, $parentId );	
  		}
    }	
		return $itemId;
  } 
  
	/**
	 * creates a new record if its named id doesn't already exist and optionally links it to a role.
	 * returns false if record exists otherwise the id of the record
	 * @param string	$namedId
	 * @param int		$parentId 	id of role (unused if class is qcl_access_role)
	 * @return int the id of the inserted row 
	 */
	function createIfNotExists( $namedId, $parentId=null )
  {
 		if ( $id = $this->namedIdExists ( $namedId ) )
 		{
 			return $id;
 		}
 		return $this->create( $namedId, $parentId );
  }   

}

?>