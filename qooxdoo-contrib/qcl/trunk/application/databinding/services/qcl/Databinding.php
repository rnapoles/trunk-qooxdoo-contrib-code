<?php
/*
 * qooxdoo - the new era of web development
 *
 * http://qooxdoo.org
 *
 * Copyright:
 *   2008 Derrell Lipman
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
      'nodeCount' => $_SESSION['nodeCount']
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
            'nodes'        => array(),   
            'queue'        => array()
          )
        );
      }
      
      $childCount     = rand(1,10);
      
      for( $i=0; $i < $childCount; $i++ )
      {
        /*
         * create node datat
         */
        $nodeId         = ++$_SESSION['counter'];
        $isBranch       = (bool) rand(0,1);
        
        $label          = $isBranch ? "Branch $nodeId" : "Leaf $nodeId";
        $hasChildren    = $isBranch ? (bool) rand(0,1) : false;
        $recordCount    = $isBranch ? rand(0,100) :"";
        
    
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
  
        if ( $hasChildren )
        {
          array_push( $queue, $nodeId );
        }
        array_push( $nodeArr, $node );
      }
    }
    
    return array(
      'nodes'        => $nodeArr,   
      'queue'        => $queue
    );
  }

}

?>