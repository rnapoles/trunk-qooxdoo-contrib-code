/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2007 1&1 Internet AG, Germany, http://www.1and1.org

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Thomas Herchenroeder (thron7)

************************************************************************ */

/* ************************************************************************

************************************************************************ */

qx.Class.define("custom.MouseTracker",
{
  extend : qx.ui.core.Widget,

  construct : function()
  {
    this.base(arguments);
    var clientdoc = qx.ui.core.ClientDocument.getInstance();

    this.window = new qx.ui.window.Window("MouseTracker");
    clientdoc.add(this.window);
    var win = this.window;
    win.setSpace(100,300,200,300);
    win.setMaxWidth(450);
    win.setMaxHeight(400);

    clientdoc.addEventListener("mousemove", this._ehMouse, this);

    var layout = new qx.ui.layout.VerticalBoxLayout();
    win.add(layout);
    var l1 = new qx.ui.basic.Label("0x0");
    layout.add(l1);
    this.mousepos = l1;

  },

  members : {

    _ehMouse : function (em) 
    {
      var posText = em.getPageX() + "x" + em.getPageY();
      this.mousepos.setText(posText);
      
    }

  }
});

