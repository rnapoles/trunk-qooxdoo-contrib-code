<?php
/*
 * dependencies
 */
require_once "qcl/jsonrpc/controller.php";

/**
 * Abstract service class managing models that have a tree structure.
 * Can also be used as an interface
 */
class qcl_databinding_tree_controller extends qcl_mvc_Controller
{
  //-------------------------------------------------------------
  // class variables
  //-------------------------------------------------------------

  var $icon;
  var $icon_selected;
  var $type;


  //-------------------------------------------------------------
  // api methods
  //-------------------------------------------------------------  

  /**
   * default update client action: get child notes
   */
  function method_updateClient($params)
  {
    return $this->method_getChildNodes($params);
  }
  
  /**
   * Get data of a node of the notes tree.
   * @param object $model
   * @param int   $nodeId
   * @param int   $parentId 
   * @return array
   */
  function getNodeData($model,$nodeId,$parentId=null){}
  
  
  /**
   * get child note nodes
   * @param string  $params[0] datasource
   * @param int     $params[1] parent note id (server)
   * return array simple treedatamodel
   */
  function method_getChildNodes($params)  {}
  

  /**
   * get the actual data of the child nodes of a node 
   * @return array
   * @param object $model data model object  
   * @param int $parentId 
   */
  function _getChildNodes($model,$parentId)
  {

    $result = array(); 
    
    // get child ids
    $childIds = $model->getChildIds($parentId);

    // client data
    foreach ( $childIds as $childId )
    {
      $nodeData = $this->getNodeData(&$model,$childId,$parentId);
      if ($nodeData)
      {
        $result[] = $nodeData;
      }
    }
    return $result;
  }  

  /**
   * gets the hierarchy of ids that lead to a specific node
   * @param int $params[0] datasource
   * @param int $params[1] server-side id
   * @return array
   */
  function getNodeIdHierarchy($params){}
  
  /**
   * create a new item
   * @param $param[0] name of datasource
   * @param $param[1] parent note id (server)
   * @param $param[2] label of new item
   * @param $param[3] position
   * @return array
   */
  function method_create($params){}

  
  /**
   * create a new top-level note
   * @param $param[0] name of bibliography
   * @param $param[1] label of new item
   * @return array
   */
  function method_createTopLevelNote($params) {}
  
  
 /**
  * change position within note siblings
  * called with updateServer();
  * @param string   $params[1] bibliography name
  * @param int      $params[2] note id
  * @param int      $params[3] parent note id
  * @param int      $params[4] new position
  */
  function method_changePosition ( $params ){}

  

 /**
  * move subnote to parent at specified position
  * called with updateServer();
  * @param string   $params[1] datasource name
  * @param int      $params[2] note id
  * @param int      $params[3] new parent note id
  * @param int      $params[4] new position
  */
  function method_changeParent ( $params ) {}

  /**
   * reorder sub-notes
   * called with updateServer();
   * @param string   $params[1] datasource name
   * @param int      $params[2] folder id
   * @param string   $params[3] field to order by
   */
  function method_reorder ( $params )  {}
    

  /**
   * copy a tree branch from one datasource to another. works recursively
   * called with updateClient();
   * @param string   $params[0] source datasource name
   * @param int      $params[1] source note id
   * @param string   $params[2] target datasource name
   * @param int      $params[3] target parent note id
   * @param int      $params[4] target position
   * @param int      $params[5] target parent node id
   */
  function method_copy ( $params )   {}
  
  /**
   * delete a note by setting its parent id to null
   * @todo add function that expunges such notes permanently
   * @param string  $params[0] datasource name
   * @param int     $params[1] note id
   * @param int     $params[1] parent note id
   * @param int     $params[2] parent node id
   * @return array
   */
  function method_delete($params)  {}
  
  /**
   * update item data
   * @param object  $param[1]   map of data properties to update and including the id
   * @param int     $param[2]   (optional) if the id is not contained in the data, provide it here
   * @return array
   * @todo pass datasource info from client!
   */
  function method_update($params) {}  
  
}

?>