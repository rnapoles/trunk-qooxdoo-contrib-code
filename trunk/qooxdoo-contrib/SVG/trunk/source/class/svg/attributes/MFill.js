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
 * Add filling properties to elements that can be filled (which means painting
 * the interior of the object).
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
 * More info:
 * <ul>
 *   <li>http://www.w3.org/TR/SVG11/painting.html</li>
 * </ul>
 */
qx.Mixin.define("svg.attributes.MFill",
{
  members :
  {
    /**
     * The 'fill' property paints the interior of the given graphical element.
     *  The interior is determined according to the rules associated with the
     *  current value of the 'fill-rule' property.
     *
     *  More info: http://www.w3.org/TR/SVG11/painting.html#FillProperties
     *
     *  Example usage:
     *
     *  <pre> myShape.setFill("black");
     *  myShape.setFill("#1044A6");
     *  myShape.setFill("url(#myPattern)");</pre>
     *
     * @param paint {String} the paint to use when filling
     * @return {void}
     */
    setFill : function(paint) {
      this.setAttribute("fill", paint);
    },


    /**
     * Gets the fill property of this element.
     *
     * @return {String} TODOC
     * @see #setFill
     */
    getFill : function() {
      return this.getAttribute("fill");
    },


    /**
     * The 'fill-rule' property indicates the algorithm which is to be used to
     *  determine what parts of the canvas are included inside the shape.
     *
     *  Valid values are:
     *  <ul>
     *    <li>nonzero</li>
     *    <li>evenodd</li>
     *    <li>inherit</li>
     *  </ul>
     *
     *  More info: http://www.w3.org/TR/SVG11/painting.html#FillProperties
     *
     * @param value {String} value to set
     * @return {void}
     */
    setFillRule : function(value) {
      this.setAttribute("fill-rule", value);
    },


    /**
     * Gets the fill-rule property of this element.
     *
     * @return {String} TODOC
     * @see #setFillRule
     */
    getFillRule : function() {
      return this.getAttribute("fill-rule");
    },


    /**
     * Fill Opacity specifies the opacity of the painting operation used to
     *  paint the interior the current object.
     *
     *  See http://www.w3.org/TR/SVG11/render.html#PaintingShapesAndText
     *
     * @param opacityValue {Number} The opacity of the painting operation used to fill the current object.
     *                Any values outside the range 0.0 (fully transparent) to 1.0 (fully opaque)
     *                will be clamped to this range.
     * @return {void}
     */
    setFillOpacity : function(opacityValue) {
      this.setAttribute("fill-opacity", opacityValue);
    },


    /**
     * Gets the fill opacity property of this element.
     *
     * @return {Number} TODOC
     * @see #setFillOpacity
     */
    getFillOpacity : function() {
      return this.getAttribute("fill-opacity");
    }
  }
});