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

    /**  
     * The table this cellEditor is attached to 
     */
    table :
    {
      check : "Object",
      init : null
    },
    
    /**
     * Metadata with additional information for the celleditor
     */
    metaData :
    {
      check : "Map",
      init : null,
      nullable : true
    },
    
    /**
     * The listItem data that will be used to build the
     * checkbox layout
     */
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
       * metadata
       */
      var metaData = this.getMetaData();
       
      /* 
       * create window
       */
      var cellEditor = new qx.ui.window.Window;
      cellEditor.setShowMinimize(false);
      cellEditor.setShowClose(false);
      cellEditor.setHeight("auto");
      cellEditor.setWidth("auto");
      cellEditor.setCaption( metaData.caption || this.tr("Choose an option"));
      
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
       * radio group
       */
      var gb = new qx.ui.groupbox.GroupBox( metaData.legend || null );
      gb.set({
        height : "auto",
        width  : "100%"
      });
      vbox.add(gb);
      
      
      /*
       * options as radio buttons
       */
      var vbox2 = new qx.ui.layout.VerticalBoxLayout;
      vbox2.set({
        height : "auto",
        width  : "100%",
        padding : 3,
        spacing : 5
      });
      gb.add(vbox2);
      cellEditor._radioManager = new qx.ui.selection.RadioManager();
      metaData.options.forEach( function(option) {
        var rb = new qx.ui.form.RadioButton;
        rb.setManager(cellEditor._radioManager);
        rb.setLabel(option.text);
        rb.setValue(option.value||option.text);
        //rb.setIcon(option.icon||null);
        vbox2.add(rb);
      },this);
      
      return cellEditor;
    },

    /**  
     * Retrieves value 
     */
    getCellEditorValue : function(cellEditor)
    {
      return cellEditor._radioManager.getSelected().getValue();
    }
  }
});
