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
/*
#require(svg.core.Types)
*/

/**
 * An element that resides in the SVG namespace. Using the correct
 * SVG namespace is required for embedding SVG into XHTML.
 *
 * The namespace used is *http://www.w3.org/2000/svg*.
 */
qx.Class.define("svg.core.Element",
{
  extend : qx.html.Element,

  include : [ svg.core.MTitleDescription,
              svg.core.dom.MElement,
              svg.core.dom.MLocatable],


  /**
   * @param tagName {String}
   *   Tag name of the element to create.
   */
  construct : function(tagName)
  {
    this.base(arguments, tagName);
    this.__svgElement = document.createElementNS(svg.core.Element.SVG_NAMESPACE, tagName);
  },

  statics : {
    SVG_NAMESPACE : "http://www.w3.org/2000/svg"
  },

  properties :
  {
    /**
     * Unique name for this element.
     */
    id : {
      nullable: true,
      init: null,
      apply: "_applyId",
      check: "String",
      event: "changeId"
    }
  },

  members :
  {
    __svgElement : null,

    //applies id
    _applyId : function(value, old) {
      if (null == value) {
        this.removeAttribute("id");
      } else {
        this.setAttribute("id", value);
      }
    },

    /**
     * Internal helper to generate the DOM element
     * *override*
     *
     * @return {svg.core.Element}
     */
    _createDomElement : function() {
      return this.__svgElement;
    },

    /**
     * Returns the DOM element. Please use this with caution.
     * It is better to make all changes to the object itself using the public
     * API rather than to the underlying DOM element.
     *
     * *override*
     *
     * @return {Element}
     *   The DOM element node
     */
    getDomElement : function() {
      return this.__svgElement;
    },

    /**
     * Gets an FuncIRI reference to this element. An {@link #id} must have been set for this.
     *
     * Returns _null_ if no id is set.
     *
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/types.html#DataTypeFuncIRI</li>
     * </ul>
     *
     * @return {String}
     *   an FuncIRI reference, i.e. url(#abc)
     */
    getFuncIri : function() {
      var id = this.getId();

      if (null == id) {
        if ((qx.core.Environment.get("qx.debug"))) {
          this.warn("Can't create uri reference; id is null.");
        }
        return null;
      }
      return "url(#" + id + ")";
    },


    /**
     * Checks if the DOM element is currently in the document tree. Note that this returns the *actual*
     * state of the DOM element, which may change when the framework's element queue is flushed.
     *
     * @return {Boolean}
     *   true if the DOM element is now in the document tree, false otherwise.
     */
    inDocumentTree : function() {
      var el = this.__svgElement;

      //return "element is created AND ("element has parent" OR "element is the document root")
      return (null !== el) && ((null !== el.parentNode) || (el.ownerDocument.documentElement === el));
    },

    /**
     * Searches the current element's ancestor tree for the element that wraps the specified
     * DOM element. The search includes the current element.
     *
     * <pre>
     * var eSvg = new svg.struct.Svg();
     * var eGroup = new svg.struct.Group();
     * var eRect = new svg.shape.Rect();
     *
     * eSvg.add(eGroup);
     * eGroup.add(eRect);
     *
     * var x = eRect.parentByDomElement(eSvg.getDomElement()); //x === eSvg
     *
     * </pre>
     *
     * @param domElement {Element} DOM Element
     *
     * @return {svg.core.Element|null}
     *   The found svg element, or <pre>null</pre> if nothing was found.
     */
    parentByDomElement : function(domElement) {
      var el = this;

      while (el !== null && el.getDomElement() !== domElement) {
        el = el.getParent();
      }

      return el;
    }

  },

  destruct : function() {
    this.__svgElement = null;
  }
});