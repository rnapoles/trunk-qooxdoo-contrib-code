<?xml version='1.0'?>
<!-- 

	QxTransformer
	Converts QXML to Javascript
	
	License: LGPL
	Autors: Siarhei Barysiuk <s.barysiuk@gmail.com>	
			Christian Boulanger <info@bibliograph.org>

	templates for 'tooltip' attribute processing
	
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

	<!-- add tooltips, simple implementation -->
	<xsl:template match="qxti:tooltipAttributeHandler" name="tooltipAttributeHandler">
		<xsl:param name="widget"/>
		<xsl:param name="attribute"/>
		<xsl:call-template name="variableName">
			<xsl:with-param name="widget" select="$widget"/>
		</xsl:call-template>
		<xsl:text>.setToolTip(new qx.ui.popup.ToolTip(</xsl:text>
		<xsl:call-template name="attributeValuePlain">
			<xsl:with-param name="widget" select="$widget"/>
			<xsl:with-param name="attribute" select="$attribute"/>
			<xsl:with-param name="value">
				<xsl:value-of select="$attribute"/>
			</xsl:with-param>
		</xsl:call-template>
		<xsl:text>));&CR;</xsl:text>
	</xsl:template>	


</xsl:stylesheet>