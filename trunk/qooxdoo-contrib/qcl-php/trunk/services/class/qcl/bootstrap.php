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

/**
 * In this file, basic configuration settings and constants are
 * defined. This file MUST be included before including any other
 * qcl library file. You can override individual values by defining
 * them before incuding this file
 * @todo implement overriding, rework, rename constants
 */

/*
 * set error level
 */
error_reporting(E_ALL ^ E_NOTICE /* ^ E_WARNING */);

/*
 * set the default timeout for script execution
 */
set_time_limit(120);

/**
 * Directory containing the service classes with trailing slash
 */
if ( ! defined( "QCL_SERVICE_PATH") )
{
  define( "QCL_SERVICE_PATH", str_replace("\\","/", dirname( dirname(__FILE__) ). "/" ) );
}

/**
 * A writable directory for temporary files
 */
if ( ! defined( "QCL_TMP_PATH" ) )
{
  define( "QCL_TMP_PATH", sys_get_temp_dir() );
}

/*
 * A writable directory for log files
 */
if ( ! defined("QCL_LOG_PATH") )
{
  define ( "QCL_LOG_PATH", "./log/" );
}

/*
 * The name of the log file
 */
if ( ! defined("QCL_LOG_FILE_NAME") )
{
  define("QCL_LOG_FILE_NAME", "qcl.log");
}

/*
 * the path of the logfile of the main application
 */
if ( ! defined("QCL_LOG_FILE") )
{
  define( "QCL_LOG_FILE" ,  QCL_LOG_PATH . QCL_LOG_FILE_NAME );
}

/*
 * load core functions
 */
require_once "qcl/core/functions.php";
require_once "services/server/error/JsonRpcError.php";

/*
 * core packages
 */
qcl_import("qcl_log_Logger");
qcl_import("qcl_lang_String");
qcl_import("qcl_lang_ArrayList");

?>