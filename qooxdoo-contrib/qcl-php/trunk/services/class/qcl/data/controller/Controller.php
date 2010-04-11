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
qcl_import("qcl_server_Service");
qcl_import("qcl_server_Response");
qcl_import("qcl_data_Result");

/**
 * Common base class for controllers. Mainly contains convenience
 * methods that proxy methods originating in other (manager) objects.
 */
class qcl_data_controller_Controller
  extends qcl_server_Service
{

  /**
   * The response data object
   * @var qcl_data_Result
   */
  private $_resultObject;

  //-------------------------------------------------------------
  // access control
  //-------------------------------------------------------------

  /**
   * Shorthand getter for access behavior
   * @return qcl_access_Controller
   */
  public function getAccessController()
  {
    return $this->getApplication()->getAccessController();
  }

  /**
   * Shorthand getter for active user object
   * @return qcl_access_model_User
   */
  public function getActiveUser()
  {
    return $this->getAccessController()->getActiveUser();
  }

  /**
   * Shorthand getter for  the current session id.
   * @return string
   */
  public function getSessionId()
  {
    return $this->getAccessController()->getSessionId();
  }


  /**
   * Checks if active user has the given permission.
   * Alias of $this->getAccessController()->hasPermission()
   * @param $permission
   * @return bool
   */
  public function hasPermission( $permission )
  {
    return $this->getAccessController()->hasPermission( $permission );
  }

  /**
   * Checks if permission has an controller-specific
   * name. This allows to reuse a global permission for a
   * specific service class without giving the user the same
   * right in a different service class. This is a stub to be overridden
   * if this feature is to be used.
   *
   * @param string $permission
   * @return string|false Name of permission if alias exists, otherwise false
   */
  public function hasPermissionAlias( $permission )
  {
    return false;
  }

  /**
   * Checks if active user has the given permission and aborts if
   * permission is not granted.
   * Alias of $this->getAccessController()->requirePermission()
   * @param string $permission
   * @return bool
   */
  public function requirePermission( $permission )
  {
    return $this->getAccessController()->requirePermission( $permission );
  }

  /**
   * Shorthand method to check if active user has a role
   * @param string $role
   * @return bool
   */
  public function hasRole( $role )
  {
    return $this->getAccessController()->hasRole( $role );
  }

  //-------------------------------------------------------------
  // datasources
  //-------------------------------------------------------------

  /**
   * Getter for datasource manager object
   * @return qcl_data_datasource_Manager
   */
  public function getDatasourceManager()
  {
    require_once "qcl/data/datasource/Manager.php";
    return qcl_data_datasource_Manager::getInstance();
  }

  /**
   * Returns the  datasource model with the datasource connection
   * data preloaded.
   * @param string $datasource
   * @return qcl_data_datasource_DbModel
   */
  public function getDatasourceModel( $datasource )
  {
    return $this->getDatasourceManager()->getModel( $datasource );
  }


  //-------------------------------------------------------------
  // response data, deprecated methods
  //-------------------------------------------------------------

  /**
   * Shorthand method to create the response data object from the
   * given class.
   * @param string $clazz
   * @return void
   * @deprecated Work with result object instead
   */
  public function setResultClass( $clazz )
  {
    $path = str_replace("_", "/", $clazz ) . ".php";
    require_once $path;
    $this->setResultObject( new $clazz );
  }

  /**
   * Shorthand method to set the data object of the response object
   * @param qcl_data_Result $resultObject
   * @return void
   * @deprecated Work with result object instead
   */
  public function setResultObject( $resultObject )
  {
    $this->_resultObject = $resultObject;
  }

  /**
   * Shorthand method to set a property of the result
   * data object. Alias of setResult()
   * @param string $key
   * @param mixed $value
   * @deprecated Work with result object instead
   */
  public function set ( $key, $value=null )
  {
    $this->_resultObject->set( $key, $value );
  }

  /**
   * Shorthand method to set a property of the result
   * data object
   * @param string $key
   * @param mixed $value
   * @deprecated Work with result object instead
   */
  public function setResult ( $key, $value )
  {
    $this->_resultObject->set( $key, $value );
  }

  /**
   * Returns all puplic properties of the result data object
   * @return qcl_data_Result
   * @deprecated Work with result object instead
   */
  public function result()
  {
    return $this->_resultObject;
  }

}
?>