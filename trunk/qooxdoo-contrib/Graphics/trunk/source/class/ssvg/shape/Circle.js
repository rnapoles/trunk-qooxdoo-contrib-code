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
 * The Circle shape.  This is an alias for an Ellipse with equal radii.
 *
 * The JSON representation has members type="circle", xCenter, yCenter, and
 * radius.
 */
qx.Class.define("ssvg.shape.Circle",
{
  extend : ssvg.shape.Ellipse,

  /**
   * @param parent {ssvg.IParent}
   *   The parent object.
   *
   * @param xCenter
   *   The x coordinate of the center of the circle
   *
   * @param yCenter
   *   The y coordinate of the center of the circle
   *
   * @param radius
   *   The radius of the circle
   *
   */
  construct : function(parent, xCenter, yCenter, radius)
  {
    this.base(parent, xCenter, yCenter, radius, radius);
  }
});
