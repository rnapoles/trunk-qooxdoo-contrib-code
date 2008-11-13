<?php
/*
 * dependencies
 */
require_once "qcl/databinding/widgets/Widget.php";

/**
 * Class for databinding for the menu widget
 */
class qcl_databinding_widgets_qx_ui_menu_Menu extends qcl_databinding_widgets_Widget
{

  /**
   * menu item data
   */
  var $menuItems = array();
  
  /**
   * Adds a menu button item to the Menu
   *
   * @param string $label
   * @param string $service 
   * @param array $properties Associative array of qooxdoo widget properties 
   * @param array[optional] $events Associative array containing as keys the
   * names of the events which will trigger the javascript code contained
   * in the values.
   */
  function addButton( $label=null, $properties=null, $events=null, $classname="qx.ui.menu.Button" )
  {
    if ( is_null($label) )
    {
      $this->raiseError("A menu item must have a label.");
    }
    
    /*
     * core data
     */
    $menuItem = array(
        'classname'  => $classname,
        'label'      => $this->tr($label)
     );
    
    /*
     * events
     */
    if ( $events )
    {
      $menuItem['events'] = $events; 
    }
    
    /*
     * properties
     */
    if ( is_array( $properties ) )
    {
      foreach ( $properties as $key => $value )
      {
        $menuItem[$key] = $value;
      }
    }
     
    $this->menuItems[] = $menuItem; 
  }
  
  /**
   * Adds a button that calls a server service on click
   * @param string $label
   * @param string $icon
   * @param string $service Service name
   * @param array  $params Parameters to be passed to the function
   * @param string $properties  
   */
  function addServiceButton( $label, $icon, $service, $params, $properties=array(), $class="qx.ui.menu.Button"  )
  {
    if ( $icon )
    {
      $properties['icon'] = $icon;  
    }
    
    if ( ! is_list($params) )
    {
      $this->raiseError("Parameters must be a list!");
    }
    $events = array( 
      'execute' => "var p=" . json_encode($params) . ";". 
                   "p.unshift('$service'); " .
                   "var app = this.getApplication();" .
                   "app.executeService.apply(app,p);"
    );
    $this->addButton( $label, $properties, $events, $class );
  }
  
  /**
   * Adds a checkBox button item to the menu
   *
   * @param string $label
   * @param bool[optional,default false] 
   * @param array $properties Associative array of qooxdoo widget properties 
   * @param array[optional] $events Associative array containing as keys the
   * names of the events which will trigger the javascript code contained
   * in the values.
   */
  function addCheckBox( $label, $checked=false, $properties=array(), $events=null )
  {
    $properties['checked'] = $checked;
    $this->addButton( $label, $properties, $events, "qx.ui.menu.CheckBox");
  }

  /**
   * Adds a checkBox button item to the menu with a service method callback
   *
   * @param string $label
   * @param string $service Service name
   * @param array  $params Parameters to be passed to the function
   * @param bool   $checked 
   * @param array[optional] $properties
   */
  function addServiceCheckBox( $label, $service, $params, $checked=false, $properties=array()  )
  {
    if ( !is_bool($checked) )
    {
      $this->raiseError("'Checked' parameter must be boolean.");
    }
    $properties['checked'] = $checked;
    $this->addServiceButton( $label, null, $service, $params, $properties, "qx.ui.menu.CheckBox");
  }

  /**
   * Adds a radio button item to the Menu
   *
   * @param string $label
   * @param bool[optional,default false] 
   * @param array $properties Associative array of qooxdoo widget properties 
   * @param array[optional] $events Associative array containing as keys the
   * names of the events which will trigger the javascript code contained
   * in the values.
   */
  function addRadioButton( $label, $checked=false, $properties=array(), $events=null )
  {
    $properties['checked'] = $checked;
    $this->addButton( $label, $properties, $events, "qx.ui.menu.RadioButton");
  }  
  
  /**
   * Adds a separator to the Menu
   * 
   * @param array $properties Associative array of qooxdoo widget properties 
   * @param array[optional] $events Associative array containing as keys the
   * names of the events which will trigger the javascript code contained
   * in the values.
   */
  function addSeparator( $properties=array(), $events=null )
  {
    $this->addButton( "", $properties, $events, "qx.ui.menu.Separator");
  }
  
  /**
   * Adds the widget data to the response and returns it.
   * @return qcl_jsonrpc_Response
   */
  function addToResponse()
  {
    $controller =& $this->getController();
    $controller->set("menu", $this->menuItems );
    return parent::addToResponse();
  }  
}

?>