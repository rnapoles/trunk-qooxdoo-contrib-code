<?xml version='1.0'?>
<!-- 

	QxTransformer
	Converts QXML to Javascript
	
	License: LGPL
	Autors: Siarhei Barysiuk <s.barysiuk@gmail.com>	
			Christian Boulanger <info@bibliograph.org>

	templates for 'padding' attribute processing
	
 -->
<!DOCTYPE stylesheet [
	<!ENTITY UPPERCASE 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'>
	<!ENTITY NUMBER "1234567890">
	<!ENTITY LOWERCASE 'abcdefghijklmnopqrstuvwxyz'>
	<!ENTITY UPPER_TO_LOWER " '&UPPERCASE;' , '&LOWERCASE;' ">
	<!ENTITY LOWER_TO_UPPER " '&LOWERCASE;' , '&UPPERCASE;' ">
	<!ENTITY CR '&#13;&#10;'>
]>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:qx="http://www.qxtransformer.org/qooxdoo"
	xmlns:qxti="http://www.qxtransformer.org/internal"
	xmlns:qxt="http://www.qxtransformer.org/extension"
	xmlns:exsl="http://exslt.org/common">

	<!-- setter pattern for padding.
	Attribute padding can be set as:
	- reference to QxBorder
	- values separated by comma
	- one value
	-->
	<xsl:template match="qxti:paddingAttributeHandler">
		<xsl:param name="widget"/>
		<xsl:param name="attribute"/>
		<!--get value of attribute-->
		<xsl:variable name="attributeValue">
			<xsl:call-template name="attributeValue">
				<xsl:with-param name="widget" select="$widget" />
				<xsl:with-param name="value" select="$attribute"/>
			</xsl:call-template>
		</xsl:variable>
		<xsl:call-template name="variableName">
			<xsl:with-param name="widget" select="$widget"/>
		</xsl:call-template>
		<xsl:text>.setPadding(</xsl:text>
			<xsl:value-of select="$attributeValue"/>
		<xsl:text>);&CR;</xsl:text>
	</xsl:template>

</xsl:stylesheet>