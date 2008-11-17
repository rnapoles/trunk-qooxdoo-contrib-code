/* ************************************************************************

   qooxdoo - the new era of web development
   http://qooxdoo.org

   Copyright:
     2008 CELCAT, http://www.celcat.com

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Matthew Gregory (noggin182)

************************************************************************ */

/**
 * TileView
 * Similar to the windows list view when displaying tiles
 */

qx.Class.define("tileview.TileView",
{
  extend : qx.ui.form.List,
  construct : function()
  {
    this.base(arguments);
    var flow = new flowlayout.FlowLayout();
    this.getChildrenContainer().setLayout(flow);
    this.getChildrenContainer().setHeight(800);
  },
  members :
  {
    _onAddChild : function(e)
    {
      var el = e.getData();
      el.set(
      {
        width    : 250,
        minWidth : 250,
        maxWidth : 250
      });
      this.base(arguments, e);
    }
  }
});
