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
    this._objectsArray = [];
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
    
    _objectsArray: null,
    
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
    
    
    setMainElementDeltaHeight: function(delta) {
      this._htmlEmbed.setHeight(this._htmlEmbed.getHeight() + delta);
    },
    
    
    focus: function() {
      // do nothing
    },


    /**
     * Set a new object to inspect.
     * @param object {Object} The object to inspect.
     */
    setObject: function(object) {
      this._htmlEmbed.setHtml(this._getHtmlToObject(object, 0));
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
                var newQxObject = this._objectsArray[index][key];
                
                // check if the new Object is alread in the history of the selected objects
                for (var i = 0; i < this._objectsArray.length; i++) {
                  // if it is in the history
                  if (this._objectsArray[i] == newQxObject) {
                    // set the index to the history element
                    this._htmlEmbed.setHtml(this._getHtmlToObject(newQxObject, i));
                    // stop further processing
                    return;
                  }
                }
                
                // set the new object with a higher index
                this._htmlEmbed.setHtml(this._getHtmlToObject(newQxObject, (index) + 1));
            // if only a index is given (selection wia the back button)
            } else {
                // select the stored object in the array
                var newQxObject = this._objectsArray[index];
                // show the selected array with the current index
                this._htmlEmbed.setHtml(this._getHtmlToObject(newQxObject, index));    
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
     */
    _getHtmlToObject: function(qxObject, index) {
      // create an empty string
      var returnString = "";

      // save the object a path array
      this._objectsArray[index] = qxObject;
      
      returnString += this._getReturnPath(index);
      
      // flat used to signal if porperties were print out
      var nothingToShow = true;      
      // go threw all properties of the object
      for (var key in qxObject) {      
        // kar that there has been a property printed out
        nothingToShow = false;
        // start the table
        returnString += "<div style='font-family: Helvetica; margin-bottom: -5px'><table width='100%'>";

        // if it is not an object
        if (!(qxObject[key] instanceof Object)) {
          returnString += "<tr><td width='40%'><font size='2'>" + key + "</font></td>";
          
          // if the value is null
          if (qxObject[key] == null) {
              returnString += "<td><span style='color: white; background-color: #999999; border: 1px #666666 solid;'><font size='2'>" + qxObject[key] + "</font></span></td></tr>";
          } else if (typeof qxObject[key] == "string"){
              returnString += "<td><span style='color: red;'><font size='2'>&quot;" + qxObject[key] + "&quot;</font></span></td></tr>";              
          } else {
                returnString += "<td><span style='color: darkblue;'><font size='2'>"  + qxObject[key] + "</font></span></td></tr>";
          }

        // if it is an object          
        } else {
          // print out the objects key          
          returnString += "<tr>" + 
                            "<td width='40%' valign='top'><font size='2'><b>" + key + "</b></font>" +  
                            "</td>";
          // if the object holds a reference to itself
          if (qxObject[key] == qxObject) {
            // print out a message for a self index
            returnString += "<td><font color='#AAAAAA' size='2'><i>self reference</i></font></td></tr>";
          } else {
            // print out the objects value
            returnString += "<td>" + this._getObject(qxObject[key], index, key) + "</td></tr>";                      
          }

        }
        // end the table 
        returnString += "</table></div>";
      }
      
      // if there is no property
      if (nothingToShow) {
          returnString += "<div style='padding: 10px; color: #999999; font-family: Helvetica;'>There are no properties to show for this object.</div>";
      }
      
      // if the current object is a function
      if (qxObject instanceof Function) {
        // get the code of the function as a string
        var functionCode = qxObject.toString();
        // let qooxdoo highlight the javascript code
        functionCode = "<pre>" + qx.dev.Tokenizer.javaScriptToHtml(functionCode) + "</pre>";
        // print out the function code
        returnString += "<div style='margin-top: 10px; padding: 10px;  border-top: 1px #666666 solid;'>" + functionCode + "</div>";
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
      var returnString = "<div style='font: bold 12px Helvetica; border-bottom: 1px #555555 solid; padding: 5px; background-color: #000000; color: #FFFFFF;'>";  
      
      // go threw the existing path
      for (var i = 0; i <= index; i++) {
        // if it is the current item
          if (i == index) {
            returnString += " &raquo; <span style='color: #666666;'>"
        } else {
              // print out every item of the path
            returnString += " &raquo; <span style='cursor: pointer;' onclick='" + 
                            "inspector.Inspector.getInstance().inspectObjectByDomSelecet(" + i + ")'>";            
        }
        // do print the functions as function()
        if (this._objectsArray[i] instanceof Function) {
            returnString += "function()";    
        // check for arrays
        } else if (this._objectsArray[i] instanceof Array) {
            returnString += "<b>Array</b>";
        } else {
            returnString += this._objectsArray[i];
        }
        
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
      var returnString = "<span style='color: green; cursor: pointer;' onclick='" +
                             "inspector.Inspector.getInstance().inspectObjectByDomSelecet(" + index + ", \"" + key + "\")" + 
                          "'><font size='2'>";
                          
      // if it is a function
      if (object instanceof Function) {
          returnString += object.toString().substring(0, object.toString().indexOf(")") + 1);
              
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
            returnString += " ... <b>" + (object.length - 2) + " more</b> ]";
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
      returnString += "</font></span>";
      
      return returnString;
    }

  }     
});