/* ************************************************************************

   Copyright:
     2010  Marc Puts

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Marc Puts (marcputs)

************************************************************************ */
/*
#require(svg.core.Types)
*/

/**
 * An element that resides in the SVG namespace. Using the correct
 * SVG namespace is required for embedding SVG into XHTML.
 *
 * The namespace used is *http://www.w3.org/2000/svg*.
 */
qx.Class.define("svg.core.Element",
{
  extend : qx.html.Element,
  
  include : [ svg.core.MTitleDescription ],


  /**
   * @param tagName {String}
   *   Tag name of the element to create.
   */
  construct : function(tagName)
  {
    this.__svgElement = document.createElementNS(svg.core.Element.SVG_NAMESPACE, tagName);
    this.base(arguments, tagName);
  },

  statics : {
  	SVG_NAMESPACE : "http://www.w3.org/2000/svg"
  },
  
  properties :
  {
  	/**
  	 * Unique name for this element.
  	 */
  	id : {
      nullable: true,
      init: null,
      apply: "_applyId",
      check: "String",
      event: "changeId"
    }
  },

  members :
  {
    __svgElement : null,

    //applies id
    _applyId : function(value, old) {
		  if (null == value) {
		  	this.removeAttribute("id");
		  } else {
        this.setAttribute("id", value);
		  }
		},

    /**
     * Internal helper to generate the DOM element
     * *override*
     *
     * @return {var} TODOC
     */
    _createDomElement : function() {
      return this.__svgElement;
    },

    /**
     * Returns the DOM element. Please use this with caution.
     * It is better to make all changes to the object itself using the public
     * API rather than to the underlying DOM element.
     *
     * *override*
     *
     * @return {Element} The DOM element node
     */
    getDomElement : function() {
      return this.__svgElement;
    },
    
    /**
     * Gets an Uri reference to this element. An {@link #id} must have been set for this.
     * 
     * Returns _null_ if no id is set. 
     * 
     * @return {String}
     *   an uri reference, i.e.  
     */
    getUri : function () {
    	var id = this.getId();
    	
    	if (null == id) {
        if ((qx.core.Environment.get("qx.debug"))) {
    		  this.warn("Can't create uri reference; id is null.");
    	  }
    		return null;
    	}
  		return "url(#" + id + ")"; 
    }

  },

  destruct : function() {
    this.__svgElement = null;
  }
});