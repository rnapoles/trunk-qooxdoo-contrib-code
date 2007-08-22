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
     * Martin Wittemann (martin_wittemann)

************************************************************************ */

qx.Class.define("inspector.widgetFinder.WidgetFinder",
{
  extend : inspector.AbstractWindow,  
    
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  construct : function(main, name) {   
    // call the constructor of the superclass
    this.base(arguments, main, name);		
		
    // load the obecjts into the table after the app is created
    var self = this;
    window.setTimeout(function() {
      self._reloadTree();
      // if a widget is selected, selet is on open
      var currentWidget = self._inspector.getWidget();
      if (currentWidget != null) {
        self.selectWidget(currentWidget);
      }			
    }, 0);		
  },


  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /*
    *********************************
       ATTRIBUTES
    *********************************
    */
    // widget finder components
    _tree: null,
    
    // toolbar buttons
    _findButton: null,
    _highlightButton: null,
    _reloadButton: null,
    // tooltips
    _findToolTip: null,
    _highlightToolTip: null,   
    _reloadToolTip: null,
    _autoReloadToolTip: null, 
    
    /*
    *********************************
       PUBLIC
    *********************************
    */  
    /**
     * Returns the components of the widget finder.
     */       
    getComponents: function() {
      return [this, this._findToolTip, this._highlightToolTip, this._reloadToolTip, this._autoReloadToolTip];
    },
        
    
    /**
     * Tells the widget finder to select the given widget.
     * @param widget {qx.ui.core.Widget} The widget to select.
     */
    selectWidget: function(widget) {
        this._selectWidgetInTheTree(widget);        
    },
    
    /**
     * Returns the hash code of the currently selected widget in the tree.
     */
    getSelectedWidgetHash: function() {
      // get the selected element
      var selectedElement = this._tree.getSelectedElement();
      // return the id if an element is selected
      if (selectedElement != null) {
        return selectedElement.getUserData("id");
      }
      // return null otherwise
      return null;
    },
		
		/**
		 * Sets the find button to the given status.
		 * (Checked or not checked) 
		 */
		setFindButton: function(status) {
			this._findButton.setChecked(status);
		},
		
		/**
		 * Set the highlight button to the given status.
		 * (Checked or not checked)
		 */
		setHighlightButton: function(status) {
			this._highlightButton.setChecked(status);
		},
    
    
    /*
    *********************************
       PROTECTED
    *********************************
    */   
    
    /**
     * Reload the tree. If the tree is once loaded, only the changes in the tree
     * will be loaded.
     * @param parentWidget {qx.ui.core.Widget} The widget to handle.
     * @param parentTreeFolder {qx.ui.tree.TreeFolder} the folder to add the children 
     * of the parentWidget.
     */
    _fillTree: function(parentWidget, parentTreeFolder)  { 

      // get all components fo the inspector application
      var components = this._inspector.getComponents();
      
      // get the current items of the tree folder
      var items = parentTreeFolder.getItems(false, true);
      
      // if parent widget contains no more widgets
      if (parentWidget.getChildrenLength() == 0) {
        if (items.length > 1) {
          for (var m = 0; m < items.length; m++) {
            // check if the selection is on a folder which should be deleted
            if (items[m + 1].getSelected()) {
              this._tree.getManager().deselectAll();
              this._tree.getManager().setLeadItem(null);
              this._tree.getManager().setAnchorItem(null);
            }          
            // remove all child folders
            parentTreeFolder.removeAt(0);
          }
        }
      }
      
      // seperate index necessary because the components of the inspector are omitted in the tree view
      var i = 0;
      // visit all children     
      for (var k = 0; k < parentWidget.getChildrenLength(); k++) {
        // get the current child
        var childWidget = parentWidget.getChildren()[k]; 
        
        // check if the childwidget is a component of this application
        var cont = false;  
        for (var j = 0; j < components.length; j++) {
          if (childWidget == components[j]) {
            cont = true;
            break;
          }
        }  
        // if the child widget is a widget of the application, ignore it
        if (cont) {
            continue;
        }

        // if no folder exists at this spot of the tree
        if (items[i + 1] == null) {
                    
          // create a new folder
          var childTreeFolder = new qx.ui.tree.TreeFolder(childWidget.classname + " [" + childWidget.toHashCode() + "]", this._getIconPath(childWidget.classname));
          // add the folder to the tree
          parentTreeFolder.addAtToFolder(childTreeFolder, i);
                      
          // append the widget instance to the tree folder
          childTreeFolder.setUserData('instance', childWidget);
          // append the id of the widget to the tree folder
          childTreeFolder.setUserData('id', childWidget.toHashCode());

          // add the highlight listener to the tree elements
          childTreeFolder.addEventListener("changeSelected", this._treeClickHandler, this);                            
          
        } else { 
          // if the folder is the same          
          if (items[i + 1].getLabel() == childWidget.classname + " [" + childWidget.toHashCode() + "]") {
            // keep it
            var childTreeFolder = items[i + 1];
          } else {   
            
            // check if the selection is on a folder which should be deleted
	          if (parentTreeFolder.getItems()[i + 1] != null) {
						  if (parentTreeFolder.getItems()[i + 1].getSelected()) {
	              this._tree.getManager().deselectAll();
	              this._tree.getManager().setLeadItem(null);
	              this._tree.getManager().setAnchorItem(null);
	            }
					  }
            
            // remove it
            parentTreeFolder.removeAt(i);

            // create a new folder
            var childTreeFolder = new qx.ui.tree.TreeFolder(childWidget.classname + " [" + childWidget.toHashCode() + "]");
            // add the folder to the tree at the former position
            parentTreeFolder.addAtToFolder(childTreeFolder, i);
                        
            // append the widget instance to the tree folder
            childTreeFolder.setUserData('instance', childWidget);
            // append the id of the widget to the tree folder
            childTreeFolder.setUserData('id', childWidget.toHashCode());
  
            // add the highlight listener to the tree elements
            childTreeFolder.addEventListener("changeSelected", this._treeClickHandler, this);  
          }
        }

        // visit the children of the current child
        this._fillTree(childWidget, childTreeFolder);

        // if the last child of the folder has been created
        if (i + 1 == parentWidget.getChildrenLength()) {
          // get the new child folders of the current parent
          var newItems = parentTreeFolder.getItems(false, true);
          // if there are more folders than should be
          if (newItems.length - 2 != i) {
            // go threw all disperable folders an delete them
            for (var l = i + 1; l < newItems.length; l++) {
              parentTreeFolder.removeAt(i + 1);
            }
          }          
        }
        // count up the seperate index
        i++;
      }  
    }, 

    
    /**
     * Handler function to handle the clock on the tree. The function selects
     * a new widget.
     * @param e {ClickEvent} 
     */
    _treeClickHandler: function(e) {
      // if the changeSelection changes from false -> true
      if (e.getData()) {
        // stops the bubbeling of the event
        e.stopPropagation();    
        // get the selected widget
        var selectedWidget = e.getTarget().getUserData('instance');
        // proceed only if the selected widget is visible
        if (selectedWidget.getParent()) {
          // set the current element name in the statusbar
          this._statusbar.setLabel(e.getTarget().getLabel());
          // tell the inspector class that the widget has changed
          this._inspector.setWidget(selectedWidget);
        }
      }      
    },    
    
    
    /**
     * Returns the icon path for the element.
     * @param element {String} The name of the qooxdoo component.
     * @return The path of the icon to the element.
     */
    _getIconPath: function (element) {
      switch (element) {
        case "qx.ui.basic.Image":
          return qx.io.Alias.getInstance().resolve("inspector/image/components/image.png");
          
        case "qx.ui.basic.Label":
          return qx.io.Alias.getInstance().resolve("inspector/image/components/label.png");
          
        case "qx.ui.basic.Atom":
          return qx.io.Alias.getInstance().resolve("inspector/image/components/atom.png");
          
        case "qx.ui.tree.Tree":
        case "qx.ui.treevirtual.TreeVirtual":
          return qx.io.Alias.getInstance().resolve("inspector/image/components/tree.png");
          
        case "qx.ui.menu.Menu":
          return qx.io.Alias.getInstance().resolve("inspector/image/components/menu.png");
          
        case "qx.ui.form.Button":
        case "qx.ui.menu.Button":
        case "qx.ui.menubar.Button":
        case "qx.ui.pageview.buttonview.Button":
        case "qx.ui.pageview.radioview.Button":
        case "qx.ui.pageview.tabview.Button":
        case "qx.ui.toolbar.Button":
          return qx.io.Alias.getInstance().resolve("inspector/image/components/button.png");
          
        case "qx.ui.layout.Boxlayout":
        case "qx.ui.layout.CanvasLayout":
        case "qx.ui.layout.DockLayout":
        case "qx.ui.layout.FlowLayout":
        case "qx.ui.layout.GridLayout":
        case "qx.ui.menu.Layout":
          return qx.io.Alias.getInstance().resolve("inspector/image/components/layout.png");
          
        case "qx.ui.layout.VerticalBoxLayout":
          return qx.io.Alias.getInstance().resolve("inspector/image/components/verticallayout.png");
          
        case "qx.ui.layout.HorizontalBoxLayout":
          return qx.io.Alias.getInstance().resolve("inspector/image/components/horizontallayout.png");
          
        case "qx.ui.listview.ListView":
          return qx.io.Alias.getInstance().resolve("inspector/image/components/listview.png");
          
        case "qx.ui.toolbar.ToolBar":
        case "qx.ui.menubar.MenuBar":
          return qx.io.Alias.getInstance().resolve("inspector/image/components/toolbar.png");
          
        case "qx.ui.window.Window":
          return qx.io.Alias.getInstance().resolve("inspector/image/components/window.png");
          
        case "qx.ui.groupbox.Groupbox":
        case "qx.ui.groupbox.CheckGroupBox":
        case "qx.ui.groupbox.RadioGroupBox":
          return qx.io.Alias.getInstance().resolve("inspector/image/components/groupbox.png");
          
        case "qx.ui.form.Spinner":
          return qx.io.Alias.getInstance().resolve("inspector/image/components/spinner.png");

        case "qx.ui.form.ComboBox":
        case "qx.ui.form.ComboBoxEx":
          return qx.io.Alias.getInstance().resolve("inspector/image/components/combobox.png");
          
        case "qx.ui.form.TextField":
          return qx.io.Alias.getInstance().resolve("inspector/image/components/textfield.png");
          
        case "qx.ui.form.TextArea":
          return qx.io.Alias.getInstance().resolve("inspector/image/components/textarea.png");
          
        case "qx.ui.splitpane.SplitPane":
          return qx.io.Alias.getInstance().resolve("inspector/image/components/splitpane.png");
          
        case "qx.ui.table.Table":
          return qx.io.Alias.getInstance().resolve("inspector/image/components/table.png");
          
        case "qx.ui.form.CheckBox":
          return qx.io.Alias.getInstance().resolve("inspector/image/components/checkbox.png");
          
        case "qx.ui.form.RadioButton":
          return qx.io.Alias.getInstance().resolve("inspector/image/components/radiobutton.png");
        
        default:
          return null; 
      }
    }, 
    
    
    /**
     * Reloads the values in the tree.
     */
    _reloadTree: function() {   
      // start the exclusion
      this._inspector.beginExclusion();			
      // refill the tree
      this._fillTree(qx.ui.core.ClientDocument.getInstance(), this._tree);
      // end the exclusion
      this._inspector.endExclusion();      
    },

		
    /**
     * Tells the tree to select the wiget.
     * @param widget {Integer} The widget which should be selected
     */
    _selectWidgetInTheTree: function (widget) {
      var id = widget.toHashCode();
      // get all items of the tree
      var items = this._tree.getItems(true, true);
      // flag that signals if the element has been found
      var elementFound = false;
      // check the root element of the tree
      if (qx.ui.core.ClientDocument.getInstance().toHashCode() == id) {
        // select the root of the tree
        this._tree.setSelected(true);
        // tell the inspector class that the widget has changed
        this._inspector.setWidgetInObjectFinder(qx.ui.core.ClientDocument.getInstance());        
        return;
      }
      // for every element
      for (var i = 0; i < items.length; i++) {
        // if the elemnt was found
        if (items[i].getUserData('id') == id) {
          // mark it as found
          elementFound = true;
          // select in in the tree
          this._tree.setSelectedElement(items[i]);
          // stop searching for the element
          break;
        }
      }            
      // if the elemnt could not be found      
      if (!elementFound) {
        // delete the selection in the tree
        this._tree.getManager().deselectAll();
        this._tree.getManager().setLeadItem(null);
        this._tree.getManager().setAnchorItem(null);
        
        // set the status message
				this._statusbar.setLabel("Selected object is not in the tree");
                
        // tell the inspector class that the widget has changed
        this._inspector.setWidgetInObjectFinder(widget);
        
      }
    },
    
    /*
    *********************************
       AUTORELOAD STUFF
    *********************************
    */
    _enableAutoReload: function() {
      // disable the reload button
      this._reloadButton.setEnabled(false);
      // set the timer to reload the objects
      var self = this;    
      this._reloadTimer = window.setInterval(function() {
        if (self.getDisplay() && self.getVisibility()) {
          self._reloadTree.call(self);
        }
      }, 200);   
    },
    
    _disableAutoReload: function () {
      // enable the reload button
      this._reloadButton.setEnabled(true);
      // switch off the reload timer 
      window.clearTimeout(this._reloadTimer);
    },
    

    /*
    *********************************
       OVERWRITTEN PROTTECTED FUNCTIONS
    *********************************
    */
    /**
     * Sets the height of the main element of the window.
     * @param {int} delta The change value of the height.
     */
    _setMainElementHeight: function(delta) {
      this._tree.setHeight(this._tree.getHeight() + delta);
    },
    
    /**
     * Sets the width of the main element of the window.
     * @param {Object} delta The change value of the width.
     */
    _setMainElementWidth: function(delta) {
      this._tree.setWidth(this._tree.getWidth() + delta);
    },
    
    /**
     * Sets the start position of the window.
     */
    _setApearancePosition: function() {
      this.setLeft(this.getParent().getOffsetWidth() - this._windowWidth);
      this.setTop(qx.ui.core.ClientDocument.getInstance().getInnerHeight() * 0.25);
      this.setHeight(qx.ui.core.ClientDocument.getInstance().getInnerHeight() * 0.25);
    },
    
    /**
     * Creates the tree
     */
    _createMainElement: function() {
      // initialize tree
      this._tree = new qx.ui.tree.Tree("Document" + 
			   " [" + qx.ui.core.ClientDocument.getInstance().toHashCode() +"]",
				  qx.io.Alias.getInstance().resolve("inspector/image/components/document.png"));
      this._tree.setBackgroundColor("white");
      this._tree.setBorder("inset");
      this._tree.setOverflow("auto");
      this._tree.setWidth(320);
      this._tree.setHeight(qx.ui.core.ClientDocument.getInstance().getInnerHeight() * 0.25);
      this._tree.setMinHeight(10);
      this._tree.setUseDoubleClick(true);
      this._mainLayout.add(this._tree);
			
	    // register the handler to select the client document
	    this._tree.addEventListener("click", function(e) {
	      if (e.getTarget().getLabel().indexOf("Document [") != -1) {
	        this._inspector.setWidget(qx.ui.core.ClientDocument.getInstance());
	      }
	    }, this);  			
    },
    
    /**
     * Adds the toolbar buttons to the toolbar and the tooltips to the buttons.
     */
    _addToolbarButtons: function() {
      // add the toolbar buttons
      this._findButton = new qx.ui.toolbar.CheckBox(null, qx.io.Alias.getInstance().resolve("inspector/image/select.png"));
      this._highlightButton = new qx.ui.toolbar.CheckBox(null, qx.io.Alias.getInstance().resolve("inspector/image/highlight.png"));
      this._toolbar.add(this._findButton);
      this._toolbar.add(this._highlightButton);
      // add a seperator
      this._toolbar.add(new qx.ui.toolbar.Separator());
      // register the find handler
      this._findButton.addEventListener("execute", function(e) {
	      // if the button is pressed
	      if (e.getCurrentTarget().getChecked()) {
	        this._inspector.startFindMode();
	      } else {
	        this._inspector.exitFindMode();
	      }				
			}, this);
			        
      // create and add the reload button
      this._reloadButton = new qx.ui.toolbar.Button(null, qx.io.Alias.getInstance().resolve("inspector/image/reload.png"));
      this._toolbar.add(this._reloadButton);
      // add the event listener for the reload
      this._reloadButton.addEventListener("click", function() {
        this._reloadTree();
      }, this);
			// register the highlight handler
      this._highlightButton.addEventListener("execute", this._inspector.highlightCurrentWidget, this._inspector);
      
      // create and add a autoreload button
      var autoReloadButton = new qx.ui.toolbar.CheckBox(null, qx.io.Alias.getInstance().resolve("inspector/image/autoreload.png"));
      this._toolbar.add(autoReloadButton);
      // add the change event listener
      autoReloadButton.addEventListener("changeChecked", function (e) {
        if (e.getData()) {
          this._enableAutoReload();
        } else {
          this._disableAutoReload();
        }
      },this);      
      
      // add the tooltips to the buttons
      this._findToolTip = new qx.ui.popup.ToolTip(inspector.Inspector.FIND_BUTTON_TOOLTIP_TEXT, null);
      this._highlightToolTip = new qx.ui.popup.ToolTip(inspector.Inspector.HIGHLIGHT_BUTTON_TOOLTIP_TEXT, null);
      this._reloadToolTip = new qx.ui.popup.ToolTip(inspector.Inspector.RELOAD_BUTTON_TOOLTIP_TEXT, null);
      this._autoReloadToolTip = new qx.ui.popup.ToolTip(inspector.Inspector.AUTO_RELOAD_BUTTON_TOOLTIP_TEXT, null);
      this._findButton.setToolTip(this._findToolTip);
      this._highlightButton.setToolTip(this._highlightToolTip);
      this._reloadButton.setToolTip(this._reloadToolTip);
      autoReloadButton.setToolTip(this._autoReloadToolTip);
    }
    
    
  }
});
