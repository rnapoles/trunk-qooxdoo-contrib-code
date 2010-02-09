<%namespace name="utils" file="../../../utils/utils.mako"/>\
<%namespace name="tag" file="../../../utils/tag.mako"/>\

else if(${utils.prop("class")}.${utils.prop("method")}(${utils.parentAttrib("name")}, ${utils.attrib("value")})) {
    ${tag.children("*")}
}