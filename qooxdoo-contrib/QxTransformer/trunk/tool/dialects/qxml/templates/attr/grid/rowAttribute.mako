<%namespace name="utils" file="../../utils/utils.mako"/>\
<%namespace name="attr" file="../../utils/attribute.mako"/>\

${utils.parentRawAttrib("id")}.setRow${attr.attrName()}(${self.rowNumber()}, ${attr.attrValue()});\
<%def name="rowNumber()"><%
    return "%.0f" %utils.xpath("count(./preceding-sibling::qx:row)")
%></%def>