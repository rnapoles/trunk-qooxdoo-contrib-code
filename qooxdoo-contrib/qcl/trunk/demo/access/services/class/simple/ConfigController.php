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

class class_simple_ConfigController
{

  var $config = array(
        'adminValue' => "A global value (administrator only)",
        'userValue' => "A value that is particular to each user",
        'intValue'    => 0,
        'boolValue'   => false,
        'listValue'   => array("one,two,three,four")
      );

  function method_load( $params )
  {

    foreach( $this->config as $key => $value )
    {
      if ( ! isset( $_SESSION['config'][$key] ) )
      {
        $_SESSION['config'][$key] = $value;
      }
    }

    return array(
      'keys'    => array_keys( $_SESSION['config'] ),
      'values'  => array_values( $_SESSION['config'] )
    );
  }

  function method_set( $params )
  {
    if ( ! isset( $_SESSION['usersession'] ) )
    {
      trigger_error("No usersession!");
    }

    list( $key, $value ) = $params;
    $_SESSION['config'][$key] = $value;

    return true;

    return array(
      'result'  => true
    );
  }
}
?>