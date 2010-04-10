<%namespace name="utils" file="../../utils/utils.mako"/>\
<%namespace name="attr" file="../../utils/attribute.mako"/>\
<%doc>
  === doc ===
  qcl:bind extends qxt:bind by adding the possibility to bind a configKeyuration 
  value to the source property chain. Use qcl:sync for bidirectional binding.
   
  @see qxt:bind
  @see qcl:observe
  @see qcl:sync  
  @attr propertyChain {String}
  @attr target {Object} 
  @attr targetPropertyChain {String}
  @attr configKey {String}
  @attr converter {Function|null}
  @attr onSetOk {Function|null} 
  @attr onSetFail {Function|null}
  === example ===
  <qcl:bind 
    propertyChain="foo" 
    target="widget" targetPropertyChain="bar" 
    converter="function(data,model){return data;}"
    onSetOk="function(source,targe,data){}"
    onSetFail="function(source,targe,data){}" />
  <qcl:bind propertyChain="foo" configKey="configKey.foo.bar" />
  === result ===
  parent.bind("foo",widget,"bar",{
    converter:function(data,model){return data;},
    onSetOk:function(source,targe,data){},
    onSetFail:function(source,targe,data){}}
  );
  qx.core.Init.getApplication().getConfigManager().addListener("ready",function(){ 
    qx.core.Init.getApplication().getConfigManager().bindKey("configKey.foo.bar",widget,"foo");
  });
</%doc>
% if utils.rawAttrib("configKey") is not None:
qx.core.Init.getApplication().getConfigManager().addListener("ready",function(){       
  qx.core.Init.getApplication().getConfigManager().bindKey(${utils.attrib("configKey")},${utils.parentRawAttrib("id")}, ${utils.attrib("propertyChain")});      
});
% else:
${utils.parentRawAttrib("id")}.bind(${utils.attrib("propertyChain")},${utils.rawAttrib("target")},${utils.attrib("targetPropertyChain")},{\
${attr.rattrsByComma(["converter","onSetOk","onSetFail"])}});
% endif
   