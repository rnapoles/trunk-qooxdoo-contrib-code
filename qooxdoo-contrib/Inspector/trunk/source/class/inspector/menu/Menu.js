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
qx.Class.define("inspector.menu.Menu", {
  
  extend : qx.ui.layout.VerticalBoxLayout,

  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  construct : function(inspector) {    
    this.base(arguments);
    // set the zIndex to a higher one than the index of the find mode layer
    this.setZIndex(1e6 + 3);
    // save the reference to the inspector
    this._inspector = inspector;
    
    // initialize the layout
    this.setWidth("auto");
    this.setHeight("auto");
    this.setTop(-24);    
    
    // register the handler to move the menu out of the screen    
    this.__registerMoveListener();    
    
    // register an event listener to set the staart position
    this.addEventListener("appear", function() {      
      var middle = qx.ui.core.ClientDocument.getInstance().getInnerWidth() / 2;  
      // set the position of the menu
      this.setLeft(parseInt(middle - (this.getBoxWidth() / 2)));
      // set the position of the start popup
      this._welcomePopup.setLeft(parseInt(middle - (this.getBoxWidth() / 2)) + 120);
      this._welcomePopup.setTop(3);
      if (this._firstRun) {
        // show the popup
        this._welcomePopup.bringToFront();
        this._welcomePopup.show();
        // mark that this was the first run
        this._firstRun = false;              
      }
    }, this);    
        
    // create the commands
    this.__createCommands();
    // create the inspector menu
    this.__createInspectorMenu();
    // create the buttons shown on the menu
    this.__createMenubar();
    // create the popup which holds the about text
    this.__createAboutPopup();
    // create the popup which is shown an the startup
    this.__createStartPopup();
    
    // create a atom to show the down arrows
    downAtom = new qx.ui.basic.Atom(null, qx.io.Alias.getInstance().resolve("inspector/image/down.png"));
    downAtom.setWidth("100%");
    this.add(downAtom);    
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
    // reference to the inspector   
    _inspector: null,
    
    // commands
    _openPropertyEditorCommand: null,
    _openWidgetFinderCommand: null,
    _openObjectFinderCommand: null,
    _openConsoleCommand: null,
    _openAllCommand: null,
    _hideEverythingCommand: null,
    _findCommand: null,
    _highlightCommand: null,
    
    // menus
    _menubar: null,
    _inspectorMenu: null,
    
    // inspector menu buttons
    _findButton: null,
    _highlightButton: null,
    _hideEverythingButton: null,
    
    // open buttons
    _openConsoleButton: null,
    _openObjectFinderButton: null,
    _openWidgetFinderButton: null,
    _openPropertyEditorButton: null,
    
    // popups
    _aboutPopup: null,
    _welcomePopup: null,
    
    // move timer
    _upTimer: null,
    _downTimer : null,
    _moveInterval: null,
    
    // the settings window
    _settingsWindow: null,
    
    // the status during the hide phase
    _settingsOpened: false,
    _consoleOpended: false,
    _objectOpened: false,
    _widgetOpened: false,
    _propertyOpened: false,
    
    // marker for the opening popup
    _firstRun: true,
        

    /*
    *********************************
       PUBLIC
    *********************************
    */
    /**
     * @return the components of the menu.
     */
    getComponents: function() {
      return [this._inspectorMenu, this._aboutPopup, this._welcomePopup, this._settingsWindow, this];
    },
    
    
    /*
    *********************************
       BUTTON RESETTER
    *********************************
    */    
    /**
     * Sets the find button to unchecked. This is used to 
     * signal the end of the find mode.
     */
    resetFindButton: function() {
      this._findButton.setChecked(false);
    },
    
    
    /**
     * Resets the open button of the console so it 
     * is unchecked.
     */
    resetConsoleButton: function() {
      this._openConsoleButton.setChecked(false);
    },


    /**
     * Resets the open button of the widget finder so it 
     * is unchecked.
     */
    resetWidgetButton: function() {
      this._openWidgetFinderButton.setChecked(false);    
    },
    
    
    /**
     * Resets the open button of the object finder so it 
     * is unchecked.
     */    
    resetObjectButton: function() {
      this._openObjectFinderButton.setChecked(false);
    },
    
    
    /**
     * Resets the open button of the property editor so it 
     * is unchecked.
     */    
    resetPropertyButton: function() {
      this._openPropertyEditorButton.setChecked(false);
    },
    

    /*
    *********************************
       CHANGE COMMAND SHORTCUTS
    *********************************
    */
    /**
     * Changes the shortcut for the find command.
     * @param shortcut {String} The new keyboard shortcut.
     */
    changeFindShortcut: function(shortcut) {
      // set the new shortcut
      this._findCommand.setShortcut(shortcut);
      // reset the command and set it again (invokes redrawing of the shortcut in the menu)      
      this._findButton.setCommand(null);
      this._findButton.setCommand(this._findCommand);
    },
    
    
    /**
     * Changes the shortcut for the highlight command.
     * @param shortcut {String} The new keyboard shortcut.
     */    
    changeHighlightShortcut: function(shortcut) {
      // set the new shortcut
      this._highlightCommand.setShortcut(shortcut);
      // reset the command and set it again (invokes redrawing of the shortcut in the menu)
      this._highlightButton.setCommand(null);
      this._highlightButton.setCommand(this._highlightCommand);
    },
    
    
    /**
     * Changes the shortcut for the hide all command.
     * @param shortcut {String} The new keyboard shortcut.
     */
    changeHideAllShortcut: function(shortcut) {
      // set the new shortcut
      this._hideEverythingCommand.setShortcut(shortcut);
      // reset the command and set it again (invokes redrawing of the shortcut in the menu)      
      this._hideEverythingButton.setCommand(null);
      this._hideEverythingButton.setCommand(this._hideEverythingCommand);
    },    
    

    /**
     * Changes the shortcut for the open all command.
     * @param shortcut {String} The new keyboard shortcut.
     */    
    changeOpenAllShortcut: function(shortcut) {
      this._openAllCommand.setShortcut(shortcut);
    },
    
    
    /**
     * Changes the shortcut for the open console command.
     * @param shortcut {String} The new keyboard shortcut.
     */    
    changeConsoleShortcut: function(shortcut) {
      this._openConsoleCommand.setShortcut(shortcut);
    },
    
    
    /**
     * Changes the shortcut for the open object command.
     * @param shortcut {String} The new keyboard shortcut.
     */    
    changeObjectShortcut: function(shortcut) {
      this._openObjectFinderCommand.setShortcut(shortcut);
    },
    
    
    /**
     * Changes the shortcut for the open widget command.
     * @param shortcut {String} The new keyboard shortcut.
     */    
    changeWidgetShortcut: function(shortcut) {
      this._openWidgetFinderCommand.setShortcut(shortcut);
    },
    
    
    /**
     * Changes the shortcut for the property command.
     * @param shortcut {String} The new keyboard shortcut.
     */    
    changePropertyShortcut: function(shortcut) {
      this._openPropertyEditorCommand.setShortcut(shortcut);
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
      // check for the shortcut in the cookie
      var shortcut = "CTRL+SHIFT+F11";
      if (qx.io.local.CookieApi.get("OpenAllShortcut")) {
        shortcut = qx.io.local.CookieApi.get("OpenAllShortcut");
      }
      // create the open all command
      this._openAllCommand = new qx.client.Command(shortcut);
      this._openAllCommand.addEventListener("execute", function(e) {        
        this._openConsoleButton.setChecked(true);
        this._openObjectFinderButton.setChecked(true);
        this._openWidgetFinderButton.setChecked(true);
        this._openPropertyEditorButton.setChecked(true);
      }, this);
      
      // check for the shortcut in the cookie
      shortcut = "CTRL+SHIFT+F1";
      if (qx.io.local.CookieApi.get("OpenConsoleShortcut")) {
        shortcut = qx.io.local.CookieApi.get("OpenConsoleShortcut");
      }      
      // create the open console command
      this._openConsoleCommand = new qx.client.Command(shortcut);
      this._openConsoleCommand.addEventListener("execute", function(e) {
        this._openConsoleButton.toggleChecked();
      }, this);
      
      // check for the shortcut in the cookie
      shortcut = "CTRL+SHIFT+F2";
      if (qx.io.local.CookieApi.get("OpenObjectShortcut")) {
        shortcut = qx.io.local.CookieApi.get("OpenObjectShortcut");
      }       
      // create the open object finder command
      this._openObjectFinderCommand = new qx.client.Command(shortcut);
      this._openObjectFinderCommand.addEventListener("execute", function(e) {
        this._openObjectFinderButton.toggleChecked();
      }, this);
      
      // check for the shortcut in the cookie
      shortcut = "CTRL+SHIFT+F3";
      if (qx.io.local.CookieApi.get("OpenWidgetShortcut")) {
        shortcut = qx.io.local.CookieApi.get("OpenWidgetShortcut");
      }           
      // create the opne widget finder command
      this._openWidgetFinderCommand = new qx.client.Command(shortcut);
      this._openWidgetFinderCommand.addEventListener("execute", function(e) {
        this._openWidgetFinderButton.toggleChecked();
      }, this);
      
      // check for the shortcut in the cookie
      shortcut = "CTRL+SHIFT+F4";
      if (qx.io.local.CookieApi.get("OpenPropertyShortcut")) {
        shortcut = qx.io.local.CookieApi.get("OpenPropertyShortcut");
      }       
      // create the open property editor command
      this._openPropertyEditorCommand = new qx.client.Command(shortcut);
      this._openPropertyEditorCommand.addEventListener("execute", function(e) {
        this._openPropertyEditorButton.toggleChecked();
      }, this);
      
      // check for the shortcut in the cookie
      shortcut = "CTRL+SHIFT+F";
      if (qx.io.local.CookieApi.get("FindShortcut")) {
        shortcut = qx.io.local.CookieApi.get("FindShortcut");
      }
      // create the find command      
      this._findCommand = new qx.client.Command(shortcut);
      this._findCommand.addEventListener("execute", function(e) {
        // check the status of the find checkbox
        if (this._findButton.getChecked()) {
          // uncheck it and exit the find mode if it was checked
          this._findButton.setChecked(false);
          this._inspector.exitFindMode();          
        } else {
          // check it and start the find mode if it was not checked
          this._findButton.setChecked(true);
          this._inspector.startFindMode();
        }    
      }, this);
      
      // check for the shortcut in the cookie
      shortcut = "CTRL+SHIFT+I";
      if (qx.io.local.CookieApi.get("HighlightShortcut")) {
        shortcut = qx.io.local.CookieApi.get("HighlightShortcut");
      }
      // create the find command      
      this._highlightCommand = new qx.client.Command(shortcut);
      this._highlightCommand.addEventListener("execute", function(e) {
        this._highlightButton.toggleChecked();
        this._inspector.highlightCurrentWidget(this._highlightButton.getChecked());
      }, this);
      
      // check for the shortcut in the cookie
      shortcut = "CTRL+SHIFT+H";
      if (qx.io.local.CookieApi.get("HideAllShortcut")) {
        shortcut = qx.io.local.CookieApi.get("HideAllShortcut");
      }
      // create the command which hides and shows all application components
      this._hideEverythingCommand = new qx.client.Command(shortcut);
      this._hideEverythingCommand.addEventListener("execute", function(e) {
        // if the menu is on the screen: hide
        if (this.getDisplay()) {
          // if the widget window is on the screen
          if (this._openWidgetFinderButton.getChecked()) {
            // close it
            this._openWidgetFinderButton.setChecked(false);
            // mark that it was opened
            this._widgetOpened = true;
          }
          // if the console is open
          if (this._openConsoleButton.getChecked()) {
            // close it
            this._openConsoleButton.setChecked(false);
            // mark that it was open
            this._consoleOpended = true;          
          }
          // if the object window is open
          if (this._openObjectFinderButton.getChecked()) {
            // close it
            this._openObjectFinderButton.setChecked(false);
            this._objectOpened = true;            
          }
          // if the property window is open
          if (this._openPropertyEditorButton.getChecked()) {
            // close it
            this._openPropertyEditorButton.setChecked(false);
            // mark that it was open
            this._propertyOpened = true;            
          }
          // hide the settings window
          if (this._settingsWindow != null) {
            // if the settings window is on the secreen
            if (this._settingsWindow.getVisibility()) {
              // close it
              this._settingsWindow.close();    
              // mark that the window was open
              this._settingsOpened = true;
            }
          }
          // hide the menubar
          this.setDisplay(false);
        
        // unhide
        } else {
          // show the menu
          this.setDisplay(true);
          // if the widget window was opened
          if (this._widgetOpened) {
            // reopen it
            this._openWidgetFinderButton.setChecked(true);
            this._widgetOpened = false;
          }
          // if the console window was open
          if (this._consoleOpended) {
            // reopen it
            this._openConsoleButton.setChecked(true);
            this._consoleOpended = false;
          }
          // if the object window was pened
          if (this._objectOpened) {
            // reopen it
            this._openObjectFinderButton.setChecked(true);
            this._objectOpened = false;
          }
          // if the property window was open
          if (this._propertyOpened) {
            // reopen it
            this._openPropertyEditorButton.setChecked(true);
            this._propertyOpened = false;
          }
          // if the settings window was opened          
          if (this._settingsOpened) {
            // reopen it
            this._settingsWindow.open();
            this._settingsOpened = false;
          }
        }
      }, this);  
    },


    /**
     * Creates the menu which is shown by the click on the 
     * inspector button in the menu. That includes the creation 
     * of all buttons in the menu.
     */
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
      
      // the settings button
      var settingsButton = new qx.ui.menu.Button("Settings...");
      settingsButton.addEventListener("execute", function() {
        this.__openSettingsWindow();
      }, this);
      this._inspectorMenu.add(settingsButton);
      // seperator
      this._inspectorMenu.add(new qx.ui.menu.Separator());
      
      // find button
      this._findButton = new qx.ui.menu.CheckBox("Find Widget");      
      this._findButton.setCommand(this._findCommand);
      this._inspectorMenu.add(this._findButton);
      
      // highlight button
      this._highlightButton = new qx.ui.menu.CheckBox("Highlight Current Widget")
      this._highlightButton.setCommand(this._highlightCommand);
      this._inspectorMenu.add(this._highlightButton);
      // seperator
      this._inspectorMenu.add(new qx.ui.menu.Separator());
      
      // api button
      var apiButton = new qx.ui.menu.Button("Show API Viewer");
      apiButton.addEventListener("execute", this._inspector.openApiWindow, this._inspector);
      this._inspectorMenu.add(apiButton);
      
      // seperator
      this._inspectorMenu.add(new qx.ui.menu.Separator());
      // hide everything button
      this._hideEverythingButton = new qx.ui.menu.Button("Hide Everything");
      this._hideEverythingButton.setCommand(this._hideEverythingCommand);
      this._inspectorMenu.add(this._hideEverythingButton);
      
      // listener which holds the bemubar down while the menu is shown
      this._inspectorMenu.addEventListener("mousemove", function() {
        // if a uptimer is set
        if (this._upTimer != null) {
          // clear it
          window.clearTimeout(this._upTimer);
          this._upTimer = null;
        }
      }, this);      
      // listener which moves the menubar away if the menu is closed
      this._inspectorMenu.addEventListener("changeVisibility", function(e) {
        // if the menu is clicked away
        if (!e.getValue()) {
          // hide the menu
          this.setTop(-24);        
        }
      }, this);
    },
    
    
    /**
     * Creates the menubar including the buttons on the bar.
     */
    __createMenubar: function() {
      // create the menu bar
      this._menubar = new qx.ui.toolbar.ToolBar();
      
      this._menubar.setPadding(1);
      // add the bar to the layout      
      this.add(this._menubar);
      
      // create a button for the inspector menu
      var inspectorButton = new qx.ui.toolbar.MenuButton("Inspector", this._inspectorMenu);
      this._menubar.add(inspectorButton);

      // add a seperator            
      this._menubar.add(new qx.ui.toolbar.Separator());      
      
      // add the open all button
      var openAllButton = new qx.ui.toolbar.Button("All");
      openAllButton.setCommand(this._openAllCommand);
      this._menubar.add(openAllButton);
      
      // add a seperator
      this._menubar.add(new qx.ui.toolbar.Separator());

      // add the open console button
      this._openConsoleButton = new qx.ui.toolbar.CheckBox("Console");
      this._menubar.add(this._openConsoleButton);
      // register the event listener to open and close the console window on toggle      
      this._openConsoleButton.addEventListener("changeChecked", function(e) {
       // if the button is pressed
       if (e.getCurrentTarget().getChecked()) {
         // open the console
         this._inspector.openConsole();
       } else {
         // otherwise, hide the console
         this._inspector.hideConsole();
       }
      }, this);      
      
      // add the open object finder button      
      this._openObjectFinderButton = new qx.ui.toolbar.CheckBox("Objects");
      this._menubar.add(this._openObjectFinderButton);
      // register the event listeren to open the object finder
      this._openObjectFinderButton.addEventListener("changeChecked", function(e) {
        // if the buttonis checked 
        if (e.getCurrentTarget().getChecked()) {
          // open the object finder
          this._inspector.openObjectFinder();
        } else {
          // otherwise, close the object finder
          this._inspector.hideObjectFinder();
        }
      }, this);
      
      // add a button to open the widget finder      
      this._openWidgetFinderButton = new qx.ui.toolbar.CheckBox("Widgets");
      this._menubar.add(this._openWidgetFinderButton);
      // register the event listenerto open the widget finder 
      this._openWidgetFinderButton.addEventListener("changeChecked", function(e) {
        // if the button is checked
        if (e.getCurrentTarget().getChecked()) {
          // fire the command to which opens the widget finder
          this._inspector.openWidgetFinder();
        } else {
          // otherwise, hide the widget finder
          this._inspector.hideWidgetFinder();
        }
      }, this);
      
      // add a button to open the property editor       
      this._openPropertyEditorButton = new qx.ui.toolbar.CheckBox("Properties");
      this._menubar.add(this._openPropertyEditorButton);
      // reigster the event listener to open the property editor
      this._openPropertyEditorButton.addEventListener("changeChecked", function(e) {
        // if the button is checked
        if (e.getCurrentTarget().getChecked()) {
          // execute the commmand which opens the property editor
          this._inspector.openPropertyEditor();
        } else {
          // otherwise, cloase the property editor 
          this._inspector.hidePropertyEditor();
       }
      }, this);
    },
    
    
    /**
     * Creates the popup for the about screen.
     */
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
                  "<strong>License:</strong><br>See the LICENSE file in<br>the project's top-level<br>directory for details.";
      
      // add a atom containing the about text
      var aboutText = new qx.ui.basic.Atom(label);
      aboutText.setIcon(qx.io.Alias.getInstance().resolve("inspector/image/1und1.jpg"));
      this._aboutPopup.add(aboutText);
      // style the atom      
      aboutText.setVerticalChildrenAlign("top");
      aboutText.getLabelObject().setPaddingLeft(10);
    },
    
    
    /**
     * Creates a popup which will show the position of 
     * the menu to the user.
     */
    __createStartPopup: function() {
      // create the popup  
      this._welcomePopup = new qx.ui.popup.Popup();
      // add the popup to the document
      this._welcomePopup.addToDocument();
      // set the opsition of the popup
      this._welcomePopup.setWidth(255);
      this._welcomePopup.setHeight(84);
      // create and add the image for the background
      var backGround = new qx.ui.basic.Image(qx.io.Alias.getInstance().resolve("inspector/image/popup.png"));      
      this._welcomePopup.add(backGround);
      // create the text for the popup
      var label = new qx.ui.basic.Label("<strong>Inspector</strong><br>Move here to show the Inspector menu.");
      this._welcomePopup.add(label);
      // set the position of the text in the popup
      label.setTop(33);
      label.setLeft(10);
      // start a timer to hide the popup in 4 seconds
      var self = this;
      window.setTimeout(function() {
        self._welcomePopup.hide();
      }, 4000);
      
      return this._welcomePopup;
    },
    
    
    /**
     * Registers a mouseover and mouseout listener. These two listeners take 
     * care of moving the meno out of the screen. 
     */
    __registerMoveListener: function() {
      
      // register the mouseover listener
      this.addEventListener("mouseover", function() {
        var self = this;
        // if the time to move the menu up is enabled
        if (this._upTimer != null) {
          // clear it
          window.clearTimeout(this._upTimer);
        }
        
        // start a timer to do the down move
        this._downTimer= window.setTimeout(function() {
          // do only if the moving is not in progress and not in the end position      
          if (self._moveInterval == null && self.getTop() < 0) {
            // start an interval to move the menu down
            self._moveInterval = window.setInterval(function() {
              // stor the current top position
              var currentTop = self.getTop();
              // add one to the position
              currentTop = currentTop + 1;
              // set the new position
              self.setTop(currentTop);
              // if the end position is reached
              if (self.getTop() >= 0) {
                // clear the interavl
                window.clearInterval(self._moveInterval);
                // mark that the interval has been reseted
                self._moveInterval = null;
              }
            }, 10);
          }          
        }, 10);
      }, this);
      
      // register a mouseout listener
      this.addEventListener("mouseout", function() {            
        var self = this;
        // set a timer to enable the reset to the starting position 
        this._upTimer = window.setTimeout(function() {
          // set to the start position
          self.setTop(-24);
          // if there is still a movement
          if (self._moveInterval != null) {
            // clear the move interval        
            window.clearInterval(self._moveInterval);
            // mark that the moving has ended
            self._moveInterval = null;
          }
        }, 300);      
      }, this);        
    },
    
    
    /**
     * Opens the settings window. If no window hase benn created jet,
     * the function creates a window and opens the new object.
     */
    __openSettingsWindow: function() {
      // if there is no settings window
      if (this._settingsWindow == null) {
        // create one
        this._settingsWindow = new inspector.menu.SettingsWindow(this);
        this._settingsWindow.addToDocument();
      }
      // open the settings window
      this._settingsWindow.open();
      
      // check if cookies are alowed
      if (!qx.io.local.CookieApi.get("ApiViewerUri")) {
        this._settingsWindow.enableSettings(false);
        alert("Enable cookies to access the settings.");
      } else {
        this._settingsWindow.enableSettings(true);
      }
    }

  }
});
