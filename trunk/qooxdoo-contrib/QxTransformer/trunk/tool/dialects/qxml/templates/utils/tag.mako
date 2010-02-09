<%! from qxt.xml.utils import XMLUtils %>
<%! from qxt.transformer.context import ElementContext%>
<%namespace name="utils" file="utils.mako"/>

<%def name="children(xpath, mode=None)"><%
    data = utils.getTagData()
    children = data['this'].xpath(xpath,namespaces=XMLUtils.ns_urls)
    
    for child in children:
        context.write(processor.renderTag(ElementContext(child,data['this'],None,mode)))
        
%></%def>

<%def name="properties(mode=None)"><%
    data = utils.getTagData()
    attribs = utils._getValue(data,"attr")
    #TODO: may be we can use existing element context here and set attr name to it
    for attrib in attribs:
        context.write(processor.renderAttr(ElementContext(econtext.getTag(),econtext.getParent(),attrib,mode)))
%></%def>

<%def name="add(mode=None)"><%
    econtext.setMode(mode)
    context.write(processor.renderAdd(econtext))
%></%def>