qx.Class.define("svg.coords.transform.TransformGroup",
{
  extend : svg.coords.transform.Transformation,
  
  construct : function(svg, matrixMode) {
    this.base(arguments, svg);
    this.initMatrixMode(matrixMode || "expand");
    this.__array = new qx.data.Array();
    this.__array.addListener("change", this.__onArrayChange, this);
  },
  
  properties : 
  {
    matrixMode : {
      nullable: false,
      deferredInit: true,
      check: ["expand", "concat"],
      apply: "_onPropertyChange"
    }
  },
  
  members :
  {
    __array : null,
    
    __onArrayChange : function(event) {
      this._invalidateCache();
      this.fireEvent("change");
    },
    
    __onPropertyChange : function(value, old) {
      this._invalidateCache();
      this.fireEvent("change");
    },
    
    _composeString : function() {
      var str = "";
      
      for (var i=0,j=this.__array.getLength(); i<j; i++) {
        str += this.__array.getItem(i).toString() + " ";
      }
      return qx.lang.String.trim(str);
    },

    _composeMatrix : function() {
      //get matrix object (initialized to the identity matrix)
      var mx = this.getSvg().createMatrix();

      //multiply matrix by each transformation in this group
      for (var i=0,j=this.__array.getLength(); i<j; i++) {
        mx = mx.multiply(this.__array.getItem(i).toMatrix());
      }
      
      //return concatenated matrix
      return mx;
    },
    
    /**
     * Returns the transformation as a matrix string. Depending on the value of
     * the {@link #matrixMode} property, one of the following is returned:
     * 
     * <ul>
     *   <li>
     *     *expand* - returns a list of matrix transformations, for example:
     *     _matrix(a1,b1,c1,d1,e1,f1) matrix(a2,b2,c2,d2,e2,f2)_
     *   </li>
     *   <li>
     *     *concat* - returns a single matrix transformation, which is the
     *     concatenation of all transformations in the TranformGroup.
     *   </li>
     * </ul>
     * 
     * @return {String}
     */
    toMatrixString : function() {
      
      switch (this.getMatrixMode())
      {
        case "expand":
          var str = "";
          for (var i=0,j=this.__array.getLength(); i<j; i++) {
            str += this.__array.getItem(i).toMatrixString() + " ";
          };
          this._asMatrixString = str;
          this._cachedMatrixString = true;
          return qx.lang.String.trim(str);
          
        case "concat":
          var mx = this.toMatrix();
          this._asMatrixString = "matrix("+ mx.a+","+mx.b+","+mx.c+","+mx.d+","+mx.e+","+mx.f+")";
          this._cachedMatrixString = true;
          return this._asMatrixString;
          
        default:
          qx.core.Assert.fail("Default statement should be unreachable.", true);
      }
      
    },
    
    /* *****************************************************
     * Wrappers for qx.data.Array
     ***************************************************** */
    
    contains : function(item) {
      return this.__array.contains(item);
    },
    
    getItem : function(index) {
      return this.__array.getItem(index);
    },
    
    getLength : function() {
      return this.__array.getLength();
    },
    
    indexOf : function(item) {
      return this.__array.indexOf(item);
    },
    
    insertAfter : function(after, item) {
      this.__array.insertAfter(after, item);
    },
    
    insertAt : function(index, item) {
      this.__array.insertAt(index, item);
    },
    
    insertBefore : function(before, item) {
      this.__array.insertBefore(before, item);
    },
    
    pop : function() {
      return this.__array.pop();
    },

    push : function(varargs) {
      this.__array.push.apply(this.__array, arguments);
    },
    
    remove : function(item) {
      return this.__array.remove(item);
    },
    
    removeAll : function() {
      return this.__array.removeAll();
    },
    
    removeAt : function(index) {
      return this.__array.removeAt(index);
    },
    
    reverse : function() {
      this.__array.reverse();
    },
    
    setItem : function(index, item) {
      this.__array.setItem(index, item);
    },
    
    shift : function() {
      return this.__array.shift();
    },
    
    unshift : function() {
      return this.__array.unshift.apply(this.__array, arguments);
    }
   
  },
  
  destruct : function() {
    this._disposeObjects("__array");
  }
  
});