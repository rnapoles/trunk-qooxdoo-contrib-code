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

  /**
   * @rpctest {
   *   requestData : {
   *     service : "qcl.test.application.test1",
   *     method  : "echo",
   *     params  : ["hello"]
   *   },
   *   checkResult : "hello"
   * }
   */
  public function method_checkServiceMapping1(){}

  /**
   * @rpctest {
   *   requestData : {
   *     service : "qcl.test.application.test2",
   *     method  : "echo",
   *     params  : ["hello"]
   *   },
   *   checkResult : "hello"
   * }
   */
  public function method_checkServiceMapping2(){}

  /**
   * @rpctest {
   *   requestData : {
   *     service : "qcl.test.application.test3",
   *     method  : "authenticate",
   *     params  : [null]
   *   },
   *   checkResult : function( result )
   *   {
   *     return qx.lang.Type.isObject(result);
   *   }
   * }
   */
  public function method_checkServiceMapping3(){}


  function method_echo( $message )
  {
    return $message;
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