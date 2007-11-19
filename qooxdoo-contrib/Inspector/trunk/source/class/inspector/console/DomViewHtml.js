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
    this._htmlEmbed.setOverflow("scrollY");
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
    
    _breadCrumb: null,
    
    /*
    *********************************
       PUBLIC
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
     * Returns the string that identifies the current object 
     * in the dom view.
     * @return {String} Information string.
     */
    getCaptionMessage: function() {
			// if there is a firest element in the breadcrumbs
      if (this._breadCrumb[0]) {
				// return its name
	      return this._breadCrumb[0].name;				
			}
			// otherwise return a message telling that no selection has been made
			return "nothing selected";
    },

    /**
     * Set a new object to inspect.
     * @param object {Object} The object to inspect.
     * @param name {String} The name of the object.
     */
    setObject: function(object, name) {
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
                    // stop further processing
                    return;
                  }
                }
                
                // set the new object with a higher index
                this._htmlEmbed.setHtml(this._getHtmlToObject(newQxObject, (index) + 1, key));
            // if only a index is given (selection wia the back button)
            } else {
                // select the stored object in the array
                var newQxObject = this._breadCrumb[index].object;
								// select the stored name
								var newName = this._breadCrumb[index].name;
                // show the selected array with the current index
                this._htmlEmbed.setHtml(this._getHtmlToObject(newQxObject, index, newName));    
            }
        } catch (e) {
            alert("Can not select this Object: " + e);
        }
        
    },
    
    
    /**
     * Clears the whole dom view.
     */
    clear: function() {
      this._htmlEmbed.setHtml("");
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
			
      // create a temp array for the sorted values
			var sortedValues = [];
			// write the objects values to the new array
			for (var key in qxObject) {
				sortedValues.push({key: key, value: qxObject[key]})
			}			
			// sort the array
			sortedValues.sort(function(a, b) {
        // String compare
				for (var i = 0; i < Math.max(a.key.length, b.key.length); i++) {
					// check if one of the keys already ended
					if (isNaN(a.key.charCodeAt(i))) {
						return -1;
					}
					if (isNaN(b.key.charCodeAt(i))) {
						return 1;
					}
					// compare the chacodes at all positions of the string					
					if (a.key.charCodeAt(i) < b.key.charCodeAt(i)) {
						return -1;
					} else if (a.key.charCodeAt(i) > b.key.charCodeAt(i)) {
						return 1;
					}
				}
				// if the strings are equal
				return 0;
			});
			
      // go threw all properties of the object
      for (var i = 0; i < sortedValues.length; i++) {      
        // kar that there has been a property printed out
        nothingToShow = false;
        // start the return divs
        returnString += "";

        // if it is not an object
        if (!(sortedValues[i].value instanceof Object)) {
          returnString += "<div class='ins_dom_key_non_object'>" + sortedValues[i].key + "</div>";
          
          // if the value is null
          if (sortedValues[i].value == null) {
              returnString += "<div><span class='ins_dom_null'>" + sortedValues[i].value + "</span></div>";
          } else if (typeof sortedValues[i].value == "string"){
              returnString += "<div class='ins_dom_string'>&quot;" + sortedValues[i].value + "&quot;</div>";              
          } else {
              returnString += "<div class='ins_dom_basic'>"  + sortedValues[i].value + "</div>";
          }

        // if it is an object          
        } else {
          // print out the objects key          
          returnString += "<div class='ins_dom_key_object'>" + sortedValues[i].key + "</div>";
					
          // if the object holds a reference to itself
          if (sortedValues[i].value == qxObject) {
            // print out a message for a self index
            returnString += "<div class='ins_dom_self_ref'>self reference</div>";
          } else {
            // print out the objects value
            returnString += "<div>" + this._getObject(sortedValues[i].value, index, sortedValues[i].key) + "</div>";                      
          }

        }
      }
      
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
      var returnString = "<span class='ins_dom_object' onclick='" +
                             "inspector.Inspector.getInstance().inspectObjectByDomSelecet(" + index + ", \"" + key + "\")" + 
                          "'>";
                          
      // if it is a function
      if (object instanceof Function) {
				if (object.toString().indexOf(")") != -1 ) {
          returnString += object.toString().substring(0, object.toString().indexOf(")") + 1);
				} else {
					returnString += object.toString();
				}
              
      // if it is an array
      } else if (object instanceof Array) {
        returnString += "[ ";
          // if it has more than two elements
          if (object.length > 2) {
              // print out the first tow elements
            for (var j = 0; j < 2; j++) {
                returnString += object[j] + ", ";
            }
            // print out a message that there are more
            returnString += " ... <span class='ins_dom_array_more'>" + (object.length - 2) + " more</span> ]";
        // if it is an empty array                
        } else if (object.length == 0) {
            returnString += " ]";
        // if there are one or two elements
        } else {
            // print out all containing elements
            for (var j = 0; j < 2 && j < object.length; j++) {
                returnString += object[j];
                // print out the comma only if it is not the last element
                if (j != 1 && j != object.length - 1) {
                    returnString +=  ", ";
                }
            }
            returnString += " ]";            
        }
        
      // if it is a regular object
      } else {
          returnString += object;
      }      
      returnString += "</span>";
      
      return returnString;
    }

  }     
});