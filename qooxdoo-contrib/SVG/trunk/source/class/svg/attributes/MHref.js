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
 * Set uri references to other elements or fragments.
 * 
 * *Important!*
 * The _xlink:href_ attribute must be set using the {@link #setHref} method.
 * Setting it through the {@link qx.html.Element#set} method will *NOT* work.
 * This is because the attribute must be placed in the xlink xml
 * namespace. This method takes care of that, the set method does not.
 */
qx.Mixin.define("svg.attributes.MHref",
{
  statics : { XLINK_NAMESPACE : "http://www.w3.org/1999/xlink" },

  members :
  {
    /**
     * A URI reference to an element/fragment within an SVG document.
     *  Sets the 'xlink:href' attribute.
     *
     * @param uri {String}
     *   value to set
     */
    setHref : function(uri) {
      this.getDomElement().setAttributeNS(svg.attributes.MHref.XLINK_NAMESPACE, "xlink:href", uri);
    },


    /**
     * Gets the URI reference.
     *
     * @return {String} 
     * 
     * @see #setHref
     */
    getHref : function() {
      return this.getAttribute("xlink:href");
    }
  }
});