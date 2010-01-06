<?xml version='1.0'?>
<!-- 

	QxTransformer
	Converts QXML to Javascript
	
	License: LGPL
	Autors: Siarhei Barysiuk <s.barysiuk@gmail.com>	
			Christian Boulanger <info@bibliograph.org>

	templates for 'border' attribute processing
	
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


	<!-- border setter template
	Attribute border can be set as:
	- reference to QxBorder
	- preset
	- from string
	--> 
	<qxti:borderAttributeHandler/>
	<xsl:template match="qxti:borderAttributeHandler">
		<xsl:param name="widget"/>
		<xsl:param name="attribute"/>
		
		<xsl:variable name="attributeValue">
			<xsl:call-template name="attributeValue">
				<xsl:with-param name="widget" select="$widget" />
				<xsl:with-param name="value" select="$attribute"/>
			</xsl:call-template>
		</xsl:variable>
		
		<xsl:call-template name="variableName">
			<xsl:with-param name="widget" select="$widget"/>
		</xsl:call-template>
		<xsl:text>.setBorder(</xsl:text>
		<xsl:choose>
 		<!-- attribute value is reference or value of attribute is
		preset and we should delete qoutes from string besause it's
		object but not string-->
			<xsl:when test='not(contains($attributeValue,"&#39;"))'>
				<xsl:value-of select="$attributeValue"/>
			</xsl:when>
			<!-- attribute value is string -->
			<xsl:when test='contains($attributeValue,"&#39;")'>
				<xsl:text>new qx.renderer.border.Border.fromString(</xsl:text>
				<xsl:value-of select='$attributeValue'/>
				<xsl:text>)</xsl:text>				
			</xsl:when>
			<xsl:otherwise/>
		</xsl:choose>
		<xsl:text>);&CR;</xsl:text>
	</xsl:template>


</xsl:stylesheet>