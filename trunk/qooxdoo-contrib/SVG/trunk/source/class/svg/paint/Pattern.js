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
 * A pattern is used to fill or stroke an object using a pre-defined graphic
 * object which can be replicated ("tiled") at fixed intervals in x and y to
 * cover the areas to be painted.
 *
 * More info:
 * <ul>
 *   <li>http://www.w3.org/TR/SVG11/pservers.html#Patterns</li>
 * </ul>
 * 
 */
qx.Class.define("svg.paint.Pattern",
{
  extend : svg.Element,
  
  include : [ svg.attributes.MHref,
              svg.attributes.MPreserveAspectRatio,
              svg.attributes.MViewBox ],


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
    this.base(arguments, "pattern", styles, attributes);
  },

  members :
  {
    /**
     * Defines the coordinate system for attributes ‘x’, ‘y’, ‘width’ and ‘height’.
     *
     *  Possible values are:
     *  <ul>
     *    <li>userSpaceOnUse</li>
     *    <li>objectBoundingBox (default)</li>
     *  </ul>
     *
     * @param value {String} value to set
     * @return {void}
     */
    setPatternUnits : function(value) {
      this.setAttribute("patternUnits", value);
    },


    /**
     * Gets the 'patternUnits' property of this element.
     *
     * @return {String} TODOC
     * @see #setPatternUnits
     */
    getPatternUnits : function() {
      return this.getAttribute("patternUnits");
    },


    /**
     * Defines the coordinate system for the contents of the ‘pattern’.
     *
     *  Possible values are:
     *  <ul>
     *    <li>userSpaceOnUse</li>
     *    <li>objectBoundingBox (default)</li>
     *  </ul>
     *
     * @param value {String} value to set
     * @return {void}
     */
    setContentUnits : function(value) {
      this.setAttribute("patternContentUnits", value);
    },


    /**
     * Gets the 'patternContentUnits' property of this element.
     *
     * @return {String} TODOC
     * @see #setContentUnits
     */
    getContentUnits : function() {
      return this.getAttribute("patternContentUnits");
    },


    /**
     * An optional additional transformation from the pattern coordinate system onto
     *  the target coordinate system (i.e., 'userSpaceOnUse' or 'objectBoundingBox').
     *  This allows for things such as skewing the pattern tiles.
     *
     * @param transformlist {String} See http://www.w3.org/TR/SVG11/coords.html#TransformAttribute for more info.
     * @return {void}
     */
    setPatternTransform : function(transformlist) {
      this.setAttribute("patternTransform", transformlist);
    },


    /**
     * Gets the 'patternTransform' property of this element.
     *
     * @return {String} TODOC
     * @see #setPatternTransform
     */
    getPatternTransform : function() {
      return this.getAttribute("patternTransform");
    },


    /**
     * ‘x’, ‘y’, ‘width’ and ‘height’ indicate how the pattern tiles are placed and
     *  spaced. These attributes represent coordinates and values in the coordinate
     *  space specified by the combination of attributes ‘patternUnits’ and ‘patternTransform’.
     *
     * @param coordinate {Integer} value to set
     * @return {void}
     */
    setX : function(coordinate) {
      this.setAttribute("x", coordinate);
    },


    /**
     * Gets the 'x' attribute.
     *
     * @return {Integer} TODOC
     * @see #setX
     */
    getX : function() {
      return this.getAttribute("x");
    },


    /**
     * ‘x’, ‘y’, ‘width’ and ‘height’ indicate how the pattern tiles are placed and
     *  spaced. These attributes represent coordinates and values in the coordinate
     *  space specified by the combination of attributes ‘patternUnits’ and ‘patternTransform’.
     *
     * @param coordinate {Integer} value to set
     * @return {void}
     */
    setY : function(coordinate) {
      this.setAttribute("y", coordinate);
    },


    /**
     * Gets the 'y' attribute.
     *
     * @return {Integer} TODOC
     * @see #setY
     */
    getY : function() {
      return this.getAttribute("y");
    },


    /**
     * ‘x’, ‘y’, ‘width’ and ‘height’ indicate how the pattern tiles are placed and
     *  spaced. These attributes represent coordinates and values in the coordinate
     *  space specified by the combination of attributes ‘patternUnits’ and ‘patternTransform’.
     *
     *  A negative value is an error. A value of zero disables rendering of the element.
     *
     * @param length {Integer} value to set
     * @return {void}
     */
    setWidth : function(length) {
      this.setAttribute("width", length);
    },


    /**
     * Gets the 'width' attribute.
     *
     * @return {Integer} TODOC
     * @see #setWidth
     */
    getWidth : function() {
      return this.getAttribute("width");
    },


    /**
     * ‘x’, ‘y’, ‘width’ and ‘height’ indicate how the pattern tiles are placed and
     *  spaced. These attributes represent coordinates and values in the coordinate
     *  space specified by the combination of attributes ‘patternUnits’ and ‘patternTransform’.
     *
     *  A negative value is an error. A value of zero disables rendering of the element.
     *
     * @param length {Integer} value to set
     * @return {void}
     */
    setHeight : function(length) {
      this.setAttribute("height", length);
    },


    /**
     * Gets the 'height' attribute.
     *
     * @return {Integer} TODOC
     * @see #setHeight
     */
    getHeight : function() {
      return this.getAttribute("height");
    }

  }
});