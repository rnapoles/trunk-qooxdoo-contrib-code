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
 * Paths represent the outline of a shape which can be filled, stroked, used
 * as a clipping path, or any combination of the three.
 *
 * More info: http://www.w3.org/TR/SVG11/paths.html
 */
qx.Class.define("svg.Path",
{
  extend : svg.Element,
  
  include : [ svg.attributes.MFill,
              svg.attributes.MStroke,
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
    this.base(arguments, "path", styles, attributes);
  },

  members :
  {
    /**
     * The definition of the outline of a shape.
     *
     *  More info: http://www.w3.org/TR/SVG11/paths.html#PathData
     *
     * @param d {String | svg.util.PathData} value to set
     * @return {void}
     */
    setPathData : function(d)
    {
      if (d instanceof svg.util.PathData) {
        this.setAttribute("d", d.toString());
      } else {
        this.setAttribute("d", d);
      }
    },


    /**
     * Gets the path data attribute of this element.
     *
     * @return {String} TODOC
     * @see #setPathData
     */
    getPathData : function() {
      return this.getAttribute("d");
    },


    /**
     * The author's computation of the total length of the path, in user units.
     *  This value is used to calibrate the user agent's own distance-along-a-path
     *  calculations with that of the author.
     *
     *  A negative value is an error (see Error processing).
     *
     *  More info: http://www.w3.org/TR/SVG11/paths.html#PathLengthAttribute
     *
     * @param length {Number} value to set
     * @return {void}
     */
    setPathLength : function(length) {
      this.setAttribute("pathLength", length);
    },


    /**
     * Gets the path length attribute of this element.
     *
     * @return {Number} TODOC
     * @see #setPathLength
     */
    getPathLength : function() {
      return this.getAttribute("pathLength");
    }
  }
});