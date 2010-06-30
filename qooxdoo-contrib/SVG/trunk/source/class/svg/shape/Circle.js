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
 * A circle based on a center point and a radius.
 *
 * More info:
 * <ul>
 *   <li>http://www.w3.org/TR/SVG/shapes.html#CircleElement</li>
 * </ul>
 */
qx.Class.define("svg.shape.Circle",
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
    this.base(arguments, "circle", styles, attributes);
  },

  members :
  {
    /**
     * The x-axis coordinate of the center of the circle. If the attribute is not
     *  specified, the effect is as if a value of "0" were specified.
     *
     * @param coordinate {Integer} value to set
     * @return {void}
     */
    setCx : function(coordinate) {
      this.setAttribute("cx", coordinate);
    },


    /**
     * Gets the x-axis coordinate of the center of the circle.
     *
     * @return {Integer} TODOC
     * @see #setCx
     */
    getCx : function() {
      return this.getAttribute("cx");
    },


    /**
     * The y-axis coordinate of the center of the circle. If the attribute is not
     *  specified, the effect is as if a value of "0" were specified.
     *
     * @param coordinate {Integer} value to set
     * @return {void}
     */
    setCy : function(coordinate) {
      this.setAttribute("cy", coordinate);
    },


    /**
     * Gets the y-axis coordinate of the center of the circle.
     *
     * @return {Integer} TODOC
     * @see #setCy
     */
    getCy : function() {
      return this.getAttribute("cy");
    },


    /**
     * The radius of the circle. A negative value is an error. A value of zero disables
     *  rendering of the element.
     *
     * @param length {Integer} value to set
     * @return {void}
     */
    setRadius : function(length) {
      this.setAttribute("r", length);
    },


    /**
     * Gets the radius of the circle.
     *
     * @return {Integer} TODOC
     * @see #setRadius
     */
    getRadius : function() {
      return this.getAttribute("r");
    }
  }
});