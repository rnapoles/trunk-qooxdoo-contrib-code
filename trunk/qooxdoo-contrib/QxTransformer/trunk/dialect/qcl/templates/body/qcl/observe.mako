<%namespace name="utils" file="../../utils/utils.mako"/>\
<%namespace name="attr" file="../../utils/attribute.mako"/>\
<%doc>
  === doc ===
  The qcl:observe extends qxt:observe by the possibility of binding
  a property of the object represented by the parent node to 
  a configKey value, or a permission state. The latter only works with boolean 
  properties. Use qcl:sync for bidirectional binding.
  
  @see qxt:observe
  @see qcl:bind
  @see qcl:sync
  @attr propertyChain {String}
  @attr permission {String} 
  @attr source {Object} The source object to observe 
  @attr sourcePropertyChain {String} The source propertyChain propertyChain to follow
  @attr configKey {String}
  @attr converter {Function|null}
  @attr onSetOk {Function|null} 
  @attr onSetFail {Function|null}
  === example ===
  <qcl:observe 
    propertyChain="foo" 
    source="widget" sourcePropertyChain="bar"
    converter="function(data,model){return data;}"
    onSetOk="function(source,targe,data){}"
    onSetFail="function(source,targe,data){}" />  
  <qcl:observe propertyChain="foo" permission="permissions.bar.baz" />
  <qcl:observe propertyChain="foo" configKey="configKey.foo.bar" />
  === result ===
  widget.bind("bar",parentNodeWidget,"foo",{
    converter:function(data,model){return data;},
    onSetOk:function(source,targe,data){},
    onSetFail:function(source,targe,data){}}
  );
  qx.core.Init.getApplication().getAccessManager().getPermissionManager().create("foo.bar.baz").bind("state",parent,"foo");  
  qcl.application.configKeyManager.getInstance().addListener("ready",function(){ 
    qcl.application.configKeyManager.getInstance().bindKey("configKey.foo.bar",widget,"foo",false);
  }); 
</%doc>
% if utils.rawAttrib("permission") is not None:
qx.core.Init.getApplication().getAccessManager().getPermissionManager().create(${utils.attrib("permission")}).bind("state",${utils.parentRawAttrib("id")},${utils.attrib("propertyChain")},\
{${attr.rattrsByComma(["converter","onSetOk","onSetFail"])}});
% elif utils.rawAttrib("configKey") is not None:
qx.core.Init.getApplication().getConfigManager().addListener("ready",function(){       
  qx.core.Init.getApplication().getConfigManager().bindKey(${utils.attrib("configKey")},${utils.parentRawAttrib("id")}, ${utils.attrib("propertyChain")},false );      
});
% else:
${utils.rawAttrib("source")}.bind(${utils.attrib("sourcePropertyChain")},${utils.parentRawAttrib("id")},${utils.attrib("propertyChain")},\
{${attr.rattrsByComma(["converter","onSetOk","onSetFail"])}});
% endif