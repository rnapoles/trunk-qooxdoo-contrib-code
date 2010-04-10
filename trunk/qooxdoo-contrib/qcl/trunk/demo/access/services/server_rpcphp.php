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

error_reporting( E_ALL ^ E_NOTICE  );
ini_set("display_errors",1);

/**
 * Use the plain RpcPhp server to serve mockup data. This does not
 * require a database
 */
define("RPCPHP_PATH", "../contrib/RpcPhp/trunk");
require_once RPCPHP_PATH . "/services/index.php";

?>