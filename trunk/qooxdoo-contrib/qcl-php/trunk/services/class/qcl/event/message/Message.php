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
require_once "qcl/core/Object.php";

class qcl_event_message_Message
  extends qcl_core_Object
{

  /**
   * Message name
   * @var string
   */
  var $name;

  /**
   * Message data
   */
  var $data;

  /**
   * The id of the sender. Only set when the message is dispatched
   * @var string
   */
  var $senderId;

  /**
   * Constructor
   * @param string $name
   * @param mixed $data
   * @return void
   */
  function __construct( $name, $data )
  {
    $this->name = $name;
    $this->data = $data;
  }

  function setSenderId( $senderId )
  {
    $this->senderId = $senderId;
  }

  function getSenderId()
  {
    return $this->senderId;
  }

  /**
   * Stores the sender by storing its id.
   * @param qcl_core_Object $sender
   * @return void
   */
  function setSender( $sender )
  {
    $this->setSenderId( $sender->objectId() );
  }

  /**
   * Returns the sender object
   * @return qcl_core_Object
   */
  function getSender()
  {
    return $this->getObjectById( $this->getSenderId() );
  }
}
?>