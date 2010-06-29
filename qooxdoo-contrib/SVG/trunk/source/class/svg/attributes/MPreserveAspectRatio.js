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
 * In some cases, typically when using the viewBox attribute, it is desirable that the
 * graphics stretch to fit non-uniformly to take up the entire viewport. In other cases,
 * it is desirable that uniform scaling be used for the purposes of preserving the
 * aspect ratio of the graphics.
 *
 * Attribute preserveAspectRatio indicates whether or not to force uniform scaling.
 *
 * More info: http://www.w3.org/TR/SVG11/coords.html#PreserveAspectRatioAttribute
 */
qx.Mixin.define("svg.attributes.MPreserveAspectRatio",
{
  members :
  {
    /**
     * Indicates whether or not to force uniform scaling.
     *
     * @param align {String ? "xMidYMid"} The 'align' parameter indicates whether to force uniform scaling and, if so,
     *                the alignment method to use in case the aspect ratio of the viewBox doesn't
     *                match the aspect ratio of the viewport. Possible values are:
     *
     *                <ul>
     *                  <li>xMinYMin - align to top left</li>
     *                  <li>xMidYMin - center on x-axis, align top</li>
     *                  <li>xMaxYMin - align to top right</li>
     *                  <li>xMinYMid - align to left, center on y-axis</li>
     *                  <li>xMidYMid (default) - center on x and y-axes</li>
     *                  <li>xMaxYMid - align to right, center on y-axis</li>
     *                  <li>xMinYMax - align to bottom left</li>
     *                  <li>xMidYMax - center on x-axis, align to bottom</li>
     *                  <li>xMaxYMax - align to bottom right</li>
     *                </ul>
     * @param meetOrSlice {String ? "meet"} Possible values are:
     *                <ul>
     *                  <li>meet (default)</li>
     *                  <li>slice</li>
     *                </ul>
     * @param defer {Boolean ? false} If set to true on an 'image' element, then the value of preserveAspectRatio
     *                on the referenced content should be used.
     *
     *                For preserveAspectRatio on all other elements, the 'defer' portion of the
     *                attribute is ignored.
     * @return {void}
     */
    setPreserveAspectRatio : function(align, meetOrSlice, defer)
    {
      var value = align + " " + meetOrSlice;

      if (defer) {
        value = "defer " + value;
      }

      this.setAttribute("preserveAspectRatio", value);
    },


    /**
     * Gets the value of the preserveAspectRatio attribute.
     *
     * @return {String} TODOC
     * @see #setPreserveAspectRatio
     */
    getPreserveAspectRatio : function() {
      return this.getAttribute("preserveAspectRatio");
    }
  }
});