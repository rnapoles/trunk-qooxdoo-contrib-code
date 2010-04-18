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

  //-------------------------------------------------------------
  // class properties
  //-------------------------------------------------------------

  /**
   * Access control list. Determines what role has access to what kind
   * of information.
   * @var array
   */
  private $acl = array();

  /**
   * The types of access control lists this controller maintains
   * Defaults to "model"
   * @var array
   */
  protected $aclTypes = array( "model", "record" );


  //-------------------------------------------------------------
  // initialization
  //-------------------------------------------------------------


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
  // access control on the model-level
  //-------------------------------------------------------------


  /**
   * Adds an acl ruleset to the controller
   * @param string $type
   * @param array $ruleset Array of Maps
   * @return void
   */
  protected function addAclRuleset( $type, $ruleset )
  {
    if ( ! in_array( $type, $this->aclTypes ) or !is_array( $ruleset ) )
    {
      throw new InvalidArgumentException("Invalid acl type '$type'");
    }
    foreach( $ruleset as $acl )
    {
      $this->acl[$type][] = $acl;
    }
  }

  /**
   * Adds a model acl ruleset to the controller
   * @param $ruleset
   * @return void
   */
  protected function addModelAcl( $ruleset )
  {
    $this->addAclRuleset("model", $ruleset );
  }

  /**
   * Returns the acl rulesets for models
   * @return array Array of maps
   */
  protected function getModelAcl()
  {
    $modelAcl = $this->acl['model'];
    if ( ! is_array( $modelAcl ) or ! count( $modelAcl ) )
    {
      throw new JsonRpcException("No model ACL defined for " . $this->className() );
    }
    return $modelAcl;
  }

  /**
   * Adds a record acl ruleset to the controller
   * @param $ruleset
   * @return void
   */
  protected function addRecordAcl( $ruleset )
  {
    $this->addAclRuleset("record", $ruleset );
  }

  /**
   * Returns the acl rulesets for models
   * @return array Array of maps
   */
  protected function getRecordAcl()
  {
    $recordAcl = $this->acl['record'];
    return $recordAcl;
  }

  /**
   * Checks if any record acl rules have been set up.
   * @return bool
   */
  protected function hasRecordAcl()
  {
    return count( $this->getRecordAcl() ) > 0;
  }

  /**
   * Returns the model object, given datasource and model type. If both
   * arguments are NULL, return the datasource model object itself.
   * This method checks whether the role of the current user is allowed
   * to access the model as set up in the "acl" property of the class.
   *
   * @param string $datasource
   * @param string $modelType
   * @return qcl_data_model_AbstractActiveRecord
   * @throws qcl_access_AccessDeniedException
   */
  protected function getModel( $datasource, $modelType )
  {
    /*
     * check access to model
     */
    $activeUser  = $this->getActiveUser();
    $roles       = $activeUser->roles();
    $modelAcl    = $this->getModelAcl();
    $access = false;

    foreach( $modelAcl as $ruleset )
    {
      /*
       * check if datasource and model type matches
       */
      if ( ( ! isset( $ruleset['datasource'] )
               or in_array( $datasource, (array) $ruleset['datasource'] )
                  or $ruleset['datasource'] == "*" )
            and ( in_array( $modelType, (array) $ruleset['modelType'] )
              or $ruleset['modelType']  == "*" ) )
      {

        /*
         * check if 'roles' property exists and if yes, if it matches
         */
        if ( ! isset( $ruleset['roles'] ) or $ruleset['roles'] == "*"
              or count( array_intersect( $roles, (array) $ruleset['roles'] ) ) )
        {
          $access = true;
          break;
        }
      }
    }

    if ( ! $access )
    {
      $this->warn( sprintf(
        "User '%s' (role %s) has no access to datasource '%s'/ model type '%s'.",
        $activeUser->username(), implode(",", $roles), $datasource, $modelType
      ) );
      throw new qcl_access_AccessDeniedException("Access denied");
    }

    /*
     * get datasource model by name
     */
    $model = $this->getDatasourceModel( $datasource );

    /*
     * check schema if given
     * FIXME: does this make sense here or must be a selection criteria?
     */
    if ( isset( $ruleset['schema'] ) )
    {
      if ( ! in_array( $model->getSchema(), (array) $ruleset['schema']) )
      {
        throw new qcl_access_AccessDeniedException("Wrong schema!");
      }
    }

    /*
     * get model type
     */
    if( $modelType )
    {
      $model = $model->getModelOfType( $modelType );
    }
    return $model;
  }


  /**
   * Checks acces to the given model properties
   * @param string $accessType
   * @param string|null $datasource
   * @param string|null $modelType
   * @param array $properties
   * @return void
   * @throws qcl_access_AccessDeniedException
   */
  protected function checkAccess( $accessType, $datasource, $modelType, $properties )
  {
    if ( ! is_array( $properties ) and $properties != "*" )
    {
      throw new InvalidArgumentException("Invalid 'properties' argument. Must be array or '*'." );
    }

    $activeUser  = $this->getActiveUser();
    $roles       = $activeUser->roles();
    $modelAcl    = $this->getModelAcl();
    $access  = false;
    foreach( $modelAcl as $ruleset )
    {
      /*
       * check if datasource and model type matches
       */
      if ( ( ! isset( $ruleset['datasource'] )
              or in_array( $datasource, (array) $ruleset['datasource'] )
                or $ruleset['datasource'] == "*" )
            and ( in_array( $modelType, (array) $ruleset['modelType'] )
              or $ruleset['modelType']  == "*" ) )
      {

        /*
         * examine the rules
         * @todo check if rules OR roles are defined
         */
        $rules =  $ruleset['rules'];
        foreach ( $rules as $rule )
        {

          /*
           * roles, types and properties can take a "*"
           * to match all,
           */
          $accessRoles = $rule['roles'];
          $accessTypes = $rule['access'];
          $accesProps  = $rule['properties'];

          /*
           * does rule match the the access type ?
           */
          if ( $accessTypes == "*" or in_array( $accessType, (array) $accessTypes ) )
          {

            /*
             * does rule also match the given roles?
             */
            if ( $accessRoles == "*" or count( array_intersect( $accessRoles, (array) $roles  ) ) )
            {

              /*
               * finally, does rule match given properties?
               */
              if ( $accesProps == "*" or count( array_intersect( $accesProps, (array) $properties ) ) )
              {
                $access = true;
                break;
              }
            }
          }
        }
      }
    }

    if ( ! $access )
    {
      $this->warn( sprintf(
        "User '%s' (role %s) has no '%s' access to the records or to one or more of the properties [%s] in datatsource '%s'/ model type '%s'.",
        $activeUser->username(), implode(",", $roles ),
        $accessType, implode(",", (array) $properties ),
        $datasource, $modelType
      ) );
      throw new qcl_access_AccessDeniedException("Access denied.");
    }
  }

  /**
   * Checks if there is a rule affecting access to the given record
   * @param string $datasource
   * @param string $modelType
   * @param array $record
   * @return bool
   */
  protected function hasRecordAccess( $datasource, $modelType, $record )
  {
    /*
     * static variable to cache access rules
     */
    static $cache = array();
    $rule = null;

    /*
     * did we cache the rule already?
     */
    if ( isset( $cache[$datasource]  ) )
    {
      if ( isset( $cache[$datasource][$modelType] ) )
      {
        $rule = $cache[$datasource][$modelType];
      }
    }
    else
    {
      $recordAcl = $this->getRecordAcl();
      foreach( $recordAcl as $ruleset )
      {
        /*
         * look for the first ruleset where datasource and model type
         * matches and save rules in the cache to speed up rule lookups
         */
        if ( ( ! isset( $ruleset['datasource'] )
                or in_array( $datasource, (array) $ruleset['datasource'] )
                  or $ruleset['datasource'] == "*" )
              and ( in_array( $modelType, (array) $ruleset['modelType'] )
                or $ruleset['modelType']  == "*" ) )
        {
          if ( isset( $ruleset['rules'] ) and is_array( $ruleset['rules'] ) )
          {
            $cache[$datasource][$modelType] = $ruleset['rules'];
            break;
          }
          else
          {
            throw new JsonRpcException("No rules defined in record acl for $datasource/$modelType.");
          }
        }
      }
    }

    /*
     * test all the rules against the record. return false when the
     * first test fails.
     */
    $access = true;
    $rules = $cache[$datasource][$modelType];
    foreach( $rules as $rule )
    {
      /*
       * look for callback
       * @todo implement other types of rules
       */
      if( isset( $rule['callback' ] ) )
      {
        $callback = $rule['callback' ];
        if ( ! method_exists( $this, $callback ) )
        {
          throw new JsonRpcException("Invalid callback '$callback' defined in record acl for $datasource/$modelType.");
        }

        if ( ! $this->$callback($record) )
        {
          return false;
        }
      }
      else
      {
        throw new JsonRpcException("No callback defined in record acl for $datasource/$modelType.");
      }
    }
    /*
     * passed all tests
     */
    return true;
  }


  /**
   * Checks if there is a rule affecting access to the given record and
   * throws an exception if access to this record is denied
   * @param string $datasource
   * @param string $modelType
   * @param array $record
   * @return void
   */
  protected function checkRecordAccess( $datasource, $modelType, $record )
  {
    if ( ! $this->hasRecordAcl() ) return;
    if ( ! $this->hasRecordAccess( $datasource, $modelType, $record ) )
    {
      throw new qcl_access_AccessDeniedException("Access to model record denied.");
    }
  }

  /**
   * Creates a record in the given model.
   *
   * @param string $datasource
   * @param string $modelType
   * @param object $data
   * @return int Id of the new model record
   */
  public function method_createRecord( $datasource, $modelType, $data )
  {
    /*
     * check access to model and get model
     */
    $model = $this->getModel( $datasource, $modelType );

    /*
     * specifically check authorization to create a record
     */
    $properties = array_keys( get_object_vars( $data ) );
    $this->checkAccess( QCL_ACCESS_CREATE, $datasource, $modelType, $properties );

    /*
     * create it
     */
    return $model->create( $data );
  }

  /**
   * Updates a record in the given model.
   *
   * @param string $datasource
   * @param string $modelType
   * @param int|string $id Numeric id or string named id, depending on model
   * @param object $data
   * @return string "OK" if successful
   */
  public function method_updateRecord( $datasource, $modelType, $id, $data )
  {
    /*
     * check access to model and get model
     */
    $model = $this->getModel( $datasource, $modelType );

    /*
     * specifically check authorization to create a record
     */
    $properties = array_keys( get_object_vars( $data ) );
    $this->checkAccess( QCL_ACCESS_WRITE, $datasource, $modelType, $properties );

    /*
     * load and update it. this will throw an error if it doesn't exist
     * or if access to this model is not allowed
     */
    $model->load( $id );
    $this->checkRecordAccess( $datasource, $modelType, $model->data() );
    $model->set( $data );
    $model->save();
    return "OK";
  }

  /**
   * Deletes a record in the given model.
   *
   * @param string $datasource
   * @param string $modelType
   * @param int|string $id Numeric id or string named id, depending on model
   * @return string "OK" if successful
   */
  public function method_deleteRecord( $datasource, $modelType, $id )
  {
    /*
     * check access to model and get model
     */
    $model = $this->getModel( $datasource, $modelType );

    /*
     * specifically check authorization to create a record
     */
    $this->checkAccess( QCL_ACCESS_DELETE, $datasource, $modelType, "*" );

    /*
     * load and update it. this will throw an error if it doesn't exist
     * or if access is not allowed
     */
    $model->load( $id );
    $this->checkRecordAccess( $datasource, $modelType, $model->data() );
    $model->delete();
    return "OK";
  }

  /**
   * Returns the result of a "fetchAll" operation on the given model of the
   * given datasource.
   *
   * @param string $datasource
   * @param string $modelType
   * @param object $queryData Must be an qcl_data_db_Query - like object
   * @return array
   */
  public function method_fetchRecords( $datasource, $modelType, $queryData )
  {
    /*
     * check arguments
     */
    if ( ! $queryData instanceof qcl_data_db_Query )
    {
      if ( is_object( $queryData ) )
      {
        $query = new qcl_data_db_Query( object2array( $queryData )  );
      }
      else
      {
        throw new InvalidArgumentException("Invalid query data.");
      }
    }

    /*
     * check access to model and get it
     */
    $model = $this->getModel( $datasource, $modelType );

    /*
     * check read access to properties
     */
    $properties = $query->getProperties();
    $this->checkAccess( QCL_ACCESS_READ, $datasource, $modelType, $properties );

    /*
     * check read access to properties in "where" clause
     */
    $where = $query->getWhere();
    if ( $where )
    {
      if ( ! is_array(  $where ) or ! count( $where )  )
      {
        throw new InvalidArgumentException( "Invalid 'where' data.");
      }
      $whereProps = array_keys( $where );
      $this->checkAccess( QCL_ACCESS_READ, $datasource, $modelType, $whereProps );
    }

    /*
     * do the query
     */
    $data = $model->getQueryBehavior()->fetchAll( $query );

    /*
     * if no record acl rules have been set up, return unfiltered data
     */
    if ( ! $this->hasRecordAcl() )
    {
      return $data;
    }

    /*
     * otherwise filter rows to which the access in not allowed
     */
    $filteredData = array();
    for ( $i=0; $i<count($data); $i++)
    {
      if ( $this->hasRecordAccess( $datasource, $modelType, $data[$i] ) )
      {
        $filteredData[] = $data[$i];
      }
      else
      {
        //$this->debug( "Ignoring " . $data[$i]['data']);
      }
    }
    return $filteredData;
  }

  /**
   * Returns the values of a property that matches a where condition
   * @param string $datasource
   * @param string $modelType
   * @param string $property
   * @param object $where
   * @return array
   */
  public function method_fetchValues( $datasource, $modelType, $property, $where )
  {
    $model = $this->getModel( $datasource, $modelType );
    $model->findWhere( object2array( $where ) );
    $result = array();
    if ( $this->hasRecordAcl() )
    {
      while( $model->loadNext() )
      {
        if ( $this->hasRecordAccess( $datasource, $modelType, $model->data() ) )
        {
          $result[] = $model->get( $property );
        }
      }
      return $result;
    }
    else
    {
      return $model->getQueryBehavior()->fetchValues( $property, object2array( $where ) );
    }
  }

  /**
   * Returns the value of a property of a record identified by the id.
   * Throws an error if no access to the property.
   * @param string $datasource
   * @param string $modelType
   * @param string $id
   * @return mixed
   */
  public function method_getValue( $datasource, $modelType, $id, $property )
  {
    /*
     * get model and check whether the id is numeric or a string
     */
    $model = $this->getModel( $datasource, $modelType );

    /*
     * Check property
     */
    if ( ! $model->hasProperty( $property ) )
    {
      throw new InvalidArgumentException("Model '$model' has no property '$property' !");
    }

    /*
     * Check property-level access
     */
    $this->checkAccess( QCL_ACCESS_READ, $datasource, $modelType, array( $property ) );

    /*
     * Run query
     */
    $model->load( $id );
    $this->checkRecordAccess( $datasource, $modelType, $model->data() );
    return $model->get($property);
  }

  /**
   * Sets the value of a property of a record identified by the id. Throws
   * an error if no access to that property.
   * @param string $datasource
   * @param string $modelType
   * @param string $id
   * @return mixed
   */
  public function method_setValue( $datasource, $modelType, $id, $property, $value )
  {
    /*
     * get model and check whether the id is numeric or a string
     */
    $model = $this->getModel( $datasource, $modelType );

    /*
     * Check property
     */
    if ( ! $model->hasProperty( $property ) )
    {
      throw new InvalidArgumentException("Model '$model' has no property '$property' !");
    }

    /*
     * check property-level access
     */
    $this->checkAccess( QCL_ACCESS_WRITE, $datasource, $modelType, array( $property ) );

    /*
     * Run query
     */
    $model->load( $id );
    $this->checkRecordAccess( $datasource, $modelType, $model->data() );
    $model->set($property, $value);
    $model->save();
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
    qcl_import( "qcl_data_datasource_Manager" );
    return qcl_data_datasource_Manager::getInstance();
  }

  /**
   * Returns the  datasource model with the datasource connection
   * data preloaded.
   *
   * @param string $datasource
   * @return qcl_data_model_db_AbstractActiveRecord
   */
  public function getDatasourceModel( $datasource=null )
  {
    if ( $datasource )
    {
      return $this->getDatasourceManager()->getDatasourceModelByName( $datasource );
    }
    else
    {
      return $this->getDatasourceManager()->getDatasourceModel();
    }
  }


  //-------------------------------------------------------------
  // response data, deprecated methods
  // FIXME remove remaining calls to setResultXXX
  //-------------------------------------------------------------

  /**
   * The response data object
   * @deprecated
   * @var qcl_data_Result
   *
   */
  private $_resultObject;

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