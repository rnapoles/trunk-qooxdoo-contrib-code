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
 * A SVG &lt;desc&gt; element.
 *
 * In SVG, all elements can have a 'desc' element as a child. The content will not
 * be displayed on the screen. The implementation of this element is left to the
 * SVG viewer.
 *
 * More info: http://www.w3.org/TR/SVG/struct.html#DescriptionAndTitleElements
 */
qx.Class.define("svg.core.Desc",
{
  extend : svg.Element,
  
  include : [ svg.core.MTextContainer ],


  /**
   * Creates a new 'desc' element, which can then be added to any SVG element.
   * @param desc {String?null} the description text.
   */
  construct : function(desc)
  {
    this.base(arguments, "desc");

    if ("undefined" != typeof (desc)) {
      this.setValue(desc);
    }
  }
});