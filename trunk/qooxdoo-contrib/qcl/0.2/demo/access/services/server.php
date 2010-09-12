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

/*
 * Configure constants & runtime settings
 */
require "config.php";

/*
 * Load classes
 */
require_once "qcl/server/Server.php";

/*
 * Start server with paths to the service classes, i.e.
 * qcl and application classes
 */
qcl_server_Server::run( array(
  QCL_CLASS_PATH,
  APPLICATION_CLASS_PATH
) );
?>