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
 * A cell editor factory creating a popup window in which the user can 
 * add and remove values to a multiple value field
 *
 *
 */
qx.Class.define("qcl.databinding.simple.MultipleValueCellEditor",
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
       * create window
       */
      var cellEditor = new qx.ui.window.Window;
      
      /*
       * center to browser when it appears
       */
      cellEditor.addEventListener("appear",function(){
        cellEditor.centerToBrowser();
      },this);
         
      /*
       * create content layout
       */ 
      var hbox = new qx.ui.layout.horizontalBoxLayout;
      hbox.setDimension("100%","100%");
      hbox.setSpacing(5);
      cellEditor.add(hbox);
      
      /*
       * textarea
       */
      cellEditor._textArea = new qx.ui.form.TextArea;
      cellEditor._textArea.setWidth("1*");
      cellEditor._textArea.setHeight("100%");
      
      /*
       * list
       */
      cellEditor._list = new qx.ui.form.List;
      cellEditor._list.setWidth("1*");
      cellEditor._list.setHeight("100%");    
      
      hbox.add(this._textArea,this._list);
      
      /*
       * setup autocomplete
       */ 
      var metaData = this.getMetaData();
      if ( ! metadata.separator)
      {
        this.error( this.classname + " can only be used with multi-value fields.");
      }
      
      cellEditor._textArea.setAutoComplete(true);
      cellEditor._textArea.setServiceName(metaData.serviceName);
      cellEditor._textArea.setServiceMethodAutoComplete(metaData.serviceMethodAutoComplete);
      cellEditor._textArea.setSeparator("\n");
      cellEditor._textArea.setMetaData(metaData);
      cellEditor._textArea.setWithOptions(true);
      cellEditor._textArea.setListBox(this._list);

      cellEditor.originalValue = cellInfo.value;
      
      return cellEditor;
    },

    /**  
     * Retrieves value 
     */
    getCellEditorValue : function(cellEditor)
    {
      var metaData = this.getMetaData();
      var value    = cellEditor._textArea.getValue();
      value = value.split("\n").join(metadata.separator);
      
      /* 
       * validation function will be called with new and old value
       */
      var validationFunc = this.getValidationFunction();
      if ( ! this._done && validationFunc )
      {
         value = validationFunc( value, cellEditor.originalValue );
         this._done = true;
      }

      return value;
    }
  }
});
