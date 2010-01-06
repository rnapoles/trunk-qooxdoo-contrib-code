<?xml version='1.0'?>
<!-- 

	QxTransformer
	Converts QXML to Javascript
	
	License: LGPL
	Autors: Siarhei Barysiuk <s.barysiuk@gmail.com>	
			Christian Boulanger <info@bibliograph.org>

	templates for "gridLayout" widget(included all sctructure) processing
	
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


	<!-- gridLayout Handling -->
	<xsl:template match="qxti:gridLayoutContentWidgetHandler">
		
		<xsl:param name="widget"/>
		<xsl:param name="addTemplateName"/>
		<!-- process widget and standard attributes -->
		<xsl:apply-templates select="$dynamicWidgetTemplatesTree/qxti:templates/qxti:defaultContentWidgetHandler[1]">
			<xsl:with-param name="widget" select="$widget"/>
			<xsl:with-param name="addTemplateName" select="$addTemplateName"/>
			<xsl:with-param name="preventApplyWidgetTemplates" select="true()"/>
		</xsl:apply-templates>
		<!-- processing of rowCount and columnCount -->
		<!-- rowCount -->		
		<xsl:call-template name="variableName">
			<xsl:with-param name="widget" select="$widget"/>
		</xsl:call-template>
		<xsl:text>.setRowCount(</xsl:text>
			<xsl:value-of select="count($widget/qx:gridLayoutRow)"/>			
		<xsl:text>);&CR;</xsl:text>
		<!-- columnCount -->
		<xsl:call-template name="variableName">
			<xsl:with-param name="widget" select="$widget"/>
		</xsl:call-template>
		<xsl:text>.setColumnCount(</xsl:text>
			<xsl:value-of select="count($widget/qx:gridLayoutColumn)"/>			
		<xsl:text>);&CR;</xsl:text>

		<xsl:apply-templates select="$widget/*"/>

	</xsl:template> 

	<!-- gridLayoutRow -->
	<xsl:template match="qxti:gridLayoutRowContentWidgetHandler">
		<xsl:param name="widget"/>
		<xsl:call-template name="parentName">
			<xsl:with-param name="widget" select="$widget"/>
		</xsl:call-template>
		<xsl:text>.setRowHeight(</xsl:text>
		<xsl:value-of select="count($widget/preceding-sibling::qx:gridLayoutRow)"/>
		<xsl:text>,</xsl:text>
			<xsl:call-template name="attributeValuePlain">
				<xsl:with-param name="widget" select="$widget" />
				<xsl:with-param name="attribute" select="$widget/attribute[@name='height']" />
				<xsl:with-param name="value" select="$widget/@height" />			
			</xsl:call-template>
		<xsl:text>);&CR;</xsl:text>

		<xsl:apply-templates select="$widget/*"/>
	</xsl:template>

    <!-- gridlayout cell -->
	<xsl:template match="qxti:gridLayoutCellContentWidgetHandler">
		<xsl:param name="widget"/>
        
		<!-- todo: may need to add modifier --> 
        
        <!-- cycle through all children and add them to grid layout parent -->
		<xsl:for-each select="$widget/qx:*">
			
			<xsl:variable name="column" select="count(./../preceding-sibling::qx:gridLayoutCell)"/>
			<xsl:variable name="row" select="count(./../../preceding-sibling::qx:gridLayoutRow)"/>
		
            <!-- use default widget handler, no add template todo: needs to be updated !-->
			<xsl:apply-templates select="$dynamicWidgetTemplatesTree/qxti:templates/qxti:defaultContentWidgetHandler[1]">
				<xsl:with-param name="widget" select="."/>
				<xsl:with-param name="addTemplateName" select="&EMPTY_WIDGET_HANDLER;"/> 
			</xsl:apply-templates>				

			<xsl:call-template name="getParent">
				<!-- parent for [currentWidget / gridLayoutCell / gridLayoutRow] is gridLayout-->
				<xsl:with-param name="widget" select="./../.."/>
			</xsl:call-template>

			<xsl:text>.add(</xsl:text>
			<xsl:call-template name="variableName">
				<xsl:with-param name="widget" select="."/>
			</xsl:call-template>
		
			<xsl:text>,</xsl:text>
			<xsl:value-of select="$column"/>
			<xsl:text>,</xsl:text>
			<xsl:value-of select="$row"/>
			<xsl:text>);&CR;</xsl:text>
		</xsl:for-each>
	</xsl:template>

	<!-- gridLayoutColumn -->
	<xsl:template match="qxti:gridLayoutColumnContentWidgetHandler">
		<xsl:param name="widget"/>
		<xsl:for-each select="$widget/@*">
			<xsl:text>&PREFIX;</xsl:text>
			<xsl:value-of select="generate-id(../..)"/>
			<xsl:text>.setColumn</xsl:text>
			<xsl:call-template name="titleCaseName"/>
			<xsl:text>(</xsl:text>
			<xsl:value-of select="count(../preceding-sibling::qx:gridLayoutColumn)"/>
			<xsl:text>,</xsl:text>
			<xsl:call-template name="attributeValue">
				<xsl:with-param name="widget" select="$widget"/>
			</xsl:call-template>
			<xsl:text>);&CR;</xsl:text>
		</xsl:for-each>
	</xsl:template>


</xsl:stylesheet>