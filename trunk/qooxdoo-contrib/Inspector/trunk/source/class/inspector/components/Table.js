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

qx.Class.define("inspector.components.Table", {
  
  extend : qx.ui.table.Table,  
    
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
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
     * behind the ammount of rows in singular.
     */
    rowContentName: {
      init: "row"
    },
		
		/**
		 * Holds the valuie which shold be shown in the statusbar
		 * behind the ammount of rows in non-singular.
		 */
		rowsContentName: {
			init: "rows"
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
     * Overridden update function for the statusbar. This functuon adresses the 
     * stored names for the rows and shows the propper names in the statusbar after 
     * the ammount of rows. 
     * The selection of the rows will be ignored in this function.
     */
    _updateStatusBar : function()  {
      if (this.getStatusBarVisible()) {
        var rowCount = this.getTableModel().getRowCount();        

        var text = rowCount + ((rowCount == 1) ? " " + this.getRowContentName() : " " + this.getRowsContentName());

        this._statusBar.setText(text);
      }
    }		
  }
});
