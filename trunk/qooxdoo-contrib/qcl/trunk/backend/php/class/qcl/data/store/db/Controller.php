<?php
/*
 * qcl - the qooxdoo component library
 *
 * http://qooxdoo.org/contrib/project/qcl/
 *
 * Copyright:
 *   2007-2009 Christian Boulanger
 *
 * License:
 *   LGPL: http://www.gnu.org/licenses/lgpl.html
 *   EPL: http://www.eclipse.org/org/documents/epl-v10.php
 *   See the LICENSE file in the project's top-level directory for details.
 *
 * Authors:
 *  * Christian Boulanger (cboulanger)
 */

require_once "qcl/data/controller/Controller.php";
require_once "qcl/data/store/IStoreController.php";
require_once "qcl/data/store/db/StoreModel.php";
require_once "qcl/data/store/db/EventStoreModel.php";

/**
 * Abstract class for jsonrpc data stores that handles event propagation.
 */
class qcl_data_store_db_Controller
  extends qcl_data_controller_Controller
  implements qcl_data_store_IStoreController
{

  /**
   * Register a store
   * @param string $storeId Id of the store
   * @param string $serviceName The name of the service that the store is connected tp
   * @return array
   */
  function method_register( $storeId, $serviceName=null )
  {
    $this->info("Registering store $storeId for service $serviceName.",__CLASS__,__LINE__);
    $storeModel =& qcl_data_store_db_StoreModel::getInstance();
    $storeModel->insert( array(
      "storeId"      => $storeId,
      "storeService" => either( $serviceName, $this->className() ),
      "sessionId"    => $this->getSessionId()
    ) );

    return array(
      'statusText' => "Store registered."
    );
  }

  /**
   * Unregister a store
   * @param array|string $storeIds An array of store ids or a single store id
   * @return array
   */
  function method_unregister( $storeIds )
  {
    $this->info("Unregistering store $storeIds ",__CLASS__,__LINE__);
    $storeModel =& qcl_data_store_db_StoreModel::getInstance();
    $eventStore =& qcl_data_store_db_EventStoreModel::getInstance();

    foreach( (array) $storeIds as $storeId )
    {
      $storeModel->deleteWhere(array(
        'storeId' => $storeId
      ));
      $eventStore->deleteWhere(array(
        'storeId' => $storeId
      ));
    }

    return array(
      'statusText' => "Store unregistered."
    );
  }

  /**
   * Unregisters all stores, typically called when the application
   * is closed
   */
  function method_unregisterAll()
  {
    $this->info("Unregistering all stores.");
    $storeModel =& qcl_data_store_db_StoreModel::getInstance();
    $storeModel->truncate();
    $eventStore =& qcl_data_store_db_EventStoreModel::getInstance();
    $eventStore->truncate();
    return array(
      'statusText' => "All stores unregistered."
    );
  }

  /**
   * Receives and returns events for the given store(s)
   * @param array $map Map, the keys being the store ids, and the values being
   * an array of event data maps.
   * @return array Map with the same structure
   */
  function method_exchangeEvents( $map )
  {


//    $this->debug( "/* Store #$storeId: Retrieving events, Server event queue: " . print_r( $_SESSION, true ) . "*/",__CLASS__,__LINE__);

    $resultMap = array();

    foreach ( $map as $storeId => $events )
    {
      /*
       * save client events
       */
      if ( is_array( $events ) )
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

  /**
   * Adds an event to the event queue of all stores except the
   * requesting one.
   * @param $storeId Id of the current store
   * @param $event Event data
   * @return void
   */
  function addToEventQueue( $storeId, $event )
  {
    $storeModel =& qcl_data_store_db_StoreModel::getInstance();
    $eventStore =& qcl_data_store_db_EventStoreModel::getInstance();

    /*
     * get the store service registered for the store id
     */
    $storeService = $storeModel->findValues("storeService",array(
      'storeId' => $storeId
    ));

    /*
     * find all store ids that are not the requesting store and which
     * have the same store service
     */
    $storeIds = $storeModel->findValues("storeId", "
      `storeId` != '$storeId'
      AND `storeService` = '{$storeService[0]}'
    ");

    /*
     * for each of these stores, save the event in the event queue
     */
    foreach( $storeIds as $id )
    {
      $eventStore->insert( array(
        'storeId'   => $id,
        'eventData' => serialize( $event )
      ) );
    }
  }

  /**
   * Retrieve all event data that has been queued for a given store id.
   * @param $storeId
   * @return array
   */
  function pullEventsFromQueue( $storeId )
  {
    $events = array();

    $eventStore =& qcl_data_store_db_EventStoreModel::getInstance();
    $eventStore->findBy("storeId", $storeId );

    if ( $eventStore->foundSomething() ) do
    {
      $events[] = unserialize( $eventStore->get("eventData" ) );
    }
    while ( $eventStore->nextRecord() );

    /*
     * delete retrieved events
     */
    $eventStore->deleteBy( "storeId", $storeId );

    return $events;
  }
}
?>