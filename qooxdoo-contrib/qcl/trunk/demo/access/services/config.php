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
 * set error level.
 */
error_reporting( E_ALL ^ E_NOTICE  );

/**
 * Configure paths to the various libraries used by the backend
 */

/**
 * Path to the folder where projects from qooxdoo-contrib are
 * downloaded.
 * @var string
 */
//define("CONTRIB_PATH", "../contrib/" ); // standard path
define("CONTRIB_PATH", "../../../../../" ); // CB development path

/**
 * Path to the RpcPhp package in qooxdoo-contrib
 * @var string
 */
//define("RPCPHP_SERVER_PATH", CONTRIB_PATH . "RpcPhp/trunk/"); // standard path
define("RPCPHP_SERVER_PATH", CONTRIB_PATH . "../RpcPhp/trunk/"); // CB development path

/**
 * Path to the qcl php library
 * @var string
 */
//define("QCL_CLASS_PATH", CONTRIB_PATH . "qcl-php/trunk/class/"); // standard path
define("QCL_CLASS_PATH", CONTRIB_PATH . "../qcl-php/class/"); // CB development path

/**
 * The name of the application
 * @var string
 */
define("APPLICATION_NAME", "access");

/**
 * Path to the application backend classes. Defaults to "./class"
 * @var string
 */
if ( ! defined("APPLICATION_CLASS_PATH" ) )
{
  define("APPLICATION_CLASS_PATH", "./class");
}

/*
 * where should the application log to. If not defined,
 * the log file is "qcl.log" in the system temp folder.
 */
define( "QCL_LOG_FILE", "log/application.log" );

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