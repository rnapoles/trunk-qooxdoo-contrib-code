<?xml version='1.0'?>
<!-- 

	QxTransformer
	Converts QXML to Javascript
	
	License: LGPL
	Autors: Siarhei Barysiuk <s.barysiuk@gmail.com>	
			Christian Boulanger <info@bibliograph.org>

	templates for "eventListener" widget processing
	
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

    <!ENTITY QXT_MODIFIER_ATTRIBUTE 'qxt:modifier'>
]>

<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:qx="http://www.qxtransformer.org/qooxdoo"
	xmlns:qxti="http://www.qxtransformer.org/internal"
	xmlns:qxt="http://www.qxtransformer.org/extension"
	xmlns:exsl="http://exslt.org/common">


	<!-- event listeners -->
	<xsl:template match="qxti:eventListenerContentWidgetHandler">

		<xsl:param name="widget"/>

		<xsl:text>&CR;</xsl:text>
		<!-- parent -->
		<xsl:call-template name="parentName">
			<xsl:with-param name="widget" select="$widget"/>
		</xsl:call-template>
		<!-- parent event location modifier?
		     - modifier as parameter from eventListener qxt:modifier
		     - modifier from tags.xml
		 -->
		<xsl:variable name="tag" select="$tagsDoc//tag[@name=name($widget/..) and @version=$qooxdooVersion]" />
		<xsl:variable name="modifier">
			<xsl:choose>
                <xsl:when test="$widget/@&QXT_MODIFIER_ATTRIBUTE;">
                    <xsl:value-of select="$widget/@&QXT_MODIFIER_ATTRIBUTE;"/>
                </xsl:when>
                <xsl:when test="$tag">
                    <xsl:value-of select="$tag[1]/@eventLocationModifier"/>
                </xsl:when>
                <xsl:otherwise/>
            </xsl:choose>
		</xsl:variable>
		<xsl:if test="$modifier">
			<xsl:value-of select="$modifier"/>
		</xsl:if>
		<xsl:choose>
			<!-- event delegation -->
			<xsl:when test="$widget/@delegate">
				<xsl:text>.addEventListener("</xsl:text>
				<xsl:value-of select="$widget/@type"/>
				<xsl:text>",this.</xsl:text>
				<xsl:value-of select="$widget/@delegate"/>
				<xsl:text>,</xsl:text>
				<xsl:call-template name="parentName">
					<xsl:with-param name="widget" select="$widget"/>
				</xsl:call-template>
				<xsl:text>);&CR;</xsl:text>
			</xsl:when>
			<!-- event code -->
			<xsl:otherwise>
				<xsl:text>.addEventListener("</xsl:text>
				<xsl:value-of select="$widget/@type"/>
				<xsl:text>",function(</xsl:text>
				<xsl:choose>
					<xsl:when test="$widget/@args">
						<xsl:value-of select="$widget/@args"/>
					</xsl:when>
					<xsl:otherwise>event</xsl:otherwise>
				</xsl:choose>
				<xsl:text>){&CR;</xsl:text>
				<xsl:choose>

	        <!-- dispatchGlobalEvent attribute redirects event to global event. deprecated, use dispatchMessage instead -->
	        <xsl:when test="$widget/@dispatchGlobalEvent">
						<xsl:text>    var e= new qx.event.type.DataEvent("</xsl:text>
			        	<xsl:value-of select="$widget/@dispatchGlobalEvent"/>
			        	<xsl:text>",event.getData ? event.getData():null);&CR;</xsl:text>
						<xsl:text>    e.setOriginalTarget(event.getTarget());&CR;    </xsl:text>
						<xsl:value-of select="$clientDocumentVar" />
	        	<xsl:text>.dispatchEvent(e,true);</xsl:text>
	        </xsl:when>

	        <!-- dispatchMessage attribute routes events as a message -->
	        <xsl:when test="$widget/@dispatchMessage">
						<xsl:text>    var m = new qx.event.message.Message("</xsl:text>
			        	<xsl:value-of select="$widget/@dispatchMessage"/>
			        	<xsl:text>",event.getData ? event.getData():[]);&CR;</xsl:text>
						<!-- add specific user parameters 
							user define them as 
							<qx:eventListener type="..." dispatchMessage="...">
								<qx:param= name="" value=""/>
							</qx:eventListener>
						-->
						<xsl:for-each select="$widget/qx:param">
							<xsl:choose>
								<xsl:when test="not(./@name)">
									<xsl:text>//unable to process param with empty name</xsl:text>
								</xsl:when>
								<xsl:otherwise>
									<xsl:variable name="current" select="."/>	
									<xsl:if test="not(./preceding-sibling::b[@name=$current/@name])">
										<xsl:text>    m.getData()["</xsl:text>
										<xsl:value-of select="./@name"/>
										<xsl:text>"] = [];&CR;</xsl:text>
									</xsl:if>
									
									<xsl:text>    m.getData()["</xsl:text>
									<xsl:value-of select="./@name"/>
									<xsl:text>"].push(</xsl:text>
										<xsl:choose>
											<xsl:when test="not(./@value)">null</xsl:when>
											<xsl:otherwise>
												<xsl:call-template name="attributeValuePlain">
													<xsl:with-param name="widget" select="." />
													<xsl:with-param name="attribute" select="./@value"/>
													<xsl:with-param name="value" select="./@value/."/>
												</xsl:call-template>
											</xsl:otherwise>
										</xsl:choose>
									<xsl:text>);&CR;</xsl:text>
								</xsl:otherwise>
							</xsl:choose>
						</xsl:for-each>
						<xsl:text>    m.setSender(event.getTarget());&CR;</xsl:text>
	        	<xsl:text>    qx.event.message.Bus.dispatch(m);</xsl:text>
	        </xsl:when>
                   
          <!-- manual event handling -->
					<xsl:when test="'&DEBUG;'='yes'">
						<xsl:value-of select="$widget" disable-output-escaping="yes"/>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="normalize-space($widget)" disable-output-escaping="yes"/>
					</xsl:otherwise>
                    
				</xsl:choose>
				<xsl:text>&CR;},</xsl:text>
				<xsl:call-template name="parentName">
					<xsl:with-param name="widget" select="$widget"/>
				</xsl:call-template>
				<xsl:text>);&CR;</xsl:text>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>


</xsl:stylesheet>