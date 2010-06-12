/* ************************************************************************

   qcl - the qooxdoo component library
  
   http://qooxdoo.org/contrib/project/qcl/
  
   Copyright:
     2007-2010 Christian Boulanger
  
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.
  
   Authors:
   *  Christian Boulanger (cboulanger)
   *  saaj <mail@saaj.me>
  
************************************************************************ */

/* ************************************************************************

#asset(dragdroptree/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "dragdroptree"
 */
qx.Class.define("dragdroptree.Application",
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
     * @lint ignoreDeprecated(alert)
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
      -------------------------------------------------------------------------
        Below is your actual application code...
      -------------------------------------------------------------------------
      */

      var tree1 = new qcl.ui.tree.DragDropTree(['Folder'],{
        'dataModel' : new dragdroptree.TreeModel()
      });
      tree1.getDataModel().loadData();
      tree1.setWidth(200);
      tree1.addListener("drop", function(e) {
        //tree1.moveNode( tree1.getDropData(e) ); 
      });
      
      this.getRoot().add( tree1, {left:10,top:10} );
           
    }
  }
});
