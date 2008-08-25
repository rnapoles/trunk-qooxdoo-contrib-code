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
 * The Group pseudo-shape.
 *
 * A group contains other shapes, and can provide a grouping for
 * transformations; i.e. all shapes in the group (including recursively into
 * groups embedded in the group) are transformed as specified for the group.
 * If there are sub-groups, they may have their own transformations, which are
 * applied subsequent to higher level transformations.
 *
 * The JSON representation has members type="path" and 'path' (see the
 * constructor parameter description of the same name).
 */
qx.Class.define("ssvg.shape.Group",
{
  extend : ssvg.shape.Shape,

  /**
   * @param parent {ssvg.shape.Group|null}
   *   The parent object, or null for the top-level parent.
   */
  construct : function(parent)
  {
    this.base(arguments, parent, "group");
  },

  members :
  {
    __children : {},

    add : function(shape)
    {
      // Remove this shape from its current parent
      var parent = shape.getParent()
      if (parent)
      {
        parent.remove(shape);
      }

      // Add this shape to its parent
      this.__children[shape.toHashCode()] = shape;

      // Ensure this shape knows who its parent is
      shape.setParent(this);
    },

    remove : function(shape)
    {
      // Rmemove the shape from our children list
      delete this.__children[shape.toHashCode()];

      // This shape is now an orphan
      shape.setParent(null);
    },

    /**
     * The Ellipse shape.
     *
     * The JSON representation has members type="ellipse", xCenter, yCenter,
     * and xRadius, yRadius.
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
    createEllipse : function(xCenter, yCenter, xRadius, yRadius)
    {
      return new ssvg.shape.Ellipse(this,
                                    xCenter, yCenter,
                                    xRadius, yRadius);
    },

    /**
     * The Line shape.
     *
     * The JSON representation has members type="line", x0, y0, x1, and y1.
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
    createLine : function(x0, y0, x1, y1)
    {
      return new ssvg.shape.Line(this, x0, y0, x1, y1);
    },

    /**
     * The Path shape which can produce any shape desired.
     *
     * The JSON representation has members type="path" and 'path' (see the
     * constructor parameter description of the same name).
     *
     * @param path {String}
     *   A path is described using the
     *   <a href="http://www.w3.org/TR/SVG/paths.html#PathData">
     *   SVG path language</a>.
     */
    createPath : function(path)
    {
      return new ssvg.shape.Path(this, path);
    },

    /**
     * The Polyline shape.
     *
     * A polyline is a series of connected line segments.  The first and last
     * points are not closed automatically.  Changing the Polyline into a
     * Polygon is left as an exercise for the reader.
     *
     * The JSON representation has members type="polyline" and points.  The
     * latter must be an array of "points" where each "point" is an array of
     * two elements in the order [x, y].
     *
     * @param points {Array}
     *   Each element of this array is a point.  A point is itself an array of
     *   two elements, in the order [x, y].
     */
    createPolyline: function(points)
    {
      return new ssvg.shape.Polyline(this, points);
    },

    /**
     * The Rectangle shape.
     *
     * The JSON representation has members type="rect", left, top, width,
     * height, and cornerRadius.
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
    createRectangle : function(left, top, width, height, cornerRadius)
    {
      return new ssvg.shape.Rectangle(this,
                                      left, top,
                                      width, height,
                                      cornerRadius);
    },

    /**
     * The Text shape.
     *
     * The JSON representation has members type="text", x, y, and text.
     *
     * @param x {Integer}
     *   The x coordinate of the top-left corner of the text bounding
     *   rectangle. 
     *
     * @param y {Integer}
     *   The y coordinate of the top-left corner of the text bounding
     *   rectangle. 
     *
     * @param text {String}
     *   The text to be rendered.
     */
    createText : function(x, y, text)
    {
      return new ssvg.shape.Text(this, x, y, text);
    },

    /**
     * An arbitrary shape, by JSON description.
     *
     * @param jsonDescription {String}
     *   A JSON string describing the (possibly recursive) shape.
     */
    createShape : function(jsonDescription)
    {
      return ssvg.shape.Shape.fromJson(this, jsonDescription);
    }
  }
});
