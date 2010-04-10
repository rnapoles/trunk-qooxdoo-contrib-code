<%namespace name="utils" file="../../../utils/utils.mako"/>\
<%namespace name="attr" file="../../../utils/attribute.mako"/>\
<%namespace name="tag" file="../../../utils/tag.mako"/>\
<%doc>
  === doc ===
  qcl:access is the parent tag for qcl:permission nodes.
  @see qcl:permission
  === example ===
  <qcl:access/>
  === result ===
  var qxaccess1 = qcl.access.PermissionManager.getInstance();
</%doc>
var ${utils.rawAttrib("id")} = qcl.access.PermissionManager.getInstance();
${tag.children("*")}
   