<?xml version='1.0'?>
<!-- 

	QxTransformer
	Converts QXML to Javascript
	
	License: LGPL
	Autors: Siarhei Barysiuk <s.barysiuk@gmail.com>	
			Christian Boulanger <info@bibliograph.org>
	
	set of templates which convert xml to json.
	
	support only simple transformation:
	tag -> property
	set of tags - > array
	
	For example:
	XML:
	<dataRow>
		<text>'text1'</text>
		<text>'text1'</text>
		<html>'html'</html>
	</dataRow>
	<dataRow>
		<text>'text1'</text>
		<html>'html'</html>
	</dataRow>
	
	JSON:
	{
	  dataRow:[{
	    text:['text1','text1'], 
	    html:'html'
	   },{
	    text:'text1', 
	    html:'html'
	   }]
	 }
	
 -->


<!DOCTYPE stylesheet [
	<!ENTITY CR '&#13;&#10;'>
	<!ENTITY TAB '&#9;'>
	<!ENTITY CONSTANTS 'true false null undefined '>
]>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<!-- 
		- $topNode is top node of processed XML
		- $tab is internal variable (it's used when $isPrettyPrintEnabled is
		true in order to write output text with tabs, see example above )
		- $isPrettyPrintEnabled enables/disables formatted output
-->
<xsl:template name="processXMLtoJSON">
	<xsl:param name="topNode"/>
	<xsl:param name="tab"/>
	<xsl:param name="isPrettyPrintEnabled" select="true()"/>

	<xsl:choose>
		<!-- if top node has children -->
		<xsl:when test="count($topNode/*)>0">
			<xsl:text>{</xsl:text>

			<xsl:if test="$isPrettyPrintEnabled">
				<xsl:text>&CR;</xsl:text>
			</xsl:if>

				<!-- process all nodes under top (passed as parameter)-->
				<xsl:for-each select="$topNode/*">
					<xsl:call-template name="renderJSONData">
						<xsl:with-param name="data" select="."/>
						<xsl:with-param name="tab" select="concat($tab,'&TAB;')"/>
						<xsl:with-param name="isPrettyPrintEnabled" select="$isPrettyPrintEnabled"/>
					</xsl:call-template>
				</xsl:for-each>

			<xsl:if test="$isPrettyPrintEnabled">
				<xsl:value-of select="$tab"/>
			</xsl:if>

			<xsl:text>}</xsl:text>

		</xsl:when>
		<!-- top node doesn't have children 
			You can override/change printValue template
			to correct processing of value type-->
		<xsl:otherwise>
			<xsl:call-template name="printValue">
				<xsl:with-param name="value" select="$topNode"/>
			</xsl:call-template>
		</xsl:otherwise>

	</xsl:choose>
</xsl:template>

<!-- template for data rendering 
		- $data is current processed node
		- $tab is internal variable (it's used when $isPrettyPrintEnabled is
		true in order to write output text with tabs, see example above )
		- $isPrettyPrintEnabled enables/disables formatted output
		-->
<xsl:template name="renderJSONData">
	<xsl:param name="data"/>
	<xsl:param name="tab"/>
	<xsl:param name="isPrettyPrintEnabled"/>

	<xsl:choose>
		<!-- check if this element with this name is first -->
		<xsl:when test="count($data/preceding-sibling::*[name(.)=name($data)])=0">

			<xsl:if test="$isPrettyPrintEnabled">
				<xsl:value-of select="$tab"/>
			</xsl:if>	
			<!-- print name of element-->
			<xsl:value-of select="local-name($data)"/>

			<xsl:text>:</xsl:text>

			<xsl:choose>
				<!-- top node contains other element with the same on this level.
					need to render array -->
				<xsl:when test="count($data/following-sibling::*[name(.)=name($data)])>0">
					
					<xsl:text>[</xsl:text>

					<!-- render current node -->
					<xsl:call-template name="processXMLtoJSON">
						<xsl:with-param name="topNode" select="$data"/>
						<xsl:with-param name="tab" select="concat($tab,'&TAB;')"/>
						<xsl:with-param name="isPrettyPrintEnabled" select="$isPrettyPrintEnabled"/>
					</xsl:call-template>
					
					<!-- render nodes following by this one on the same level-->
					<xsl:for-each select="$data/following-sibling::*[name(.)=name($data)]">
						<xsl:text>,</xsl:text>
						<!--render node-->
						<xsl:call-template name="processXMLtoJSON">
							<xsl:with-param name="tab" select="concat($tab,'&TAB;')"/>
							<xsl:with-param name="topNode" select="."/>
							<xsl:with-param name="isPrettyPrintEnabled" select="$isPrettyPrintEnabled"/>
						</xsl:call-template>
					</xsl:for-each>

					<xsl:text>]</xsl:text>

					<!-- print comma, 
						template checks if this node is last, and prints comma if need
					-->
					<xsl:call-template name="printComma">
						<xsl:with-param name="widget" select="$data"/>
					</xsl:call-template>
					
					<xsl:if test="$isPrettyPrintEnabled">
						<xsl:text>&CR;</xsl:text>
					</xsl:if>
				</xsl:when>
				<!-- it's not a array,
					render this node -->
				<xsl:otherwise>

					<xsl:call-template name="processXMLtoJSON">
						<xsl:with-param name="tab" select="concat($tab,'&TAB;')"/>
						<xsl:with-param name="topNode" select="."/>
						<xsl:with-param name="isPrettyPrintEnabled" select="$isPrettyPrintEnabled"/>
					</xsl:call-template>

					<xsl:call-template name="printComma">
						<xsl:with-param name="widget" select="$data"/>
					</xsl:call-template>

					
					<xsl:if test="$isPrettyPrintEnabled">
						<xsl:text>&CR;</xsl:text>
					</xsl:if>

				</xsl:otherwise>

			</xsl:choose>
		</xsl:when>
	</xsl:choose>
</xsl:template>

<!-- prints value,
	You can override/change printValue template
	to correct processing of value type
--> 
<xsl:template name="printValue">
	<xsl:param name="value"/>
	<xsl:choose>
		<!--value is number, constant or javascript expression -->			
		<xsl:when test="
				string(number($value)) != 'NaN' 
				or 
				contains('&CONSTANTS;',concat($value,' '))
				or
				starts-with($value,'javascript:')
				">
				<xsl:choose>
					<xsl:when test="starts-with($value,'javascript:')">
						<xsl:value-of select="substring($value,12)"/>					
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="$value"/>
					</xsl:otherwise>
				</xsl:choose>
		</xsl:when>
		<!-- otherwise, value is simple string-->
		<xsl:otherwise>
			<xsl:text>'</xsl:text>
			<xsl:value-of select="$value"/>
			<xsl:text>'</xsl:text>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<!-- prints comma,
	check if this node is last and prints comma if need 
-->
<xsl:template name="printComma">
	<xsl:param name="widget"/>
	<xsl:if test="count(($widget/following-sibling::*[name(.)!=name($widget)])/preceding-sibling::*[name(.)=name(current())])>0">
		<xsl:text>, </xsl:text>
	</xsl:if>
</xsl:template>

</xsl:stylesheet>