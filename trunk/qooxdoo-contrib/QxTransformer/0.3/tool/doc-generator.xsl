<?xml version="1.0" encoding="UTF-8"?>
<!-- 

	QxTransformer
	Converts QXML to Javascript
	
	License: LGPL
	Autors: Siarhei Barysiuk <s.barysiuk@gmail.com>	
			Christian Boulanger <info@bibliograph.org>
	
	main file of QxTransformer hgkjhg
 -->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
			xmlns:qx="http://www.qxtransformer.org/qooxdoo"
			xmlns:qxti="http://www.qxtransformer.org/internal"
			xmlns:qxt="http://www.qxtransformer.org/extension">
			<xsl:output method="html" version="4.0" encoding="iso-8859-1"/>
			<xsl:param name="basedir" value="."/>
			<xsl:param name="filename" value=""/>
			
			<xsl:template match="xsl:stylesheet">
			<html>
				<link type="text/css" rel="stylesheet" href="{$basedir}/css/SyntaxHighlighter.css"/>
				<link type="text/css" rel="stylesheet" href="{$basedir}/css/document.css"/>
				<script language="javascript" src="{$basedir}/js/shCore.js"></script>
				<script language="javascript" src="{$basedir}/js/shBrushXml.js"></script>
				<script language="javascript">
				  <![CDATA[function init(){
					dp.SyntaxHighlighter.ClipboardSwf = '/flash/clipboard.swf';
					dp.SyntaxHighlighter.HighlightAll('code');
				  }
				  function showCode(link,id){
					  var codeSection = document.getElementById(id);
					  if(codeSection && codeSection.style.display=='none'){
						  codeSection.style.display="block";
						  link.textContent = "hide code";
					  }
					  else{
						  codeSection.style.display="none";
						  link.textContent = "show code";
					  }
					  return false;
				  }]]>
				</script>
				<body onload="init()">
					<h1><xsl:value-of select="$filename"/></h1>
					<div class="line" style="padding-bottom:2px;">
						<div class="generalInfo bordered">
							<div><b>General information:</b></div>
							 <div>
							 	<xsl:call-template name="getGeneralInfo"/>
							 </div>
						</div>
						<div id="navigation" class="navigation bordered">
							<span>Navigation:</span>
							<ul class="navList">
								<li class="include-icon"><a href="#includes">Includes</a></li>
								<li class="parameter-icon"><a href="#params">Global parameters</a></li>
								<li class="variable-icon"><a href="#vars">Global variables</a></li>
								<li class="template-icon"><a href="#matchTemplates">Match templates</a></li>
								<li class="template-icon"><a href="#namedTemplates">Named templates</a></li>
							</ul>
						</div>
					</div>
					<div id="includes" class="section bordered" style="clear:both;">
						<div class="line">
							<div class="caption"><span class="include-icon">Includes</span></div>
							<div><a href="#navigation">Top</a></div>
						</div>
						<div style="clear:both;">
							<ul>
								<xsl:apply-templates select="./xsl:include"/>
							</ul>
						</div>			
					</div>
					<div id="params" class="section bordered">
						<div class="line">
							<div class="caption"><span class="parameter-icon">Global parameters</span></div>
							<div><a href="#navigation">Top</a></div>
						</div>
						<br/><br/>
						<div style="clear:both;">
								<xsl:apply-templates select="./xsl:param"/>
						</div>			
					</div>
					<div id="vars" class="section bordered">
						<div class="line">
							<div class="caption"><span class="variable-icon">Global variables</span></div>
							<div><a href="#navigation">Top</a></div>
						</div>
						<br/><br/>
						<div style="clear:both;">
								<xsl:apply-templates select="./xsl:variable"/>
						</div>			
					</div>
					<div id="matchTemplates" class="section bordered">
						<div class="line">
							<div class="caption"><span class="template-icon">Match template</span></div>
							<div><a href="#navigation">Top</a></div>
						</div>
						<br/><br/>
						<div style="clear:both;">
							<xsl:apply-templates select="./xsl:template[@match]" mode="matchTemplates"	/>
						</div>			
					</div>
					<div id="namedTemplates" class="section bordered">
						<div class="line">
							<div class="caption"><span class="template-icon">Named template</span></div>
							<div><a href="#navigation">Top</a></div>
						</div>
						<br/><br/>
						<div style="clear:both;">
							<xsl:apply-templates select="./xsl:template[@name]" mode="namedTemplates"	/>
						</div>			
					</div>
				</body>
			</html>	
			</xsl:template>
			
			<xsl:template name="getGeneralInfo">
				<xsl:variable name="globalInfo" select="./qxti:doc[@type='global']"/>
				<xsl:choose>
					<xsl:when test="$globalInfo">
							<xsl:value-of select="$globalInfo/qxti:info"/>
					</xsl:when>
					<xsl:otherwise>
						Missing documentation.
					</xsl:otherwise>
				</xsl:choose>
				<xsl:if test="globalnfo">
				</xsl:if>
			</xsl:template>
			
			<xsl:template match="xsl:include">
				<xsl:variable name="href" select="./@href"/>
				<xsl:variable name="htmlHref">
					<xsl:value-of select="substring-before($href,'.xsl')"/><xsl:text>.html</xsl:text>
				</xsl:variable>
				<li><a href="{$htmlHref}"><xsl:value-of select="$href"/></a></li>
			</xsl:template>
			
			
			<xsl:template match="xsl:variable">
				<xsl:variable name="id" select="generate-id(.)"/>
				<div class="entry">
					<div class="line">
						<div style="width:660px;"><span class="variable-icon"><b><xsl:value-of select="./@name"/></b></span></div>
						<div><span class="code-icon"><a href="javascript:void(0)" onclick="showCode(this,'id{$id}');">show code</a></span></div>
					</div>
					<div style="clear:both;">
						<xsl:call-template name="getInfo">
							<xsl:with-param name="doc" select="./preceding-sibling::*[position() = 1 and local-name(.)='doc' and not(@type)]"/>
						</xsl:call-template>
					</div>
					<div id="id{$id}" style="display:none;">
						<xsl:call-template name="getCode">
							<xsl:with-param name="node" select="."/>
						</xsl:call-template>
					</div>
				</div>
			</xsl:template>
			
			
			<xsl:template match="xsl:param">
				<xsl:variable name="id" select="generate-id(.)"/>
				<div class="entry">
					<div class="line">
						<div style="width:660px;"><span class="parameter-icon"><b><xsl:value-of select="./@name"/></b></span></div>
						<div><span class="code-icon"><a href="javascript:void(0)" onclick="showCode(this,'id{$id}');">show code</a></span></div>
					</div>
					<div style="clear:both;">
						<xsl:call-template name="getInfo">
							<xsl:with-param name="doc" select="./preceding-sibling::*[position() = 1 and local-name(.)='doc' and not(@type)]"/>
						</xsl:call-template>
					</div>
					<div id="id{$id}" style="display:none;">
						<xsl:call-template name="getCode">
							<xsl:with-param name="node" select="."/>
						</xsl:call-template>
					</div>
				</div>
			</xsl:template>
			
			<xsl:template match="xsl:template" mode="matchTemplates">
				<xsl:variable name="id" select="generate-id(.)"/>
				<div class="entry">
					<div class="line">
						<div style="width:660px;"><span class="template-icon"><b><xsl:value-of select="./@match"/></b></span></div>
						<div><span class="code-icon"><a href="javascript:void(0)" onclick="showCode(this,'id{$id}');">show code</a></span></div>
					</div>
					<div style="clear:both;">
						<xsl:variable name="doc" select="./preceding-sibling::*[position() = 1]"/>
						<xsl:call-template name="getInfo">
							<xsl:with-param name="doc" select="$doc"/>
						</xsl:call-template>
						<br/>
						<span>Parameters:</span>
						<div class="entry">
							<xsl:call-template name="getParamInfo">
								<xsl:with-param name="doc" select="$doc"/>
								<xsl:with-param name="template" select="."/>
							</xsl:call-template>
						</div>
						<br/>
					</div>
					<div id="id{$id}" style="display:none;">
							<xsl:call-template name="getCode">
								<xsl:with-param name="node" select="."/>
							</xsl:call-template>
					</div>
				</div>
			</xsl:template>
			
			<xsl:template match="xsl:template" mode="namedTemplates">
			<xsl:variable name="id" select="generate-id(.)"/>
				<div class="entry">
					<div class="line">
						<div style="width:660px;"><span class="template-icon"><b><xsl:value-of select="./@name"/></b></span></div>
						<div><span class="code-icon"><a href="javascript:void(0)" onclick="showCode(this,'id{$id}');">show code</a></span></div>
					</div>
					<div style="clear:both;">
						<xsl:variable name="doc" select="./preceding-sibling::*[position() = 1]"/>
            <xsl:call-template name="getInfo">
							<xsl:with-param name="doc" select="$doc"/>
						</xsl:call-template>
						<br/>
						<span>Parameters:</span>
						<div class="entry">
							<xsl:call-template name="getParamInfo">
								<xsl:with-param name="doc" select="$doc"/>
								<xsl:with-param name="template" select="."/>
							</xsl:call-template>
						</div>
						<br/>	
					</div>
					<div id="id{$id}" style="display:none;">
							<xsl:call-template name="getCode">
								<xsl:with-param name="node" select="."/>
							</xsl:call-template>
					</div>
				</div>
			</xsl:template>
			
			<!-- Utilities -->
			<xsl:template name="getInfo">
				<xsl:param name="doc"/>
				<xsl:choose>
					<xsl:when test="$doc/qxti:info">
						<xsl:copy-of select="$doc/qxti:info"/>
					</xsl:when>
					<xsl:otherwise>
						Missing documentation.
					</xsl:otherwise>
				</xsl:choose>
			</xsl:template>
			
			<xsl:template name="getCode">
				<xsl:param name="node"/>
				<pre name="code" class="xslt">
					<xsl:copy-of select="$node"/>
				</pre>
			</xsl:template>
			
			<xsl:template name="getParamInfo">
				<xsl:param name="template"/>
				<xsl:param name="doc"/>
				<xsl:for-each select="$template/xsl:param">
					<xsl:variable name="paramName" select="./@name"/>
					<span class="parameter-icon" style="padding-left:21px;"><xsl:value-of select="$paramName"/></span>
					<div>
						Default value: 
						<xsl:choose>
							<xsl:when test="./@select"><xsl:value-of select="./@select"/></xsl:when>
							<xsl:otherwise>undefined</xsl:otherwise>
						</xsl:choose>
						<br/>
						<xsl:choose>
							<xsl:when test="$doc/qxti:param[@name=$paramName]">
								<xsl:value-of select="$doc/qxti:param[@name=$paramName]"/>
							</xsl:when>
							<xsl:otherwise>
								Missing documentation.
							</xsl:otherwise>
						</xsl:choose>
					</div>	
				</xsl:for-each>
			</xsl:template>
</xsl:stylesheet>			
