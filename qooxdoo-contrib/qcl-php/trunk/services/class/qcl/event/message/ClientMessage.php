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
qcl_import( "qcl_event_message_Message" );

/**
 * A server message that is forwarded to the client
 */
class qcl_event_message_ClientMessage
  extends qcl_event_message_Message
{

  /**
   * Whether the message should be broadcasted to all connected clients
   * @var bool
   */
  protected $broadcast = false;


  public function setBroadcast( $value )
  {
    qcl_assert_type( $value, "boolean" );
    $this->broadcast = $value;
  }

  public function isBroadcast()
  {
    return $this->broadcast;
  }

}
?>