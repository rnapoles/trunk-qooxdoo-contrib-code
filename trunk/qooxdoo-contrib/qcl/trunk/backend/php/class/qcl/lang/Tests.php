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
require_once "qcl/jsonrpc/controller.php";

/**
 * Service class containing test methods
 */
class class_qcl_lang_Tests extends qcl_data_Controller
{

  function method_testUtf8( $params )
  {
    list($string) = $params;
    $citekey = new Utf8String(utf8_encode($string));
    $this->info( $citekey->toAscii() );
    $citekey = $citekey->replace("/-/m","");
    $this->info( $citekey->toString() );
  }

}

?>