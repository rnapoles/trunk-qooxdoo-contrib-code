<?xml version='1.0'?>
<!-- 

	QxTransformer
	Converts QXML to Javascript
	
	License: LGPL
	Autors: Siarhei Barysiuk <s.barysiuk@gmail.com>	
			Christian Boulanger <info@bibliograph.org>

	templates for 'backgroundColor' attribute processing
	
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

	<!-- background color setter template.
	Background color can be set as:
	- reference to QxColor
	- name of color (QxColor will be created inline)
    
	    CB: this is obsolete - there is a setBackgroundColor(string color) 
	    function in 0.7
	-->
	<xsl:template match="qxti:backgroundColorAttributeHandler">
		<xsl:param name="widget"/>
		<xsl:param name="attribute"/>
	
		<xsl:variable name="attributeValue">
			<xsl:call-template name="attributeValue">
				<xsl:with-param name="widget" select="$widget" />
				<xsl:with-param name="value" select="$attribute"/>
			</xsl:call-template>
		</xsl:variable>
		<xsl:call-template name="variableName">
			<xsl:with-param name="widget" select="$widget" />
		</xsl:call-template>
		<xsl:text>.setBackgroundColor(</xsl:text>
		<xsl:choose>
			<!-- atribute is string (name of color) and contains qoutes. Create color automatically-->
			<xsl:when test='contains($attributeValue,"&#39;")'>
				<xsl:call-template name="createColorWidget">
					<xsl:with-param name="value" select="$attributeValue"/>
				</xsl:call-template>
			</xsl:when>
			<xsl:otherwise>
				<xsl:value-of select="$attributeValue"/>
			</xsl:otherwise>
		</xsl:choose>
		<xsl:text>);&CR;</xsl:text>
	</xsl:template>

	<xsl:template name="createColorWidget">
		<xsl:param name="value"/>
		<xsl:choose>
			<xsl:when test='contains($value,"#")'>
				<xsl:text>new qx.renderer.color.Color(</xsl:text>
			</xsl:when>
			<xsl:otherwise>
				<xsl:text>new qx.renderer.color.ColorObject.fromString(</xsl:text>
			</xsl:otherwise>
		</xsl:choose>
		<xsl:value-of select="$value"/>
		<xsl:text>)</xsl:text>
	</xsl:template>

</xsl:stylesheet>