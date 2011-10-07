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
 * Usually, there is no need to change anything in this file
 */

/*
 * Configure constants & runtime settings
 */
require "config.php";

/*
 * @todo check paths and other prerequisites here.
 */

/*
 * Load classes
 */
require_once "qcl/server/Server.php";

/*
 * test data. If provided, use this instead of a request. This allows
 * easier debugging of backend classes than going through a real http
 * request. If not used, set to null
 */
$testData = <<<END
  {
    "service":"qcl.test.access.Models",
    "method":"testModels",
    "id":1,
    "params":["hello world!"]
  }
END;

/*
 * Start server with paths to the service classes, i.e.
 * qcl and application classes
 */

qcl_server_Server::run(null, $testData );

?>