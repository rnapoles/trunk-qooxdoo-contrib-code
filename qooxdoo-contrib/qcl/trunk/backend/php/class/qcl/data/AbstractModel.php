<?php
/*
 * qcl - the qooxdoo component library
 *
 * http://qooxdoo.org/contrib/project/qcl/
 *
 * Copyright:
 *   2007-2009 Christian Boulanger
 *
 * License:
 *   LGPL: http://www.gnu.org/licenses/lgpl.html
 *   EPL: http://www.eclipse.org/org/documents/epl-v10.php
 *   See the LICENSE file in the project's top-level directory for details.
 *
 * Authors:
 *  * Christian Boulanger (cboulanger)
 */
require_once "qcl/core/Object.php";

/**
 * Simple controller-model architecture for jsonrpc
 * common base class for data models
 * @todo maybe merge with PropertyModel?
 */

class qcl_data_AbstractModel extends qcl_core_Object
{

  /**
   * The controller object if a custom controller has been
   * set. Usually, models use the currently active controller.
   *
   * @var qcl_data_Controller or subclass
   */
  var $_controller = null;

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
   * Constructor
   * @param $controller[optional] Specify a custom controller here if neccessary
   * @return unknown_type
   */
  function __construct( $controller=null )
  {
    parent::__construct();
    if ( $controller )
    {
      $this->setController( &$controller );
    }
  }

 	/**
 	 * sets controller of this model to be able to link to other models
 	 * connected to the controller
 	 * @param qcl_data_Controller $controller Controller object. You can
 	 * also provide a qcl_data_AbstractModel object
 	 * @todo rewrite this
 	 */
 	function setController ( $controller )
 	{
		if ( is_a( $controller,"qcl_data_Controller" ) )
		{
			$this->_controller =& $controller;
		}
		elseif ( is_a( $controller,"qcl_data_AbstractModel" ) )
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
 	 * Returns the controller object
 	 * @return qcl_data_Controller
 	 *
 	 */
  function &getController()
  {
    if ( $this->_controller )
    {
      $controller =& $this->_controller;
    }
    else
    {
      $controller =& qcl_application_Application::getController();
    }
//    if ( ! is_a( $controller,"qcl_data_Controller" ) )
//    {
//      $this->raiseError("No controller available." );
//    }
    return $controller;
  }

  /**
   * Returns the controller object
   * @return qcl_data_Controller
   */
  function &controller()
  {
    return $this->getController();
  }


  /**
   * Returns the server object
   */
  function &server()
  {
    return qcl_server_Server::getServerObject();
  }


}
?>