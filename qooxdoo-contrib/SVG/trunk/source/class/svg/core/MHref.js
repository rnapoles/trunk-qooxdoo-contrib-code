/* ************************************************************************

   Copyright:
     2010-2011  Marc Puts

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Marc Puts (marcputs)

************************************************************************ */

/**
 * Refer to other elements or fragments.
 *
 * *Important!*
 * The _xlink:href_ attribute must be set using the {@link #setHref} method.
 * Setting it through the {@link qx.html.Element#set} method will *NOT* work.
 * This is because the attribute must be placed in the xlink xml
 * namespace. This method takes care of that, the set method does not.
 *
 * The namespace used is *http://www.w3.org/1999/xlink*.
 */
qx.Mixin.define("svg.core.MHref",
{
  statics : { XLINK_NAMESPACE : "http://www.w3.org/1999/xlink" },

  properties :
  {

    /**
     * Reference to an element/fragment within an SVG document. Sets the _xlink:href_ attribute.
     *
     * There are two ways to refer to an element:
     *
     * <pre class="javascript>
     * var circle = new svg.shape.Line();
     * circle.setId("myCircle");
     *
     * //option 1: refer to element object
     * element.setHref(circle);
     *
     * //option 2: refer to element using url():
     * element.setHref("url(#myCircle)");
     * </pre>
     *
     * <span class="item-deprecated">Using the first option will keep the reference alive even
     * if the target's id is changed!</span> (feature not yet implemented)
     *
     */
    href : {
      nullable: true,
      init: null,
      apply: "_applyHref",
      check: "value instanceof svg.core.Element || typeof(value) == 'string'",
      event: "changeHref"
    }
  },

  members :
  {

    _applyHref : function(value, old) {

      if (null === value) {
        this.removeAttribute("xlink:href");
        return;
      }

      if (value instanceof svg.core.Element) {
        var id = value.getId();
        if (null === id) {
          if ((qx.core.Environment.get("qx.debug"))) {
            this.warn("Can't create uri reference; id is null.");
          }
          return;
        }
        value = '#' + id;
      }
      this.getDomElement().setAttributeNS(svg.core.MHref.XLINK_NAMESPACE, "xlink:href", value);

    }

  }
});