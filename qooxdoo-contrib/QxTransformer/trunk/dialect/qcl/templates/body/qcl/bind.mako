<%namespace name="utils" file="../../utils/utils.mako"/>\
<%namespace name="attr" file="../../utils/attribute.mako"/>\
<%doc>
  === doc ===
  qcl:bind works like qx:bind, but you can also bind a property to a 
  config value.The binding is bi-directional by default, i.e. the config
  value is updated if the property changes, and vice versa. 
  See also qcl:observe for unidirectional binding. 
  @see qx:bind
  @see qcl:observe  
  @attr property {String}
  @attr target {Object} 
  @attr targetProp {String}
  @attr config {String}
  @attr converter {Function|null}
  @attr onSetOk {Function|null} 
  @attr onSetFail {Function|null}
  === example ===
  <qcl:bind 
    property="foo" target="widget" targetProp="bar" 
    converter="function(data,model){return data;}"
    onSetOk="function(source,targe,data){}"
    onSetFail="function(source,targe,data){}" />
  <qcl:bind property="foo" config="config.foo.bar" />
  === result ===
  parent.bind("foo",widget,"bar",{
    converter:function(data,model){return data;},
    onSetOk:function(source,targe,data){},
    onSetFail:function(source,targe,data){}}
  );
  qcl.config.Manager.getInstance().addListener("ready",function(){ 
    qcl.config.Manager.getInstance().bindValue("config.foo.bar",widget,"foo",true);
  });
</%doc>
% if utils.rawAttrib("config") is not None:
qcl.config.Manager.getInstance().addListener("ready",function(){       
  qcl.config.Manager.getInstance().bindValue(${utils.attrib("config")},${utils.parentRawAttrib("id")}, ${utils.attrib("property")},true );      
});
% else:
${utils.parentRawAttrib("id")}.bind(${utils.attrib("property")},${utils.rawAttrib("target")},${utils.attrib("targetProp")},{\
${attr.rattrsByComma(["converter","onSetOk","onSetFail"])}});
% endif
   