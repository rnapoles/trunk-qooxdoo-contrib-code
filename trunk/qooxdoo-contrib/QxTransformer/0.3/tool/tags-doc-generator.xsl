<?xml version="1.0" encoding="UTF-8"?>
<!-- 

	QxTransformer
	Converts QXML to Javascript
	
	License: LGPL
	Autors: Siarhei Barysiuk <s.barysiuk@gmail.com>	
			Christian Boulanger <info@bibliograph.org>
	
	creates documentation on tags that can be used
  
 -->
 
 <!-- xml entities -->
<!DOCTYPE stylesheet [
  <!ENTITY CR '&#13;&#10;'>
  <!ENTITY USER_CONFIG_PATH 'config/user-config.xml'>
  <!ENTITY COMMONS_XSL_PATH 'common/common.xsl'>
  <!ENTITY LOGGING_XSL_PATH 'common/logging.xsl'>
  <!ENTITY WIDGETS_XSL_PATH 'widgets/widgets.xsl'>
  <!ENTITY TRANSFORMER_CONFIG_PATH 'config/transformer-config.xml'>
  <!ENTITY QXTRANSFORMER_VERSION '0.2'>
  <!ENTITY PREFIX 'qx_'>
  <!ENTITY DEBUG 'no'>
]>

<xsl:stylesheet version="1.0" 
  xmlns='http://www.w3.org/TR/REC-html40'
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
	xmlns:qx="http://www.qxtransformer.org/qooxdoo"
	xmlns:qxti="http://www.qxtransformer.org/internal"
	xmlns:qxt="http://www.qxtransformer.org/extension">
  
	<xsl:output 
    method="xml" 
    omit-xml-declaration = "yes"
    indent="yes" 
    encoding="utf-8"/>
  
	<xsl:param name="basedir" value="."/>
  
  <xsl:variable name="apidata" select="document('apidata.xml')" />
  
  <xsl:template match="/">
  
	<html>
    <style>
      body, td { font-family: Arial; font-size: small; }
      td { vertical-align : top; border-top : 1px black solid }
    </style>
		<body>
      <h1>QxTransformer tags</h1>
      <p>
        This list only contains the tags that generate qooxdoo classes. 
        Template constructs will be added later.
      </p>
      <xsl:for-each select="/tags/taggroup">
        <h2><xsl:value-of select="./@description" /></h2>
        <table width="100%">
          <thead>
            <th width="30%">Tag</th>
            <th width="30%">Class</th>
            <th width="30%">Attributes (todo)</th>
          </thead>
          <tbody>
            <xsl:for-each select="./tag">
              <xsl:variable name="classname" select="./@class" />
              <tr>
                <td ><xsl:value-of select="./@name" /></td>
                <td>
                  <a target="qooxdoo_api">
                    <xsl:attribute name="href">
                      <xsl:text>http://demo.qooxdoo.org/current/apiviewer/#</xsl:text>
                      <xsl:value-of select="$classname" />
                    </xsl:attribute>
                    <xsl:value-of select="$classname" />
                  </a>
                </td>
                <td>
                  <xsl:variable name="properties" select="$apidata/*/*[name()= concat($classname,'.js')][1]/*[@type='properties'][1]" />
                  <xsl:for-each select="$properties/*[@type='property']" >
                    <xsl:value-of select="attributes[1]/@name" />
                    <xsl:if test="attributes[1]/@check">
                      <xsl:text>(</xsl:text> 
                      <xsl:value-of select="attributes[1]/@check" />
                      <xsl:text>)</xsl:text>
                    </xsl:if>
                    <xsl:text>, </xsl:text>                  
                  </xsl:for-each>
                </td>
              </tr>
            </xsl:for-each>
          </tbody>
         </table>
      </xsl:for-each>
    </body>
  </html>
  </xsl:template>
</xsl:stylesheet>			
