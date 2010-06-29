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
 * The 'use' element references another element and includes/draws it
 * at that given point in the document.
 * 
 * Any svg, symbol, group, graphics element or other use element is
 * potentially a template object that can be re-used ("instanced"). 
 *
 * More info: http://www.w3.org/TR/SVG/struct.html#UseElement
 */
qx.Class.define("svg.Use",
{
  extend : svg.Element,
  
  include : [ svg.attributes.MHref ],

  /**
   * @param styles {Map?null}
   *   Optional map of CSS styles, where the key is the name
   *   of the style and the value is the value to use.
   *
   * @param attributes {Map?null}
   *   Optional map of element attributes, where the key is
   *   the name of the attribute and the value is the value to use.
   */
  construct : function(styles, attributes) {
    this.base(arguments, "use", styles, attributes);
  },

  members :
  {
    /**
     * The x-axis coordinate of one corner of the rectangular region into which
     *  the referenced element is placed. If the attribute is not specified, the
     *  effect is as if a value of "0" were specified.
     *
     * @param coordinate {Integer} value to set
     * @return {void}
     */
    setX : function(coordinate) {
      this.setAttribute("x", coordinate);
    },


    /**
     * Gets the x-axis coordinate of the region.
     *
     * @return {Integer} TODOC
     * @see #setX
     */
    getX : function() {
      return this.getAttribute("x");
    },


    /**
     * The y-axis coordinate of one corner of the rectangular region into which
     *  the referenced element is placed. If the attribute is not specified, the
     *  effect is as if a value of "0" were specified.
     *
     * @param coordinate {Integer} value to set
     * @return {void}
     */
    setY : function(coordinate) {
      this.setAttribute("y", coordinate);
    },


    /**
     * Gets the y-axis coordinate of the region.
     *
     * @return {Integer} TODOC
     * @see #setY
     */
    getY : function() {
      return this.getAttribute("y");
    },


    /**
     * The width of the rectangular region into which the referenced element is placed.
     *  A negative value is an error. A value of zero disables rendering of the element.
     *
     * @param length {Integer} value to set
     * @return {void}
     */
    setWidth : function(length) {
      this.setAttribute("width", length);
    },


    /**
     * Gets the width of the region.
     *
     * @return {Integer} TODOC
     * @see #setWidth
     */
    getWidth : function() {
      return this.getAttribute("width");
    },


    /**
     * The height of the rectangular region into which the referenced element is placed.
     *  A negative value is an error. A value of zero disables rendering of the element.
     *
     * @param length {Integer} value to set
     * @return {void}
     */
    setHeight : function(length) {
      this.setAttribute("height", length);
    },


    /**
     * Gets the height of the region.
     *
     * @return {Integer} TODOC
     * @see #setHeight
     */
    getHeight : function() {
      return this.getAttribute("height");
    }

  }
});