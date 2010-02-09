<%namespace name="utils" file="../../utils/utils.mako"/>\
<%namespace name="attr" file="../../utils/attribute.mako"/>\

${utils.parentRawAttrib("id")}.setColumn${attr.attrName()}(${self.colNumber()}, ${attr.attrValue()});\
<%def name="colNumber()"><%
    return "%.0f" %utils.xpath("count(./preceding-sibling::qx:column)")
%></%def>