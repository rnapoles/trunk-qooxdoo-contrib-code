<%namespace name="utils" file="../../../utils/utils.mako"/>\
<%namespace name="attr" file="../../../utils/attribute.mako"/>\
<%namespace name="tag" file="../../../utils/tag.mako"/>\
<%inherit file="../widget.mako"/>\
<%doc>
  === doc ===
  Implements support for qx.ui.treeVirtual.TreeVirtual. The columns of the tree
  can be configured by using the <qx:treeVirtualColumn> child tag 
  === example ===
  <qx:treeVirtual 
    id="mainFolderTree"
    dataModel="qx.ui.treevirtual.SimpleTreeDataModel"
    selectionMode="{js}qx.ui.treevirtual.TreeVirtual.SelectionMode.SINGLE"
    backgroundColor="white"
    alwaysShowOpenCloseSymbol="false"
    statusBarVisible="true"
    showCellFocusIndicator="true">              
    <qx:treeVirtualColumn label="Folders"  width="10*" minWidth="200"/>
    <qx:treeVirtualColumn label="#" width="10*" minWidth="200"/>
  </qx:treeVirtual>
  === result ===
  var mainFolderTree = new qx.ui.treevirtual.TreeVirtual([ "Folders", "#" ], {});
  mainFolderTree.setShowCellFocusIndicator(true);
  mainFolderTree.setBackgroundColor("white");
  mainFolderTree.setSelectionMode(qx.ui.treevirtual.TreeVirtual.SelectionMode.SINGLE);
  mainFolderTree.setStatusBarVisible(true);
  mainFolderTree.setAlwaysShowOpenCloseSymbol(false);
  parent.add(mainFolderTree);
  mainFolderTree.getTableColumnModel().getBehavior().setMinWidth(0, 200);
  mainFolderTree.getTableColumnModel().getBehavior().setWidth(0, "10*");
  mainFolderTree.getTableColumnModel().getBehavior().setMinWidth(1, 200);
  mainFolderTree.getTableColumnModel().getBehavior().setWidth(1, "10*");  
</%doc>\

<%def name="new()">\
    var ${utils.rawAttrib("id")} = new ${utils.prop("class")}([<%
        headings = utils.xpathAllAttribs("./qx:treeVirtualColumn", "label")
        context.write(",".join(headings))
    %>],{
        <%
            customAttrs = utils.prop("customAttrs")
            valueProcessor = lambda name: "new %s" % name
            attr.rattrsByComma(customAttrs, True, valueProcessor)
        %>});
    ${utils.varScope()}
</%def>\

<%def name="properties()">\
    ${parent.properties()}
</%def>

<%def name="children()">\
    ${tag.children("*")}
</%def>