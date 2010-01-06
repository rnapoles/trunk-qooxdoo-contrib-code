<?xml version='1.0'?>
<!-- 

  QxTransformer
  Converts QXML to Javascript
  
  License: LGPL
  Autors: Siarhei Barysiuk <s.barysiuk@gmail.com> 
      Christian Boulanger <info@bibliograph.org>

  templates for "application" widget processing
  
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
  <!ENTITY DEBUG 'no'>

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
  xmlns:exsl="http://exslt.org/common"
  >

  <!-- documentation -->
  <qxti:doc>
    <qxti:info>
      <p>Main application template</p>
      <p><b>Attributes:</b></p>
      <dl>
        <dt>namespace</dt>
        <dd>The namespace of the application, such as custom</dd>
        <dt>className [optional]</dt>
        <dd>The classname of the application. Defaults to "Application".</dd>
        <dt>title [optional]</dt>
        <dd>The title of the application.".</dd>
        <dt>copyright [optional]</dt>
        <dd>Names of people holding the copyright.</dd>
        <dt>license [optional]</dt>
        <dd>The license under which the application is distributed.</dd>
        <dt>authors [optional]</dt>
        <dd>Names of the authors of the code</dd>
        <dt>qooxdooVersion [optional]</dt>
        <dd>The version of qooxdoo for which the code should be generated. Defaults to "0.7" Only 0.7 is supported at the moment.</dd>
        <dt>translate [optional] ("true|false")</dt>
        <dd>Whether QxTransformer should translate translatable attributes (Set in config/templates-mapping.xml).</dd>
      </dl>
      <p><b>Child Nodes:</b></p>
      <dl>
        <dt>qxt:method name="name" arguments="arg1,arg2"</dt>
        <dd>contains the code of a member function of the application with name "name" and arguments "arg1,arg2"</dd>
        <dt>qxt:destructor</dt>
        <dd>contains the code for the application destructor</dd>
    </dl>
    </qxti:info>
    <qxti:param name="widget">
       info
    </qxti:param>
  </qxti:doc>
  <xsl:template match="qx:application">
      
    <!-- application namespace -->
    <xsl:variable name="namespace">
      <xsl:choose>
        <xsl:when test="./@namespace">
          <xsl:value-of select="./@namespace"/>
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="$applicationNamespace"/>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>
    
    <!-- application class name -->
    <xsl:variable name="classname">
      <xsl:choose>
        <xsl:when test="./@className">
          <xsl:value-of select="./@className"/>
        </xsl:when>
        <xsl:otherwise>
          <xsl:text>Application</xsl:text>
        </xsl:otherwise>
      </xsl:choose>     
    </xsl:variable>

    <!-- log message -->
    <xsl:call-template name="log.info">
      <xsl:with-param name="message">
        <xsl:text>Starting processing application </xsl:text>
        <xsl:value-of select="$namespace"/>
        <xsl:text>.Application content...</xsl:text>
      </xsl:with-param>
    </xsl:call-template>
    
    <!-- create document with preprocessed includes
      and macros -->
    <xsl:if test="'&DEBUG;'='yes'"> 
      <xsl:call-template name="log.info">
        <xsl:with-param name="message">
          <xsl:text>Starting processing of static includes and macros...</xsl:text>
        </xsl:with-param>
      </xsl:call-template>
    </xsl:if>
      
    <xsl:variable name="expandedDocumentRTF">
      <xsl:copy>
        <xsl:attribute name="id">
          <xsl:value-of select="$clientDocumentVar"/>
        </xsl:attribute>
        <xsl:copy-of select="./@*"/> 
        <xsl:call-template name="preprocessStaticIncludes">
          <xsl:with-param name="widget" select="."/>
        </xsl:call-template>
      </xsl:copy>
    </xsl:variable>
        
    <xsl:variable name="expandedDocument" select="exsl:node-set($expandedDocumentRTF)"/>

    <xsl:if test="'&DEBUG;'='yes'">
      <xsl:call-template name="log.info">
        <xsl:with-param name="message">
          <xsl:text>Done processing of static includes and macros.</xsl:text>
        </xsl:with-param>
      </xsl:call-template>
    </xsl:if>   
    
    <xsl:text>/* ************************************************************************&CR;</xsl:text>
    <xsl:if test="./@title">
        <xsl:text>&CR;&CR;    </xsl:text>
        <xsl:value-of select="./@title"/>
    </xsl:if>
    <xsl:if test="./@copyright">
        <xsl:text>&CR;&CR;    Copyright: </xsl:text>
        <xsl:value-of select="./@copyright"/>
    </xsl:if>
    <xsl:if test="./@license">
        <xsl:text>&CR;&CR;    License: </xsl:text>
        <xsl:value-of select="./@license"/>
    </xsl:if>
    <xsl:if test="./@authors">
        <xsl:text>&CR;&CR;    Authors: </xsl:text>
        <xsl:value-of select="./@authors"/>
    </xsl:if>
    <xsl:text>&CR;&CR;    qooxdoo v.</xsl:text>
    <xsl:value-of select="$qooxdooVersion"/>
    <xsl:text> code generated by QxTransformer v.</xsl:text>
    <xsl:value-of select="$qxtransformerVersion"/>
    <xsl:text>&CR;&CR;************************************************************************ */&CR;</xsl:text>
    
            <!--  resources -->
    <xsl:text>&CR;&CR;/* ************************************************************************&CR;</xsl:text>
    <!-- embed icons, but only once -->
    <xsl:for-each select="$expandedDocument//*/@icon[contains(.,'icon/') and not(.=../preceding-sibling::*/@icon)]">
        <xsl:text>#embed(qx.icontheme/</xsl:text>
        <xsl:value-of select="substring(.,6)"/>
        <xsl:text>)&CR;</xsl:text>
    </xsl:for-each>
    
    <!-- todo: themes -->
    
    <!-- classes used -->
    <xsl:text>&CR;</xsl:text>
    
    <!-- data manager mixin -->
    <xsl:if test="count($expandedDocument//qx:*/@dataBinding | $expandedDocument//qx:*/@dataProvider)">
        <xsl:text>#require(qcl.databinding.simple.MDataManager)&CR;</xsl:text>
    </xsl:if>   
         
    <!-- autocomplete mixin -->
    <xsl:if test="count($expandedDocument//qx:*/@autoComplete)">
        <xsl:text>#require(qcl.databinding.simple.MAutoComplete)&CR;</xsl:text>
    </xsl:if>      
    
    <!-- drag & drop todo: test for "drag*" in attribute name -->
    <xsl:if test="count($expandedDocument//qx:eventListener[@type='dragstart'] | $expandedDocument//qx:eventListener[@type='dragdrop'])">
        <xsl:text>#require(qx.event.handler.DragAndDropHandler)&CR;</xsl:text>
    </xsl:if>           
    
     
    <xsl:text>&CR;************************************************************************ */&CR;</xsl:text>
    
    <![CDATA[
/**
 * Main application class
 */ ]]>
    <!-- define class -->
    <xsl:text>&CR;qx.Class.define("</xsl:text>
    <xsl:value-of select="$namespace" />
    <xsl:text>.</xsl:text>
    <xsl:value-of select="$classname" />
    <xsl:text>",</xsl:text>
    <![CDATA[
{
  extend : qx.application.Gui,

  members :
  {
    /**
     * main application
     */
    main : function()
    {
        this.base(arguments);

        // Define alias for custom resource path 
    ]]>
    <xsl:text>qx.io.Alias.getInstance().add("</xsl:text>
    <xsl:value-of select="$namespace" />
    <xsl:text>", qx.core.Setting.get("</xsl:text>
    <xsl:value-of select="$namespace" />
    <xsl:text>.resourceUri"));&CR;</xsl:text>
   
    <!-- data manager mixin -->
    <xsl:if test="count($expandedDocument//qx:*/@dataBinding | $expandedDocument//qx:*/@dataProvider)">
      <xsl:text>&CR;// data manager mixin&CR;</xsl:text>
        <xsl:text>qx.Class.include(qx.core.Target,qcl.databinding.simple.MDataManager);&CR;</xsl:text>
    </xsl:if>
    
    <!-- autocomplete mixin -->
    <xsl:if test="count($expandedDocument//qx:*/@autoComplete)">
      <xsl:text>&CR;// autocomplete mixin&CR;</xsl:text>
      <xsl:text>qx.Class.include(qx.ui.form.TextField,qcl.databinding.simple.MAutoComplete);&CR;</xsl:text>
      <xsl:text>qx.Class.include(qx.ui.form.ComboBox,qcl.databinding.simple.MAutoComplete);&CR;</xsl:text>                        
    </xsl:if>

    <!-- treevirtual mixin -->
    <xsl:if test="count($expandedDocument//qx:virtualTree)">
        <xsl:text>&CR;// treevirtual MNode mixin &CR;</xsl:text>
        <xsl:text>qx.Class.include(qx.ui.treevirtual.TreeVirtual,qx.ui.treevirtual.MNode);&CR;</xsl:text>
    </xsl:if>         

    <!-- treevirtual mixin -->
    <xsl:if test="count($expandedDocument//qx:virtualTree/@enableDragDrop)">
        <xsl:text>&CR;// treevirtual MDragAndDropSupport mixin &CR;</xsl:text>
        <xsl:text>qx.Class.patch(qx.ui.treevirtual.TreeVirtual,qx.ui.treevirtual.MDragAndDropSupport);&CR;</xsl:text>
    </xsl:if>         
          
    <!-- main application -->
    <![CDATA[        
    // set parent widget to clientDocument 
    var ]]><xsl:value-of select="$clientDocumentVar" />        
    <xsl:text> = qx.ui.core.ClientDocument.getInstance();&CR;</xsl:text>
    <![CDATA[

    // generate all child widgets and add them to document 
    ]]>

    <!-- debug message -->
    <xsl:if test="'&DEBUG;'='yes'">   
        <xsl:call-template name="log.info">
          <xsl:with-param name="message">
            <xsl:text>Starting processing of widgets...</xsl:text>
          </xsl:with-param>
        </xsl:call-template>
    </xsl:if>
    
    <!-- apply templates to result document -->
    <xsl:apply-templates select="$expandedDocument/*/*">
      <xsl:with-param name="expandedDocument" select="$expandedDocument"/>
    </xsl:apply-templates>

    <!-- debug message -->
    <xsl:if test="'&DEBUG;'='yes'">
        <xsl:call-template name="log.info">
          <xsl:with-param name="message">
            <xsl:text>Done processing of widgets.</xsl:text>
          </xsl:with-param>
        </xsl:call-template>
    </xsl:if>
  
    <![CDATA[
        // end of child widgets
    },
 
    /*
    *****************************************************************************
       MEMBER FUNCTIONS AND EVENT HANDLERS
    *****************************************************************************
    */ 
    ]]>

   <!-- debug message -->
    <xsl:if test="'&DEBUG;'='yes'">
      <xsl:call-template name="log.info">
        <xsl:with-param name="message">
          <xsl:text>Starting generating member functions and event handlers...</xsl:text>
        </xsl:with-param>
      </xsl:call-template>
    </xsl:if>
    
    <!-- member functions -->
    <xsl:for-each select="qxt:method">
      <xsl:text>&CR;    </xsl:text>
      <xsl:value-of select="@name"/>
      <xsl:text> : function(</xsl:text>
      <xsl:value-of select="@arguments"/>
      <xsl:text>)&CR;    {&CR;</xsl:text>
       <xsl:value-of select="." disable-output-escaping="yes"/>
      <xsl:text>&CR;    },&CR;</xsl:text>
    </xsl:for-each>    

    <!-- event handler -->  
    <xsl:for-each select="$expandedDocument//qx:eventHandler">
      <xsl:text>&CR;    </xsl:text>
      <xsl:value-of select="./@name"/>
      <xsl:text> : function(event)&CR;    {&CR;</xsl:text>
      <xsl:value-of select="." disable-output-escaping="yes"/>
      <xsl:text>&CR;    },&CR;</xsl:text>
    </xsl:for-each>
    
    <!-- debug message -->
    <xsl:if test="'&DEBUG;'='yes'"> 
      <xsl:call-template name="log.info">
        <xsl:with-param name="message">
          <xsl:text>Done.</xsl:text>
        </xsl:with-param>
      </xsl:call-template>
    </xsl:if>      
    
    <![CDATA[

    dummy : null
  },

  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

  destruct : function()
  {  ]]>
  
    <xsl:value-of select="qxt:destructor[1]" disable-output-escaping="yes"/>
    
    <![CDATA[
  },
  
  /*
  *****************************************************************************
     SETTINGS
  *****************************************************************************
  */

    ]]>
    <xsl:text>settings : { &CR;</xsl:text>
    <xsl:if test="$classname='Application'">
      <xsl:text>    "</xsl:text>
      <xsl:value-of select="$namespace" />
      <xsl:text>.resourceUri" : "./resource"&CR;</xsl:text>
    </xsl:if>
    <xsl:text>  }&CR;});&CR;</xsl:text>


    <!-- BROADCASTERS -->
    
    <!-- debug message -->
    <xsl:if test="'&DEBUG;'='yes'">
      <xsl:call-template name="log.info">
        <xsl:with-param name="message">
          <xsl:text>Starting processing of brodcasters...</xsl:text>
        </xsl:with-param>
      </xsl:call-template>
    </xsl:if>
  
    <!-- broadcaster classes -->
    <xsl:call-template name="processBroadcasters">
      <xsl:with-param name="document" select="$expandedDocument"/>
      <xsl:with-param name="namespace" select="$namespace"/>
    </xsl:call-template>

    <!-- debug message -->
    <xsl:if test="'&DEBUG;'='yes'">
      <xsl:call-template name="log.info">
        <xsl:with-param name="message">
          <xsl:text>Done processing of brodcasters.</xsl:text>
        </xsl:with-param>
      </xsl:call-template>
    </xsl:if>

    <!-- log message -->
    <xsl:call-template name="log.info">
      <xsl:with-param name="message">
        <xsl:text>Done processing application content.</xsl:text>
      </xsl:with-param>
    </xsl:call-template>
  
  </xsl:template>
  
</xsl:stylesheet>