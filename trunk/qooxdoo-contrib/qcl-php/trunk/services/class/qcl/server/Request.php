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

/**
 */
class qcl_server_Request
  extends qcl_core_Object
{

  /**
   * The id of the request
   */
  public $id = null;

  /**
   * The name of the service
   * @var string
   */
  public $service = null;

  /**
   * The name of the method
   * @var string
   */
  public $method = null;

  /**
   * The service arguments
   * @var array
   */
  public $params = array();

  /**
   * Optional out-of-bands server data. This is not part of the
   * JSON-RPC specification
   * @var mixed
   */
  public $server_data = null;

  /**
   * Returns the singleton instance of this class
   * @return qcl_server_Request
   */
  static public function getInstance()
  {
    return qcl_getInstance( __CLASS__ );
  }

  /**
   *
   * @param $key
   * @return unknown_type
   */
  public function getServerData( $key = null )
  {
    if ( $key !== null and is_object( $this->server_data ) )
    {
      return $this->server_data->$key;
    }
    elseif ( $key !== null and is_array( $this->server_data ) )
    {
      return $this->server_data[$key];
    }
  }

  /**
   * Returns IP of requesting client
   * @return string
   */
  public function getIp()
  {
    return $_SERVER['REMOTE_ADDR'];
  }
}
?>