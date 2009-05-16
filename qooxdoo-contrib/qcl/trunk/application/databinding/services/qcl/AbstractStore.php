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


class AbstractStore
{
  
  
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