<%namespace name="utils" file="../utils/utils.mako"/>\
<%namespace name="attr" file="../utils/attribute.mako"/>\

${utils.parentRawAttrib("id")}.add(${utils.rawAttrib("id")} ${attr.position()});