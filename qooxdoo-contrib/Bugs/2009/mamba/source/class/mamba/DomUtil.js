qx.Class.define("mamba.DomUtil",
{
  statics :
  {
    isIE : /MSIE\s+([^\);]+)(\)|;)/.test(navigator.userAgent),


    /**
     * TODOC
     *
     * @param elem {Element} TODOC
     * @return {var} TODOC
     */
    elemHeight : function(elem) {
      return jQuery.boxModel ? elem.innerHeight() : elem.outerHeight();
    },


    /**
     * TODOC
     *
     * @param elem {Element} TODOC
     * @return {var} TODOC
     */
    elemWidth : function(elem) {
      return jQuery.boxModel ? elem.innerWidth() : elem.outerWidth();
    },


    /**
     * TODOC
     *
     * @param elem {Element} TODOC
     * @return {var} TODOC
     */
    elemRelTop : function(elem) {
      return elem[0].offsetTop;
    },


    /**
     * TODOC
     *
     * @param elem {Element} TODOC
     * @return {var} TODOC
     */
    elemRelBottom : function(elem) {
      return this.elemRelTop(elem) + this.elemHeight(elem);
    },


    /**
     * TODOC
     *
     * @param elem {Element} TODOC
     * @return {var} TODOC
     */
    elemAbsTop : function(elem) {
      return elem.offset().top;
    },


    /**
     * TODOC
     *
     * @param elem {Element} TODOC
     * @return {var} TODOC
     */
    elemAbsBottom : function(elem) {
      return this.elemAbsTop(elem) + this.elemHeight(elem);
    },


    /**
     * TODOC
     *
     * @param elem {Element} TODOC
     * @return {var} TODOC
     */
    elemAbsLeft : function(elem) {
      return elem.offset().left;
    },


    /**
     * TODOC
     *
     * @param elem {Element} TODOC
     * @return {var} TODOC
     */
    elemAbsRight : function(elem) {
      return this.elemAbsLeft(elem) + this.elemWidth(elem);
    },


    /**
     * Returns the JSON content of an element's data attribute as map.
     * <p>
     * If the element has no data attribute an empty map will be returned. 
     *
     * @param {Element} elem the element of which to get the data 
     * @return {Map} the element's data
     */
    getElemData: function(elem) {
      var data = elem.getAttribute("data");
      if (data == null | data == "") {
        return {};
      } else {
        return eval("({" + data + "})");
      }
    }
  }
});