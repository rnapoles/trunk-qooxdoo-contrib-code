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


/**
 * Abstract class for jsonrpc data stores that handles event propagation.
 * This is a very simple implementation not meant for production. We simply
 * store the event data in the $_SESSION variable, separated by the 
 * class name of the extending class, so that events of differnt widget
 * types do not get mixed up. 
 */
class AbstractStore
{

  function method_register( $params )
  {
    list( $storeIds, $serviceName ) = $params;

    if( ! isset( $_SESSION['storeService'] ) )
    {
      $_SESSION['storeService'] = array();
    }
    if( ! isset( $_SESSION['events'] ) )
    {
      $_SESSION['events'] = array();
    }  
    
    foreach( (array) $storeIds as $storeId )
    {
      $_SESSION['events'][$storeId] = array(); 
      $_SESSION['storeService'][$storeId] = $serviceName;
    }
    
    return array(
      'statusText' => "Store registered."
      );
  }

  function method_unregister( $params )
  {
    list( $storeIds ) = $params;

    foreach( (array) $storeIds as $storeId )
    {
      unset( $_SESSION['events'][$storeId] ); 
    }
    
    return array(
      'statusText' => "Store unregistered."
    );
  }

  
  function method_unregisterAll()
  {
    $_SESSION['events'] = array();
    $_SESSION['storeService'] = array();
    return array(
      'statusText' => "All stores unregistered."
    );
  }

  function method_getEvents( $params )
  {

    list( $map ) = $params;
    
    //echo "/* Store #$storeId: Retrieving events, Server event queue: " . print_r( $_SESSION, true ) . "*/";
    
    $resultMap = array();
    
    foreach ( $map as $storeId => $events )
    {
      /*
       * save client events
       */
      if ( $events )
      {
        foreach( $events as $event )
        {
          $this->addToEventQueue( $storeId, $event );
        }
      }
  
      /*
       * retrieve events from queue and empty queue
       */
      $events = $this->pullEventsFromQueue( $storeId );
      if ( $events ) 
      {
        $resultMap[$storeId] = $events;
      }
      else
      {
        $resultMap[$storeId] = array();
      }
    }
    return array(
      'events' => $resultMap,
    );
  }


  function addToEventQueue( $storeId, $event )
  {
    
    /*
     * for each connected store except the requesting one,
     * save an event in the event queue if the stores have the same service name
     */
    foreach( array_keys( $_SESSION['events'] ) as $id )
    {
      if ( $id != $storeId and $_SESSION['storeService'][$storeId] == $_SESSION['storeService'][$id] )
      {
        $_SESSION['events'][$id][] = $event;
      }
    }
    
    //echo "/* Store #$storeId: Saving event " . print_r( $event, true) . "\nServer event queue: " . print_r( $_SESSION, true ) . "*/";
    
  }
  

  function pullEventsFromQueue( $storeId )
  {
    if ( isset($_SESSION['events'][$storeId]) )
    {
      $events = $_SESSION['events'][$storeId];
      $_SESSION['events'][$storeId] = array();
      return $events;
    }
    else
    {
      return array();
    }
  }
}

?>