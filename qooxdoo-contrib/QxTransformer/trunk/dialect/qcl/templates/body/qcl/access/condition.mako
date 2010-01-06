<%namespace name="utils" file="../../../utils/utils.mako"/>\
<%namespace name="attr" file="../../../utils/attribute.mako"/>\
<%doc>
  === doc ===
  qcl:condition adds a condition function to a permission object represented
  by the parent qcl:permission node. You can either use
  inline code or use a delegate function, both of which will be executed 
  in the context of the current widget object. A third use is to use the 
  'property' and 'value' attribute, which will add a condition that returns
  true only if a property of a given qooxdoo object or the current class
  evaluates to the given value.
  @see qcl:permission
  @attr delegate {String}
  @attr property {String}
  @attr value {String|Boolean|Integer}
  === example ===
  <qcl:condition>
    <![CDATA[
      return myApplication.getFooIsLoaded() == true;
    ]]>
  </qcl:condition>
  <qcl:condition delegate="myConditionFunc" />
  <qcl:condition property="foo" value="bar" />
  <qcl:condition target="{js}myWidget" property="foo" value="bar" />
  === result ===
  qclpermission1.addCondition(function(){
    return myApplication.getFooIsLoaded() == true;
  },this);
  qclpermission1.addCondition(this.myConditionFunc,this);
  qclpermission1.addCondition(function(){return this.get("foo")=="bar";},this);
  qclpermission1.addCondition(function(){return myWidget.get("foo")=="bar";},this);  
</%doc>
${utils.parentRawAttrib("id")}.addCondition(\
% if utils.rawAttrib("delegate") is not None:
this.${utils.rawAttrib("delegate")}\
% elif utils.rawAttrib("property") is not None and utils.rawAttrib("value") is not None and utils.rawAttrib("target") is not None:
function(){${utils.attrib("target")}.get(${utils.attrib("property")})==${utils.attrib("value")};}\
% elif utils.rawAttrib("property") is not None and utils.rawAttrib("value") is not None:
function(){this.get(${utils.attrib("property")})==${utils.attrib("value")};}\
% elif utils.text() is not None:
function(){${utils.text()}}\
% endif
,this);