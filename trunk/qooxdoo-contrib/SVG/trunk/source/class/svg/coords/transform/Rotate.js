qx.Class.define("svg.coords.transform.Rotate",
{
  extend : svg.coords.transform.Transformation,
  
  properties :
  {
    /**
     * Rotation angle (in degrees)
     * 
     * @type Number
     */
    angle : {
      nullable: false,
      deferredInit: true,
      check: "Number",
      apply: "_applyProperty"
    },
    
    cx : {
      nullable: false,
      deferredInit: true,
      check: "Number",
      apply: "_applyProperty"
    },
    
    cy : {
      nullable: false,
      deferredInit: true,
      check: "Number",
      apply: "_applyProperty"
    }
  },

  construct : function(svg, angle, cx, cy) {
    this.base(arguments, svg);
    this.initAngle(angle);
    this.initCx(cx || 0);
    this.initCy(cy || 0);
  },
  
  members :
  {
    _composeString : function() {
      var str = "rotate(" + this.getAngle();
      
      if ((0 !== this.getCx()) || (0 !== this.getCy())) {
        str += "," + this.getCx() + "," + this.getCy();
      }
      return str + ")";
    },
    
    _composeMatrix : function() {

      //get angle in rad
      var r = this.getAngle() / 180 * Math.PI;
      
      qx.core.Assert.assertEquals(this.getCx(), 0, "Matrix rotate around point other than origin is not supported (yet).");
      qx.core.Assert.assertEquals(this.getCy() || 0, 0, "Matrix rotate around point other than origin is not supported (yet).");
      
      //create matrix object
      var matrix = this.getSvg().createMatrix();

      //set rotation matrix
      matrix.a = Math.cos(r).toFixed(10);
      matrix.b = Math.sin(r).toFixed(10);
      matrix.c = -1 * Math.sin(r).toFixed(10);
      matrix.d = Math.cos(r).toFixed(10);
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