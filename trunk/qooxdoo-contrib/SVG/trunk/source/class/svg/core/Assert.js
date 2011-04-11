qx.Class.define("svg.core.Assert", {

  statics :
  {
    /**
     * Assert that the SVG element is part of the document tree at the time that function _funcname_
     * is called.
     */
    assertElementInDocTree : function(element, msg){
      if (!element.inDocumentTree()) {
        msg = msg || "Function cannot be called when SVG element is not in the document tree.";
        qx.core.Assert.fail(msg, true);
      }      
    }
  }
  
});