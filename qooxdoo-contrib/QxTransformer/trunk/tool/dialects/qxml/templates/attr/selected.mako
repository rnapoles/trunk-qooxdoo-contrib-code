<%namespace name="utils" file="../utils/utils.mako"/>\
<%namespace name="attr" file="../utils/attribute.mako"/>\
%if attr.attrValue()=="true":
    ${utils.parentRawAttrib("id")}.setSelected(${utils.rawAttrib("id")});
%endif