<%namespace name="utils" file="../../utils/utils.mako"/>\
<%namespace name="attr" file="../../utils/attribute.mako"/>\
<%namespace name="tag" file="../../utils/tag.mako"/>\

% if econtext.getMode() is not None:
    % if "new" in econtext.getMode():
        ${self.new()}
    % endif
    % if "properties" in econtext.getMode():
        ${self.properties()}
    % endif
    % if "add" in econtext.getMode():
        ${self.add()}
    % endif
    % if "children" in econtext.getMode():
        ${self.children()}
    % endif
    <% return %>
% endif

${self.new()}

${self.properties()}
${self.add()}
${self.children()}

<%def name="new()">\
    var ${utils.rawAttrib("id")} = new ${utils.prop("class")}(${attr.constructorList()});
    ${utils.varScope()}
</%def>

<%def name="properties()">\
    ${tag.properties()}
    ${tag.children("./qxt:property", ("render"))}
</%def>

<%def name="add()">\
    ${tag.add()}
</%def>
	
<%def name="children()">\
    ${tag.children("*")}
</%def>