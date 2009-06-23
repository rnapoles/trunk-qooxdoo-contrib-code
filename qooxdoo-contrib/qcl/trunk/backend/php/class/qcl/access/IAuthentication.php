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
 * Interface for classes that provide authentication
 */
interface qcl_access_IAuthentication
{

  /**
   * Authenticate with username and password (two parameters),
   * or a valid session id (one parameter).
   * If authenticated, return an array of the following structure
   *
   * array(
   *   "error"       => false,
   *   "permissions" => array( "permission1","permission2" ....),
   *   "sessionId"   => "a23j2h3i4h2l2...",
   *   "username"    => "jondoe",
   *   ... < Any more userdata that you want to send to client >
   * );
   *
   * If authentication fails, you must return
   * array(
   *    "error"     => "Error message",
   *    "sessionId" => <session id or null if no session>
   * )
   * @param array $params Array of parameters
   * @return array
   */
  function method_authenticate( $params );

}
?>