/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2007 1&1 Internet AG, Germany, http://www.1and1.org

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (martinwittemann)

************************************************************************ */
qx.Class.define("inspector.Menu", {
  
  extend : qx.ui.toolbar.ToolBar,

  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  construct : function(inspector) {    
    this.base(arguments);
    // set the zIndex to a higher one than the index of the find mode layer
    this.setZIndex(1e5);
    // save the reference to the inspector
    this._inspector = inspector;

//********************************
// TEST
    
    // initialize the toolbar
    this.setBorder("outset");
    this.setWidth("auto");
    this.setPadding(1);

    
    this.setTop(-18);
    this.interval = null;
    this.swapp = null;
    this.swapp2 = null;
    this.addEventListener("mouseover", function() {
      var self = this;
      
      if (this.swapp2 != null) {
        window.clearTimeout(this.swapp2);
      }
      
      this.swapp = window.setTimeout(function() {
      
        if (self.interval == null && self.getTop() < 0) {
          self.info("mouseover");
          self.interval = window.setInterval(function() {
            var currentTop = self.getTop();
            currentTop = currentTop + 1;
            self.setTop(currentTop);
            if (self.getTop() >= 0) {
              window.clearInterval(self.interval);
              self.interval = null;
            }
          }, 50);
        }  
        
        self.swapp = null;
              
      }, 10);
     
      
    }, this);
    
    
    
    this.addEventListener("mouseout", function() {      
      if (this.swapp != null) {
        window.clearTimeout(this.swapp);
      }
      
      var self = this;
      this.swapp2 = window.setTimeout(function() {
        self.info("mouse OUT");
        self.setTop(-18);
        if (self.interval != null) {        
          window.clearInterval(self.interval);
          self.interval = null;
        }
        self.swapp2 = null;
      }, 500);
      
    }, this);    
    
// ***********************************    
    
    // create the commands
    this.__createCommands();
    // create the inspector menu
    this.__createInspectorMenu();
    // create the buttons shown on the menu
    this.__createMenuButtons();
    // create the popup which holds the about text
    this.__createAboutPopup();
  }, 
  
  
  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members: {
    /*
    *********************************
       ATTRIBUTES
    *********************************
    */       
    _inspector: null,
    
    // commands
    _openPropertyEditorCommand: null,
    _openWidgetFinderCommand: null,
    _openObjectFinderCommand: null,
    _openConsoleCommand: null,
    _openAllCommand: null,    
    
    // menus
    _inspectorMenu: null,
    
    // inspector menu buttons
    _findButton: null,
    
    // open buttons
    _openConsoleButton: null,
    _openObjectFinderButton: null,
    _openWidgetFinderButton: null,
    _openPropertyEditorButton: null,
    
    // about popup
    _aboutPopup: null,
		
		// _currentwidgetLabel: null,

    /*
    *********************************
       PUBLIC
    *********************************
    */
    /**
     * @return the components of the menu.
     */
    getComponents: function() {
      return [this._inspectorMenu, this._aboutPopup, this];
    },
    
    /**
     * Sets the find button to unchecked. This is used to 
     * signal the end of the find mode.
     */
    resetFindButton: function() {
      this._findButton.setChecked(false);
    },
		
    setCurrentWidget: function(name) {
			this._currentWidgetLabel.setText(name);
		},
  
    
    /*
    *********************************
       PRIVATE
    *********************************
    */
    /**
     * Create the commands that open the windows.
     */
    __createCommands: function() {
      // create the open all command
      this._openAllCommand = new qx.client.Command("CTRL+SHIFT+F11");
      this._openAllCommand.addEventListener("execute", function(e) {        
        this._openConsoleButton.setChecked(true);
        this._openObjectFinderButton.setChecked(true);
        this._openWidgetFinderButton.setChecked(true);
        this._openPropertyEditorButton.setChecked(true);
      }, this);
      // create the open console command
      this._openConsoleCommand = new qx.client.Command("CTRL+SHIFT+F1");
      this._openConsoleCommand.addEventListener("execute", function(e) {
        this.openConsole();
      }, this._inspector);
      // create the open object finder command
      this._openObjectFinderCommand = new qx.client.Command("CTRL+SHIFT+F2");
      this._openObjectFinderCommand.addEventListener("execute", function(e) {
        this.openObjectFinder();
      }, this._inspector);
      // create the opne widget finder command
      this._openWidgetFinderCommand = new qx.client.Command("CTRL+SHIFT+F3");
      this._openWidgetFinderCommand.addEventListener("execute", function(e) {
        this.openWidgetFinder();
      }, this._inspector);
      // create the open property editor command
      this._openPropertyEditorCommand = new qx.client.Command("CTRL+SHIFT+F4");
      this._openPropertyEditorCommand.addEventListener("execute", function(e) {
        this.openPropertyEditor();
      }, this._inspector);
      
      // create the find command
      this._findCommand = new qx.client.Command("CTRL+SHIFT+F");
      this._findCommand.addEventListener("execute", function(e) {
        this._findButton.execute();      
      }, this);      
    },


    __createInspectorMenu: function() {
      // create the menu
      this._inspectorMenu = new qx.ui.menu.Menu();
      this._inspectorMenu.addToDocument();      
      
      // about button
      var aboutButton = new qx.ui.menu.Button("About Inspector");
      this._inspectorMenu.add(aboutButton);
      aboutButton.addEventListener("execute", function() {
        // get and set the positions to center the popup
        var left = (qx.ui.core.ClientDocument.getInstance().getInnerWidth() / 2) - (this._aboutPopup.getOuterWidth() / 2);
        var top = (qx.ui.core.ClientDocument.getInstance().getInnerHeight() / 2) - (this._aboutPopup.getOuterHeight() / 2); 
        this._aboutPopup.setTop(top);
        this._aboutPopup.setLeft(left);
        // show the popup
        this._aboutPopup.show();
        this._aboutPopup.bringToFront();
      }, this);      
      // seperator
      this._inspectorMenu.add(new qx.ui.menu.Separator());      
      
      this._inspectorMenu.add(new qx.ui.menu.Button("Settings..."));
      // seperator
      this._inspectorMenu.add(new qx.ui.menu.Separator());
      
      // find button
      this._findButton = new qx.ui.menu.CheckBox("Find Widget");      
      this._findButton.addEventListener("execute", function(e) {
        // if the button is pressed
        if (e.getCurrentTarget().getChecked()) {
          this.startFindMode();
        } else {
          this.exitFindMode();
        }           
      }, this._inspector);
      this._inspectorMenu.add(this._findButton);
      // highlight button
      var highlightButton = new qx.ui.menu.CheckBox("Highlight Current Widget")
      highlightButton.addEventListener("execute", function(e) {
        this.highlightCurrentWidget(e);
      }, this._inspector);      
      this._inspectorMenu.add(highlightButton);
      // seperator
      this._inspectorMenu.add(new qx.ui.menu.Separator());
      var apiButton = new qx.ui.menu.Button("Show API Viewer");
      apiButton.addEventListener("execute", this._inspector.openApiWindow, this._inspector);
      this._inspectorMenu.add(apiButton);
    },
    
    
    __createMenuButtons: function() {
      // create a button for the inspector menu
      var inspectorButton = new qx.ui.toolbar.MenuButton("Inspector", this._inspectorMenu);
      this.add(inspectorButton);

      // add a seperator            
      this.add(new qx.ui.toolbar.Separator());      
      
      // add the open all button
      var openAllButton = new qx.ui.toolbar.Button("All");
      openAllButton.setCommand(this._openAllCommand);
      this.add(openAllButton);
      
      // add a seperator
      this.add(new qx.ui.toolbar.Separator());

      // add the open console button
      this._openConsoleButton = new qx.ui.toolbar.CheckBox("Console");
      this.add(this._openConsoleButton);
      // register the event listener to open and close the console window on toggle      
      this._openConsoleButton.addEventListener("changeChecked", function(e) {
       // iuf the button is pressed
       if (e.getCurrentTarget().getChecked()) {
         // execute the command which opens the console
         this._openConsoleCommand.execute();
       } else {
         // otherwise, hide the console
         this._inspector.hideConsole();
       }
      }, this);      
      
      // add the open object finder button      
      this._openObjectFinderButton = new qx.ui.toolbar.CheckBox("Objects");
      this.add(this._openObjectFinderButton);
      // register the event listeren to open the object finder
      this._openObjectFinderButton.addEventListener("changeChecked", function(e) {
        // if the buttonis checked 
        if (e.getCurrentTarget().getChecked()) {
          // execute the command which opens the object finder
          this._openObjectFinderCommand.execute();
        } else {
          // otherwise, close the object finder
          this._inspector.hideObjectFinder();
        }
      }, this);
      
      // add a button to open the widget finder      
      this._openWidgetFinderButton = new qx.ui.toolbar.CheckBox("Widgets");
      this.add(this._openWidgetFinderButton);
      // register the event listenerto open the widget finder 
      this._openWidgetFinderButton.addEventListener("changeChecked", function(e) {
        // if the button is checked
        if (e.getCurrentTarget().getChecked()) {
          // fire the command to which opens the widget finder
          this._openWidgetFinderCommand.execute();
        } else {
          // otherwise, hide the widget finder
          this._inspector.hideWidgetFinder();
        }
      }, this);
      
      // add a button to open the property editor       
      this._openPropertyEditorButton = new qx.ui.toolbar.CheckBox("Properties");
      this.add(this._openPropertyEditorButton);
      // reigster the event listener to open the property editor
      this._openPropertyEditorButton.addEventListener("changeChecked", function(e) {
        // if the button is checked
        if (e.getCurrentTarget().getChecked()) {
          // execute the commmand which opens the property editor
          this._openPropertyEditorCommand.execute();
        } else {
          // otherwise, cloase the property editor 
          this._inspector.hidePropertyEditor();
       }
      }, this);
			
      // add a seperator
      this.add(new qx.ui.toolbar.Separator());
			
			// add a label to show the current selected widget
			this._currentWidgetLabel = new qx.ui.basic.Label("<i>nothing selected</i>");
			this.setVerticalChildrenAlign("middle");
			this._currentWidgetLabel.setBackgroundColor("black");
			this._currentWidgetLabel.setTextColor("white");
			this._currentWidgetLabel.setFont(new qx.ui.core.Font(11, ["Verdana"]));
			this._currentWidgetLabel.setPadding(3);
			this.add(this._currentWidgetLabel);
    },
    
    __createAboutPopup: function() {
      // create the popup
      this._aboutPopup = new qx.ui.popup.Popup();
      this._aboutPopup.addToDocument();
      // set the look of the popup
      this._aboutPopup.setBackgroundColor("#FFFFFF");
      this._aboutPopup.setBorder("black");      
      this._aboutPopup.setHeight(150);
      this._aboutPopup.setWidth(300);
      this._aboutPopup.setPadding(10);
      
      // create the label text
      var label = "<font size='4' face='Verdana'><strong>Inspector 0.1</strong></font><br><br>" + 
                  "<a href='http://www.qooxdoo.org' target='_blank'>qooxdoo.org</a><br>" + 
                  "1und1 Internet AG<br><br>" + 
                  "<strong>License:</strong><br>See the LICENSE file in the<br>project's top-level<br>directory for details.";
      
      // add a atom containing the about text
      var aboutText = new qx.ui.basic.Atom(label);
      aboutText.setIcon(qx.io.Alias.getInstance().resolve("inspector/image/1und1.jpg"));
      this._aboutPopup.add(aboutText);
      // style the atom      
      aboutText.setVerticalChildrenAlign("top");
      aboutText.getLabelObject().setPaddingLeft(10);
    }

  }
});
