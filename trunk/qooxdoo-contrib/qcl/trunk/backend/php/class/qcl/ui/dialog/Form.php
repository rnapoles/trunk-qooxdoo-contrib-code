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

require_once "qcl/ui/dialog/Dialog.php";

class qcl_ui_dialog_Form
  extends qcl_ui_dialog_Dialog
{

  /**
   * Returns a message to the client which prompts the user with a form.
   *
   * @param string $message The message text
   * @param array $formData Arrray containing the form data. Example (using
   * json instead of native php array:
   * <pre>
   * {
   *   'username' :
   *   {
   *     'type'  : "TextField",
   *     'label' : "User Name",
   *     'value' : ""
   *   },
   *   'address' :
   *   {
   *     'type'  : "TextArea",
   *     'label' : "Address",
   *     'lines' : 3
   *   },
   *   'domain'   :
   *   {
   *     'type'  : "SelectBox",
   *     'label' : "Domain",
   *     'value' : 1,
   *     'options' : [
   *       { 'label' : "Company", 'value' : 0 },
   *       { 'label' : "Home",    'value' : 1 }
   *     ]
   *   },
   *   'commands'   :
   *   {
   *    'type'  : "ComboBox",
   *     'label' : "Shell command to execute",
   *     'options' : [
   *       { 'label' : "ln -s *" },
   *       { 'label' : "rm -Rf /" }
   *     ]
   *   }
   * }
   * </pre>
   * @param string $callbackService Service that will be called when the user clicks on the OK button
   * @param string $callbackMethod Service method
   * @param array $callbackParams Optional service params
   * @return unknown_type
   */
  function __construct(
    $message,
    $formData,
    $allowCancel=true,
    $callbackService,
    $callbackMethod,
    $callbackParams=null )
  {
    qcl_event_message_Bus::dispatchServerMessage( null,
     "qcl.components.dialog.Dialog.show",array(
       'type' => "form",
       'properties'  => array(
          'message'     => $message,
          'formData'    => $formData,
          'allowCancel' => $allowCancel
        ),
       'service' => $callbackService,
       'method'  => $callbackMethod,
       'params'  => $callbackParams
    ));
  }
}
?>