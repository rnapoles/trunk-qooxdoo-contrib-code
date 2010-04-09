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
define( "CONTRIB_PATH", "../../../../../" ); // CB development path

/**
 * Path to the RpcPhp package in qooxdoo-contrib
 * @var string
 */
define( "RPCPHP_SERVER_PATH",  "../../../RpcPhp/trunk/" );

/**
 * Path to the qcl php library
 * @var string
 */
define( "QCL_CLASS_PATH", "../../class/" );

/**
 * Path to the application backend classes. Usually "./class".
 * @var string
 */
define( "APPLICATION_CLASS_PATH", "./class" );

/*
 * Path to file where the server and application writes log messagges
 * Required. File must exist and be writable or the directory in which it
 * is located must be writable so it can be created.
 */
define( "QCL_LOG_FILE", "log/test.log" );

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