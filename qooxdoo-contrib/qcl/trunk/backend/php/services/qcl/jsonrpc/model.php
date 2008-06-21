<?php

// dependencies
require_once ("qcl/jsonrpc/object.php");

/**
 * simple controller-model architecture for jsonrpc
 * common base class for data models
 */

class qcl_jsonrpc_model extends qcl_jsonrpc_object
{

  //-------------------------------------------------------------
  // class variables
  //-------------------------------------------------------------

  var $col_id                 = "id";         // attribute of record tag with unique numeric id 
  var $col_namedId            = null;         // unique string id, optional  
  var $col_modified           = "modified";   // the model SHOULD have a "modified" column with a timestamp
  var $col_created            = null;         // the model CAN have "created" column with a timestamp  
  
  //-------------------------------------------------------------
  // instance variables
  //-------------------------------------------------------------

	var $controller             = null;         // the controller object 
  var $datasource             = null;         // name of, or path to datasource from which this model gets its data
	var $currentRecord          = array();      // the current record cached for perfomance
  var $emptyRecord            = array();      // you can pre-insert static values here
  var $metaColumns            = array();      // assoc. array containing the metadata fields  => columns
  var $metaFields             = array();      // assoc. array containing the metadata columns => fields	

	//-------------------------------------------------------------
  // internal methods
  //-------------------------------------------------------------

 /**
  * constructor 
  */
	function __construct($controller=null)
  {
		parent::__construct();
    $this->setController(&$controller);	
    
    // generate list of metadata columns ($col_ ...)
    $this->_initMetaColumns(); 
	}   	

	//-------------------------------------------------------------
  // public methods 
	//-------------------------------------------------------------   

 	/**
 	 * sets controller of this model to be able to link to other models
 	 * connected to the controller
 	 * @param object $controller
 	 */
 	function setController ( $controller )
 	{
		if ( is_a( $controller,"qcl_jsonrpc_controller" ) )
		{
			$this->controller =& $controller;
		}
    else
    {
			$this->raiseError (
        "cql_jsonrpc_model : No controller object provided for " . get_class($this) . 
        ". Received a '" . get_class($controller) . "' object." 
      );
    }
 	}
 	
 	/**
 	 * gets controller (singleton) of this model 
 	 * @return object 
 	 */
 	function &getController()
 	{
 		$controllerSingleton =& $this->controller->getInstance();
 		if ( is_object($controllerSingleton) )
 		{
 			return $controllerSingleton;
 		}
 		else
 		{
 			return $this->controller;
 		}
 	}	

  //-------------------------------------------------------------
  // model data handling
  //------------------------------------------------------------- 	
 	
  /**
   * read class vars starting with "key_" into an array object property
   * @return void
   */
  function _initMetaColumns()
  {
    $classVars = get_class_vars(get_class($this));
    foreach ( $classVars as $key => $value )
    {
      if ( substr( $key,0,4) == "key_" )
      {
        $key = substr($key,4);
        $this->metaColumns[$key] = $value;
      }
    }
    $this->metaFields = array_flip( $this->metaColumns );
  } 	
 	
  /**
   * sets datasource name or path. 
   * override this method and then call it by parent::setDatasource( $name );
   * @return void
   * @param $datasource string
   */
  function setDatasource ( $datasource )
  {
    if ( ! $datasource )
    {
      $this->raiseError( get_class($this) . ": No datasource!");
    }
    $this->datasource = $datasource;
  }
  
  /**
   * getter for datasource
   * @return string
   */
  function getDatasource()
  {
    return $this->datasource;
  }

  /**
   * checks if model has a property.
   * @return boolean
   * @param string $name
   */
  function hasProperty($name)
  {
    $col_name = "key_{$name}";
    return ( isset( $this->$col_name ) and $this->$col_name !== null ) ; 
  }  

  
	//-------------------------------------------------------------
  // translation (modeled after qooxdoo syntax)
  //-------------------------------------------------------------
  
  /**
   * translates a message
   * @return  String
   * @param   String  $msgId    Message id of the string to be translated 
   * @param   Array   $varargs  (optional) Variable number of arguments for the sprintf formatting
   */
  function tr( $msgId, $varargs=array() )
  {
    $controller =& $this->getController();
    return $controller->tr($msgId, $varargs);
  }	
  
  /**
   * Translate a plural message.Depending on the third argument the plursl or the singular form is chosen.
   *
   * @param string   $singularMessageId Message id of the singular form (may contain format strings)
   * @param string   $pluralMessageId   Message id of the plural form (may contain format strings)
   * @param int      $count             If greater than 1 the plural form otherwhise the singular form is returned.
   * @param Array    $varargs           (optional) Variable number of arguments for the sprintf formatting
   * @return string
   */
  function trn ( $singularMessageId, $pluralMessageId, $count, $varargs=array() )
  {
    $controller =& $this->getController();
    return $controller->trn( $singularMessageId, $pluralMessageId, $count, $varargs );
  }  
  
}	

?>