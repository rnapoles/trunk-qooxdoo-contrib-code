<?xml version='1.0'?>
<!-- 

	QxTransformer
	Converts QXML to Javascript
	
	License: LGPL
	Autors: Siarhei Barysiuk <s.barysiuk@gmail.com>	
			Christian Boulanger <info@bibliograph.org>
	
	templates for logging
 -->

<!DOCTYPE stylesheet[
	<!ENTITY UPPERCASE 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'>
	<!ENTITY NUMBER "1234567890">
	<!ENTITY LOWERCASE 'abcdefghijklmnopqrstuvwxyz'>
	<!ENTITY UPPER_TO_LOWER " '&UPPERCASE;' , '&LOWERCASE;' ">
	<!ENTITY LOWER_TO_UPPER " '&LOWERCASE;' , '&UPPERCASE;' ">
	<!ENTITY PREFIX 'qx_'>
	<!ENTITY CR '&#13;&#10;'>
]>

<xsl:stylesheet version="1.0" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:qx="http://www.qxtransformer.org/qooxdoo"
	xmlns:qxti="http://www.qxtransformer.org/internal"
	xmlns:qxt="http://www.qxtransformer.org/extension"
	
>
	<!-- reusable templates for logging in xslt -->
	
	<!-- prints log message to console with severity INFO
		 - message - log message
		 - element - xml element associated with error
	-->
	<xsl:template name="log.info">
		<xsl:param name="message"/>
		<xsl:param name="element"/>
		<xsl:call-template name="log">
			<xsl:with-param name="severity" select="'INFO'"/>
			<xsl:with-param name="message" select="$message"/>
			<xsl:with-param name="element" select="$element"/>
 		</xsl:call-template>
	</xsl:template>
	
	<!-- prints log message to console with severity WARN
		 - message - log message
		 - element - xml element associated with error
	-->
	<xsl:template name="log.warn">
		<xsl:param name="message"/>
		<xsl:param name="element"/>
		<xsl:call-template name="log">
			<xsl:with-param name="severity" select="'WARN'"/>
			<xsl:with-param name="message" select="$message"/>
			<xsl:with-param name="element" select="$element"/>
 		</xsl:call-template>
	</xsl:template>
	
	<!-- prints log message to console with severity ERROR
		 - message - log message
		 - element - xml element associated with error
		 - abort - if transformation process will be aborted, default value is false 
	-->
	<xsl:template name="log.error">
		<xsl:param name="message"/>
		<xsl:param name="element"/>
		<xsl:param name="abort" select="false()"/>
		<xsl:call-template name="log">
			<xsl:with-param name="severity" select="'ERROR'"/>
			<xsl:with-param name="message" select="$message"/>
			<xsl:with-param name="element" select="$element"/>
			<xsl:with-param name="abort" select="$abort"/>
 		</xsl:call-template>
	</xsl:template>
	
	<!-- prints log message to console with severity FATAL
		 - message - log message
		 - element - xml element associated with error
		LOG MESSAGE WITH THIS SEVERITY ABORTS TRANSFORMATION PROCESS
	-->
	<xsl:template name="log.fatal">
		<xsl:param name="message"/>
		<xsl:param name="element"/>
		<xsl:call-template name="log">
			<xsl:with-param name="severity" select="'FATAL'"/>
			<xsl:with-param name="message" select="$message"/>
			<xsl:with-param name="element" select="$element"/>
			<xsl:with-param name="abort" select="true()"/>
 		</xsl:call-template>
	</xsl:template>
	
	
	
	<!-- main template for logging 
	      DO NOT CALL DIRECTLY, instead call templates log.* with
		  severity definition
		  
		  Parameters:
		  - severity - type of message, default value is INFO
			  Available values:
				- INFO
				- WARN
				- ERROR
				- FATAL
		  - message - message for output 
		  - element - element where an error occured (XPath of this element will be printed)
		  - abort - if transformation process will be aborted, default value is false  
		  -->
		
		  
	<xsl:template name="log">
		<xsl:param name="severity" select="'INFO'"/>
		<xsl:param name="message"/>
		<xsl:param name="element"/>
		<xsl:param name="abort" select="false()"/>
		
		<!-- echoOn property is defined in transformer.xsl file
			and can be passed to stylesheet as parameter -->
		<xsl:if test="$echoOn='true'">
		
			<xsl:variable name="content">
			  <xsl:if test="$severity='INFO'">
			   <xsl:text>   * </xsl:text>
        </xsl:if>
			  <xsl:if test="$severity='WARN'">
			   <xsl:text>  ## </xsl:text>
        </xsl:if>
			  <xsl:if test="$severity='ERROR'">
			   <xsl:text> ### </xsl:text>
        </xsl:if>
			  <xsl:if test="$severity='FATAL'">
			   <xsl:text>#### </xsl:text>
        </xsl:if>                        
			   <xsl:value-of select="$severity"/>
			   <xsl:text>: </xsl:text>
			   <xsl:value-of select="$message"/>
			   <xsl:if test="$element">
					<xsl:text>&CR;  XPath: </xsl:text>
					<!-- print XPath of element -->
				   <xsl:call-template name="qxti:expand-path">
						<xsl:with-param name="element" select="$element"/>
				   </xsl:call-template>
				   <xsl:text>&CR;###</xsl:text>
			   </xsl:if>
			</xsl:variable>

			<xsl:choose>
				<xsl:when test="$abort">
					<xsl:message terminate="yes">
						<xsl:value-of select="$content"/>
					</xsl:message>
				</xsl:when>
				<xsl:otherwise>
					<xsl:message>
						<xsl:value-of select="$content"/>
					</xsl:message>
				</xsl:otherwise>
			</xsl:choose>
		
		</xsl:if>
	</xsl:template>
	
	<!-- reusable templates from
		XSLT Cookbook, 2nd Edition 
		By  Sal Mangano  
		............................................... 
		Publisher: O'Reilly 
		Pub Date: December 2005 
		ISBN: 0-596-00974-7 
	-->
	<!--Expand the xpath to the current node -->
	<xsl:template name="qxti:expand-path">
		<xsl:param name="element" select="."/>
	  	<xsl:apply-templates select="$element" mode="qxti:expand-path"/>
	</xsl:template>
   
	<!-- Root -->
	<xsl:template match="/" mode="qxti:expand-path">
	  <xsl:text>/</xsl:text>
	</xsl:template> 
   
	<!--Top-level node -->
	<xsl:template match="/*" mode="qxti:expand-path">
	  <xsl:text>/</xsl:text>
	  <xsl:value-of select="name( )"/>
	</xsl:template> 
   
	<!--Nodes with node parents -->
	<xsl:template match="*/*" mode="qxti:expand-path">
	  <xsl:apply-templates select=".." mode="qxti:expand-path"/>
	  <xsl:text>/</xsl:text>
	  <xsl:value-of select="name( )"/>
	  <xsl:text>[</xsl:text>
	  <xsl:number/>
	  <xsl:text>]</xsl:text>
	</xsl:template> 
   
	<!--Attribute nodes -->
	<xsl:template match="@*" mode="qxti:expand-path">
	  <xsl:apply-templates select=".." mode="qxti:expand-path"/>
	  <xsl:text>/@</xsl:text>
	  <xsl:value-of select="name( )"/>
	</xsl:template> 
	   
	<!-- Text nodes (normalized for clarity) -->
	<xsl:template match="text( )" mode="qxti:expand-path">
		<xsl:text>normalized-text(</xsl:text>
		<xsl:value-of select="normalize-space(.)"/>
		<xsl:text>)</xsl:text>
	</xsl:template>
	
</xsl:stylesheet>