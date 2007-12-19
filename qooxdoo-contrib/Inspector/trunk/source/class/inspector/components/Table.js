/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2007 1&1 Internet AG, Germany, http://www.1and1.org

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (martinwittemann)

************************************************************************ */
/**
 * This class represents a special table.
 * 
 * The only difference to the default qooxdoo table is, that the status bar 
 * does not care of the selection. There is always only displayed the amount of rows 
 * in the table.
 */
qx.Class.define("inspector.components.Table", {
  
  extend : qx.ui.table.Table,  
    
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  /**
   * Creates a new instance of a table.
   * @param tableModel {Object} tableModel
   * @param custom {Object} custom
   */
  construct : function(tableModel, custom) {
    // just call the superclass constructor
    this.base(arguments, tableModel, custom);
  },


  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */
  properties: {
    /**
     * Holds the value which should be shown in the statusbar
     * behind the amount of rows in singular.
     */
    rowContentName: {
      init: "row",
      check: "String"
    },
    
    
    /**
     * Holds the value which should be shown in the statusbar
     * behind the amount of rows in non-singular.
     */
    rowsContentName: {
      init: "rows",
      check: "String"
    } 
    
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members : {    
    /*
    *********************************
       OVERRIDDEN
    *********************************
    */
    /**
     * Overridden update function for the statusbar. This function addresses the 
     * stored names for the rows and shows the proper names in the statusbar after 
     * the amount of rows. The amount of selected rows will be ignored in this function.
     */
    _updateStatusBar : function()  {
      // if there is a statusbar
      if (this.getStatusBarVisible()) {
        // get the row count
        var rowCount = this.getTableModel().getRowCount();
        // create the text for the row / rows
        var text = rowCount + ((rowCount == 1) ? " " + this.getRowContentName() : " " + this.getRowsContentName());
        // set the text in the statusbar
        this._statusBar.setText(text);
      }
    }
  }
});
