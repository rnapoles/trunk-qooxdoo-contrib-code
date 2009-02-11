/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2007 Christian Boulanger

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Christian Boulanger (cboulanger)

************************************************************************ */

/* ************************************************************************

************************************************************************ */

/**
 * An extension of the qx.ui.table.Table widget that can be used as a 
 * property editor and uses the qcl.databinding package for databinding
 * 
 * The data supplied by the backend must look like so: (@todo)
 * 
 * {"tabledatamodel":[
 *   // Row : User role
 *   // rendered with Replace, edited with radiogroup
 *   [ 
 *     // The label of the row (column 1)
 *     "Role",
 *     // The visible label of the cell (column 2)
 *     "Portal Administrator",
 *     // The "real" value of the cell (invisible column 3)
 *     "admin",
 *     // metadata
 *     { "type"   : "radiogroup",
 *       "options": [ 
 *         ["Portal Administrator",null,"admin"],
 *         ["Website Editor",null,"editor"],
 *         ["User",null,"user"]
 *     }
 *   ],
 *   // Row : Keywords associated with user
 *   // Multi-value field, keyword separated by ";"
 *   // Rendered with normal textfield, edited with autocomplete feature
 *   [
 *   "author"
,"Creator","Boulanger, Christian",{"autocomplete":{"datasource":"test1","fieldName":"author","serviceName"
:"bibliograph.records","serviceMethodAutoComplete":"autocomplete","separator":";"}}],["year","Year","1998"
,[]],["title","Title","Judicial Review and the Theory of the Weak Court",[]],["date","Date","",[]],["keywords"
,"Keywords","judicial review",{"autocomplete":{"datasource":"test1","fieldName":"keywords","serviceName"
:"bibliograph.records","serviceMethodAutoComplete":"autocomplete","separator":";"}}],["url","Internet
 Link","http:\/\/www.panyasan.de\/publications\/texts\/Boulanger1998.pdf",[]]]},"events":[],"messages"
:[{"name":"bibliograph.commands.application.setTitle","data":"Boulanger, Christian (1998): Judicial Review
 and the Theory of the Weak Court"}]}
 */
