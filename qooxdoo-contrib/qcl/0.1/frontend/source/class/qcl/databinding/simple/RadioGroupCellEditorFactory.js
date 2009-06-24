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
#require(qx.ui.form.RadioButton)

************************************************************************ */

/**
 * A cell editor factory creating a popup window in which the user can 
 * add and remove values to a multiple value field
 *
 *
 */
qx.Class.define("qcl.databinding.simple.RadioGroupCellEditorFactory",
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
      cellEditor.setShowClose(true);
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
        spacing : 3
      });
      gb.add(vbox2);
      cellEditor._radioManager = new qx.ui.selection.RadioManager();
      metaData.options.forEach( function(option) {
        var rb = new qx.ui.form.RadioButton;
        rb.setManager(cellEditor._radioManager);
        rb.setLabel( option.text || option[0] );
        rb.setValue( option.value||option.text||option[2] );
        //rb.setIcon( option.icon||option[1]||null );
        if ( option.selected ) rb.setChecked(true);
        vbox2.add(rb);
      },this);
      
      /*
       * close on selection
       */
      cellEditor._radioManager.addEventListener("changeSelected",function(){
        cellEditor.close();
      });
      
      /*
       * close on escape key
       */
      cellEditor.addEventListener("keypress",function(e){
        if ( e.getKeyIdentifier() == "Escape" )
        {
          cellEditor.close();
        }
      });      
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