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
require_once "qcl/data/persistence/behavior/IBehavior.php";
require_once "qcl/data/persistence/behavior/Abstract.php";

/**
 * Persistence Behavior that saves the object's public properties
 * to the PHP session by an id. If you want to save only one instance
 * of the object, use the class name as id.
 */
class qcl_data_persistence_behavior_Session
  extends qcl_data_persistence_behavior_Abstract
  implements qcl_data_persistence_behavior_IBehavior
{
  const KEY = QCL_DATA_PERSISTENCE_SESSION;

  /**
   * Return singleton instance of this class
   * @return qcl_data_persistence_behavior_Session
   */
  public static function getInstance()
  {
    return qcl_getInstance( __CLASS__ );
  }

  /**
   * Loads the object's public properties from the session
   * @param qcl_core_Object $object Persisted object
   * @param string $id The id of the saved object
   * @return void
   */
  public function load( $object, $id )
  {
    if ( isset( $_SESSION[ self::KEY ][ $id ] ) )
    {
      $serializedProps = $_SESSION[ self::KEY ][ $id ];
      $props = unserialize( $serializedProps );
      qcl_log_Logger::getInstance()->log( $object->className() . ": loading data with id '$id'","persistence");
      if ( ! is_array( $props ) )
      {
        throw new JsonRpcException("Invalid session data.");
      }
      foreach( $props as $key => $value )
      {
        if ( $object->has($key) )
        {
          $object->set( $key, $value );
        }
      }
    }
    else
    {
      qcl_log_Logger::getInstance()->log( $object->className() . " no cached data with id '$id'","persistence");
    }
  }

  /**
   * Saves the object's public property to the session
   * @param qcl_core_Object $object Persisted object
   * @param string $id The id of the saved object
   */
  public function save( $object, $id )
  {
    $serializedProperties = $object->serializeProperties();
    $_SESSION[ self::KEY ][ $id ] = $serializedProperties;
    qcl_log_Logger::getInstance()->log( $object->className() . " saved to cache with id '$id'", "persistence");
  }
}
?>