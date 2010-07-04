<%namespace name="utils" file="../../utils/utils.mako"/>\
<%namespace name="attr" file="../../utils/attribute.mako"/>\
<%doc>
  === doc ===
  qxt:sync synchronizes  (i.e. binds bidiretionally) the property chain
  of object represented by the parent tag to the property chain of the 
  given target object.  This has the same effect as a qxt:bind and qxt:observe
  @see qxt:bind
  @see qxt:observe
  @attr propertyChain {String}
  @attr sourceConverter {Function|null}
  @attr sourceOnSetOk {Function|null} 
  @attr sourceOnSetFail {Function|null}  
  @attr target {Object} 
  @attr targetPropertyChain {String}
  @attr targetConverter {Function|null}
  @attr targetOnSetOk {Function|null} 
  @attr targetOnSetFail {Function|null}
  === example ===
  <qcl:sync 
    propertyChain="foo" 
    sourceConverter="function(data,model){return data;}"
    sourceOnSetOk="function(source,targe,data){}"
    sourceOnSetFail="function(source,targe,data){}"    
    target="widget" targetPropertyChain="bar" 
    targetConverter="function(data,model){return data;}"
    targetOnSetOk="function(source,targe,data){}"
    targetOnSetFail="function(source,targe,data){}" />
  <qcl:sync propertyChain="foo" configKey="configKey.foo.bar" />
  === result ===
  parent.bind("foo",widget,"bar",{
    converter:function(data,model){return data;},
    onSetOk:function(source,targe,data){},
    onSetFail:function(source,targe,data){}}
  );
  target.bind("bar",parentNodeWidget,"foo",{
    converter:function(data,model){return data;},
    onSetOk:function(source,target,data){},
    onSetFail:function(source,target,data){}}
  );  
  qx.core.Init.getApplication().getConfigManager().addListener("ready",function(){ 
    qx.core.Init.getApplication().getConfigManager().bindKey("configKey.foo.bar",widget,"foo",true);
  });
</%doc>
% if utils.rawAttrib("configKey") is not None:
qx.core.Init.getApplication().getConfigManager().addListener("ready",function(){       
  qx.core.Init.getApplication().getConfigManager().bindKey(${utils.attrib("configKey")},${utils.parentRawAttrib("id")}, ${utils.attrib("propertyChain")},true );      
});
% else:
${utils.parentRawAttrib("id")}.bind(${utils.attrib("propertyChain")},${utils.rawAttrib("target")},${utils.attrib("targetPropertyChain")},{\
${attr.rattrsByComma(["sourceConverter","sourceOnSetOk","sourceOnSetFail"])}});
${utils.rawAttrib("target")}.bind(${utils.attrib("targetPropertyChain")},${utils.parentRawAttrib("id")},${utils.attrib("propertyChain")},{\
${attr.rattrsByComma(["targetConverter","targetOnSetOk","targetOnSetFail"])}});
% endif