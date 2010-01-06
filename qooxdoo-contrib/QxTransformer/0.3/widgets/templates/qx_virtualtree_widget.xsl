<?xml version='1.0'?>
<!-- 

	QxTransformer
	Converts QXML to Javascript
	
	License: LGPL
	Autors: Siarhei Barysiuk <s.barysiuk@gmail.com>	
			Christian Boulanger <info@bibliograph.org>

	templates for "VirtualTree" widget processing
	
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


	<!-- Virtual Tree Widget -->
	<xsl:template match="qxti:virtualTreeContentWidgetHandler">
	
		<xsl:param name="widget"/>
		<xsl:param name="expandedDocument" />

		<!-- headings -->
		<xsl:variable name="constructorParamString">
			<xsl:text>['</xsl:text>
			<xsl:for-each select="$widget/qx:virtualTreeColumn">
				<xsl:value-of select="./@heading"/>
				<xsl:if test="not(position()=last())">
					<xsl:text>','</xsl:text>
				</xsl:if>
			</xsl:for-each>
			<xsl:text>']</xsl:text>
		</xsl:variable>		
		
		<!-- create widget object including constructor vars -->
		<xsl:text>&CR;</xsl:text>
		<xsl:call-template name="creator">
			<xsl:with-param name="widget" select="$widget"/>
			<xsl:with-param name="expandedDocument" select="$expandedDocument"/>
			<xsl:with-param name="constructorParamString" select="$constructorParamString"/>
		</xsl:call-template>
		
		<!-- selection mode -->
		<xsl:call-template name="variableName">
			<xsl:with-param name="widget" select="$widget"/>
		</xsl:call-template>
		<xsl:text>.setSelectionMode(qx.ui.treevirtual.TreeVirtual.SelectionMode.</xsl:text>			
		<xsl:choose>
			<xsl:when test="$widget/@selectionMode = 'multipleInterval'">
				<xsl:text>MULTIPLE_INTERVAL</xsl:text>
			</xsl:when>
			<xsl:when test="$widget/@selectionMode = 'none'">
				<xsl:text>NONE</xsl:text>
			</xsl:when>
			<xsl:when test="$widget/@selectionMode = 'singleInterval'">			
				<xsl:text>SINGLE_INTERVAL</xsl:text>
			</xsl:when>
			<xsl:otherwise>			
				<xsl:text>SINGLE</xsl:text>
			</xsl:otherwise>
		</xsl:choose>
		<xsl:text>);&CR;</xsl:text>
		
    <!-- add attributes -->
    <xsl:call-template name="attributesProcessing">
			<xsl:with-param name="widget" select="$widget"/>
			<xsl:with-param name="exclude" select="'selectionMode'"/>
			<xsl:with-param name="expandedDocument" select="$expandedDocument"/>
		</xsl:call-template>
		
		<!-- virtualTreeColumns setting, todo: generalize this pattern -->
		<xsl:for-each select="$widget/qx:virtualTreeColumn">
			<xsl:if test="./@width or ./@minWidth">
				<xsl:call-template name="variableName">
					<xsl:with-param name="widget" select="$widget" />
				</xsl:call-template>
				<xsl:text>.getTableColumnModel().getBehavior().set(</xsl:text>
				<xsl:value-of select="position()-1" />
				<xsl:text>,{</xsl:text>
				<xsl:if test="./@width">
					<xsl:text>width:"</xsl:text>
					<xsl:value-of select="./@width" />
					<xsl:text>"</xsl:text>
					<xsl:if test="./@minWidth">,</xsl:if>
				</xsl:if>
				<xsl:if test="./@minWidth">
					<xsl:text>minWidth:"</xsl:text>
					<xsl:value-of select="./@minWidth" />
					<xsl:text>"</xsl:text>
				</xsl:if>	
     			<xsl:text>});&CR;</xsl:text>
			</xsl:if>
		</xsl:for-each>

		<!-- add to parent -->
		<xsl:apply-templates select="$dynamicWidgetTemplatesTree/qxti:templates/qxti:*[local-name()='&DEFAULT_ADD_TEMPLATE;'][1]">
			<xsl:with-param name="widget" select="$widget"/>
			<xsl:with-param name="expandedDocument" select="$expandedDocument"/>
		</xsl:apply-templates>
		
		<!-- add event listeners etc. -->
		<xsl:apply-templates select="$widget/*" >
			<xsl:with-param name="expandedDocument" select="$expandedDocument"/>
		</xsl:apply-templates>		
		
	</xsl:template>


</xsl:stylesheet>