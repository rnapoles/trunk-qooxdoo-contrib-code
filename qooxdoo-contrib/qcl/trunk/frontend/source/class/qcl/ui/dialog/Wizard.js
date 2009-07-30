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
 * A wizard-type widget that constructs the wizard pages on-the-fly, using 
 * functionality from qcl.ui.dialog.Form. 
 */
qx.Class.define("qcl.ui.dialog.Wizard",
{
  extend : qcl.ui.dialog.Form,
  
  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */     
  properties :
  {
    /**
     * An array of maps that sets the properties of this widget
     */
    pageData : 
    {
      check : "Array",
      apply : "_applyPageData"
    },

    /**
     * Whether the user is allowed to go to the previous wizard page
     */
    allowBack : 
    {
      check : "Boolean",
      init : false
    },  
    
    /**  
     * Callback function, the result of which determines whether the user is
     * allowed to go to the previous wizard page 
     */
    allowBackFunc : 
    {
      check : "Function",
      init : function() { return false; }
    },
    
    /**
     * Whether the user is allowed to go to the next wizard page
     */
    allowNext : 
    {
      check : "Boolean",
      init : false
    },

    /**
     * Callback function, the result of which determines whether the user is
     * allowed to go to the next wizard page
     */
    allowNextFunc : 
    {
      check : "Function",
      init : function() { return false; }
    },    

    /**
     * Whether the user is allowed to complete the wizard
     */
    allowFinish : 
    {
      check : "Boolean",
      init : false
    },   
    
    /**  
     * Callback function, the result of which determines whether the user is
     * allowed to go to complete the wizard.
     */
    allowFinishFunc : 
    {
      check : "Function",
      init : function() { return false; }
    },
    
    /**
     * The number of the page in the wizard
     */
    page : 
    {
      check : "Integer",
      apply : "_applyPage",
      init : 0
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
    _backButton : null,
    _nextButton : null,
    _finishButton : null,
    
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
      var groupboxContainer = new qx.ui.groupbox.GroupBox();
      groupboxContainer.setPadding(0);
      groupboxContainer.setLayout( new qx.ui.layout.VBox(0) );
      this.add( groupboxContainer );
      
      /*
       * hbox with message and image (@todo)
       */
      var hbox = new qx.ui.container.Composite();
      hbox.setLayout( new qx.ui.layout.HBox(10) );
      groupboxContainer.add( hbox );
      
      /*
       * message label in title area  
       */
      this._message = new qx.ui.basic.Label();
      this._message.setRich(true);
      this._message.setMinWidth(100);
      this._message.setAllowGrowX(true);
      hbox.add( this._message );    
      
      /*
       * horizontal line
       */
      var line = new qx.ui.core.Widget;
      line.setHeight( 2 );
      line.setBackgroundColor("grey");
      groupboxContainer.add( line );
      
      /* 
       * Form container  
       */
      var formContainer = this._formContainer = new qx.ui.container.Composite();
      formContainer.setPadding(16);
      var gridLayout = new qx.ui.layout.Grid(9, 5);
      gridLayout.setColumnAlign(0, "right", "top");
      gridLayout.setColumnAlign(2, "right", "top");
      gridLayout.setColumnMinWidth(0, 50);
      gridLayout.setColumnFlex(1, 2);
      formContainer.setLayout(gridLayout);
      formContainer.setMinWidth(300);
      formContainer.setMinHeight(200);
      groupboxContainer.add( formContainer );

      /*
       * horizontal line
       */
      var line = new qx.ui.core.Widget;
      line.setHeight( 2 );
      line.setMarginBottom( 5 );
      line.setBackgroundColor("grey");
      groupboxContainer.add( line );      
      
      /*
       * buttons pane with horizontal line on top
       */
      var buttonPane = new qx.ui.container.Composite();
      var bpLayout = new qx.ui.layout.HBox(5)
      bpLayout.setAlignX("right");
      buttonPane.setLayout( bpLayout );
      groupboxContainer.add(buttonPane);
      
      /* 
       *  'Back' button 
       */
      this._backButton = new qx.ui.form.Button( "< " + this.tr("Back") );
      this._backButton.setEnabled(false);
      this._backButton.addListener("execute",this.goBack,this);
      buttonPane.add( this._backButton );   

      /* 
       *  'Next' button 
       */
      this._nextButton = new qx.ui.form.Button( this.tr("Next") + " >" );
      this._nextButton.setEnabled(false);
      this._nextButton.addListener("execute",this.goForward,this);
      buttonPane.add( this._nextButton );   
      
      /* 
       * Cancel Button 
       */
      var cancelButton = this._createCancelButton();
      buttonPane.add( cancelButton );        
      
      /* 
       *  Finish button 
       */
      this._finishButton = new qx.ui.form.Button( this.tr("Finish")  );
      this._finishButton.setEnabled(false);
      this._finishButton.addListener("execute",this.finish,this);      
      buttonPane.add( this._finishButton );
      
      /*
       * let the "changeResultData" event update the buttons
       */
      this.addListener("changeResultData", this._updateButtonStatus, this );
    },
    
    /**
     * Update the enabled status of the buttons
     * @return
     */
    _updateButtonStatus : function()
    {
      var resultData = this.getResultData();
      this._backButton.setEnabled( this.getAllowBack( resultData ) || this.getAllowBackFunc()( resultData ) );
      this._nextButton.setEnabled( this.getAllowNext( resultData ) || this.getAllowNextFunc()( resultData ) );
      this._finishButton.setEnabled( this.getAllowFinish( resultData ) || this.getAllowFinishFunc()( resultData ) );
    },
    
    
    /*
    ---------------------------------------------------------------------------
       APPLY METHODS
    ---------------------------------------------------------------------------
    */     
    
    /**
     * Apply the page data
     * @param pageData
     * @param old
     * @return
     */
    _applyPageData : function ( pageData, old )
    {
      this.setPage( 0 );
    },

    /**
    * Apply the page number
    * @param pageData
    * @param old
    * @return
    */
   _applyPage : function ( page, old )
   {
      var pageData = this.getPageData()[ page ];
      delete pageData.pageData;
      this.setFormData({});
      this.set( pageData );
      this._updateButtonStatus();
   },    
    
    /*
    ---------------------------------------------------------------------------
       API METHODS
    ---------------------------------------------------------------------------
    */

    /**
     * Goes to the previous wizard button
     */
    goBack : function()
    {
      var page = this.getPage(); 
      if ( page == 0 )
      {
        this.error("Cannot go back!");
      }
      this.setPage( --page );
      if ( page == 0 )
      {
        this._backButton.setEnabled(false);
      }
    },

    /**
     * Goes to the next wizard page
     */
    goForward : function()
    {
      var page = this.getPage(); 
      if ( page > this.getPageData().length -2  )
      {
        this.error("Cannot go forward!");
      }
      this.setPage( ++page );
      if ( page == this.getPageData().length -1 )
      {
        this._nextButton.setEnabled(false);
      }
    },    
    
    /**
     * Finishes the wizard. Calls callback with the result map
     */
    finish : function()
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