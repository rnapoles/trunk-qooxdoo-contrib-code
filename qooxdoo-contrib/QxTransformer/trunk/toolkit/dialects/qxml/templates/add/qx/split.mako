<%namespace name="utils" file="../../utils/utils.mako"/>\
<%namespace name="attrib" file="../../utils/attribute.mako"/>\
${utils.parentRawAttrib("id")}.add(${utils.rawAttrib("id")} ${self.flex()});

<%def name="flex()"><%
    if attrib.hasAttr("qxt:flex"):
        return ", %s" %attrib.value("qxt:flex")
%></%def>