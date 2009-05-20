/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2007 Christian Boulanger

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Christian Boulanger (cboulanger)

************************************************************************ */

/* ************************************************************************

#module(qcl.databinding)

************************************************************************ */

/**
 * Adds a few extensions methods to qx.ui.table.Table
 *
 */
qx.Mixin.define("qcl.ui.MTableExtensions",
{
  /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

  properties : {},




  /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

  members :
  {
    /**
     * returns the selected indexes as an array
     *
     * @type member
     * @return {Array} TODOC
     */
    getSelection : function()
    {
      var selection = [];

      this.getSelectionModel().iterateSelection(function(index) {
        selection.push(index);
      }, this);

      return selection;
    },


    /**
     * returns the values of the given column in the selected indexes as an array
     *
     * @type member
     * @param column {String | Number} Column id or column index
     * @param condition {Map} if given, the column will only be added if the column identified by the key matches the value
     * @return {Array} TODOC
     */
    getSelectionColumnValues : function(column, condition)
    {
      var values = [];
      var model = this.getTableModel();
      var columnIndex = (typeof column == "number") ? column : model.getColumnIndexById(column);

      this.getSelectionModel().iterateSelection(function(rowIndex)
      {
        var rowData = model.getRowData(rowIndex);

        if (rowData && typeof (rowData) == "object")
        {
          var cond = true;

          if (condition && typeof condition == "object")
          {
            for (var key in condition)
            {
              if (rowData[key] != condition[key]) {
                cond = false;
              }
            }
          }

          if (cond)
          {
            var value = model.getValue(columnIndex, rowIndex);
            values.push(value);
          }
        }
      },

      // console.log("Value of column '"+column+"', row#"+rowIndex+": "+value);
      this);

      return values;
    },


    /**
     * TODOC
     *
     * @type member
     * @return {var} TODOC
     */
    getSelectedIds : function() {
      return this.getSelectionColumnValues("id");
    },


    /**
     * TODOC
     *
     * @type member
     * @return {var | null} TODOC
     */
    getSelectedId : function()
    {
      var ids = this.getSelectedIds();

      if (ids instanceof Array && ids.length) {
        return ids[0];
      } else {
        return null;
      }
    },


    /**
         * which row to select
         */
    __rowToSelect : null,


    /**
     * selects a row by its id.
     *
     * @type member
     * @param id {Integer} TODOC
     * @return {Boolean} Whether selection was possible
     */
    selectRowById : function(id)
    {
      /*
       * check and save id
       */
      id = parseInt(id);

      if (!id)
      {
        /*
         * abort silently
         */
        console.warn("Invalid id!");
        return ;
      }

      this.__rowToSelect = id;

      /*
       * look for row
       */
      var map = this.getColumnValueMap("id");
      var row = map[id];

      if (typeof (row) == "number")
      {
        console.log("Selecting row #"+row+", id#"+id);
        this.getSelectionModel().setSelectionInterval(row, row);
        this.scrollCellVisible(0, row);
        return true;
      }
      else
      {
        console.warn("Cannot select row. No record #"+id+" has been loaded.");
        return false;
      }
    },


    /**
     * returns the values of a column as a map linked with the row number.
     * This requires that the values of the columns are unique - such as the id column.
     *
     * @type member
     * @param column {String} Column id
     * @param rowsToValues {Boolean} If true, map rows to values, if undefined or false, map values to rows
     * @return {Map} TODOC
     */
    getColumnValueMap : function(column, rowsToValues)
    {
      var model = this.getTableModel();
      var rowCount = model.getRowCount();
      var map = {};

      for (var i=0; i<rowCount; i++)
      {
        var row = model.getRowData(i);

        if (row && typeof (row) == "object")
        {
          var value = row[column];

          if (rowsToValues) {
            map[i] = value;
          } else {
            map[value] = i;
          }
        }
      }

      return map;
    }
  }
});
