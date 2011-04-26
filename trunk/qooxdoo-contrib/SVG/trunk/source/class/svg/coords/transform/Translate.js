qx.Class.define("svg.coords.transform.Translate",
{
  extend : svg.coords.transform.Transformation,
  
  properties :
  {
    tx : {
      nullable: false,
      deferredInit: true,
      check: "Number",
      apply: "_applyProperty"
    },
    
    ty : {
      nullable: false,
      deferredInit: true,
      check: "Number",
      apply: "_applyProperty"
    }
  },

  construct : function(svg, tx, ty) {
    this.base(arguments, svg);
    this.initTx(tx || 0);
    this.initTy(ty || 0);
  },
  
  members :
  {
    _composeString : function() {
      return "translate(" + this.getTx() + "," + this.getTy() + ")";
    },
    
    _composeMatrix : function() {

      //create matrix object
      var matrix = this.getSvg().createMatrix();

      //create translation matrix
      matrix.a = 1;
      matrix.b = 0;
      matrix.c = 0;
      matrix.d = 1;
      matrix.e = this.getTx();
      matrix.f = this.getTy();
      
      return matrix;
    },
    
    _applyProperty : function() {
      this._invalidateCache();
      this.fireEvent("change");
    }
  }
});