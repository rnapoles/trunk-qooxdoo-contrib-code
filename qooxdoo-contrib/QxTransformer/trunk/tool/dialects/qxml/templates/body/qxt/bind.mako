<%namespace name="utils" file="../../utils/utils.mako"/>\
<%namespace name="attr" file="../../utils/attribute.mako"/>\
<%doc>
  === doc ===
  qxt:bind binds a property of the target object to a property
  of object represented by the parent tag. To set up a reverse
  binding, use qxt:observe.
  @see qxt:observe
  @attr propertyChain {String}
  @attr target {Object} 
  @attr targetPropertyChain {String}
  @attr converter {Function|null}
  @attr onSetOk {Function|null} 
  @attr onSetFail {Function|null}
  === example ===
  <qxt:bind 
    propertyChain="foo" 
    target="widget" targetPropertyChain="bar" 
    converter="function(data,model){return data;}"
    onSetOk="function(source,targe,data){}"
    onSetFail="function(source,targe,data){}" />
  === result ===
  parent.bind("foo",widget,"bar",{
    converter:function(data,model){return data;},
    onSetOk:function(source,targe,data){},
    onSetFail:function(source,targe,data){}}
  );
</%doc>
${utils.parentRawAttrib("id")}.bind(${utils.attrib("propertyChain")},${utils.rawAttrib("target")},${utils.attrib("targetPropertyChain")},{\
${attr.rattrsByComma(["converter","onSetOk","onSetFail"])}});