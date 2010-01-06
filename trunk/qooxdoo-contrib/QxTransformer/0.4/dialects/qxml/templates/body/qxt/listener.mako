<%namespace name="utils" file="../../utils/utils.mako"/>\
<%namespace name="attr" file="../../utils/attribute.mako"/>\
%if utils.rawAttrib("name") is None:
${self.addTo()}.addListener(${utils.attrib("type")}, ${self.funcBody()} ${self.callContext()});
%endif

<%def name="addTo()"><%
    addRef = utils.rawAttrib("addTo")
    if addRef is not None:
        return addRef
    else:
        return utils.parentRawAttrib("id")
%></%def>

<%def name="funcBody()">\
    %if utils.rawAttrib("delegate") is not None:
    this.${utils.rawAttrib("delegate")}\
    %elif utils.rawAttrib("dispatchMessage") is not None: 
    function(e) {
        qx.event.message.Bus.getInstance().dispatch(new qx.event.message.Message(${utils.attrib("dispatchMessage")},e))
    }\
    %else:
    function(e) {
        ${utils.text()}
    }\
    %endif
</%def>

<%def name="callContext()">\
%if attr.rvalue("self") is not None:
, ${attr.rvalue("self", self.addTo())}\
%endif
</%def>
