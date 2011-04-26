qx.Class.define("svg.coords.transform.Skew",
{
  extend : svg.coords.transform.Transformation,
  
  properties :
  {
    angle : {
      nullable: false,
      deferredInit: true,
      check: "Number",
      apply: "_applyProperty"
    },
    
    mode : {
      nullable: false,
      deferredInit: true,
      check: ["x", "y"],
      apply: "_applyProperty"
    }
  },

  construct : function(svg, angle, mode) {
    this.base(arguments, svg);
    this.initAngle(angle);
    this.initMode(mode || "x");
  },
  
  members :
  {
    _composeString : function() {
      
      switch (this.getMode()) {
        case "x":
          return "skewX(" + this.getAngle() + ")";
        case "y":
          return "skewY(" + this.getAngle() + ")";
        default:
          qx.core.Assert.fail("Default statement should be unreachable.", true);
      }
    },

    _composeMatrix : function() {

      //get angle in rad
      var r = this.getAngle() * Math.PI / 180;

      //create matrix object
      var matrix = this.getSvg().createMatrix();
      
      switch (this.getMode()) {
        case "x":
          matrix.a = 1;
          matrix.b = 0;
          matrix.c = Math.tan(r);
          matrix.d = 1;
          matrix.e = 0;
          matrix.f = 0;
          break;
        case "y":
          matrix.a = 1;
          matrix.b = Math.tan(r);
          matrix.c = 0;
          matrix.d = 1;
          matrix.e = 0;
          matrix.f = 0;
          break;
        default:
          qx.core.Assert.fail("Default statement should be unreachable.", true);
      }
      
      return matrix;
    },
    
    _applyProperty : function() {
      this._invalidateCache();
      this.fireEvent("change");
    }
  }
});