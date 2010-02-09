<%namespace name="utils" file="../../utils/utils.mako"/>\
<%namespace name="attr" file="../../utils/attribute.mako"/>\
<%doc>
  === doc ===
  qxt:observe binds a property of the object represented by the
  parent node to a property of the target object. To set up 
  the reverse binding, use qx:bind.
  @see qxt:bind
  @attr source {Object} 
  @attr sourceProp {String}
  @attr converter {Function|null}
  @attr onSetOk {Function|null} 
  @attr onSetFail {Function|null}
  === example ===
  <qxt:observe 
    property="foo" 
    target="target" targetProp="bar"
    converter="function(data,model){return data;}"
    onSetOk="function(source,targe,data){}"
    onSetFail="function(source,targe,data){}" />  
  === result ===
  target.bind("bar",parentNodeWidget,"foo",{
    converter:function(data,model){return data;},
    onSetOk:function(source,targe,data){},
    onSetFail:function(source,targe,data){}}
  );
</%doc>
${utils.rawAttrib("source")}.bind(${utils.attrib("sourceProp")},${utils.parentRawAttrib("id")},${utils.attrib("property")},{\
${attr.rattrsByComma(["converter","onSetOk","onSetFail"])}});