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
qx.Class.define("inspector.ObjectsWindow", 
{
  extend : inspector.AbstractWindow,


  construct : function()
  {
    this.base(arguments, "Objects");

    
    var model = new qx.ui.table.model.Simple();
    model.setColumns(["Hash", "Classname"]);
    this._table = new qx.ui.table.Table(model);
    this._table.setColumnVisibilityButtonVisible(false);    
    this._table.setColumnWidth(0, 50);
    this._table.setColumnWidth(1, 170);
    this._table.setStatusBarVisible(false);
    
    this._table.getSelectionModel().setSelectionMode(qx.ui.table.selection.Model.SINGLE_SELECTION);
    
    this.add(this._table, {flex: 1});
    
    this._table.getSelectionModel().addListener("changeSelection", this._onChangeSelection, this);
    
    // TODO Add a toolbar
    // reload button
    // search textfield
  },

  members :
  {
    
    load: function(window) {
      this._iFrameWindow = window || this._iFrameWindow;
      // TODO exclude the chatchClickLayer and HighlightWidget
      // get a copy of the objects db
      var objects = window.qx.core.ObjectRegistry.getRegistry();
      var data = [];
      for (var hash in objects) {
        data.push([hash, objects[hash].classname]);
      }
      this._table.getTableModel().setData(data);
    },
    
    
    select: function(object) {
      // TODO scroll into view
      var selectionModel = this._table.getSelectionModel();
      var data = this._table.getTableModel().getData();
      for (var i = 0; i < data.length; i++) {
        if (data[i][0] == object.toHashCode()) {
          selectionModel.clearSelection();
          selectionModel.setSelectionInterval(i, i);
          return;
        }
      }
    },
    
    
    _onChangeSelection: function(e) {
      if (this._table.getSelectionModel().getSelectedRanges()[0] && this._iFrameWindow) {
        var selectionIndex = this._table.getSelectionModel().getSelectedRanges()[0].minIndex;
        var data = this._table.getTableModel().getData()[selectionIndex];
        var object = this._iFrameWindow.qx.core.ObjectRegistry.fromHashCode(data[0]);
        qx.core.Init.getApplication().select(object, this);
      }
    }
    
  }
});
