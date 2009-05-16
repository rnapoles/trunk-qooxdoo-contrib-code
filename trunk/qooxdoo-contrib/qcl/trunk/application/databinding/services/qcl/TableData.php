<?php
/*
 * qooxdoo - the new era of web development
 *
 * http://qooxdoo.org
 *
 * Copyright:
 *   2009 Christian Boulanger
 *
 * License:
 *   LGPL: http://www.gnu.org/licenses/lgpl.html
 *   EPL: http://www.eclipse.org/org/documents/epl-v10.php
 *   See the LICENSE file in the project's top-level directory for details.
 *
 * Authors:
 *  * Christian Boulanger (cboulanger)
 */

require "qcl/AbstractStore.php";

class class_TableData
{

  function method_resetRowCount( $params )
  {
    $_SESSION['rowCount'] = rand(1000,9000);  
    return array(
      'rowCount'  => $_SESSION['rowCount'],
      'statusText' => "Table has {$_SESSION['rowCount']} rows."
    );
  }  
  
  function method_getRowCount( $params )
  {
    if ( ! isset( $_SESSION['rowCount'] ) )
    {
      $_SESSION['rowCount'] = rand(1000,9000);  
    }
    return array(
      'rowCount'  => $_SESSION['rowCount'],
      'statusText' => "Table has {$_SESSION['rowCount']} rows."
    );
  }
  
  /**
   * get node data
   * @param array $params
   */
  function method_getRowData( $params )
  {

    list( $firstRow, $lastRow, $rowIds ) = $params;
    
    $rowData = array();
    for ( $i= $firstRow; $i<= $lastRow; $i++ )
    {
      $row = array();
      foreach( $rowIds as $rowId )
      {
        switch( $rowId )
        {
          case "id": 
            $value = (int) $i;
            break;
          case "number": 
            $value = rand(1,9999);
            break;
          case "date":
            $day = rand(1,30);
            $month = rand(1,12);
            $year = rand(1970,2009);
            $value = "$day.$month.$year";
            break;
          case "boolean":
            $value = (bool) rand(0,1);
            break;
          case "text":
            $value = "Row $i";
            break;
        }
        $row[$rowId]=$value;
      }
      $rowData[] = $row;
    }
    
    $statusText = "Retrieved  rows $firstRow - $lastRow of {$_SESSION['rowCount']}.";
    
    /*
     * return data to client
     */
    return array(
      'rowData'    => $rowData,   
      'statusText' => $statusText
    );
  }

}
?>