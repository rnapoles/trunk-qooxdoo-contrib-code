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
 * A closed shape consisting of a set of connected straight line segments.
 *
 * More info:
 * <ul>
 *   <li>http://www.w3.org/TR/SVG/shapes.html#PolygonElement</li>
 * </ul>
 */
qx.Class.define("svg.shape.Polygon",
{
  extend : svg.core.Element,
  
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
    this.base(arguments, "polygon", styles, attributes);
  },

  members :
  {
    /**
     * The points that make up the polygon. All coordinate values are in the
     *  user coordinate system.
     *
     *  More info: http://www.w3.org/TR/SVG11/shapes.html#PointsBNF
     *
     * @param listOfPoints {String} value to set
     * @return {void}
     */
    setPoints : function(listOfPoints) {
      this.setAttribute("points", listOfPoints);
    },


    /**
     * Gets the list of points that make up the polygon.
     *
     * @return {String} TODOC
     * @see #setPoints
     */
    getPoints : function() {
      return this.getAttribute("points");
    }
  }
});