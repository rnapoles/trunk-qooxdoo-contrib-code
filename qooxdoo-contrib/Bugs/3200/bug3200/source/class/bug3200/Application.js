/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug3200/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug3200"
 */
qx.Class.define("bug3200.Application",
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

            var labelBoth = new qx.ui.basic.Label("Reorderable");
      this.getRoot().add(labelBoth, { left : 50, top: 20 });

      var both = this.__list = new qx.ui.form.List;
      both.setDraggable(true);
      both.setDroppable(true);
      both.setSelectionMode("multi");
      this.getRoot().add(both, { left : 50, top : 40 });

      for (var i=0; i<20; i++) {
        both.add(new qx.ui.form.ListItem("Item " + i, "icon/16/places/folder.png"));
      }


      // Create drag indicator
      var indicator = new qx.ui.core.Widget;
      indicator.setDecorator(new qx.ui.decoration.Single().set({
        top : [ 1, "solid", "#33508D" ]
      }));
      indicator.setHeight(0);
      indicator.setOpacity(0.5);
      indicator.setZIndex(100);
      indicator.setLayoutProperties({left: -1000, top: -1000});
      indicator.setDroppable(true);
      this.getRoot().add(indicator);


      // Just add a move action
      both.addListener("dragstart", function(e) {
        e.addAction("move");
      });

      both.addListener("dragend", function(e)
      {
        // Move indicator away
        indicator.setDomPosition(-1000, -1000);
      });

      both.addListener("drag", function(e)
      {
        var orig = e.getOriginalTarget();

        // store the current listitem - if the user drops on the indicator
        // we can use this item instead of calculating the position of the
        // indicator
        if (orig instanceof qx.ui.form.ListItem) {
          qx.core.Init.getApplication().__currentListItem = orig;
        }

        if (!qx.ui.core.Widget.contains(this, orig) && orig != indicator) {
          return;
        }

        var origCoords = orig.getContainerLocation();

        indicator.setWidth(orig.getBounds().width);
        indicator.setDomPosition(origCoords.left, origCoords.top);
      });

      both.addListener("dragover", function(e)
      {
        // Stop when the dragging comes from outside
        if (e.getRelatedTarget()) {
          e.preventDefault();
        }
      });

      both.addListener("drop", function(e) {
        this.__reorderList(e.getOriginalTarget());
      }, this);

      indicator.addListener("drop", function(e) {
        this.__reorderList(this.__currentListItem);
      }, this);
      
    },
    
    __reorderList : function(listItem)
    {
      var sel = this.__list.getSortedSelection();

      for (var i=0, l=sel.length; i<l; i++)
      {
        this.__list.addBefore(sel[i], listItem);

        // recover selection as it get lost during child move
        this.__list.addToSelection(sel[i]);
      }
    }

  }
});
