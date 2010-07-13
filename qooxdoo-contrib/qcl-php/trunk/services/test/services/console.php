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
   *  Christian Boulanger (cboulanger)

************************************************************************ */

/**
 * The url to the RpcConsole installation, relative to this file.
 * You'll need to adapt this.
 */
$consoleUrl = "../../../qooxdoo-contrib/RpcConsole/trunk/demo/default/build/";

/**
 * The url of the qcl library, relative to the url of the console url
 * You'll need to adapt this.
 */
$qclUrl = "../../../../../../qcl-php";

/**
 * The url to the backend server
 */
$serverUrl  = "$qclUrl/test/services/server.php";

/**
 * The url to the test data
 */
$testDataUrl = "$qclUrl/test/services/class/qcl/test/index.php";

/**
 * Redirect request
 */
header("Location: $consoleUrl?serverUrl=$serverUrl&testDataUrl=$testDataUrl");
?>