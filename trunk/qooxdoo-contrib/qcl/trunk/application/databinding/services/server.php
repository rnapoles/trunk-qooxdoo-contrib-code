<?php
/**
 * Sample application to show qcl access control system, using
 * RpcPhp trunk version and qcl library
 */

/*
 * configure constants
 */
require "config.php";

/*
 * start main application
 */
require_once "databinding/Application.php";
databinding_Application::start();

/*
 * start server with paths to the service classes
 */
require_once "qcl/server/Server.php";
qcl_server_Server::start(array(
  QCL_CLASS_PATH,
  APPLICATION_CLASS_PATH )
);
?>