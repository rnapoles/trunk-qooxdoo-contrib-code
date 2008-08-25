/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2008 Derrell Lipman

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Derrell Lipman (derrell)

************************************************************************ */

/**
 * The Polyline shape.
 *
 * A polyline is a series of connected line segments.  The first and last
 * points are not closed automatically.  Changing the Polyline into a Polygon
 * is left as an exercise for the reader.
 *
 * The JSON representation has members type="polyline" and points.  The latter
 * must be an array of "points" where each "point" is an array of two elements
 * in the order [x, y].
 */
qx.Class.define("ssvg.shape.Polyline",
{
  extend : ssvg.shape.Shape,

  /**
   * @param parent {ssvg.IParent}
   *   The parent object.
   *
   * @param points {Array}
   *   Each element of this array is a point.  A point is itself an array of
   *   two elements, in the order [x, y].
   */
  construct : function(parent, points)
  {
    this.base(arguments, parent, "polyline");
  }
});
