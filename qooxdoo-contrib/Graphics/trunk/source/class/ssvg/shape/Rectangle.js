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
 * The Rectangle shape.
 *
 * The JSON representation has members type="rect", left, top, width,
 * height, and cornerRadius.
 */
qx.Class.define("ssvg.shape.Rectangle",
{
  extend : ssvg.shape.Shape,

  /**
   * @param parent {ssvg.IParent}
   *   The parent object.
   *
   * @param left {Integer}
   *   The pixel offset from the left edge of this shape to the left edge of
   *   the Viewbox if one is specified, or of this Surface.
   *
   * @param top {Integer}
   *   The pixel offset from the top edge of this shape to the top edge of
   *   the Viewbox if one is specified, or of this Surface.
   *
   * @param width {Integer}
   *   The integer width of the rectangle
   *
   * @param height {Integer}
   *   The integer height of the rectangle
   *
   * @param cornerRadius {Integer}
   *   The integer radius of rounded corners on the rectangle.  Rounded
   *   corners will be drawn if the underlying graphics engine supports
   *   them; otherwise this parameter will be silently assumed to be zero
   *   meaning no rounded corners.
   */
  construct : function(parent, left, top, width, height, cornerRadius)
  {
    this.base(arguments, parent, "rect");
  }
});
