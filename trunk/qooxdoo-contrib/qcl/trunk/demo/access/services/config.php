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
 * Configure paths to the various libraries used by the backend
 */

/**
 * Path to the folder where projects from qooxdoo-contrib are
 * downloaded.
 * @var string
 */
//define("CONTRIB_PATH", "../contrib/" );
define("CONTRIB_PATH", "../../../../../../" );


/**
 * Path to the RpcPhp package in qooxdoo-contrib
 * @var string
 */
define("RPCPHP_SERVER_PATH", CONTRIB_PATH . "RpcPhp/trunk/");

/**
 * Path to the qcl php library
 * @var string
 */
define("QCL_CLASS_PATH", QOOXDOO_CONTRIB_PATH . "qcl/trunk/backend/php/class/");

/**
 * Path to the application backend classes
 * @var string
 */
define("APPLICATION_CLASS_PATH", "./class");

/**
 * Log file
 * @var unknown_type
 */
define("QCL_LOG_FILE_NAME", "application.log");

/*
 * don't touch anything beyong this point
 */
ini_set('include_path', implode(
  PATH_SEPARATOR,
  array(
    RPCPHP_SERVER_PATH,
    QCL_CLASS_PATH,
    APPLICATION_CLASS_PATH,
    ini_get("include_path")
  )
) );
?>