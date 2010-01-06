<?xml version='1.0'?>
<!-- 

	QxTransformer
	Converts QXML to Javascript
	
	License: LGPL
	Autors: Siarhei Barysiuk <s.barysiuk@gmail.com>	
			Christian Boulanger <info@bibliograph.org>

	main file for widget processing 
	
 -->
<!-- xml entities -->
<!DOCTYPE stylesheet [
	<!ENTITY UPPERCASE 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'>
	<!ENTITY NUMBER "1234567890">
	<!ENTITY LOWERCASE 'abcdefghijklmnopqrstuvwxyz'>
	<!ENTITY UPPER_TO_LOWER " '&UPPERCASE;' , '&LOWERCASE;' ">
	<!ENTITY LOWER_TO_UPPER " '&LOWERCASE;' , '&UPPERCASE;' ">
	<!ENTITY CR '&#13;&#10;'>
	<!ENTITY CLASS_PREFIX 'Qx'>
	<!ENTITY DEBUG 'yes'>

	<!ENTITY WIDGET_TEMPLATES_XSL_PATH 'widgetTemplates.xsl'>
	<!ENTITY ATTRIBUTES_XSL_PATH '../attributes/attributes.xsl'>
	
	<!ENTITY DEFAULT_CONTENT_WIDGET_HANDLER 'defaultContentWidgetHandler'>
	<!ENTITY DEFAULT_ADD_WIDGET_HANDLER 'defaultAddWidgetHandler'>

	<!ENTITY QXT_MACRO_USAGE_TAG 'qxt:use-macro'>
	<!ENTITY INCLUDE_SRC_ATTRIBUTE 'src'>
	<!ENTITY QXT_INCLUDE_TAG 'qxt:include'>
	
]>

<xsl:stylesheet version="1.0" 
xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
xmlns:qx="http://www.qxtransformer.org/qooxdoo"
xmlns:qxti="http://www.qxtransformer.org/internal"
xmlns:qxt="http://www.qxtransformer.org/extension"
xmlns:exsl="http://exslt.org/common"
xmlns:saxon="http://icl.com/saxon">

	<xsl:include href="&WIDGET_TEMPLATES_XSL_PATH;"/>
	<xsl:include href="&ATTRIBUTES_XSL_PATH;"/>
	<!--xsl:variable name="widgetTemplatesDoc" select="document('&WIDGET_TEMPLATES_XSL_PATH;')"/-->

