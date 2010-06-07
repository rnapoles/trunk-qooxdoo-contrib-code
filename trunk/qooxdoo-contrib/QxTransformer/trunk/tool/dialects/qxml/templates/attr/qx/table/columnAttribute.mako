<%namespace name="utils" file="../../../utils/utils.mako"/>\
<%namespace name="attr" file="../../../utils/attribute.mako"/>\
\
% if attr.attrRawName() in utils.prop("attributesTableModel"):
${utils.parentRawAttrib("id")}.getTableModel().setColumn${attr.attrName()}(${self.columnNumber()}, ${attr.attrValue()});\
% endif
% if attr.attrRawName() in utils.prop("attributesColumnModel"):
${utils.parentRawAttrib("id")}.getTableColumnModel().setColumn${attr.attrName()}(${self.columnNumber()}, ${attr.attrValue()});\
% endif
% if attr.attrRawName() in utils.prop("attributesRenderersEditors"):
${utils.parentRawAttrib("id")}.getTableColumnModel().set${attr.attrName()}(${self.columnNumber()}, new ${attr.attrValue()});\
% endif
% if attr.attrRawName() in utils.prop("attributesResizeBehavior"):
${utils.parentRawAttrib("id")}.getTableColumnModel().getBehavior().set${attr.attrName()}(${self.columnNumber()}, ${attr.attrValue()});\
% endif
\
<%def name="columnNumber()"><%
    return "%.0f" %utils.xpath("count(./preceding-sibling::qx:tableColumn)")
%></%def>
