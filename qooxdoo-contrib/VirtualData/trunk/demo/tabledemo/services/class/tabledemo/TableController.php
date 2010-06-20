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
 * Controller that supplies data for a Table Widget
 *
 */
class class_tabledemo_TableController
{

  /**
   * Returns the number of rows displayed in the table,
   * according to the query data
   *
   * @param $varargs
   *    A variable number of variables set in the marshaller's
   *    setQueryParams() method
   * @return int
   */
  function method_getRowCount( $varargs )
  {
    return array(
      "rowCount" => 1000
    );
  }

  /**
   * Returns row data executing a constructed query
   *
   * @param integer $firstRow
   *    First row of queried data
   * @param integer $lastRow
   *    Last row of queried data
   * @param string  $requestId
   *    Request id - not needed here
   * @param $varargs
   *    A variable number of variables set in the marshaller's
   *    setQueryParams() method
   *
   * @return array Array containing the keys
   *                (int) requestId The request id identifying the request (mandatory)
   *                (array) rowData The actual row data (mandatory)
   */
  function method_getRowData( $firstRow, $lastRow, $varargs )
  {
    $rowData = array();
    for( $i= $firstRow; $i <= $lastRow; $i++ )
    {
      $rowData[] = array(
        'id'      => $i,
        'author'  => "Author $i",
        'year'    => 1900 + $i,
        'title'   => "Title $i"
      );
    }
    return array(
      'requestId'  => $requestId,
      'rowData'    =>  $rowData
    );
  }
}
?>