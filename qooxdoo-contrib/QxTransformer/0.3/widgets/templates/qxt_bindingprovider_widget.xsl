<?xml version='1.0'?>
<!-- 

	QxTransformer
	Converts QXML to Javascript
	
	License: LGPL
	Autors: Siarhei Barysiuk <s.barysiuk@gmail.com>	
			Christian Boulanger <info@bibliograph.org>

	templates for "###" widget processing
	
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


	<xsl:template match="qxti:bindingProviderContentWidgetHandler">
		<xsl:param name="widget"/>
		
		<xsl:text>&CR;</xsl:text> 
		<xsl:text>var </xsl:text>
		<xsl:call-template name="variableName">
			<xsl:with-param name="widget" select="$widget"/>
		</xsl:call-template>
		<xsl:text> = new </xsl:text>
		<xsl:value-of select="$widget/@class"/>
		<xsl:text>();&CR;</xsl:text>
		
		<xsl:for-each select="$widget/qxt:param">
			<xsl:choose>
				<xsl:when test="not(./@name)">
					<xsl:text>//unable to process param with empty name</xsl:text>
				</xsl:when>
				<xsl:otherwise>
					<xsl:call-template name="variableName">
						<xsl:with-param name="widget" select="$widget"/>
					</xsl:call-template>
					<xsl:text>.set</xsl:text>

					<xsl:call-template name="titleCaseString">
						<xsl:with-param name="string" select="string(./@name)"/>
					</xsl:call-template>
					<xsl:text>(</xsl:text>
					<xsl:call-template name="attributeValuePlain">
						<xsl:with-param name="widget" select="$widget" />
						<xsl:with-param name="value" select="./@value"/>
						<xsl:with-param name="attribute" select="./@value"/>
					</xsl:call-template>
					<xsl:text>);&CR;</xsl:text> 
					
				</xsl:otherwise>
			</xsl:choose>
		</xsl:for-each>
		
		 
		<xsl:text>&CR;</xsl:text> 

	
	</xsl:template>


</xsl:stylesheet>