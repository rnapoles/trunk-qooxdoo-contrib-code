/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(databinding/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "databinding"
 */
qx.Class.define("databinding.Application",
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
     *
     * @return {void} 
     */
    main : function()
    {
      // Call super class
      this.base(arguments);

      // Enable logging in debug variant
      if (qx.core.Variant.isSet("qx.debug", "on"))
      {
        // support native logging capabilities, e.g. Firebug for Firefox
        qx.log.appender.Native;

        // support additional cross-browser console. Press F7 to toggle visibility
        qx.log.appender.Console;
      }

      /*
       * Main layout: container with splitpane
       */
       var container = new qx.ui.container.Composite(new qx.ui.layout.VBox());
       container.setPadding(5);
       container.setDecorator("main");
       this.getRoot().add(container, {edge: 0});
       var splitpane = new qx.ui.splitpane.Pane("horizontal");
       splitpane.setOrientation("horizontal");
       container.add( splitpane, {flex:1} );

       /*
        * tree demo
        */
       this.treeDemo = new databinding.TreeVirtual();
       this.treeDemo.application = this;
       splitpane.add( this.treeDemo.createPane() );       
       
       /*
        * table demo
        */
       this.tableDemo = new databinding.Table( this );
       this.tableDemo.application = this;
       splitpane.add( this.tableDemo.createPane() );
       
       /*
        * help text
        */
       container.add( ( new qx.ui.basic.Label("" +
       		"<h3>Demo and test for databinding for qx.ui.treevirtual.TreeVirtual and qx.ui.table.Table</h3>" +
       		"<p>This demo shows how a TreeVirtual and Table widget can be bound to data on the server and synchronized within the application and across native windows. You should have two windows with the same content by now. To test the features of this demo, please try the following.</p>" +
       		"<ol>" +
       		"<li>Click on 'Start' to retrieve a randomly generated tree. Click 'Stop' whenever the tree is large enough for you. You can then create one or more clones of the tree with the 'Clone Tree' button. Switch to the other window to see that the exact same tree has been created in the other window through events propagated by the server. You can also just add nodes without generating tree data first.</li>" +
       		"<li>Then manipulate the tree by adding, removing or renaming tree nodes. As you can see, the changes are instantly applied to the cloned trees. Switch to the other window to see that the changes appear there, too, with a short delay.</li>" +
       		"<li>You can do similar things with the table. Clone it a few times and then manipulate the table data by adding or removing rows or editing the data by doubleclicking on on of the cells. As in the case of the tree, the changes will be propagated to the cloned instances and the table(s) in the other window.</li>" +
       		"<li>Finally, you can trigger a reload of table data according to the selected tree node by checking 'Bind tree selection to table'." +
       		"</ol>" +
       		""
        )).set( {rich: true, padding: 10 } ) );
       
       /*
        * create independent native browser window to sync with
        */
       if( window.location.hash != "#2ndWindow"  )
       {
         window.open(document.location + "#2ndWindow");
         window.focus();
       }
    }
  }
});