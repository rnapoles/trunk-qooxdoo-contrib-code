<%! from qxt.xml.utils import XMLUtils %>
<%namespace name="utils" file="utils.mako"/>

<%def name="value(name, defaultValue='')"><%
        value = utils.attrib(name)
        if value:
            return value
        else:
            return defaultValue
%></%def>

<%def name="rvalue(name, defaultValue=None)"><%
        value = utils.rawAttrib(name)
        if value:
            return value
        else:
            return defaultValue
%></%def>

<%def name="valueByXpath(xpath)"><%
        raise Exception("Not implemented yet")
%></%def>

<%def name="constructorList()"><%
    constructorArgs = utils.prop("constructor-args")
    
    result = ""
    if constructorArgs:
        argsNames = constructorArgs.split(",")
        
        # add list to props structure
        for name in argsNames:
            result += self.value(name,"null")
            result += ", " 
    #skipping last space and comma
    return result[:-2]
    
%></%def>

<%def name="hasAttr(name)"><%
    value = utils.rawAttrib(name)
    return (value is not None)
%></%def>

<%def name="attrName()"><%
    name = econtext.getAttrName()
    return name[:1].capitalize()+name[1:]
%></%def>

<%def name="attrRawName()"><%
    return econtext.getAttrName()
%></%def>



<%def name="attrValue()"><%
    return data.get('attrData')
%></%def>

<%def name="position()"><%
    positionAttributes = ["qxt:left", "qxt:top", "qxt:bottom", "qxt:right", \
                               "qxt:width", "qxt:height", "qxt:flex", "qxt:edge", \
                               "qxt:row", "qxt:column", "qxt:rowSpan", "qxt:colSpan"]
    
    result = ""
    tag = econtext.getTag()
    for paramName in positionAttributes:
        if self.hasAttr(paramName):
            param = self.value(paramName, "null")
            result += "%s:%s, " %(XMLUtils.localName(paramName),param)

    if len(result)>0:
       context.write(", {"+result[:-2] +"}")
    
%></%def>

<%def name="attrsByComma(list, newLineAfterAttr=True)"><%
    result = []
    for name in list:
        if self.hasAttr(name):
            result.append("%s:%s" % (name, self.value(name)))
    if newLineAfterAttr:
        context.write(",\n".join(result))
    else:
        context.write(",".join(result))
%></%def>

<%def name="rattrsByComma(list, newLineAfterAttr=True, valueProcessFunc=None)"><%
    result = []
    for name in list:
        if self.hasAttr(name):
            value = self.rvalue(name)
            if valueProcessFunc is not None:
                value = valueProcessFunc(value)
            result.append("%s:%s" % (name, value))
    if newLineAfterAttr:
        context.write(",\n".join(result))
    else:
        context.write(",".join(result))
%></%def>

