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
 * This class is a implementation of the {@link inspector.PropertyEditor.IFilter} 
 * interface.
 * 
 * It sorts / filters the added properties into a predefined order. This 
 * order is defined in the {@link #_defineTests} method.
 * 
 * If you want you own order with own categories and filter rules, take this class 
 * as a base class and override the method used to define the tests and define your 
 * own tests. The categories and all other needed stuff will be created automatically.
 */
qx.Class.define("inspector.propertyEditor.Filter", {
  
  extend : qx.core.Object,
  implement : inspector.propertyEditor.IFilter,
  

  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */
  statics: {
    /**
     * The name of the default category.
     */ 
    DEFAULT_CATEGORY_NAME: "Rest"
  },

  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  /**
   * Creates an instance of the filter. This includes creating 
   * test ({@link #_defineTests}) and categories ({@link #_createCategories}) 
   * used to sort the properties.
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
     * uses the defined test ({@link #_defineTests}). If no test could be 
     * applied, the property will be put into a default category 
     * ({@link #DEFAULT_CATEGORY_NAME}).
     * @param propertyName {String} The name of the property.
     * @param property {Map} The property array itself.
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
     * Returns the result as an object containing three array.
     * <li>names: An array containing the names of the 
     * categories ({@link #_createCategories}).</li>
     * <li>props: An array containing the properties of the corresponding category.</li>
     * <li>classes: An array containing arrays of classnames corresponding to the props array.</li>
     * The array begins with the index 1. The three array cooperate with their indices,
     * e.g. the <code>category[1]</code> contains the category name of the properties 
     * found at position 1 in the properties array.
     *
     * @return {Object} An object containing three array:
     *     <li>categories - An array containing the categories</li>
     *     <li>props      - An array containing arrays of properties</li>
     *     <li>classes    - An array containing arrays of classnames</li>
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
     * Empties the filter which means that the filter can be reused.
     * This includes creating a new properties and categories cache.
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
     * the {@link #_defineTests} defined categories. Additionally a 
     * default category will be created as last category.
     * The order of the categories depends on the first occurrence of the 
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
      this.__createPropertyAndClassnamesArrays();
    },
    
    
    /**
     * Dependent on how much categories are available this method 
     * creates an properties array for every category. 
     */
    __createPropertyAndClassnamesArrays: function() {
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
     * The categories and constraints will be defined in this method.
     * Therefore the function pushes a array containing the test string 
     * and a category name into the tests array. Every array containing 
     * a part of the test string (not case sensitive) will be added to 
     * the corresponding category.  
     * Example:<br>
     * <code>this._test.push(["color", "Colors"]);</code>
     * The defined tests are:
     * <pre class='javascript'>
     * this._tests.push(["align", "Align"]);
     * this._tests.push(["margin", "Margins and Spacings"]);
     * this._tests.push(["spacing", "Margins and Spacings"]);
     * this._tests.push(["padding", "Paddings"]);
     * this._tests.push(["clip", "Clippings"]);
     * this._tests.push(["color", "Colors"]);
     * this._tests.push(["width", "Dimensions"]);
     * this._tests.push(["height","Dimensions"]);
     * this._tests.push(["left", "Position"]);
     * this._tests.push(["right", "Position"]);
     * this._tests.push(["top", "Position"]);
     * this._tests.push(["position", "Position"]);
     * this._tests.push(["bottom", "Position"]);
     * this._tests.push(["child", "Child dependent"]);
     * </pre>
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
    
  },
  
  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */
  destruct : function() {
    this._disposeFields("_tests", "_categories", "_properties", "_classnames");
  }
});
