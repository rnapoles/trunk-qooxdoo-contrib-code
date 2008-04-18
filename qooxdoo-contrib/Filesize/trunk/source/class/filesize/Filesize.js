/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2007 OpenHex SPRL, http://www.openhex.org

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Gaetan de Menten (ged)
     * Michael Rea

************************************************************************ */

/* ************************************************************************

#module(ui_table)

************************************************************************ */

/**
 * Specific data cell renderer for file sizes.
 */
qx.Class.define("filesize.Filesize",
{
  extend : qx.ui.table.cellrenderer.Conditional,

  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function(align, color, style, weight)
  {
    this.base(arguments, align, color, style, weight);

    this.initFilesizeFormat();
  },

  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /**
     * FilesizeFormat used to format data. If the numberFormat contains a
     * postfix containing B, KB, MB, GB, etc...
     */
    filesizeFormat :
    {
      check : "qx.util.format.FilesizeFormat",
      init : null,
      apply : "_applyFilesizeFormat"
    }
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    _applyFilesizeFormat : function(value, old) {
      //alert("filesize!"+ value+old);
      var method;
      
      if (value) {
        method = function(cellInfo) {
          
          if (cellInfo.value) {
            return value.format(cellInfo.value);
          } else {
            return "";
          }
        }
      } else {
        method = function(cellInfo) {
          alert(cellInfo.value);
          return cellInfo.value || "";
        }
      }
      // dynamically override _getContentHtml method
      this._getContentHtml = method;
    },

    // overridden
    _getCellClass : function(cellInfo) {
      return "qooxdoo-table-cell qooxdoo-table-cell-right";
    }
  }
});
