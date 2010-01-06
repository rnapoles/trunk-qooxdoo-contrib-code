<?xml version='1.0'?>
<!-- 

	QxTransformer
	Converts QXML to Javascript
	
	License: LGPL
	Autors: Siarhei Barysiuk <s.barysiuk@gmail.com>	
			Christian Boulanger <info@bibliograph.org>

	templates for "qxt:broadcaster" widget processing
	
 -->
<!-- xml entities -->
<!DOCTYPE stylesheet [
	<!ENTITY UPPERCASE 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'>
	<!ENTITY NUMBER "1234567890">
	<!ENTITY LOWERCASE 'abcdefghijklmnopqrstuvwxyz'>
	<!ENTITY UPPER_TO_LOWER " '&UPPERCASE;' , '&LOWERCASE;' ">
	<!ENTITY LOWER_TO_UPPER " '&LOWERCASE;' , '&UPPERCASE;' ">
	<!ENTITY CR '&#13;&#10;'>
	<!ENTITY TAB '&#9;'>
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


	<!-- TEMPLATE WHICH PROCESSES qxt:broadcaster IN USER CODE
		(creates instanse), mapped in tamplate-mappings.xml-->
	<xsl:template match="qxti:broadcasterContentWidgetTemplate">
		<xsl:param name="widget"/>
		<xsl:param name="expandedDocument" />
		<!-- TODO add scope modificator,
			may be possibilities to generate broadcaster as
			member of application -->
		<xsl:text>&CR;var </xsl:text>
		<xsl:call-template name="variableName">
			<xsl:with-param name="widget" select="$widget"/>
		</xsl:call-template>
		<xsl:text> = new </xsl:text>
		<!-- application namespace -->
        <xsl:choose>
            <xsl:when test="$expandedDocument/qx:application/@namespace">
                <xsl:value-of select="$expandedDocument/qx:application/@namespace"/>
            </xsl:when>
            <xsl:when test="$expandedDocument/qx:widget/@namespace">
                <xsl:value-of select="$expandedDocument/qx:widget/@namespace"/>
            </xsl:when>            
            <xsl:otherwise>
                <xsl:value-of select="$applicationNamespace"/>
            </xsl:otherwise>
        </xsl:choose>
		<xsl:text>.</xsl:text>
		<xsl:call-template name="getBroadcasterClassName">
			<xsl:with-param name="widget" select="$widget"/>
		</xsl:call-template>
		<xsl:text>();&CR;</xsl:text>
	</xsl:template>

	
	
	
	
	<!-- TEMPLATES FOR CREATION OF CLASSES FOR BROADCASTERS -->
		
	<xsl:template name="processBroadcasters">
		<xsl:param name="document"/>
		<xsl:param name="namespace"/>
		
		<xsl:variable name="broadcasters" select="$document/*//qxt:broadcaster"/>
		
		<xsl:text>
		<![CDATA[
  /*
  *****************************************************************************
     BROADCASTER CLASSES
  *****************************************************************************
  */
		  ]]>
		</xsl:text>

		<xsl:for-each select="$broadcasters">
				<xsl:call-template name="createBroadcasterClass">
					<xsl:with-param name="widget" select="."/>
					<xsl:with-param name="namespace" select="$namespace"/>
				</xsl:call-template>
		</xsl:for-each>
			
	</xsl:template>
	
	<xsl:template name="createBroadcasterClass">
		<xsl:param name="widget"/>
		<xsl:param name="namespace"/>
		
		<xsl:text>&CR;/* ********** broadcaster class </xsl:text>
		<xsl:value-of select="$namespace"/>
		<xsl:text>.</xsl:text>
		<xsl:call-template name="getBroadcasterClassName">
			<xsl:with-param name="widget" select="$widget"/>
		</xsl:call-template>
		<xsl:text>********** */</xsl:text>
		
		<!-- define class, with name returned by getBroadcasterClassName template -->
		<xsl:text>&CR;qx.Class.define("</xsl:text>
        <xsl:value-of select="$namespace" />
        <xsl:text>.</xsl:text>
        <xsl:call-template name="getBroadcasterClassName">
        	<xsl:with-param name="widget" select="$widget"/>
        </xsl:call-template>
        <xsl:text>" ,&CR;</xsl:text>
		<xsl:text>&TAB;&TAB;{</xsl:text>
        
        <xsl:text>
        <![CDATA[
        	extend: qx.core.Target,
        	properties:{
        ]]>
        </xsl:text>
        
		<!-- render properties are defined as attributes in qxt:broadcaster -->
		<xsl:for-each select="$widget/@*[name(.)!='id' and name(.)!='className']">
			<xsl:call-template name="renderSimpleProperty">
				<xsl:with-param name="property" select="."/>
			</xsl:call-template>
			<xsl:if test="position()!=last()">
				<xsl:text>,</xsl:text>
			</xsl:if>
		</xsl:for-each>
		<!-- render properties are defined as qxt:broadcaster-property -->
		<xsl:for-each select="$widget/qxt:broadcaster-property">
			<xsl:text>,</xsl:text>
			<xsl:call-template name="renderProperty">
				<xsl:with-param name="property" select="."/>
			</xsl:call-template>
		</xsl:for-each>
        	
        <xsl:text>
        <![CDATA[
        	}
        });
         ]]>
        </xsl:text>
	</xsl:template>
	
	<!-- returns name of class of a broadcaster -->
	<xsl:template name="getBroadcasterClassName">
		<xsl:param name="widget"/>
		<xsl:choose>
			<!-- name of a class defines in className attribute -->
			<xsl:when test="$widget/@className">
				<xsl:value-of select="$widget/@className"/>
			</xsl:when>
			<!-- name of a class is "Broadcaster" + number of broadcaster -->
			<xsl:otherwise>
				<xsl:text>Broadcaster</xsl:text>
				<xsl:value-of select="generate-id($widget)"/>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	
	<!-- renders a property of broadcaster class from 
		attributes of qxt:broadcaster -->
	<xsl:template name="renderSimpleProperty">
		<xsl:param name="property"/>
		
		<xsl:text>&CR;&TAB;&TAB;&TAB;&TAB;</xsl:text>
		<xsl:value-of select="local-name($property)"/>
		<xsl:text>: {</xsl:text>
		<!-- init value of a property -->
		<xsl:text>&CR;&TAB;&TAB;&TAB;&TAB;&TAB;init : </xsl:text>
			<xsl:call-template name="attributeValuePlain">
				<xsl:with-param name="widget" select="$property/.."/>
				<xsl:with-param name="attribute" select="."/>
				<xsl:with-param name="value" select="."/>
			</xsl:call-template>
		<xsl:text>,</xsl:text>
		<!-- event of a property 
			property name + "Changed"
		-->
		<xsl:text>&CR;&TAB;&TAB;&TAB;&TAB;&TAB;event : </xsl:text>
		<xsl:text>"</xsl:text>
		<xsl:value-of select="name($property)"/>
		<xsl:text>Changed</xsl:text>
		<xsl:text>"</xsl:text>
		<xsl:text>&CR;&TAB;&TAB;&TAB;&TAB;}</xsl:text>
	</xsl:template>
	
	<!-- renders a property of broadcaster class from
		qxt:broadcaster-property child element --> 
	<xsl:template name="renderProperty">
		<xsl:param name="property"/>
		
		<xsl:text>&CR;&TAB;&TAB;&TAB;&TAB;</xsl:text>
		<xsl:value-of select="$property/@name"/>
		<xsl:text>: {</xsl:text>
		
		<!-- render all specificators for property -->
		<xsl:for-each select="$property/@*[name(.)!='name']">
			<xsl:text>&CR;&TAB;&TAB;&TAB;&TAB;&TAB;</xsl:text>
			<xsl:value-of select="name(.)"/>
			<xsl:text> : </xsl:text>
				<xsl:call-template name="attributeValuePlain">
					<xsl:with-param name="widget" select="$property"/>
					<xsl:with-param name="attribute" select="."/>
					<xsl:with-param name="value" select="."/>
				</xsl:call-template>
			<xsl:if test="position()!=last()">
				<xsl:text>,</xsl:text>
			</xsl:if>
		</xsl:for-each>
		
		<!-- user didn't define event explicitly -->
		<xsl:if test="not($property/@event)">
			<xsl:text>,</xsl:text>
			<xsl:text>&CR;&TAB;&TAB;&TAB;&TAB;&TAB;</xsl:text>
			<xsl:text>event : </xsl:text>
			<xsl:text>"</xsl:text>
			<xsl:value-of select="$property/@name"/>
			<xsl:text>Changed</xsl:text>
			<xsl:text>"</xsl:text>
		</xsl:if>

		<xsl:text>&CR;&TAB;&TAB;&TAB;&TAB;}</xsl:text>
		
	</xsl:template>


</xsl:stylesheet>