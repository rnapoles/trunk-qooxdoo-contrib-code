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
 * Interface for service controllers that implement a data store
 * backend.
 */
interface qcl_data_store_IStoreController
{

  /**
   * Register a store
   * @param $storeId Id of the store
   * @param $serviceName The name of the service that the store is connected to.
   * If no argument is given, use current class name.
   * @return array
   */
  function method_register( $storeId, $serviceName=null );

  /**
   * Unregister a store
   * @param array|string $storeIds An array of store ids or a single store id
   * @return array
   */
  function method_unregister( $storeIds );

  /**
   * Unregisters all stores, typically called when the application
   * is closed
   */
  function method_unregisterAll();

  /**
   * Receives and returns events for the given store(s)
   * @param array $map Map, the keys being the store ids, and the values being
   * an array of event data maps.
   * @return array Map with the same structure
   */
  function method_exchangeEvents( $map );

  /**
   * Adds an event to the event queue of all stores except the
   * requesting one.
   * @param $storeId Id of the current store
   * @param $event Event data
   * @return void
   */
  function addToEventQueue( $storeId, $event );

  /**
   * Retrieve all event data that has been queued for a given store id.
   * @param $storeId
   * @return array
   */
  function pullEventsFromQueue( $storeId );
}
?>