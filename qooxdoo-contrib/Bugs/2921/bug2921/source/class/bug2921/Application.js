/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug2921/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug2921"
 */
qx.Class.define("bug2921.Application",
{
  extend : qx.application.Standalone,



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * This method contains the initial application code and gets called 
     * during startup of the application
     */
    main : function()
    {
      this.base(arguments);
      var app = this;
      var doc = app.doc = app.getRoot().set({padding:10, backgroundColor:"white"});  // doc is the visible widget
      doc.set({ padding:10, font:qx.bom.Font.fromString("14px sans-serif")});
      //
      // logger
      //
      qx.log.appender.Native;

      var mainCanvas = new qx.ui.container.Composite( new qx.ui.layout.VBox() );


      var vSplitpane = new qx.ui.splitpane.Pane("vertical").set({decorator:null});

      var hBox = new qx.ui.container.Composite( new qx.ui.layout.HBox() );
      this.container1 = new qx.ui.container.Composite( new qx.ui.layout.Grow() ).set({padding:10});
      this.container2 = new qx.ui.container.Composite( new qx.ui.layout.Grow()).set({padding:10});
      var vBox = new qx.ui.container.Composite( new qx.ui.layout.VBox(2) ).set({padding:[10,0,10,0]});


      var moveBtn = new qx.ui.form.Button("Move");
      var showBtn = new qx.ui.form.Button("Show");

      vBox.add( moveBtn, {flex:1} );
      vBox.add( showBtn, {flex:1} );

      this.htmlArea = new htmlarea.HtmlArea( "" ).set({decorator:"main"});
      this.htmlArea.addListener("ready", function( e ) {
          e.getCurrentTarget().setValue("This htmlarea should be editable when it first appears. Use the 'Move' button to move the htmlarea to the other container.  Use the 'Show' button to see the htmlarea parts.<br/><br/>I think that it has something to do with the HTMLBodyElement getting lost.");
      });

      showBtn.addListener("execute", function( e ) {
          var h = this.htmlArea;
          this.debugTextArea.setValue( this.debugTextArea.getValue() + "Parent = " + h.getLayoutParent() +
                                                  "\neditable = " + h.isEditable() +
                                                  "\nIframeObject = " + h.getIframeObject() +
                                                  "\nContentDocument = " + h.getContentDocument() +
                                                  "\nContentBody = " + h.getContentBody() +
                                                  "\nContentWindow = " + h.getContentWindow() + "\n\n"
                                      );
      }, this);




      moveBtn.addListener("execute", function( e ) {
          if ( this.container1.hasChildren() ) {
              this.container2.add( this.htmlArea );
          } else {
              this.container1.add( this.htmlArea );
          }
      }, this);



      this.container1.add( this.htmlArea );


      hBox.add( this.container1, {flex:1} );
      hBox.add( vBox );
      hBox.add( this.container2, {flex:1} );

      var hSplitpane = new qx.ui.splitpane.Pane("horizontal").set({decorator:null});

      this.sourceTextArea = new qx.ui.form.TextArea("").set({padding:10});
      this.debugTextArea = new qx.ui.form.TextArea("").set({padding:10});

      hSplitpane.add( this.sourceTextArea, 10 );
      hSplitpane.add( this.debugTextArea, 5 );

      vSplitpane.add( hBox, 5 );
      vSplitpane.add( hSplitpane, 10 )

      mainCanvas.add( new qx.ui.basic.Label("Where do the HtmlArea internals go when moving it to a different container?").set({padding:10, font:qx.bom.Font.fromString("18px sans-serif")}) );
      mainCanvas.add( vSplitpane, {flex:1} );

      doc.add( mainCanvas, {edge:0} );
    }
  }
});
