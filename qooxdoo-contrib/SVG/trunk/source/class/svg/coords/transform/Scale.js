qx.Class.define("svg.coords.transform.Scale",
{
  extend : svg.coords.transform.Transformation,
  
  properties :
  {
    xFactor : {
      nullable: false,
      deferredInit: true,
      check: "Number",
      apply: "_applyProperty"
    },
    
    /**
     * Specifies the y-scale factor. If set to null, it will
     * be equal to the x-scale factor.
     * 
     * @type {Number}
     */
    yFactor : {
      nullable: true,
      deferredInit: true,
      check: "Number",
      apply: "_applyProperty"
    }
  },

  construct : function(svg, xFactor, yFactor) {
    this.base(arguments, svg);
    this.initXFactor(xFactor || 0);
    this.initYFactor(yFactor || null);
  },
  
  members :
  {
    _composeString : function() {
      var str = "scale(" + this.getXFactor();
      str += null !== this.getYFactor() ? "," + this.getYFactor() : ""; 
      return str + ")";
    },
    
    _composeMatrix : function() {
      
      //create matrix object
      var matrix = this.getSvg().createMatrix();
      
      //set scale matrix
      matrix.a = this.getXFactor();
      matrix.b = 0;
      matrix.c = 0;
      matrix.d = this.getYFactor() || this.getXFactor();
      matrix.e = 0;
      matrix.f = 0;
      
      return matrix;
    },
    
    _applyProperty : function() {
      this._invalidateCache();
      this.fireEvent("change");
    }
  }
});