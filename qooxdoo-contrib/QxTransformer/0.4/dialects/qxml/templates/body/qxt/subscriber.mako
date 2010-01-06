<%namespace name="utils" file="../../utils/utils.mako"/>\
<%namespace name="attr" file="../../utils/attribute.mako"/>\

qx.event.message.Bus.getInstance().subscribe(${utils.attrib("name")}, ${self.funcBody()} ${self.callContext()})

<%def name="funcBody()">\
    function(m) {
        ${utils.text()}
    }\
</%def>

<%def name="callContext()">\
, ${attr.rvalue("self", utils.parentRawAttrib("id"))}\
</%def>