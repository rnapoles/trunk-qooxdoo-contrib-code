<?xml version='1.0'?>
<!-- 

	QxTransformer
	Converts QXML to Javascript
	
	License: LGPL
	Autors: Siarhei Barysiuk <s.barysiuk@gmail.com>	
			Christian Boulanger <info@bibliograph.org>

	templates for 'style' attribute processing
	
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

	<!-- define a style attribute for a widget as "param:value; param2:value2; ..."
		 params: 
		 - widget with this attribute
		 - attribute
		 - attributeValue (for recursive call)
	-->
	<xsl:template match="qxti:styleAttributeHandler" name="styleAttributeHandler">
		<xsl:param name="widget"/>
		<xsl:param name="attribute"/>
		<xsl:param name="attributeValue" select="''"/>

		<xsl:variable name="attributeValueVar">
			<xsl:choose>
				<xsl:when test="$attributeValue=''">
					<xsl:value-of select="$attribute"/>
				</xsl:when>
				<xsl:otherwise>
					<xsl:value-of select="$attributeValue"/>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		
		<xsl:variable name="param" select="substring-before($attributeValueVar,':')"/>
		<xsl:variable name="value" select="substring-after(substring-before($attributeValueVar,';'),':')"/>
			
		<xsl:if test="$attributeValueVar">
			<xsl:call-template name="variableName">
				<xsl:with-param name="widget" select="$widget"/>
			</xsl:call-template>
			<xsl:text>.setStyleProperty("</xsl:text>
			<xsl:value-of select="$param"/>
			<xsl:text>", "</xsl:text>
			<xsl:value-of select="$value"/>
			<xsl:text>");&CR;</xsl:text>
		</xsl:if>

		<xsl:if test="substring-after($attributeValueVar,';')">
			<xsl:call-template name="styleAttributeHandler">
				<xsl:with-param name="widget" select="$widget"/>
				<xsl:with-param name="attributeValue" select="substring-after($attributeValueVar,';')"/>
			</xsl:call-template>
		</xsl:if>
	</xsl:template>


</xsl:stylesheet>