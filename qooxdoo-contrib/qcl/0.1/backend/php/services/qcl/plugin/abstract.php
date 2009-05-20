<?php
require_once ("qcl/mvc/AbstractModel.php");

/**
 * abstract class for classes that implement a plugin
 * 
 */

class qcl_plugin_abstract extends qcl_mvc_AbstractModel
{    
	//-------------------------------------------------------------
  // properties
	//------------------------------------------------------------- 
  
  var $name;
  var $description; 
  var $permission;
  var $author;

	//-------------------------------------------------------------

	function getNamedId()
  {
    return $this->namedId;
  }	
	
	function getDescription()
  {
    return $this->description;
  }

	function getPermission()
  {
    return $this->permissionModel;
  }
  
  function getAuthor()
  {
    return $this->author;
  }
	
    
 	/**
	 * checks whether plugin works (i.e., if dependencies are met)
	 * if an error occurs, it can be retrieved with the getEror method.
	 * @return boolean if plugin was initialized without error
	 */
	function initialize() {}
  
  
	
}

