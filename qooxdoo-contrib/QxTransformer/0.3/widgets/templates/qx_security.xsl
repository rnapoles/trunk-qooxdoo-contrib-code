<?xml version='1.0'?>
<!-- 

	QxTransformer
	Converts QXML to Javascript
	
	License: LGPL
	Autors: Siarhei Barysiuk <s.barysiuk@gmail.com>	
			Christian Boulanger <info@bibliograph.org>

	templates for widget processing
	
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

	<!-- security container tag -->
	<xsl:template match="qxti:securityWidgetContentTemplate">
		<xsl:param name="expandedDocument" />
		<xsl:param name="widget"/>
		<!-- 
			todo: only generate once!
			<xsl:if test="generate-id(.)=generate-id(//*[name()=name(.)][1])">
		 -->
		<xsl:text>&CR;// security directives&CR;</xsl:text>
		<xsl:if test="$widget/@scope='local' or not($widget/@scope)">
			<xsl:text>var </xsl:text>
		</xsl:if>
		<xsl:call-template name="variableName">
			<xsl:with-param name="widget" select="$widget"/>
		</xsl:call-template>
		<xsl:text> = qcl.auth.permission.Manager.getInstance();&CR;</xsl:text>
		<xsl:apply-templates select="$widget/qx:permission">
			<xsl:with-param name="expandedDocument" select="$expandedDocument"/>
			<xsl:with-param name="widget" select="$widget"/>
		</xsl:apply-templates>	
	</xsl:template>
	
	<!-- permission -->
	<xsl:template match="qxti:securityPermissionWidgetContentTemplate">
		<xsl:param name="expandedDocument" />
		<xsl:param name="widget"/>
		<xsl:variable name="name" select="$widget/@name"/>

		<!-- variable name -->
		<xsl:variable name="permVarName">
			<xsl:call-template name="variableName">
				<xsl:with-param name="widget" select="$widget"/>
			</xsl:call-template>
		</xsl:variable>

		<xsl:text>/* permission </xsl:text>
		<xsl:value-of select="$name"/>
		<xsl:text>*/&CR;</xsl:text>
		<xsl:text>var </xsl:text>
		<xsl:value-of select="$permVarName"/>			
		<xsl:text> = </xsl:text>

		<xsl:choose>

			<xsl:when test="generate-id($expandedDocument//*[@name=$name][1]) = generate-id($widget)">
				<!-- first element with permission name -->
				<xsl:call-template name="parentName">
					<xsl:with-param name="widget" select="$widget"/>
				</xsl:call-template>
				<xsl:text>.create("</xsl:text>
				<xsl:value-of select="$name"/>
				<xsl:text>");&CR;</xsl:text>
			</xsl:when>
			<xsl:otherwise>
				<!-- permission has already been referenced -->
				<xsl:call-template name="variableName">
  				<xsl:with-param name="widget" select="$expandedDocument//*[@name=$name][1]"/>
  			</xsl:call-template>
				<xsl:text>;&CR;</xsl:text>
			</xsl:otherwise>
		</xsl:choose>

		<!-- granted attribute -->
		<xsl:if test="$widget/@granted">
			<xsl:value-of select="$permVarName"/>
			<xsl:text>.setGranted(</xsl:text>
			<xsl:value-of select="$widget/@granted"/>
			<xsl:text>);&CR;</xsl:text>
		</xsl:if>

		<!-- apply all templates on child widgets -->
		<xsl:apply-templates select="$widget/*">
			<xsl:with-param name="expandedDocument" select="$expandedDocument"/>
			<xsl:with-param name="widget" select="$widget"/>
		</xsl:apply-templates>		
	</xsl:template>

	<!-- condition -->
	<xsl:template match="qxti:securityConditionWidgetContentTemplate">
		<xsl:param name="expandedDocument" />
		<xsl:param name="widget"/>
		<xsl:call-template name="variableName">
			<xsl:with-param name="widget" select="$widget/.."/>
		</xsl:call-template>
		<xsl:text>.addCondition(function(){&CR;</xsl:text>
		<xsl:choose>
			<xsl:when test="'&DEBUG;'='yes'">
				<xsl:value-of select="$widget" disable-output-escaping="yes"/>
			</xsl:when>
			<xsl:otherwise>
				<xsl:value-of select="normalize-space($widget)" disable-output-escaping="yes"/>
			</xsl:otherwise>
		</xsl:choose>
		<xsl:text>&CR;},</xsl:text>
			<xsl:call-template name="variableName">
				<xsl:with-param name="widget" select="$widget/../../.."/>
			</xsl:call-template>			
		<xsl:text>);&CR;</xsl:text>
	</xsl:template>

	<!-- updater -->
	<xsl:template match="qxti:securityUpdaterWidgetContentTemplate">

		<xsl:param name="expandedDocument" />
		<xsl:param name="widget"/>

		<!-- update on message -->
		<xsl:if test="$widget/@message">
			<xsl:text>qx.event.message.Bus.subscribe("</xsl:text>
			<xsl:value-of select="$widget/@message"/>
			<xsl:text>",function(){&CR;</xsl:text>
  		<xsl:call-template name="variableName">
  			<xsl:with-param name="widget" select="$widget/.."/>
  		</xsl:call-template>
			<xsl:text>.update()}&CR;);&CR;</xsl:text>
		</xsl:if>

		<!-- update on event -->
		<xsl:if test="$widget/@event">
  		<xsl:call-template name="variableName">
  			<xsl:with-param name="widget" select="$widget/../../.."/>
  		</xsl:call-template>
			<xsl:text>.addEventListener("</xsl:text>
			<xsl:value-of select="$widget/@event"/>
			<xsl:text>",function(){&CR;</xsl:text>
  		<xsl:call-template name="variableName">
  			<xsl:with-param name="widget" select="$widget/.."/>
  		</xsl:call-template>
			<xsl:text>.update()}&CR;);&CR;</xsl:text>
		</xsl:if>		

	</xsl:template>
	
	<!-- dependency element -->
	<xsl:template match="qxti:securityDependencyWidgetContentTemplate">
		<xsl:param name="expandedDocument" />
		<xsl:param name="widget"/>
		
		<xsl:variable name="attribute">
			<xsl:value-of select="$widget/@permission"/>
		</xsl:variable>
		<xsl:variable name="permVarName">
			<xsl:call-template name="variableName">
				<xsl:with-param name="widget" select="$expandedDocument//qx:permission[@name=$attribute][1]"/>
			</xsl:call-template>
		</xsl:variable>
		
		<xsl:if test="$permVarName!='&PREFIX;'">

			<!-- add condition: make this permission's state on master permission's state -->			
			<xsl:text>// depends on permission </xsl:text>		
			<xsl:value-of select="$attribute"/>
			<xsl:text>&CR;</xsl:text>	
			<xsl:call-template name="variableName">
				<xsl:with-param name="widget" select="$widget/.."/>
			</xsl:call-template>
			<xsl:text>.addCondition(function(){&CR;return </xsl:text>
			<xsl:value-of select="$permVarName"/>
			<xsl:text>.getState()}&CR;);&CR;</xsl:text>		
			<!-- add event listener: update permission when master permission changes state -->
			<xsl:value-of select="$permVarName"/>
			<xsl:text>.addEventListener("changeState",function(){&CR;</xsl:text>
			<xsl:call-template name="variableName">
				<xsl:with-param name="widget" select="$widget/.."/>
			</xsl:call-template>						
			<xsl:text>.update()}&CR;);&CR;</xsl:text>

		</xsl:if>
		
		<!-- exit compilation when permission is not defined -->
		<xsl:if test="$permVarName='&PREFIX;'">
			<xsl:message terminate="yes">
				<xsl:text>&CR;  ### Error: Unregistered Permission "</xsl:text>
				<xsl:value-of select="$attribute"/>
				<xsl:text>" ###&CR;&CR;</xsl:text>
			</xsl:message>
		</xsl:if>

	</xsl:template>
	
	<!-- attributes that use permissions -->

	<!-- enableOnPermission attribute -->
	<xsl:template match="qxti:enableOnPermissionAttributeHandler">
		<xsl:param name="widget"/>
		<xsl:param name="attribute"/>
		<xsl:param name="expandedDocument"/>
		<xsl:text>// enabled state depends on permission </xsl:text>		
		<xsl:value-of select="$attribute"/>
		<xsl:text>&CR;</xsl:text>			
		<xsl:variable name="permVarName">
			<xsl:call-template name="variableName">
				<xsl:with-param name="widget" select="$expandedDocument//qx:permission[@name=$attribute][1]"/>
			</xsl:call-template>
		</xsl:variable>
		<xsl:if test="$permVarName">
			<xsl:value-of select="$permVarName"/>
			<xsl:text>.addEventListener("changeState",function(e){&CR;this.setEnabled(e.getData())&CR;},</xsl:text>
			<xsl:call-template name="variableName">
				<xsl:with-param name="widget" select="$widget"/>
			</xsl:call-template>
			<xsl:text>);&CR;</xsl:text>
		</xsl:if>
		<xsl:if test="$permVarName='&PREFIX;'">
			<xsl:message terminate="yes">
				<xsl:text>&CR;  ### Error: Unregistered Permission "</xsl:text>
				<xsl:value-of select="$attribute"/>
				<xsl:text>" ###&CR;&CR;</xsl:text>
			</xsl:message>
		</xsl:if>
	</xsl:template>

	<!-- displayOnPermission attribute -->
	<xsl:template match="qxti:displayOnPermissionAttributeHandler">
		<xsl:param name="widget"/>
		<xsl:param name="attribute"/>
		<xsl:param name="expandedDocument"/>
		<xsl:text>// visibility depends on permission </xsl:text>		
		<xsl:value-of select="$attribute"/>
		<xsl:text>&CR;</xsl:text>				
		<xsl:variable name="permVarName">
			<xsl:call-template name="variableName">
				<xsl:with-param name="widget" select="$expandedDocument//qx:permission[@name=$attribute][1]"/>
			</xsl:call-template>
		</xsl:variable>

		<xsl:if test="$permVarName">
			<xsl:value-of select="$permVarName"/>
			<xsl:text>.addEventListener("changeState",function(e){&CR;this.setDisplay(e.getData())&CR;},</xsl:text>
			<xsl:call-template name="variableName">
				<xsl:with-param name="widget" select="$widget"/>
			</xsl:call-template>
			<xsl:text>);&CR;</xsl:text>
		</xsl:if>
		<xsl:if test="$permVarName='&PREFIX;'">
			<xsl:message terminate="yes">
				<xsl:text>&CR;  ### Error: Unregistered Permission "</xsl:text>
				<xsl:value-of select="$attribute"/>
				<xsl:text>" ###&CR;&CR;</xsl:text>
			</xsl:message>
		</xsl:if>
	</xsl:template>
		
</xsl:stylesheet>
	
	
	
	