<?php
/*
 * dependencies
 */
require_once "qcl/databinding/widgets/Widget.php";

/**
 * Base class for objects modeling widget data
 */
class qcl_databinding_widgets_ui_form_List extends qcl_databinding_widgets_Widget
{

  /**
   * list item data
   */
  var $listItems = array();
  
  /**
   * Adds a list item to the List
   *
   * @param string $value
   * @param string[optional]type $label
   * @param string[optional] $icon
   */
  function add( $value, $label=null, $icon=null )
  {
    $this->listItems[] = array(
        'classname'  => "qx.ui.form.ListItem",
        'icon'       => $icon,
        'value'      => $value,
        'label'      => either($label,$value)
     );    
  }
  
/**
   * Adds the widget data to the response and returns it.
   * @return qcl_jsonrpc_Response
   */
  function addToResponse()
  {
    $controller =& $this->getController();
    $controller->set("children", $this->listItems );
    return parent::addToResponse();
  }  
}

?>