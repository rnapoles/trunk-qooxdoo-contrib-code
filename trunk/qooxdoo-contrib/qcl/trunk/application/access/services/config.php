<?php
/**
 * Configure paths to the various libraries used by the backend
 */

/**
 * Path to the RpcPhp package in qooxdoo-contrib
 * @var string
 */
define("RPCPHP_SERVER_PATH",  "../../../../../RpcPhp/trunk");

/**
 * Path to the qcl php library
 * @var string
 */
define("QCL_CLASS_PATH", "../../../backend/php/services");

/**
 * Path to the application backend classes
 * @var string
 */
define("APPLICATION_CLASS_PATH", "./class");

/**
 * Log file
 * @var unknown_type
 */
define("QCL_LOG_FILE", "./log/application.log");
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