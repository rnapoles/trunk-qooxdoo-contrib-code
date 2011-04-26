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
 * Set a (list of) transformations, which are applied in the order provided.
 *
 * More info:
 * <ul>
 *   <li>http://www.w3.org/TR/SVG/coords.html#TransformAttribute</li>
 * </ul>
 */
qx.Mixin.define("svg.coords.MTransform",
{
  
  properties :
  {
    /**
     * A list of transformations which are applied in order.
     * 
     * Possible transforms are matrix, translate, scale, rotate, skewX and skewY.
     * 
     * More info:
     * <ul>
     *   <li>{@link MTransform}</li>
     *   <li>http://www.w3.org/TR/SVG/coords.html#TransformAttribute</li>
     * </ul>
     */
    transform : {
      nullable: true,
      init: null,
      check: function(value) {
               return qx.lang.Type.isString(value) ||
                 value instanceof svg.coords.transform.Transformation;
             },
      apply: "__applyTransform",
      event: "changeTransform"
    },
    
    transformMode : {
      nullable: false,
      init: "normal",
      check: ["normal", "matrix"],
      apply: "__applyTransformMode"
    }
  },
  
  members :
  {

    //applies transform property
    __applyTransform: function(value, old) {

      this.__setTransformAttribute(value, this.getTransformMode());

      if (value instanceof svg.coords.transform.Transformation) {
        value.addListener("change", this.__changeListener, this);
      }
      
      if (old instanceof svg.coords.transform.Transformation) {
        old.removeListener("change", this.__changeListener, this);
      }
      
    },
    
    //applies transformMode property
    __applyTransformMode: function(value, old) {
      this.__setTransformAttribute(this.getTransform(), value);
    },
    
    //sets the transform attribute, either directly to the value
    //or the derived value from an Transform
    __setTransformAttribute : function(value, transformMode) {
      if (null === value) {
        this.removeAttribute("transform");
        return;
      }
      
      if (value instanceof svg.coords.transform.Transformation) {
        switch (transformMode) {
          case "normal":
            this.setAttribute("transform", value.toString());
            return;
          case "matrix":
            this.setAttribute("transform", value.toMatrixString());
            return;
          default:
            qx.core.Assert.fail("Default case should be unreachable!", false);
        }
      }
      this.setAttribute("transform", value);
    },
    
    __changeListener: function() {
      this.__setTransformAttribute(this.getTransform(), this.getTransformMode());
    }
    
  }
});