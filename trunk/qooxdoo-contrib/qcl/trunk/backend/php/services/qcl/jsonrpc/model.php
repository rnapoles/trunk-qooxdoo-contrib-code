<?php

// dependencies
require_once ("qcl/jsonrpc/object.php");

/**
 * simple controller-model architecture for jsonrpc
 * common base class for data models
 */

class qcl_jsonrpc_model extends qcl_jsonrpc_object
{

  /**
   * The controller object. Every model MUST have a controller object from
   * which it receives service and request information
   *
   * @var qcl_jsonrpc_controller or subclass
   */
	var $_controller = null;

	/**
	 * The current model record data
	 *
	 * @var array
	 */
	var $currentRecord = null;
	
	/**
	 * The default record data that will be used when creating a new
	 * model record. You can preset static data here.
	 */
  var $emptyRecord = array();

 /**
  * constructor 
   * @param qcl_jsonrpc_controller $controller Controller object. You can 
   * also provide a qcl_jsonrpc_model object.
  */
	function __construct( $controller=null )
  {
		/*
		 * initialize parent class
		 */
    parent::__construct();
    
    /*
     * set controller. This wil throw an error if no controller is available
     */
    $this->setController( &$controller );	
	}

	//-------------------------------------------------------------
  // public methods 
	//-------------------------------------------------------------   

 	/**
 	 * sets controller of this model to be able to link to other models
 	 * connected to the controller
 	 * @param qcl_jsonrpc_controller $controller Controller object. You can 
 	 * also provide a qcl_jsonrpc_model object
 	 */
 	function setController ( $controller )
 	{
		if ( is_a( $controller,"qcl_jsonrpc_controller" ) )
		{
			$this->_controller =& $controller;
		}
		elseif ( is_a( $controller,"qcl_jsonrpc_model" ) )
		{
		  $this->_controller =& $controller->getController();
		}
    else
    {
			$this->raiseError (
        "No valid controller object provided for " . $this->className() . ". Received a " . 
          ( is_object($controller) ? 
            ( get_class($controller) . " object." ) : 
            ( gettype( $controller ) . "." ) )
      );
    }
 	}
 	
 	/**
 	 * Returns controller of this model 
 	 * @return qcl_jsonrpc_controller 
 	 */
 	function &getController()
 	{
    return $this->_controller;
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