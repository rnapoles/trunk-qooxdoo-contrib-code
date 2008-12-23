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
qx.Class.define("inspector.console.DomView", 
{
  extend : qx.ui.core.Widget,


  construct : function(console)
  {
    this.base(arguments);
    
    // store the reference to the window
    this._console = console;
  },

  members :
  {
    
    clear: function() {
      // TODO
    }
  }
});
