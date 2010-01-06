<?xml version='1.0'?>
<!-- 

	QxTransformer
	Converts QXML to Javascript
	
	License: LGPL
	Autors: Siarhei Barysiuk <s.barysiuk@gmail.com>	
			Christian Boulanger <info@bibliograph.org>

	templates for "xml2json" widget processing
	
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

	<xsl:include href="../../common/xml2json.xsl" /> 
	
	<!-- converts an xml structure into json -->
	<xsl:template match="qxti:xml2jsonContentWidgetHandler">
		<xsl:param name="widget"/>
		
		<xsl:if test="$widget/@scope='local' or not($widget/@scope)">
			<xsl:text>var </xsl:text>
		</xsl:if>	
		<xsl:call-template name="variableName">
			<xsl:with-param name="widget" select="$widget"/>
		</xsl:call-template>
		<xsl:text> = </xsl:text>
		<xsl:call-template name="processXMLtoJSON">
			<xsl:with-param name="topNode" select="$widget"/>
			<xsl:with-param name="isPrettyPrintEnabled" select="string($widget/@prettyPrint)='true'"/>
		</xsl:call-template>
		<xsl:text>;</xsl:text>
			
			
			<!--xsl:choose>
				<xsl:when test="$widget/@id and name($widget/..)!='qx:xml2json'">
					<xsl:if test="not($widget/@scope='global')">var </xsl:if>
					<xsl:value-of select="$widget/@id"/>
					<xsl:if test="$widget/@type='array'">=[</xsl:if>
					<xsl:if test="not($widget/@type='array')">={</xsl:if>
				</xsl:when>
			<xsl:otherwise>
				<xsl:choose>
					<xsl:when test="$widget/@key">
						<xsl:value-of select="$widget/@key"/>
						<xsl:text>:</xsl:text>
						
					</xsl:when>
				</xsl:choose>
			</xsl:otherwise>
		</xsl:choose-->
	</xsl:template>


</xsl:stylesheet>