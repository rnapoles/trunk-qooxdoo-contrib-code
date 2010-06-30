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
 * A rectangle. Rounded rectangles can be achieved by setting appropriate values
 * for attributes rx and ry.
 *
 * More info:
 * <ul>
 *   <li>http://www.w3.org/TR/SVG/shapes.html#RectElement</li>
 * </ul>
 */
qx.Class.define("svg.shape.Rect",
{
  extend : svg.core.Element,
  
  include : [ svg.attributes.MFill,
              svg.attributes.MStroke,
              svg.attributes.MTransform ],


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
    this.base(arguments, "rect", styles, attributes);
  },

  members :
  {
    /**
     * The x-axis coordinate of the side of the rectangle which has the smaller x-axis
     *  coordinate value in the current user coordinate system. If the attribute is not
     *  specified, the effect is as if a value of "0" were specified.
     *
     * @param coordinate {Integer} value to set
     * @return {void}
     */
    setX : function(coordinate) {
      this.setAttribute("x", coordinate);
    },


    /**
     * Gets the x-axis coordinate of the rectangle.
     *
     * @return {Integer} TODOC
     * @see #setX
     */
    getX : function() {
      return this.getAttribute("x");
    },


    /**
     * The y-axis coordinate of the side of the rectangle which has the smaller y-axis
     *  coordinate value in the current user coordinate system. If the attribute is not
     *  specified, the effect is as if a value of "0" were specified.
     *
     * @param coordinate {Integer} value to set
     * @return {void}
     */
    setY : function(coordinate) {
      this.setAttribute("y", coordinate);
    },


    /**
     * Gets the y-axis coordinate of the rectangle.
     *
     * @return {Integer} TODOC
     * @see #setY
     */
    getY : function() {
      return this.getAttribute("y");
    },


    /**
     * The width of the rectangle. A negative value is an error. A value of zero disables
     *  rendering of the element.
     *
     * @param length {Integer} value to set
     * @return {void}
     */
    setWidth : function(length) {
      this.setAttribute("width", length);
    },


    /**
     * Gets the width of the rectangle.
     *
     * @return {Integer} TODOC
     * @see #setWidth
     */
    getWidth : function() {
      return this.getAttribute("width");
    },


    /**
     * The height of the rectangle. A negative value is an error. A value of zero disables
     *  rendering of the element.
     *
     * @param length {Integer} value to set
     * @return {void}
     */
    setHeight : function(length) {
      this.setAttribute("height", length);
    },


    /**
     * Gets the height of the rectangle.
     *
     * @return {Integer} TODOC
     * @see #setHeight
     */
    getHeight : function() {
      return this.getAttribute("height");
    },


    /**
     * For rounded rectangles, the x-axis radius of the ellipse used to round off the
     *  corners of the rectangle. A negative value is an error.
     *
     *  See http://www.w3.org/TR/SVG/shapes.html#RectElement about what happens
     *  if the attribute is not specified.
     *
     * @param length {Integer} value to set
     * @return {void}
     */
    setRx : function(length) {
      this.setAttribute("rx", length);
    },


    /**
     * Gets x-axis radius of the round off corner of the rectangle.
     *
     * @return {Integer} TODOC
     * @see #setRx
     */
    getRx : function() {
      return this.getAttribute("rx");
    },


    /**
     * For rounded rectangles, the y-axis radius of the ellipse used to round off the
     *  corners of the rectangle. A negative value is an error.
     *
     *  See http://www.w3.org/TR/SVG/shapes.html#RectElement about what happens
     *  if the attribute is not specified.
     *
     * @param length {Integer} value to set
     * @return {void}
     */
    setRy : function(length) {
      this.setAttribute("ry", length);
    },


    /**
     * Gets y-axis radius of the round off corner of the rectangle.
     *
     * @return {Integer} TODOC
     * @see #setRy
     */
    getRy : function() {
      return this.getAttribute("ry");
    }
  }
});