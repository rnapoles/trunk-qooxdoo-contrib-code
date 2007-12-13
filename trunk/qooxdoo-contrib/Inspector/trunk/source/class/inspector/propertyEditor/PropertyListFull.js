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

qx.Class.define("inspector.propertyEditor.PropertyListFull", {
  
  extend : inspector.propertyEditor.PropertyList,

  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  construct : function(controller) {
    // call the constructor of the superclass
    this.base(arguments, controller);
    
    // create a object to store the currently available property columns
    this._propertyColumns = {};
    // create the array for storing the combobox popups
    this._comboBoxPopups = [];
    
    // create the color popup
    this._createColorPopup();
    
    // create the pool in which the property lists are cached
    this._oldPropertyListPool = {};     
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
    // to store the currently displayed properties
    _propertyColumns: null,
    
    // reference to all combobox popups 
    _comboBoxPopups: null,
    
    // color picker stuff
    _colorPopup: null,
    _colorFields: null,
    _currentColorProperty: null,
    
    // cache to store the already created propertie layouts
    _oldPropertyListPool: null,


    /*
    *********************************
       PUBLIC
    *********************************
    */
    /**
     * Invokes a relaod of the view.
     */
    build: function() {
			if (this._controller.getWidget() != null) {
        this._reloadPropertyListFull();
      }
    },
    
    
    /**
     * Updates the given propertie. 
     * @param key {String} The name of the propertie.
     * @param classname {String} The classname of the properties class.
     */
    update: function(key, classname) {
      this._setPropertyValueFull(key, classname);
    },
    
    
    /**
     * @internal
     * @return {qx.core.Object[]} A list of all omponents used in this view.
     */
    getComponents: function() {
      return [this, this._colorPopup, this._filter].concat(this._comboBoxPopups);
    },
    
    
    /**
     * @param key {String} The name of the propertie.
     * @param classname {String} The classname of the properties class.
     * @return {boolean} True, if the given property is in the view. 
     */
    containsProperty: function(key, classname) {
      return this._propertyColumns[classname + "." + key] == null ? false : true;
    },
    
    
    /**
     * This function hides or shows the inherited properties of the current 
     * displayed object. 
     */
    switchInheritedStatus: function() {
      // go threw all children of the propertylist
      var children = this.getChildren();      
      for (var i = 0; i < children.length; i++) {
        // if the child is marked as inherited
        if (children[i].getUserData("inherited")) {
            // set the current showInherited status to the widgets
            children[i].setDisplay(this._controller.getInheritedStatus());
        }
      }  
    },
    
    
    /**
     * In case of a theme change, the width of the property names can 
     * change. In that case, the width has to be calculated again with 
     * this function.
     */
    recalculateLayout: function() {  
      // get all children of the current list (atoms with names and group layouts)    
      var children = this.getChildren();
      // go threw all children
      for (var i = 0; i < children.length; i++) {
        // if it is a gooup layout
        if (children[i] instanceof qx.ui.layout.VerticalBoxLayout) {
          // reset the maxwidth          
          var maxWidth = 0;
          // go threw all property layouts
          for (var j = 0; j < children[i].getChildren().length; j++) {
            // get the label which holds the name of the property
            var labelName = children[i].getChildren()[j].getChildren()[0];
            // calculate the max width
            maxWidth = maxWidth > labelName.getPreferredBoxWidth() ? maxWidth : labelName.getPreferredBoxWidth();
          }          
          // go again threw all children of the grouplayout
          for (var k = 0; k < children[i].getChildren().length; k++) {
            // the the max width to every layout
            children[i].getChildren()[k].getChildren()[0].setWidth(maxWidth);
          }            
        }
      }
    },
    
    
    /*
    *********************************
       PROTECTED
    *********************************
    */
    /**
     * Ths function reloads the full property list. It uses recycling to 
     * speed up the loading process for new properties.
     * It also uses a cache for already seen classes to get more performance.
     * 
     * The function first of all reads all properties of the current selected
     * widget and stores them into a seperate array. The next step is to go 
     * backwords threw the array and check if the currently displayed properties
     * are the same as these of the selected widget. If that is the case the 
     * function keeps going to the subclass of the widget. Otherwise the current
     * displayed properties which are not equivalent to the properties of the
     * widget will be deleted and the properties of the new clases will be added. 
     * If the new properties are not in the cache, thew ill be created and 
     * added. Otherwise the old ones out of the cache will be added.
     * At the end of the creating process the function invokes the reloading
     * of the values of all properties.
     */
    _reloadPropertyListFull: function() {		     
      // variable to signal if the rest of the list should be replaced
      var replace = false;      
      // variable to signal if the not needed list items are deleted
      var oldremoved = true;
			
      // get the data
      var data = this._getData(this._controller.getWidget());
      // store the data in variables
      var groupNames = data.names;      
      var properties = data.props;
      var classnames = data.classes;    
      
      // if the class hiracy is enabled
      if (!this._controller.getGroupStatus()) {
        // remove thoses groups which are more than in the current wirdget
        this._removeUnnecessaryClasses(groupNames);
      }

      // go backwords threw the propertie arrays
      for(var i = properties.length - 1; i > 0 ; i--) {
        
        // if the class based view is enabled
        if (!this._controller.getGroupStatus()) {            
            // get the items curently displayed in the list      
            var currentListChildren = this.getChildren();    
            // if there are children in the list
            if (!replace && currentListChildren.length > 0) {
              // get the classname of the displayd class in the list
              var x = currentListChildren.length - 1 - 2 * (properties.length - i - 1);
              // if the new element is a subclass of the former element
              if (x > 0) {
                var classnameInList = currentListChildren[x].getUserData("name");
                // if the classname is not the requested class
                if (classnameInList != groupNames[i]) {                    
                  // mark the rest of the classes to delete
                  var deleteTo = groupNames[i + 1];
                  // mark that the rest of the classes should be replaces
                  replace = true;
                }
              } else {
                // mark that the classes should be replaces
                replace = true;
                // mark that nothing is there to remove
                oldremoved = false;
              }
            // if no children in the list
            } else {
              // mark that the classes should be replaces
              replace = true;
              // mark that nothing is there to remove
              oldremoved = false;         
            }
        // if the group based view is enabled    
        } else {
            // replace everything
            replace =  true;
            // at the first time            
            if (oldremoved) {
                this._clearList();
                // dont remove anything else
                oldremoved = false;                
            }
        }
        
        // if list items should be replaced / added        
        if (replace) {   
          // remove the old elements
          if (oldremoved) {
            this._removeOld(deleteTo);       
            // mark the classes as deleted
            oldremoved = false;            
          }
          
          // create the atom for the group and add it
          var groupNameAtom = new qx.ui.basic.Atom("<b>" + groupNames[i] + "</b>", qx.io.Alias.getInstance().resolve("inspector/image/close.gif"));
          groupNameAtom.setUserData("name", groupNames[i]);
          this.addAtBegin(groupNameAtom);

          // create a new layout for the group
          var groupLayout = new qx.ui.layout.VerticalBoxLayout();
          groupLayout.setUserData("name", groupNames[i]);
          groupLayout.setHeight("auto");                   

          // mark all but the first property group as inherited if the inherited view is enabled
          if (!this._controller.getGroupStatus()) {
            if (i == 1) {
              groupLayout.setUserData("inherited", false);
              groupNameAtom.setUserData("inherited", false);            
            } else {
              groupLayout.setUserData("inherited", true);
              groupNameAtom.setUserData("inherited", true);            
            }
          }
          
          // register the handler to open and collapse the groups
          groupNameAtom.addEventListener("click", function(e) {
            if(this.getDisplay()) {
                this.setDisplay(false);
                e.getTarget().setIcon(qx.io.Alias.getInstance().resolve("inspector/image/open.gif"));              
            } else {
                this.setDisplay(true);
                e.getTarget().setIcon(qx.io.Alias.getInstance().resolve("inspector/image/close.gif"));              
            }
          }, groupLayout);         

          // add the group of properties to the propertyList     
          this.addAfter(groupLayout, groupNameAtom);     
         
          // save the maxwidth for the current group
          var maxWidth = 0;
          // go threw all properties in the current group
          for (var key in properties[i]) {
            // ignore the property groups  
            if (properties[i][key].group == null) {
              
              // if the property is in the chache  
              if (this._oldPropertyListPool[classnames[i][key] + "." + key ] != undefined) {
                // get the layout from the cache
                var layout = this._oldPropertyListPool[classnames[i][key] + "." + key];
                // add it to the current groupe layout
                groupLayout.add(layout);
                // get the label and check if it affects the max width
                var label = layout.getChildren()[0];
                maxWidth = maxWidth > label.getPreferredBoxWidth() ? maxWidth : label.getPreferredBoxWidth();
                
                // add the property row to the reference array
                this._propertyColumns[classnames[i][key] + "." + key] = layout;
                
                // go over to the next property
                continue;
              }

              // create a row in the propertiy editor view
              var horizontalLayout = new qx.ui.layout.HorizontalBoxLayout();
              horizontalLayout.setHeight("auto");
              horizontalLayout.setPaddingTop(2);
              horizontalLayout.setPaddingLeft(20);
              horizontalLayout.setVerticalChildrenAlign("middle");
              horizontalLayout.setUserData("key", key);
              horizontalLayout.setUserData("classname", classnames[i][key]);
              groupLayout.add(horizontalLayout);
              
              // handle the clicks on the horizontalLayout
              horizontalLayout.addEventListener("click", function(e) {
                // get the horizontal layout
                var x = e.getTarget();
                while(x.getUserData("key") == null) {
                  x= x.getParent();
                }
                // get the currently clicked property name
                var classKey = x.getUserData("classname") + "." + x.getUserData("key");
                // reset the backgrund color of the former selected property
                if (this._controller.getSelectedProperty() != null) {
                  this._controller.getSelectedProperty().setBackgroundColor(null);
                }
                
                // if the Propertie is still available
                if (this._propertyColumns[classKey] != undefined) {
                  // set the backgrund color of the new selected property
                  this._propertyColumns[classKey].setBackgroundColor("yellow");
                  // enable or disable the buttons spesific to the widget
                  this._controller.setSelectedProperty(this._propertyColumns[classKey]);                  
                } else {
                  // reset the selected property if it is no longer available
                  this._controller.setSelectedProperty(null);
                }
                
              }, this); 

              // add the property row to the reference array
              this._propertyColumns[classnames[i][key] + "." + key] = horizontalLayout;
     
              // create and add the label for the property name
              var labelName = new qx.ui.basic.Label();
              labelName.setText(key + ":");
              labelName.setPaddingRight(5);
              // save the classname as aditional user data as a unique key in kombintaion with the lable
              labelName.setUserData("classname", classnames[i][key]);              
              // add the name of the property
              horizontalLayout.add(labelName);              
              
              // add the item to change the value
              horizontalLayout.add(this._getPropertyWidgetFull(properties[i][key], key, classnames[i][key]));              
              horizontalLayout.setUserData("type", properties[i][key].type);
              horizontalLayout.setUserData("possibleValues", properties[i][key].possibleValues);
              
              // add the image to signal the null value
              var nullImage = new qx.ui.basic.Image(qx.io.Alias.getInstance().resolve("inspector/image/null.png"));
              nullImage.setPaddingLeft(5);
              horizontalLayout.add(nullImage);       
                          
              // save the max width of the label
              maxWidth = maxWidth > labelName.getPreferredBoxWidth() ? maxWidth : labelName.getPreferredBoxWidth();
            }                

            // set the same width for the labels
            var children = groupLayout.getChildren();      
            for (var j = 0; j < children.length; j++) {
              children[j].getChildren()[0].setWidth(maxWidth);
            }        
          }        
        }
      }
      // show or hide the inherited classes
      this.switchInheritedStatus();
      // load all values of the properties
      this._refillPropertyListFull();
    },
    
    
    /**
     * Removes all groupes form the list that count is higher than the 
     * count of the classes in the current object. This function shold 
     * only be invokes if the class based view is enbaled.  
     * @param classnames {String[]} The classnames array.
     */    
    _removeUnnecessaryClasses: function(classnames) {
      // remove all classes from the list which are definitely not in the current widget
      while ((classnames.length  - 1) * 2 < this.getChildren().length) {
        // remove the first item (the name of the class) the list and dispose is
        var temp = this.getChildren()[0];
        this.removeAt(0);        
        temp.dispose();
       
        // get the layouts which holt the properties
        var propertyLayouts = this.getChildren()[0].getChildren();
        // gothrew all layouts of this class
        for (var i = 0; i < propertyLayouts.length; i++) {
          // get the classname.key string
          var classKey = propertyLayouts[i].getUserData("classname") + 
                         "." + propertyLayouts[i].getUserData("key");
          // store the layout in the pool
          this._oldPropertyListPool[classKey] = propertyLayouts[i];
          // delete the layout from the porperty cloumns
          delete this._propertyColumns[classKey];
        }
        // remove the first item i the list
        this.removeAt(0); 
      } 
    },
    
    
    /**
     * This function removes all old classes from the list to the 
     * given classname in the deleteTo parameter.
     * @param deleteTo {String} Classname.
     */
    _removeOld: function(deleteTo) {
      // if no deleteTo classname is given
      if (deleteTo == null) {
        // delete everything
        this._clearList();
        return;
      }
      // remove all until the marked class is reached
      while (true) {
        // get the classname of the current selected item in the list
        var removedClassName = this.getChildren()[0].getUserData("name");
        // stop deleting if the class is markt not to delete
        if (removedClassName == deleteTo) {
          break;
        } else {                
          // stor the reference in the pool bevor deleting
          if (this.getChildren()[0].classname == "qx.ui.layout.VerticalBoxLayout") {
            // get the list of all layouts which hold the properties
            var propertyLayouts = this.getChildren()[0].getChildren();
            // go threw all properties
            for (var currentIndex = 0; currentIndex < propertyLayouts.length; currentIndex++) {
              // generate the classname.key string
              var classKey = propertyLayouts[currentIndex].getUserData("classname") + 
                             "." + propertyLayouts[currentIndex].getUserData("key");
              // put the layout into the cache
              this._oldPropertyListPool[classKey] = propertyLayouts[currentIndex];
              // delete the layout from the porperty cloumns
              delete this._propertyColumns[classKey];
            }
          }
          // remove the first item i the list
          this.removeAt(0);
        }                
      }
    },
    
    
    /**
     * Removes all porperties in the list and caches the references in the pool.
     */
    _clearList: function() {
      // store all old porperty layouts in the pool
      for (var key in this._porpertyColumns) {
        this._oldPropertyListPool[key] = this._porpertyColumns[key];
        delete this._porpertyColumns[key];
      }
      // remove all in the list
      this.removeAll();
    },
    

    /**
     * This function creates, dependent on the type of property, a new widget
     * which representates the value of the widget in the property list e.g. 
     * a checkbox for a boolean value.
     * The handler for changing the values of the property will also be added 
     * after the creation process.
     * @param propertySet {Map} The array containing the propertie values.
     * @param key {String} The name of the propertie.
     * @param classname {String} The classname of the properties class.
     */
    _getPropertyWidgetFull: function(propertySet, key, classname) {
      // read value
      var getterName = "get" + qx.lang.String.toFirstUp(key);
      try {
        var value = this._controller.getWidget()[getterName].call(this._controller.getWidget());
      } catch (e) {
        return new qx.ui.basic.Label("Error");
      }
      
      // call the function to handle the right type
      if (propertySet.check !== null) {
        
        // Checkbox
        if (propertySet.check == "Boolean") {
          // create the checkbox
          var checkBox = new qx.ui.form.CheckBox();
          
          var checkBoxHandler = function(e) {            
            if (checkBox.getChecked != value) {
              // get the setter name
              var setterName = "set" + qx.lang.String.toFirstUp(key);
              // try to invoke the setter
              try {
                // set the new value
                this._controller.getWidget()[setterName].call(this._controller.getWidget(), checkBox.getChecked());                
                // relaod the property view of the current column
                this._setPropertyValueFull(key, classname);                
              } catch (ex) {
                // alert the user if the sett could not be executed
                alert(ex);
                checkBox.setChecked(value);
              }    
            }                
          };
          
          // register the handler for changing the checkbox
          checkBox.addEventListener("click", checkBoxHandler, this);
          return checkBox;
                    
        // Combobox
        } else if (propertySet.check instanceof Array) {
          var box = new qx.ui.form.ComboBox();
          // set the box to the width of the textfields
          box.setWidth(130);
          var values = propertySet.check;
          // go threw all possible values
          for (var i = 0; i < values.length; i++) {
            // create an combobox item
            var item = new qx.ui.form.ListItem(values[i]);
            // add the item to the combobox
            box.add(item);
          }          
          box.addEventListener("changeSelected", function(e) {
            // set the new value to null
            var newValue = null;            
            // if the selection is not null
            if (e.getTarget().getSelected() != null) {
              // get the new selected value
              var newValue = e.getTarget().getSelected().getLabel();
            }
            // invoke the setter only if the value has changed
            if (newValue != value) {  
                // get the setter name
                var setterName = "set" + qx.lang.String.toFirstUp(key);
                // try to invoke the setter
                try {
                  this._controller.getWidget()[setterName].call(this._controller.getWidget(), newValue);
                  // get the new value
                  value = this._controller.getWidget()[getterName].call(this._controller.getWidget());
                  // relaod the property view of the current column
                  this._setPropertyValueFull(key, classname);
                  // save the new value
                  value = this._controller.getWidget()[getterName].call(this._controller.getWidget());
                } catch (e) {
                  // alert the user if the set could not be executed
                  alert(e);
                }
              }        
          }, this);

          // get the popup
          var popup = box.getPopup(); 
          // add the popup of the combobox to the array of popups to omit them in the treeview 
          this._comboBoxPopups[this._comboBoxPopups.length] = popup;
          // add a listener so that the popup is always infont of the window
          popup.addEventListener("appear", function() {
            // set the zIndex to a higher one than the porperty editor window
            popup.setZIndex(this._controller.getZIndex() + 1);
          }, this);
          return box;
  
        // textfield
        } else if (propertySet.check == "Integer" || 
                   propertySet.check == "String" ||
                   propertySet.check == "NonEmptyString" ||
                   propertySet.check == "Label" ||
                   propertySet.check == "Float" ||
                   propertySet.check == "Double" || 
                   propertySet.check == "Number") {
          // create new textfield
          var textField = new qx.ui.form.TextField();
          
          var textFieldHandler = function(e) { 
            // check which type of event triggert the function
            if (e.classname == "qx.event.type.KeyEvent") {
              // do nothing if it is not the retunr key
              if (e.getKeyIdentifier() != "Enter") {
                return;
              }
              // otherwise go on
            } else if (e.classname == "qx.event.type.FocusEvent") {
              // go on
            } else {
              // do nothing if it is an unknown event
              return;
            }

            // get the setter name
            var setterName = "set" + qx.lang.String.toFirstUp(key);
            // try to invoke the setter
            try {
              // parse the value to float if a number is expected
              var newValue = textField.getComputedValue();
              // get the current setted value
              value = this._controller.getWidget()[getterName].call(this._controller.getWidget());                              
              // stop further processing if the representation is null
              if (e.classname == "qx.event.type.FocusEvent") {
                if (newValue == "" && value == null) {
                  return;
                }                
              }
              // try to parse                
              if (propertySet.check == "Integer" || propertySet.check == "Number") {
                newValue = parseFloat(newValue);
              }
              this._controller.getWidget()[setterName].call(this._controller.getWidget(), newValue);
              // relaod the property view of the current column
              this._setPropertyValueFull(key, classname);
              // save the new value
              value = this._controller.getWidget()[getterName].call(this._controller.getWidget());
            } catch (e) {
              // alert the user if the sett could not be executed
              alert(e);
              // set the field to the former value
              textField.setValue(value + "");                                     
            }            
          };
          // add the listener to the blur and keypress event
          textField.addEventListener("blur", textFieldHandler, this);          
          textField.addEventListener("keypress", textFieldHandler, this); 

          return textField;
            
        // color
        } else if (propertySet.check == "Color") {
          // create the layout which holds the colorField and the choose button
          var layout = new qx.ui.layout.HorizontalBoxLayout();
          layout.setVerticalChildrenAlign("middle");
          layout.setWidth("auto");
          layout.setSpacing(5);
          // create the color field and set the initial color
          var colorField = new qx.ui.basic.Terminator();
          colorField.setWidth(20);
          colorField.setHeight(15);
          colorField.setBorder("inset");
          layout.add(colorField);
          // save the color field in the corlor field array
          this._colorFields[classname + "." + key] = colorField;
          // create the button to choose the colors
          var button = new qx.ui.form.Button("Choose Color");         
          layout.add(button);    
          
          // handle the execution of the button (show the color popup
          button.addEventListener("execute", function() {
            // get the current position of the button and set the position of the color popup
            this._colorPopup.setTop(qx.html.Location.getClientBoxBottom(button.getElement()));
            this._colorPopup.setLeft(qx.html.Location.getClientBoxLeft(button.getElement()));
            
            // set the right color to the colorPopup
            try {
              this._colorPopup.setValue(colorField.getBackgroundColor());
            } catch (e) {
              // ignore (Workaround for qooxdoo bug)
            }

            // save the current property key
            this._currentColorProperty = classname + "." + key;
            // show the color popup
            this._colorPopup.show();
          }, this);  
                  
          return layout;     

        // widget             
        } else if (propertySet.ckeck == "qx.ui.core.Widget" || propertySet.ckeck == "qx.ui.core.Parent") {
          var widgetLabel = new qx.ui.basic.Label();
          return widgetLabel;  
          
        // rest            
        } else {
          var unknownLabel = new qx.ui.basic.Label();
          return unknownLabel;
        }      
      
      } else {
            var unknownLabel = new qx.ui.basic.Label();
            return unknownLabel;
      }
    },
    
    
    /**
     * Reloads all values of the currently shown properties.
     */
    _refillPropertyListFull: function() {
      // go threw all stored property columns
      for (var index in this._propertyColumns) {
        // get the key and the classname
        var key = index.substr(index.lastIndexOf(".") + 1);
        var classname = index.substring(0, index.lastIndexOf("."));
        // set the new value for all
        this._setPropertyValueFull(key, classname);
      }
    },    
    
    
    /**
     * This function sets the value of the given property.
     * It first reads the current value of the property. If the value 
     * is null, the null label will be displayed.
     * The next step is to check the kind of widget which represents the value 
     * of the property. According to the type of widget, the right value will 
     * be set.
     * @param key {String} The name of the propertie.
     * @param classname {String} The classname of the properties class.
     */
    _setPropertyValueFull: function(key, classname) {			
      // get the layout containing the property 
      var layout = this._propertyColumns[classname + "." + key];
      
      // reset the background color in case that the former widget had a read error
      layout.setBackgroundColor(null);        
      
      // mark the layout if it is currently the selected one
      if (layout == this._controller.getSelectedProperty()) {
        layout.setBackgroundColor("yellow");
      }
      
      // read value
      var getterName = "get" + qx.lang.String.toFirstUp(key);
      try {
        var value = this._controller.getWidget()[getterName].call(this._controller.getWidget());  
      } catch (e) {
				// if there is a label to signal that there was an error
        if (layout.getChildren()[1].classname == "qx.ui.basic.Label") {
					// write the text in red
					layout.getChildren()[1].setTextColor("red");
					// print out the error message
					layout.getChildren()[1].setText(e + "");
					// hide the null icon
          layout.getChildren()[2].setDisplay(false);					
				} else {
					layout.setBackgroundColor("red");					
				}
        return;
      }

      // show or hide the null label
      if (value == null) {
        layout.getChildren()[2].setDisplay(true);
      } else {
        layout.getChildren()[2].setDisplay(false);
      }     
      
      try {
        // handle the inheritance of the properties
        var parent = this._controller.getWidget();
        while (value == "inherit") {
          parent = parent.getParent();        
          value = parent[getterName].call(parent);
        }
      } catch (e) {
        // if there is a label to signal that there was an error				
				if (layout.getChildren()[1].classname == "qx.ui.basic.Label") {
          // write the text in red
          layout.getChildren()[1].setTextColor("red");
          // print out the error message
          layout.getChildren()[1].setText(e + "");					
				} else {
	        layout.setBackgroundColor("red");					
				}
        return;
      }
			
      // check box
      if (layout.getChildren()[1].classname == "qx.ui.form.CheckBox") {
        if (value == null) {
          layout.getChildren()[1].setChecked(false);
        } else {
          layout.getChildren()[1].setChecked(value);          
        }

      // labels
      } else if (layout.getChildren()[1].classname == "qx.ui.basic.Label") {
        if (value != null) {
          
          var properties = qx.Class.getByName(classname).$$properties;
          var property = properties[key];
          // if it is an array
          if (value instanceof Array) {
            layout.getChildren()[1].setText(value.length + " objects");
            
          // if it is a widget and not the client document  
          } else if ((property.check == "qx.ui.core.Widget" || 
                      property.check == "qx.ui.core.Parent")&& 
              (this._controller.getWidget().classname != "qx.ui.core.ClientDocument")) {
            
            // create the link to the widget
            layout.getChildren()[1].setText("<u>" + value.classname + " [" + value.toHashCode() + "]</u>");
            layout.getChildren()[1].setStyleProperty("cursor", "pointer");
           
            // add only a event listener the first time
            if (layout.getChildren()[1].hasEventListeners("click") === undefined) {
              
              // register the click handler
              layout.getChildren()[1].addEventListener("click", function(e) {
                
                if (this._controller.getSelectedProperty() != null) {
                  // disable the selection of current selected property
                  this._controller.getSelectedProperty().setBackgroundColor(null);                
                }
                // save the new property
                this._controller.setSelectedProperty(layout);
                // tell the controller to go to the new widget
                this._controller.gotoSelectedWidget();
              }, this);            
            }   

          // fonts    
          } else if(property.check == "Font") {
            // set the font of the label
            layout.getChildren()[1].setFont(value);            
            layout.getChildren()[1].setText(value + "");
            
          } else {
            layout.getChildren()[1].setText(value + "");
          }
        // reset the label if the value is set null
        } else {
          layout.getChildren()[1].setText("");
        }
        
      // textfields  
      } else if (layout.getChildren()[1].classname == "qx.ui.form.TextField") {
        // set the current value
        if (value != null) {
          layout.getChildren()[1].setValue(value + "");
        } else {
          layout.getChildren()[1].setValue("");
        }

      // combobox  
      } else if (layout.getChildren()[1].classname == "qx.ui.form.ComboBox") {
        
        // get the current combobox
        var box = layout.getChildren()[1];
        
        // it the value is null
        if (value == null) {
          // delete the selection of the combobox
          box.setSelected(null);
        } else {
          // search for the selected item
          for (var i = 0; i < box.getList().getChildren().length; i++) {
            // if the item is found
            if (value == box.getList().getChildren()[i].getLabel()) {
              // set the item as selected
              box.setSelected(box.getList().getChildren()[i]);          
            }
          }
        }
      
      // color
      } else if (layout.getChildren()[1].classname == "qx.ui.layout.HorizontalBoxLayout") {        
        layout.getChildren()[1].getChildren()[0].setBackgroundColor(value);
            
      }
    },    

    
    /*
    *********************************
       CONSTRUCTOR HELPERS
    *********************************
    */    
    /**
     * Creates the color popup which is needed to set colors.
     */
    _createColorPopup: function() {
      // create the color table to initialize the color popup
      var colorTable =
      {
        core : {
          label : "Basic Colors",
          values : [ "#000", "#333", "#666", "#999", "#CCC", "#FFF", "red", "green", "blue", "yellow", "teal", "maroon" ]
        },
  
        recent : {
          label : "Recent Colors",
  
          // In this case we need named colors or rgb-value-strings, hex is not allowed currently
          values : [ ]
        }
      };
      // create a instance of color popup
      this._colorPopup = new qx.ui.component.ColorPopup(colorTable);
      // set the zIndex to a higher one than the window is
      this._colorPopup._minZIndex = 2000000000;
      // enable the color popup in catse that the client document will be disabled
      this._colorPopup.setEnabled(true);
      
      // add the colorpopup to the document
      this._colorPopup.addToDocument();

      // wrapp the function on the color popup which creates the color selector
      // save the reference to the original function
      var orgFunction = this._colorPopup._createColorSelector;
      // create a new function to substitute the old
      var self = this;
      var newFunction = function() {
        // start the exclusion
        inspector.Inspector.getInstance().beginExclusion();
        // call the old function    
        orgFunction.call(self._colorPopup);
        // end the exclusion
        inspector.Inspector.getInstance().endExclusion();
      }
      // add the new function to the color popup
      this._colorPopup._createColorSelector = newFunction;
      
      // create the object so save the colorFields in the property editor
      this._colorFields = {};
      
      // handler to set the selected colors
      this._colorPopup.addEventListener("changeValue", function(e) {
        // do not invoke the setter if the color has been changed without a property
        if (this._currentColorProperty != null) {
          var colorKey = this._currentColorProperty.substr(this._currentColorProperty.lastIndexOf(".") + 1);
          var colorClassname = this._currentColorProperty.substring(0, this._currentColorProperty.lastIndexOf("."));
          // get the setter name
          var setterName = "set" + qx.lang.String.toFirstUp(colorKey);
          // try to invoke the setter
          try {
            this._controller.getWidget()[setterName].call(this._controller.getWidget(), e.getData());
            // set the selected color of the colorField
            this._colorFields[this._currentColorProperty].setBackgroundColor(e.getData());
            // relaod the property view of the current column
            this._setPropertyValueFull(colorKey, colorClassname);          
          } catch (e) {
            // alert the user if the sett could not be executed
            alert(e);
          }      
          // reset the current color property to "not selected"
          this._currentColorProperty = null;        
        }
      }, this);
    }
  },
  
  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */
  destruct : function() {
    this._disposeFields("_propertyColumns", "_comboBoxPopups", "_colorPopup", 
                        "_colorFields", "_oldPropertyListPool");
  }
});