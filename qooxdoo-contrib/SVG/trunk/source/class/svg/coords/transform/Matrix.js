qx.Class.define("svg.coords.transform.Matrix",
{
  extend : svg.coords.transform.Transformation,
  
  properties :
  {
    matrix : {
      nullable: false,
      deferredInit: true,
      apply: "_applyProperty"
    }
  },

  construct : function(matrix) {
    this.initMatrix(matrix);
  },
  
  members :
  {
    _composeString : function() {
      return this.toMatrixString();
    },
    
    _composeMatrix : function() {
      return this.getMatrix();
    },
    
    _applyProperty : function() {
      this._invalidateCache();
      this.fireEvent("change");
    }
  }
});