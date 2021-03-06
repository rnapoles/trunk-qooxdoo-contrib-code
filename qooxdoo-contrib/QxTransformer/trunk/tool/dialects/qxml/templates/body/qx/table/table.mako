<%namespace name="utils" file="../../../utils/utils.mako"/>\
<%namespace name="attr" file="../../../utils/attribute.mako"/>\
<%namespace name="tag" file="../../../utils/tag.mako"/>\
<%inherit file="../widget.mako"/>\
<%doc>
  === doc ===
  Implements support for qx.ui.table.Table. The columns of the table
  can be configured by using the <qx:tableColumn> child tag.
  === example ===
  <qx:table 
    id="mainTable"
    tableColumnModel="qx.ui.table.columnmodel.Resize"
    selectionMode="{js}qx.ui.table.selection.Model.MULTIPLE_INTERVAL_SELECTION">
    <qx:tableModel class="qx.ui.table.model.Simple" />     
    <qx:tableColumn id="id" label="ID" editable="false" width="50" />
    <qx:tableColumn id="test" label="Some text" editable="true" width="150" />
    <qx:tableColumn id="boolean" label=" " editable="true" width="30" 
      dataCellRenderer="{js}qx.ui.table.cellrenderer.Boolean"
      cellEditorFactory="{js}qx.ui.table.celleditor.CheckBox" />
    <qx:tableColumn id="number" label="A number"  editable="true" width="80" />
    <qx:tableColumn id="date" label="A date" editable="true" />
  </qx:table>
  === result ===
  var mainTable = new qx.ui.table.Table(null, {
		tableColumnModel : function(obj) {
			return new qx.ui.table.columnmodel.Resize(obj);
		}
	});
  mainTable.getSelectionModel().setSelectionMode(qx.ui.table.selection.Model.MULTIPLE_INTERVAL_SELECTION);
  var qxTableModel1 = new qx.ui.table.model.Simple();
	qxTableModel1.setColumns(["ID", "Some text", " ","A Number","A date"], ["id", "test", "booelan","number","date"]);
  containingFoldersTable.setTableModel(qxTableModel1);  
  parent.add(mainTable);
  mainTable.getTableColumnModel().setColumnWidth(0, 50);
  mainTable.getTableModel().setColumnEditable(0, false);
  mainTable.getTableColumnModel().setColumnWidth(1, 150);
  mainTable.getTableModel().setColumnEditable(1, true);
  mainTable.getTableColumnModel().setColumnDataCellRenderer(2, new qx.ui.table.cellrenderer.Boolean);
  mainTable.getTableColumnModel().setColumnWidth(2, 30);
  mainTable.getTableModel().setColumnEditable(2, true);
  mainTable.getTableColumnModel().setColumnCellEditorFactory(2, new qx.ui.table.celleditor.CheckBox);
  mainTable.getTableColumnModel().setColumnWidth(3, 80);
  mainTable.getTableModel().setColumnEditable(3, true);
  mainTable.getTableModel().setColumnEditable(4, true);
</%doc>\

<%def name="new()">\
    
    var ${utils.rawAttrib("id")} = new ${utils.prop("class")}( null , {
        <%
            customAttrs = utils.prop("customAttrs")
            valueProcessor = lambda name: "function(obj) { return new %s(obj);}" % name
            attr.rattrsByComma(customAttrs, True, valueProcessor)
        %>
    });
    ${utils.varScope()}
</%def>

<%def name="properties()">\
    ${parent.properties()}
</%def>

<%def name="children()">\
    ${tag.children("*")}
</%def>

% if utils.rawAttrib("initializeWidthsOnEveryAppear") is not None: 
${utils.rawAttrib("id")}.getTableColumnModel().getBehavior().setInitializeWidthsOnEveryAppear(${attr.rawAttrib("initializeWidthsOnEveryAppear")});
% endif