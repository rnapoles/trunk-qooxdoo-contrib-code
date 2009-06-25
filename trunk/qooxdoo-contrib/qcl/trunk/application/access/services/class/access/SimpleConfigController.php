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

class class_SimpleConfigController
{

  var $config = array(
        'application.name' => "Sample Application",
        'application.author' => "Jon Doe",
        'test.checked' => true,
        'test.value' => "Foo",
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

  function method_get( $params )
  {
    list( $key ) = $params;
    return array(
      'value'  => $_SESSION['config'][$key]
    );
  }

  function method_set( $params )
  {
    if ( ! isset( $_SESSION['usersession'] ) )
    {
      trigger_error("No usersession!");
    }
    if ( ! in_array( "manageConfig", $_SESSION['usersession']['permissions'] ) )
    {
      trigger_error("You don't have permission to change the configuration!");
    }

    list( $key, $value ) = $params;
    $_SESSION['config'][$key] = $value;
    return array(
      'result'  => true
    );
  }


}
?>