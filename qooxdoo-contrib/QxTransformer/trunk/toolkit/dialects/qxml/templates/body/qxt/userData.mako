<%namespace name="utils" file="../../utils/utils.mako"/>\
<%namespace name="attrib" file="../../utils/attribute.mako"/>\
${utils.parentRawAttrib("id")}.setUserData("${utils.rawAttrib("name")}",${self.value()});
\
<%def name="value()"><%
    if utils.rawAttrib("value") is not None:
        return attrib.attrValue()
    else:
        return utils.processValue(utils.text())
%></%def>
