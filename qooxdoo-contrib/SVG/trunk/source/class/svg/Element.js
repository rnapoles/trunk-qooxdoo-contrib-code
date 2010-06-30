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

/**
 * An element that resides in the SVG namespace. Using the correct
 * SVG namespace is required for embedding SVG into XHTML.
 *
 * The namespace used is *http://www.w3.org/2000/svg*.
 */
qx.Class.define("svg.Element",
{
  extend : qx.html.Element,
  
  include : [ svg.struct.MTitleDescription ],


  /**
   * Constructs a new element that resides in the SVG namespace.
   *
   * @param tagName {String}
   *   Tag name of the element to create.
   *
   * @param styles {Map?null}
   *   Optional map of CSS styles, where the key is the name
   *   of the style and the value is the value to use.
   *
   * @param attributes {Map?null}
   *   Optional map of element attributes, where the key is
   *   the name of the attribute and the value is the value to use.
   */
  construct : function(tagName, styles, attributes)
  {
    this.__svgElement = document.createElementNS(svg.Element.SVG_NAMESPACE, tagName);
    this.base(arguments, tagName, styles, attributes);
  },

  statics : { SVG_NAMESPACE : "http://www.w3.org/2000/svg" },

  members :
  {
    __svgElement : null,


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
     * Assigns a unique _name_ to the element.
     *
     * @param name {String} value to set
     * @return {void}
     */
    setId : function(name) {
      this.setAttribute("id", name);
    },


    /**
     * Gets the unique name of the element.
     *
     * @return {String} The unique name of this element.
     */
    getId : function() {
      return this.getAttribute("id");
    }
  },

  destruct : function() {
    this.__svgElement = null;
  }
});