<%namespace name="utils" file="../../utils/utils.mako"/>\
<%namespace name="attr" file="../../utils/attribute.mako"/>\

qx.event.message.Bus.getInstance().subscribe(${utils.attrib("name")}, ${self.funcBody()}, ${self.callContext()})

<%def name="funcBody()">\
    %if utils.rawAttrib("delegate") is not None:
    this.${utils.rawAttrib("delegate")}\
    %elif utils.rawAttrib("dispatchMessage") is not None: 
    function(e) {
        var m=new qx.event.message.Message(${utils.attrib("dispatchMessage")},e.getData?e.getData():[]);
        m.setSender(\
        %if utils.rawAttrib("sender") is not None:
        ${utils.rawAttrib("sender")}\
        %else:
        e.getTarget()\
        %endif
        );
        qx.event.message.Bus.getInstance().dispatch(m);
    }\
    %elif utils.rawAttrib("dispatchEvent") is not None:
    function(e) {
        %if utils.rawAttrib("target") is not None:
        ${utils.rawAttrib("target")}\
        %else:
        this\
        %endif
        .fireDataEvent(${utils.attrib("dispatchEvent")},e.getData());
    }\
    %else:
    function(\
      %if utils.rawAttrib("arg") is None:
        e\
      %else:
        ${utils.rawAttrib("arg")}\
      %endif
      ) {
        ${utils.text()}
    }\
    %endif
</%def>

<%def name="callContext()">\
%if attr.rvalue("self") is not None:
${attr.rvalue("self", self.addTo())}\
%else:
this\
%endif
</%def>