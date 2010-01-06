<?xml version='1.0'?>
<!-- 

	QxTransformer
	Converts QXML to Javascript
	
	License: LGPL
	Autors: Siarhei Barysiuk <s.barysiuk@gmail.com>	
			Christian Boulanger <info@bibliograph.org>
	
	common templates
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


	<!-- commons templates -->
	
	<qxti:doc>
		<qxti:info>
			Defines global variable (reference to particular widget) at the beginning of a file like:
				var variableName; // description
		</qxti:info>
		<qxti:param name="widget">
			A reference to this widget will be global.
		</qxti:param>
	</qxti:doc>
	<xsl:template name="globalVariableDefiner">
		<xsl:param name="widget" select="."/>
		<xsl:text>&CR;// global variables&CR;</xsl:text>
		<xsl:for-each select="$widget//*[$widget/@scope='global']">
			<xsl:text>var </xsl:text>
			<xsl:value-of select="$widget/@id"/>
			<xsl:text>; // </xsl:text>
			<xsl:value-of select="$widget/@description"/>
			<xsl:text>&CR;</xsl:text>
		</xsl:for-each>
	</xsl:template>
	
	<qxti:doc>
		<qxti:info>
			Generates the variable name of particular widget (for anonymous xml nodes) or returns defined in attribute 'id'.
			If you'll try to call this template for one widget few time, name will be the same in all cases.
		</qxti:info>
		<qxti:param name="widget">
			For this widget (xml node) name will be generated. 
		</qxti:param>
	</qxti:doc>
	<!-- the anonymous variable name of the current node -->
	<xsl:template name="variableName">
		<xsl:param name="widget" select="."/>
		<xsl:choose>
			<xsl:when test="not($widget/@id)">
				<xsl:text>&PREFIX;</xsl:text>
				<xsl:call-template name="replaceSpecialSymbols">
					<xsl:with-param name="input" select="generate-id($widget)"/>
				</xsl:call-template>
			</xsl:when>
			<xsl:otherwise>
				<xsl:choose>
					<xsl:when test="$widget/@scope='application' or $widget/@scope='widget'" >
						<xsl:text>this.</xsl:text>
					</xsl:when>
					<xsl:when test="$widget/@scope='parent'" >
						<xsl:call-template name="getParent">
							<xsl:with-param name="widget" select="$widget"/>
						</xsl:call-template>
						<xsl:text>.</xsl:text>
					</xsl:when>					
				</xsl:choose>
				<xsl:value-of select="$widget/@id"/>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	
	<qxti:doc>
		<qxti:info>
			Gets the name of parent for particular xml node. You can override the parent by 
      providing a qxt:parent attribute which will be used verbatim in place of the 
      name of the parent node. 
		</qxti:info>
		<qxti:param name="widget">
			Target widget.
		</qxti:param>
	</qxti:doc>
	<xsl:template name="parentName">
		<xsl:param name="widget" select="."/>
    <xsl:choose>
      <xsl:when test="$widget/@qxt:parent">
        <xsl:value-of select="$widget/@qxt:parent"/>
      </xsl:when>
      <xsl:otherwise>
    		<xsl:call-template name="variableName">
    			<xsl:with-param name="widget" select="$widget/.."/>
    		</xsl:call-template>
      </xsl:otherwise>
    </xsl:choose>
	</xsl:template>
	

	<qxti:doc>
		<qxti:info>
			Gets the parent of widget.
			 <br/>- only name
			 <br/>- name with modifier if exists
			 <br/>- this if parent is top level widget
			 <br/>- or name of parent defined in &lt;qx:widgets/&gt; if current widget is children of &lt;qx:widgets/&gt;
			 
			 TODO
		</qxti:info>
		<qxti:param name="widget">
			Target widget.
		</qxti:param>
		<qxti:param name="modifier">
			Parent modifier.
		</qxti:param>
	</qxti:doc>
	<xsl:template name="getParent">
		<xsl:param name="widget"/>
		<xsl:param name="modifier"/>

		<xsl:variable name="parentType" select="name($widget/..)"/>

		<xsl:choose>

			<!-- widget has explicit parent id-->
			<xsl:when test="$widget/@qxt:parent">
				<xsl:value-of select="$widget/@qxt:parent"/>
				<!-- need modifier? -->
				<xsl:value-of select="$modifier"/>	
			</xsl:when>
			
			<!-- look up if there is a special parent setter rule 
			<xsl:when test="$tag">
				<xsl:call-template name="parentName">
					<xsl:with-param name="widget" select="$widget"/>
				</xsl:call-template>
				<xsl:value-of select="$tag[1]/@modifier"/>
			</xsl:when>
			
			<xsl:when test="$parent='qx:gridLayoutCell'">
				<xsl:text>&PREFIX;</xsl:text>
				<xsl:value-of select="generate-id($widget/../../..)"/>
			</xsl:when>-->

			<xsl:otherwise>
				<xsl:call-template name="parentName">
					<xsl:with-param name="widget" select="$widget"/> 
				</xsl:call-template>
				<xsl:value-of select="$modifier"/>
			</xsl:otherwise>
		</xsl:choose>

	</xsl:template>	
	
	
	<!-- skip special characters in generated id which mustn't be included in name. 
    	Some tools can generate id like that. 
		TODO: change for all symbols!! Test version.
	-->
	<xsl:template name="replaceSpecialSymbols">
		<xsl:param name="input"/>
		<xsl:choose>
			<xsl:when test="contains($input,':')">
				<xsl:value-of select="substring-before($input,':')"/>
				<xsl:value-of select="substring-after($input,':')"/>
			</xsl:when>
			<xsl:otherwise>
				<xsl:value-of select="$input"/>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>

	<!-- titlecases name(.) -->
	<xsl:template name="titleCaseName">
		<xsl:param name="widget" select="."/>
		<xsl:variable name="name" select="name($widget)"/>

		<xsl:call-template name="titleCaseString">
			<xsl:with-param name="string" select="string($name)"/>
		</xsl:call-template>
	</xsl:template>

    <!-- change case of first letter to upper
         string->String  -->
    <xsl:template name="titleCaseString">
    	<xsl:param name="string"/>
 		
 		<xsl:variable name="firstLetter" select="substring($string,1,1)"/>
		<xsl:variable name="otherLetters" select="substring($string,2,string-length($string))"/>
		<xsl:value-of select="translate($firstLetter,&LOWER_TO_UPPER;)"/>
		<xsl:value-of select="$otherLetters"/>
    </xsl:template>
     <!-- 
        reusable replace-string function 
        author: Paul Prescod 
        from: http://aspn.activestate.com/ASPN/Cookbook/XSLT/Recipe/65426
     -->
     <xsl:template name="replace-string">
        <xsl:param name="text"/>
        <xsl:param name="from"/>
        <xsl:param name="to"/>
    
        <xsl:choose>
          <xsl:when test="contains($text, $from)">
    
        <xsl:variable name="before" select="substring-before($text, $from)"/>
        <xsl:variable name="after" select="substring-after($text, $from)"/>
        <xsl:variable name="prefix" select="concat($before, $to)"/>
    
        <xsl:value-of select="$before"/>
        <xsl:value-of select="$to"/>
            <xsl:call-template name="replace-string">
          <xsl:with-param name="text" select="$after"/>
          <xsl:with-param name="from" select="$from"/>
          <xsl:with-param name="to" select="$to"/>
        </xsl:call-template>
          </xsl:when> 
          <xsl:otherwise>
            <xsl:value-of select="$text"/>  
          </xsl:otherwise>
        </xsl:choose>            
     </xsl:template>
     
</xsl:stylesheet>