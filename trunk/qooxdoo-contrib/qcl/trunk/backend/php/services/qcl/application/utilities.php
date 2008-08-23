<?php

require_once "qcl/mixin.php";
/**
 * Mixin providing various utility methods
 */
class qcl_application_utilities extends qcl_mixin
{

  //-------------------------------------------------------------
  // remote communication
  //-------------------------------------------------------------  
  
  /**
   * Dispatches a message to the frontend, which will display a confirmation
   * message and return the result to the rpc method. the signature of the method
   * and the parameters transferred are the same plus an  boolean "true" as 
   * additional last parameter
   * @param string $display Message to be displayed
   * @param string $service Full dot-separated service name including service method
   * @param array  $params Array of mixed type parameters. 
   */
  function confirmRemote ( $display, $service, $params )
  {
    array_shift($params); // remove first parameter (form data)
    $this->dispatchMessage("bibliograph.commands.confirmRemote",array( 
      'display'  => $display,
      'service'  => $service,
      'params'   => $params
    ) );
   return $this->getResponseData();  
  }
  
  //-------------------------------------------------------------
  // widget help methods 
  //-------------------------------------------------------------

  /**
   * creates an array of listItem data that can be returned as a "children" elements
   * to qcl.databinding.simple.MDataManager - enabled widgets. the array items will
   * be used as values and their translation as label.
   * @return array
   * @param $list ordered array of list elements 
   */
  function createTranslatedListItems ( $list )
  {
    $listItems = array();
    foreach($list as $l)
    {
      $listItems[] = array(
        'classname' => "qx.ui.form.ListItem",
        'value'     => $l,
        'label'     => $this->tr($l)
      );
    }
    return $listItems;    
  }

  /**
   * creates an array of listItem data that can be returned as a "children" elements
   * to qcl.databinding.simple.MDataManager - enabled widgets. the array item with 
   * key $valueKey will be used as value and the item with $keyLabel as label
   * @return array
   * @param $list assoc array of list elements
   * @param $valueKey
   * @param $labelKey
   */
  function createListItems ( $list, $valueKey="value", $labelKey="label" )
  {
    $listItems = array();
    foreach($list as $l)
    {
      $listItems[] = array(
        'classname' => "qx.ui.form.ListItem",
        'value'     => $l[$valueKey],
        'label'     => $l[$labelKey]
      );
    }
    return $listItems;    
  }  
  
}
?>