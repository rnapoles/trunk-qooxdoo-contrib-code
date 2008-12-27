/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (martinwittemann)

************************************************************************ */
qx.Class.define("inspector.AbstractWindow", 
{
  extend : qx.ui.window.Window,


  construct : function(name)
  {
    this.base(arguments, name);
    
    this._iFrameWindow = null;
    
    this.setLayout(new qx.ui.layout.VBox());
    
    this.setShowMinimize(false);
    this.setShowMaximize(false);    
    
    this.setWidth(320);
    this.setHeight(200);
    this.setContentPadding(0);
    
    // toolbar
    this._toolbar = new qx.ui.toolbar.ToolBar();
    // TODO protected to public
    this._toolbar._getLayout().setAlignY("middle");
    this.add(this._toolbar);    
  },

  members :
  {
  }
});
