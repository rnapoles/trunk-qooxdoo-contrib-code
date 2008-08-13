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
 * The Ellipse shape.
 *
 * The JSON representation has members type="ellipse", xCenter, yCenter, and
 * xRadius, yRadius.
 */
qx.Class.define("ssvg.shape.Ellipse",
{
  extend : ssvg.shape.Shape,

  /**
   * @param parent {ssvg.IParent}
   *   The parent object.
   *
   * @param xCenter {Integer}
   *   The x coordinate of the center of the ellipse.
   *
   * @param yCenter {Integer}
   *   The y coordinate of the center of the ellipse.
   *
   * @param xRadius {Integer}
   *   The radius of the ellipse along the x axis.
   *
   * @param yRadius {Integer}
   *   The radius of the ellipse along the y axis.
   */
  construct : function(parent, xCenter, yCenter, xRadius, yRadius)
  {
    this.base(arguments, parent, "ellipse");
  }
});
