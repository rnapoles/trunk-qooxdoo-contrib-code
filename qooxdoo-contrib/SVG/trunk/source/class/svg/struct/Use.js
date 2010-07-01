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
 * The 'use' element references another element and includes/draws it
 * at that given point in the document.
 * 
 * Any svg, symbol, group, graphics element or other use element is
 * potentially a template object that can be re-used ("instanced"). 
 *
 * More info:
 * <ul>
 *   <li>http://www.w3.org/TR/SVG/struct.html#UseElement</li>
 * </ul>
 */
qx.Class.define("svg.struct.Use",
{
  extend : svg.core.Element,
  
  include : [ svg.attributes.MHref ],

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
    this.base(arguments, "use", styles, attributes);
  },
  
  properties :
  {
  	/**
  	 * x-coord of the region into which the referenced element is placed.
  	 * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/struct.html#UseElementXAttribute</li>
     * </ul>
  	 */
  	x : {
  	  nullable: true,
  	  init: null,
  	  apply: "_applyX",
  	  check: "Number"
    },
    
  	/**
  	 * y-coord of the region into which the referenced element is placed.
  	 * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/struct.html#UseElementYAttribute</li>
     * </ul>
  	 */
  	y : {
  	  nullable: true,
  	  init: null,
  	  apply: "_applyY",
  	  check: "Number"
    },
    
  	/**
  	 * width of the region into which the referenced element is placed.
  	 * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/struct.html#UseElementWidthAttribute</li>
     * </ul>
  	 */
    width : {
  	  nullable: true,
  	  init: null,
  	  apply: "_applyWidth",
  	  check: "svg.core.Types.isLength(value)"
    },
    
  	/**
  	 * height of the region into which the referenced element is placed.
  	 * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/struct.html#UseElementHeightAttribute</li>
     * </ul>
  	 */
    height : {
  	  nullable: true,
  	  init: null,
  	  apply: "_applyHeight",
  	  check: "svg.core.Types.isLength(value)"
    }
  },


  members :
  {
   	//applies x
  	_applyX: function(value, old) {
	    if (null == value) {
	  	  this.removeAttribute("x");
	    } else {
        this.setAttribute("x", value);
	    }
    },
  
  	//applies y
  	_applyY: function(value, old) {
	    if (null == value) {
	  	  this.removeAttribute("y");
	    } else {
        this.setAttribute("y", value);
	    }
    },
  
  	//applies width
  	_applyWidth: function(value, old) {
	    if (null == value) {
	  	  this.removeAttribute("width");
	    } else {
        this.setAttribute("width", value);
	    }
    },
  
  	//applies height
  	_applyHeight: function(value, old) {
	    if (null == value) {
	  	  this.removeAttribute("height");
	    } else {
        this.setAttribute("height", value);
	    }
    }
  }  
  
});