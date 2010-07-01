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
 * It is often desirable to specify that a given set of graphics stretch to fit a
 * particular container element. The _viewBox_ attribute provides this capability.
 *
 * The value of the viewBox attribute is a list of four numbers _min-x_, _min-y_, _width_ and
 * _height_, separated by whitespace and/or a comma, which specify a rectangle in user
 * space which should be mapped to the bounds of the viewport established by the given
 * element, taking into account attribute preserveAspectRatio. If specified, an
 * additional transformation is applied to all descendants of the given element to achieve
 * the specified effect.
 *
 * More info:
 * <ul>
 *   <li>http://www.w3.org/TR/SVG11/coords.html#ViewBoxAttribute</li>
 * </ul>
 */
qx.Mixin.define("svg.attributes.MViewBox",
{
  members :
  {
    /**
     * Specify the rectangle in user space which should be mapped to the bounds of the
     *  viewport established by this element, taking into account attribute
     *
     * @param minX {Integer} min-x of the viewbox rectangle
     * @param minY {Integer} min-y of the viewbox rectangle
     * @param width {Integer} Width of the viewbox rectangle. A negative value is an error. A value of zero
     *                disables rendering of the element.
     * @param height {Integer} Height of the viewbox rectangle. A negative value is an error. A value of zero
     *                disables rendering of the element.
     * @return {void}
     */
    setViewBox : function(minX, minY, width, height) {
	    if (null == minX) {
	    	this.removeAttribute("viewBox");
	    } else {
	      this.setAttribute("viewBox", "" + minX + " " + minY + " " + width + " " + height);
	    }
    },


    /**
     * Gets the viewbox rectangle.
     *
     * @return {String}
     * @see #setViewBox
     */
    getViewBox : function() {
      return this.getAttribute("viewBox");
    }
  }
});