<?php
require_once "qcl/data/controller/Controller.php";
require_once "qcl/ui/dialog/Alert.php";
require_once "qcl/ui/dialog/Confirm.php";
require_once "qcl/ui/dialog/Select.php";
require_once "qcl/ui/dialog/Form.php";

/**
 * Application methods
 */
class class_access_ApplicationController
  extends qcl_data_controller_Controller
{
  function method_testAccess()
  {
    return array(
      'viewRecord'  => $this->hasPermission("viewRecord"),
      'manageUsers' => $this->hasPermission("manageUsers")

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