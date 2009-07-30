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
 * A dialog with a form that is constructed on-the-fly
 */
qx.Class.define("qcl.ui.dialog.Form",
{
  extend : qcl.ui.dialog.Dialog,
  
  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */     
  properties :
  {
    /**   
     * Data to create a form with multiple fields. 
     * So far implemented: TextField and non-editable Combobox
     * 
     * <pre>
     *
     * { 
     *   'username' : 
     *   {
     *     'type'  : "TextField",
     *     'label' : "User Name", 
     *     'value' : ""
     *   },
     *   'address' :
     *   {
     *     'type'  : "TextArea",
     *     'label' : "Address",
     *     'lines' : 3
     *   },
     *   'domain'   : 
     *   {
     *     'type'  : "SelectBox", 
     *     'label' : "Domain",
     *     'value' : 1,
     *     'options' : [
     *       { 'label' : "Company", 'value' : 0 }, 
     *       { 'label' : "Home",    'value' : 1 }
     *     ]
     *   },
     *   'commands'   : 
     *   {
     *    'type'  : "ComboBox", 
     *     'label' : "Shell command to execute",
     *     'options' : [
     *       { 'label' : "ln -s *" }, 
     *       { 'label' : "rm -Rf /" }
     *     ]
     *   }   
     * }
     * </pre>
     */
    formData : 
    {
      check : "Map",
      nullable : false,
      apply : "_applyFormData"
    },
    
    /**
     * The result data map
     */
    resultData :
    {
      check : "Map",
      nullable : true
    }
  },
  
  /*
  *****************************************************************************
     EVENTS
  *****************************************************************************
  */    
  events : 
  {   
    /**
    * Event dispatched when the user changes data in the form
    */
   "changeResultData" : "qx.event.type.Event"

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
    _formContainer : null,
    
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
      this._message = new qx.ui.basic.Label();
      this._message.setRich(true);
      this._message.setWidth(200);
      this._message.setAllowStretchX(true);
      hbox.add( this._message );    
      
      /* 
       * Form container  
       */
      var formContainer = this._formContainer = new qx.ui.container.Composite;
      var gridLayout = new qx.ui.layout.Grid(9, 5);
      gridLayout.setColumnAlign(0, "left", "top");
      gridLayout.setColumnAlign(1, "left", "top");
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
    
    /**
     * Set a form result
     * @param key {String}
     * @param value {String}
     * @return {void}
     */
    _setResult : function(key,value)
    {
      this.getResultData()[key] = value;
      this.getFormData()[key].value = value;
      this.fireEvent("changeResultData");
    },
    
    /*
    ---------------------------------------------------------------------------
       APPLY METHODS
    ---------------------------------------------------------------------------
    */     
    
    /**
     * Constructs the form on-the-fly
     * @param formData
     * @param old
     * @return
     */
    _applyFormData : function ( formData, old )
    {
      /*
       * remove all children
       */
      this._formContainer.removeAll();
       
      /*
       * clear result data
       */
      this.setResultData({});
       
      /*
       * loop through form data array
       */
      var row = 0;
      for ( key in formData )
      {
        
        var fieldData = formData[key];
        
        
        /*
         * Form element
         */
        var formElement = null;
        switch ( fieldData.type.toLowerCase() )
        {
          
          case "textarea": 
            formElement = new qx.ui.form.TextArea( fieldData.value || "");
            formElement.setHeight(fieldData.lines * 16);
            formElement.setLiveUpdate(true);
            break;

          case "textfield":
            formElement = new qx.ui.form.TextField( fieldData.value || "");
            formElement.setLiveUpdate(true);
            break;
            
          case "combobox":
            formElement = new qx.ui.form.ComboBox();
            fieldData.options.forEach(function( item ){
              var listItem = new qx.ui.form.ListItem( item.label, item.icon );
              formElement.add( listItem );
            });
            break;
            
          case "selectbox":
            formElement = new qx.ui.form.SelectBox();
            var selected = null;
            fieldData.options.forEach( function( item ){
              var listItem = new qx.ui.form.ListItem( item.label, item.icon );
              listItem.setUserData( "value", 
                item.value !== undefined ?  item.value : item.label
              );
              formElement.add( listItem );
              if( fieldData.value !== undefined 
                  && fieldData.value == listItem.getUserData( "value" ) )
              {
                formElement.setSelection([listItem]);
                this.getResultData()[key]=fieldData.value;
              }
            },this);
            break;

          case "radiogroup":
            formElement = new qx.ui.container.Composite();
            formElement.setLayout( new qx.ui.layout.VBox(5) );
            var radioGroup = new qx.ui.form.RadioGroup();
            var selected = null;
            fieldData.options.forEach( function( item )
            {
              var radioButton = new qx.ui.form.RadioButton( item.label );
              radioButton.setUserData( "value", 
                item.value !== undefined ?  item.value : item.label
              );
              
              formElement.add( radioButton );
              radioGroup.add( radioButton );
              
              if ( fieldData.value !== undefined 
                  && fieldData.value == radioButton.getUserData( "value" ) )
              {
                radioGroup.setSelection([radioButton]); 
              }
            },this);
            var sel = radioGroup.getSelection();
            if ( sel.length )
            {
              this._setResult( key, sel[0].getUserData("value") );
            }
            break; 
            
          case "label":
            formElement = null;
            fieldData.labelPosition = "top";
            break;
            
          default:
            this.error("Invalid form field type:" + fieldData.type);
  
        }
        
        
        /*
         * add listener to update result map
         */
        switch ( fieldData.type.toLowerCase() )
        {
          case "textarea":
          case "textfield":
          case "combobox":
            formElement._key = ""+key;
            formElement.addListener("changeValue",function(event){
              var key   = event.getTarget()._key;
              var value = event.getData();
              this._setResult(key,value);
            },this);
            break;
            
          case "selectbox":
            formElement._key = ""+key;
            formElement.addListener("changeSelection",function(event){
              var key   = event.getTarget()._key;
              var value = event.getData()[0].getUserData("value");
              this._setResult(key,value);
            },this);            
            break;
            
          case "radiogroup":
            radioGroup._key = ""+key;
            radioGroup.addListener("changeSelection",function(event){
              var key   = event.getTarget()._key;
              var value = event.getData()[0].getUserData("value");
              this._setResult(key,value);
            },this);            
            break;               
        }
        
       /*
        * add label and form element to form
        */
       var label = new qx.ui.basic.Label( fieldData.label );
       label.setRich(true);
       label.setWidth(100);
       label.setAllowGrowX(true);
       
       switch ( fieldData.labelPosition )        
       {  
         case "top":
           this._formContainer.add( label, { row: row, column: 0, colSpan : 2 } );
           if ( formElement )
           {
             this._formContainer.add( formElement, { row: ++row, column: 0, colSpan : 2 } );
           }
           break;
           
         case "left":
         default:
           formElement.setAlignX("right");
           this._formContainer.add( label, { row: row, column: 0} );
           this._formContainer.add( formElement, { row: row, column: 1} );          
       }
        
        /*
         * next row
         */  
        row++;
      }
    },
        
    /*
    ---------------------------------------------------------------------------
       EVENT HANDLERS
    ---------------------------------------------------------------------------
    */     
    
    /**
     * Handle click on ok button. Calls callback with the result map
     * @override
     */
    _handleOk : function()
    {
      this.hide();
      if( this.getCallback() )
      {
        this.getCallback()(this.getResultData());
      }
      this.resetCallback();
    }
  }    
});