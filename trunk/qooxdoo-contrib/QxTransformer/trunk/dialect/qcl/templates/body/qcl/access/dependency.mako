<%namespace name="utils" file="../../../utils/utils.mako"/>\
<%namespace name="attr" file="../../../utils/attribute.mako"/>\
<%doc>
  === doc ===
  qcl:dependency creates a dependency of the permission object represented
  by the parent qcl:permission node of another permission.
  @see qcl:permission
  @attr permission {String}
  === example ===
  <qcl:dependency permission="myPermission"/>
  === result ===
  var qcldepencency1 = qcl.access.permission.Manager.getInstance().create("myPermission");
  qclpermission1.addCondition(function(){return qcldepencency1.getState()});
  qcldepencency1.addListener("changeState",function(){qclpermission1.update();},this);
</%doc>
var ${utils.rawAttrib("id")} = qcl.access.permission.Manager.getInstance().create(${utils.attrib("permission")});
${utils.parentRawAttrib("id")}.addCondition(function(){return ${utils.rawAttrib("id")}.getState();});
${utils.rawAttrib("id")}.addListener("changeState",function(){${utils.parentRawAttrib("id")}.update();},this);