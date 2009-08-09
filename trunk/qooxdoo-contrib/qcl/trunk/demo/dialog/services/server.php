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

/*
 * configure constants
 */
require "config.php";

/*
 * start server with paths to the service classes
 */
require_once "qcl/server/Server.php";
qcl_server_Server::start(array(
  QCL_CLASS_PATH,
  APPLICATION_CLASS_PATH )
);
?>