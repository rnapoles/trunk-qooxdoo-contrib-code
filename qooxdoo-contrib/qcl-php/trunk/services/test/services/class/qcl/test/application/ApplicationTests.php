<?php
/* ************************************************************************

   qcl - the qooxdoo component library

   http://qooxdoo.org/contrib/project/qcl/

   Copyright:
     2007-2009 Christian Boulanger

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Chritian Boulanger (cboulanger)

************************************************************************ */

qcl_import( "qcl_test_AbstractTestController" );

/**
 *
 */
class class_qcl_test_application_ApplicationTests
  extends qcl_test_AbstractTestController
{

  function method_echo( $message )
  {
    return "Client said: '$message'";
  }

  function method_getIniValue($key)
  {
    $value = $this->getApplication()->getIniValue($key);
    if ( ! $value )
    {
      $this->raiseError("'$key' is empty or not set.");
    }
    return $value;
  }

  function method_getTranslation( $text )
  {
    $lm = $this->getLocaleManager();
    $lm->setLocale("de");
    $lm->logLocaleInfo();
    return( "Translation of '$text': '" . $lm->tr($text) . "'.");
  }
}

?>