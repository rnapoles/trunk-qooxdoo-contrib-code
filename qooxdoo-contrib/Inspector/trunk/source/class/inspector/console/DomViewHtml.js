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

qx.Class.define("inspector.console.DomViewHtml", {
  
  extend : qx.ui.layout.VerticalBoxLayout,  
  implement : inspector.console.IView, 
    
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  construct : function(console) {    
    this.base(arguments);
    // sorte the reference to the console window
    this._console = console;
    // set the Layout to 100% width
    this.setWidth("100%");
    
    // create the HTML embed
    this._htmlEmbed = new qx.ui.embed.HtmlEmbed();
    this._htmlEmbed.setBackgroundColor("white");
    this._htmlEmbed.setBorder("inset");
    this._htmlEmbed.setOverflow("auto");
    this._htmlEmbed.setWidth("100%");
    this._htmlEmbed.setHeight(174);
    this.add(this._htmlEmbed);
    
    this._htmlEmbed.setHtmlProperty("id", "qx_srcview");
    
    // creaete the array used to  stor the naviagating path
    this._breadCrumb = [];
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
    // reference to the console
    _console: null,
   
    // the main element
    _htmlEmbed: null,
    
    // trace of breadcrums
    _breadCrumb: null,
    
    // the current filter string
    _filter: "",
    
    /*
    *********************************
       PUBLIC
    *********************************
    */
    /**
     * Set a new object to inspect.
     * @param object {Object} The object to inspect.
     * @param name {String} The name of the object.
     */
    setObject: function(object, name) {
      // empty the breadcrumbs
      this._breadCrumb = [];
      
      // split the name into pieces seperated by a dot
      var elements = name.split(".");      
      
      // go thrrew all pieces exept the last one
      for (var i = 0; i < elements.length - 1; i++) {
        // create an empty string which holds the objects reference at the end
        var objectReference = "";
        // go threw all further elements of the split
        for (var j = 0; j <= i; j++) {
          // add the elements to the objects reference
          objectReference += elements[j];
          // if it is not the last round
          if (j != i) {
            // add a dot between the elements
            objectReference += ".";
          }
        }
        // create a reference out of the reference string
        var breadCrumbObject = eval(objectReference);
        // add the object and the name to the breadcrumbs
        this._breadCrumb[i] = {object: breadCrumbObject, name: elements[i]};
      }
      // get the last name of the given elements
      name = elements[elements.length - 1];
      // set the object to display in the dom view
      this._htmlEmbed.setHtml(this._getHtmlToObject(object, i, name));
    },
    
    
    /**
     * Sets a new object in the dom view.
     * @internal
     * @param index {Number} The index in the objects array.  
     * @param key {Object} The name of the value of the indexed object.
     */
    setObjectByIndex: function(index, key) {
      // reset the filter
      this._filter = "";
      try {
          // if a key is given (selection of a object as a value) 
          if (key) {
              // select the given value object
              var newQxObject = this._breadCrumb[index].object[key];
              
              // check if the new Object is alread in the history of the selected objects
              for (var i = 0; i < this._breadCrumb.length; i++) {
                // if it is in the history
                if (this._breadCrumb[i].object == newQxObject) {
                  // set the index to the history element
                  this._htmlEmbed.setHtml(this._getHtmlToObject(newQxObject, i, key));
                  // scroll to the top of the view
                  this._htmlEmbed.setScrollTop(0);
                  // stop further processing
                  return;
                }
              }
              
              // set the new object with a higher index
              this._htmlEmbed.setHtml(this._getHtmlToObject(newQxObject, (index) + 1, key));
              // scroll to the top of the view    
              this._htmlEmbed.setScrollTop(0);
              
          // if only a index is given (selection wia the back button)
          } else {
              // select the stored object in the array
              var newQxObject = this._breadCrumb[index].object;
              // select the stored name
              var newName = this._breadCrumb[index].name;
              // show the selected array with the current index
              this._htmlEmbed.setHtml(this._getHtmlToObject(newQxObject, index, newName));
              // scroll to the top of the view
              this._htmlEmbed.setScrollTop(0);
              // delete the old elements of the breadcrumb
               this._breadCrumb.splice(index + 1, this._breadCrumb.length - index + 1);
              
                  
          }
      } catch (e) {
          alert("Can not select this Object: " + e);
      }    
    },
    
    
    /*
    *********************************
       IVIEW IMPLEMENTATIONS
    *********************************
    */  
    /**
     * @internal
     * @return The components of the console.
     */
    getComponents: function() {
      return [this, this._htmlEmbed];
    },
    
    
    /**
     * @internal
     * @param delta {Number} The edlta of the height.
     */
    setMainElementDeltaHeight: function(delta) {
      this._htmlEmbed.setHeight(this._htmlEmbed.getHeight() + delta);
    },
    
    
    /**
     * Doesent do anything because no focus is needed.
     */
    focus: function() {
      // do nothing
    },


    /**
     * Clears the whole dom view.
     */
    clear: function() {
      this._htmlEmbed.setHtml("");
    },
		

    /**
     * Returns the string that identifies the current object 
     * in the dom view.
     * @return {String} Information string.
     */
    getCaptionMessage: function() {
      // if there is a firest element in the breadcrumbs
      if (this._breadCrumb.length > 0) {
        // return its name
        return this._breadCrumb[this._breadCrumb.length - 1].name;        
      }
      // otherwise return a message telling that no selection has been made
      return "nothing selected";
    },
		
		
    /**
     * Filters the current view objects properties with the given filter.
     * @param filter {String} String to specify the regexp object.
     */
    filter: function(filter) {
      // save the current filter string
      this._filter = filter;
      // if there is a object shown
      if (this._breadCrumb.length > 0) {
        // get the current objects data
        var index = this._breadCrumb.length - 1;
        var object = this._breadCrumb[index].object;
        var name = this._breadCrumb[index].name;
        // make a new html by using the filter
        this._htmlEmbed.setHtml(this._getHtmlToObject(object, index, name));
      }
    },
    
    
    /**
     * Returns the string used to filter or if no string is set the defaul message.
     * @return {String} The string used to filter
     */
    getFilter: function() {
      // if there is no filter set
      if (this._filter == "") {
        // return the default search string
        return inspector.console.Console.SEARCH_TERM;
      } else {
        // otherwise, return the filter string
        return this._filter;
      }
    },  
    
    
    /**
     * Returns the classname of the current selected object, if it is a qooxdoo object.
     * Otherwise, null will be returned.
     * @return {String | null} The name of the current selected class.
     */
    getCurrentSelectedClassname: function() {
      // if a object is selected
      if (this._breadCrumb.length > 0) {
        // if the current object is a qooxdoo object
        if (this._breadCrumb[this._breadCrumb.length - 1].object instanceof qx.core.Object) {
          return this._breadCrumb[this._breadCrumb.length - 1].object.classname;
        }
      }
      return null;
    },
    
    
    /*
    *********************************
       PROTECTED
    *********************************
    */    
    /**
     * Returns a html String which contains table of the objects porperties and values.
     * @internal
     * @param qxObject {Object} The object to return the html from.
     * @param index {Object} The index of the object path.
     * @param name {String} The name of the selected object.
     */
    _getHtmlToObject: function(qxObject, index, name) {
      // create an empty string
      var returnString = "";

      // set a default name if none is set
      if (name == undefined) {
        var name = "Object";
      }

      // save the object a path array
      this._breadCrumb[index] = {object: qxObject, name: name};
      
      returnString += this._getReturnPath(index);
      
      // flat used to signal if porperties were print out
      var nothingToShow = true;
      
      // if a filter is given
      if (this._filter != "") {
        // try to create a filter regexp
        try {
          // create the needed regexp object
          var regExp = new RegExp(this._filter);
        } catch (e) {
          // if that doesnt work, tell the user why
          alert("Unable to filter: " + e);
        }
      }
      // create a temp array for the sorted and filtered values
      var sortedValues = [];
      // write the objects values to the new array
      for (var key in qxObject) {
        // if a filter is given
        if (regExp != null) {
          // test if the key matches the filter
          if (regExp.test(key)) {
            // add the kexy value pair to the sorted sert
            sortedValues.push({key: key, value: qxObject[key]})
          }
        } else {
          // add all key value pairs to the sorted set
          sortedValues.push({key: key, value: qxObject[key]})
        }
      }
      
      // sort the array
      sortedValues.sort(function(a, b) {
        // both parameters a no numbers
        if( isNaN(a.key) || isNaN(b.key) ) {
          return ((a.key < b.key) ? -1 : ((a.key > b.key) ? 1 : 0));
        } else {
          return a.key - b.key;
        }
      });      

      // start the table which holds all attributes
      returnString += "<table class='ins_dom_table'>";
      // go threw all properties of the object
      for (var i = 0; i < sortedValues.length; i++) {      
        // kar that there has been a property printed out
        nothingToShow = false;
        // start the return divs
        returnString += "";
        
        // if the key is a number
        if (!isNaN(sortedValues[i].key)) {
          // set the style for key as numbers
          var keyStyle = "ins_dom_key_number";
        } else {
          // set the style for string keys
          var keyStyle = "ins_dom_key";
        }

        // if it is not an object
        if (!(sortedValues[i].value instanceof Object)) {
          returnString += "<tr><td class='" + keyStyle + "'><img class='ins_dom_front_image' src='" + 
                          qx.io.Alias.getInstance().resolve("inspector/image/spacer.gif") + 
                          "'>" + this._console.escapeHtml(sortedValues[i].key) + "</td>";
          
          // if the value is null
          if (sortedValues[i].value == null) {
              returnString += "<td><span class='ins_dom_null'>" + sortedValues[i].value + "</span></td></tr>";
          } else if (typeof sortedValues[i].value == "string"){
              returnString += "<td class='ins_dom_string'>&quot;" + this._console.escapeHtml(sortedValues[i].value) + "&quot;</td></tr>";              
          } else {
              returnString += "<td class='ins_dom_basic'>"  + sortedValues[i].value + "</td></tr>";
          }

        // if it is an object          
        } else {

          // check if it is a faunction
          if (sortedValues[i].value instanceof Function) {
            // get the code of the function via the toString function
            var code = sortedValues[i].value.toString();
            // if the code contains the string "[native code]"
            if (code.search(/native code/) != -1) {
              // ignore the function and go to the next
              continue;
            }
          }
          
          // if it is not the selected object (self reference)
          if (sortedValues[i].value != qxObject) {
            // print out the objects key incl. the link to select it         
            returnString += "<tr><td class='" + keyStyle + "'><a onclick='" +
                            "inspector.Inspector.getInstance().inspectObjectByDomSelecet(" + index + ", \"" + sortedValues[i].key + "\")" + 
                            "'><img class='ins_dom_front_image' src='" + 
                            qx.io.Alias.getInstance().resolve("inspector/image/open.gif") + 
                            "'>" + this._console.escapeHtml(sortedValues[i].key) + "</a></td>";
          }
            
          // if the object holds a reference to itself
          if (sortedValues[i].value == qxObject) {
            // print out the objects key without the link to select it        
            returnString += "<tr><td class='ins_dom_key'><img class='ins_dom_front_image' src='" + 
                            qx.io.Alias.getInstance().resolve("inspector/image/spacer.gif") + 
                            "'>" + sortedValues[i].key + "</td>";            
            // print out a message for a self index
            returnString += "<td class='ins_dom_self_ref'>self reference</td></tr>";

          // if it is a function          
          } else if (sortedValues[i].value instanceof Function) {
            
            // if it is a qooxdoo class
            if (sortedValues[i].value.toString().substr(0, 7) == "[Class ") {
              // print out the objects value as a object
              returnString += "<td class='ins_dom_object'>" + this._getObject(sortedValues[i].value, index, sortedValues[i].key) + "</td></tr>";              
            } else {
              // print out the objects value as a function
              returnString += "<td class='ins_dom_func_object'>" + this._getObject(sortedValues[i].value, index, sortedValues[i].key) + "</td></tr>";                          
            }
            
          } else {
            // print out the objects value
            returnString += "<td class='ins_dom_object'>" + this._getObject(sortedValues[i].value, index, sortedValues[i].key) + "</td></tr>";                      
          }

        }
      }
      // end the table
      returnString += "</table>";
      
      // if there is no property
      if (nothingToShow) {
          returnString += "<div class='ins_dom_no_prop'>There are no properties to show for this object.</div>";
      }
      
      // if the current object is a function
      if (qxObject instanceof Function && !qxObject.hasOwnProperty("toString")) {
        // get the code of the function as a string
        var functionCode = qxObject.toString();
        // let qooxdoo highlight the javascript code
        functionCode = "<pre>" + qx.dev.Tokenizer.javaScriptToHtml(functionCode) + "</pre>";
        // print out the function code
        returnString += "<div class='ins_dom_func'>" + functionCode + "</div>";
      }
      
      return returnString;
    },
       
   
    /**
     * Creates a html div as a string. This html shows a
     * path back threw the selected objects.
     * @param index {Number} The current index of the path.
     */
    _getReturnPath: function(index) {
      // print the path to go back
      var returnString = "<div class='ins_dom_return_path_main'>";  
      
      // go threw the existing path
      for (var i = 0; i <= index; i++) {
        // if it is the current item
          if (i == index) {
            returnString += " &raquo; <span class='ins_dom_return_path_selected'>"
        } else {
              // print out every item of the path
            returnString += " &raquo; <span class='ins_dom_return_path_link' onclick='" + 
                            "inspector.Inspector.getInstance().inspectObjectByDomSelecet(" + i + ")'>";            
        }
        
        // print out the name
        returnString += this._breadCrumb[i].name;
        
        returnString += "</span>";
      }
      // end tht leading div
      returnString += "</div>";
      
      return returnString;
    },
    
    
    /**
     * Returns a html stringcontaining a link to select the given object.
     * @param object {Object} The object to select.
     * @param index {Number} The index in the path to the selectd object.
     * @param index {String} The porperty to select the new object.
     */
    _getObject: function(object, index, key) {
      var returnString = "<a onclick='" +
                             "inspector.Inspector.getInstance().inspectObjectByDomSelecet(" + index + ", \"" + key + "\")" + 
                          "'>";
                          
      // if it is a function
      if (object instanceof Function) {
        // if the toString contains a )
        if (object.toString().indexOf(")") != -1 ) {
          // take the first characters to the )
          returnString += object.toString().substring(0, object.toString().indexOf(")") + 1);
        } else {
          // take the whole toString
          returnString += object.toString();
        }

      // if it is an array
      } else if (object instanceof Array) {
        returnString += "[ ";
        // print out the first elements if existatnt
        for (var j = 0; j < 2 && j < object.length; j++) {
          // if the element is a function
          if (object[j] instanceof Function) {
            // print out that it is a function int the function style
            returnString += "<span class='ins_dom_func_object'>function()</span>";               
          // if it is a string
          } else if (typeof object[j] == "string") {
            // print out the string in the string style
            returnString += "<span class='ins_dom_string'>&quot;" + object[j] + "&quot;</span>";                               
          // if it is a object
          } else if (object[j] instanceof Object) {
            // print out the objects toSring in the object style
            returnString += "<span class='ins_dom_object'>" + object[j] + "</span>";                
          // in all other cases it is a primitive type
          } else {
            // print out the value in basic style
            returnString += "<span class='ins_dom_basic'>" + object[j] + "</span>";                
          }            
          
          // print out the comma only if it is not the last element
          if (j != 1 && j != object.length - 1) {
              returnString +=  ", ";
          }              
        }
        // if there are more elements
        if (object.length > 2) {
          // print out a message that there are more
          returnString += ", ... <span class='ins_dom_array_more'>" + (object.length - 2) + " more</span> ]";              
        } else {
          // close the array
          returnString += " ]";
        }
        
      // if it is a qooxdoo object  
      } else if (object instanceof qx.core.Object) {
          returnString += object + "</a> <a style='color: #000000;' onclick=\"inspector.Inspector.getInstance().setWidgetByDbKey(" + object.getDbKey() + ", 'console');\">this</u>";

      // if it is a regular object
      } else {
          returnString += object;
      }      
      returnString += "</a>";
      
      return returnString;
    }
  }     
});