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
   * Returns the number of rows displayed in the table,
   * according to the query data
   *
   * @param object $queryData
   * @return int
   */
  function method_getRowCount( $queryData );

  /**
   * Returns row data according to the query data
   * @param object $queryData
   * @return array
   */
  function method_getRowData( $queryData );
}
?>