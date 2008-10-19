/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2006 Christian Boulanger

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Christian Boulanger (cboulanger)

************************************************************************ */

/* ************************************************************************

#module(ui_table)

************************************************************************ */

/**
 * A cell editor factory creating combo boxes using qcl.databinding.simple.MAutoComplete.
 *
 * @appearance table-editor-combobox {qx.ui.form.ComboBox}
 */
qx.Class.define("qcl.databinding.simple.AutoCompleteComboBoxCellEditor",
{
  extend : qx.core.Target,
  implement : qx.ui.table.ICellEditorFactory,

  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function() {
    this.base(arguments);
  },


  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {

    /**
     * function that validates the result
     * the function will be called with the new value and the old value and is
     * supposed to return the value that is set as the table value.
     **/
    validationFunction :
    {
      check : "Function",
      nullable : true,
      init : null
    },

    /** the table this cellEditor is attached to */
    table :
    {
      check : "Object",
      init : null
    },
    
    /** metadata for the cell editor */
    metaData :
    {
      init : null,
      nullable : true
    },
    
    /** function that opens the popup ( overwrites ComboBox._openPopup() ) */
    openPopupFunction :
    {
      check : "Function",
      init : null,
      nullable : true
    },
    
    /** function that closes the popup ( overwrites ComboBox._closePopup() ) */
    closePopupFunction :
    {
      check : "Function",
      init : null,
      nullable : true
    }    
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /*
     * interface implementation
     */
    createCellEditor : function(cellInfo)
    {
      /*
       * configure combobox in-place editor and overwrite
       * popup functions
       */
      var cellEditor = new qx.ui.form.ComboBox;
      cellEditor.setEditable(true);
      cellEditor.setAutoComplete(true);
      cellEditor._openPopup  = this.getOpenPopupFunction();
      cellEditor._closePopup = this.getClosePopupFunction();
      cellEditor._table      = this.getTable();
      
      /*
       *  apply meta data
       */ 
      var metaData = this.getMetaData();
      cellEditor.setServiceName(metaData.serviceName);
      cellEditor.setServiceMethodAutoComplete(metaData.serviceMethodAutoComplete);
      cellEditor.setSeparator(metaData.separator);
      cellEditor.setMetaData(metaData);
      
      cellEditor.setBorder(null);
      cellEditor.originalValue = cellInfo.value;

      /*
       * text field
       */
      var field = cellEditor.getField();
      field.setLiveUpdate(true);
      field.setAppearance("table-editor-textfield");

      /*
       * Listbox
       */
      var listBox = cellEditor.getList();
      // hack to capture the "enter" key.
      listBox.addEventListener("enterPressed",function()
      {
        this.getTable().createDispatchDataEvent("changeEditedCell","Down"); 
      },this);
      
      
      var value = cellInfo.value;

      /*
       * replace null values
       */
      if ( value === null )
      {
        value = "";
      }

      field.setValue("" + value );

      field.addEventListener("appear", function() {
        this.selectAll();
      });
      
      /*
       * catch cell action
       */
      cellEditor.addEventListener("cellAction", function (e)
      {
        
        var direction="", key = e.getData();
        //console.log("cell action:" + key );
        switch(key)
        {
          case "Enter":
          case "Down":
            direction = "Down";
            break;
          case "Up":
            direction = "Up";
            break;
        }
        if ( direction )
        {
          cellInfo.table.createDispatchDataEvent("changeEditedCell",direction);  
        }
      });
      
      
      return cellEditor;
    },

    /**
     * retrieves value from TextField (editable combobox) or
     * selected ListItem (non-editable combobox) and validates value
     */
    getCellEditorValue : function(cellEditor)
    {
      var value = cellEditor.getValue();
      
      /* 
       * validation function will be called with new and old value
       */
      var validationFunc = this.getValidationFunction();
      if ( ! this._done && validationFunc )
      {
         value = validationFunc( value, cellEditor.originalValue );
         this._done = true;
      }

      if (typeof cellEditor.originalValue == "number") {
        value = parseFloat(value);
      }

      return value;
    }
  }
});
