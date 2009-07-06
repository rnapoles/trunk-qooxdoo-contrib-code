/* ************************************************************************

   qcl - the qooxdoo component library
  
   http://qooxdoo.org/contrib/project/qcl/
  
   Copyright:
     2007-2009 Christian Boulanger
  
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.
  
   Authors:
   *  Christian Boulanger (cboulanger)
  
************************************************************************ */

/**
 * Form popup singleton
 */
qx.Class.define("access.components.dialog.Form",
{
  extend : access.components.dialog.Dialog,
  
  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */     
  properties :
  {
    /** 
     * Data to create a form with multiple fields. 
     * So far implemented: TextField/TextArea and non-editable Combobox
     *
     * <pre>
     * { 
     *  'username' : 
     *  {
     *    'label' : "User Name", 
     *    'value' : "", 
     *    'lines' : 1 
     *  }, 
     *  'domain'   : 
     *  {
     *    'label' : "Domain",
     *    'value' : 0,
     *    'options' : [
     *      { 'label' : "Company", 'value' : 0, 'icon' : null }, 
     *      { 'label' : "Home", 'value' : 1, 'icon' : null },
     *    ]
     *   }
     * }
     * </pre>
     */
    formData : 
    {
      check : "Map",
      nullable : false,
      apply : "_applyFormData"
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
    ---------------------------------------------------------------------------
       PRIVATE MEMBERS
    ---------------------------------------------------------------------------
    */  
    __formContainer : null,
    
    /*
    ---------------------------------------------------------------------------
       WIDGET LAYOUT
    ---------------------------------------------------------------------------
    */     
    
    /**
     * Create the main content of the widget
     */
    _createWidgetContent : function()
    {      

      /*
       * groupbox
       */
      var groupboxContainer = new qx.ui.groupbox.GroupBox().set({
        contentPadding: [16, 16, 16, 16]
      });
      groupboxContainer.setLayout( new qx.ui.layout.VBox(10) );
      this.add( groupboxContainer );

      var hbox = new qx.ui.container.Composite;
      hbox.setLayout( new qx.ui.layout.HBox(10) );
      groupboxContainer.add( hbox );
      
      /*
       * Add message label
       */
      this.__message = new qx.ui.basic.Label();
      this.__message.setRich(true);
      this.__message.setWidth(200);
      this.__message.setAllowStretchX(true);
      hbox.add( this.__message );    
      
      /* 
       * Form grid  
       */
      var formContainer = this.__formContainer = new qx.ui.container.Composite;
      var gridLayout = new qx.ui.layout.Grid(9, 5);
      gridLayout.setColumnAlign(0, "right", "top");
      gridLayout.setColumnAlign(2, "right", "top");
      gridLayout.setColumnMinWidth(0, 50);
      gridLayout.setColumnFlex(1, 2);
      formContainer.setLayout(gridLayout);
      groupboxContainer.add( formContainer );
      
      /*
       * buttons pane
       */
      var buttonPane = new qx.ui.container.Composite;
      var bpLayout = new qx.ui.layout.HBox(5)
      bpLayout.setAlignX("center");
      buttonPane.setLayout( bpLayout );
      groupboxContainer.add(buttonPane);
      
      /* 
       * Ok Button 
       */
      var okButton = this._createOkButton();
      buttonPane.add( okButton );   
      
      /* 
       * Cancel Button 
       */
      var cancelButton = this._createCancelButton();
      buttonPane.add( cancelButton );        

    },
    
    
    _applyFormData : function (formData, old )
    {
  
      /*
       * loop through form data array
       */
      for ( key in formData )
      {
        
        var fieldData = formData[key];
        
        /*
         * label
         */
        var l = new qx.ui.basic.Label(fieldData.label);
        l.setWidth("1*");
        
        /*
         * choose control
         */
        if ( fieldData.lines && fieldData.lines > 1)
        {
          /*
           * text area
           */
          var t = new qx.ui.form.TextArea( fieldData.value || "");
          t.setHeight(fieldData.lines * 16);
          t.setLiveUpdate(true);
          delete fieldData.lines;
          
          /*
           * create an event listener which dynamically updates the
           * 'value' field in the form data
           */
          eval('t.addEventListener("changeValue", function(event){'+  
            'formData.' + key + '.value=event.getData();' +
          '});');          
        }
        else if ( fieldData.lines )
        {
          /*
           * text field
           */
          var t = new qx.ui.form.TextField(fieldData.value || "");
          t.setHeight(24);
          t.setLiveUpdate(true);
          delete fieldData.lines;
            
          /*
           * create an event listener which dynamically updates the
           * 'value' field in the form data
           */
          eval('t.addEventListener("changeValue", function(event){'+  
            'formData.' + key + '.value=event.getData();' +
          '});');          
        }
        else if ( fieldData.options && fieldData.options instanceof Array )
        {
          /*
           * combobox
           */
          var t = new qx.ui.form.ComboBox;
          t.setHeight(24);
          fieldData.options.forEach(function(data){
            t.add( new qx.ui.form.ListItem( data.label, data.icon, data.value ) );
          });
          if (fieldData.value) 
          {
            var i = t.getList().findValue(fieldData.value);
            if (i) 
            {
              t.setSelected(i);
            }
          }
          delete fieldData.options;
          
          /*
           * create an event listener which dynamically updates the
           * 'value' field in the form data
           */
          eval('t.addEventListener("changeValue", function(event){'+  
            'formData.' + key + '.value=this.getManager().getSelectedItem().getValue();' +
          '},t);');          
        }
        else
        {
          this.error("Invalid Form data: " + formData.toString() );
        }
        
        /*
         * control width
         */
        t.setWidth("3*");
        
        /*
         * panel
         */
        var h = new qx.ui.layout.HorizontalBoxLayout;
        h.setWidth("100%");
        h.setHeight("auto");
        h.setSpacing(5);
        h.add(l,t);
        controls.push(h);
        
      }

      /*
       * button panel
       */
      var p = new qx.ui.layout.HorizontalBoxLayout;
      p.setSpacing(10);
      p.setHorizontalChildrenAlign("center");
      p.add(c, b);
      controls.push(p);

      /*
       * window
       */
      var w = this._createWindow(
        this.tr("Information"), 
        msg, 
        "icon/16/actions/help-about.png", 
        "icon/32/status/help-about.png",
        controls,
        600
      );

      /*
       * add event listener for OK Button
       */
      b.addEventListener("execute", function()
      {
        w.close();
        w.dispose();
        callback.call(context, formData);
      });

      /*
       * add event listener for cancel Button
       */
      c.addEventListener("execute", function()
      {
        w.close();
        w.dispose();
        callback.call(context, false);
      });
    },
        
    /*
    ---------------------------------------------------------------------------
       EVENT HANDLERS
    ---------------------------------------------------------------------------
    */     
    
    /**
     * Handle click on a button. Calls callback with
     * the value set in the options map.
     */
    _handleSelection : function( value )
    {
      if( this.getCallback() )
      {
        this.getCallback()(value);
      }
      this.hide();
    }
  }    
});