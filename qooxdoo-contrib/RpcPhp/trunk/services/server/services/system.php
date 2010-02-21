<?php
/*
 * qooxdoo - the new era of web development
 *
 * http://qooxdoo.org
 *
 * Copyright:
 *   2006-2009 Derrell Lipman, Christian Boulanger
 *
 * License:
 *   LGPL: http://www.gnu.org/licenses/lgpl.html
 *   EPL: http://www.eclipse.org/org/documents/epl-v10.php
 *   See the LICENSE file in the project's top-level directory for details.
 *
 * Authors:
 *  * Derrell Lipman (derrell)
 *  * Christian Boulanger (cboulanger) Error-Handling and OO-style rewrite
 */

class class_system extends ServiceIntrospection
{

  var $capabilities;

  /**
   * Returns singleton instance of this class
   */
  function &getInstance( $class = __CLASS__ )
  {
     if ( ! isset( $GLOBALS[$class] ) )
     {
       $GLOBALS[$class] = new $class();
     }
     return $GLOBALS[$class];
  }

  /**
   * Return the list of capabilities-
   * @public
   */
  function method_getCapabilities()
  {
    $_this = class_system::getInstance();
    return $_this->capabilities;
  }

  /**
   * Add a capability to the server
   */
  function addCapability( $name, $url, $version, $services=array(), $methods=array() )
  {
    $_this = class_system::getInstance();
    $_this->capabilities[$name] = array(
      "specUrl"       => $url,
      "specVersion"   => $version,
      "specServices"  => $services,
      "specMethods"   => $methods
    );
  }

}
?>