<?xml version='1.0'?>
<!-- 

	QxTransformer
	Converts QXML to Javascript
	
	License: LGPL
	Autors: Siarhei Barysiuk <s.barysiuk@gmail.com>	
			Christian Boulanger <info@bibliograph.org>

	templates for "label" widget processing
	
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


	<!-- label widget can have html as children -->
	<xsl:template match="qxti:labelContentWidgetHandler">
	
		<xsl:param name="widget"/>
		<xsl:param name="expandedDocument" />

		<xsl:text>&CR;</xsl:text>
        <!-- create widget object including constructor vars -->
		<xsl:call-template name="creator">
			<xsl:with-param name="widget" select="$widget"/>
			<xsl:with-param name="expandedDocument" select="$expandedDocument"/>
		</xsl:call-template>
		
        <!-- add attributes -->
        <xsl:call-template name="attributesProcessing">
			<xsl:with-param name="widget" select="$widget"/>
			<xsl:with-param name="expandedDocument" select="$expandedDocument"/>
		</xsl:call-template>

		<!-- look for html child nodes -->
		<xsl:if test="$widget/*[not(contains(name(),'qx:'))]">
			<xsl:call-template name="variableName">
				<xsl:with-param name="widget" select="$widget"/>
			</xsl:call-template>
			<xsl:text>.setText('</xsl:text>
			<xsl:value-of select="normalize-space($widget/text())" />
        	<xsl:copy-of select="$widget/*[not(contains(name(),'qx:'))]" />
			<xsl:text>');&CR;</xsl:text>
		</xsl:if>

   <!-- child widgets -->
	 <xsl:apply-templates select="$widget/qx:*">
	 	<xsl:with-param name="expandedDocument" select="$expandedDocument"/>
	 </xsl:apply-templates>
		
		<!-- add to parent -->
		<xsl:apply-templates select="$dynamicWidgetTemplatesTree/qxti:templates/qxti:*[local-name()='&DEFAULT_ADD_TEMPLATE;'][1]">
			<xsl:with-param name="widget" select="$widget"/>
			<xsl:with-param name="expandedDocument" select="$expandedDocument"/>
		</xsl:apply-templates>	
	</xsl:template>

</xsl:stylesheet>