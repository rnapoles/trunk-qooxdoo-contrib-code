<%namespace name="utils" file="../../../utils/utils.mako"/>\
<%namespace name="attr" file="../../../utils/attribute.mako"/>\
<%namespace name="tag" file="../../../utils/tag.mako"/>\
<%doc>
  === doc ===
  qcl:permission represents a permission object. You can add conditions
  to the permission with qcl:condition. Must be the child node of a 
  qcl:access node.
  @see qcl:access
  @see qcl:condition
  @attr name {String}
  @attr granted {Boolean} Optional grant that does not depend on a
  permission sent by server.
  === example ===
  <qcl:permission name="myPermission" granted="true" />
  === result ===
  var qclpermission1 = qclaccess1.create("myPermission").setGranted(true);
</%doc>

var ${utils.rawAttrib("id")} = ${utils.parentRawAttrib("id")}\
.create(${utils.attrib("name")});
% if utils.attrib("granted") == "true" :
${utils.rawAttrib("id")}.setGranted(true);
% endif
${tag.children("*")}