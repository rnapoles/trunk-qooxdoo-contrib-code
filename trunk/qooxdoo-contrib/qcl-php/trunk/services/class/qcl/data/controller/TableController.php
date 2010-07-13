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

qcl_import( "qcl_data_controller_Controller" );
qcl_import( "qcl_data_controller_ITableController" );

/**
 * Controller that supplies data for a
 * Table Widget
 *
 */
class qcl_data_controller_TableController
  extends qcl_data_controller_Controller
//implements qcl_data_controller_ITableController
{

  /*
  ---------------------------------------------------------------------------
     TABLE INTERFACE API
  ---------------------------------------------------------------------------
  */

  /**
   * Returns the layout of the columns of the table displaying
   * the records
   *
   * @param $datasource
   * @return unknown_type
   */
  function method_getTableLayout( $datasource )
  {
    $this->notImplemented(__METHOD__);
  }

  /**
   * Returns count of rows that will be retrieved when executing the current
   * query.
   *
   * @param object $queryData  data to construct the query. Needs at least the
   * a string property "datasource" with the name of datasource and a property
   * "modelType" with the type of the model.
   * @return array
   */
  function method_getRowCount( $queryData )
  {

    $datasource = $queryData->datasource;
    $modelType  = $queryData->modelType;
    qcl_assert_valid_string( $datasource, "Invalid datasource argument" );
    qcl_assert_valid_string( $modelType, "Invalid model type argument" );

    $model = $this->getModel( $datasource, $modelType );

    if ( ! $datasource or ! $modelType )
    {
      throw new JsonRpcException("Invalid arguments.");
    }

    /*
     * check query data
     */
    $query = $queryData->query;
    if ( ! is_object( $query ) or
         ! is_array(  $query->properties ) )
    {
      throw new InvalidArgumentException("Invalid query data");
    }

    /*
     * sanitize query data
     */
    $qclQuery = new qcl_data_db_Query( array(
      'properties' => $query->properties // FIXME
    ) );

    /*
     * now add the query conditions
     */
    $qclQuery = $this->addQueryConditions( $query, $qclQuery, $model );

    /*
     * check access
     */

    $this->checkAccess( QCL_ACCESS_READ, $datasource, $modelType, $query->properties );

    /*
     * return data
     */
    $rowCount = $model->countWhere( $qclQuery );
    return array(
      "rowCount"    => $rowCount,
      'statusText'  => $this->tr("%s records",$rowCount)
    );
  }

  /**
   * Returns row data executing a constructed query
   *
   * @param int     $firstRow   First row of queried data
   * @param int     $lastRow    Last row of queried data
   * @param int     $requestId  Request id
   * @param object  $queryData  Data to construct the query. Needs at least the following properties:
   *                string  datasource  Name of datasource
   *                string  modelType   Type of the model
   *                object  query       A qcl_data_db_Query- compatible object
   * @return array Array containing the keys
   *                int     requestId   The request id identifying the request (mandatory)
   *                array   rowData     The actual row data (mandatory)
   *                string  statusText  Optional text to display in a status bar
   */
  function method_getRowData( $firstRow, $lastRow, $requestId, $queryData )
  {

    $datasource = $queryData->datasource;
    $modelType  = $queryData->modelType;
    qcl_assert_valid_string( $datasource, "Invalid datasource argument" );
    qcl_assert_valid_string( $modelType, "Invalid model type argument" );
    qcl_assert_integer( $firstRow, "Invalid firstRow argument");
    qcl_assert_integer( $lastRow, "Invalid lastRow argument");

    $model = $this->getModel( $datasource, $modelType, $model );

    /*
     * query
     */
    $query = $queryData->query;
    if ( ! is_object( $query ) or
         ! is_array(  $query->properties ) )
    {
      throw new InvalidArgumentException("Invalid query data");
    }

    /*
     * sanitize query data
     */
    $qclQuery = new qcl_data_db_Query( array(
      'properties'    => $query->properties,
      'orderBy'       => $query->orderBy,
      'firstRow'      => ":firstRow",
      'numberOfRows'  => ":numberOfRows",
      'parameters'    => array(
        ':firstRow'      => $firstRow,
        ':numberOfRows'  => $lastRow-$firstRow+1
      )
    ) );

    /*
     * now add the query conditions
     */
    $qclQuery = $this->addQueryConditions( $query, $qclQuery, $model );

    /*
     * run query
     */
    $rowData = $this->method_fetchRecords( $datasource, $modelType, $qclQuery );
    return array(
      'requestId'  => $requestId,
      'rowData'    =>  $rowData
      //'statusText' => $this->tr("Loaded records %s - %s ...", $firstRow, $lastRow)
    );
  }


  /**
   * Hook for child classes to add the 'where' statement data
   * to the query object, depending on the request. The standard behavior
   * simply converts the 'link' and 'where' properties of the request object
   * into arrays if set and copies them into the database query object.
   *
   * @param stdClass $query
   *    The query data object from the json-rpc request
   * @param qcl_data_db_Query $qclQuery
   *    The query object used by the query behavior
   * @param qcl_data_model_AbstractActiveRecord $model
   *    The model on which the query should be performed
   * @return qcl_data_db_Query
   */
  protected function addQueryConditions( stdClass $query, qcl_data_db_Query $qclQuery, qcl_data_model_AbstractActiveRecord $model )
  {
    $qclQuery->link  = isset( $query->link ) ? object2array( $query->link ): null ;
    $qclQuery->where = isset( $query->where ) ? object2array( $query->where ): null ;
    return $qclQuery;
  }
}
?>