<!-- contains tree of templates is defined in templates mapping
	For example:
	<qxti:templates>
		<qxti:defaultContentWidgetHandler/>
		<qxti:defaultAddWidgetHandler/>
		<qxti:emptyWidgetHandler/>
		...
	</qxti:	templates>
	This tree is built dynamically on runtime without necessity to define
	qxti:* tags in attributeTemplates.xsl file.
	-->
	<xsl:variable name="dynamicWidgetTemplatesTreeRTF">
		<xsl:element name="qxti:templates">
			<xsl:for-each select="$templatesMappingDoc/templates-mapping/widgets/default-content-template">
				<xsl:element name="{concat('qxti:',string(.))}"/>
			</xsl:for-each>
			<xsl:for-each select="$templatesMappingDoc/templates-mapping/widgets/default-add-template">
				<xsl:element name="{concat('qxti:',string(.))}"/>
			</xsl:for-each>
			<xsl:for-each select="$templatesMappingDoc/templates-mapping/widgets//*/@contentTemplate">
				<xsl:element name="{concat('qxti:',string(.))}"/>
			</xsl:for-each>
			<xsl:for-each select="$templatesMappingDoc/templates-mapping/widgets//*/@addTemplate">
				<xsl:element name="{concat('qxti:',string(.))}"/>
			</xsl:for-each>
		</xsl:element>
	</xsl:variable>
	<xsl:variable name="dynamicWidgetTemplatesTree" select="exsl:node-set($dynamicWidgetTemplatesTreeRTF)"/>
	
   
	<!-- ignore all others -->
	<xsl:template match="*/*[not(contains(name(.),'qx'))]"/>

    <!-- process special widgets (extension	of qxtransformer)-->
    <xsl:template match="*/qxt:*">
		<xsl:param name="expandedDocument"/>
		<xsl:variable name="widgetName" select="name(.)"/>
		
		<xsl:variable name="contentTemplateName">
			<xsl:call-template name="getContentTemplateName">
				<xsl:with-param name="qooxdooVersion" select="$qooxdooVersion"/>
				<xsl:with-param name="widgetName" select="$widgetName"/>
				<xsl:with-param name="expandedDocument" select="$expandedDocument"/>
			</xsl:call-template>
		</xsl:variable>

		<xsl:apply-templates select="$dynamicWidgetTemplatesTree/qxti:templates/qxti:*[local-name()=$contentTemplateName][1]">
			<xsl:with-param name="widget" select="."/>
			<xsl:with-param name="expandedDocument" select="$expandedDocument"/>
		</xsl:apply-templates>		
		
	</xsl:template>
	
	<!-- process child widgets according to widget mapping -->    
	<xsl:template match="*/qx:*[local-name(.)!='application' and local-name(.)!='widget'  ]">
	
		<xsl:param name="expandedDocument" />
		
		<xsl:variable name="widgetName" select="name(.)"/>
		
		<!-- get name of content-template for current widget
			from templates-mapping.xml.
			For more information see QxTransformer documentation
			-->
		<xsl:variable name="contentTemplateName">
			<xsl:call-template name="getContentTemplateName">
				<xsl:with-param name="qooxdooVersion" select="$qooxdooVersion"/>
				<xsl:with-param name="widgetName" select="$widgetName"/>
				<xsl:with-param name="expandedDocument" select="$expandedDocument"/>
			</xsl:call-template>
		</xsl:variable>
		
		<xsl:variable name="temp"></xsl:variable> 		
	
		<!-- get name of add-template for current widget
			from templates-mapping.xml.
			For more information see QxTransformer documentation
			-->
		<xsl:variable name="addTemplateName">
			<xsl:call-template name="getAddTemplateName">
				<xsl:with-param name="qooxdooVersion" select="$qooxdooVersion"/>
				<xsl:with-param name="widgetName" select="$widgetName"/>
			</xsl:call-template> 
		</xsl:variable>

		<xsl:if test="'&DEBUG;'='verbose'">
			<xsl:call-template name="log.info">
				<xsl:with-param name="message">
					<xsl:value-of select="saxon:line-number()"/>
					<xsl:text>: </xsl:text>
					<xsl:value-of select="$widgetName"/>
				</xsl:with-param>
			</xsl:call-template>
		</xsl:if>


		<!--apply content-template -->
		<xsl:apply-templates select="$dynamicWidgetTemplatesTree/qxti:templates/qxti:*[local-name()=$contentTemplateName][1]">
			<xsl:with-param name="widget" select="."/>
			<xsl:with-param name="addTemplateName" select="$addTemplateName"/> 
			<xsl:with-param name="expandedDocument" select="$expandedDocument"/>
		</xsl:apply-templates>		
		
	</xsl:template>

	<!-- processes static includes and macros in current document
		 in result we have document with all widgets from include file
		 and processed macros with filled attributes -->
	<xsl:template name="preprocessStaticIncludes">
	
		<xsl:param name="widget"/>
		<xsl:param name="includeNodes"/>


		
		<xsl:choose>
		
			<!-- if widget has qxt:include or qxt:use-macro need preprocess it -->
			<xsl:when test="$widget//qxt:*[name(.)='&QXT_MACRO_USAGE_TAG;' or name(.)='&QXT_INCLUDE_TAG;']">
				<xsl:for-each select="$widget/*">
												
					   <xsl:choose>
					   
							<!-- process qxt:use-macro --> 
							<xsl:when test="name(.)='&QXT_MACRO_USAGE_TAG;'">
							
          		<xsl:if test="'&DEBUG;'='yes'">
          			<xsl:call-template name="log.info">
          				<xsl:with-param name="message">
          					<xsl:text>Including macro: </xsl:text>
          					<xsl:value-of select="'(todo: name)'"/>
          				</xsl:with-param>
          			</xsl:call-template>
          		</xsl:if>

								<!-- preprocessed bit of document -->
								<xsl:variable name="macro">	
									<xsl:call-template name="processMacroWidget">
										<xsl:with-param name="widget" select="."/>
									</xsl:call-template>
								</xsl:variable>
								
								<!-- process other includes or macros inside -->
								<xsl:call-template name="preprocessStaticIncludes">
									<xsl:with-param name="widget" select="exsl:node-set($macro)/*"/>
								</xsl:call-template>
								
							</xsl:when>
							
							<!-- process qxt:include -->
							<xsl:when test="name(.)='&QXT_INCLUDE_TAG;'">
								
								<xsl:variable name="includeSrc" select="./@&INCLUDE_SRC_ATTRIBUTE;"/>
								
								<xsl:if test="$includeSrc">
					
									<!-- use base path? -->
									<xsl:variable name="base" select="./@base"/>
					
									<xsl:variable name="basePath">
										<xsl:choose>
											<xsl:when test="$base and $includeNodes and $includeNodes[@name=$base]">
												<xsl:value-of select="$includeNodes[@name=$base][1]/@path"/>									
											</xsl:when>
											<xsl:when test="$base and $widget/qxt:include-base[@name=$base]">
												<xsl:value-of select="$widget/qxt:include-base[@name=$base][1]/@path"/>									
											</xsl:when>
											<xsl:otherwise/>
										</xsl:choose>			
									</xsl:variable>
								
									<xsl:variable name="includePath">
										<xsl:value-of select="$projectRootDir"/>									
										<xsl:value-of select="$basePath"/>
										<xsl:value-of select="$includeSrc"/>								
									</xsl:variable>

									<xsl:if test="'&DEBUG;'='yes'">
            				<xsl:call-template name="log.info">
            					<xsl:with-param name="message">
            						<xsl:text>Including file </xsl:text>
              					<xsl:value-of select="$includePath"/>
              				</xsl:with-param>
              			</xsl:call-template>
              		</xsl:if>

									<!-- document with data -->
									<xsl:variable name="includeDocument" select="document($includePath)"/>

									<!-- process other includes or macros inside document-->
									<xsl:call-template name="preprocessStaticIncludes">
										<xsl:with-param name="widget" select="exsl:node-set($includeDocument)/*"/>
										<xsl:with-param name="includeNodes" select="$widget/qxt:include-base|exsl:node-set($includeNodes)"/>
									</xsl:call-template>
									
								</xsl:if>
								
							</xsl:when>
							
							<!-- ignore qxt:include-base -->
							<xsl:when test="name(.)='qxt:include-base'" />
							
							<!-- process simple widget, copy it to output
								and process children -->
							<xsl:otherwise>
								<xsl:copy>
									<xsl:copy-of select="./@*[not(contains(name(.),'Xmlns:'))]"/>
									<xsl:copy-of select="./text()"/>
									<xsl:call-template name="preprocessStaticIncludes">
										<xsl:with-param name="widget" select="."/>
										<xsl:with-param name="includeNodes" select="$widget/qxt:include-base|exsl:node-set($includeNodes)"/>
									</xsl:call-template>
								</xsl:copy>
							</xsl:otherwise>
						</xsl:choose>
				</xsl:for-each>
			</xsl:when>
			
			<!-- widget does not have any macros or includes -->
			<xsl:otherwise>
				<xsl:copy-of select="$widget/*"/>
			</xsl:otherwise>
		</xsl:choose>
		
	</xsl:template>
	
	<!-- returns name of content template for current widget and qooxdooVersion -->
	<xsl:template name="getContentTemplateName">
	  <xsl:param name="widgetName"/>
	  <xsl:param name="qooxdooVersion"/>
	  <xsl:choose>
			<!-- get template for stand alone widget with necessary name and qooxdoo version -->
			<xsl:when test="$templatesMappingDoc/templates-mapping/widgets/widget[@name=$widgetName and @qooxdooVersion=$qooxdooVersion]/@contentTemplate">
					<xsl:value-of select="$templatesMappingDoc/templates-mapping/widgets/widget[@name=$widgetName and @qooxdooVersion=$qooxdooVersion]/@contentTemplate"/>
			</xsl:when>
			
			<!-- in other case get template in group with necessary name and qooxdoo version -->
			<xsl:when test="$templatesMappingDoc/templates-mapping/widgets/group/widget[@name=$widgetName and @qooxdooVersion=$qooxdooVersion]/@contentTemplate">
					<xsl:value-of select="$templatesMappingDoc/templates-mapping/widgets/group/widget[@name=$widgetName and @qooxdooVersion=$qooxdooVersion]/@contentTemplate"/>
			</xsl:when>

			<!-- in other case get group with necessary qooxdoo version and widget with necessary name (template from widget)-->
			<xsl:when test="$templatesMappingDoc/templates-mapping/widgets/group[@qooxdooVersion=$qooxdooVersion]/widget[@name=$widgetName]/@contentTemplate">
					<xsl:value-of select="$templatesMappingDoc/templates-mapping/widgets/group[@qooxdooVersion=$qooxdooVersion]/widget[@name=$widgetName]/@contentTemplate"/>
			</xsl:when>

			<!-- in other case get group with necessary qooxdoo version and widget with necessary name (template from group) -->
			<xsl:when test="$templatesMappingDoc/templates-mapping/widgets/group[@qooxdooVersion=$qooxdooVersion]/widget[@name=$widgetName]/../@contentTemplate">
					<xsl:value-of select="$templatesMappingDoc/templates-mapping/widgets/group[@qooxdooVersion=$qooxdooVersion]/widget[@name=$widgetName]/../@contentTemplate"/>
			</xsl:when>
			
			<!--in other case (if qooxdoo version is not defined) get stand alone widget with
				necessary name and without qooxdoo version -->
			<xsl:when test="$templatesMappingDoc/templates-mapping/widgets/widget[@name=$widgetName and not(@qooxdooVersion)]/@contentTemplate">
					<xsl:value-of select="$templatesMappingDoc/templates-mapping/widgets/widget[@name=$widgetName and not(@qooxdooVersion)]/@contentTemplate"/>
			</xsl:when>			
			
			<!--in other case (if qooxdoo version is not defined) get widget in group with
				necessary name and without qooxdoo version for widget and group 
				(template from widget)-->
			<xsl:when test="$templatesMappingDoc/templates-mapping/widgets/group[not(@qooxdooVersion)]/widget[@name=$widgetName and not(@qooxdooVersion)]/@contentTemplate">
					<xsl:value-of select="$templatesMappingDoc/templates-mapping/widgets/group[not(@qooxdooVersion)]/widget[@name=$widgetName and not(@qooxdooVersion)]/@contentTemplate"/>
			</xsl:when>			
			<!--in other case (if qooxdoo version is not defined) get widget in group with
				necessary name and without qooxdoo version for widget and group 
				(template from group)-->
			<xsl:when test="$templatesMappingDoc/templates-mapping/widgets/group[not(@qooxdooVersion)]/widget[@name=$widgetName and not(@qooxdooVersion)]/../@contentTemplate">
					<xsl:value-of select="$templatesMappingDoc/templates-mapping/widgets/group[not(@qooxdooVersion)]/widget[@name=$widgetName and not(@qooxdooVersion)]/../@contentTemplate"/>
			</xsl:when>
						
			<!-- template name is not defined
				will be used template by default
				if template by default is not defined in
				templates-mapping.xml for used version of
				qooxdoo will be used template with name
				DEFAULT_CONTENT_WIDGET_HANDLER -->
			<xsl:otherwise>
				<xsl:choose>
					<xsl:when test="$templatesMappingDoc/templates-mapping/widgets/default-content-template[@qooxdooVersion=$qooxdooVersion]">
						<xsl:value-of select="$templatesMappingDoc/templates-mapping/widgets/default-content-template[@qooxdooVersion=$qooxdooVersion]"/>
					</xsl:when>
					<xsl:when test="$templatesMappingDoc/templates-mapping/widgets/default-content-template[not(@qooxdooVersion)]">
						<xsl:value-of select="$templatesMappingDoc/templates-mapping/widgets/default-content-template[not(@qooxdooVersion)]"/>
					</xsl:when>
					<xsl:otherwise>
						<xsl:text>&DEFAULT_CONTENT_WIDGET_HANDLER;</xsl:text>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:otherwise> 
		</xsl:choose>
	</xsl:template>

	<!-- returns name of add template for current widget and qooxdoo version-->
	<xsl:template name="getAddTemplateName">
		<xsl:param name="widgetName"/>
	  	<xsl:param name="qooxdooVersion"/>
		<xsl:choose>
			<!-- get template for stand alone widget with necessary name and qooxdoo version -->
			<xsl:when test="$templatesMappingDoc/templates-mapping/widgets/widget[@name=$widgetName and @qooxdooVersion=$qooxdooVersion]/@addTemplate">
					<xsl:value-of select="$templatesMappingDoc/templates-mapping/widgets/widget[@name=$widgetName and @qooxdooVersion=$qooxdooVersion]/@addTemplate"/>
			</xsl:when>
			
			<!-- in other case get template in group with necessary name and qooxdoo version -->
			<xsl:when test="$templatesMappingDoc/templates-mapping/widgets/group/widget[@name=$widgetName and @qooxdooVersion=$qooxdooVersion]/@addTemplate">
					<xsl:value-of select="$templatesMappingDoc/templates-mapping/widgets/group/widget[@name=$widgetName and @qooxdooVersion=$qooxdooVersion]/@addTemplate"/>
			</xsl:when>

			<!-- in other case get group with necessary qooxdoo version and widget with necessary name (template from widget)-->
			<xsl:when test="$templatesMappingDoc/templates-mapping/widgets/group[@qooxdooVersion=$qooxdooVersion]/widget[@name=$widgetName]/@addTemplate">
					<xsl:value-of select="$templatesMappingDoc/templates-mapping/widgets/group[@qooxdooVersion=$qooxdooVersion]/widget[@name=$widgetName]/@addTemplate"/>
			</xsl:when>

			<!-- in other case get group with necessary qooxdoo version and widget with necessary name (template from group) -->
			<xsl:when test="$templatesMappingDoc/templates-mapping/widgets/group[@qooxdooVersion=$qooxdooVersion]/widget[@name=$widgetName]/../@addTemplate">
					<xsl:value-of select="$templatesMappingDoc/templates-mapping/widgets/group[@qooxdooVersion=$qooxdooVersion]/widget[@name=$widgetName]/../@addTemplate"/>
			</xsl:when>
			
			<!--in other case (if qooxdoo version is not defined) get stand alone widget with
				necessary name and without qooxdoo version -->
			<xsl:when test="$templatesMappingDoc/templates-mapping/widgets/widget[@name=$widgetName and not(@qooxdooVersion)]/@addTemplate">
					<xsl:value-of select="$templatesMappingDoc/templates-mapping/widgets/widget[@name=$widgetName and not(@qooxdooVersion)]/@addTemplate"/>
			</xsl:when>			
			
			<!--in other case (if qooxdoo version is not defined) get widget in group with
				necessary name and without qooxdoo version for widget and group 
				(template from widget)-->
			<xsl:when test="$templatesMappingDoc/templates-mapping/widgets/group[not(@qooxdooVersion)]/widget[@name=$widgetName and not(@qooxdooVersion)]/@addTemplate">
					<xsl:value-of select="$templatesMappingDoc/templates-mapping/widgets/group[not(@qooxdooVersion)]/widget[@name=$widgetName and not(@qooxdooVersion)]/@addTemplate"/>
			</xsl:when>			
			<!--in other case (if qooxdoo version is not defined) get widget in group with
				necessary name and without qooxdoo version for widget and group 
				(template from group)-->
			<xsl:when test="$templatesMappingDoc/templates-mapping/widgets/group[not(@qooxdooVersion)]/widget[@name=$widgetName and not(@qooxdooVersion)]/../@addTemplate">
					<xsl:value-of select="$templatesMappingDoc/templates-mapping/widgets/group[not(@qooxdooVersion)]/widget[@name=$widgetName and not(@qooxdooVersion)]/../@addTemplate"/>
			</xsl:when>
						
			<!-- template name is not defined
				will be used template by default
				if template by default is not defined in
				templates-mapping.xml for used version of
				qooxdoo will be used template with name
				DEFAULT_ADD_WIDGET_HANDLER -->
			<xsl:otherwise>
				<xsl:choose>
					<xsl:when test="$templatesMappingDoc/templates-mapping/widgets/default-add-template[@qooxdooVersion=$qooxdooVersion]">
						<xsl:value-of select="$templatesMappingDoc/templates-mapping/widgets/default-add-template[@qooxdooVersion=$qooxdooVersion]"/>
					</xsl:when>
					<xsl:when test="$templatesMappingDoc/templates-mapping/widgets/default-add-template[not(@qooxdooVersion)]">
						<xsl:value-of select="$templatesMappingDoc/templates-mapping/widgets/default-add-template[not(@qooxdooVersion)]"/>
					</xsl:when>
					<xsl:otherwise>
						<xsl:text>&DEFAULT_ADD_WIDGET_HANDLER;</xsl:text>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:otherwise> 
		</xsl:choose>
	</xsl:template>
</xsl:stylesheet>