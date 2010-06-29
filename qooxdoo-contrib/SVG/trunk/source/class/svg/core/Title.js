
/**
 * A SVG &lt;title&gt; element.
 *
 * In SVG, all elements can have a 'title' element as a child. The content will not
 * be displayed on the screen. According to the SVG recommendation, the implementation
 * of this element is left to the SVG viewer.
 *
 * More info: http://www.w3.org/TR/SVG/struct.html#DescriptionAndTitleElements
 */
qx.Class.define("svg.core.Title",
{
  extend : svg.Element,
  
  include : [ svg.core.MTextContainer ],


  /**
   * Creates a new 'title' element, which can then be added to any SVG element.
   * @param title {String?null} the title text.
   */
  construct : function(title)
  {
    this.base(arguments, "title");

    if ("undefined" !== typeof (title)) {
      this.setValue(title);
    }
  }
});