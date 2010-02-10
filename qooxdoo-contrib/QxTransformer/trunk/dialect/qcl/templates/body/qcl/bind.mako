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
  @attr path {String}
  @attr target {Object} 
  @attr targetPath {String}
  @attr config {String}
  @attr converter {Function|null}
  @attr onSetOk {Function|null} 
  @attr onSetFail {Function|null}
  === example ===
  <qcl:bind 
    path="foo" target="widget" targetPath="bar" 
    converter="function(data,model){return data;}"
    onSetOk="function(source,targe,data){}"
    onSetFail="function(source,targe,data){}" />
  <qcl:bind path="foo" config="config.foo.bar" />
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
  qcl.config.Manager.getInstance().bindValue(${utils.attrib("config")},${utils.parentRawAttrib("id")}, ${utils.attrib("path")},true );      
});
% else:
${utils.parentRawAttrib("id")}.bind(${utils.attrib("path")},${utils.rawAttrib("target")},${utils.attrib("targetPath")},{\
${attr.rattrsByComma(["converter","onSetOk","onSetFail"])}});
% endif
   