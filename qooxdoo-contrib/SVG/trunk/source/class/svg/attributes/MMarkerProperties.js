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
 * Adds marker properties to shapes and paths that support markers.
 *
 * More info: http://www.w3.org/TR/SVG11/painting.html#MarkerProperties
 */
qx.Mixin.define("svg.attributes.MMarkerProperties",
{
  members :
  {
    /**
     * ‘marker-start’ defines the arrowhead or polymarker that shall be
     * drawn at the first vertex.
     *
     * @param uri {String} value to set
     * @return {void}
     */
    setMarkerStart : function(uri) {
      this.setAttribute("marker-start", uri);
    },


    /**
     * Gets the marker-start property of this element.
     *
     * @return {String} TODOC
     * @see #setMarkerStart
     */
    getMarkerStart : function() {
      return this.getAttribute("marker-start");
    },


    /**
     * ‘marker-mid’ defines the arrowhead or polymarker that shall be drawn
     *  at every other vertex (i.e., every vertex except the first and last).
     *
     * @param uri {String} value to set
     * @return {void}
     */
    setMarkerMid : function(uri) {
      this.setAttribute("marker-mid", uri);
    },


    /**
     * Gets the marker-mid property of this element.
     *
     * @return {String} TODOC
     * @see #setMarkerMid
     */
    getMarkerMid : function() {
      return this.getAttribute("marker-mid");
    },


    /**
     * ‘marker-end’ defines the arrowhead or polymarker that shall be drawn
     *  at the final vertex.
     *
     * @param uri {String} value to set
     * @return {void}
     */
    setMarkerEnd : function(uri) {
      this.setAttribute("marker-end", uri);
    },


    /**
     * Gets the marker-end property of this element.
     *
     * @return {String} TODOC
     * @see #setMarkerEnd
     */
    getMarkerEnd : function() {
      return this.getAttribute("marker-end");
    },


    /**
     * ‘marker’ sets the value for all vertices on the given ‘path’ element or basic
     *  shape. It is a short-hand for the three individual marker properties 'marker-start',
     *  'marker-mid', 'marker-end'.
     *
     * @param uri {String} value to set
     * @return {void}
     */
    setMarker : function(uri) {
      this.setAttribute("marker", uri);
    },


    /**
     * Gets the marker property of this element.
     *
     * @return {String} TODOC
     * @see #setMarker
     */
    getMarker : function() {
      return this.getAttribute("marker");
    }
  }
});