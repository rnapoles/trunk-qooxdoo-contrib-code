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
 * Place text on the image.
 * 
 * More info:
 * <ul>
 *   <li>http://www.w3.org/TR/SVG/text.html#TextElement</li>
 * </ul>
 */
qx.Class.define("svg.text.Text", {
  
  extend: svg.core.Element,
  
  include : [ svg.core.MTextContainer,
               svg.text.MTextLayout,
               svg.text.MTextAlignment,
               svg.text.MFontProperties,
               svg.text.MTextSpacing,
               svg.text.MTextDecoration],
  
  construct : function() {
    this.base(arguments, "text");
  },
  
  properties :
  {
    /**
     * X-coordinate of the text.
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/text.html#TextElementXAttribute</li>
     * </ul>
     */
    x : {
      nullable: true,
      init: null,
      check: "svg.core.Types.isCoordinate(value)",
      apply: "_applyX",
      event: "changeX"
    },
    
    /**
     * Y-coordinate of the text.
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/text.html#TextElementYAttribute</li>
     * </ul>
     */
    y : {
      nullable: true,
      init: null, 
      check: "svg.core.Types.isCoordinate(value)",
      apply: "_applyY",
      event: "changeY"
    },
    
    /**
     * Horizontal text offset. Sets the _dx_ attribute.
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/text.html#TextElementDXAttribute</li>
     * </ul>
     */
    offsetX : {
      nullable: true,
      init: null,
      check: "svg.core.Types.isLength(value)",
      apply: "_applyOffsetX",
      event: "changeOffsetX"
    },
    
    /**
     * Vertical text offset. Sets the _dy_ attribute.
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/text.html#TextElementDYAttribute</li>
     * </ul>
     */
    offsetY : {
      nullable: true,
      init: null, 
      check: "svg.core.Types.isLength(value)",
      apply: "_applyOffsetY",
      event: "changeOffsetY"
    },
    
    /**
     * The length that the text must fill. The text will be stretched
     * or shrinked if needed. The way in which stretching or shrinking
     * will occur is specified by the lengthAdjust property.
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/text.html#TextElementTextLengthAttribute</li>
     * </ul>
     * 
     * @see #lengthAdjust
     */
    textLength : {
      nullable: true,
      init: null,
      check: "svg.core.Types.isLength(value)",
      apply: "_applyTextLength",
      event: "changeTextLength"
    },
    
    /**
     * How text will be stretched or shrinked to meet the length requirement set
     * by the textLength property.
     * 
     * <ul>
     *   <li><em>spacing</em>: only whitespace will be stretched</li>
     *   <li><em>spacingAndGlyphs</em>: both whitespace and characters will be stretched</li>
     * </ul>
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/text.html#TextElementTextLengthAttribute</li>
     * </ul>
     */
    lengthAdjust : {
      nullable: true,
      init: null,
      check: ["spacing", "spacingAndGlyphs"],
      apply: "_applyLengthAdjust",
      event: "changeLengthAdjust"
    },
    
    /**
     * Rotation for individual characters or strings of text.
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/text.html#TextElementRotateAttribute</li>
     * </ul>
     */
    rotate : {
      nullable: true,
      init: null,
      apply: "_applyRotate",
      event: "changeRotate"
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
    
    //applies dx
    _applyOffsetX: function(value, old) {
      if (null == value) {
        this.removeAttribute("dx");
      } else {
        this.setAttribute("dx", value);
      }
    },
    
    //applies dy
    _applyOffsetY: function(value, old) {
      if (null == value) {
        this.removeAttribute("dy");
      } else {
        this.setAttribute("dy", value);
      }
    },
    
    //applies textLength
    _applyTextLength: function(value, old) {
      if (null == value) {
        this.removeAttribute("textLength");
      } else {
        this.setAttribute("textLength", value);
      }
    },
    
    //applies lengthAdjust
    _applyLengthAdjust: function(value, old) {
      if (null == value) {
        this.removeAttribute("lengthAdjust");
      } else {
        this.setAttribute("lengthAdjust", value);
      }
    },
    
    //applies rotate
    _applyRotate: function(value, old) {
      if (null == value) {
        this.removeAttribute("rotate");
      } else {
        this.setAttribute("rotate", value);
      }
    }
    
  }

  
});