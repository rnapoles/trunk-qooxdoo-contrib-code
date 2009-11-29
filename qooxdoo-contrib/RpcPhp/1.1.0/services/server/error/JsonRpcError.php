<?php
/*
 * qooxdoo - the new era of web development
 *
 * http://qooxdoo.org
 *
 * Copyright:
 *   2006-2009 Derrell Lipman
 *
 * License:
 *   LGPL: http://www.gnu.org/licenses/lgpl.html
 *   EPL: http://www.eclipse.org/org/documents/epl-v10.php
 *   See the LICENSE file in the project's top-level directory for details.
 *
 * Authors:
 *  * Derrell Lipman (derrell)
 *  * Christian Boulanger (cboulanger)
 */

/*
 * Base class
 */
require dirname(__FILE__) . "/AbstractError.php";


/*
 * class JsonRpcError
 *
 * This class allows service methods to easily provide error information for
 * return via JSON-RPC.
 */
class JsonRpcError extends AbstractError
{

  /**
   * The id of the request
   * @var int
   */
  var $id;

  /**
   * The id of the request if script transport is used
   */
  var $scriptTransportId = ScriptTransport_NotInUse;

  function SetScriptTransportId($id)
  {
    $this->scriptTransportId = $id;
  }

  /**
   * Returns the error jsonrpc data to the client
   * @param array $optional_data An optional array of key=>value pairs that should be included
   * in the array response. Must not contain the keys "error" and "id"
   */
  function SendAndExit( $optional_data=array() )
  {
    $ret = array_merge(
      array(
        "error" => $this->data,
         "id"   => $this->id
      ),
      $optional_data
    );

    $json = new JsonWrapper;

    if ( handleQooxdooDates )
    {
      $json->useJsonClass();
      $this->SendReply($json->encode($ret), $this->scriptTransportId);
    }
    else
    {
      $this->SendReply($json->encode($ret), $this->scriptTransportId);
    }
    exit;
  }

  /**
   * Sends text to the client
   * @param $reply
   * @param $scriptTransportId
   * @return unknown_type
   */
  function SendReply($reply, $scriptTransportId)
  {
    /* If not using ScriptTransport... */
    if ($scriptTransportId == ScriptTransport_NotInUse)
    {
        /* ... then just output the reply. */
        print $reply;
    }
    else
    {
        /* Otherwise, we need to add a call to a qooxdoo-specific function */
        $reply =
            "qx.io.remote.transport.Script._requestFinished(" .
            $scriptTransportId . ", " . $reply .
            ");";
        print $reply;
    }
  }
}
?>