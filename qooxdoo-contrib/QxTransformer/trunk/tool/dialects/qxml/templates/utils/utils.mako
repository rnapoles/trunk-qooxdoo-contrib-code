<%! from qxt.transformer.processor import AttributeProcessor %>
<%! from qxt.xml.utils import XMLUtils %>

<%def name="getTagData()"><%
        return data["thisData"]
%></%def>

<%def name="getParentData()"><%
        return data["parentData"]
%></%def>

<%def name="getAttrData()"><%
    return data['attrData']
%></%def>

<%def name="_getValue(data, propPath)"><%
        names = propPath.split(".");
        if data:
            for name in names:
                if name in data:
                    data = data.get(name)
                else:
                    return None
            return data
        else:
            return None
%></%def>

<%def name="rawAttrib(name)"><%
    return self._getValue(self.getTagData(), "attr."+name)
%></%def>

<%def name="attrib(name)"><%
    return AttributeProcessor.value(self.rawAttrib(name))
%></%def>

<%def name="prop(name)"><%
    return self._getValue(self.getTagData(), "props."+name)
%></%def>

<%def name="text()"><%
    return econtext.getTag().text
%></%def>

<%def name="parentRawAttrib(name)"><%
    return self._getValue(self.getParentData(), "attr."+name)
%></%def>

<%def name="parentAttrib(name)"><%
    return AttributeProcessor.value(self.parentRawAttrib(name))
%></%def>

<%def name="parentProp(name)"><%
    return self._getValue(self.getParentData(), "props."+name)
%></%def>

<%def name="xpath(xpath)"><%
    tag = econtext.getTag()
    return tag.xpath(xpath, namespaces=XMLUtils.ns_urls)
%></%def>

<%def name="_getXPathData(xpath)"><%
    tag = econtext.getTag()
    elements = tag.xpath(xpath,namespaces=XMLUtils.ns_urls)
    
    if (elements is not None) and (len(elements)>0):
        return processor.getDataForElement(elements[0])
    else:
        return None
%></%def>

<%def name="getAllXPathData(xpath)"><%
    tag = econtext.getTag()
    elements = tag.xpath(xpath,namespaces=XMLUtils.ns_urls)

    data = []
    if (elements is not None) and (len(elements)>0):
        for element in elements:
            data.append(processor.getDataForElement(element))
        return data
    else:
        return None
%></%def>


<%def name="xpathRawAttrib(xpath, name)"><%
    return self._getValue(self._getXPathData(xpath), "attr."+name) 
%></%def>

<%def name="xpathAllRawAttribs(xpath, name)"><%
    data = self.getAllXPathData(xpath)
    if data:
        result = []
        for element in data:
            result.append(self._getValue(element, "attr."+name))
            
        return result
    else:
        return None
%></%def>

<%def name="xpathAttrib(xpath, name)"><%
    return AttributeProcessor.value(self.xpathRawAttrib(xpath, name))
%></%def>

<%def name="xpathAllAttribs(xpath, name)"><%
   rawAttribs = self.xpathAllRawAttribs(xpath,name)
   if rawAttribs:
       result = []
       for attib in rawAttribs:
           result.append(AttributeProcessor.value(attib))
       return result
   else:
       return None
%></%def>


<%def name="xpathProp(xpath, name)"><%
    return self._getValue(self._getXPathData(xpath), "props."+name) 
%></%def>


<%def name="printContext()"><%
    context.write("//%s" %econtext.toString())
%></%def>

<%def name="asset()"><%
    #TODO: may be need to add some more attributes?
    icons = self.xpath("//*/@*[ name(.)='icon' or (name(..)='qx:image' and name(.)='source')]") 
    
    className = self.xpathRawAttrib("/*", "className")
    packages = className.split(".")
    topPackage = packages[0]
    renderIcons = []
    
    for icon in icons:
        #TODO: need to check is this is generic way
        #probably own images also can be included in asset
        if icon.startswith(("icon/",topPackage)):
            renderIcons.append(icon)
    
    renderIcons = set(renderIcons)
        
    for asset in renderIcons:
        if asset.startswith(("icon/")):
            context.write("#asset(qx/icon/${qx.icontheme}/%s)\n" %asset[5:])
        else:
            context.write("#asset(%s)\n" %asset)
%></%def>


<%def name="processValue(str)"><%
    return AttributeProcessor.value(str);
%></%def>

<%def name="varScope()">\
    %if (self.rawAttrib("qxt:scope") is not None) and (self.rawAttrib("qxt:scope")=="this"):
    this.${self.rawAttrib("id")} = ${self.rawAttrib("id")};
    %endif
</%def>
