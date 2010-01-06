<?xml version='1.0'?>
<!-- 

	QxTransformer
	Converts QXML to Javascript
	
	License: LGPL
	Autors: Siarhei Barysiuk <s.barysiuk@gmail.com>	
			Christian Boulanger <info@bibliograph.org>

	template for qxt:form emulating html:form
	
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

	<!-- qxt:form -->
	<xsl:template match="qxti:formContentWidgetHandler">
	
		<xsl:param name="widget"/>

		<xsl:text>&CR;</xsl:text>

		<!-- form object variable name -->		
		<xsl:variable name="varName">
			<xsl:call-template name="variableName">
				<xsl:with-param name="widget" select="$widget"/>
			</xsl:call-template>		
		</xsl:variable>

		<!-- scope -->
		<xsl:if test="$widget/@scope='local' or not($widget/@scope)">
			<xsl:text>var </xsl:text>
		</xsl:if>	

		<!-- create data provider object with custom add method -->
		<xsl:value-of select="$varName"/>
		<xsl:text> = new qx.io.databinding.DataProvider;&CR;</xsl:text>
		<xsl:value-of select="$varName"/>
		<xsl:text>.add = function(vWidget){</xsl:text>
		<xsl:call-template name="parentName">
			<xsl:with-param name="widget" select="$widget"/>
		</xsl:call-template>			
		<xsl:text>.add(vWidget);}&CR;</xsl:text>
			
	 	<!-- method -->
		<xsl:value-of select="$varName"/>		
		<xsl:text>.setTransport("</xsl:text>
		<xsl:value-of select="$widget/@method"/>
		<xsl:text>");&CR;</xsl:text>
		
	 	<!-- action -->
		<xsl:value-of select="$varName"/>		
		<xsl:text>.setServiceUrl("</xsl:text>
		<xsl:value-of select="$widget/@action"/>
		<xsl:text>");&CR;</xsl:text>
		
	 	<!-- onSubmit -->
	 	<xsl:if test="$widget/@onSubmit">
			<xsl:value-of select="$varName"/>		
			<xsl:text>.setOnSubmit("</xsl:text>
			<xsl:value-of select="$widget/@onSubmit"/>
			<xsl:text>");&CR;</xsl:text>
		</xsl:if>

	 	<!-- onReset -->
	 	<xsl:if test="$widget/@onReset">
			<xsl:value-of select="$varName"/>		
			<xsl:text>.setOnReset("</xsl:text>
			<xsl:value-of select="$widget/@onReset"/>
			<xsl:text>");&CR;</xsl:text>
		</xsl:if>

		<!-- process child widgets, will be attached to container -->
		<xsl:apply-templates select="$widget/*" />

		<!-- attach elements -->
		<xsl:text>&CR;</xsl:text>	
		<xsl:for-each select="$widget//*[@qxt:name]" >
			<xsl:value-of select="$varName"/>
			<xsl:text>.bindWidget(</xsl:text>
			<xsl:call-template name="variableName">
				<xsl:with-param name="widget" select="."/>
			</xsl:call-template>
			<xsl:text>,"</xsl:text>	
			<xsl:value-of select="./@qxt:name"/>
			<xsl:text>");&CR;</xsl:text>			
		</xsl:for-each>
	</xsl:template>

</xsl:stylesheet>