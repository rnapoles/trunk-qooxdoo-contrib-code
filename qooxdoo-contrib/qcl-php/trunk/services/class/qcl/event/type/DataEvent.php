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
require_once "qcl/event/type/Event.php";

class qcl_event_type_DataEvent
  extends qcl_event_type_Event
{

  /**
   * Constructor
   * @param string $type
   * @return void
   */
  function __construct( $type, $data )
  {
    $this->type = $type;
    $this->data = $data;
  }

  /**
   * Event Data
   * @var string
   */
  protected $data;

  /**
   * Getter for event data
   * @return mixed
   */
  public function getData()
  {
    return $this->data;
  }

  /**
   * Setter for event data
   */
  public function setData( $data )
  {
    $this->data = $data;
  }
}
?>