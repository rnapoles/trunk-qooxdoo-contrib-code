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
qx.Class.define("qcl.databinding.simple.RadioCellEditorFactory",
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

    /** the table this cellEditor is attached to */
    table :
    {
      check : "Object",
      init : null
    },
    
    /** metadata for the cell editor */
    metaData :
    {
      check : "Map",
      init : null,
      nullable : true
    },
    
    listData : 
    {
      check: "Array",
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
      cellEditor.setShowMinimize(false);
      cellEditor.setShowClose(true);
      cellEditor.setHeight("auto");
      cellEditor.setWidth("auto");
      cellEditor.setCaption(this.tr("Choose an option"));
      
      /*
       * center to browser when it appears
       */
      cellEditor.addEventListener("appear",function(){
        cellEditor.centerToBrowser();
      },this);
      
      /*
       * vertical layout
       */
      var vbox =  new qx.ui.layout.VerticalBoxLayout;
      vbox.setWidth("100%");
      vbox.setHeight("auto");
      vbox.setPadding(3);
      vbox.setSpacing(3);
      cellEditor.add(vbox);
      
      /*
       * metadata
       */
      var metaData = this.getMetaData();
      
      /*
       * radio group
       */
      var gB = new qx.ui.groupBox.RadioGroupBox( metaData.legend );
      metaData.options.forEach(function(option){
        //
      },this);
      return cellEditor;
    },

    /**  
     * Retrieves value 
     */
    getCellEditorValue : function(cellEditor)
    {
      var metaData = this.getMetaData();
      var value    = cellEditor._textArea.getValue();
      var parts    = value.split("\n");
      var string   = new qx.util.StringBuilder;
      
      for( var i=0; i<parts.length; i++)
      {
        var part = qx.lang.String.trim( parts[i] );
        if (part) string.add( part );
        if (i != parts.length-1) string.add( metaData.separator, " ");
      }
      
      value = string.get();
      
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
