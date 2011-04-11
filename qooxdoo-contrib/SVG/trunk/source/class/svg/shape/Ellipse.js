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
 * An ellipse based on a center point and two radii.
 * 
 * The ellipse is axis-aligned with the current user coordinate system.
 *
 * More info:
 * <ul>
 *   <li>http://www.w3.org/TR/SVG/shapes.html#EllipseElement</li>
 * </ul>
 */
qx.Class.define("svg.shape.Ellipse",
{
  extend : svg.core.Element,
  
  include : [ svg.paint.MFillProperties,
              svg.paint.MStrokeProperties,
              svg.coords.MTransform ],

  construct : function() {
    this.base(arguments, "ellipse");
  },

  properties :
  {
    /**
     * The x-axis coordinate of the center of the ellipse.
     *
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/shapes.html#EllipseElementCXAttribute</li>
     * </ul>
     */
    cx : {
      nullable: true,
      init: null,
      apply: "_applyCx",
      check: "Number",
      event: "changeCx"
    },
    
    /**
     * The y-axis coordinate of the center of the ellipse.
     *
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/shapes.html#EllipseElementCYAttribute</li>
     * </ul>
     */
    cy : {
      nullable: true,
      init: null,
      apply: "_applyCy",
      check: "Number",
      event: "changeCy"
    },

    /**
     * The x-axis radius of the ellipse.
     * A value of zero disables rendering of the element.
     *
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/shapes.html#EllipseElementRXAttribute</li>
     * </ul>
     */
    radiusX : {
      nullable: true,
      init: null,
      apply: "_applyRadiusX",
      check: "!isNaN(value) && value >= 0",
      event: "changeRadiusX"
    },
    
    /**
     * The y-axis radius of the ellipse.
     * A value of zero disables rendering of the element.
     *
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/shapes.html#EllipseElementRYAttribute</li>
     * </ul>
     */
    radiusY : {
      nullable: true,
      init: null,
      apply: "_applyRadiusY",
      check: "!isNaN(value) && value >= 0",
      event: "changeRadiusY"
    },
    
    /**
     * Short-hand property for radiusX and radiusY.
     */
    radius : {
      group : ["radiusX", "radiusY"],
      mode : "shorthand"
    }
    
  },
  
  
  members :
  {
    
    //applies cx
    _applyCx: function(value, old) {
      if (null == value) {
        this.removeAttribute("cx");
      } else {
        this.setAttribute("cx", value);
      }
    },
    
    //applies cy
    _applyCy: function(value, old) {
      if (null == value) {
        this.removeAttribute("cy");
      } else {
        this.setAttribute("cy", value);
      }
    },

    //applies rx
    _applyRadiusX: function(value, old) {
      if (null == value) {
        this.removeAttribute("rx");
      } else {
        this.setAttribute("rx", value);
      }
    },

    //applies ry
    _applyRadiusY: function(value, old) {
      if (null == value) {
        this.removeAttribute("ry");
      } else {
        this.setAttribute("ry", value);
      }
    }

  }
});