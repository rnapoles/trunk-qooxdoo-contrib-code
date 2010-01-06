<?xml version='1.0'?>
<!-- 

	QxTransformer
	Converts QXML to Javascript
	
	License: LGPL
	Autors: Siarhei Barysiuk <s.barysiuk@gmail.com>	
			Christian Boulanger <info@bibliograph.org>

	templates for "qxt:observer" widget processing
	
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
	
	<!ENTITY QXT_OBSERVER_WIDGET "qxt:observer">
	<!ENTITY QXT_OBSERVER_PROPERTY "qxt:observer-property">
]>

<xsl:stylesheet version="1.0" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:qx="http://www.qxtransformer.org/qooxdoo"
	xmlns:qxti="http://www.qxtransformer.org/internal"
	xmlns:qxt="http://www.qxtransformer.org/extension"
	xmlns:exsl="http://exslt.org/common">


	<!-- TEMPLATE PROCESSES qxt:observer WIDGET
		ADDS CURRENT WIDGET WHICH CONTAINS qxt:observer TO
		BROADCASTER WITH NAME IS DEFINED IN ELEMENT ATTRIBUTE OF qxt:observer
	-->
	<xsl:template match="qxti:observerWidgetContentTemplate">
		<xsl:param name="widget"/>
		<xsl:param name="expandedDocument"/>
			
		
		<!-- get broadcaster name from observer @element -->
		<xsl:variable name="broadcasterName" select="$widget/@element"/>
		<!-- get broadcaster with this id -->
		<xsl:variable name="broadcaster" select="$expandedDocument/*//qxt:broadcaster[@id=$broadcasterName]"/>
		
		<!-- check if any qxt:observer-property defined above -->
		<xsl:choose>
			<!--  qxt:observer-property defined above
				need to render only these properties -->
			<xsl:when test="count($widget/qxt:observer-property)>0">
				<!-- process all qxt:observer-property -->
				<xsl:apply-templates select="$widget/*" >
					<xsl:with-param name="expandedDocument" select="$expandedDocument"/>	
				</xsl:apply-templates>		
			</xsl:when>
			<xsl:otherwise>
				<xsl:variable name="widgetWithObserverRTF">
					<xsl:element name="{name($widget/..)}">
						<!-- add id -->
						<xsl:copy-of select="$widget/../@*"/>
						<xsl:if test="not($widget/../@id)">
							<xsl:attribute name="id">
								<xsl:call-template name="variableName">
									<xsl:with-param name="widget" select="$widget/.."/>
								</xsl:call-template>
							</xsl:attribute>
						</xsl:if>
						<xsl:call-template name="createObserverWithAllProperiesFromBroadcaster">
							<xsl:with-param name="observer" select="$widget"/>
							<xsl:with-param name="broadcaster" select="$broadcaster"/>
						</xsl:call-template>
					</xsl:element>
				</xsl:variable>

				<xsl:variable name="widgetWithObserver" select="exsl:node-set($widgetWithObserverRTF)"/>
				
				<!-- apply template to created properties from fragment of tree-->
				<xsl:apply-templates select="$widgetWithObserver/*/*" >
					<xsl:with-param name="expandedDocument" select="$expandedDocument"/>	
				</xsl:apply-templates>
				
			</xsl:otherwise>
		</xsl:choose>
		
		
		
		<!-- xsl:apply-templates select="$dynamicWidgetTemplatesTree/qxti:templates/qxti:observerPropertyWidgetContentTemplate[1]">
			<xsl:with-param name="widget" select="$widget"/>
			
		</xsl:apply-templates-->
	</xsl:template>
	
	<!-- PROCESSES qxt:observer-property WIDGETS -->
	<xsl:template match="qxti:observerPropertyWidgetContentTemplate">
		<xsl:param name="widget"/>
		<xsl:param name="expandedDocument"/>
		
		<!-- get broadcaster name from observer @element -->
		<xsl:variable name="broadcasterName" select="$widget/../@element"/>
		<!-- get broadcaster with this id -->
		<xsl:variable name="broadcaster" select="$expandedDocument/*//qxt:broadcaster[@id=$broadcasterName]"/>
		
		<xsl:text>&CR;</xsl:text>
		<xsl:call-template name="getBroadcasterName">
			<xsl:with-param name="property" select="$widget"/>
		</xsl:call-template>
 		<xsl:text>.addEventListener('</xsl:text>
		<xsl:call-template name="getEventName">
			<xsl:with-param name="property" select="$widget"/>
			<xsl:with-param name="broadcaster" select="$broadcaster"/>
		</xsl:call-template>
		<xsl:text>',</xsl:text>
		<!-- render function for event listener -->
		<xsl:call-template name="renderEventFunction">
			<xsl:with-param name="property" select="$widget"/>
		</xsl:call-template>
		<!-- context object -->
		<xsl:text>,</xsl:text>
		<xsl:call-template name="getWidgetName">
			<xsl:with-param name="property" select="$widget"/>
		</xsl:call-template>
		<xsl:text>);&CR;</xsl:text>
		
		
	</xsl:template>
	
	
	<!-- render function for event listener
		Rules:
		1) if qxt:observer-property define onBroadcast attribute
			in function will be plased content of that attribute
		2) if qxt:observer define onBroadcast attribute
			in function will be placed content of that attribute
		3) function will be autogenerated
			this.set_PropertyName_(event.getData()); 
	-->
	<xsl:template name="renderEventFunction">
		<xsl:param name="property"/>
		
		<xsl:text>function(event){&CR;</xsl:text>
			<xsl:choose>
				<!-- 1 -->
				<xsl:when test="$property/@onBroadcast">
					<xsl:value-of select="$property/@onBroadcast"/>
				</xsl:when>
				<!-- 2 -->
				<xsl:when test="$property/../@onBroadcast">
					<xsl:value-of select="$property/../@onBroadcast"/>
				</xsl:when>
				<!-- 3 -->
				<xsl:otherwise>
					<xsl:text>&CR;</xsl:text>
					<xsl:text>this.set</xsl:text>
					<xsl:call-template name="titleCaseString">
						<xsl:with-param name="string" select="string($property/@name)"/>
					</xsl:call-template>
					<xsl:text>(event.getData());&CR;</xsl:text>
				</xsl:otherwise>
			</xsl:choose>
		<xsl:text>&CR;}</xsl:text>
	</xsl:template>
	
	
	<!-- returns event name for this property 
		event name can be custom see 
		qxt:broadcaster/qxt:broadcaster-property/@event
	-->
	<xsl:template name="getEventName">
		<xsl:param name="property"/>
		<xsl:param name="broadcaster"/>

		<xsl:variable name="propertyName" select="$property/@name"/>
		
		<xsl:choose>
			<!-- if this property if defined as qxt:broadcaster-property with specific 'event' attribute -->
			<xsl:when test="$broadcaster/qxt:broadcaster-property[@name=$propertyName and @event]">
				<xsl:value-of select="$broadcaster/qxt:broadcaster-property[@name=$propertyName]/@event"/>
			</xsl:when>
			<xsl:otherwise>
				<xsl:value-of select="$propertyName"/>
				<xsl:text>Changed</xsl:text>
			</xsl:otherwise>
		</xsl:choose>
		
	</xsl:template>
	
	<!-- returns name of wiget to which observer is attached -->
	<xsl:template name="getWidgetName">
		<xsl:param name="property"/>
		<!-- $property/../.. => qxt:observer-property->qxt:observer->widget -->
		<xsl:call-template name="variableName">
			<xsl:with-param name="widget" select="$property/../.."/>
		</xsl:call-template>
	</xsl:template>
	
	<!-- returns name of broadcaster -->
	<xsl:template name="getBroadcasterName">
		<!-- TODO may be need check scope of broadcaster
			if for example it is member of Application
			or other cases -->
		<xsl:param name="property"/>
		<!-- returns value of attribute 'element' in qxt:observer --> 
		<xsl:value-of select="$property/../@element"/>
	</xsl:template>
	
	<!-- creates fragment of tree with observer and observer's properties
		put all properties from broadcaster, widget will 'listen' all properies
		defined in broadcaster -->
	<xsl:template name="createObserverWithAllProperiesFromBroadcaster">
		<xsl:param name="observer"/>
		<xsl:param name="broadcaster"/>
		
		<!--  create fragment of tree -->
		<xsl:element name="&QXT_OBSERVER_WIDGET;">
			<xsl:copy-of select="$observer/@*"/>
			<!-- get broadcaster's properties is defined as attributes 
				and create qxt:observer-properties-->
			<xsl:for-each select="$broadcaster/@*[name(.)!='id' and name(.)!='className']">
				<xsl:element name="&QXT_OBSERVER_PROPERTY;">
					<xsl:attribute name="name">
						<xsl:value-of select="name(.)"/>
					</xsl:attribute>
				</xsl:element>
			</xsl:for-each>
			<!-- get broadcaster's properties is defined as qxt:broadcaster-property
				and create qxt:observer-properties-->
			<xsl:for-each select="$broadcaster/qxt:broadcaster-property">
				<xsl:element name="&QXT_OBSERVER_PROPERTY;">
					<xsl:attribute name="name">
						<xsl:value-of select="./@name"/>
					</xsl:attribute>
				</xsl:element>
			</xsl:for-each>
		</xsl:element>
		
	</xsl:template>
	

</xsl:stylesheet>