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
    
    this._reloadButton = new qx.ui.toolbar.Button("Reload");
    this._toolbar.add(this._reloadButton);
    this._reloadButton.addListener("execute", function() {
      this.load();
    }, this);
    this._toolbar.addSpacer();
    this._filterTextField = new qx.ui.form.TextField();
    this._filterTextField.setMarginRight(5);
    this._toolbar.add(this._filterTextField);
    this._filterTextField.addListener("input", function(e) {
      this.load(null, e.getData());
    }, this);

    // table
    var model = new qx.ui.table.model.Simple();
    model.setColumns(["Hash", "Classname"]);
    this._table = new qx.ui.table.Table(model);
    this._table.setColumnVisibilityButtonVisible(false);    
    this._table.setColumnWidth(0, 50);
    this._table.setColumnWidth(1, 170);
    // this._table.setStatusBarVisible(false);
    
    this._table.getSelectionModel().setSelectionMode(qx.ui.table.selection.Model.SINGLE_SELECTION);
    
    this.add(this._table, {flex: 1});
    
    this._table.getSelectionModel().addListener("changeSelection", this._onChangeSelection, this);
  },

  members :
  {
    
    load: function(window, filter) {
      this._iFrameWindow = window || this._iFrameWindow;
      // get a copy of the objects db
      var objects = this._iFrameWindow.qx.core.ObjectRegistry.getRegistry();
      var data = [];
      for (var hash in objects) {
        data.push([hash, objects[hash].classname]);
      }
      
      // get all components of the inspector application
      var components = qx.core.Init.getApplication().getExcludes();
      
      for (var i = data.length -1; i >= 0; i--) {
        for (var j = 0; j < components.length; j++) {
          if (data[i][0] === components[j].toHashCode()) {
            data.splice(i, 1);
          }
        }
      }
      
      if (filter) {
        data = this._filterData(data, filter);
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
    },
    
    
    _filterData : function(data, filter) {
      for (var i = data.length - 1; i >= 0; i--) {
        if (data[i][0].search(filter) == -1 && 
            data[i][1].search(filter) == -1) {
          data.splice(i, 1);
        }
      }
      return data;
    },
    
    
    getSelection : function() {
      var selectionModel = this._table.getSelectionModel();
      var selectedIndex = selectionModel.getSelectedRanges().minIndex;
      if (selectedIndex) {
        var row = this._table.getTableModel().getData()[selectedIndex];
        return qx.core.ObjectRegistry.fromHashCode(row[0]);
      }
      return null;
    }
    
  }
});
