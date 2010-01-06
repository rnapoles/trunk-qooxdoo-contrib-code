<%! from qxt.transformer.context import ElementContext%>
<%
    parent = econtext.getParent()
    if parent is not None:
        newParent = parent.getparent()
        context.write(processor.renderAdd(ElementContext(econtext.getTag(),newParent,None,econtext.getMode())))
%>