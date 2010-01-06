<?xml version='1.0'?>
<!-- 

	QxTransformer
	Converts QXML to Javascript
	
	License: LGPL
	Autors: Siarhei Barysiuk <s.barysiuk@gmail.com>	
			Christian Boulanger <info@bibliograph.org>

	templates for event listener (onFoo) attribute
	
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


	<!-- add event listeners trough onFoo attribute -->
	<xsl:template match="qxti:eventListenerAttributeHandler">
	
		<xsl:param name="attribute" />
		<xsl:param name="expandedDocument" />
		
		<xsl:text>&CR;</xsl:text>
		<xsl:variable name="name" select="name($attribute)"/>
		<xsl:variable name="value" select="$attribute"/>
		<xsl:variable name="firstLetter" select="substring($name,3,1)"/>
		<xsl:variable name="otherLetters" select="substring($name,4,string-length($name))"/>
		<xsl:call-template name="parentName">
			<xsl:with-param name="widget" select="$attribute"/>
		</xsl:call-template>
		<xsl:text>.addEventListener("</xsl:text>
		<xsl:value-of select="translate($firstLetter,&UPPER_TO_LOWER;)"/>
		<xsl:value-of select="$otherLetters"/>
		<xsl:text>",</xsl:text>
		<!-- if class method exists that is equal to the attribute, delegate to it, otherwise
			treat as javascript --> 
		<xsl:choose>
			<xsl:when test="exsl:object-type($expandedDocument)='node-set' and $expandedDocument//qx:eventHandler[@name=$value]">
				<xsl:text>this.</xsl:text>
				<xsl:value-of select="$value"/>		
			</xsl:when>
			<xsl:otherwise>
				<xsl:text>function(event)&CR;{&CR;</xsl:text>
				<xsl:value-of select="$value"/>		
				<xsl:text>&CR;}</xsl:text>
			</xsl:otherwise>
		</xsl:choose>
		<xsl:text>,</xsl:text>
		<xsl:call-template name="parentName">
			<xsl:with-param name="widget" select="$attribute"/>
		</xsl:call-template>
		<xsl:text>);&CR;</xsl:text>
	</xsl:template>


</xsl:stylesheet>