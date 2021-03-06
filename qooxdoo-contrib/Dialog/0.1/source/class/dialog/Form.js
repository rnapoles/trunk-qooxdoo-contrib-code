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
#require(dialog.FormRenderer)
#require(qx.util.Serializer)
#require(qx.util.Validate)
************************************************************************ */

/**
 * A dialog with a form that is constructed on-the-fly
 */
qx.Class.define("dialog.Form",
{
  extend : dialog.Dialog,
  
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
     * {
     *  "username" : {   
     *     'type'  : "TextField",
     *     'label' : "User Name", 
     *     'value' : ""
     *   },
     *   "address" : {
     *     'type'  : "TextArea",
     *     'label' : "Address",
     *     'lines' : 3
     *   },
     *   "domain" : {
     *     'type'  : "SelectBox", 
     *     'label' : "Domain",
     *     'value' : 1,
     *     'options' : [
     *       { 'label' : "Company", 'value' : 0 }, 
     *       { 'label' : "Home",    'value' : 1 }
     *     ]
     *   },
     *   "commands" : {
     *    'type'  : "ComboBox", 
     *     'label' : "Shell command to execute",
     *     'options' : [
     *       { 'label' : "ln -s *" }, 
     *       { 'label' : "rm -Rf /" }
     *     ]
     *   }   
     * }
     * </pre>
     * 
     *
     * 
     */
    formData : 
    {
      check : "Map",
      nullable : true,
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
      this._formContainer.setLayout( new qx.ui.layout.Grow() );
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
 try{     
      /*
       * remove container content, form, controller
       */
      if ( this._formController )
      {
        this.getModel().removeAllBindings();
        this._formController.dispose();
      }
      if ( this._form )
      {
        this._form.getValidationManager().removeAllBindings();
        this._form.dispose();
      }
      this._formContainer.removeAll();
      
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
          modelData[key] = formData[key].value || null;
        }
        var model = qx.data.marshal.Json.createModel( modelData );
        this.setModel( model );
      }
      
      
      /*
       * create new form and form controller
       */
      this._form = new qx.ui.form.Form();
      this._formController = new qx.data.controller.Object( this.getModel() );
      
      /*
       * hook for subclasses to do something with the new form
       */
      this._onFormReady( this._form );
      
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
        
        switch ( fieldData.type.toLowerCase() )
        {
          case "groupheader" :
            this._form.addGroupHeader( fieldData.value );
            break;
            
          case "textarea": 
            formElement = new qx.ui.form.TextArea();
            formElement.setHeight(fieldData.lines * 16);
            formElement.setLiveUpdate(true);
            break;

          case "textfield":
            formElement = new qx.ui.form.TextField();
            formElement.setLiveUpdate(true);
            break;
            
          case "combobox":
            //@todo use data model for list
            formElement = new qx.ui.form.ComboBox();
            fieldData.options.forEach(function( item ){
              var listItem = new qx.ui.form.ListItem( item.label, item.icon );
              formElement.add( listItem );
            });
            break;
            
          case "selectbox":
            formElement = new qx.ui.form.SelectBox();
            var selected = null;
            //@todo use data model for list
            fieldData.options.forEach( function( item ){
              var listItem = new qx.ui.form.ListItem( item.label, item.icon );
              listItem.setUserData( "value", 
                item.value !== undefined ?  item.value : item.label
              );
              formElement.add( listItem );
            },this);
            break;

          case "radiogroup":
            formElement = new qx.ui.form.RadioGroup();
            if ( fieldData.orientation )
            {
              formElement.setUserData("orientation", fieldData.orientation );
            }
            var selected = null;
            fieldData.options.forEach( function( item )
            {
              var radioButton = new qx.ui.form.RadioButton( item.label );
              radioButton.setUserData( "value", 
                item.value !== undefined ?  item.value : item.label
              );
              formElement.add( radioButton );
            },this);
            break; 
            
          case "label":
            formElement = new qx.ui.form.TextField(); // dummy
            formElement.setUserData("excluded",true);
            break;
            
          default:
            this.error("Invalid form field type:" + fieldData.type);
  
        }
        
        /*
         * Add form element to controller so that result data
         * model is updated when form element value changes
         */
        formElement.setUserData("key",key);
        var _this = this;
        switch ( fieldData.type.toLowerCase() )
        {
          
          /*
           * simple form elements
           */
          case "textarea":
          case "textfield":
          case "combobox":
            this._formController.addTarget( 
              formElement, "value", key, true, 
              null,
              {  
                "converter" : function( value )
                {  
                  _this._form.getValidationManager().validate();
                  return value; 
                }
              }
            );  
            break;

          /*
           * single selection form elements
           */
          case "selectbox":
          case "radiogroup":
            var selectables = formElement.getSelectables();
            this._formController.addTarget( 
              formElement, "selection", key, true, {  
                "converter" : function( value )
                {
                  var selection = [];
                  if ( value )
                  {
                    selectables.forEach( function( selectable )
                    {
                      var sValue = selectable.getUserData("value");
                      if ( sValue === value )
                      {
                        selection = [selectable];
                      }
                    }, this );
                  }
                  //console.warn("Value is " + value + " > selection is " + selection);
                  return selection;
                }
              },
              {  
                "converter" : function( selection )
                {  
                  var value = selection[0].getUserData("value");
                  //console.warn("Selection is " + selection + " > Value is " + value);
                  return value; 
                }
              }
            );
            
            break;            
        }
        
        /*
         * form element validation
         */
        var validator = null;
        if ( formElement && fieldData.validation )
        {
          
          /*
           * is field required?
           */
          if ( fieldData.validation.required )
          {
            formElement.setRequired(true);
          }
          
          /*
           * is there a validator?
           */
          if ( fieldData.validation.validator )
          {
             var validator = fieldData.validation.validator;

            /*
             * if validator is a string ...
             */
            if ( typeof validator == "string" )
            {
              /*
               * if a validation factory exists, use this
               */
              if ( qx.util.Validate[validator] )
              {
                validator = qx.util.Validate[validator]();
              }

              /*
               * else, is it a regular expression?
               */
              else if ( validator.charAt(0) == "/" )
              {
                validator = qx.util.Validate.regExp( new RegExp( validator.substr( 1, validator.length-2 ) ) );
              }

              /*
               * error
               */
              else 
              {
                this.error("Invalid string validator.");
              }
            }

            /*
             * in all other cases, it must be a funciton or an async validation
             * object
             */
            else if ( ! ( validator instanceof qx.ui.form.validation.AsyncValidator ) 
                && typeof validator != "function" ) 
            {
              this.error("Invalid validator.");
            }
          }
           
          /*
           * Server validation?
           */
          if ( fieldData.validation.service )
          {
            var service = fieldData.validation.service;
            var _this = this;
            validator =  new qx.ui.form.validation.AsyncValidator(
              function( validatorObj, value) 
              {
                if ( ! validatorObj.__asyncInProgress )
                {
                  validatorObj.__asyncInProgress = true;
                  qx.core.Init.getApplication().executeService( 
                    service.name, service.method, [value], function(response)
                    {
                      try {
                      var valid = ( response &&  typeof response == "object" && response.data ) ? response.data : response;
                      validatorObj.setValid( valid );
                      validatorObj.__asyncInProgress = false;
                      } catch(e ) { alert(e) };
                    } 
                  );
                }
              }
            );
          }
        }

        /*
         * add label and form element to form
         */
        var label = fieldData.label;
        this._form.add( formElement, label, validator );
      }
      
      /*
       * render the form
       */
      var view = new dialog.FormRenderer( this._form );
      view.setAllowGrowX(true);
      this._formContainer.add( view );
      
      /*
       * validate the form
       */
      this._form.getValidationManager().validate();
 }
 catch(e)
 {
   this.error(e);
 }
    },
    
    /**
     * Hook for subclasses to do something with the form, for example
     * in order to attach bindings to the validation manager.
     * Empty stub to be overridden.
     * @param form {qx.ui.form.Form}
     * @return {void}
     */
    _onFormReady : function( form )
    {
      return; 
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
        this.getCallback()( qx.util.Serializer.toJson( this.getModel() ) );
      }
      this.resetCallback();
    }
  }    
});