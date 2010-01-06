<%namespace name="utils" file="../../../utils/utils.mako"/>\
<%namespace name="attr" file="../../../utils/attribute.mako"/>\
<%doc>
  === doc ===
  qcl:updater adds an update mechanism to the permission object represented
  by the parent qcl:permission node. The permission will update (i.e. recheck
  all the attached conditions) either on a message, or an event of the current
  widget or a specified target object or 3) on an application state change.
  @see qcl:permission
  @attr message {String}
  @attr event {String}
  @attr state {String}
  === example ===
  <qcl:updater message="myMessage"/>
  <qcl:updater event="myEvent"/>
  <qcl:updater target="{js}myWidget" event="myEvent" />
  <qcl:updater applicationEvent="changeFoo"/>
  === result ===
  qx.event.message.Bus.subscribe("myMessage",function(){qclpermission1.update(this);},this);
  this.addListener("myEvent",function(){qclpermission1.update();},this);
  myWidget.addListener("myEvent",function(){qclpermission1.update();},this);
  qx.core.Init.getApplication().addListener("changeFoo",function(){qclpermission1.update(this);},this);
</%doc>
% if utils.rawAttrib("message") is not None:
qx.event.message.Bus.subscribe(${utils.attrib("message")},\
% elif utils.rawAttrib("event") is not None and utils.rawAttrib("target") is not None:
${utils.rawAttrib("target")}.addListener(${utils.attrib("event")},\
% elif utils.rawAttrib("event"):
this.addListener(${utils.attrib("event")},\
% elif utils.rawAttrib("applicationEvent") is not None:
qx.core.Init.getApplication().addListener(${utils.attrib("applicationEvent")},\
% endif
function(){${utils.parentRawAttrib("id")}.update();},this);