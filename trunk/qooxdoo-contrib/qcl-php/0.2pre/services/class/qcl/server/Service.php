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

require_once "qcl/core/Object.php";

/**
 * The base class for all service classes. Contains introspection methods
 * similar to those in xmlrpc (see http://xmlrpc-c.sourceforge.net/introspection.html)
 */
class qcl_server_Service
  extends qcl_core_Object
{

  /**
   * Whether the request has been aborted
   */
  var $_isAborted = false;

  /**
   * constructor , configures the service
   */
  function __construct()
  {

    /*
     * call parent constructor first
     */
    parent::__construct();

    /*
     * configure service
     */
    $this->configureService();

  }

  /**
   * Returns the server object
   * @return qcl_server_Server
   */
  function &getServer()
  {
    return qcl_server_Server::getInstance();
  }

  /**
   * Configures the service. Stub to be overridden
   **/
  function configureService(){}

  /**
   * Returns a configuration value of the pattern "foo.bar.baz"
   * This retrieves the values set in the service.ini.php file.
   */
  function getIniValue($path)
  {
    return qcl_application_Application::getIniValue($path);
  }

  /**
   * Abort the request without throwing an error
   * @return void
   */
  function abortRequest()
  {
    $this->_isAborted = true;
  }

  /**
   * Whether the request has been aborted by the service code
   * @return bool
   */
  function isAborted()
  {
    return $this->_isAborted;
  }

  //-------------------------------------------------------------
  // Introspection API
  //-------------------------------------------------------------

  /**
   * @see ServiceIntrospection::method_listServices()
   * @return array
   */
  function method_listServices()
  {
    if ( phpversion() > 5 )
    {
      $serviceIntrospection = new ServiceIntrospection( $this );
      return $serviceIntrospection->method_listServices();
    }
    else
    {
      trigger_error( "Introspection requires PHP5");
    }
  }


  /**
   * @see ServiceIntrospection::method_listMethods()
   * @return array
   */
  function method_listMethods()
  {
    if ( phpversion() > 5 )
    {
      $serviceIntrospection = new ServiceIntrospection( $this );
      return $serviceIntrospection->method_listMethods();
    }
    else
    {
      trigger_error( "Introspection requires PHP5");
    }
  }

  /**
   * @see ServiceIntrospection::method_methodSignature()
   * @param string $method
   * @return array
   */
  function method_methodSignature( $method )
  {
    if ( phpversion() > 5 )
    {
      $serviceIntrospection = new ServiceIntrospection( $this );
      return $serviceIntrospection->method_methodSignature( $method );
    }
    else
    {
      trigger_error( "Introspection requires PHP5");
    }
  }

  /**
   * @see ServiceIntrospection::method_methodHelp()
   * @param string $method
   * @return string
   */
  function method_methodHelp( $method )
  {
    if ( phpversion() > 5 )
    {
      $serviceIntrospection = new ServiceIntrospection( $this );
      return $serviceIntrospection->method_methodHelp( $method );
    }
    else
    {
      trigger_error( "Introspection requires PHP5");
    }
  }
}
?>