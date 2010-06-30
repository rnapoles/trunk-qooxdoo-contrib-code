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
 * An ellipse based on a center point and two radii.
 * 
 * The ellipse is axis-aligned with the current user coordinate system.
 *
 * More info:
 * <ul>
 *   <li>http://www.w3.org/TR/SVG/shapes.html#EllipseElement</li>
 * </ul>
 */
qx.Class.define("svg.shape.Ellipse",
{
  extend : svg.Element,
  
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
    this.base(arguments, "ellipse", styles, attributes);
  },

  members :
  {
    /**
     * The x-axis coordinate of the center of the ellipse. If the attribute is not
     *  specified, the effect is as if a value of "0" were specified.
     *
     * @param coordinate {Integer} value to set
     * @return {void}
     */
    setCx : function(coordinate) {
      this.setAttribute("cx", coordinate);
    },


    /**
     * Gets the x-axis coordinate of the center of the ellipse.
     *
     * @return {Integer} TODOC
     * @see #setX
     */
    getCx : function() {
      return this.getAttribute("cx");
    },


    /**
     * The y-axis coordinate of the center of the ellipse. If the attribute is not
     *  specified, the effect is as if a value of "0" were specified.
     *
     * @param coordinate {Integer} value to set
     * @return {void}
     */
    setCy : function(coordinate) {
      this.setAttribute("cy", coordinate);
    },


    /**
     * Gets the y-axis coordinate of the center of the ellipse.
     *
     * @return {Integer} TODOC
     * @see #setY
     */
    getCy : function() {
      return this.getAttribute("cy");
    },


    /**
     * The x-axis radius of the ellipse. A negative value is an error. A value of zero
     *  disables rendering of the element.
     *
     * @param length {Integer} value to set
     * @return {void}
     */
    setXradius : function(length) {
      this.setAttribute("rx", length);
    },


    /**
     * Gets the x-axis radius of the ellipse.
     *
     * @return {Integer} TODOC
     * @see #setXradius
     */
    getXradius : function() {
      return this.getAttribute("rx");
    },


    /**
     * The y-axis radius of the ellipse. A negative value is an error. A value of zero
     *  disables rendering of the element.
     *
     * @param length {Integer} value to set
     * @return {void}
     */
    setYradius : function(length) {
      this.setAttribute("ry", length);
    },


    /**
     * Gets the y-axis radius of the ellipse.
     *
     * @return {Integer} TODOC
     * @see #setYradius
     */
    getYradius : function() {
      return this.getAttribute("ry");
    }
  }
});