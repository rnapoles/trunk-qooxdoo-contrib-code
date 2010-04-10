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
  @attr target {Object} 
  @attr targetPropertyChain {String}
  @attr converter {Function|null}
  @attr onSetOk {Function|null} 
  @attr onSetFail {Function|null}
  === example ===
  <qxt:sync 
    propertyChain="foo" target="widget" targetPropertyChain="bar" 
    converter="function(data,model){return data;}"
    onSetOk="function(source,targe,data){}"
    onSetFail="function(source,targe,data){}" />
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
</%doc>
${utils.parentRawAttrib("id")}.bind(${utils.attrib("propertyChain")},${utils.rawAttrib("target")},${utils.attrib("targetPropertyChain")},{\
${attr.rattrsByComma(["converter","onSetOk","onSetFail"])}});
${utils.rawAttrib("source")}.bind(${utils.attrib("sourcePropertyChain")},${utils.parentRawAttrib("id")},${utils.attrib("propertyChain")},{\
${attr.rattrsByComma(["converter","onSetOk","onSetFail"])}});