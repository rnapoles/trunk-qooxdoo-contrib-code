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
 * Interface for a controller that supplies data for a
 * Table Widget
 *
 */
interface qcl_data_controller_ITableController
{

  /**
   * Returns the layout of the columns of the table displaying
   * the records
   *
   * @param $datasource
   * @return array An arrary
   * @todo: specify return array
   */
  function method_getTableLayout( $datasource );

  /**
   * Returns the number of rows displayed in the table,
   * according to the query data
   *
   * @param object $queryData
   * @return int
   */
  function method_getRowCount( $queryData );

  /**
   * Returns row data according to the query data
   *
   * @param int $firstRow
   * @param int $lastRow
   * @param string|null $requestId Request id used to identify a series of requests
   * (for example, for caching).
   * @param object|null $queryData Arbitrary object containing information
   * for the query
   *
   * @return array
   */
  function method_getRowData( $firstRow, $lastRow, $requestId=null, $queryData=null );
}
?>