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
 * The Line shape.
 *
 * The JSON representation has members type="line", x0, y0, x1, and y1.
 */
qx.Class.define("ssvg.shape.Line",
{
  extend : ssvg.shape.Shape,

  /**
   * @param parent {ssvg.IParent}
   *   The parent object.
   *
   * @param x0 {Integer}
   *   The x coordinate of the initial point of the line.
   *
   * @param y0 {Integer}
   *   The y coordinate of the initial point of the line.
   *
   * @param x1 {Integer}
   *   The x coordinate of the final point of the line.
   *
   * @param y1 {Integer}
   *   The y coordinate of the final point of the line.
   */
  construct : function(parent, x0, y0, x1, y1)
  {
    this.base(arguments, parent, "line");
  }
});
