<?php
/* ************************************************************************

   qcl - the qooxdoo component library

   http://qooxdoo.org/contrib/project/qcl/

   Copyright:
     2009 Christian Boulanger

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
   * Christian Boulanger (cboulanger)

 ************************************************************************ */

require_once "qcl/data/controller/Controller.php";
require_once "qcl/ui/dialog/Alert.php";
require_once "qcl/ui/dialog/Confirm.php";
require_once "qcl/ui/dialog/Select.php";
require_once "qcl/ui/dialog/Form.php";
require_once "qcl/ui/dialog/RemoteWizard.php";

/**
 * Service providing methods that setup the application
 */
class class_DialogDemo
  extends qcl_data_controller_Controller
{

  // we don't need authentication for this demo
  var $skipAuthentication = true;

  function method_setupAccount( $params )
  {
    list( $page, $resultData ) = $params;

    /*
     * first call, return wizard with page data
     */
    if ( $page === 0 && ! $resultData )
    {
      return new qcl_ui_dialog_RemoteWizard(
        $this->getPageData(), 0,
        false, false,
        $this->getServiceName(),
        "setupAccount"
      );
    }

    /*
     * Wizard has been completed
     */
    elseif ( $page === null )
    {
      $this->info( $resultData );
      return new qcl_ui_dialog_Alert( print_r ( $resultData, true ) );
    }

    /*
     * else, simply return the page to open
     */
    else
    {
      return new qcl_data_Result( array(
        'page' => $page
      ));
    }

  }

  function method_checkUserName($params)
  {
    list($username) = $params;
    return $username && ! strstr( $username, " " );
  }

  function getPageData()
  {
    return json_decode(<<<EOT
    [
      {
         "message" : "<p style='font-weight:bold'>Create new account</p><p>Please create a new mail account.</p><p>Select the type of account you wish to create</p>",
         "formData" : {
           "accountTypeLabel" : {
             "type" : "label",
             "label" : "Please select the type of account you wish to create."
           },
           "accountType" : {
             "type" : "radiogroup",
             "label": "Account Type",
             "options" :
             [
              { "label" : "E-Mail", "value" : "email" },
              { "label" : ".mac", "value" : ".mac" },
              { "label" : "RSS-Account", "value" : "rss" },
              { "label" : "Google Mail", "value" : "google" },
              { "label" : "Newsgroup Account", "value" : "news" }
             ]
           }
         }
       },
       {
         "message" : "<p style='font-weight:bold'>Identity</p><p>This information will be sent to the receiver of your messages.</p>",
         "formData" : {
           "label1" : {
             "type" : "label",
             "label" : "Please enter your name as it should appear in the 'From' field of the sent message. "
           },
           "fullName" : {
             "type" : "textfield",
             "label": "Your Name",
             "validation" : {
               "required" : true
             }
           },
           "label2" : {
             "type" : "label",
             "label" : "Please enter your email address. This is the address used by others to send you messages."
           },
           "email" : {
             "type" : "textfield",
             "label": "E-Mail Address",
             "validation" : {
               "required" : true,
               "validator" : "email"
             }
           }
         }
       },
       {
         "message" : "<p style='font-weight:bold'>Account</p><p>Bla bla bla.</p>",
         "formData" : {
           "serverType" : {
             "type" : "radiogroup",
             "orientation" : "horizontal",
             "label": "Select the type of email server",
             "options" :
               [
                { "label" : "POP", "value" : "pop" },
                { "label" : "IMAP", "value" : "imap" }
               ]
           },
           "serverAddressLabel" : {
             "type" : "label",
             "label" : "Please enter the server for the account."
           },
           "serverAddress" : {
             "type" : "textfield",
             "label": "E-Mail Server",
             "validation" : {
               "required" : true,
               "validator" : "/^[a-zA-Z0-9.]{6,}$/"
             }
           }
         }
       },
       {
         "message" : "<p style='font-weight:bold'>Username</p><p>Bla bla bla.</p>",
         "formData" : {
           "emailUserName" : {
             "type" : "textfield",
             "label": "Inbox server user name:",
             "validation" : {
               "required" : true,
               "service" : {
                  "name" : "bibliograph.controller.Setup",
                  "method" : "checkUserName"
               }
             }
           }
         }
       }
     ]
EOT

  );
  }


  function method_serverDialog1( $params )
  {
    return new qcl_ui_dialog_Alert(
      "Welcome to the server dialog demo. All the dialogs you will see now are initiated from the server and return their result to the server. First demo: Sending 'Foo!' to server.",
      $this->getServiceName(),
     "serverDialog2",
      array( "Foo!" )
    );
  }

  function method_serverDialog2( $params )
  {
    list($true, $arg) = $params;
    return new qcl_ui_dialog_Alert(
      "Received '$arg'. Next: A confirmation dialog.",
      $this->getServiceName(),
     "serverDialog3"
    );
  }

  function method_serverDialog3( $params )
  {
    return new qcl_ui_dialog_Confirm(
      "Please confirm that you exist.",
      array( "Yes, I exist", "No, I don't exist." ),
      $this->getServiceName(),
     "serverDialog4"
    );
  }

  function method_serverDialog4( $params )
  {
    list($arg) = $params;
    return new qcl_ui_dialog_Alert(
      "You confirmed that " . ( $arg ? "you exist" : "you don't exist.") . " Now for a choice of options:",
      $this->getServiceName(),
     "serverDialog5"
    );
  }

  function method_serverDialog5( $params )
  {
    list($arg) = $params;
    return new qcl_ui_dialog_Select(
      "Please pick your favorite fruit:",
      array(
        array( 'label' => "Apple",      'value' => "apple"),
        array( 'label' => "Strawberry", 'value' => "strawberry"),
        array( 'label' => "Cherry",     'value' => "cherry")
      ),
      false, /* allow cancel */
      $this->getServiceName(),
     "serverDialog6"
    );
  }

  function method_serverDialog6( $params )
  {
    list($arg) = $params;
    return new qcl_ui_dialog_Alert(
      "Your favorite fruit is $arg. Now a form that is constructed by the server.",
      $this->getServiceName(),
     "serverDialog7"
    );
  }

  function method_serverDialog7( $params )
  {
    list($arg) = $params;
    return new qcl_ui_dialog_Form(
      "<h3>Enter User Information</h3>",
      array(
        'lastname' => array(
          'type'      => "textfield",
          'label'     => "Last name"
        ),
        'firstname' => array(
          'type'      => "textfield",
          'label'     => "First name"
        ),
       'address' => array(
          'type'      => "textarea",
          'label'     => "Address",
          'lines'     => 3
        ),
        'country' => array(
          'type'      => "selectbox",
          'label'     => "Country of origin",
          'options'   => array(
            array( 'label' => "France",  'value' => "fr" ),
            array( 'label' => "USA",     'value' => "us" ),
            array( 'label' => "Germany", 'value' => "de" ),
            array( 'label' => "Japan",   'value' => "jp" ),
            array( 'label' => "Russia",  'value' => "ru" )
          ),
          'value'     => "de"
        ),
        'profession' => array(
          'type'      => "combobox",
          'label'     => "Profession",
          'options'   => array(
            array( 'label' => "Carpenter",  'value' => 0 ),
            array( 'label' => "Sailor",     'value' => 1 ),
            array( 'label' => "Rocket Scientist", 'value' => 3 ),
            array( 'label' => "IT Expert",   'value' => 4 ),
            array( 'label' => "Circus Director",  'value' => 5 )
          )
        )
      ),
      true, /* allow cancel */
      $this->getServiceName(),
     "serverDialog8"
    );
  }

  function method_serverDialog8( $params )
  {
    list($arg) = $params;
    return new qcl_ui_dialog_Confirm(
      "You entered the following values: <pre>" . print_r( $arg, true ) . "</pre> Thank you for trying this demo.<br/><br/>Do you wish to run the demo again?",
      array( "Yes, please", "No, I had enough." ),
      $this->getServiceName(),
     "serverDialog9"
    );
  }


  function method_serverDialog9( $params )
  {
    list($arg) = $params;
    if ( $arg )
    {
      return new qcl_ui_dialog_Alert(
        "Click on OK to start the demo again.",
        $this->getServiceName(),
       "serverDialog1"
      );
    }
    else
    {
      return new qcl_ui_dialog_Alert("Good bye.");
    }
  }

}
?>