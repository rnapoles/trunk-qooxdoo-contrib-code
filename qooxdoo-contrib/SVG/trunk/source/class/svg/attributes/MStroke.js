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
 * Adds stroking properties to elements that can be stroked (which means painting
 * along the outline of the object). Stroking can be thought of as a painting
 * operation.
 *
 * With SVG, you can paint (i.e., fill or stroke) with:
 * <ul>
 *   <li>a single color</li>
 *   <li>a solid color with opacity</li>
 *   <li>a gradient (linear or radial)</li>
 *   <li>a pattern (vector or image, possibly tiled)</li>
 *   <li>custom paints available via extensibility</li>
 * </ul>
 *
 * SVG uses the general notion of a paint server. Paint servers are specified
 * using a URI reference on a 'fill' property. Gradients, patterns
 * and solid colors are just specific types of paint servers.
 *
 * More info: http://www.w3.org/TR/SVG11/painting.html
 * Also see: http://www.w3.org/TR/SVG11/painting.html#StrokeProperties
 *
 */
qx.Mixin.define("svg.attributes.MStroke",
{
  members :
  {
    /**
     * The 'stroke' property paints along the outline of the given graphical element.
     *
     * @param paint {String} the paint to use when stroking
     * @return {void}
     */
    setStroke : function(paint) {
      this.setAttribute("stroke", paint);
    },


    /**
     * Gets the stroke property of this element.
     *
     * @return {String} TODOC
     * @see #setStroke
     */
    getStroke : function() {
      return this.getAttribute("stroke");
    },


    /**
     * This property specifies the width of the stroke on the current object.
     *  The value can either be a *length* or a *percentage*.
     *
     *  If a percentage is used, the value represents a percentage of the current
     *  viewport.
     *
     *  A zero value causes no stroke to be painted. A negative value is an error.
     *
     * @param length {Number | Percentage} value to set
     * @return {void}
     */
    setStrokeWidth : function(length) {
      this.setAttribute("stroke-width", length);
    },


    /**
     * Gets the stroke width property of this element.
     *
     * @return {Number} TODOC
     * @see #setStrokeWidth
     */
    getStrokeWidth : function() {
      return this.getAttribute("stroke-width");
    },


    /**
     * Linecap specifies the shape to be used at the end of open subpaths
     *  when they are stroked.
     *
     *  Possible values are:
     *  <ul>
     *    <li>butt (default)</li>
     *    <li>round</li>
     *    <li>square</li>
     *  </ul>
     *
     *  <img src="http://www.w3.org/TR/SVG11/images/painting/linecap.png" />
     *
     * @param value {String} value to set.
     * @return {void}
     */
    setLinecap : function(value) {
      this.setAttribute("stroke-linecap", value);
    },


    /**
     * Gets the linecap property of this element.
     *
     * @return {String} TODOC
     * @see #setLinecap
     */
    getLinecap : function() {
      return this.getAttribute("stroke-linecap");
    },


    /**
     * Linejoin specifies the shape to be used at the corners of paths or basic
     *  shapes when they are stroked.
     *
     *  Possible values are:
     *  <ul>
     *    <li>miter (default)</li>
     *    <li>round</li>
     *    <li>bevel</li>
     *  </ul>
     *
     *  <img src="http://www.w3.org/TR/SVG11/images/painting/linejoin.png" />
     *
     * @param value {String} value to set
     * @return {void}
     */
    setLinejoin : function(value) {
      this.setAttribute("stroke-linejoin", value);
    },


    /**
     * Gets the linejoin property of this element.
     *
     * @return {String} TODOC
     * @see #setLinejoin
     */
    getLinejoin : function() {
      return this.getAttribute("stroke-linejoin");
    },


    /**
     * When two line segments meet at a sharp angle and miter joins have been
     *  specified, it is possible for the miter to extend far beyond the thickness
     *  of the line stroking the path.
     *
     *  A 'miterlimit’ imposes a limit on the ratio of the miter length to the
     *  ‘stroke-width’. When the limit is exceeded, the join is converted from a
     *  miter to a bevel.
     *
     * @param miterlimit {Number} The limit on the ratio of the miter length to the ‘stroke-width’.
     *                The value of must be greater than or equal to 1. Any other value is an error.
     * @return {void}
     */
    setMiterLimit : function(miterlimit) {
      this.setAttribute("stroke-miterlimit", miterlimit);
    },


    /**
     * Gets the MiterLimit property of this element.
     *
     * @return {Number} TODOC
     * @see #setMiterLimit
     */
    getMiterLimit : function() {
      return this.getAttribute("stroke-miterlimit");
    },


    /**
     * DashArray controls the pattern of dashes and gaps used to stroke paths.
     *  It contains a list of comma and/or white space separated lengths
     *  and percentages that specify the lengths of alternating dashes and gaps.
     *
     *  If an odd number of values is provided, then the list of values is repeated
     *  to yield an even number of values. Thus, stroke-dasharray: 5,3,2 is equivalent
     *  to stroke-dasharray: 5,3,2,5,3,2.
     *
     * @param list {String} A list of lengths and percentages. A percentage represents a distance as a
     *                percentage of the current viewport. A negative value is an error. If the
     *                sum of the values is zero, then the stroke is rendered as a solid line.
     * @return {void}
     */
    setDashArray : function(list) {
      this.setAttribute("stroke-dasharray", list);
    },


    /**
     * Gets the DashArray property of this element.
     *
     * @return {String} TODOC
     * @see #setDashArray
     */
    getDashArray : function() {
      return this.getAttribute("stroke-dasharray");
    },


    /**
     * Specifies the distance into the dash pattern to start the dash. If a
     *  percentage is used, the value represents a percentage of the current
     *  viewport. Values can be negative.
     *
     * @param value {Number} value to set
     * @return {void}
     */
    setDashOffset : function(value) {
      this.setAttribute("stroke-dashoffset", value);
    },


    /**
     * Gets the 'dash offset' property of this element.
     *
     * @return {Number} TODOC
     * @see #setDashOffset
     */
    getDashOffset : function() {
      return this.getAttribute("stroke-dashoffset");
    },


    /**
     * Stroke Opacity specifies the opacity of the painting operation used
     *  to stroke the current object.
     *
     *  See http://www.w3.org/TR/SVG11/render.html#PaintingShapesAndText
     *
     * @param opacityValue {Number} The opacity of the painting operation used to stroke the current object.
     *                Any values outside the range 0.0 (fully transparent) to 1.0 (fully opaque)
     *                will be clamped to this range.
     * @return {void}
     */
    setStrokeOpacity : function(opacityValue) {
      this.setAttribute("stroke-opacity", opacityValue);
    },


    /**
     * Gets the fill opacity property of this element.
     *
     * @return {Number} TODOC
     * @see #setStrokeOpacity
     */
    getStrokeOpacity : function() {
      return this.getAttribute("stroke-opacity");
    }
  }
});