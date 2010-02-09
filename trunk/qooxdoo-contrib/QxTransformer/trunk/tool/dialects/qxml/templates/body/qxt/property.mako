<%namespace name="utils" file="../../utils/utils.mako"/>\
<%namespace name="attrib" file="../../utils/attribute.mako"/>\
%if (econtext.getMode() is not None) and ("render" in econtext.getMode()):
${utils.parentRawAttrib("id")}.set${self.attribName()}(${self.value()});
%endif

<%def name="value()"><%
    if utils.rawAttrib("value") is not None:
        return attrib.attrValue()
    else:
        return utils.processValue(utils.text())
%></%def>

<%def name="attribName()"><%
    name = utils.rawAttrib("name")
    return name[:1].capitalize()+name[1:]
%></%def>