<?php
/*
 * dependencies
 */
require_once "qcl/jsonrpc/object.php";

/**
 * Simple controller-model architecture for jsonrpc
 * common base class for data models
 * @todo maybe merge with PropertyModel?
 */

class qcl_mvc_AbstractModel extends qcl_jsonrpc_object
{

	/**
	 * The current model record data
	 * @todo rename qcl_jsonrpc::$_data
	 * @var array
	 */
	var $currentRecord = null;
	
	/**
	 * The default record data that will be used when creating a new
	 * model record. You can preset static data here.
	 */
  var $emptyRecord = array();

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
  
  /**
   * Redirects info method to controller's method.
   * @see qcl_jsonrpc_controller::info()
   */
  function info( $msg )
  {
    $controller =& $this->getController();
    if ( ! $controller ) $this->raiseError("Cannot info '$msg'. No controller object available.");
    $controller->info( $msg );
  }  

  /**
   * Redirects warn method to controller's method.
   * @see qcl_jsonrpc_controller::warn()
   */
  function warn( $msg )
  {
    $controller =& $this->getController();
    $controller->warn( $msg );
  }    
  
}	
?>