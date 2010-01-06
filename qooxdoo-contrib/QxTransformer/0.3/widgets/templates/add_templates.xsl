<?xml version='1.0'?>
<!-- 

	QxTransformer
	Converts QXML to Javascript
	
	License: LGPL
	Autors: Siarhei Barysiuk <s.barysiuk@gmail.com>	
			Christian Boulanger <info@bibliograph.org>

	add	templates for widgets
	
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


	<!-- add to parent using a modifier -->
	<xsl:template match="qxti:modifiedAddWidgetHandler">
		<xsl:param name="widget"/>
		<xsl:variable name="tag" select="$tagsDoc//tag[@parent=name($widget/..) and @name=name($widget) and @version=$qooxdooVersion]" />
		<xsl:variable name="modifier">
			<xsl:if test="$tag">
				<xsl:value-of select="$tag[1]/@modifier"/>
			</xsl:if>
		</xsl:variable>
		<xsl:apply-templates select="$dynamicWidgetTemplatesTree/qxti:templates/qxti:defaultAddWidgetHandler[1]">
			<xsl:with-param name="widget" select="$widget"/>
			<xsl:with-param name="modifier" select="$modifier"/>
		</xsl:apply-templates>			
	</xsl:template>
	
    
  <!-- setManagerAddHandler  for widgets which are wrapped in a manager -->
  <xsl:template match="qxti:setManagerAddWidgetHandler">
    <xsl:param name="widget"/>
        
    <!-- add to manager -->
    <xsl:call-template name="variableName">
			<xsl:with-param name="widget" select="$widget/.."/>
		</xsl:call-template>
		<xsl:text>.add(</xsl:text>
        <xsl:call-template name="variableName">
			<xsl:with-param name="widget" select="$widget"/>
		</xsl:call-template>        
        <xsl:text>);&CR;</xsl:text>
        
        <!-- add to grandparent node -->
        <xsl:call-template name="variableName">
			<xsl:with-param name="widget" select="$widget/../.."/>
		</xsl:call-template>
		<xsl:text>.add(</xsl:text>
		<xsl:call-template name="variableName">
			<xsl:with-param name="widget" select="$widget"/>
		</xsl:call-template>
		<xsl:text>);&CR;</xsl:text>		
	</xsl:template>
	
	<!-- setMenuAddHandler for menu widgets which need to be associated with 
	  	 other menu elements
	-->
  <xsl:template match="qxti:setMenuAddWidgetHandler">

    <xsl:param name="widget"/>
    <xsl:variable name="name" select="name($widget)"/>
    <xsl:variable name="parentName" select="name($widget/..)"/>
        
		<xsl:choose>
			<xsl:when test="contains($name,'menu')">
		    <!-- set menu -->
		    <!-- todo: replace simple test in next line by querying a menuAsChildGroup in templates-mapping -->
		    <xsl:if test="contains($parentName,'Button')">
			    <xsl:call-template name="variableName">
						<xsl:with-param name="widget" select="$widget/.."/>
					</xsl:call-template>        
					<xsl:text>.setMenu(</xsl:text>
			    <xsl:call-template name="variableName">
						<xsl:with-param name="widget" select="$widget"/>
					</xsl:call-template>
			    <xsl:text>);&CR;</xsl:text>
		    </xsl:if>
		    <xsl:call-template name="addToDocumentAddHandler">
		     	<xsl:with-param name="widget" select="$widget"/>
				</xsl:call-template>
			</xsl:when>
			<xsl:when test="contains($name,'command')">
		    <!-- set command -->
		    <xsl:call-template name="variableName">
					<xsl:with-param name="widget" select="$widget/.."/>
				</xsl:call-template>        
				<xsl:text>.setCommand(</xsl:text>
		    <xsl:call-template name="variableName">
					<xsl:with-param name="widget" select="$widget"/>
				</xsl:call-template>
		    <xsl:text>);&CR;</xsl:text>
			</xsl:when>
		</xsl:choose>
		
	</xsl:template>
	
	    <!-- addToDocumentAddHandler for widgets which have to be added to the document
    	instead of the parent -->
    <xsl:template name="addToDocumentAddHandler" match="qxti:addToDocumentAddWidgetHandler">    
        <xsl:param name="widget"/>
        <xsl:value-of select="$clientDocumentVar" />       
		<xsl:text>.add(</xsl:text>
		<xsl:call-template name="variableName">
			<xsl:with-param name="widget" select="$widget"/>
		</xsl:call-template>
		<xsl:text>);&CR;</xsl:text>		
	</xsl:template>
    
    <!-- setToolTipAddHandler -->
    <xsl:template match="qxti:setToolTipAddWidgetHandler">
        <xsl:param name="widget"/>
        
        <!-- check if there is node content for the label -->
        <xsl:if test="$widget and not($widget/@label)">
	        <xsl:call-template name="variableName">
				<xsl:with-param name="widget" select="$widget"/>
			</xsl:call-template>
			<xsl:text>.getAtom().setLabel('</xsl:text>
			<xsl:value-of select="normalize-space($widget/text())" />
        	<xsl:copy-of select="$widget/*" />
        	<xsl:text>');&CR;</xsl:text>
        </xsl:if>
        
        <!-- set tooltip to parent -->
        <xsl:call-template name="variableName">
			<xsl:with-param name="widget" select="$widget/.."/>
		</xsl:call-template>
		<xsl:text>.setToolTip(</xsl:text>
        <xsl:call-template name="variableName">
			<xsl:with-param name="widget" select="$widget"/>
		</xsl:call-template>        
        <xsl:text>);&CR;</xsl:text>

	</xsl:template>

</xsl:stylesheet>