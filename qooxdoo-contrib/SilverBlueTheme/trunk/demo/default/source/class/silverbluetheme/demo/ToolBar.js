qx.Class.define("silverbluetheme.demo.ToolBar",
{
  extend: qx.ui.groupbox.GroupBox,

  construct: function()
  {
    this.base(arguments);

    this._createControls();
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members:
  {
    _createControls: function()
    {
      var layout = new qx.ui.layout.Canvas();
      this.set({layout: layout, contentPadding: 10});

      // create a scroll container
      var scroller = new qx.ui.container.Scroll();

      // create a container for the main layout and set the main layout
      var mainContainer = new qx.ui.container.Composite(new qx.ui.layout.VBox(20));
      mainContainer.setPadding(20);

      // add the main container to the scroll container
      scroller.add(mainContainer);

      // add the scroll container to the root
	  this.addListenerOnce("appear", function(e)
      {
        this.add(scroller, { edge: 0 } );
	  }, this);

      ///////////////////////////////////////////////////////////////
      // Toolbar stuff
      ///////////////////////////////////////////////////////////////

      // create the toolbar
      toolbar = new qx.ui.toolbar.ToolBar();
      mainContainer.add(toolbar);

      // create and add Part 1 to the toolbar
      var part1 = new qx.ui.toolbar.Part();
      var newButton = new qx.ui.toolbar.Button("New", "icon/22/actions/document-new.png");
      var copyButton = new qx.ui.toolbar.Button("Copy", "icon/22/actions/edit-copy.png");
      var cutButton = new qx.ui.toolbar.Button("Cut", "icon/22/actions/edit-cut.png");
      var pasteButton = new qx.ui.toolbar.Button("Paste", "icon/22/actions/edit-paste.png");

      part1.add(newButton);
      part1.add(new qx.ui.toolbar.Separator());
      part1.add(copyButton);
      part1.add(cutButton);
      part1.add(pasteButton);
      toolbar.add(part1);

      // create and add Part 2 to the toolbar
      var part2 = new qx.ui.toolbar.Part();
      var checkBtn = new qx.ui.toolbar.CheckBox("Toggle", "icon/22/actions/format-text-underline.png");
      part2.add(checkBtn);
      toolbar.add(part2);

      // create and add Part 3 to the toolbar
      var part3 = new qx.ui.toolbar.Part();
      var radioButton1 = new qx.ui.toolbar.RadioButton("Left", "icon/22/actions/format-justify-left.png");
      var radioButton2 = new qx.ui.toolbar.RadioButton("Center", "icon/22/actions/format-justify-center.png");
      var radioButton3 = new qx.ui.toolbar.RadioButton("Right", "icon/22/actions/format-justify-right.png");
      part3.add(radioButton1);
      part3.add(radioButton2);
      part3.add(radioButton3);
      toolbar.add(part3);

      // Manager for part 3 (Radio example)
      var radioGroup = new qx.ui.form.RadioGroup(radioButton1, radioButton2, radioButton3);
      radioGroup.setAllowEmptySelection(true);

      // create Help Button and add it to the toolbar
      toolbar.addSpacer();
      var helpButton = new qx.ui.toolbar.Button("Help", "icon/22/actions/help-contents.png");
      toolbar.add(helpButton);

      var buttons = [ newButton, copyButton, cutButton, pasteButton, checkBtn, radioButton1, radioButton2, radioButton3, helpButton ];



      ///////////////////////////////////////////////////////////////
      // Control stuff
      ///////////////////////////////////////////////////////////////
      // Create and add the grid
      var controlGrid = new qx.ui.layout.Grid();
      controlGrid.setSpacing(10);
      var controlContainer = new qx.ui.container.Composite(controlGrid);
      mainContainer.add(controlContainer);


      //////////////////////// icon size stuff
      // create the buttons
      var size16Button = new qx.ui.form.RadioButton("16px");
      var size22Button = new qx.ui.form.RadioButton("22px");
      size22Button.setValue(true);
      var size32Button = new qx.ui.form.RadioButton("32px");
      var size48Button = new qx.ui.form.RadioButton("48px");

      // create the radio manager and add the buttons
      var sizeManager = new qx.ui.form.RadioGroup();
      sizeManager.add(size16Button, size22Button, size32Button, size48Button);

      // add the buttons to the grid
      controlContainer.add(new qx.ui.basic.Label("Icon Size:"), {row:0, column:0});
      controlContainer.add(size16Button, {row:0, column:1});
      controlContainer.add(size22Button, {row:0, column:2});
      controlContainer.add(size32Button, {row:0, column:3});
      controlContainer.add(size48Button, {row:0, column:4});

      // register the handler
      sizeManager.addListener("changeSelection", function(e)
      {
        var value = e.getData()[0];
        var button, size, url;
        for (var i=0; i<buttons.length; i++)
        {
          button = buttons[i];
          url = button.getIcon();

          if (value == size16Button) {
            size = 16;
          } else if (value == size22Button) {
            size = 22;
          } else if (value == size32Button) {
            size = 32;
          } else if (value == size48Button) {
            size = 48;
          }

          url = url.replace(/16|22|32|48/g, size);
          button.setIcon(url);
        }
      }, this);


      //////////////////////// Show stuff
      // create the buttons
      var showBothButton = new qx.ui.form.RadioButton("Label and Icon");
      showBothButton.setValue(true);
      var showIconButton = new qx.ui.form.RadioButton("Icon only");
      var showLabelButton = new qx.ui.form.RadioButton("Label only");

      // create the radio manager and add the buttons
      var showManager = new qx.ui.form.RadioGroup();
      showManager.add(showBothButton, showIconButton, showLabelButton);

      // add the buttons to the grid
      controlContainer.add(new qx.ui.basic.Label("Show:"), {row:1, column:0});
      controlContainer.add(showBothButton, {row:1, column:1});
      controlContainer.add(showIconButton, {row:1, column:2});
      controlContainer.add(showLabelButton, {row:1, column:3});

      // register the handler
      showManager.addListener("changeSelection", function(e)
      {
        if (e.getData()[0] == showBothButton) {
          toolbar.setShow("both");
        } else if (e.getData()[0] == showIconButton) {
          toolbar.setShow("icon");
        } else if (e.getData()[0] == showLabelButton) {
          toolbar.setShow("label");
        }
      }, this);
	  
	  //////////////////////// Decorator stuff
      // create the buttons
      var decoSilverButton = new qx.ui.form.RadioButton("toolbar-silver");
      decoSilverButton.setValue(true);
      var decoBlueButton = new qx.ui.form.RadioButton("toolbar-blue");
	  
	  // create the radio manager and add the buttons
      var decoManager = new qx.ui.form.RadioGroup();
      decoManager.add(decoSilverButton, decoBlueButton);
	  
	  // add the buttons to the grid
      controlContainer.add(new qx.ui.basic.Label("Decorator:"), {row:2, column:0});
      controlContainer.add(decoSilverButton, {row:2, column:1});
      controlContainer.add(decoBlueButton, {row:2, column:2});
	  
	  // register the handler
      decoManager.addListener("changeSelection", function(e)
      {
        if (e.getData()[0] == decoSilverButton) {
          toolbar.setDecorator("toolbar-silver");
        } else if (e.getData()[0] == decoBlueButton) {
          toolbar.setDecorator("toolbar-blue");
        }
      }, this);
    }

  }
});

