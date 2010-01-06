<%namespace name="utils" file="../../utils/utils.mako"/>\
<%namespace name="attr" file="../../utils/attribute.mako"/>\
<%namespace name="tag" file="../../utils/tag.mako"/>\
\
${tag.children("*[1]",("new"))}\
var ${utils.rawAttrib("id")} = this;
this.setLayout(${utils.xpathRawAttrib("*[1]","id")})
${utils.varScope()}\
\

${tag.properties()}

${tag.children("*[1]",("properties", "children"))}
