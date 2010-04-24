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

require_once "qcl/data/Result.php";
require_once "qcl/event/message/Bus.php";
require_once "qcl/application/Application.php";

/**
 * Base class for dialog data
 *
 */
class qcl_ui_dialog_Dialog
  extends qcl_data_Result
{

  function dispatchDialogMessage( $data )
  {
    /*
     * only dispatch the message if event transport is on
     */
    if ( $this->getApplication()->getIniValue("service.event_transport") == "on" )
    {
      $this->getMessageBus()->dispatchClientMessage(
        null, "qcl.ui.dialog.Dialog.createDialog", $data
      );
    }
    else
    {
      $this->warn( "Cannot dispatch message - event transport is off!");
    }
  }
}
?>