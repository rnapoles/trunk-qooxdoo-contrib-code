qx.Class.define("bug2943.Application",
{
  extend : qx.application.Standalone,

  members :
  {
    main : function()
    {
      this.base(arguments);

      if (qx.core.Variant.isSet("qx.debug", "on"))
      {
        qx.log.appender.Native;
        qx.log.appender.Console;
      }

      var container = this.getRoot();
      
      var labelSource = new qx.ui.basic.Label("Source");
      container.add(labelSource, { left : 20, top: 20 });

      var source = new qx.ui.form.List;
      source.setDraggable(true);
      source.setSelectionMode("multi");
      container.add(source, { left : 20, top : 40 });

      for (var i=0; i<20; i++) {
        source.add(new qx.ui.form.ListItem("Item " + i, "icon/16/places/folder.png"));
      }

      source.addListener("dragstart", function(e)
      {
        this.debug("dragstart (source)");
        
        e.addType("value");
        e.addType("items");

        e.addAction("copy");
        e.addAction("move");
      });


      source.addListener("droprequest", function(e)
      {
        this.debug("(source) Related of droprequest: " + e.getRelatedTarget());

        var action = e.getCurrentAction();
        var type = e.getCurrentType();
        var result;

        switch(type)
        {
          case "items":
            result = this.getSelection();

            if (action == "copy")
            {
              var copy = [];
              for (var i=0, l=result.length; i<l; i++) {
                copy[i] = result[i].clone();
              }
              result = copy;
            }
            break;

          case "value":
            result = this.getSelection()[0].getLabel();
            break;
        }

        if (action == "move")
        {
          var selection = this.getSelection();
          for (var i=0, l=selection.length; i<l; i++) {
            this.remove(selection[i]);
          }
        }

        e.addData(type, result);
      });


      var labelSimple = new qx.ui.basic.Label("Simple Target");
      container.add(labelSimple, { left : 140, top: 20 });

      var targetSimple = new qx.ui.form.List;
      //targetSimple.setEnabled(false);
      targetSimple.setDroppable(true);
      targetSimple.setSelectionMode("multi");
      container.add(targetSimple, { left : 140, top: 40 });

      targetSimple.addListener("drop", function(e)
      {
        this.debug("(target) Related of drop: " + e.getRelatedTarget());

        var items = e.getData("items");
        for (var i=0, l=items.length; i<l; i++) {
          this.add(items[i]);
        }
      });

      targetSimple.addListener("dragover", function(e)
      {
        this.debug("(target) dragover")
        if (!e.supportsType("items")) {
          e.preventDefault();
        }
      });

      var check2 = new qx.ui.form.CheckBox("Enable List");
      check2.setValue(targetSimple.isEnabled());
      check2.addListener("changeValue", function(e) {
        targetSimple.setEnabled(e.getData());
      });
      container.add(check2, { left : 140, top : 260 });
      
      var labelBoth = new qx.ui.basic.Label("Reorderable");
      container.add(labelBoth, { left : 500, top: 20 });

      var both = this.__list = new qx.ui.form.List;
      both.setDraggable(true);
      both.setDroppable(true);
      both.setSelectionMode("multi");
      container.add(both, { left : 500, top : 40 });

      for (var i=0; i<20; i++) {
        both.add(new qx.ui.form.ListItem("Item " + i, "icon/16/places/folder.png"));
      }

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


      both.addListener("dragstart", function(e) {
        this.debug("(both) dragstart");
        e.addAction("move");
      });

      both.addListener("dragend", function(e)
      {
        this.debug("(both) dragend");
        indicator.setDomPosition(-1000, -1000);
      });

      both.addListener("drag", function(e)
      {
        this.debug("(both) drag");
        var orig = e.getOriginalTarget();

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
        this.debug("(both) dragover");
        if (e.getRelatedTarget()) {
          e.preventDefault();
        }
      });

      both.addListener("drop", function(e) {
        this.debug("(both) drop");
        this.__reorderList(e.getOriginalTarget());
      }, this);

      indicator.addListener("drop", function(e) {
        this.debug("(indicator) drop");
        this.__reorderList(this.__currentListItem);
      }, this);
    },


    __reorderList : function(listItem)
    {
      var sel = this.__list.getSortedSelection();

      for (var i=0, l=sel.length; i<l; i++)
      {
        this.__list.addBefore(sel[i], listItem);

        this.__list.addToSelection(sel[i]);
      }
    }
  }
});
