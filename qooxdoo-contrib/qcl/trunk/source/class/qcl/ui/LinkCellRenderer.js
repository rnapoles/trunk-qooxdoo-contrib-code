/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2008 Christian Boulanger

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Chritian Boulanger (cboulanger)

************************************************************************ */

/* ************************************************************************

#module(ui_table)

************************************************************************ */

/**
 * A template class for cell renderers, which display links.
 */
qx.Class.define("qcl.ui.LinkCellRenderer",
{
  extend : qx.ui.table.cellrenderer.Abstract,


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function()
  {
    this.base(arguments);
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
 
    // overridden
    _getCellClass : function(cellInfo) {
      return this.base(arguments) + " qooxdoo-table-cell-link";
    },


    // overridden
    _getContentHtml : function(cellInfo)
    {
      content = cellInfo.value || "";
      return content.replace(/(http:\/\/[\w\-\.]+)([^\s;]*)/g, '<a target="_blank" href="$1$2">$1/...<\/a>');
    }
  }
});
