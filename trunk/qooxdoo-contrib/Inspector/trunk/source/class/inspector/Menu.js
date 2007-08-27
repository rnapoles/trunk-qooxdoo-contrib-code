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
  
  extend : inspector.FlyingToolBar,

  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  construct : function(inspector) {    
    this.base(arguments);
    this.setZIndex(1e5);
  
    this._inspector = inspector;
      
    this.__createCommands();
    
    this.__createInspectorMenu();
//    this.__createObjectMenu();
//    this.__createWidgetMenu();
//    this.__createPropertyMenu();
//    this.__createConsoleMenu();
    
    this.__createMenuButtons();
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

    getComponents: function() {
      return [this._inspectorMenu, this];
    },
    
    resetFindButton: function() {
      this._findButton.setChecked(false);
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
    },


    __createInspectorMenu: function() {
      // create the menu
      this._inspectorMenu = new qx.ui.menu.Menu();
      this._inspectorMenu.addToDocument();      
      
      this._inspectorMenu.add(new qx.ui.menu.Button("About Inspector"));
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
      
      this._inspectorMenu.add(new qx.ui.menu.Button("Show API Viewer"));
    },
    
    
    
    
    

      
    __createObjectMenu: function() {
      // create the menu
      this._objectMenu = new qx.ui.menu.Menu();
      this._objectMenu.addToDocument();      
      
      // open button
      var openButton = new qx.ui.menu.Button("Open Object Finder");
      openButton.setCommand(this._openObjectFinderCommand);
      this._objectMenu.add(openButton);
      // seperator      
      this._objectMenu.add(new qx.ui.menu.Separator());
      
      // reload button
      this._reloadObjectButton = new qx.ui.menu.Button("Reload");
      this._reloadObjectButton.addEventListener("execute", this._inspector.reloadObjectFinder, this._inspector);
      this._objectMenu.add(this._reloadObjectButton);
      this._reloadObjectButton.setEnabled(false);
      
      this._autoReloadObjectButton = new qx.ui.menu.CheckBox("Auto-Reload")
      this._objectMenu.add(this._autoReloadObjectButton);
      this._autoReloadObjectButton.setEnabled(false);
      this._objectMenu.add(new qx.ui.menu.Separator());
      this._summaryButton = new qx.ui.menu.Button("Object Summary");
      this._objectMenu.add(this._summaryButton);
      this._summaryButton.setEnabled(false);
    },
    
    __createWidgetMenu: function() {
      // create the menu
      this._widgetMenu = new qx.ui.menu.Menu();
      this._widgetMenu.addToDocument();
      // open button      
      var openButton = new qx.ui.menu.Button("Open Widget Finder");
      openButton.setCommand(this._openWidgetFinderCommand);
      this._widgetMenu.add(openButton);
      // seperator
      this._widgetMenu.add(new qx.ui.menu.Separator());
      
      // reload button
      var reloadButton = new qx.ui.menu.Button("Reload");
      reloadButton.addEventListener("execute", this._inspector.reloadWidgetFinder, this._inspector);
      this._widgetMenu.add(reloadButton);
      this._widgetMenu.add(new qx.ui.menu.CheckBox("Auto-Reload"));
    },
    
    __createPropertyMenu: function() {
      // create the menu
      this._propertyMenu = new qx.ui.menu.Menu();
      this._propertyMenu.addToDocument();
      // open button      
      var openButton = new qx.ui.menu.Button("Open Property Editor");
      openButton.setCommand(this._openPropertyEditorCommand);
      this._propertyMenu.add(openButton);
      // seperator
      this._propertyMenu.add(new qx.ui.menu.Separator());
      
      this._propertyMenu.add(new qx.ui.menu.Button("Reload"));
      this._propertyMenu.add(new qx.ui.menu.CheckBox("Auto-Reload"));
      this._propertyMenu.add(new qx.ui.menu.Separator());
      this._propertyMenu.add(new qx.ui.menu.CheckBox("Show Inherited Porperties", null, true));
      this._propertyMenu.add(new qx.ui.menu.CheckBox("Group Properties"));
      this._propertyMenu.add(new qx.ui.menu.Separator());
      this._propertyMenu.add(new qx.ui.menu.RadioButton("Edit View", null, true));
      this._propertyMenu.add(new qx.ui.menu.RadioButton("Table View")); 
      this._propertyMenu.add(new qx.ui.menu.Separator());
      this._propertyMenu.add(new qx.ui.menu.Button("Set Null"));
      this._propertyMenu.add(new qx.ui.menu.Button("Set Initial Value"));      
      this._propertyMenu.add(new qx.ui.menu.Button("Highlight Property Value"));
      this._propertyMenu.add(new qx.ui.menu.Button("Goto Property Value"));  
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
      this._openObjectFinderButton = new qx.ui.toolbar.CheckBox("Object");
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
      this._openWidgetFinderButton = new qx.ui.toolbar.CheckBox("Widget");
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
      this._openPropertyEditorButton = new qx.ui.toolbar.CheckBox("Property");
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
    }

  }
});
