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
/**
 * This class represents the widget finder window.
 * 
 * The widget finder offers a insight into the hierarchical structure
 * of the current document. Therefore a tree shows all widgets added to 
 * the document, which is the root element in a qooxdoo GUI.
 */
qx.Class.define("inspector.widgetFinder.WidgetFinder", {
  
  extend : inspector.components.AbstractWindow,  
  
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  /**
   * Creates a instance of the widget finder window.
   * This includes a loading of the widget tree if the window is ready.
   * If a widget is selected in the inspector, this widget will 
   * be selected in the tree of the widget finder as well, if possible.
   * @param main {inspector.Inspector} The main inspector instance.
   * @param name {string} The name of the window, displayed in the caption bar of the window.
   */
  construct : function(main, name) {   
    // call the constructor of the superclass
    this.base(arguments, main, name);    
    
    // load the obecjts into the table after the app is created
    var self = this;
    window.setTimeout(function() {
      self.reload();
      // if a widget is selected, select it on open
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
  members : {
    /*
    *********************************
       ATTRIBUTES
    *********************************
    */
    // widget finder components
    _tree: null,
    
    // toolbar buttons
    _reloadButton: null,
    
    // tooltips
    _reloadToolTip: null,
    _autoReloadToolTip: null, 
    
    
    /*
    *********************************
       PUBLIC
    *********************************
    */  
    /**
     * Returns the components of the widget finder.
     * @internal
     * @return {qx.core.Object[]} A list of all components in the widget finder.
     */       
    getComponents: function() {
      return [this, this._reloadToolTip, this._autoReloadToolTip];
    },
    
    
    /**
     * Tells the widget finder to select the given widget.
     * @param widget {qx.ui.core.Widget} The widget to select.
     */
    selectWidget: function(widget) {
        this._selectWidgetInTheTree(widget);
    },
    
    
    /**
     * Returns the hash code of the currently selected widget in the tree. If 
     * nothing is selected, null will be returned.
     * @internal
     * @return {String} The hashcode of the currently selected widget in the tree.
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
     * Reloads the first two layers of the tree.
     */
    reload: function() {
      // start the exclusion
      this._inspector.beginExclusion();
      // refill the tree
      this._fillTree(qx.ui.core.ClientDocument.getInstance(), this._tree, 2);
      // end the exclusion
      this._inspector.endExclusion();
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
     * @param parentTreeFolder {qx.ui.tree.TreeFolder} The folder to add the children 
     *    of the parentWidget.
     * @param recursive {Integer} Indicates if there should be a recursive call
     *    of this function.
     */
    _fillTree: function(parentWidget, parentTreeFolder, recursive)  {
      // get all components of the inspector application
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
      
      // separate index necessary because the components of the inspector are omitted in the tree view
      var i = 0;
      // reduce the recursive calls
      recursive--;
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
          childTreeFolder.addEventListener("changeOpen", this._treeOpenHandler, this);                            
          
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
  
            // add the listeners to the tree elements
            childTreeFolder.addEventListener("changeSelected", this._treeClickHandler, this);
            childTreeFolder.addEventListener("changeOpen", this._treeOpenHandler, this);  
          }
        }  
        // if the recursive flag is set
        if (recursive > 0) {
          // visit the children of the current child
          this._fillTree(childWidget, childTreeFolder, recursive);          
        }
        // if the last child of the folder has been created
        if (i + 1 == parentWidget.getChildrenLength()) {
          // get the new child folders of the current parent
          var newItems = parentTreeFolder.getItems(false, true);
          // if there are more folders than should be
          if (newItems.length - 2 != i) {
            // go threw all dispensable folders an delete them
            for (var l = i + 1; l < newItems.length; l++) {
              parentTreeFolder.removeAt(i + 1);
            }
          }          
        }
        // count up the separate index
        i++;
      }  
    }, 
    
    
    /**
     * Handler function to handle the opening of a tree folder.
     * The function invokes a reload of the subfolders of the clicked 
     * folder
     * @param e {Event} Event triggered by a changeOpen.
     */
    _treeOpenHandler: function(e) {
      // if the folder is open
      if (e.getValue()) {
        // get the selected widget
        var selectedWidget = e.getTarget().getUserData('instance');        
        // load the following two hierarchy layers of the tree
        this._fillTree(selectedWidget, e.getTarget(), 2);      
      }
    },

    
    /**
     * Handler function to handle the click on the tree. The 
     * function selects a new widget.
     * @param e {ClickEvent} Event triggered by a selectionChange.
     */
    _treeClickHandler: function(e) {
      // if the changeSelection changes from false -> true
      if (e.getValue()) {
        // stops the bubbling of the event
        e.stopPropagation();    
        // get the selected widget
        var selectedWidget = e.getTarget().getUserData('instance');
        // proceed only if the selected widget is visible
        if (selectedWidget.getParent()) {          
          // tell the inspector class that the widget has changed
          this._inspector.setWidget(selectedWidget, this);
        }
      }      
    },    
    
    
    /**
     * Returns the icon path for the element. If no icon could 
     * be found, null will be returned.
     * @param element {String} The name of the qooxdoo component.
     * @return {String} The path of the icon to the element.
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
     * Tells the tree to select the widget. If the widget is not in the 
     * tree, the selection will be removed.
     * @param widget {qx.core.Object} The object which should be selected.
     */
    _selectWidgetInTheTree: function (widget) {
      // check for null references
      if (!(widget instanceof qx.ui.core.Widget)) {
        return;
      }
      
      // create a array of parents
      var parents = [];
      // save the parents in that array
      var w = widget;
      while(w.getParent() != null) {
        parents.push(w);
        w = w.getParent();
      }
      // Go backwards threw all parents
      for (var i = parents.length - 1; i > 0; i--) {
        // open the folder of that parent
        this._openFolder(parents[i]);
      }
          
      
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
        this._inspector.setWidget(qx.ui.core.ClientDocument.getInstance(), this);        
        return;
      }
      // for every element
      for (var i = 0; i < items.length; i++) {
        // if the element was found
        if (items[i].getUserData('id') == id) {
          // mark it as found
          elementFound = true;
          // select in in the tree
          this._tree.setSelectedElement(items[i]);
          // stop searching for the element
          break;
        }
      }            
      // if the element could not be found
      if (!elementFound) {
        // delete the selection in the tree
        this._tree.getManager().deselectAll();
        this._tree.getManager().setLeadItem(null);
        this._tree.getManager().setAnchorItem(null);
        // tell the inspector class that the widget has changed
        this._inspector.setWidget(widget, this);
      }  
    },
    
    
    /**
     * Opens the Folder that contains the widget. 
     * @param widget {qx.ui.core.Widget} The widget to open the corresponding folder.
     */
    _openFolder: function(widget) {
      var id = widget.toHashCode();
      // get all items of the tree
      var items = this._tree.getItems(true, true);
      // check the root element of the tree
      if (qx.ui.core.ClientDocument.getInstance().toHashCode() == id) {
        // select the root of the tree
        this._tree.setSelected(true);
        // tell the inspector class that the widget has changed
        this._inspector.setWidget(qx.ui.core.ClientDocument.getInstance(), this);        
        return;
      }
      // for every element
      for (var i = 0; i < items.length; i++) {
        // if the element was found
        if (items[i].getUserData('id') == id) {
          // select in in the tree
          items[i].open();
          // stop searching for the element
          break;
        }
      }
    },
    
    
    /*
    *********************************
       AUTORELOAD STUFF
    *********************************
    */
    /**
     * Enables the autoreload timer which invokes a reload of 
     * the tree every 200 ms. If the autoreload is enabled, 
     * the reload button will be disabled.
     */
    _enableAutoReload: function() {
      // disable the reload button
      this._reloadButton.setEnabled(false);
      // set the timer to reload the objects
      var self = this;    
      this._reloadTimer = window.setInterval(function() {
        if (self.getDisplay() && self.getVisibility()) {
          self.reload.call(self);
        }
      }, 200);
    },
    
    
    /**
     * Stops the autoreload timer and enabled the reload button.
     */
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
     * Sets the height of the tree.
     * @param delta {Number} The change value of the height.
     */
    _setMainElementHeight: function(delta) {
      this._tree.setHeight(this._tree.getHeight() + delta);
    },
    
    
    /**
     * Sets the width of the tree.
     * @param delta {Number} The change value of the width.
     */
    _setMainElementWidth: function(delta) {
      this._tree.setWidth(this._tree.getWidth() + delta);
    },
    
    
    /**
     * Sets the start position of the window.
     */
    _setApearancePosition: function() {
      // if the left is not set
      if (this.getLeft() == null) {
        // put the window an the right side of the browser 
        this.setLeft(this.getParent().getOffsetWidth() - this._windowWidth);        
      }
      // if the top is not set
      if (this.getTop() == null) {
        // set top of the window 25% of the browsers height
        this.setTop(qx.ui.core.ClientDocument.getInstance().getInnerHeight() * 0.25);        
      }
      // if the height is not set
      if (this.getHeight() == "auto") {
        // make the widget finder 25% of the browser height high
        this.setHeight(qx.ui.core.ClientDocument.getInstance().getInnerHeight() * 0.25);        
      }
    },
    
    
    /**
     * Creates the tree and register the handler for the clicks on the tree
     */
    _createMainElement: function() {
      // initialize tree
      this._tree = new qx.ui.tree.Tree(qx.ui.core.ClientDocument.getInstance().classname + 
         " [" + qx.ui.core.ClientDocument.getInstance().toHashCode() +"]",
          qx.io.Alias.getInstance().resolve("inspector/image/components/document.png"));
      this._tree.setBackgroundColor("white");
      this._tree.setBorder("inset");
      this._tree.setOverflow("auto");
      this._tree.setUserData("id", qx.ui.core.ClientDocument.getInstance().toHashCode());
      this._tree.setWidth(320);
      this._tree.setHeight("1*");
      this._tree.setMinHeight(10);
      this._tree.setUseDoubleClick(true);
      this._mainLayout.add(this._tree);
      
      // register the handler to select the client document
      this._tree.addEventListener("click", function(e) {
        if (e.getTarget().getLabel().indexOf("Document [") != -1) {
          this._inspector.setWidget(qx.ui.core.ClientDocument.getInstance(), this);
        }
      }, this);        
    },
    
    
    /**
     * Adds the toolbar buttons to the toolbar and the tooltips to the buttons.
     */
    _addToolbarButtons: function() {              
      // create and add the reload button
      this._reloadButton = new qx.ui.toolbar.Button(null, qx.io.Alias.getInstance().resolve("inspector/image/icons/reload.png"));
      this._toolbar.add(this._reloadButton);
      // add the event listener for the reload
      this._reloadButton.addEventListener("click", function() {
        this.reload();
      }, this);
      
      // create and add a autoreload button
      var autoReloadButton = new qx.ui.toolbar.CheckBox(null, qx.io.Alias.getInstance().resolve("inspector/image/icons/autoreload.png"));
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
      this._reloadToolTip = new qx.ui.popup.ToolTip(inspector.Inspector.RELOAD_BUTTON_TOOLTIP_TEXT, null);
      this._autoReloadToolTip = new qx.ui.popup.ToolTip(inspector.Inspector.AUTO_RELOAD_BUTTON_TOOLTIP_TEXT, null);      
      this._reloadButton.setToolTip(this._reloadToolTip);
      autoReloadButton.setToolTip(this._autoReloadToolTip);
    }
  },
  
  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */
  destruct : function() {
    this._disposeFields("_reloadButton", "_reloadToolTip", "_autoReloadToolTip", "_tree");
  }
});
