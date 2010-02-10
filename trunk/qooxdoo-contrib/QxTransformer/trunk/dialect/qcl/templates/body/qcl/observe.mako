<%namespace name="utils" file="../../utils/utils.mako"/>\
<%namespace name="attr" file="../../utils/attribute.mako"/>\
<%doc>
  === doc ===
  The qcl:observe extends qx:observe by the possibility of binding
  a property of the object represented by the parent node to 
  a config value, or a permission state. The latter only works with boolean 
  properties. A observed config value is not updated when the property
  changes (use qcl:bind for this).
  @see qx:observe
  @see qcl:bind
  @attr path {String}
  @attr permission {String} 
  @attr source {Object} The source object to observe 
  @attr sourcePath {String} The source path path to follow
  @attr config {String}
  @attr converter {Function|null}
  @attr onSetOk {Function|null} 
  @attr onSetFail {Function|null}
  === example ===
  <qcl:observe 
    path="foo" 
    source="widget" sourcePath="bar"
    converter="function(data,model){return data;}"
    onSetOk="function(source,targe,data){}"
    onSetFail="function(source,targe,data){}" />  
  <qcl:observe path="foo" permission="permissions.bar.baz" />
  <qcl:observe path="foo" config="config.foo.bar" />
  === result ===
  widget.bind("bar",parentNodeWidget,"foo",{
    converter:function(data,model){return data;},
    onSetOk:function(source,targe,data){},
    onSetFail:function(source,targe,data){}}
  );
  qcl.access.permission.Manager.getInstance().create("foo.bar.baz").bind("state",parent,"foo");  
  qcl.config.Manager.getInstance().addListener("ready",function(){ 
    qcl.config.Manager.getInstance().bindValue("config.foo.bar",widget,"foo",false);
  }); 
</%doc>
% if utils.rawAttrib("permission") is not None:
qcl.access.permission.Manager.getInstance().create(${utils.attrib("permission")}).bind("state",${utils.parentRawAttrib("id")},${utils.attrib("path")},\
{${attr.rattrsByComma(["converter","onSetOk","onSetFail"])}});
% elif utils.rawAttrib("config") is not None:
qcl.config.Manager.getInstance().addListener("ready",function(){       
  qcl.config.Manager.getInstance().bindValue(${utils.attrib("config")},${utils.parentRawAttrib("id")}, ${utils.attrib("path")},false );      
});
% else:
${utils.rawAttrib("source")}.bind(${utils.attrib("sourcePath")},${utils.parentRawAttrib("id")},${utils.attrib("path")},\
{${attr.rattrsByComma(["converter","onSetOk","onSetFail"])}});
% endif