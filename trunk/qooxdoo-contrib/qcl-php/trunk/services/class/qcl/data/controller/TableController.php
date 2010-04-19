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
    $query = new qcl_data_db_Query( array(
      'properties' => $query->properties,
      'where'      => object2array($query->where),
      'link'       => object2array($query->link)
    ) );

    /*
     * check access
     */
    $model = $this->getModel( $datasource, $modelType );
    $this->checkAccess( QCL_ACCESS_READ, $datasource, $modelType, $query->properties );

    /*
     * return data
     */
    return array(
      "rowCount" => $model->countWhere( $query )
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

    if ( ! $datasource or ! $modelType or
         ! is_numeric( $firstRow ) or
         ! is_numeric( $lastRow ) )
    {
      throw new InvalidArgumentException("Invalid arguments.");
    }

    $query = $queryData->query;
    if ( ! is_object( $query ) or
         ! is_array(  $query->properties ) )
    {
      throw new InvalidArgumentException("Invalid query data");
    }

    /*
     * sanitize query data
     */
    $query = new qcl_data_db_Query( array(
      'properties' => $query->properties,
      'where'      => object2array($query->where),
      'link'       => object2array($query->link),
      'firstRow'   => ":firstRow",
      'lastRow'    => ":lastRow",
      'parameters' => array(
        ':firstRow' => $firstRow,
        ':lastRow'  => $lastRow
      )
    ) );

    $rowData = $this->method_fetchRecords( $datasource, $modelType, $query );
    return array(
      'requestId'  => $requestId,
      'rowData'    =>  $rowData,
      'statusText' => "$firstRow - $lastRow"
    );
  }
}
?>