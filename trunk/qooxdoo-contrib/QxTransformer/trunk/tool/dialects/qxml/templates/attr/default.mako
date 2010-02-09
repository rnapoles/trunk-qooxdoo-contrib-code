<%namespace name="utils" file="../utils/utils.mako"/>\
<%namespace name="attr" file="../utils/attribute.mako"/>\
${utils.rawAttrib("id")}.set${attr.attrName()}(${attr.attrValue()});
 