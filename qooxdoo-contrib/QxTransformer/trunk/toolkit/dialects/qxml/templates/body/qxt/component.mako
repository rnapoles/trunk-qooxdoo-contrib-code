<%namespace name="tag" file="../../utils/tag.mako"/>\
<%namespace name="utils" file="../../utils/utils.mako"/>\
<%namespace name="attr" file="../../utils/attribute.mako"/>\
<%inherit file="../class.mako"/>\
    construct: function() {
        this.base(arguments);
        this.__qxtCreateUI();
        % if utils.rawAttrib("initFunctionName"):
            this.${utils.rawAttrib("initFunctionName")}();
        % endif
    },

    members : { 
        __qxtCreateUI : function() {
            ${tag.children("*")}
        }
        ${self.eventHandlers()}
    }

<%def name="eventHandlers()"><%
    listeners = utils.getAllXPathData("//*/qxt:listener[name(@*)='name']")
    if listeners is not None:
        result = ","
        for listener in listeners:
            result += """
            %s : function(e) {
            %s
            },""" %(listener['attr'].get('name'), listener['this'].text)
        return result[:-1]
    else:
        return ""
%></%def>

<%def name="extend()">\
%if attr.hasAttr('extend'):
    extend : ${attr.rvalue('extend','')},\
%else:
    extend: ${utils.xpathProp("./*","class")},\
%endif
</%def>

