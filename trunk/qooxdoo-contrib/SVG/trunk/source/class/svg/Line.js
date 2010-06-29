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
 * A line segment that starts at one point and ends at another.
 *
 * More info: http://www.w3.org/TR/SVG/shapes.html#LineElement
 */
qx.Class.define("svg.Line",
{
  extend : svg.Element,
  
  include : [ svg.attributes.MFill,
              svg.attributes.MStroke,
              svg.attributes.MTransform,
              svg.attributes.MMarkerProperties ],


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
    this.base(arguments, "line", styles, attributes);
  },

  members :
  {
    /**
     * The x-axis coordinate of the start of the line. If the attribute is not
     *  specified, the effect is as if a value of "0" were specified.
     *
     * @param coordinate {Integer} value to set
     * @return {void}
     */
    setX1 : function(coordinate) {
      this.setAttribute("x1", coordinate);
    },


    /**
     * Gets the x-axis coordinate of the start of the line.
     *
     * @return {Integer} TODOC
     * @see #setX1
     */
    getX1 : function() {
      return this.getAttribute("x1");
    },


    /**
     * The y-axis coordinate of the start of the line. If the attribute is not
     *  specified, the effect is as if a value of "0" were specified.
     *
     * @param coordinate {Integer} value to set
     * @return {void}
     */
    setY1 : function(coordinate) {
      this.setAttribute("y1", coordinate);
    },


    /**
     * Gets the y-axis coordinate of the start of the line.
     *
     * @return {Integer} TODOC
     * @see #setY1
     */
    getY1 : function() {
      return this.getAttribute("y1");
    },


    /**
     * The x-axis coordinate of the end of the line. If the attribute is not
     *  specified, the effect is as if a value of "0" were specified.
     *
     * @param coordinate {Integer} value to set
     * @return {void}
     */
    setX2 : function(coordinate) {
      this.setAttribute("x2", coordinate);
    },


    /**
     * Gets the x-axis coordinate of the end of the line.
     *
     * @return {Integer} TODOC
     * @see #setX2
     */
    getX2 : function() {
      return this.getAttribute("x2");
    },


    /**
     * The y-axis coordinate of the end of the line. If the attribute is not
     *  specified, the effect is as if a value of "0" were specified.
     *
     * @param coordinate {Integer} value to set
     * @return {void}
     */
    setY2 : function(coordinate) {
      this.setAttribute("y2", coordinate);
    },


    /**
     * Gets the y-axis coordinate of the end of the line.
     *
     * @return {Integer} TODOC
     * @see #setY2
     */
    getY2 : function() {
      return this.getAttribute("y2");
    }
  }
});