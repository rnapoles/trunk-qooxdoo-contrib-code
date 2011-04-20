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
 * Properties for spacing between letters and words.
 * 
 * More info:
 * <ul>
 *   <li>http://www.w3.org/TR/SVG/text.html#SpacingProperties</li>
 * </ul>
 */
qx.Mixin.define("svg.text.MTextSpacing", {
  
  properties :
  {
    
    /**
     * Amount of space between letters.
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/text.html#LetterSpacingProperty</li>
     * </ul>
     */
    letterSpacing : {
      nullable: true,
      init: null,
      check: function(value) {
               return value == "normal" ||
                      value == "inherit" ||
                      svg.core.Types.isLength(value);
             },
      apply: "_applyLetterSpacing",
      event: "changeLetterSpacing"
    },
    
    
    /**
     * Spacing between letters for specific fonts.
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/text.html#KerningProperty</li>
     * </ul>
     */
    kerning : {
      nullable: true,
      init: null,
      check: function(value) {
               return value == "auto" ||
                      value == "inherit" ||
                      svg.core.Types.isLength(value);
             },
      apply: "_applyKerning",
      event: "changeKerning"
    },

    /**
     * Amount of space between words.
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/text.html#WordSpacingProperty</li>
     * </ul>
     */
    wordSpacing : {
      nullable: true,
      init: null,
      check: function(value) {
               return value == "normal" ||
                      value == "inherit" ||
                      svg.core.Types.isLength(value);
             },
      apply: "_applyWordSpacing",
      event: "changeWordSpacing"
    }    
    
  },
  
  members :
  {
    //applies letter-spacing
    _applyLetterSpacing: function(value, old) {
      if (null == value) {
        this.removeAttribute("letter-spacing");
      } else {
        this.setAttribute("letter-spacing", value);
      }
    },

    //applies word-spacing
    _applyWordSpacing: function(value, old) {
      if (null == value) {
        this.removeAttribute("word-spacing");
      } else {
        this.setAttribute("word-spacing", value);
      }
    },

    //applies kerning
    _applyKerning: function(value, old) {
      if (null == value) {
        this.removeAttribute("kerning");
      } else {
        this.setAttribute("kerning", value);
      }
    }
  }
  
});