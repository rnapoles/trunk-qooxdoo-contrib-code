<?xml version='1.0'?>
<!-- 

	QxTransformer
	Converts QXML to Javascript
	
	License: LGPL
	Autors: Siarhei Barysiuk <s.barysiuk@gmail.com>	
			Christian Boulanger <info@bibliograph.org>

	attributes processing core
	
 -->

<!-- xml entities -->
<!DOCTYPE stylesheet [

	<!ENTITY UPPERCASE 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'>
	<!ENTITY CR '&#13;&#10;'>
	<!ENTITY CONSTANTS 'true false null undefined '>

	<!ENTITY ATTRIBUTES_FOR_TRANSLATION_GROUP 'attributesForTranslation'>
	<!ENTITY DEFAULT_ATTRIBUTE_HANDLER 'defaultAttibuteHandler'>
	<!ENTITY EVENT_LISTENER_ATTIRIBUTE_HANDLER 'eventListenerAttributeHandler'>

	<!ENTITY ATTRIBUTE_TEMPLATES_XML_PATH 'attributeTemplates.xsl'>
	<!ENTITY DYN_TREE_ROOT_TAG 'qxti:templates'>
]>
	
<xsl:stylesheet version="1.0" 
xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
xmlns:qx="http://www.qxtransformer.org/qooxdoo"
xmlns:qxti="http://www.qxtransformer.org/internal"
xmlns:qxt="http://www.qxtransformer.org/extension"
xmlns:exsl="http://exslt.org/common">
	
	<xsl:include href="&ATTRIBUTE_TEMPLATES_XML_PATH;"/>
	<xsl:variable name="attributeTemplatesDoc" select="document('&ATTRIBUTE_TEMPLATES_XML_PATH;')"/>
	
	<!-- contains tree of templates is defined in templates mapping
	For example:
	<qxti:templates>
		<qxti:defaultAttributeTemplate/>
		<qxti:tooltipAttributeMapping/>
		...
	</qxti:	templates>
	This tree is built dynamically on runtime without necessity to define
	qxti:* tags in attributeTemplates.xsl file.
	-->
	<xsl:variable name="dynamicAttributeTemplatesTreeRTF">
		<xsl:element name="qxti:templates">
			<xsl:element name="qxti:eventListenerAttributeHandler"/>
			<xsl:for-each select="$templatesMappingDoc/templates-mapping/attributes/default-attribute-template">
				<xsl:element name="{concat('qxti:',string(.))}"/>
			</xsl:for-each>
			<xsl:for-each select="$templatesMappingDoc/templates-mapping/attributes//*/@attributeTemplate">
				<xsl:element name="{concat('qxti:',string(.))}"/>
			</xsl:for-each>
		</xsl:element>
	</xsl:variable>
	<xsl:variable name="dynamicAttributeTemplatesTree" select="exsl:node-set($dynamicAttributeTemplatesTreeRTF)"/>

	<!-- main template for attributes processing -->
	<xsl:template name="attributesProcessing">
	
		<xsl:param name="widget" /> 
		<xsl:param name="expandedDocument" />
		<xsl:param name="exclude" select="''" />
		
		<xsl:variable name="widgetName" select="name($widget)"/>
		<xsl:variable name="constructorArgs" select="$tagsDoc//tag[@version=$qooxdooVersion and @name=$widgetName][1]/@args"/>
		
		<!-- processes all attributes except constructors arguments, qxt: attributes and those in the exclude list --> 
		<xsl:for-each select="$widget/@*[
														not( contains( $constructorArgs, name(.) ) ) 
														and not( contains( name(.),'qxt:' ) ) 
														and not( contains( $exclude, name(.) ) ) 
													]">
			<xsl:variable name="attributeName" select="name(.)"/>
			<xsl:choose>
			
				<!-- attribute is onFoo eventListener, we use pattern matching instead of templates because foo could be anything -->
				<xsl:when test="contains('&UPPERCASE;',substring($attributeName,3,1)) and substring($attributeName,1,2)='on'">
					<xsl:apply-templates select="$dynamicAttributeTemplatesTree/qxti:templates/qxti:*[local-name()='&EVENT_LISTENER_ATTIRIBUTE_HANDLER;']">
						<xsl:with-param name="attribute" select="."/>
						<xsl:with-param name="expandedDocument" select="$expandedDocument"/>
					</xsl:apply-templates>
				</xsl:when>
				
				<!--  attribute is definition of type:
						<... attribute="13" qxt:attributeType="string" .../>
				-->
				<xsl:when test="contains(name(.),'qxt') and contains(name(.),'Type')">
					<!--  skip this attribute, will be processed later during generation
						  of property for which this type is defined -->
				</xsl:when>
				
				<!-- attribute is property -->
				<xsl:otherwise>
					<!-- gets template's name for attribute -->
					<xsl:variable name="attributeTemplateName">
						<xsl:call-template name="getAttibuteTemplateName">
							<xsl:with-param name="attributeName" select="$attributeName"/>
							<xsl:with-param name="qooxdooVersion" select="$qooxdooVersion"/>
						</xsl:call-template>
					</xsl:variable>
					<!-- applies template by name 
						for more information see QxTransformer documentation
						dynamic template linking-->
					<xsl:apply-templates select="$dynamicAttributeTemplatesTree/qxti:templates/qxti:*[local-name()=$attributeTemplateName][1]" >
						<xsl:with-param name="widget" select="$widget"/>
						<xsl:with-param name="attribute" select="."/>
						<xsl:with-param name="expandedDocument" select="$expandedDocument"/>
					</xsl:apply-templates> 
					
				</xsl:otherwise>
			</xsl:choose>
			
		</xsl:for-each> 

	</xsl:template> 

	<!-- gets name of template for current attribute from
	templates-mapping.xml according by overriding rules
	for more information see QxTransformer SAD -->
	<xsl:template name="getAttibuteTemplateName">
		<xsl:param name="attributeName"/>
		<xsl:param name="qooxdooVersion"/>
		<xsl:choose>
			<!-- get template for stand alone attribute with necessary name and qooxdoo version -->
			<xsl:when test="$templatesMappingDoc/templates-mapping/attributes/attribute[@name=$attributeName and @qooxdooVersion=$qooxdooVersion]/@attributeTemplate">
					<xsl:value-of select="$templatesMappingDoc/templates-mapping/attributes/attribute[@name=$attributeName and @qooxdooVersion=$qooxdooVersion]/@attributeTemplate"/>
			</xsl:when>
			
			<!-- in other case get template in group with necessary name and qooxdoo version -->
			<xsl:when test="$templatesMappingDoc/templates-mapping/attributes/group/attribute[@name=$attributeName and @qooxdooVersion=$qooxdooVersion]/@attributeTemplate">
					<xsl:value-of select="$templatesMappingDoc/templates-mapping/attributes/group/attribute[@name=$attributeName and @qooxdooVersion=$qooxdooVersion]/@attributeTemplate"/>
			</xsl:when>

			<!-- in other case get group with necessary qooxdoo version and widget with necessary name (template from attribute)-->
			<xsl:when test="$templatesMappingDoc/templates-mapping/attributes/group[@qooxdooVersion=$qooxdooVersion]/attribute[@name=$attributeName]/@attributeTemplate">
					<xsl:value-of select="$templatesMappingDoc/templates-mapping/attributes/group[@qooxdooVersion=$qooxdooVersion]/attribute[@name=$attributeName]/@attributeTemplate"/>
			</xsl:when>

			<!-- in other case get group with necessary qooxdoo version and attribute with necessary name (template from group) -->
			<xsl:when test="$templatesMappingDoc/templates-mapping/attributes/group[@qooxdooVersion=$qooxdooVersion]/attribute[@name=$attributeName]/../@attributeTemplate">
					<xsl:value-of select="$templatesMappingDoc/templates-mapping/attributes/group[@qooxdooVersion=$qooxdooVersion]/attribute[@name=$attributeName]/../@attributeTemplate"/>
			</xsl:when>
			
			<!--in other case (if qooxdoo version is not defined) get stand alone attribute with
				necessary name and without qooxdoo version -->
			<xsl:when test="$templatesMappingDoc/templates-mapping/attributes/attribute[@name=$attributeName and not(@qooxdooVersion)]/@attributeTemplate">
					<xsl:value-of select="$templatesMappingDoc/templates-mapping/attributes/attribute[@name=$attributeName and not(@qooxdooVersion)]/@attributeTemplate"/>
			</xsl:when>			
			
			<!--in other case (if qooxdoo version is not defined) get attribute in group with
				necessary name and without qooxdoo version for attribute and group 
				(template from attribute)-->
			<xsl:when test="$templatesMappingDoc/templates-mapping/attributes/group[not(@qooxdooVersion)]/attribute[@name=$attributeName and not(@qooxdooVersion)]/@attributeTemplate">
					<xsl:value-of select="$templatesMappingDoc/templates-mapping/attributes/group[not(@qooxdooVersion)]/attribute[@name=$attributeName and not(@qooxdooVersion)]/@attributeTemplate"/>
			</xsl:when>			
			<!--in other case (if qooxdoo version is not defined) get attribute in group with
				necessary name and without qooxdoo version for attribute and group 
				(template from group)-->
			<xsl:when test="$templatesMappingDoc/templates-mapping/attributes/group[not(@qooxdooVersion)]/attribute[@name=$attributeName and not(@qooxdooVersion)]/../@attributeTemplate">
					<xsl:value-of select="$templatesMappingDoc/templates-mapping/attributes/group[not(@qooxdooVersion)]/attribute[@name=$attributeName and not(@qooxdooVersion)]/../@attributeTemplate"/>
			</xsl:when>
						
			<!-- template name is not defined
				will be used template by default
				if template by default is not defined in
				templates-mapping.xml for used version of
				qooxdoo will be used template with name
				DEFAULT_ATTRIBUTE_HANDLER -->
			<xsl:otherwise>
				<xsl:choose>
					<xsl:when test="$templatesMappingDoc/templates-mapping/attributes/default-attribute-template[@qooxdooVersion=$qooxdooVersion]">
						<xsl:value-of select="$templatesMappingDoc/templates-mapping/attributes/default-attribute-template[@qooxdooVersion=$qooxdooVersion]"/>
					</xsl:when>
					<xsl:when test="$templatesMappingDoc/templates-mapping/attributes/default-attribute-template[not(@qooxdooVersion)]">
						<xsl:value-of select="$templatesMappingDoc/templates-mapping/attributes/default-attribute-template[not(@qooxdooVersion)]"/>
					</xsl:when>
					<xsl:otherwise>
						<xsl:text>&DEFAULT_ATTRIBUTE_HANDLER;</xsl:text>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:otherwise> 
		</xsl:choose>
	</xsl:template>

	<xsl:template name="buildDynamicTemplatesTree">
		<!--xsl:variable name="tree">
		<xsl:element name="qxti:templates">
			<xsl:element name="qxti:eventListenerAttributeHandler"/-->
			<!--xsl:for-each select="$templatesMappingDoc/templates-mapping/attributes/default-attribute-template">
				<xsl:element name="{concat('qxti:',string(.))}"/>
			</xsl:for-each>
			<xsl:for-each select="$templatesMappingDoc/templates-mapping/attributes//*/@attributeTemplate">
				<xsl:element name="{concat('qxti:',string(.))}"/>
			</xsl:for-each-->
		<!--/xsl:element>
		</xsl:variable>
		<xsl:value-of select="$tree"/-->
	</xsl:template>

	<!--template for attribute which can contain values	separated by comma-->
	<xsl:template name="attributeValue">
		<xsl:param name="widget"/>
		<xsl:param name="value" select="."/>
		
		<xsl:call-template name="csv-values-processing">
			<xsl:with-param name="widget" select="$widget"/>
			<xsl:with-param name="value" select="$value"/>
			<xsl:with-param name="attribute" select="$value"/>
		</xsl:call-template> 
	</xsl:template>
	
	<!-- determine if attribute is a string, number, or object,
		 and translate if neccessary.
		 value: value of attribute
	-->

	<xsl:template name="attributeValuePlain">
		<xsl:param name="widget" />
		<xsl:param name="attribute"/>
		<xsl:param name="value" select="."/>
		
		<xsl:variable name="attributeName" select="name($attribute)"/>
		<xsl:variable name="attributeTypeName" select="concat('qxt:',$attributeName,'Type')"/>
    	<xsl:variable name="explicitType" select="$widget/@*[name(.)=$attributeTypeName]"/>
		
		<xsl:choose>
			<!-- does attribute value correspond to an id in the document?-->
			<xsl:when test="($widget/preceding::*[@id and @id=$value] and not($explicitType)) or 
							(string($explicitType)='reference')">
				<xsl:value-of select="$value"/>	
			</xsl:when>
            
			<!-- is attribute value a number, a constant, starts with "qx." or with "javascript:"? -->
			<xsl:when test="
			(
				(
				string(number($value)) != 'NaN' 
				or 
				contains('&CONSTANTS;',concat($value,' '))
				or
				starts-with($value,'qx.')
				or
				starts-with($value,'javascript:')
				)				
				and
			 	not($explicitType)
			)
			or
			(
			 	string($explicitType)='number' 
				or 
				string($explicitType)='constant'
				or
				string($explicitType)='ref'
			)
			">
				<xsl:choose>
					<xsl:when test="starts-with($value,'javascript:')">
						<xsl:value-of select="substring($value,12)"/>					
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="$value"/>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:when>
			<!-- otherwise, attribute is simple string, translate if necessary -->
			<xsl:otherwise>
				<xsl:variable 
					name="attributesForTranslation"
					select="$templatesMappingDoc/templates-mapping/attributes/group[@name='&ATTRIBUTES_FOR_TRANSLATION_GROUP;']"/>
				<xsl:choose>
					<xsl:when test="
						$attributesForTranslation/attribute[@name=$attributeName]
						and 
						(
							$translateDocument = 'true'
							or 
							$widget/@translate = 'true'
						)
						">						
						<xsl:text>this.tr("</xsl:text>
						<xsl:value-of select="$value"/>
						<xsl:text>")</xsl:text>
					</xsl:when>
					<xsl:otherwise>
						<xsl:text>"</xsl:text>
						<xsl:value-of select="$value"/>
						<xsl:text>"</xsl:text>					
					</xsl:otherwise>
				</xsl:choose>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>

	<!-- processes attribute separated by comma. 
		 Output will be paramValue1, paramValue2, ...-->
	<xsl:template name="csv-values-processing">
		<xsl:param name="widget"/>
		<xsl:param name="value"/>
		<xsl:param name="attribute"/>
		
		<xsl:variable name="attributeString">
			<xsl:value-of select="substring-before($value,',')"/>
		</xsl:variable>
		<xsl:choose>
			<xsl:when test="$attributeString!=''">
				<xsl:call-template name="attributeValuePlain">
					<xsl:with-param name="widget" select="$widget"/>
					<xsl:with-param name="value" select="$attributeString"/>
					<xsl:with-param name="attribute" select="$attribute"/>
				</xsl:call-template>
				<xsl:text> ,</xsl:text>
				<xsl:variable name="param">
					<xsl:value-of select='substring-after($value,",")'/>
				</xsl:variable>
				<xsl:call-template name="csv-values-processing">
					<xsl:with-param name="widget" select="$widget"/>
					<xsl:with-param name="value" select="$param"/>
					<xsl:with-param name="attribute" select="$attribute"/>
				</xsl:call-template>
			</xsl:when>
			<xsl:otherwise>
				<xsl:call-template name="attributeValuePlain">
					<xsl:with-param name="widget" select="$widget"/>
					<xsl:with-param name="value" select="$value"/>
					<xsl:with-param name="attribute" select="$attribute"/>
				</xsl:call-template>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	  
</xsl:stylesheet>