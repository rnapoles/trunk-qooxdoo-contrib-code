<?php
/*
 * dependencies
 */
require_once "qcl/mvc/AbstractModel.php";

/**
 * Base class for objects modeling widget data
 */
class qcl_databinding_widgets_Widget extends qcl_mvc_AbstractModel
{

  /**
   * qooxdoo class name, automatically resolved from
   * PHP class name
   * @param qcl_jsonrpc_controller $controller
   * @var string
   */
  var $qxClass;
   
  
  function __construct( $controller )
  {
    
    if ( $this->className() == __CLASS__ )
    {
      $this->raiseError(__CLASS__ . " is abstract and needs to be subclassed.");
    }
    
    parent::__construct( &$controller );
    
    $this->qxClass = "qx." . str_replace( "_", ".", substr( $this->className(), 24 ) );
  }
  
  /**
   * Adds the widget data to the response and returns it.
   * @return qcl_jsonrpc_Response
   */
  function addToResponse()
  {
    $controller =& $this->getController();
    return $controller->response();
  }
  
}

?>