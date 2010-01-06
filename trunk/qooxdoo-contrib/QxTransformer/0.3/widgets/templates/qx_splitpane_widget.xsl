<?xml version='1.0'?>
<!-- 

	QxTransformer
	Converts QXML to Javascript
	
	License: LGPL
	Autors: Siarhei Barysiuk <s.barysiuk@gmail.com>	
			Christian Boulanger <info@bibliograph.org>

	templates for "qx:horizontalSplitPane" and "qx:verticalSplitPane" widgets processing
	
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
	
	<!ENTITY TOP_PANE 'qx:topPane'>
	<!ENTITY BOTTOM_PANE 'qx:bottomPane'>
	<!ENTITY LEFT_PANE 'qx:leftPane'>
	<!ENTITY RIGHT_PANE 'qx:rightPane'>
	
]>

<xsl:stylesheet version="1.0" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:qx="http://www.qxtransformer.org/qooxdoo"
	xmlns:qxti="http://www.qxtransformer.org/internal"
	xmlns:qxt="http://www.qxtransformer.org/extension"
	xmlns:exsl="http://exslt.org/common">


	<!-- processes all child tags -->
	<xsl:template match="qxti:paneContentWidgetHandler">
		<xsl:param name="widget"/>
		<xsl:param name="expandedDocument" />

        <xsl:variable name="location" select="substring-before(local-name($widget),'Pane')"/>

        <xsl:text>var </xsl:text>
        <xsl:call-template name="variableName">
            <xsl:with-param name="widget" select="$widget"/>
        </xsl:call-template>
        <xsl:text> = </xsl:text>
        <xsl:call-template name="getParent">
            <xsl:with-param name="widget" select="$widget"/>
        </xsl:call-template>
        <xsl:text>.get</xsl:text>
		<xsl:call-template name="titleCaseString">
			<xsl:with-param name="string" select="$location"/>
		</xsl:call-template>
		<xsl:text>Area();&CR;</xsl:text>

       <xsl:apply-templates select="$widget/*" >
            <xsl:with-param name="expandedDocument" select="$expandedDocument"/>
        </xsl:apply-templates>

    </xsl:template>
	
	<xsl:template name="isSpitPaneParent">
		<xsl:param name="widget"/>
		<xsl:choose>
				<xsl:when test="
							name($widget/..)='&TOP_PANE;'
							or
							name($widget/..)='&BOTTOM_PANE;'
							or
							name($widget/..)='&LEFT_PANE;'
							or
							name($widget/..)='&RIGHT_PANE;'">
							<xsl:value-of select="true()"/>
				</xsl:when>			
				<xsl:otherwise>
							<xsl:value-of select="false()"/>
				</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	
	<!--xsl:template name="addToPane">
		<xsl:param name="widget"/>
		<xsl:param name="modifier"/>
		
		<xsl:variable name="parent" select="$widget/.."/>
		<xsl:variable name="parentLocation" select="substring-before(local-name(parent),'Pane')"/>
		
		<xsl:call-template name="getParent">
			<xsl:with-param name="widget" select="$parent"/>
			<xsl:with-param name="modifier" select="$modifier"/>
		</xsl:call-template>
		
		<xsl:text>.add</xsl:text>
		<xsl:call-template name="titleCaseString">
			<xsl:with-param name="string" select="$location"/>
		</xsl:call-template>
		<xsl:text>(</xsl:text>
		<xsl:call-template name="variableName">
			<xsl:with-param name="widget" select="$widget"/>
		</xsl:call-template>
		
		<xsl:text>);&CR;</xsl:text>

	</xsl:template-->

</xsl:stylesheet>