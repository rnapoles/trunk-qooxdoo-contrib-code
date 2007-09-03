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
  
  extend : qx.ui.layout.VerticalBoxLayout,

  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  construct : function(inspector) {    
    this.base(arguments);
    // set the zIndex to a higher one than the index of the find mode layer
    this.setZIndex(1e5 + 3);
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
      this.setLeft(parseInt(middle - (this.getBoxWidth() / 2)));
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
    _inspector: null,
    
    // commands
    _openPropertyEditorCommand: null,
    _openWidgetFinderCommand: null,
    _openObjectFinderCommand: null,
    _openConsoleCommand: null,
    _openAllCommand: null,
    _hideEverythingCommand: null,
    
    // menus
		_menubar: null,
    _inspectorMenu: null,
    
    // inspector menu buttons
    _findButton: null,
    
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
    

    /*
    *********************************
       PUBLIC
    *********************************
    */
    /**
     * @return the components of the menu.
     */
    getComponents: function() {
      return [this._inspectorMenu, this._aboutPopup, this._welcomePopup, this];
    },
    
    /**
     * Sets the find button to unchecked. This is used to 
     * signal the end of the find mode.
     */
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
        this._openConsoleButton.toggleChecked();
      }, this);
      // create the open object finder command
      this._openObjectFinderCommand = new qx.client.Command("CTRL+SHIFT+F2");
      this._openObjectFinderCommand.addEventListener("execute", function(e) {
        this._openObjectFinderButton.toggleChecked();
      }, this);
      // create the opne widget finder command
      this._openWidgetFinderCommand = new qx.client.Command("CTRL+SHIFT+F3");
      this._openWidgetFinderCommand.addEventListener("execute", function(e) {
        this._openWidgetFinderButton.toggleChecked();
      }, this);
      // create the open property editor command
      this._openPropertyEditorCommand = new qx.client.Command("CTRL+SHIFT+F4");
      this._openPropertyEditorCommand.addEventListener("execute", function(e) {
        this._openPropertyEditorButton.toggleChecked();
      }, this);
      
      // create the find command
      this._findCommand = new qx.client.Command("CTRL+SHIFT+F");
      this._findCommand.addEventListener("execute", function(e) {
        this._findButton.execute();      
      }, this);
      // create the command which hides and shows all application components
      this._hideEverythingCommand = new qx.client.Command("CTRL+SHIFT+H");
      this._hideEverythingCommand.addEventListener("execute", function(e) {
        // if the menu is on the screen
        if (this.getDisplay()) {
          // hide all windows
          this._inspector.hideWidgetFinder();
          this._inspector.hideObjectFinder();
          this._inspector.hideConsole();
          this._inspector.hidePropertyEditor();
          // hide the menu
          this.setDisplay(false);          
        } else {
          // show the menu
          this.setDisplay(true);
        }
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
      
      // api button
      var apiButton = new qx.ui.menu.Button("Show API Viewer");
      apiButton.addEventListener("execute", this._inspector.openApiWindow, this._inspector);
      this._inspectorMenu.add(apiButton);
      
      // seperator
      this._inspectorMenu.add(new qx.ui.menu.Separator());
      var hideEverythingButton = new qx.ui.menu.Button("Hide Everything");
      hideEverythingButton.setCommand(this._hideEverythingCommand);
      this._inspectorMenu.add(hideEverythingButton);
    },
    
    
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
                  "<strong>License:</strong><br>See the LICENSE file in the<br>project's top-level<br>directory for details.";
      
      // add a atom containing the about text
      var aboutText = new qx.ui.basic.Atom(label);
      aboutText.setIcon(qx.io.Alias.getInstance().resolve("inspector/image/1und1.jpg"));
      this._aboutPopup.add(aboutText);
      // style the atom      
      aboutText.setVerticalChildrenAlign("top");
      aboutText.getLabelObject().setPaddingLeft(10);
    },
		
		
		/**
		 * Creates a popup which will be shown to the position of 
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
			// set the position of the popup
			this._welcomePopup.setTop(3);
			this._welcomePopup.setLeft((qx.ui.core.ClientDocument.getInstance().getInnerHeight() / 2));
			// create and add the image for the background
      var backGround = new qx.ui.basic.Image(qx.io.Alias.getInstance().resolve("inspector/image/popup.png"));			
			this._welcomePopup.add(backGround);
			// create the text for the popup
			var label = new qx.ui.basic.Label("<strong>Inspector</strong><br>Move here to show the Inspector menu.");
			this._welcomePopup.add(label);
      // set the position of the text in the popup
			label.setTop(33);
			label.setLeft(10);
			// show the popup
			this._welcomePopup.bringToFront();
			this._welcomePopup.show();
			// start a timer to hide the popup in 4 seconds
			var self = this;
			window.setTimeout(function() {
		    self._welcomePopup.hide();
			}, 4000);
		},
		
		__registerMoveListener: function() {
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
	    
	    
	    this.addEventListener("mouseout", function() {            
	      var self = this;
	      // set a timer to enable the reset to the starting position 
	      this._upTimer = window.setTimeout(function() {
	        // sett the start position
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
		}

  }
});
