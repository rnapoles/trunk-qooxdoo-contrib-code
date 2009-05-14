<?php
/*
 * qooxdoo - the new era of web development
 *
 * http://qooxdoo.org
 *
 * Copyright:
 *   2009 Christian Boulanger
 *
 * License:
 *   LGPL: http://www.gnu.org/licenses/lgpl.html
 *   EPL: http://www.eclipse.org/org/documents/epl-v10.php
 *   See the LICENSE file in the project's top-level directory for details.
 *
 * Authors:
 *  * Christian Boulanger (cboulanger)
 */


class class_Databinding
{
  
 
  
  function method_getNodeCount( $params )
  {
    $_SESSION['nodeCount'] = rand(1000,9000);
    $_SESSION['counter'] = 0;
    return array(
      'nodeCount'  => $_SESSION['nodeCount'],
      'statusText' => "Loading {$_SESSION['nodeCount']} nodes."
    );
  }
  
  /**
   * get node data
   * @param array $params
   */
  function method_getNodeData( $params )
  {
    /*
     * parameters
     */
    if ( count($params ) == 2 )
    {
      list( $queue, $max ) = $params;
    }
    else
    {
      /*
       * called with no arguments = get top nodes
       */
      $queue = array(0);
      $max = 1;
    }
    
    /*
     * create node array
     */
    $nodeArr = array();
    $counter= 0;
    $firstFolder = true;
    
    
    /*
     * while we haven't reached the maximum of parent nodes to return
     * and there is still a parent id in the queue, get the parent's
     * children and add them to the node list.
     */
    while ( $counter++ <= $max and 
            is_numeric( $parentId = array_shift( $queue ) ) )
    {
      
      /*
       * abort when maximum number of nodes is reached
       */
      if ( $_SESSION['counter'] > $_SESSION['nodeCount'] )
      {
        return array(
          'result' => array(
            'nodes'      => array(),   
            'queue'      => array(),
            'statusText' => "Loaded {$_SESSION['nodeCount']} nodes."
          )
        );
      }
      
      $childCount     = rand(1,10);
      
      for( $i=0; $i < $childCount; $i++ )
      {
        /*
         * create node data with at least one folder that has children
         */
        $nodeId         = ++$_SESSION['counter'];

        $isBranch       = $firstFolder ? true : (bool) rand(0,1); 
        $hasChildren    = true; //$firstFolder ? true : ( $isBranch ? (bool) rand(0,1) : false );
        $firstFolder    = false;
        
        $label          = $isBranch ? "Branch $nodeId" : "Leaf $nodeId";
        $recordCount    = $isBranch ? rand(0,100) : "";
    
        $node = array(
          'type'            => $isBranch ? 2 : 1,
          'label'           => $label,
          'bOpened'         => ! $hasChildren,
          'icon'            => null, // default
          'iconSelected'    => null, // default
          'bHideOpenClose'  => ! $hasChildren,
        
          /*
           * the data.id and data.parentId properties
           * define the node structure that exists on
           * the server. we cannot guarantee what node id
           * this node will have on the client.
           */
          'data'            => array (
                                'id'        => $nodeId,
                                'parentId'  => $parentId
                               ),
          'columnData'   => array( null, $recordCount )
        );
  
        /*
         * add to parent id queue if node has children
         */
        if ( $hasChildren )
        {
          array_push( $queue, $nodeId );
        }
        
        /*
         * add node to node array
         */
        array_push( $nodeArr, $node );
      }
    }
    
    $statusText = "Loaded {$_SESSION['counter']} of {$_SESSION['nodeCount']} nodes.";
    
    /*
     * return data to client
     */
    return array(
      'nodes'      => $nodeArr,   
      'queue'      => $queue,
      'statusText' => $statusText
    );
  }
  
 function method_register( $params )
  {
    list( $storeId ) = $params;
    if ( ! isset( $_SESSION['storeIds'] ) )
    {
      $_SESSION['storeIds'] = array();
    }
    if ( ! in_array( $storeId, $_SESSION['storeIds'] ) )
    {
      /*
       * register the store and create an event queue
       * In a real application, this would be saved in the database
       */
      $_SESSION['storeIds'][] = $storeId;
      $_SESSION['events'][$storeId] = array();
    }
    
    return array(
      'statusText' => "Store registered."
    );    
  }

  function method_unregister( $params )
  {
    list( $storeId ) = $params;
    
    if ( in_array( $storeId, $_SESSION['storeIds'] ) )
    {
      /*
       * unregister the store 
       */
      array_splice( $_SESSION['storeIds'], array_search( $storeId, $_SESSION['storeIds'], 1 ) );
      unset( $_SESSION['events'][$storeId] );
    }
    return array(
      'statusText' => "Store unregistered."
    );
  }  
  
  
  function method_getEvents( $params )
  {
    list( $storeId, $events ) = $params;

    /*
     * save client events
     */
    if ( count( $events ) )
    {
      foreach( $events as $event )
      {
        $this->saveEvent( $storeId, $event );
      }
    }        
    
    /*
     * retrieve events from queue and empty queue
     */
    if ( isset( $_SESSION['events'][$storeId] ) )
    {
      $events = $_SESSION['events'][$storeId];
      $_SESSION['events'][$storeId] = array();
    }
    else
    {
      $events = array();
    }
    
    return array(
      'events' => $events,
    );
  }

  function method_saveEvents( $params )
  {
    list( $storeId, $events ) = $params;
    foreach( $events as $event )
    {
      $this->saveEvent( $storeId, $event );
    }
    return array();
  }
  
  function saveEvent( $storeId, $event )
  {
    /*
     * for each connected store except the requesting one,
     * save an event in the event queue
     */
    foreach( $_SESSION['storeIds'] as $id )
    {
      if ( $id != $storeId )
      { 
        $_SESSION['events'][$id][] = $event;
      }
    }
  }    

}

?>