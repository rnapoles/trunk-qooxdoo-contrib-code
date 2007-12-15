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
  var $key_namedId                  = "namedId";
	var $key_descriptiveName			    = "name";
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
   		return $row[$this->key_descriptiveName];
   	}
   
   /**
    * gets all identifying names
    * @return array an array of all distinct values of the namedId column
    */
   function getAllNamedIds()
   {
   	if ( ! $this->key_namedId )
    {
   		$this->raiseError("qcl_auth_common::getAllNamedIds : model does not have a named id property");	
   	}
    return $this->getDistinctValues($this->key_namedId,null,$this->key_namedId);
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
		$data[$this->key_namedId] = $namedId;
		$itemId = $this->insert($data);
		
		// link to role
    if ( $parentId )
    {
  		if ( is_a( $this, "qcl_auth_user") )
  		{
  			$this->addToRole ( $itemId, $parentId );
  		}
  		elseif ( is_a( $this, "qcl_auth_permission") )
  		{
  			$this->addToRole ( $itemId, $parentId );	
  		}
    }	
		return $itemId;
  }   

}

?>