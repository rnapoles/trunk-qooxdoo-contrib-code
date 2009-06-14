<?php


/*
 * dependencies
 */
require "qcl/application/Application.php";

/**
 * Main application class
 *
 */
class Application extends qcl_application_Application
{


  /**
   * Return singleton instance of the application
   * return Application
   */
  function &getInstance()
  {
    return parent::getInstance(__CLASS__);
  }


  /**
   * Starts the server
   */
  function startServer()
  {
    /*
     * create the application instance
     */
    Application::getInstance();

    /*
     * start server with paths to the service class files
     */
    parent::startServer( array( QCL_CLASS_PATH, APPLICATION_CLASS_PATH ) );
  }
}
?>