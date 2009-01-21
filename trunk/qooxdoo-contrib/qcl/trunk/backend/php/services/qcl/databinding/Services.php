<?php

/*
 * dependencies
 */
require_once "qcl/core/mixin.php";

/**
 * Mixin providing access services for databinding
 */
class qcl_databinding_Services extends qcl_core_mixin
{    
 /**
   * Returns a list of data.
   * @param string $type Model type #
   * @param string $labelProperty The property that will be put into the label
   * @param string $filterType Type of the linked model that is used as a filter
   * @param string $filterId Id of record in the linked model which filters the local model
   * @param string $sortBy Field to sort by
   * @param mixed $select If provided, preselect the list with a value
   * @param bool $translate If yes, translate the label
   * @return qcl_jsonrpc_Response Data to populate a qx.ui.form.List 
   */
  function listData( $type, $labelProperty, $filterType=null, $filterId=null, $sortBy=null, $select=null, $translate=false ) 
  {
    /*
     * check type
     */
    if ( ! in_array($type, $this->modelTypes ) ) 
    {
      $this->raiseError("Invalid type parameter '$type'.");      
    }
    
    /*
     * list data object
     */
    require_once "qcl/databinding/widgets/qx/ui/form/List.php";
    $listData = new qcl_databinding_widgets_qx_ui_form_List(&$this);
    
    /*
     * get role data and add add it to list object 
     * @var qcl_db_PropertyModel
     */
    $model =& $this->getModel($type);

    if ( ! $model->hasProperty($labelProperty ) )
    {
      $this->raiseError("Invalid label property '$labelProperty'");
    }
    
    /*
     * do we want all records or a subset?
     */
    if ( $filterType )
    {
      /*
       * get record filtered by the value of a linked filter model
       */
      if ( in_array( $filterType, $this->modelTypes ) )
      {
        if ( ! $filterId or ! is_numeric($filterId) )
        {
          $this->raiseError("Invalid filter id '$filterId'.");  
        }

        $model->findByLinkedId( $filterId, $filterType, $sortBy );  

      }
      
      /*
       * @todo filter by value
       */
      
      /*
       * invalid filter parameter
       */
      else
      {
        $this->raiseError("Invalid filter '$filterType.");
      }
    }
    else
    {
      /*
       * get all records
       */
      $model->findAll($sortBy);  
    }
    
    /*
     * build list data
     */
    if ( $model->foundSomething() )
    {
      do 
      {
        /*
         * filter out inactive items
         */
        if ( ! $model->hasProperty("active") or $model->getActive() )
        {
          $label = $model->getProperty($labelProperty);
          $listData->add( 
            $model->id(), 
            $translate ? $this->tr($label) : $label,
            $model->getIcon()
          );          
        }
      }
      while( $model->nextRecord() );
      
    }
    
    /*
     * preselect value?
     */
    if ( $select )
    {
      $listData->select( $select );
    }
    /*
     * return client data
     */
    return $listData->addToResponse();
  }  
     
  
}
?>