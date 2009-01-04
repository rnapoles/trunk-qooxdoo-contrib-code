<?php

/*
 * Dependencies
 */
require_once "qcl/db/model.php";

/**
 * common base class for permission, role and user models
 */
class qcl_access_common extends qcl_db_model	
{

  //-------------------------------------------------------------
  // common class variables 
  //-------------------------------------------------------------

  /**
   * Array of names that canot be used as names for users, permissions and 
   * roles.
   * @var array
   */
  var $reservedNames = array();

  /**
   * table linking users and roles
   * @deprecated Use new model linking through schema xml instead.
   * @var string
   */
  var $table_link_user_roles = "link_user_roles";
  
  /**
   * table linking roles and permissions
   * @deprecated Use new model linking through schema xml instead.
   * @var string
   */
  var $table_link_roles_permissions = "link_roles_permissions";
  
  /**
   * Returns the default icon representing the class
   * @return string
   */
  function getIcon()
  {
    return "icon/16/apps/system-users.png";
  }

	/**
	 * Creates a new record and optionally links it to a role. Raises an error
	 * if the namedId of the record already exists.
	 * @todo rewrite
	 * @override
	 * @param string	$namedId
	 * @return int the id of the inserted row 
	 */
	function create( $namedId )
  {
 		/*
 		 * check
 		 */
    if ( in_array( $namedId, $this->reservedNames ) )
 		{
 			$this->raiseError ( "'$namedId' is a reserved name and cannto be used." );
 		}
 		if ( $this->namedIdExists ( $namedId ) )
 		{
 			$this->raiseError ( "'$namedId' already exists." );
 		}
   		
   	/*
   	 * insert new empty record
   	 */
	   $itemId = parent::create($namedId);
   
    /*
     * return item id
     */
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