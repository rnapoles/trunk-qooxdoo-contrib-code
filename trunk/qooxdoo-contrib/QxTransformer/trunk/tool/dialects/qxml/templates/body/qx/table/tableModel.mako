<%namespace name="utils" file="../../../utils/utils.mako"/>\
<%namespace name="attr" file="../../../utils/attribute.mako"/>\
<%namespace name="tag" file="../../../utils/tag.mako"/>\
<%inherit file="../widget.mako"/>\

<%def name="new()">\
    // ------
    var ${utils.rawAttrib("id")} = new ${utils.rawAttrib("class")}();
    ${utils.rawAttrib("id")}.setColumns([<%
        headings = utils.xpathAllAttribs("following-sibling::qx:tableColumn", "label")
        context.write(",".join(headings))
    %>],[<%
        ids = utils.xpathAllAttribs("following-sibling::qx:tableColumn", "id")
        context.write(",".join(ids))
    %>]);
    
    ${utils.varScope()}
    // -------
</%def>

<%def name="properties()">\
    ${parent.properties()}
</%def>

<%def name="children()">\
    ${tag.children("*")}
</%def>