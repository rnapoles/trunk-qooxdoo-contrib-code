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
		// if a key is given (selection of a object as a value) 
		if (key) {
			// select the given value object
			var newQxObject = this._objectsArray[index][key];
			// set the new object with a higher index
			this._htmlEmbed.setHtml(this._getHtmlToObject(newQxObject, (index) + 1));
		// if only a index is given (selection wia the back button)
		} else {
			// select the stored object in the array
			var newQxObject = this._objectsArray[index];
			// show the selected array with the current index
			this._htmlEmbed.setHtml(this._getHtmlToObject(newQxObject, index));	
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
	  
	  // if it is not the first object to see
	  if (index > 0) {
	  	// print the back button
	  	returnString += "<div onclick='" + 
							"inspector.Inspector.getInstance().inspectObjectByDomSelecet(" + (index-1) + ")'" + 
					    " style='cursor: pointer; padding: 5px;'> &lt;&lt; Back</div>";
	  }
  
	  // save the object a path array
	  this._objectsArray[index] = qxObject;
	  
	  // go threw all properties of the object
      for (var key in qxObject) {	  	
        // start the table
        returnString += "<div><table width='100%'>";
		// if it is not an object
        if (!(qxObject[key] instanceof Object)) {
          returnString += "<tr><td width='18'></td><td width='30%'><b>" + key + "</b></td>";
          returnString += "<td><span style='color: white; background-color: #999999; border: 1px #666666 solid';>" + null + "</span></td></tr>";

        // if it is an object          
        } else {
		  // print out the objects key          
		  returnString += "<tr>" + 
                            "<td width='18' valign='top'>" + 
                              "<img src='" + qx.io.Alias.getInstance().resolve("inspector/image/open.gif") + "' style='cursor: pointer;' onclick='" + 
                                "inspector.Inspector.getInstance().inspectObjectByDomSelecet(" + index + ", \"" + key + "\")" + 
                              "'>" + 
                            "</td>" + 
                            "<td width='30%' valign='top'>" + 
                              "<b>" + key + "</b>" + 
                            "</td>";
		  // print out the objects value
          returnString += "<td><span style='color: green;'>" + qxObject[key] + "</span></td></tr>";          
        }
	    // end the table 
        returnString += "</table></div>";
      }
      
      return returnString;
    }

  }     
});