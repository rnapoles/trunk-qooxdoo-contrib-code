/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2009 Derrell Lipman

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Derrell Lipman (derrell)

************************************************************************ */

/**
 * A menu item.
 */
qx.Class.define("tablecolumnmenugrid.MenuItem",
{
  extend     : qx.ui.form.ListItem,
  implement  : qx.ui.table.IColumnMenuItem,

  properties :
  {
    visible :
    {
      check : "Boolean",
      init  : true,
      apply : "_applyVisible",
      event : "changeVisible"
    }
  },

  /**
   * Create a new instance of an item for insertion into the table column
   * visibility menu.
   *
   * @param menu {tablecolumnmenugrid.Menu}
   *   The menu in which this item resides.
   *
   * @param text {String}
   *   Text for the menu item, most typically the name of the column in the
   *   table.
   *
   * @param colNum {Number}
   *   Column number of the column associated with this menu item.
   */
  construct : function(menu, text, colNum)
  {
    this.base(arguments, text, null, colNum);
    this.__menu = menu;
  },

  members :
  {
    __menu : null,

    /**
     * Keep menu in sync with programmatic changes of visibility
     *
     * @param value {Boolean}
     *   New visibility value
     *
     * @param old {Boolean}
     *   Previous visibility value
     */
    _applyVisible :  function(value, old)
    {
      if (value)
      {
        this.__menu.getHideList().addToSelection(this);
        if (this.__menu.getHideList().getSelection().length > 0)
        {
          this.__menu._setVisibility(false,
                                     this.__menu.getHideList(),
                                     this.__menu.getShowList(),
                                     true);
        }
      }
      else
      {
        this.__menu.getShowList().addToSelection(this);
        if (this.__menu.getShowList().getSelection().length > 0)
        {
          this.__menu._setVisibility(true,
                                     this.__menu.getShowList(),
                                     this.__menu.getHideList(),
                                     true);
        }
      }
    }
  }
});
