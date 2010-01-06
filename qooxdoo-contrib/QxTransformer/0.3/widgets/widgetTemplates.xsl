<?xml version='1.0'?>
<!-- 

	QxTransformer
	Converts QXML to Javascript
	
	License: LGPL
	Autors: Siarhei Barysiuk <s.barysiuk@gmail.com>	
			Christian Boulanger <info@bibliograph.org>

	templates for widget processing
	
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
	<!ENTITY PREFIX 'qx_'>
	<!ENTITY DEBUG 'yes'>

	<!ENTITY DEFAULT_ADD_TEMPLATE 'defaultAddWidgetHandler'>
	<!ENTITY EMPTY_WIDGET_HANDLER 'emptyWidgetHandler'>
	
	<!ENTITY MACRO_SRC_ATTRIBUTE 'src'>
	<!ENTITY MACRO_NAME_ATTRIBUTE 'name'>
	<!ENTITY MACRO_DEFINITION_TAG 'qxt:define-macro'>
	<!ENTITY MACRO_USAGE_TAG 'qxt:use-macro'>

	<!ENTITY INCLUDE_SRC_ATTRIBUTE 'src'>
]>

<xsl:stylesheet version="1.0" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:qx="http://www.qxtransformer.org/qooxdoo"
	xmlns:qxti="http://www.qxtransformer.org/internal"
	xmlns:qxt="http://www.qxtransformer.org/extension"
	xmlns:exsl="http://exslt.org/common">

	<!-- top widgets -->
	<xsl:include href="./templates/qx_application_widget.xsl"/>
	<xsl:include href="./templates/qx_widget_widget.xsl"/>
	
	<!-- dynamically mapped widgets -->
	<xsl:include href="./templates/add_templates.xsl"/>
	<xsl:include href="./templates/qx_default_widget.xsl"/>
	<xsl:include href="./templates/qx_empty_widget.xsl"/>
	<xsl:include href="./templates/qx_eventlistener_widget.xsl"/>
	<xsl:include href="./templates/qx_globaleventlistener_widget.xsl"/>
	<xsl:include href="./templates/qx_messagesubscriber_widget.xsl"/>
	<xsl:include href="./templates/qx_gridlayout_widget.xsl"/>
	<xsl:include href="./templates/qx_label_widget.xsl"/>
	<xsl:include href="./templates/qx_listview_widget.xsl"/>
	<xsl:include href="./templates/qx_table_widget.xsl"/>
	<xsl:include href="./templates/qx_script_widget.xsl"/>
  <xsl:include href="./templates/qx_splitpane_widget.xsl"/>
  <xsl:include href="./templates/qx_virtualtree_widget.xsl"/>
	<xsl:include href="./templates/qx_xml2json_widget.xsl"/>
	<xsl:include href="./templates/qxt_bindingprovider_widget.xsl"/>
	<xsl:include href="./templates/qxt_broadcaster_widget.xsl"/>
	<xsl:include href="./templates/qxt_observer_widget.xsl"/>
	<xsl:include href="./templates/qxt_form_widget.xsl"/>
	<xsl:include href="./templates/qx_security.xsl"/> 
	<xsl:include href="./templates/qcl_configchangelistener_widget.xsl"/>
	
	<!-- template for processing qxt:use-macro tag -->
	<xsl:template name="processMacroWidget">
		<xsl:param name="widget"/>
		
		
		<xsl:variable name="macroSrc" select="$widget/@&MACRO_SRC_ATTRIBUTE;"/>
		<xsl:variable name="macroName" select="$widget/@&MACRO_NAME_ATTRIBUTE;"/>

		<xsl:if test="$macroName and $macroSrc">
			<xsl:variable name="doc" select="document(concat($projectRootDir,$macroSrc))"/>
			<xsl:variable name="macroDocument" select="document(concat($projectRootDir,$macroSrc))/*//*[name(.)='&MACRO_DEFINITION_TAG;' and ./@name=$macroName]"/>
			
			<xsl:variable name="inputAttributes" select="$widget/@*[name(.)!='&MACRO_SRC_ATTRIBUTE;']"/>
			
				<xsl:element name="tmp">
				<xsl:call-template name="fillMacroDefinition">
					<xsl:with-param name="widgets" select="$macroDocument/*"/>
					<xsl:with-param name="inputAttributes" select="$inputAttributes"/>
				</xsl:call-template>
				</xsl:element>
	
		</xsl:if>
	</xsl:template>
	
	<xsl:template name="fillMacroDefinition">
		<xsl:param name="widgets"/>
		<xsl:param name="inputAttributes"/>
		<xsl:for-each select="$widgets">
			<xsl:variable name="widget" select="."/>  
			<xsl:copy>
			<xsl:for-each select="$widget/@*">
			<xsl:variable name="isContains" select="not(contains(name(.),'xmlns'))"/>
			<xsl:choose>
				<!-- variable in macro -->
				<xsl:when test="starts-with(.,'$')">
					<xsl:variable name="variableName" select="substring-after(.,'$')"/>
					<xsl:attribute name="{name(.)}">
						<xsl:value-of select="$inputAttributes[name(.)=$variableName]"/>
					</xsl:attribute>
				</xsl:when>
				<!-- plain attribute in macro -->
				<xsl:otherwise>
					<xsl:copy-of select="."/>
				</xsl:otherwise>
			</xsl:choose>
			</xsl:for-each>
			<xsl:call-template name="fillMacroDefinition">
				<xsl:with-param name="widgets" select="$widget/*"/>
				<xsl:with-param name="inputAttributes" select="$inputAttributes"/>
			</xsl:call-template>  
		</xsl:copy>
		</xsl:for-each>
	</xsl:template>
	
	<!-- 
    	Main widget constructor
    	
    	- if you provide a constructorParamString param, this will be used as constructor arguments,
    	  otherwise the tags config document will be parsed for attributes passed as constructor
    	  arguments
    -->
	<xsl:template name="creator">

		<xsl:param name="widget"/>
		<xsl:param name="constructorParamString" />
		<xsl:param name="expandedDocument" />
		
		<xsl:variable name="node" select="$widget"/>
		<xsl:variable name="tagname" select="name($widget)"/>
		<xsl:variable name="prefix" select="substring-before(name($widget),':')"/>

		<!-- variable name -->
		
		<!-- 
			scope: 
			- "local" or missing: a local variable
			- see also template "variableName"
		-->
		<xsl:if test="$widget/@scope='local' or not($widget/@scope)">
			<xsl:text>var </xsl:text>
		</xsl:if>	
		
		<!-- template returns name from attribute id or if id doesn't exist
		 then autogenerated name -->
		<xsl:call-template name="variableName">
			<xsl:with-param name="widget" select="$widget"/>
		</xsl:call-template>
		
		<!-- instance or singleton? -->
		<xsl:variable name="objectType"      select="$tagsDoc//tag[@version=$qooxdooVersion and @name=$tagname][1]/@type" />
		<xsl:variable name="objectClassName" select="$tagsDoc//tag[@version=$qooxdooVersion and @name=$tagname][1]/@class"/>
		
		<xsl:text> = </xsl:text>
		
		<xsl:choose>
		
			<!-- singleton -->
			<xsl:when test="$objectType = 'singleton'">
				<xsl:value-of select="$objectClassName" />
				<xsl:text>.getInstance();&CR;</xsl:text>
			</xsl:when>
			
			<!-- instance -->
			<xsl:otherwise>
				<xsl:text>new </xsl:text>
        
        <!-- output class connected to tag or abort with error -->
        <xsl:choose>
          <xsl:when test="$objectClassName != ''">
				    <xsl:value-of select="$objectClassName" />
				  </xsl:when>
          <xsl:otherwise>
            <xsl:message terminate="yes">
              <xsl:text>&CR;  ### Error: Unknown tag "</xsl:text>
              <xsl:value-of select="$tagname"/>
              <xsl:text>" ###&CR;&CR;</xsl:text>
            </xsl:message>          
          </xsl:otherwise>
        </xsl:choose>
        
				<!-- constructor parameters -->
				<xsl:text>(</xsl:text>
				<xsl:choose>
					<xsl:when test="$constructorParamString">
						<xsl:value-of select="$constructorParamString"/>
					</xsl:when>
					<xsl:otherwise>
						<xsl:call-template name="constructorParams">
							<xsl:with-param name="node" select="$node"/>
							<xsl:with-param name="arguments" select="$tagsDoc//tag[@version=$qooxdooVersion and @name=$tagname][1]/@args"/>
						</xsl:call-template>
					</xsl:otherwise>
				</xsl:choose>
				<xsl:text>);&CR;</xsl:text>
				
    	</xsl:otherwise>
    </xsl:choose>
    
		<!-- id can be in global scope or in local (by default, without any definition) scope -->
		<!--xsl:if test="$widget/@id">
			<-add 'var' if scope isn't global->
			<xsl:if test="not($widget/@scope) or $widget/@scope!='global'">
				<xsl:text>var </xsl:text>
			</xsl:if>
			<-define variable->
			<xsl:value-of select="$widget/@id"/> = <xsl:call-template name="variableName"><xsl:with-param name="widget" select="$widget"/></xsl:call-template>
			<xsl:text>;&CR;</xsl:text>
		</xsl:if-->
	</xsl:template>

	<!--this sets constructor parameters, if any -->
	<xsl:template name="constructorParams">
		<xsl:param name="arguments"/>
		<xsl:param name="node"/>
		<xsl:if test="$arguments">
			<xsl:choose>
				<xsl:when test="contains($arguments,',')">
					<xsl:variable name="attribute" select="substring-before($arguments,',')"/>
					<xsl:variable name="attributeValue" select="$node/@*[name()=$attribute]"/>
					<xsl:choose>
						<xsl:when test="$attributeValue">
							<xsl:call-template name="attributeValuePlain">
								<xsl:with-param name="widget" select="$node"/>
								<xsl:with-param name="value" select="$attributeValue"/>
								<xsl:with-param name="attribute" select="$attributeValue"/>
								<xsl:with-param name="useTranslation">
									<xsl:value-of select="$templatesMappingDoc/root/attributes/group[@name='attributesForTranslation']/attribute[@name=$attribute and (not(@context) or contains(@context,name($node)))]"/>							
								</xsl:with-param>
							</xsl:call-template>
						</xsl:when>
						<xsl:otherwise>null</xsl:otherwise>
					</xsl:choose>
					<xsl:text>,</xsl:text>
					<xsl:call-template name="constructorParams">
						<xsl:with-param name="arguments" select="substring-after($arguments,',')"/>
						<xsl:with-param name="node" select="$node"/>
					</xsl:call-template>
				</xsl:when>
				<xsl:otherwise>
					<xsl:variable name="attributeValue" select="$node/@*[name()=$arguments]"/>
					<xsl:choose>
						<xsl:when test="$attributeValue">
							<xsl:call-template name="attributeValuePlain">
								<xsl:with-param name="widget" select="$node"/>
								<xsl:with-param name="value" select="$attributeValue"/>
								<xsl:with-param name="attribute" select="$attributeValue"/>
								<xsl:with-param name="useTranslation">
									<xsl:value-of select="$templatesMappingDoc/root/attributes/group[@name='attributesForTranslation']/attribute[ @name=$arguments and (not(@context) or contains(@context,name($node)))]"/>							
								</xsl:with-param>
							</xsl:call-template>
						</xsl:when>
						<xsl:otherwise>null</xsl:otherwise>
					</xsl:choose>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:if>
	</xsl:template>

</xsl:stylesheet>