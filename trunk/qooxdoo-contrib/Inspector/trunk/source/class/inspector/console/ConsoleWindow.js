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
qx.Class.define("inspector.console.ConsoleWindow", 
{
  extend : inspector.AbstractWindow,


  construct : function()
  {
    this.base(arguments, "Console");
    
    // toolbar
    this._toolbar = new qx.ui.toolbar.ToolBar();
    this.add(this._toolbar);
    this._clearButton = new qx.ui.toolbar.Button("Clear");
    this._toolbar.add(this._clearButton);
    this._clearButton.addListener("execute", function() {
      this._stack.getSelected().clear();
    }, this);
    // separator
    this._toolbar.add(new qx.ui.toolbar.Separator());
    
    var consoleButton = new qx.ui.toolbar.RadioButton("Console");
    this._toolbar.add(consoleButton);
    var domButton = new qx.ui.toolbar.RadioButton("Dom");
    this._toolbar.add(domButton);
    
    // the stack
    this._stack = new qx.ui.container.Stack();
    this.add(this._stack, {flex: 1});
    
    // console view
    this._consoleView = new inspector.console.ConsoleView(this);
    this._stack.add(this._consoleView, {flex: 1});
    
    // dom view
    this._domView = new inspector.console.DomView(this);
    this._stack.add(this._domView, {flex: 1});
    
    // radio group for switching views
    var radioGround = new qx.ui.form.RadioGroup(consoleButton, domButton);
    radioGround.addListener("changeValue", function(e) {
      if (radioGround.getSelected() == consoleButton) {
        this._stack.setSelected(this._consoleView);
      } else if (radioGround.getSelected() == domButton) {
        this._stack.setSelected(this._domView);        
      } else {
        consoleButton.setChecked(true);
      }
    }, this);    
  },

  members :
  {    
    
    escapeHtml: function(value) {
      function replaceChars(ch) {
        switch(ch) {
          case "<":
            return "&lt;";

          case ">":
            return "&gt;";

          case "&":
            return "&amp;";

          case "'":
            return "&#39;";

          case '"':
            return "&quot;";
        }
        return "?";
      }
      return String(value).replace(/[<>&"']/g, replaceChars);
    }

  }
});
