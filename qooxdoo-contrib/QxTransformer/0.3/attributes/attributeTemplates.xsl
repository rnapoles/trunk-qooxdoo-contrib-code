<?xml version='1.0'?>
<!-- 

	QxTransformer
	Converts QXML to Javascript
	
	License: LGPL
	Autors: Siarhei Barysiuk <s.barysiuk@gmail.com>	
			Christian Boulanger <info@bibliograph.org>

	templates for attributes processing
	
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
	
	<!-- imported templates to processing of attributes -->
	
	<xsl:include href="./templates/qx_backgroundcolor_attribute.xsl"/>
	<xsl:include href="./templates/qx_border_attribute.xsl"/>
	<xsl:include href="./templates/qx_csv_attribute.xsl"/>
	<xsl:include href="./templates/qx_default_attribute.xsl"/>
	<xsl:include href="./templates/qx_empty_attribute.xsl"/>
	<xsl:include href="./templates/qx_eventlistener_attribute.xsl"/>
	<xsl:include href="./templates/qx_padding_attribute.xsl"/>
	<xsl:include href="./templates/qx_style_attribute.xsl"/>
	<xsl:include href="./templates/qx_tooltip_attribute.xsl"/>
	<xsl:include href="./templates/qxt_observes_attribute.xsl"/>


</xsl:stylesheet>