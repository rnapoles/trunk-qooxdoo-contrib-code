<%namespace name="utils" file="../../../utils/utils.mako"/>\
<%namespace name="attr" file="../../../utils/attribute.mako"/>\
\
% if attr.attrRawName() in utils.prop("selectionModelAttributes"):
${utils.rawAttrib("id")}.getSelectionModel().set${attr.attrName()}(${attr.attrValue()});\
% else:
${utils.rawAttrib("id")}.set${attr.attrName()}(${attr.attrValue()});\
% endif
