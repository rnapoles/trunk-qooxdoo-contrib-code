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
 * An SVG document fragment.
 *
 * An SVG document fragment consists of any number of SVG elements contained within
 * an {@link svg.Svg} element.
 *
 * An SVG document fragment can range from an empty fragment (i.e., no content inside
 * of the 'svg' element), to a very simple SVG document fragment containing a single
 * SVG graphics element such as a 'rect', to a complex, deeply nested collection of
 * container elements and graphics elements.
 *
 * 'svg' elements can appear in the middle of SVG content. This is the mechanism by
 * which SVG document fragments can be embedded within other SVG document fragments.
 *
 * Another use for 'svg' elements within the middle of SVG content is to establish a
 * new viewport. (See <a href="http://www.w3.org/TR/SVG11/coords.html#EstablishingANewViewport">
 * Establishing a new viewport</a>.)
 *
 * More info: http://www.w3.org/TR/SVG/struct.html#SVGElement
 */
qx.Class.define("svg.Svg",
{
  extend : svg.Element,
  
  include : [ svg.attributes.MViewBox,
              svg.attributes.MPreserveAspectRatio ],


  /**
   * @param styles {Map?null}
   *   Optional map of CSS styles, where the key is the name
   *   of the style and the value is the value to use.
   *
   * @param attributes {Map?null}
   *   Optional map of element attributes, where the key is
   *   the name of the attribute and the value is the value to use.
   */
  construct : function(styles, attributes)
  {
    attributes = attributes | {};
    attributes["version"] = "1.1";
    attributes["baseProfile"] = "full";
    attributes["xmlns"] = "http://www.w3.org/2000/svg";
    attributes["xmlns:xlink"] = "http://www.w3.org/1999/xlink";
    attributes["xmlns:ev"] = "http://www.w3.org/2001/xml-events";

    this.base(arguments, "svg", styles, attributes);
  },

  members :
  {
    /**
     * The x-axis coordinate of one corner of the rectangular region into which an embedded
     * 'svg' element is placed. If the attribute is not specified, the effect is as if a
     * value of "0" were specified.
     *
     * Has no meaning or effect on outermost 'svg' elements.
     *
     * @param coordinate {Integer} value to set
     * @return {void}
     */
    setX : function(coordinate) {
      this.setAttribute("x", coordinate);
    },


    /**
     * Gets the x-axis coordinate.
     *
     * @return {Integer} TODOC
     * @see #setX
     */
    getX : function() {
      return this.getAttribute("x");
    },


    /**
     * The y-axis coordinate of one corner of the rectangular region into which an embedded
     * 'svg' element is placed. If the attribute is not specified, the effect is as if a
     * value of "0" were specified.
     *
     * Has no meaning or effect on outermost 'svg' elements.
     *
     * @param coordinate {Integer} value to set
     * @return {void}
     */
    setY : function(coordinate) {
      this.setAttribute("y", coordinate);
    },


    /**
     * Gets the y-axis coordinate.
     *
     * @return {Integer} TODOC
     * @see #setY
     */
    getY : function() {
      return this.getAttribute("y");
    },


    /**
     * For outermost 'svg' elements, the intrinsic width of the SVG document fragment.
     * For embedded 'svg' elements, the width of the rectangular region into which the
     * 'svg' element is placed. A negative value is an error. A value of zero disables
     * rendering of the element. If the attribute is not specified, the effect is as
     * if a value of "100%" were specified.
     *
     * @param length {Integer} value to set
     * @return {void}
     */
    setWidth : function(length) {
      this.setAttribute("width", length);
    },


    /**
     * Gets the width.
     *
     * @return {Integer} TODOC
     * @see #setWidth
     */
    getWidth : function() {
      return this.getAttribute("width");
    },


    /**
     * For outermost 'svg' elements, the intrinsic height of the SVG document fragment.
     * For embedded 'svg' elements, the height of the rectangular region into which the
     * 'svg' element is placed. A negative value is an error. A value of zero disables
     * rendering of the element. If the attribute is not specified, the effect is as
     * if a value of "100%" were specified.
     *
     * @param length {Integer} value to set
     * @return {void}
     */
    setHeight : function(length) {
      this.setAttribute("heigth", length);
    },


    /**
     * Gets the height.
     *
     * @return {Integer} TODOC
     * @see #setHeight
     */
    getHeight : function() {
      return this.getAttribute("height");
    }
  }
});