qx.Class.define("qcl.databinding.simple.PropertyEditor",
{
  extend : qx.ui.table.Table,

  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function()
  {
    /*
     * table model and resize behaviour
     */
    var tableModel = new qx.ui.table.model.Simple();
    tableModel.setColumns(
      ["(hidden)",this.getPropertyColumnLabel(),this.getValueColumnLabel(),"(hidden)"],
      ['id','label','value','metadata']
    );
    tableModel.setColumnEditable(2,true);
    var resizeBehaviour = { tableColumnModel : function(obj){ return new qx.ui.table.columnmodel.Resize(obj); } };
    
    /*
     * call Table constructor
     */
    this.base(arguments, tableModel, resizeBehaviour );
    
    /*
     * configure columns
     */
    var columnModel = this.getTableColumnModel();
    columnModel.getBehavior().setWidth(1,100);
    columnModel.getBehavior().setWidth(2,"1*");
    columnModel.setColumnVisible(0,false);
    columnModel.setColumnVisible(3,false);
    columnModel.setDataCellRenderer(2, this.getDynamicCellRenderer() );
    columnModel.setCellEditorFactory(2, this.getDynamicCellEditor() );
    
    /*
     * selection
     */ 
    this.getSelectionModel().setSelectionMode(qx.ui.table.selection.Model.SINGLE_SELECTION);
    this.setColumnVisibilityButtonVisible(false);
    this.setKeepFirstVisibleRowComplete(true);
    this.setStatusBarVisible(false);
    this.setAlwaysUpdateCells(true);

    
    /*
     * navigation up and down
     */
    this.addEventListener("changeEditedCell",function(e)
    {
      //console.log("changeEditedCell event:" +  e.getData() );
      this.stopEditing();
      var direction = e.getData();
      var col = this.getFocusedColumn(); 
      var row = this.getFocusedRow();
      row = row + ( direction == "Up"  ? -1 * (row > 0) : 1 * ( row < this.getTableModel().getRowCount() ) );
      this.getSelectionModel().setSelectionInterval(row,row);
      this.setFocusedCell( col, row, true );
      this.startEditing();
    });
    
  },

  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /**
     * width of label column
     */
    columnWidthLabel :
    {
      apply : "_applyColumnWidthLabel"
    },
    
    /**
     * width of value column
     */
    columnWidthValue :
    {
      apply : "_applyColumnWidthValue"
    },
    
    /**
     * whether the property editor is editable
     */ 
    editable : 
    {
      apply : "_applyEditable",
      check: "Boolean",
      init : true
    },
    /**
     * the label of the property column
     */ 
    propertyColumnLabel : 
    {
      check: "String",
      init : " "
    },
    
    /**
     * the label of the value column
     */ 
    valueColumnLabel : 
    {
      check: "String",
      init : "Doubleclick or press 'enter' to edit"
    }
  },
  
  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    
    /**
     * applies width of label column
     */
    _applyColumnWidthLabel : function(value,old)
    {
      this.getTableColumnModel().getBehavior().setWidth(1,value);
    },
    
    /**
     * applies width of value column
     */
    _applyColumnWidthValue : function(value,old)
    {
      this.getTableColumnModel().getBehavior().setWidth(2,value);
    },
    
    /**
     * applies the editable property
     */
    _applyEditable : function (value,old)
    {
      this.getTableModel().setColumnEditable(2,value);  
    },
    
    /**
     * cell renderer factory method.
     * assumes the following row data structure: 
     * [ string id, string label, string value, object metadata ] 
     * @param {Object} cellInfo
     * @return {Object} new instance of a cell renderer 
     */
    createCellRenderer : function (cellInfo)
    {
      var table 			 = cellInfo.table;	
			var tableModel 	 = table.getTableModel();
			var rowData			 = tableModel.getRowData(cellInfo.row);
			var metaData		 = rowData[3];
			var renderer;
			
			for ( var cmd in metaData )
			{
				switch ( cmd )
				{	  
          case "renderer":
            switch ( metaData.renderer )
            {
              case "text" : 
                renderer =  new qx.ui.table.cellrenderer.Default;
                break;
                
              case "checkbox" : 
                renderer = new qx.ui.table.cellrenderer.Boolean;
                break;
                
              case "password" : 
                renderer = new qx.ui.table.cellrenderer.Password;
                break;
                
              case "link" : 
                renderer = new qcl.ui.LinkCellRenderer;
                break;
                
              case "replace" : 
                renderer = new qx.ui.table.cellrenderer.Replace;
                break;
                
              default: 
                table.error("Unsupported renderer type " + metaData.renderer );
                return null;
            }
            break;
            
          case "options":
            if ( renderer.setReplaceMap )
            {
              
              if ( typeof renderer != "object" )
              {
                table.error("You need to define the renderer type before the options");
                return null;
              }
              
              var replaceMap = {};
              metaData['options'].forEach(function(row){
                if (row instanceof Array)
                {
                  replaceMap[row[0]]=row[2];
                }
              });
              
              
              renderer.setReplaceMap(replaceMap);
  						renderer.addReversedReplaceMap();
            }
				}
      }
			
      if ( typeof renderer != "object" )
      {
        table.error("No renderer type defined");
      }
			
      return renderer;	
    },
    
    /**
     * cell editor factory method
     * assumes the following row data structure: 
     * [ string id, string label, string value, object metadata ] 
     * @param {Object} cellInfo
     * @return {Object} new instance of a cell renderer 
     */
		createCellEditor : function (cellInfo) 
		{
			var table 			= cellInfo.table;	
			var tableModel 	= table.getTableModel();
			var rowData			= tableModel.getRowData(cellInfo.row);
			var metaData		= rowData[3];
			var validationFunc   = null;
			
			/*
			 * default cellEditors, for backward compatibility
			 */
			var cellEditor;
			if ( ! metaData.editor )
			{
			  if ( metaData.options )
			  {
			    metaData.editor = "combobox";
			    cellEditor = new qx.ui.table.celleditor.ComboBox;
			  }
			  else
			  {
			    metaData.editor = "text";
			    cellEditor  = new qx.ui.table.celleditor.TextField; 
			  }
			}
			 
			/*
			 * meta data special cases
			 */
			for ( var cmd in metaData )
			{
				switch ( cmd )
				{	

          case "editor":
             switch ( metaData['editor'] )
             {
               
               /*
                * normal text cell editor
                */
               case "text" :
                 cellEditor = new qx.ui.table.celleditor.TextField; 
                 break;
                 
               /*
                * combo box cell editor for selections
                * @todo: listData?/options...
                */
               case "select":
                 cellEditor = new qx.ui.table.celleditor.ComboBox;
                 break;
                 
               /*
                * radio group cell editor
                */
               case "radiogroup" :
                 cellEditor = new qcl.databinding.simple.RadioGroupCellEditorFactory;
                 break;
                 
               /*
                * radio group cell editor
                */
               case "checkboxgroup" :
                 cellEditor = new qcl.databinding.simple.CheckBoxGroupCellEditorFactory;
                 break;                
                 
               /*
                * password cell editor
                */
               case "password":
                 cellEditor = new qx.ui.table.celleditor.PasswordField; 
                 break;  
                 
               /*
                * Check box cell editor
                */
               case "checkbox":
						     cellEditor = new qx.ui.table.celleditor.CheckBox; 
						     break;
						     
						   /*
						    * Email celll editor
						    */
               case "email":
                 cellEditor  = new qx.ui.table.celleditor.TextField; 
                 cellEditor.setValidationFunction (function( newValue, oldValue ){
    							 var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*\.(\w{2}|(com|net|org|edu|int|mil|gov|arpa|biz|aero|name|coop|info|pro|museum))$/;
    							 if ( re.test(newValue) ) return newValue;
    							 alert("You did not enter a valid email address");
    							 return oldValue;  
    						 });
    						 break;
    						 
  		          /*
  		           * Autocomplete cell editors. We cannot use the normal
  		           * celleditors with the autocomplete mixin here, but need
  		           * special factory classes for single-value and multiple-value
  		           * fields 
  		           */           
  		          case "autocomplete":
  		            if ( ! metaData.autocomplete)
  		            {
  		              this.error("Autocomplete metadata is missing.");
  		            }
  		            
  		            if ( metaData.autocomplete.separator )
  		            {
  		              var cellEditor = new qcl.databinding.simple.MultipleValueCellEditorFactory;
  		            }
  		            else
  		            {
  		              var cellEditor = new qcl.databinding.simple.AutoCompleteComboBoxCellEditorFactory;
  		              /*
  		               * overwrite open popup method
  		               */
  		              cellEditor.setOpenPopupFunction( table._openPopup );
  		              cellEditor.setClosePopupFunction( table._closePopup );              
  		            }

  		            /* 
  		             * set a reference to this property editor
  		             */
  		            cellEditor.setTable( table );
  		            
  		            break;    						 
             }
						
						break;				
						
          /*
           * whether the cell editor is editable
           */
					case "editable":
					  if ( cellEditor.setEditable )
					  {
					    cellEditor.setEditable( metaData['editable'] === true );
					  }
					  else if ( cellEditor.setReadOnly )
					  {
					    cellEditor.setReadOnly( metaData['editable'] === false );
					  }
						break;										
					
					/*
					 * a regular expression that is used by a created
					 * validation function
					 */
					case "regExp":
						cellEditor.setValidationFunction (function( newValue, oldValue ){
							var re = new RegExp(metaData['regExp']);
							if ( re.test(newValue) ) return newValue;
							alert(metaData['failMsg']);
							return oldValue;  
						});
						break;
          
					/*
					 * a special validation function
					 */
 					case "validationFunc":
            cellEditor.setValidationFunction (metaData['validationFunc']);
						break;
						
					/*
					 * if the field cannot be empty
					 */	
					case "required":
						cellEditor.setValidationFunction (function( newValue, oldValue ){
							if (! newValue)
							{
								alert("You need to supply a value here");
								return oldValue;
							}
							return newValue;  
						});
						break;		
				}	
			}
			 
      /*
       * pass  metadata to editor if supported
       */
			if ( cellEditor.setMetaData )
			{
			  cellEditor.setMetaData( metaData );
			}
			return cellEditor;
		},
    
    /**
     * get dynamic cell renderer
     * @return {qx.ui.table.cellrenderer.Dynamic} 
     */
    getDynamicCellRenderer : function()
    {
      return new qx.ui.table.cellrenderer.Dynamic(this.createCellRenderer);
    },
    
    /**
     * get dynamic cell editor
     * @return {qx.ui.table.cellrenderer.Dynamic} 
     */
    getDynamicCellEditor : function()
    {
      return new qx.ui.table.celleditor.Dynamic(this.createCellEditor);
    },
    
    

  
    /**
     * Sets the position and width of the combobox popup. Additionally dispatches an event
     * if the popup is opened the first time. Enables the event capturing.
     * This overwrites the native method.
     * @type member
     * @return {void}
     */
    _openPopup : function()
    {
      
      /*
       * return if empty or only one element
       */
      if (this._list.getChildrenLength() < 2 ) 
      {
        return;
      }
      
      /*
       * get popup object and dom element
       */
      var p = this._popup;
      var el = this.getElement();
      
      /*
       * call pre open function
       */
      if (!p.isCreated()) 
      {
        this.createDispatchEvent("beforeInitialOpen");
      }

      /*
       * set the parent to the client document
       */
      var topWidget = this.getTopLevelWidget();
      p.setParent( topWidget );

      /*
       * get property editor object
       */
      var tel = this._table.getElement();
      var loc = qx.bom.element.Location.get(tel);      
      var dim = qx.bom.element.Dimension;
      var tw  = dim.getWidth(tel);
      var th  = dim.getHeight(tel); 
      
      //console.log([loc,tw,th]);

      /*
       * set position of popup
       */
      p.setTop( loc.top );
      p.setRight( 5 ); 
      p.setWidth( parseInt( tw / 3) );
      p.setHeight( th );
      p.setMaxHeight( th );
      
      /*
       * shrink property editor, will be restored 
       * when popup closes.
       */
      this._oldPropEdWidth = tw;
      this._table.setWidth( parseInt( tw * 2/3 ) );
      
      /*
       * open popup
       */
      p.show();

      /*
       * save selected item
       */
      this._oldSelected = this.getSelected();
      
      /*
       * enable event capturing
       */
      this.setCapture(true);
    },

  
    /**
     * Hides the popup and disables the event capturing.
     * This overwrites the native method.
     * @return {void}
     */
    _closePopup: function()
    {
      /*
       * hide popup
       */
      this._popup.hide();
      
      /*
       * restore table width
       */
      if (this._oldPropEdWidth) 
      {
        this._table.setWidth(this._oldPropEdWidth);
      }
      
      /*
       * disable event capturing
       */
      this.setCapture(false);
      
      /*
       * put cursor at the end of the textfield
       */
      qx.client.Timer.once(function()
      {
        var lastPos = this.getTextBox().getValue().length;
        this.getTextBox().selectFromTo(lastPos, lastPos);
      }, this, 100);
      
    }  
  }
});
