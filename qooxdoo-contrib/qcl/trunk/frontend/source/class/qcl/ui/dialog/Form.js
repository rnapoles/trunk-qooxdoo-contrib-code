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


/* ************************************************************************
#require(qcl.ui.dialog.FormRenderer)
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
     * So far implemented: 
     *   TextField / TextArea 
     *   ComboBox
     *   SelectBox
     *   RadioGroup
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
     * The model of the result data
     */
    model :
    {
      check : "qx.core.Object",
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
    _form : null,
    _formValidator : null,
    _formController : null,
    
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
      this._formContainer = new qx.ui.container.Composite;
      groupboxContainer.add( this._formContainer );
      
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
       * remove container content, form, controller and validator
       */
      this._formContainer.removeAll();
      if ( this._form )
      {
        this._form.dispose();
      }
      if ( this._formController )
      {
        this._formController.dispose();
      }
      if ( this._formValidator )
      {
       this._formValidator.dispose();
      }
      
      /*
       * if form is to be deleted
       */
      if ( ! formData )
      {
        return;
      }
      
      /*
       * if a model doesn't exist, create it from the
       * form data
       */
      if ( ! this.getModel() )  
      {
        var modelData = {};
        for ( var key in formData )
        {
          modelData[key] = formData[key].value;
        }
        this.setModel( qx.data.marshal.Json.createModel( modelData ) );
      }
      
      
      /*
       * create new form, form controller and form validator
       */
      this._form = new qx.ui.form.Form();
      this._formController = new qx.data.controller.Object( this.getModel() );
      this._formValidator = new qx.ui.form.validation.Manager();
       
      /*
       * loop through form data array
       */
      for ( var key in formData )
      {
        var fieldData = formData[key];
         
        /*
         * Form element
         */
        var formElement = null;
        var radioGroup = null;
        var uiElement = null;
        
        switch ( fieldData.type.toLowerCase() )
        {
          case "groupheader" :
            this._form.addGroupHeader( fieldData.value );
            break;
            
          case "textarea": 
            uiElement = formElement = new qx.ui.form.TextArea();
            formElement.setHeight(fieldData.lines * 16);
            formElement.setLiveUpdate(true);
            break;

          case "textfield":
            uiElement = formElement = new qx.ui.form.TextField();
            formElement.setLiveUpdate(true);
            break;
            
          case "combobox":
            uiElement = formElement = new qx.ui.form.ComboBox();
            fieldData.options.forEach(function( item ){
              var listItem = new qx.ui.form.ListItem( item.label, item.icon );
              formElement.add( listItem );
            });
            break;
            
          case "selectbox":
            uiElement = formElement = new qx.ui.form.SelectBox();
            var selected = null;
            fieldData.options.forEach( function( item ){
              var listItem = new qx.ui.form.ListItem( item.label, item.icon );
              listItem.setUserData( "value", 
                item.value !== undefined ?  item.value : item.label
              );
              formElement.add( listItem );
            },this);
            break;

          case "radiogroup":
            uiElement = new qx.ui.container.Composite();
            uiElement.setLayout( new qx.ui.layout.VBox(5) );
            formElement = new qx.ui.form.RadioGroup();
            var selected = null;
            fieldData.options.forEach( function( item )
            {
              var radioButton = new qx.ui.form.RadioButton( item.label );
              formElement.setUserData( "value", 
                item.value !== undefined ?  item.value : item.label
              );
              uiElement.add( radioButton );
              formElement.add( radioButton );
            },this);
            break; 
            
          case "label":
            uiElement = new qx.ui.basic.Label( fieldData.value );
            break;
            
          case "atom":
            uiElement = new qx.ui.basic.Atom( fieldData.value, fieldData.icon );
            break;
            
          default:
            this.error("Invalid form field type:" + fieldData.type);
  
        }
        
        
        /*
         * Add form element to controller so that result data
         * model is updated when form element value changes
         */
        formElement.setUserData("key",key);
        switch ( fieldData.type.toLowerCase() )
        {
          
          /*
           * simple form elements
           */
          case "textarea":
          case "textfield":
          case "combobox":
            this._formController.addTarget( 
              formElement, "value", key, true
            );  
            break;

          /*
           * single selection form elements
           */
          case "selectbox":
          case "radiogroup":
            var selectables = formElement.getSelectables();
            this._formController.addTarget( 
              formElement, "selection", key, true,
              function( value )
              {
                selectables.forEach( function( selectable ){
                  if ( selectable.getUserData("value") == value )
                  {
                    formElement.setSelection([selectable]);
                  }
                }, this );
              },
              function( selection )
              {  
                var key = formElement.getUserData("key");
                this.getModel().set( key, selection.getUserData("value") );
              }
            );
            break;            
        }
        
        /*
         * form element validation
         */
        var validator = null;
        if ( fieldData.validation )
        {
          if ( fieldData.validation.required )
          {
            formElement.setRequired(true);
          }
          
          if ( fieldData.validation.validator )
          {
            validator = fieldData.validation.validator;
          }
        }

       /*
        * add label and form element to form
        */
       var label = fieldData.label || null;
       this._form.add( uiElement, label, validator );
      }
      
      /*
       * render the form
       */
      this._formContainer.add( this._form.createView( qcl.ui.dialog.FormRenderer ) );
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