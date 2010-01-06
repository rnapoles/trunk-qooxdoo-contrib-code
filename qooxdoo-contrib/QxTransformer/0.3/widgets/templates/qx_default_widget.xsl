<?xml version='1.0'?>
<!-- 

	QxTransformer
	Converts QXML to Javascript
	
	License: LGPL
	Autors: Siarhei Barysiuk <s.barysiuk@gmail.com>	
			Christian Boulanger <info@bibliograph.org>

	default add and content templates
	
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
	<!ENTITY DEBUG 'no'>

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


	<!-- main template for widget objects -->
	<xsl:template match="qxti:defaultContentWidgetHandler">
	
		<xsl:param name="widget"/>
		<xsl:param name="addTemplateName" select="'&DEFAULT_ADD_TEMPLATE;'"/>
		<xsl:param name="expandedDocument" />
		<xsl:param name="preventApplyWidgetTemplates" select="false()"/> 

		<xsl:text>&CR;</xsl:text>
		
        <xsl:if test="'&DEBUG;'='yes'">
			<xsl:call-template name="log.info">
				<xsl:with-param name="message">
					<xsl:text>Processing </xsl:text>
					<xsl:value-of select="name($widget)"/>
					<xsl:text> with default content handler.</xsl:text>
				</xsl:with-param>
			</xsl:call-template>
		</xsl:if>
        
        <!-- create widget object including constructor vars -->
		<xsl:call-template name="creator">
			<xsl:with-param name="widget" select="$widget"/>
			<xsl:with-param name="expandedDocument" select="$expandedDocument"/>
		</xsl:call-template>
		
   <!-- add attributes -->
   <xsl:call-template name="attributesProcessing">
			<xsl:with-param name="widget" select="$widget"/>
			<xsl:with-param name="expandedDocument" select="$expandedDocument"/>
		</xsl:call-template>
		
        <!-- choose add handler -->
		<xsl:choose>
			<xsl:when test="$addTemplateName=''">
				<xsl:apply-templates select="$dynamicWidgetTemplatesTree/qxti:templates/qxti:*[local-name()='&DEFAULT_ADD_TEMPLATE;'][1]">
					<xsl:with-param name="widget" select="$widget"/>
					<xsl:with-param name="expandedDocument" select="$expandedDocument"/>
				</xsl:apply-templates>		
			</xsl:when>
			<xsl:otherwise>
				<xsl:apply-templates select="$dynamicWidgetTemplatesTree/qxti:templates/qxti:*[local-name()=$addTemplateName][1]">
					<xsl:with-param name="widget" select="$widget"/>
					<xsl:with-param name="expandedDocument" select="$expandedDocument"/>
				</xsl:apply-templates>		
			</xsl:otherwise>
		</xsl:choose>
		
        <!-- process children -->
		<xsl:if test="not($preventApplyWidgetTemplates)">
			<xsl:apply-templates select="$widget/*" >
				<xsl:with-param name="expandedDocument" select="$expandedDocument"/>	
			</xsl:apply-templates>
		</xsl:if>
		        
	</xsl:template>
	
	<!-- default handler to add child to its parent or to top widget-->
	<xsl:template match="qxti:defaultAddWidgetHandler">
		<xsl:param name="expandedDocument"/>
		<xsl:param name="widget"/>
		<xsl:param name="modifier" select="''"/>
		
		<xsl:variable name="element" select="name($widget)"/>
		<xsl:variable name="parent" select="name($widget/..)"/>
        
		<!-- which widget to add to? -->
		<xsl:call-template name="getParent">
			<xsl:with-param name="widget" select="$widget"/>
			<xsl:with-param name="modifier" select="$modifier"/>
		</xsl:call-template>

		<!-- add -->
		<xsl:choose>
			<xsl:when test="$widget/@qxt:position">
  			<!-- add child at specific position -->
				<xsl:text>.addAt(</xsl:text>
    		<xsl:call-template name="variableName">
    			<xsl:with-param name="widget" select="$widget"/>
    		</xsl:call-template>
				<xsl:text>,</xsl:text>
				<xsl:value-of select="$widget/@qxt:position"/>
			</xsl:when>
			<xsl:otherwise>
				<!-- add at last position -->
				<xsl:text>.add(</xsl:text>
    		<xsl:call-template name="variableName">
    			<xsl:with-param name="widget" select="$widget"/>
    		</xsl:call-template>
			</xsl:otherwise>
		</xsl:choose>
		<xsl:text>);&CR;</xsl:text>
		
	</xsl:template>

</xsl:stylesheet>