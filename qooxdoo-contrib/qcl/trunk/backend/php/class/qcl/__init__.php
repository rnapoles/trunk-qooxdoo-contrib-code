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
 * @todo rename to QCL_SERVICE_PATH or remove
 */
if ( ! defined( "SERVICE_PATH") )
{
  define( "SERVICE_PATH", str_replace("\\","/", dirname( dirname(__FILE__) ). "/" ) );
}

/**
 * A writable directory for temporary files
 */
if ( ! defined( "QCL_TMP_PATH" ) )
{
  define( "QCL_TMP_PATH", sys_get_temp_dir() ."/" );
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
 * the path where files are uploaded to / downloaded from
 */
if ( ! defined("QCL_UPLOAD_PATH") )
{
  define( "QCL_UPLOAD_PATH", realpath ( SERVICE_PATH . "../../var/upload") );
}
?>