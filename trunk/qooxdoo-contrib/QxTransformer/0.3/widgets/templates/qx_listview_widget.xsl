<?xml version='1.0'?>
<!-- 

	QxTransformer
	Converts QXML to Javascript
	
	License: LGPL
	Autors: Siarhei Barysiuk <s.barysiuk@gmail.com>	
			Christian Boulanger <info@bibliograph.org>

	templates for "listView" widget processing
	
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

	<!-- List view widget -->
	<xsl:template match="qxti:listViewContentWidgetHandler">
		<xsl:param name="widget"/>
		<xsl:param name="addTemplateName"/>

		<xsl:variable name="columns">
				<xsl:for-each select="$widget/*[name(.)='qx:listViewColumn']">
					<xsl:element name="{./@id}">
					<xsl:for-each select="./@*[name(.)!='id']">
						<xsl:element name="{local-name(.)}">
							<xsl:value-of select="."/>
						</xsl:element>
					</xsl:for-each>
					</xsl:element>
				</xsl:for-each>
		</xsl:variable>

		<xsl:variable name="columnsConstructorArg">
			<xsl:call-template name="variableName">
				<xsl:with-param name="widget" select="$widget"/>
			</xsl:call-template>
			<xsl:text>_columns</xsl:text>
		</xsl:variable>

		<xsl:text>&CR;var </xsl:text>
		<xsl:value-of select="$columnsConstructorArg"/>
		<xsl:text> = </xsl:text>
		<xsl:call-template name="processXMLtoJSON">
			<xsl:with-param name="topNode" select="exsl:node-set($columns)"/>
			<xsl:with-param name="isPrettyPrintEnabled" select="true()"/>
		</xsl:call-template>
		<xsl:text>;</xsl:text>

		<xsl:for-each select="$widget/*[name(.)='qx:xml2json']">
			<xsl:text>&CR;var </xsl:text>
			<xsl:call-template name="variableName">
				<xsl:with-param name="widget" select="."/>
			</xsl:call-template>
			<xsl:text> = </xsl:text>
			<xsl:call-template name="processXMLtoJSON">
				<xsl:with-param name="topNode" select="."/>
				<xsl:with-param name="isPrettyPrintEnabled" select="string(./@prettyPrint)='true'"/>
			</xsl:call-template>
			<xsl:text>;</xsl:text>
		</xsl:for-each>

		<xsl:variable name="dataConstructorArg">
			<xsl:choose>
				<xsl:when test="$widget/@data">
				<xsl:value-of select="$widget/@data"/>
				</xsl:when>
				<xsl:when test="$widget/*[name(.)='qx:xml2json']">
					<xsl:call-template name="variableName">
						<xsl:with-param name="widget" select="$widget/*[name(.)='qx:xml2json']"/>
					</xsl:call-template>							
				</xsl:when>
				<xsl:otherwise>
					<xsl:text>null</xsl:text>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:variable> 

		<xsl:variable name="listViewElement">

			<!--xsl:if test="string($dataConstructorArg)!='null'">
				<xsl:element name="qx:xml2json">
					<xsl:attribute name="id">
						<xsl:value-of select="$dataConstructorArg"/>
					</xsl:attribute>
				</xsl:element>
			</xsl:if-->

			<!--xsl:element name="qx:xml2json">
				<xsl:attribute name="id">
					<xsl:value-of select="$columnsConstructorArg"/>
				</xsl:attribute>
			</xsl:element-->		

			<xsl:element name="qx:listView">
				<xsl:copy-of select="$widget/@*[name(.)!='data' and not(contains(name(.),'Xmlns:'))]"/>
				<xsl:attribute name="data">
						<xsl:value-of select="$dataConstructorArg"/>
				</xsl:attribute>
				<xsl:attribute name="qxt:dataType">reference</xsl:attribute>
				<xsl:attribute name="columns">
						<xsl:value-of select="$columnsConstructorArg"/>
				</xsl:attribute>
				<xsl:attribute name="qxt:columnsType">reference</xsl:attribute>
				<xsl:attribute name="qxt:parent">
					<xsl:call-template name="getParent">
						<xsl:with-param name="widget" select="$widget"/>
					</xsl:call-template>
				</xsl:attribute>
			</xsl:element>
		</xsl:variable>

		<!-- process widget and standard attributes -->
		<xsl:apply-templates select="$dynamicWidgetTemplatesTree/qxti:templates/qxti:defaultContentWidgetHandler[1]">
			<xsl:with-param name="widget" select="exsl:node-set($listViewElement)/*[name(.)='qx:listView']"/>
			<xsl:with-param name="addTemplateName" select="$addTemplateName"/>
			<xsl:with-param name="preventApplyWidgetTemplates" select="true()"/>
		</xsl:apply-templates>
		<!-- end of processing widget and standard attributes -->

	</xsl:template>


</xsl:stylesheet>