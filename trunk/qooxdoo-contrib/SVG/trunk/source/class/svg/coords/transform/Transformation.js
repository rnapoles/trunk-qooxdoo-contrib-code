qx.Class.define("svg.coords.transform.Transformation",
{
  extend : qx.core.Object,
  
  type : "abstract",
    
  events :
  {
    change : "qx.event.type.Event"
  },
  
  construct : function(svg)
  {
    this.__svg = svg || null;
  },
  
  members :
  {
    _asString : null,
    _asMatrix : null,
    _asMatrixString : null,
    _cachedString : false,
    _cachedMatrix : false,
    _cachedMatrixString : false,
    __svg : null,
    
    /**
     * 
     * @param {svg.struct.Svg}
     *   Svg element
     */
    setSvg : function(svg) {
      this.__svg = svg;
    },
    
    getSvg : function() {
      if (qx.core.Environment.get("qx.debug")) {
        qx.core.Assert.assertNotNull(this.__svg, "Operation requires that the transformation has access to an SVG object.");
      }
      
      return this.__svg;
    },
    
    /**
     * Creates a string that describes the transformation.
     * This string can be used in the _transform_ attribute
     * of elements.
     * 
     * @return {String}
     */
    toString : function() {
      if (!this._cachedString) {
        this._asString = this._composeString();
        this._cachedString = true;
      }
      return this._asString;
    },

    /**
     * Creates the SVG matrix that describes this transformation.
     * 
     * @return {SVGMatrix}
     */
    toMatrix : function() {
      if (!this.__cachedMatrix) {
        this._asMatrix = this._composeMatrix();
        this._cachedMatrix = true;
      }
      return this._asMatrix;
    },
    
    /**
     * Creates a string that describes the transformation.
     * The string will use the Matrix notation, i.e. <code>matrix(a,b,c,d,e,f)</code>.
     * 
     * @return {String}
     */
    toMatrixString : function() {
      
      if (!this.__cachedMatrixString) {
        var mx = this.toMatrix();
        this._asMatrixString = "matrix("+ mx.a+","+mx.b+","+mx.c+","+mx.d+","+mx.e+","+mx.f+")";
        this._cachedMatrixString = true;
      }
      return this._asMatrixString;
    },
    
    _invalidateCache : function() {
      this._cachedString = false;
      this._cachedMatrix = false;
      this._cachedMatrixString = false;
    },
    
    /**
     * @abstract
     */
    _composeString : function() {
      qx.core.Assert.fail("_composeString must be overridden in child classes.", true);
    },
    
    /**
     * @abstract
     */
    _composeMatrix : function() {
      qx.core.Assert.fail("_composeMatrix must be overridden in child classes.", true);
    }
  }
});