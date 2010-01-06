<?xml version='1.0'?>
<!-- 

	QxTransformer
	Converts QXML to Javascript
	
	License: LGPL
	Autors: Siarhei Barysiuk <s.barysiuk@gmail.com>	
			Christian Boulanger <info@bibliograph.org>

	templates for "qx.ui.Table" widget processing
	data insertion is done only programmatically
	if you want to populate a table using xml, use listview
	widget instead.
	
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

	<!-- qx.ui.table.Table widget -->
	<xsl:template match="qxti:tableContentWidgetHandler">
		<xsl:param name="widget"/>
		<xsl:param name="addTemplateName"/>
		<xsl:param name="expandedDocument"/>

		<!-- table variable -->
		<xsl:variable name="tableVarName">
			<xsl:call-template name="variableName">
				<xsl:with-param name="widget" select="$widget"/>
			</xsl:call-template>
		</xsl:variable>

		<!-- table model variable -->
		<xsl:variable name="tableModelVarName">
			<xsl:call-template name="variableName">
				<xsl:with-param name="widget" select="$widget"/>
			</xsl:call-template>
			<xsl:text>_tableModel</xsl:text>
		</xsl:variable>

		<!-- table model -->		
		
		<xsl:choose>
		
			<xsl:when test="$widget/@tableModel='simple' or not($widget/@tableModel) ">
			
				<!-- instantiate simple table model-->
				<xsl:text>&CR;var </xsl:text>			
				<xsl:value-of select="$tableModelVarName"/>
				<xsl:text> = new qx.ui.table.model.Simple();&CR;</xsl:text>
				
			</xsl:when>
			
			<xsl:otherwise>
			
				<!-- make sure class gets included into (source) build -->
				<xsl:text>/**&CR;#require(</xsl:text>
				<xsl:value-of select="$widget/@tableModel"/>
				<xsl:text>)&CR;*/&CR;</xsl:text>
				
				<!-- instantiate class -->
				<xsl:text>&CR;var </xsl:text>			
				<xsl:value-of select="$tableModelVarName"/>
				<xsl:text> = new </xsl:text>
				<xsl:value-of select="$widget/@tableModel"/>
				<xsl:text>();&CR;</xsl:text>
			
			</xsl:otherwise>			
		
		</xsl:choose>
		
		<!-- define columns names -->	
		<xsl:value-of select="$tableModelVarName"/>
		<xsl:text>.setColumns([</xsl:text>
		<xsl:for-each select="$widget/*[name(.)='qx:tableColumn']">
			<xsl:text>"</xsl:text>
			<xsl:value-of select="./@label"/>
			<xsl:text>"</xsl:text>
			<xsl:if test="not(position()=last())">
				<xsl:text>,</xsl:text>
			</xsl:if>
		</xsl:for-each>
		<xsl:if test="not($widget/*[name(.)='qx:tableColumn']/@key)">
			<xsl:text>]);&CR;</xsl:text>
		</xsl:if>
		<xsl:if test="$widget/*[name(.)='qx:tableColumn']/@key">
			<xsl:text>],[</xsl:text>
		</xsl:if>
		
		<!-- column ids/keys -->
		<xsl:if test="$widget/*[name(.)='qx:tableColumn']/@key">
			<xsl:for-each select="$widget/*[name(.)='qx:tableColumn']">
				<xsl:text>"</xsl:text>
				<xsl:value-of select="./@key"/>
				<xsl:text>"</xsl:text>
				<xsl:if test="position()!=last()">
					<xsl:text>,</xsl:text>
				</xsl:if>
			</xsl:for-each>
			<xsl:text>]);&CR;</xsl:text>
		</xsl:if>	
			
		<!-- editable columns tableModel.setColumnEditable(1, true); -->
		<xsl:for-each select="$widget/*[name(.)='qx:tableColumn']">
			<xsl:if test="./@editable='true'">
					<xsl:value-of select="$tableModelVarName"/>
					<xsl:text>.setColumnEditable(</xsl:text>
					<xsl:value-of select="position()-1"/>
					<xsl:text>,true);&CR;</xsl:text>
			</xsl:if>
		</xsl:for-each>			
			
		<!-- custom resize behaviour -->
		<xsl:text>var </xsl:text>  		  
		<xsl:value-of select="$tableVarName"/>
		<xsl:text>_resizeBehaviour = { tableColumnModel : function(obj){ return new qx.ui.table.columnmodel.Resize(obj); } };&CR;</xsl:text>  
	  
		<!-- create table -->
		<xsl:text>var </xsl:text>
		<xsl:value-of select="$tableVarName"/>
		<xsl:text> = new qx.ui.table.Table(</xsl:text>
		<xsl:value-of select="$tableModelVarName"/>
		<xsl:text>,</xsl:text>
		<xsl:value-of select="$tableVarName"/>
		<xsl:text>_resizeBehaviour);&CR;</xsl:text>

		<!-- column widths -->
		<xsl:for-each select="$widget/*[name(.)='qx:tableColumn']">
			<xsl:if test="./@width">
					<xsl:value-of select="$tableVarName"/>
					<xsl:text>.getTableColumnModel().getBehavior().setWidth(</xsl:text>
					<xsl:value-of select="position()-1"/>
					<xsl:text>,</xsl:text>
					<xsl:call-template name="attributeValuePlain">
						<xsl:with-param name="widget" select="$widget"/>
						<xsl:with-param name="attribute" select="./attribute[@name='width']"/>
						<xsl:with-param name="value" select="./@width"/>
					</xsl:call-template>
					<xsl:text>);&CR;</xsl:text>
			</xsl:if>
			<xsl:if test="./@minWidth">
					<xsl:value-of select="$tableVarName"/>
					<xsl:text>.getTableColumnModel().getBehaviour().setMinWidth(</xsl:text>
					<xsl:value-of select="position()-1"/>
					<xsl:text>,</xsl:text>
					<xsl:call-template name="attributeValuePlain">
						<xsl:with-param name="widget" select="$widget"/>
						<xsl:with-param name="attribute" select="./attribute[@name='minWidth']"/>
						<xsl:with-param name="value" select="./@width"/>
					</xsl:call-template>
					<xsl:text>);&CR;</xsl:text>
			</xsl:if>
			<xsl:if test="./@maxWidth">
					<xsl:value-of select="$tableVarName"/>
					<xsl:text>.getTableColumnModel().getBehaviour().setMaxWidth(</xsl:text>
					<xsl:value-of select="position()-1"/>
					<xsl:text>,</xsl:text>
					<xsl:call-template name="attributeValuePlain">
						<xsl:with-param name="widget" select="$widget"/>
						<xsl:with-param name="attribute" select="./attribute[@name='maxWidth']"/>
						<xsl:with-param name="value" select="./@width"/>
					</xsl:call-template>
					<xsl:text>);&CR;</xsl:text>
			</xsl:if>
		</xsl:for-each>						

		<!-- column visibility -->
		<xsl:for-each select="$widget/*[name(.)='qx:tableColumn']">
			<xsl:if test="./@display">
					<xsl:value-of select="$tableVarName"/>
					<xsl:text>.getTableColumnModel().setColumnVisible(</xsl:text>
					<xsl:value-of select="position()-1"/>
					<xsl:text>,</xsl:text>
					<xsl:call-template name="attributeValuePlain">
						<xsl:with-param name="widget" select="$widget"/>
						<xsl:with-param name="attribute" select="./attribute[@name='display']"/>
						<xsl:with-param name="value" select="./@display"/>
					</xsl:call-template>
					<xsl:text>);&CR;</xsl:text>
			</xsl:if>
		</xsl:for-each>		
		
		<!-- data cell renderer  -->
		<xsl:for-each select="$widget/*[name(.)='qx:tableColumn']">
			<xsl:if test="./@cellrenderer">
					<xsl:value-of select="$tableVarName"/>
					<xsl:text>.getTableColumnModel().setDataCellRenderer(</xsl:text>
					<xsl:value-of select="position()-1"/>
					<xsl:text>, </xsl:text>
					<xsl:choose>
						<xsl:when test="./@cellrenderer='default'">
							<xsl:text>new qx.ui.table.cellrenderer.Default</xsl:text>
						</xsl:when>					
						<xsl:when test="./@cellrenderer='boolean'">
							<xsl:text>new qx.ui.table.cellrenderer.Boolean</xsl:text>
						</xsl:when>
						<xsl:when test="./@cellrenderer='image'">
							<xsl:text>new qx.ui.table.cellrenderer.Image</xsl:text>
						</xsl:when>
						<xsl:when test="./@cellrenderer='password'">
							<xsl:text>new qx.ui.table.cellrenderer.Password</xsl:text>
						</xsl:when>						
						<xsl:otherwise>
							<xsl:value-of select="./@cellrenderer"/>
						</xsl:otherwise>
					</xsl:choose>
					<xsl:text>);&CR;</xsl:text>
			</xsl:if>
		</xsl:for-each>			

		<!-- cell editor factory -->
		<xsl:for-each select="$widget/*[name(.)='qx:tableColumn']">
			<xsl:if test="./@celleditor">
					<xsl:value-of select="$tableVarName"/>
					<xsl:text>.getTableColumnModel().setCellEditorFactory(</xsl:text>
					<xsl:value-of select="position()-1"/>
					<xsl:text>, </xsl:text>
					<xsl:choose>
						<xsl:when test="./@celleditor='textfield'">
							<xsl:text>new qx.ui.table.celleditor.TextField</xsl:text>
						</xsl:when>							
						<xsl:when test="./@celleditor='checkbox'">
							<xsl:text>new qx.ui.table.celleditor.CheckBox</xsl:text>
						</xsl:when>
						<xsl:when test="./@celleditor='password'">
							<xsl:text>new qx.ui.table.celleditor.Password</xsl:text>
						</xsl:when>						
						<xsl:otherwise>
							<xsl:value-of select="./@celleditor"/>
						</xsl:otherwise>
					</xsl:choose>
					<xsl:text>);&CR;</xsl:text>
			</xsl:if>
		</xsl:for-each>			
		
		<!-- meta columns counts-->
		<xsl:if test="$widget/@metaColumnCounts">
			<xsl:value-of select="$tableVarName"/>
			<xsl:text>.setMetaColumnCounts([</xsl:text>
			<xsl:value-of select="$widget/@metaColumnCounts"/>
			<xsl:text>);&CR;</xsl:text>
		</xsl:if>
		
		<!-- selection mode -->
		<xsl:value-of select="$tableVarName"/>
		<xsl:text>.getSelectionModel().setSelectionMode(qx.ui.table.selection.Model.</xsl:text>			
		<xsl:choose>
			<xsl:when test="$widget/@selectionMode = 'multipleInterval'">
				<xsl:text>MULTIPLE_INTERVAL_SELECTION</xsl:text>
			</xsl:when>
			<xsl:when test="$widget/@selectionMode = 'none'">
				<xsl:text>NO_SELECTION</xsl:text>
			</xsl:when>
			<xsl:when test="$widget/@selectionMode = 'singleInterval'">			
				<xsl:text>SINGLE_INTERVAL_SELECTION</xsl:text>
			</xsl:when>
			<xsl:otherwise>			
				<xsl:text>SINGLE_SELECTION</xsl:text>
			</xsl:otherwise>
		</xsl:choose>
		<xsl:text>);&CR;</xsl:text>
	
		<!-- process attributes -->
		<xsl:call-template name="attributesProcessing">
			<xsl:with-param	name="widget" select="$widget" />
			<xsl:with-param name="expandedDocument" select="$expandedDocument" />
			<xsl:with-param name="exclude" select="'tableModel,metaColumnCounts,selectionMode'" />
		</xsl:call-template>
		
		<!-- add to parent -->
		<xsl:call-template name="parentName">
			<xsl:with-param name="widget" select="$widget" />
		</xsl:call-template>
		<xsl:text>.add(</xsl:text>
		<xsl:call-template name="variableName">
			<xsl:with-param name="widget" select="$widget" />
		</xsl:call-template>
		<xsl:text>);&CR;</xsl:text>
		
		<!-- add event listeners -->
		<xsl:apply-templates select="$widget/qx:eventListener">
			<xsl:with-param name="expandedDocument" select="$expandedDocument"/>
		</xsl:apply-templates>
		<xsl:apply-templates select="$widget/qx:messageSubscriber" >
			<xsl:with-param name="expandedDocument" select="$expandedDocument"/>
		</xsl:apply-templates>

	</xsl:template>

</xsl:stylesheet>