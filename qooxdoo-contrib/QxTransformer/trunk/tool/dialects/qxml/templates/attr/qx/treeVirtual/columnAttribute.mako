<%namespace name="utils" file="../../../utils/utils.mako"/>\
<%namespace name="attr" file="../../../utils/attribute.mako"/>\
\
${utils.parentRawAttrib("id")}.getTableColumnModel().getBehavior().set${attr.attrName()}(${self.columnNumber()}, ${attr.attrValue()});\
\
<%def name="columnNumber()"><%
    return "%.0f" %utils.xpath("count(./preceding-sibling::qx:treeVirtualColumn)")
%></%def>
