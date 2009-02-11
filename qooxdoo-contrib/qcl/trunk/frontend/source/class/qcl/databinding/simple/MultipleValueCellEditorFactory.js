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
qx.Class.define("qcl.databinding.simple.MultipleValueCellEditorFactory",
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
      check    : "Map",
      init     : null,
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
      cellEditor.setHeight(200);
      cellEditor.setWidth(400);
      cellEditor.setMaxWidth(400);
      cellEditor.setCaption(this.tr("Edit Field Values"));
      
      /*
       * center to browser when it appears
       */
      cellEditor.addEventListener("appear",function(){
        cellEditor.centerToBrowser();
      },this);
      
      /*
       * create content layout
       */ 
      var hbox1 = new qx.ui.layout.HorizontalBoxLayout;
      hbox1.setWidth("100%");
      hbox1.setHeight("1*");
      hbox1.setSpacing(5);
      
      /*
       * textarea
       */
      cellEditor._textArea = new qx.ui.form.TextArea;
      cellEditor._textArea.setWidth("1*");
      cellEditor._textArea.setHeight("100%");
      cellEditor._textArea.setOverflow("auto");
      
      /*
       * list
       */
      cellEditor._list = new qx.ui.form.List;
      cellEditor._list.setWidth("1*");
      cellEditor._list.setHeight("100%");
      cellEditor._list.setOverflow("auto");
      
      /*
       * select from list into textarea
       */
      cellEditor._list.getManager().addEventListener("changeSelection",function(){
        var content  = cellEditor._textArea.getValue();
        var text     = cellEditor._list.getManager().getSelectedItem().getValue();
        
        /*
         * rewind
         */
        var selStart = cellEditor._textArea.getSelectionStart();
        while ( selStart > 0 
                && content.charAt(selStart-1) != "\n") selStart--;
        
        /*
         * forward
         */
        var selEnd = selStart;
        while ( selEnd < content.length 
                && content.charAt(selEnd) != "\n" ) selEnd++;
        
        cellEditor._textArea.setSelectionStart(selStart);
        cellEditor._textArea.setSelectionLength(selEnd-selStart);
        cellEditor._textArea.setSelectionText( text );
        
        /*
         * set caret to the end of the inserted text
         */
        qx.client.Timer.once( function(){
          cellEditor._textArea.setSelectionStart(selStart+text.length);
          cellEditor._textArea.setSelectionLength(0);     
        },this,50);
        
      },this);
      
      /*
       * doubleclick jumps back into textarea
       */
      cellEditor._list.addEventListener("dblclick",function(){
        qx.client.Timer.once( function(){
          cellEditor._textArea.focus();
        },this,50);
      },this);
      
      /*
       * so does the enter key
       */
      cellEditor._list.addEventListener("keypress",function(event){
        if ( event.getKeyIdentifier() == "Enter" )
        {
          qx.client.Timer.once( function(){
            cellEditor._textArea.focus();
          },this,50);
        }
      },this);      
      
      /*
       * setup autocomplete
       */ 
      var metaData = this.getMetaData();
      if ( ! metaData.separator)
      {
        this.error( this.classname + " can only be used with multi-value fields.");
      }
      var string = new qx.util.StringBuilder;
      var parts = cellInfo.value.split(metaData.separator);
      for ( var i=0; i<parts.length; i++)
      {
        var part = qx.lang.String.trim(parts[i]);
        if (part) string.add( part,"\n");
      }
      
      cellEditor._textArea.setValue(qx.lang.String.trim(string.get()));
      cellEditor._textArea.setLiveUpdate(true);
      cellEditor._textArea.setAutoComplete(true);
      cellEditor._textArea.setServiceName(metaData.serviceName);
      cellEditor._textArea.setServiceMethodAutoComplete(metaData.serviceMethodAutoComplete);
      cellEditor._textArea.setSeparator("\n");
      cellEditor._textArea.setMetaData(metaData);
      cellEditor._textArea.setWithOptions(true);
      cellEditor._textArea.setListBox(cellEditor._list);
      
      
      cellEditor.originalValue = cellInfo.value;
      
      hbox1.add(cellEditor._textArea,cellEditor._list);
      
      /*
       * add save-button
       */
      var hbox2 = new qx.ui.layout.HorizontalBoxLayout;
      hbox2.setWidth("100%");
      hbox2.setHeight(32);
      hbox2.setSpacing(5);
      
      var cancelButton = new qx.ui.form.Button( this.tr("Cancel") );
      
      cancelButton.addEventListener("execute",function(){
        cellEditor._textArea.setValue(cellEditor.originalValue);
        cellEditor.close();
      },this);
      
      var saveButton = new qx.ui.form.Button( this.tr("Save") );
      saveButton.addEventListener("execute",function(){
        cellEditor.close();
      },this);
      
      hbox2.add( new qx.ui.basic.HorizontalSpacer, cancelButton, saveButton );
      
      var vbox =  new qx.ui.layout.VerticalBoxLayout;
      vbox.setWidth("100%");
      vbox.setMaxHeight(200);
      vbox.setHeight(200);
      vbox.setPadding(3);
      vbox.setSpacing(3);
      vbox.add(hbox1,hbox2);
      cellEditor.add(vbox);
      
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
