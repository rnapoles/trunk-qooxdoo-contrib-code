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
    // table model and resize behaviour
    var tableModel = new qx.ui.table.model.Simple();
    tableModel.setColumns(
      ["(hidden)",this.getPropertyColumnLabel(),this.getValueColumnLabel(),"(hidden)"],
      ['id','label','value','metadata']
    );
    tableModel.setColumnEditable(2,true);
    var resizeBehaviour = { tableColumnModel : function(obj){ return new qx.ui.table.columnmodel.Resize(obj); } };
    
    // call Table constructor
    this.base(arguments, tableModel, resizeBehaviour );
    
    // configure columns
    var columnModel = this.getTableColumnModel();
    columnModel.getBehavior().setWidth(1,100);
    columnModel.getBehavior().setWidth(2,"1*");
    columnModel.setColumnVisible(0,false);
    columnModel.setColumnVisible(3,false);
    columnModel.setDataCellRenderer(2, this.getDynamicCellRenderer() );
    columnModel.setCellEditorFactory(2, this.getDynamicCellEditor() );
    
    // selection 
    this.getSelectionModel().setSelectionMode(qx.ui.table.selection.Model.SINGLE_SELECTION);
    this.setColumnVisibilityButtonVisible(false);
    this.setKeepFirstVisibleRowComplete(true);
    this.setStatusBarVisible(false);
    this.setAlwaysUpdateCells(true);
    
    // navigation up and down
    this.addEventListener("changeEditedCell",function(e)
    {
      //console.log("changeEditedCell event:" +  e.getData() );
      this.stopEditing();
      var direction = e.getData();
      var col = this.getFocusedColumn(); 
      var row = this.getFocusedRow();
      row = row + ( direction == "Up"  ? -1 * (row > 0) : 1 * ( row < this.getTableModel().getRowCount() ) );
      this.getSelectionModel().setSelectionInterval(row,row);
      this.setFocusedCell( col, row, true);
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

			for ( var cmd in metaData )
			{
				switch ( cmd )
				{	  
          case "type":
            switch ( metaData.type )
            {
              case "checkbox": return new qx.ui.table.cellrenderer.Boolean;
              case "password": return new qx.ui.table.cellrenderer.Password;
              case "link":     return new qcl.ui.LinkCellRenderer;
            }
            break;
            
          case "options":
            var renderer = new qx.ui.table.cellrenderer.Replace;
            var replaceMap = {};
            metaData['options'].forEach(function(row){
              if (row instanceof Array)
              {
                replaceMap[row[0]]=row[2];
              }
            });
            renderer.setReplaceMap(replaceMap);
						renderer.addReversedReplaceMap();    
            return renderer;							
				}
      }
      return new qx.ui.table.cellrenderer.Default;	
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
			var cellEditor 	= new qx.ui.table.celleditor.TextField;	
			var validationFunc 	= null;
			 
			for ( var cmd in metaData )
			{
				switch ( cmd )
				{	
					case "options":
						cellEditor = new qx.ui.table.celleditor.ComboBox;
						cellEditor.setListData( metaData['options'] );
						cellEditor.setEditable( false );
						break;

          case "type":
             switch ( metaData['type'] )
             {
               case "password":
                 cellEditor = new qx.ui.table.celleditor.PasswordField; break;  
               case "checkbox":
						     cellEditor = new qx.ui.table.celleditor.CheckBox; break;
               case "email":
    						 cellEditor.setValidationFunction (function( newValue, oldValue ){
    							 var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*\.(\w{2}|(com|net|org|edu|int|mil|gov|arpa|biz|aero|name|coop|info|pro|museum))$/;
    							 if ( re.test(newValue) ) return newValue;
    							 alert("You did not enter a valid email address");
    							 return oldValue;  
    						 });
    						 break;
             }
						
						break;
						
					case "editable":
						cellEditor.setEditable( metaData['editable'] === true );
						break;										

					case "regExp":
						cellEditor.setValidationFunction (function( newValue, oldValue ){
							var re = new RegExp(metaData['regExp']);
							if ( re.test(newValue) ) return newValue;
							alert(metaData['failMsg']);
							return oldValue;  
						});
						break;
            
 					case "validationFunc":
            cellEditor.setValidationFunction (metaData['validationFunc']);
						break;
						
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
            
          case "autocomplete":
						cellEditor = table._getCustomAutoCompleteComboBoxCellEditor(table,metaData.autocomplete);
						break;                        								
				}	
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
     * private method to configure the autocompleting combobox in-place-editor
     * @return qcl.databinding.simple.AutoCompleteComboBoxCellEditor
     */  
	  _getCustomAutoCompleteComboBoxCellEditor : function (propertyEditor,autocompleteInfo)
    {
      var cellEditor = new qcl.databinding.simple.AutoCompleteComboBoxCellEditor;
      
      /*
       * configure autocomplete metadata
       */
      cellEditor.setMetaData(autocompleteInfo);
      
      /*
       * set a reference to this property editor and overwrite open popup method
       */
      cellEditor.setTable(propertyEditor);
      cellEditor.setOpenPopupFunction(propertyEditor._openPopup);
      cellEditor.setClosePopupFunction(propertyEditor._closePopup);
      
      /*
       * return altered combobox
       */
      return cellEditor;
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
     * @type member
     * @return {void}
     */
    _closePopup : function()
    {
      /*
       * hide popup
       */
      this._popup.hide();
      
      /*
       * restore table width
       */
      if ( this._oldPropEdWidth )
      {
        this._table.setWidth( this._oldPropEdWidth );  
      }
     
      /*
       * disable event capturing
       */
      this.setCapture(false);
      
      /*
       * put cursor at the end of the textfield
       */
      qx.client.Timer.once(function(){
        var lastPos = this._field.getValue().length;
        this._field.selectFromTo(lastPos,lastPos);        
      },this,100);
            
    }
   
   
    
 },
     
});
