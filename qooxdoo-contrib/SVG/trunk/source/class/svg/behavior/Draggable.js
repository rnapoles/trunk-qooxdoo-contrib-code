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
 * Makes an svg element draggable.
 * 
 * The required mouse listeners are attached to the element's parent.
 * 
 * *HIGHLY EXPERIMENTAL*
 * Currently only works for elements that have the X/Y or CX/CY attributes.
 */
qx.Class.define("svg.behavior.Draggable",
{
  extend : qx.core.Object,

  /**
   * @param svgElement {svg.core.Element}
   *   Element that 50should become draggable. 
   */
  construct : function(svgElement)
  {
    this.base(arguments);

    this.__element = svgElement;
    
    this.__offsets = null;
    this.__addListener();
    
    this.__convert = svg.coords.Convert.clientToUserspace; //shortcut to much used function
  },

  members :
  {
    __convert : null,
    __element : null,
    __mouseUpListenerId : null,
    __mouseDownListenerId : null,
    __mouseMoveListenerId : null,
    __offset : null,

    /**
     * The SVG element made draggable.
     * 
     * @return {svg.core.Element}
     */
    getElement : function() {
      return this.__element;
    },

    /**
     * Adds listener(s) to start dragging.
     */
    __addListener : function()
    {
      //add mousedown listener
      this.__mouseDownListenerId = this.__element.addListener("mousedown", this.__onMouseDown, this);
    },

    /**
     * Handler for mousedown event.
     * 
     * @param e {qx.event.type.Mouse}
     *   Event object
     */
    __onMouseDown : function(e)
    {
      if (!e.isLeftPressed()) {
        return;
      }

      var mousePos = this.__convert(this.__element, e.getDocumentLeft(), e.getDocumentTop());
      var elemPos = this.__convert(this.__element,
                                   qx.bom.element.Location.getLeft(this.__element.getDomElement()),
                                   qx.bom.element.Location.getTop(this.__element.getDomElement()));
                                
                                   
      this.__offsets = {
        left : mousePos.x - elemPos.x,
        top  : mousePos.y - elemPos.y
      };
      
      var parent = this.__element.getParent();
        
      // add "mousemove" event listener
      this.__mouseMoveListenerId = parent.addListener("mousemove", this.__onMouseMove, this);
        
      // add "mouseup" event listener
      this.__mouseUpListenerId = parent.addListener("mouseup", this.__onMouseUp, this);
        
      parent.capture();
    },

    /**
     * Handler for mouseup event.
     * 
     * @param e {qx.event.type.Mouse}
     *   Event object
     */
    __onMouseUp : function(e)
    {
      try {
        e.stopPropagation();
      }
      catch (ex) {}
      
      var parent = this.__element.getParent();

      //remove mousemove listener
      parent.removeListenerById(this.__mouseMoveListenerId);
      this.__mouseMoveListenerId = null;
      
      //remove mousedown listener
      parent.removeListenerById(this.__mouseUpListenerId);
      this.__mouseUpListenerId = null;
      
      parent.releaseCapture();
      
    },

    /**
     * Handler for mousemove event.
     * 
     * @param e {qx.event.type.Mouse}
     *   Event object
     */
    __onMouseMove : function(e)
    {
      e.stopPropagation();
      
      var mousePos = this.__convert(this.__element, e.getDocumentLeft(), e.getDocumentTop());
      
      var left = mousePos.x - this.__offsets.left;
      var top  = mousePos.y - this.__offsets.top;

      if (this.__element.setX && this.__element.setY) {
        this.__element.setX(left);
        this.__element.setY(top);
        return; //exit function
      }
      
      //this should never be reached
      qx.core.Assert.fail("Dragging elements that don't have the X/Y attributes is not supported yet!", true);
      
    }

  },


  /* ******************************************************
   *    DESTRUCT
   * ******************************************************/
  destruct : function() {
    
    var remove = this.__element.removeListenerById;
    
    if (null !== this.__mouseUpListenerId) {
      remove(this.__mouseUpListenerId);
      this.__mouseUpListenerId = null;
    }
    if (null !== this.__mouseDownListenerId) {
      remove(this.__mouseDownListenerId);
      this.__mouseDownListenerId = null;
    }
    if (null !== this.__mouseMoveListenerId) {
      remove(this.__mouseMoveListenerId);
      this.__mouseMoveListenerId = null;
    }
    
    this.__element = null;
    this.__offsets = null;
    this.__convert = null;
  }
});
