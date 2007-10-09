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
    
    /** metadata for the cell editor */
    metaData :
    {
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
    // interface implementation
    createCellEditor : function(cellInfo)
    {
      var cellEditor = new qx.ui.form.ComboBox;
      cellEditor.setEditable(true);
      cellEditor.setAutoComplete(true);
      
      var metaData = this.getMetaData();
      
      // jsonrpc data 
      cellEditor.setServiceName(metaData.serviceName);
      cellEditor.setServiceMethodAutoComplete(metaData.serviceMethodAutoComplete);
      cellEditor.setSeparator(metaData.separator);
      delete metaData.ServiceName;
      delete metaData.serviceMethodAutoComplete;
      delete metaData.separator;
      
      // other metadata
      cellEditor.setMetaData(metaData);
      
      cellEditor.setBorder(null);
      cellEditor.originalValue = cellInfo.value;

      var field = cellEditor.getField();
      field.setLiveUpdate(true);
      field.setAppearance("table-editor-textfield");

      var value = cellInfo.value;

      // check if renderer does something with value
      var cellRenderer = cellInfo.table.getTableColumnModel().getDataCellRenderer(cellInfo.col);
      var label        = cellRenderer._getContentHtml(cellInfo);
      if ( value != label )
      {
        value = label;
      }

      // replace null values
      if ( value === null )
      {
        value = "";
      }

      field.setValue("" + value);

      field.addEventListener("appear", function() {
        this.selectAll();
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

      // validation function will be called with new and old value
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
