<%namespace name="utils" file="../../utils/utils.mako"/>\
<%namespace name="attr" file="../../utils/attribute.mako"/>\
<%doc>
  === doc ===
  qxt:listener adds an event listener to the object represented
  by the parent node, or to a custom object specified in the 
  'target' attribute. There are shorthand templates to transform
  the event into a message or redispatch it. If an inline code
  event handler or a delegate function will be used, the context
  is the including widget, unless you specify a context by specifying
  the object's id the 'self' attribute.
  
  @attr event {String} The name of the event
  @attr type {String} The name of the event. Deprecated, but kept for backwards compatibility.
  @attr delegate {String} Method name
  @attr arg {String} Optional name of argument of event handling function. Defaults to 'e'
  @attr addTo {qx.core.Object} The object this listener is added to (Optional, defaults to parent node id).
  @attr self {String} Execution context for the event handler function (Optional, defaults to "this").
  @attr target {qx.core.Object} The event target (Optional, defaults to the original target).
  @attr sender {qx.core.Object} The message sender (Optional, defaults to the original target).
  === example ===
  <qx:atom id="parentNodeId">
    <qxt:listener event="event1" self="parentNodeId" arg="event">
      alert("event1!");
    </qxt:listener>
    <qxt:listener event="event2" delegate="handleEvent2" />
    <qxt:listener event="event3" addTo="someWidgetId" delegate="handleEvent3" />
    <qxt:listener event="event4" dispatchMessage="event4message" />
    <qxt:listener event="event5" dispatchMessage="clickMessage" sender="someWidgetId"/>
    <qxt:listener event="event6" dispatchEvent="clickMessage" />
    <qxt:listener event="event7" target="myObject" dispatchEvent="clickMessage"  />
  <qx:atom>
  === result ===
  var qxatom1 = qx.ui.basic.Atom(null);
  var parentNodeId = qxatom1;
  parentNodeId.addListener("event1",function(event){
    alert("event1");
  },parentNodeId);
  parentNodeId.addListener("event2",this.handleEvent2,this);
  someWidgetId.addListener("event3",this.handleEvent3,this);
  parentNodeId.addListener("event4",function(e) {
    var m=new qx.event.message.Message("event4message",e.getData?e.getData():[]);
    m.setSender(e.getTarget());
    qx.event.message.Bus.getInstance().dispatch(m);
  },this);
  parentNodeId.addListener("event5",function(e) {
    var m=new qx.event.message.Message("clickMessage",e.getData?e.getData():[]);
    m.setSender(someWidgetId);
    qx.event.message.Bus.getInstance().dispatch(m);
  }, this);  
  parentNodeId.addListener("event6",function(e) {
    this.fireDataEvent("clickMessage",e.getData())
  }, this);  
  parentNodeId.addListener("event7",function(e) {
     myObject.fireDataEvent("clickMessage",e.getData());
  }, this);
</%doc>
%if utils.rawAttrib("type") is not None:
${self.addTo()}.addListener(${utils.attrib("type")}, ${self.funcBody()}, ${self.callContext()});
%elif utils.rawAttrib("event") is not None:
${self.addTo()}.addListener(${utils.attrib("event")}, ${self.funcBody()}, ${self.callContext()});
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
