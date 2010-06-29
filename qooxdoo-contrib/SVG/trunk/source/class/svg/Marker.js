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
 * A marker is a symbol which can be attached to one or more vertices of {@link Path},
 * {@link Line}, {@link Polyline} or {@link Polygon} elements. Typically, markers
 * are used to make arrowheads or polymarkers.
 * 
 * To indicate that a particular ‘marker’ element should be rendered at the
 * vertices of a particular element, set one or more marker properties
 * to reference the marker element.
 * 
 * @see svg.attributes.MMarkerProperties 
 *
 * More info: http://www.w3.org/TR/SVG11/painting.html#Markers
 */
qx.Class.define("svg.Marker",
{
  extend : svg.Element,
  
  include : [ svg.attributes.MFill,
              svg.attributes.MStroke,
              svg.attributes.MTransform,
              svg.attributes.MViewBox,
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
  construct : function(styles, attributes) {
    this.base(arguments, "marker", styles, attributes);
  },

  members :
  {
    /**
     * Defines the coordinate system for attributes ‘markerWidth’, ‘markerHeight’
     *  and the contents of the ‘marker’.
     *
     *  Possible values are:
     *  <ul>
     *    <li>strokeWidth</li>
     *    <li>userSpaceOnUse</li>
     *  </ul>
     *
     *  More info: http://www.w3.org/TR/SVG11/painting.html#MarkerUnitsAttribute
     *
     * @param markerunits {String} value to set
     * @return {void}
     */
    setMarkerUnits : function(markerunits) {
      this.setAttribute("markerUnits", markerunits);
    },


    /**
     * Gets the markerUnits property of this element.
     *
     * @return {String} TODOC
     * @see #setMarkerUnits
     */
    getMarkerUnits : function() {
      return this.getAttribute("markerUnits");
    },


    /**
     * The x-axis coordinate of the reference point which is to be aligned exactly
     *  at the marker position. The coordinate is defined in the coordinate system
     *  after application of the ‘viewBox’ and ‘preserveAspectRatio’ attributes.
     *  If the attribute is not specified, the effect is as if a value of "0" were
     *  specified.
     *
     * @param coordinate {Number} value to set
     * @return {void}
     */
    setRefX : function(coordinate) {
      this.setAttribute("refX", coordinate);
    },


    /**
     * Gets the refX property of this element.
     *
     * @return {Number} TODOC
     * @see #setRefX
     */
    getRefX : function() {
      return this.getAttribute("refX");
    },


    /**
     * The y-axis coordinate of the reference point which is to be aligned exactly
     *  at the marker position. The coordinate is defined in the coordinate system
     *  after application of the ‘viewBox’ and ‘preserveAspectRatio’ attributes.
     *  If the attribute is not specified, the effect is as if a value of "0" were
     *  specified.
     *
     * @param coordinate {Number} value to set
     * @return {void}
     */
    setRefY : function(coordinate) {
      this.setAttribute("refY", coordinate);
    },


    /**
     * Gets the refY property of this element.
     *
     * @return {Number} TODOC
     * @see #setRefY
     */
    getRefY : function() {
      return this.getAttribute("refY");
    },


    /**
     * Represents the width of the viewport into which the marker is to be fitted
     *  when it is rendered.
     *
     *  A negative value is an error.
     *  A value of zero disables rendering of the element.
     *  If unspecified, the effect is as if a value of "3" were specified.
     *
     * @param length {Number} value to set
     * @return {void}
     */
    setMarkerWidth : function(length) {
      this.setAttribute("markerWidth", length);
    },


    /**
     * Gets the markerWidth property of this element.
     *
     * @return {var} TODOC
     * @see #setMarkerWidth
     */
    getMarkerWidth : function() {
      return this.getAttribute("markerWidth");
    },


    /**
     * Represents the height of the viewport into which the marker is to be fitted
     *  when it is rendered.
     *
     *  A negative value is an error.
     *  A value of zero disables rendering of the element.
     *  If unspecified, the effect is as if a value of "3" were specified.
     *
     * @param length {Number} value to set
     * @return {void}
     */
    setMarkerHeight : function(length) {
      this.setAttribute("markerHeight", length);
    },


    /**
     * Gets the markerHeight property of this element.
     *
     * @return {Number} TODOC
     * @see #setMarkerHeight
     */
    getMarkerHeight : function() {
      return this.getAttribute("markerHeight");
    },


    /**
     * Indicates how the marker is rotated.
     *
     *  Possible values are:
     *  <ul>
     *    <li>auto</li>
     *    <li>&lt;angle&rt;</li>
     *  </ul>
     *
     *  More info: http://www.w3.org/TR/SVG11/painting.html#OrientAttribute
     *
     * @param orient {String} value to set
     * @return {void}
     */
    setOrient : function(orient) {
      this.setAttribute("orient", orient);
    },


    /**
     * Gets the 'orient' property of this element.
     *
     * @return {String} TODOC
     * @see #setOrient
     */
    getOrient : function() {
      return this.getAttribute("orient");
    }
  }
});