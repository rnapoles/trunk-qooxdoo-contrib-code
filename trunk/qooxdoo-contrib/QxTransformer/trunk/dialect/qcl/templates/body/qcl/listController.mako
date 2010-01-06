<%namespace name="utils" file="../../utils/utils.mako"/>\
<%namespace name="attr" file="../../utils/attribute.mako"/>\
<%namespace name="tag" file="../../utils/tag.mako"/>\
<%doc>
  === doc ===

  === example ===
  <qcl:controller 
    store="this.getApplication().getDatasourceStore()"

  === result ===
  var qclController = new qx.data.controller.List(null,{parent widget id},"label" );
  this.getApplication().getDatasourceStore().bind( "model", qclController, "model", {} );
</%doc>
var ${utils.rawAttrib("id")} = new qx.data.controller.List(null,${utils.parentRawAttrib("id")},"label");
% if utils.rawAttrib("labelPath") is not None:
  ${utils.rawAttrib("id")}.setLabelPath("${utils.rawAttrib("labelPath")}");
% endif
% if utils.rawAttrib("labelOptions") is not None:
  ${utils.rawAttrib("id")}.setLabelOptions("${utils.rawAttrib("labelOptions")}");
% endif
% if utils.rawAttrib("iconPath") is not None:
  ${utils.rawAttrib("id")}.setIconPath("${utils.rawAttrib("iconPath")}");
% endif
% if utils.rawAttrib("iconOptions") is not None:
  ${utils.rawAttrib("id")}.setIconOptions("${utils.rawAttrib("iconOptions")}");
% endif
% if utils.rawAttrib("store") is not None:
    ${utils.rawAttrib("store")}.bind( "model", ${utils.rawAttrib("id")}, "model", {} );
% endif
% if utils.rawAttrib("delegate") is not None:
  ${utils.rawAttrib("id")}.setDelegate("${utils.rawAttrib("delegate")}");
% endif
${tag.children("*")}