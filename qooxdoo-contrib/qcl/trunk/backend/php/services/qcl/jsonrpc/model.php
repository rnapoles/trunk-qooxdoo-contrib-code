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
  // instance variables
  //-------------------------------------------------------------

	var $controller             = null;         // the controller object 
	var $currentRecord          = array();      // the current record cached for perfomance
  var $emptyRecord            = array();      // you can pre-insert static values here


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
 	 * @todo: clear up this instance stuff
 	 * @return qcl_jsonrpc_controller 
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