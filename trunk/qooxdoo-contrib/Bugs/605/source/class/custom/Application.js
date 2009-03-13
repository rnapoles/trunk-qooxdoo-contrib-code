/*
#require(qx.log.appender.Native)
#require(qx.log.appender.Console)
*/

qx.Class.define("custom.Application",
{
  extend : qx.application.Standalone,

  members :
  {
    main : function()
    {
      this.base(arguments);
      
      var container = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
      this.getRoot().add(container, {edge: 5});
      
      container.add(this.createTree(), {width: "50%"});
      container.add(this.createTable(), {width: "50%"});
      
      var log = function(e) {
        //qx.log.Logger.debug(e.getType() + e.getTarget())
        this.debug(e.getType() + " " +  qx.core.ObjectRegistry.toHashCode(e.getTarget()));
      }
      
      qx.bom.Element.addListener(document.body, "mousedown", log, this, true);
      qx.bom.Element.addListener(document.body, "mouseup", log, this, true);
      qx.bom.Element.addListener(document.body, "click", log, this, true);
      qx.bom.Element.addListener(document.body, "dblclick", log, this, true);
    },
    
    
    createTree : function()
    {
      var custom = {
        selectionManager: function(obj)
        {
          return new qx.ui.table.selection.Manager(obj);
        }
      }
      
      
      var tree = new qx.ui.treevirtual.TreeVirtual(["Name"], custom);
      tree.setOpenCloseClickSelectsRow(true);
      tree.setShowCellFocusIndicator(false);
      tree.setStatusBarVisible(false);

    tree.getSelectionModel().setSelectionMode(qx.ui.table.selection.Model.SINGLE_SELECTION);

      var resizeBehavior = tree.getTableColumnModel().getBehavior();
      resizeBehavior.set(0, { width:"1*" });
/*
      tree.addListener("dblclick", function(e)
                       {
                         alert("dblclick - " +
                               this.getSelectedNodes()[0].label);
                       },
                       tree);
*/
      var dataModel = tree.getDataModel();
      var root = dataModel.addBranch(null, "Root", true);

      var f1 = dataModel.addBranch(root, "Folder 1", false);
      for (var i = 1; i < 10; i++)
      {
          dataModel.addLeaf(f1, "File 1" + i);
      }
      
      var f2 = dataModel.addBranch(root, "Folder 2", false);
      for (var i = 1; i < 5; i++)
      {
          dataModel.addLeaf(f2, "File 2" + i);
      }
      
      dataModel.setData();

      tree.focus();
      return tree;
    },
    
    
    createTable : function()
    {
      // Create the initial data
      var rowData = this.createRandomRows(50);

      // table model
      var tableModel = this._tableModel = new qx.ui.table.model.Simple();
      tableModel.setColumns([ "ID", "A number", "A date", "Boolean" ]);
      tableModel.setData(rowData);
      tableModel.setColumnEditable(1, true);
      tableModel.setColumnEditable(2, true);
      tableModel.setColumnSortable(3, false);

      // table
      var table = new qx.ui.table.Table(tableModel);

      table.set({
        width: 600,
        height: 400,
        decorator : null,
        focusCellOnMouseMove : true,
        showCellFocusIndicator : false
      });
     table.getSelectionModel().setSelectionMode(qx.ui.table.selection.Model.SINGLE_SELECTION);

      var tcm = table.getTableColumnModel();

      // Display a checkbox in column 3
      tcm.setDataCellRenderer(3, new qx.ui.table.cellrenderer.Boolean());

      // use a different header renderer
      tcm.setHeaderCellRenderer(2, new qx.ui.table.headerrenderer.Icon("icon/16/apps/office-calendar.png", "A date"));

      return table;
    },
    
    
    nextId : 0,
    createRandomRows : function(rowCount)
    {
      var rowData = [];
      var now = new Date().getTime();
      var dateRange = 400 * 24 * 60 * 60 * 1000; // 400 days
      for (var row = 0; row < rowCount; row++) {
        var date = new Date(now + Math.random() * dateRange - dateRange / 2);
        rowData.push([ this.nextId++, Math.random() * 10000, date, (Math.random() > 0.5) ]);
      }
      return rowData;
    }
      
  }
});