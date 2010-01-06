<?xml version='1.0'?>
<!-- 

	QxTransformer
	Converts QXML to Javascript
	
	License: LGPL
	Autors: Siarhei Barysiuk <s.barysiuk@gmail.com>	
			Christian Boulanger <info@bibliograph.org>

	templates for "script" widget processing
	
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


	<!-- scripts: if you specify a qooxdooVersion attribute, the script will only 
		 be rendered if the version matches. this allows to use one template for
		 multiple versions to preserve backward compatibility -->
	<xsl:template match="qxti:scriptContentWidgetHandler">
		<xsl:param name="widget"/>
		<xsl:if test="not($widget/@qooxdooVersion) or $widget/@qooxdooVersion=$qooxdooVersion">
			<xsl:text>&CR;</xsl:text>
			<xsl:choose>
				<xsl:when test="$widget/@src">
					<xsl:text disable-output-escaping="yes">document.write('&lt;scri' +'pt type="text/javascript" src="</xsl:text> 
					<xsl:value-of select="$widget/@src" />					
					<xsl:text disable-output-escaping="yes">"&gt;&lt;/script&gt;');</xsl:text>
				</xsl:when>
				<xsl:otherwise>
				  <!-- script as function -->
    			<xsl:choose>
    				<xsl:when test="$widget/@id">
        			<xsl:choose>
        				<xsl:when test="not($widget/@scope) or $widget/@scope='local'">    				  
      					  <xsl:text>var </xsl:text>
                </xsl:when>
        				<xsl:when test="$widget/@id and ($widget/@scope='application' or $widget/@scope='widget') ">
        					<xsl:text>this.</xsl:text>
                </xsl:when>
              </xsl:choose>              
              <xsl:value-of select="$widget/@id"/>
              <xsl:text>=function(</xsl:text>
              <xsl:value-of select="$widget/@args"/>
              <xsl:text>){&CR;</xsl:text>
    				</xsl:when>
    			</xsl:choose>				  
    			<xsl:choose>
    				<xsl:when test="'&DEBUG;'='yes'">
    					<xsl:value-of select="$widget" disable-output-escaping="yes"/>
    				</xsl:when>
    				<xsl:otherwise>
    					<xsl:value-of select="normalize-space($widget)" disable-output-escaping="yes"/>
    				</xsl:otherwise>
    			</xsl:choose>
    			<xsl:if test="$widget/@id">
    				 <xsl:text>&CR;}&CR;</xsl:text>
          </xsl:if>   
        </xsl:otherwise>
			</xsl:choose>
		</xsl:if>
	</xsl:template>

</xsl:stylesheet>