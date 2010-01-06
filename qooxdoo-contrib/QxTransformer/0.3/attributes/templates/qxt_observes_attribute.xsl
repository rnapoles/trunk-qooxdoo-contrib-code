<?xml version='1.0'?>
<!-- 

	QxTransformer
	Converts QXML to Javascript
	
	License: LGPL
	Autors: Siarhei Barysiuk <s.barysiuk@gmail.com>	
			Christian Boulanger <info@bibliograph.org>

	templates for "qxt:observes" attribute processing
	
 -->
<!DOCTYPE stylesheet [
	<!ENTITY UPPERCASE 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'>
	<!ENTITY NUMBER "1234567890">
	<!ENTITY LOWERCASE 'abcdefghijklmnopqrstuvwxyz'>
	<!ENTITY UPPER_TO_LOWER " '&UPPERCASE;' , '&LOWERCASE;' ">
	<!ENTITY LOWER_TO_UPPER " '&LOWERCASE;' , '&UPPERCASE;' ">
	<!ENTITY QXT_OBSERVER_WIDGET "qxt:observer">
	<!ENTITY QXT_OBSERVER_PROPERTY "qxt:observer-property">
	<!ENTITY CR '&#13;&#10;'>
]>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:qx="http://www.qxtransformer.org/qooxdoo"
	xmlns:qxti="http://www.qxtransformer.org/internal"
	xmlns:qxt="http://www.qxtransformer.org/extension"
	xmlns:exsl="http://exslt.org/common">


	<xsl:template match="qxti:observesAttributeHandler">
		<xsl:param name="widget"/>
		<xsl:param name="attribute"/>
		<xsl:param name="expandedDocument"/>
		
		<xsl:variable name="widgetWithObserverRTF">
			<xsl:element name="{name($widget)}">
				<xsl:copy-of select="$widget/@*"/>
				<!-- add id -->
				<xsl:if test="not($widget/@id)">
					<xsl:attribute name="id">
						<xsl:call-template name="variableName">
							<xsl:with-param name="widget" select="$widget"/>
						</xsl:call-template>
					</xsl:attribute>
				</xsl:if>
				<xsl:call-template name="createObserverFragmentTree">
					<xsl:with-param name="property" select="$attribute"/>
				</xsl:call-template>
			</xsl:element>
		</xsl:variable>
		<xsl:variable name="widgetWithObserver" select="exsl:node-set($widgetWithObserverRTF)"/>
		
		<!-- apply template to created properties from fragment of tree-->
		<xsl:apply-templates select="$widgetWithObserver/*/*" >
			<xsl:with-param name="expandedDocument" select="$expandedDocument"/>	
		</xsl:apply-templates>
		
					
	</xsl:template>
	
	<!-- create ragment of tree with qxt:observer element
		  instead of 'observers' property
	-->
	<xsl:template name="createObserverFragmentTree">
		<xsl:param name="property"/>
		
		<xsl:variable name="widget" select="$property/.."/>
		<xsl:variable name="observerProperties" select="$property/../@qxt:observedProperties"/>
		
		<!--  create fragment of tree -->
		<xsl:element name="&QXT_OBSERVER_WIDGET;">
			<!-- name of broadcaster -->
			<xsl:attribute name="element">
				<xsl:value-of select="$property"/>
			</xsl:attribute>
			
			<xsl:choose>
				<!-- widget has attribute 'qxt:observedProperties' with
					defined specific properties which widget will handle -->
				<xsl:when test="$observerProperties">
					<xsl:call-template name="createObserverProperies">
						<xsl:with-param name="properties" select="string($observerProperties)"/>
					</xsl:call-template>
				</xsl:when>
				<!-- create qxt:observer without any specific
					properties -->
				<xsl:otherwise></xsl:otherwise>
			</xsl:choose>
			
		</xsl:element>
		
	</xsl:template>
	
	<!-- render set of qxt:observer-property elements with given
		names from string 'propert1,property2,..' -->	
	<xsl:template name="createObserverProperies">
		<xsl:param name="properties"/>
		<xsl:choose>
			<!--  not last property -->
			<xsl:when test="contains($properties,',')">
				<xsl:call-template name="createObserverProperty">
					<xsl:with-param name="propertyName" select="substring-before($properties,',')"/>
				</xsl:call-template>
				<!-- call template for other properties -->
				<xsl:call-template name="createObserverProperies">
					<xsl:with-param name="properties" select="substring-after($properties,',')"/>
				</xsl:call-template>
			</xsl:when>
			<!-- render only one property (or last in set) -->
			<xsl:otherwise>
				<xsl:call-template name="createObserverProperty">
					<xsl:with-param name="propertyName" select="$properties"/>
				</xsl:call-template>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	
	<!--  create element qxt:observer-property with
		given name -->
	<xsl:template name="createObserverProperty">
		<xsl:param name="propertyName"/>
		<xsl:element name="&QXT_OBSERVER_PROPERTY;">
			<xsl:attribute name="name">
				<xsl:value-of select="$propertyName"/>
			</xsl:attribute>
		</xsl:element>
	</xsl:template>

</xsl:stylesheet>