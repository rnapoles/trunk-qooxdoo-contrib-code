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

qx.Class.define("inspector.propertyEditor.Filter", {
  
  extend : qx.core.Object,
  
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */
  statics: {
    // the name of the default category 
    DEFAULT_CATEGORY_NAME: "Rest"
  },

  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  construct : function() {
    // call the constructor of the superclass
    qx.core.Object.call(this);    
    // create the tests array
    this._tests = [];
    // call the function which defines the tests
    this._defineTests();    
    // the same like initializing the filter
    this._createCategories();   
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
    // the data needed to filter
    _categories: null,
    _properties: null,
    _classnames: null,    
    _tests: null,


    /*
    *********************************
       PUBLIC
    *********************************
    */
    /**
     * Sorts in the given property into the filter. For the sorting it 
     * uses the defined test. If no test could be applied, the property 
     * will be put into a default category.
     * @param propertyName {String} The name of the property.
     * @param property {Array} The property array itself.
     * @param classname {String} The name of the properties class.
     */
    sortIn: function(propertyName, property, classname) {
     // go threw all tests
     for (var i = 0; i < this._tests.length; i++) {
         // create a new regexp object to test search for the test string
         var regExp = new RegExp(this._tests[i][0], "i");
         // check if the propertyName matches
         if (regExp.test(propertyName)) {
             var index = this._categories[this._tests[i][1]];
             // sort the property into the fitting property category
             this._properties[index][propertyName] = property;
             this._classnames[index][propertyName] = classname;
             // end processing
             return;
         }           
     }
     // if no category could found, put the property into the default category
     this._properties[this._categories[inspector.propertyEditor.Filter.DEFAULT_CATEGORY_NAME]][propertyName] = property;
     this._classnames[this._categories[inspector.propertyEditor.Filter.DEFAULT_CATEGORY_NAME]][propertyName] = classname;
    }, 
    
    
    /**
     * Returns the resuls as an object containing two array.
     * names: An array containing the names of the categories.
     * props: An array containing the properties of the corresponding categorie.
     * classes: An array containing arrays of classnames coresponding tu the props array.
     * The array beginn with the index 1. The two array cooperate with their indices,
     * e.g. the category[1] contains the category name of the properties found at 
     * position 1 in the properties array.
     *
     * @return {Object} An object containing three array:
     *     categories - An array containing the categories
     *     props      - An array containing arrays of properties
     *     calsses    - An array containing arrays of classnames
     */
    getResult: function() {
     // create a array for the mapping from the named hash to an indexed array
     var categories = [];       
     for (var name in this._categories) {
         categories[this._categories[name]] = name;
     }  
     // return the object
     return {names: categories, props: this._properties, classes: this._classnames};
    }, 
     
     
    /**
     * Empties the filter which menas that the filter can be reused.
     */
    empty: function() {
      // this._createCategories();
      this._createPropertyAndClassnamesArrays();       
    },
    
    
    /*
    *********************************
       PROTECTED
    *********************************
    */
    /**
     * Creates the categories array. Therefore it uses the in 
     * the tests defined categories. Additianally a default category 
     * will be created as last category.
     * The order of the categories depends on the first occurance of the 
     * category name in the tests array.
     */
    _createCategories: function() {
      // initialize the categories array      
      this._categories = [];
      // get the category names out of the tests      
      var i = 1;
      for (var id = 0; id < this._tests.length; id++) {        
        if (this._categories[this._tests[id][1]] == undefined) {
            this._categories[this._tests[id][1]] = i;
            i++;
        }
      }
      // set the category name for the default category
      this._categories[inspector.propertyEditor.Filter.DEFAULT_CATEGORY_NAME] = i;
      // invoke the creation of the property arrays
      this._createPropertyAndClassnamesArrays();
    },
    
    
    /**
     * Dependent on how mutch categories are available this method 
     * creates an properties array for every category. 
     */
    _createPropertyAndClassnamesArrays: function() {
      // initialize the properties array
      this._properties = [];
      // create a temp classnames array
      this._classnames = [];
      // create as much property array as categories are available
      for (var i = 1; i <= this._categories[inspector.propertyEditor.Filter.DEFAULT_CATEGORY_NAME]; i++) {
        this._properties[i] = {};
        this._classnames[i] = [];
      }
    },
    
    
    /**
     * The categories and constraints will be defined in this function.
     * Therefore the function pushes a array containing the test string 
     * and a category name into the tests array. Every array containing 
     * a part of the test string (not case sensitive) will be added to 
     * the corresponding category.  
     * Example:
     * this._test.push(["color", "Colors"]); 
     */
    _defineTests: function() {
      this._tests.push(["align", "Align"]);
      this._tests.push(["margin", "Margins and Spacings"]);
      this._tests.push(["spacing", "Margins and Spacings"]);
      this._tests.push(["padding", "Paddings"]);
      this._tests.push(["clip", "Clippings"]);
      this._tests.push(["color", "Colors"]);
      this._tests.push(["width", "Dimensions"]);
      this._tests.push(["height","Dimensions"]);
      this._tests.push(["left", "Position"]);
      this._tests.push(["right", "Position"]);
      this._tests.push(["top", "Position"]);
      this._tests.push(["position", "Position"]);
      this._tests.push(["bottom", "Position"]);
      this._tests.push(["child", "Child dependent"]);
    }
    
  }
});
