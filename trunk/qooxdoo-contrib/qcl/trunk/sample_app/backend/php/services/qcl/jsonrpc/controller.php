<?php

// dependencies
require_once  SERVICE_PATH . "qcl/jsonrpc/object.php";

/**
 * simple controller-model architecture for jsonrpc
 * common base class for controllers
 */

class qcl_jsonrpc_controller extends qcl_jsonrpc_object
{
	
	//-------------------------------------------------------------
    // internal methods
    //-------------------------------------------------------------

   /**
    * constructor 
    */
	function __construct()
   	{
		parent::__construct();
	}   	
	
	/** todo: move methods from qcl_jsonrpc object here and adapt qcl classes accordingly **/
	/** problem: some of the existing qcl.* classes are controller and model at the same time **/
	 
}	

?>