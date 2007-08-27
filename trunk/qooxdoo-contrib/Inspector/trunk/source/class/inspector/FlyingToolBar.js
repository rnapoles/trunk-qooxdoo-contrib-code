/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2007 1&1 Internet AG, Germany, http://www.1and1.org

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (martinwittemann)

************************************************************************ */
qx.Class.define("inspector.FlyingToolBar", {
  
  extend : qx.ui.toolbar.ToolBar,

  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  construct : function() {    
    this.base(arguments);
    
    // initialize the toolbar
    this.setBorder("outset");
    this.setWidth("auto");
    this.setPadding(1);
    
    // create the drag field
    this._dragTerminator = new qx.ui.basic.Terminator();
    this._dragTerminator.setBorder("outset-thin");    
    this._dragTerminator.setWidth(3);
    this.add(this._dragTerminator);

    // register an event listener which start the drag process
    this._dragTerminator.addEventListener("mousedown", this.__handleMouseDown, this);    
    // register an event that handles the dragdrop
    this._dragTerminator.addEventListener("mouseup", this.__handleMouseUp, this);    
    // register an event which handels the movment of the toolbar
    this._dragTerminator.addEventListener("mousemove", this.__handleMouseMove, this);    
  }, 
  
  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */
  properties : {
    /**
     * Wether the toolbar sould be snapped to the edges of the browser
     * window or not. The distance of the magnetic area can be set at
     * {@link #snappDistance}.
     */
    magnetic: {
      check : "Boolean",
      init : true
    },
    
    /**
     * The distance to the edge of the browsers window in which the 
     * toolbar beginns to snapp to the window edge. Enabling the magnetic 
     * function with {@link #magnetic} 
     */
    snappDistance: {
      check : "Number",
      init: 20
    }
  },  
  
  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members: {
    /*
    *********************************
       ATTRIBUTES
    *********************************
    */    
    // flag for signaling the movement process
    _move: false,
    // the x offset between the position of the mouse and the left edge of the toolbar
    _xOffset: 0,
    // the y offset between the position of the mouse and the top edge of the toolbar
    _yOffset: 0,    
    // the terminator used as a drag symbol
    _dragTerminator: null,
    
    
    // a set of element which have the magnetic edges
    _magneticElements: [],
    // a set of directions containing to the magnetic elements
    _snappDirections: [],
    
    // the elements which are docked
    _dockedElementX: null,
    _dockedElementY: null,
    
    
    
    
    addMagneticElement: function(element, direction) {
      if (element != null) {
        this._magneticElements.push(element);
        if (direction == "inner") {
          this._snappDirections.push(true);
          if (this.getZIndex() < element.getZIndex()) {
            this.setZIndex(element.getZIndex() + 1);
          }
        } else {
          this._snappDirections.push(false);
        }
      }
    },
    
    
    
    removeMagneticElement: function(element) {
      // check if it is the docked element      
    },
    
    emptyMagneticElements: function() {
      // check if there is a docked element and remove the event listener first
      // then remove all magneticElements
    },
    
    
    
    
    /*
    *********************************
       PRIVATE
    *********************************
    */
    /**
     * Handler function which handles the mouse down on the drag field.
     * It starts the drag process.
     * @param e {Event} A event triggert by a mousedown.
     */
    __handleMouseDown: function(e) {
      // mark that the toolbar is in the drag mode
      this._move = true;
      // store the offset from the current mouse position to the left upper corner of the toolbar
      this._xOffset = e.getClientX() - this.getLeft();
      this._yOffset = e.getClientY() - this.getTop();
      // tell the drag terminator to catch all events
      this._dragTerminator.setCapture(true);      
    },
    
    
    /**
     * Handler function which handles the mouse up on the drag field.
     * It end the drag process.
     * @param e {Event} The event triggert by a mouseup.
     */
    __handleMouseUp: function(e) {
      // mark that the toolbas is not anymore in the drag mode
      this._move = false;
      // tell the drag terminator not to cacht all events
      this._dragTerminator.setCapture(false);
      // check all edges on their positions      
      this.__checkEdges();              
    },
    
    
    /**
     * Handler function to handle the mouse movement on the drag field.
     * It is responsible for moving the toolbar around and also checks 
     * if the toolbar is in the visible area of the browsers window.
     * If the magnetic function is enabled, it snapps the toolbar whithin
     * a certain range to the windows edges. 
     * @see #magnetic
     * @param e {Event} The event triggert by the mousemove.
     */
    __handleMouseMove: function(e) {
      // if the toolbar is in the move mode
      if (this._move) {
        // if the magnetic function is enabled
        if (this.isMagnetic()) {
          
          // if no magnetic edge is available in the y direction
          if (!this.__checkMagneticY(e)) {
            // set the y doced element to null
            this.__resetDockedElementY();
            // follow the mouse in y direction
            this.setTop(e.getClientY() - this._yOffset);                        
          }        
          
          // if no magnetic edge is available in the y direction          
          if (!this.__checkMagneticX(e)) {
            // reset the x docked element
            this.__resetDockedElementX();
            // follow the mouse in x direction
            this.setLeft(e.getClientX() - this._xOffset);                         
          }
  
        // if the magnetic function is disabled
        } else {
          // just move the toolbar where the mouse goes
          this.setTop(e.getClientY() - this._yOffset);
          this.setLeft(e.getClientX() - this._xOffset);         
        }
      }      
    },
    
    
    /**
     * Checks if there is a magnetic edge in the snapp distance of the
     * current toolbar position in x direction.
     * @param e {Event} A mousemove event.
     */
    __checkMagneticX: function(e) {            
      // get the coordinates of the toolbar
      var left = e.getClientX() - this._xOffset;
      var right = e.getClientX() - this._xOffset + this.getBoxWidth();
      var top = e.getClientY() - this._yOffset;
      var bottom = e.getClientY() - this._yOffset + this.getBoxHeight();        
      
      // go threw all magnetic objects for the x dimension
      for (var i = 0; i < this._magneticElements.length; i++) {
        // if the obeject is a widget
        if (this._magneticElements[i] instanceof qx.ui.core.Widget) {
          // try to get the outer width of the element
          try {
            var elementHeight = this._magneticElements[i].getBoxHeight();
            var elementWidth = this._magneticElements[i].getBoxWidth();
          } catch (e) {
            var elementHeight = this._magneticElements[i].getInnerHeight();
            var elementWidth = this._magneticElements[i].getInnerWidth();
          }     

          // if the toolbar touches the element
          if (bottom > this._magneticElements[i].getTop() &&
              top < this._magneticElements[i].getTop() + elementHeight) {            
            // inner case
            if (this._snappDirections[i]) {
              // calculate the difference between the left of the magnetic edge and the toolbar              
              var diffLeft = left - this._magneticElements[i].getLeft();            
            // outer case
            } else {              
              // calculate the difference between the left of the magnetic edge and the toolbar           
              var diffLeft = right - this._magneticElements[i].getLeft();
            }
            // check if it is close to an magnetic edge
            if (diffLeft < this.getSnappDistance() && diffLeft > -this.getSnappDistance()) {                
              // if it should snapp at the inside
              if (this._snappDirections[i]) {
                this.setLeft(this._magneticElements[i].getLeft());
              } else {
                this.setLeft(this._magneticElements[i].getLeft() - this.getBoxWidth());                  
              }
              // save the docked element
              this.__setDockedElementX(this._magneticElements[i]);
              // return and say that the left value has been set
              return true;
            }

            // inner case
            if (this._snappDirections[i]) {
              // calculate the difference between the right of the magnetic edge and the toolbar
              var diffRight = this._magneticElements[i].getLeft() + elementWidth - right;              
            // outer case
            } else {              
              // calculate the difference between the right of the magnetic edge and the toolbar
              var diffRight = this._magneticElements[i].getLeft() + elementWidth - left;              
            } 
            
            // check if it is close to an magnetic edge
            if (diffRight > -this.getSnappDistance() && diffRight < this.getSnappDistance()) {
              // if it should snapp at the inside
              if (this._snappDirections[i]) {
                this.setLeft(this._magneticElements[i].getLeft() + elementWidth - this.getBoxWidth());
              } else {
                this.setLeft(this._magneticElements[i].getLeft() + elementWidth);               
              }
              // save the docked element
              this.__setDockedElementX (this._magneticElements[i]);
              // return and say that the left value has been set
              return true;
            }
          }
        }
      }
      // if no fitting edge could be found
      return false;
    },
    
    
    /**
     * Checks if there is a magnetic edge in the snapp distance of the
     * current toolbar position in y direction.
     * @param e {Event} A mousemove event.
     */    
    __checkMagneticY: function(e) {      
      // get the position of the toolbar
      var left = e.getClientX() - this._xOffset;
      var right = e.getClientX() - this._xOffset + this.getBoxWidth();
      var top = e.getClientY() - this._yOffset;
      var bottom = e.getClientY() - this._yOffset + this.getBoxHeight();      
      
      // go threw all magnetic objects for the y direction
      for (var i = 0; i < this._magneticElements.length; i++) {
        // if the element is a widget
        if (this._magneticElements[i] instanceof qx.ui.core.Widget) {          
          // try to get the outer width of the element
          try {
            var elementHeight = this._magneticElements[i].getBoxHeight();
            var elementWidth = this._magneticElements[i].getBoxWidth();
          } catch (e) {
            var elementHeight = this._magneticElements[i].getInnerHeight();
            var elementWidth = this._magneticElements[i].getInnerWidth();               
          }                   
  
          // only do the magnetic stuff if the magnetic edge is in contact with the toolbar
          if (right > this._magneticElements[i].getLeft() && 
              left < this._magneticElements[i].getLeft() + elementWidth) {
            // calculate the difference between the top of the magnetic edge and the toolbar           
            var diffTop = this._magneticElements[i].getTop() - bottom;
            // add the height of the toolbar if the toolbar should snapp on the inner edge
            if (this._snappDirections[i]) {
              diffTop += this.getBoxHeight();
            }
            // check if it is close to an magnetic edge
            if (diffTop < this.getSnappDistance() - this._xOffset && 
                diffTop > -this.getSnappDistance() + this._xOffset) {
              // if it should snapp at the inside
              if (this._snappDirections[i]) {
                this.setTop(this._magneticElements[i].getTop());
              } else {
                this.setTop(this._magneticElements[i].getTop() - this.getBoxHeight());                  
              }
              // save the docked element
              this.__setDockedElementY(this._magneticElements[i]);
              // say that the y direction has been set
              return true;
            }
  
            // calculate the difference between the bottom of the magnetic edge and the toolbar
            var diffBottom = this._magneticElements[i].getTop() + elementHeight - top;               
            // substitute the height of the toolbar if the toolbar should snapp on the inner edge
            if (this._snappDirections[i]) {
              diffBottom -= this.getBoxHeight();
            }             
            // check if it is close to an magnetic edge
            if (diffBottom > -this.getSnappDistance() + this._xOffset && 
                diffBottom < this.getSnappDistance() - this._xOffset) {
              // if it should snapp at the inside
              if (this._snappDirections[i]) {                
                this.setTop(this._magneticElements[i].getTop() + elementHeight - this.getBoxHeight());
              } else {
                this.setTop(this._magneticElements[i].getTop() + elementHeight);                
              }
              // save the docked element
              this.__setDockedElementY(this._magneticElements[i]);
              // say that the y direction has been set
              return true;
            }     
          }
        }
      }      
      // if no edge could be found
      return false;
    },  
    
    
    /**
     * Thie function is responsible for checking the position of the
     * toolbar. If the toolbar is not in the area of the browser visible
     * area, the toolbar will be set there.
     */
    __checkEdges: function() {
      // check the right edge
      if (this.getLeft() + this.getBoxWidth() > qx.ui.core.ClientDocument.getInstance().getInnerWidth()) {
        // position the an the right edge
        this.setLeft(qx.ui.core.ClientDocument.getInstance().getInnerWidth() - this.getBoxWidth());
      }
      
      // check bottom edge
      if (this.getTop() + this.getBoxHeight() > qx.ui.core.ClientDocument.getInstance().getInnerHeight()) {
        // position the toolbar on the bottom edge
        this.setTop(qx.ui.core.ClientDocument.getInstance().getInnerHeight() - this.getBoxHeight());
      }
      
      // check the left edge
      if (this.getLeft() < 0) {
        // position the toolbar on the left edge
        this.setLeft(0);
      }
      
      // check the top edge
      if (this.getTop() < 0) {
        // position the toolbar on the top edge
        this.setTop(0);
      }      
    },
    
    
    
    
    
    
    
    
    /*
    *********************************
       PRIVATE (FOLLOW THE DOCKED ELEMENT STUFF) 
    *********************************
    */    
    /**
     * This function sets the docked widget in the y direction.
     * Therefore it adds the event listeners to the elemnt so that
     * the toolbar can follow a change of the position of the element.
     * If a element is docked in the x direction, the docked elemnt 
     * will be removed.
     * @param element {qx.ui.core.Widget} The currentls docked widget 
     */
    __setDockedElementY: function(element) {
      // if therre is a element docked in the x direction 
      if (this._dockedElementX != null) {
        // remove it
        this.__resetDockedElementX();
      }
      // if the elment is not already docked in the y direction
      if (this._dockedElementY != element) {
        // save the reference
        this._dockedElementY = element;
        // add the event listener
        element.addEventListener("changeLeft", this.__elementHandlerY, this);
        element.addEventListener("changeTop", this.__elementHandlerX, this);        
      } 
          
    },    
    
    
    /**
     * This function sets the docked widget in the x direction.
     * Therefore it adds the event listeners to the elemnt so that
     * the toolbar can follow a change of the position of the element.
     * If a element is docked in the y direction, the docked elemnt 
     * will be removed.
     * 
     * @param element {qx.ui.core.Widget} The currentls docked widget 
     */   
    __setDockedElementX: function(element) {  
      // if there is a docked element in the y direction  
      if (this._dockedElementY != null) {
        // remove it
        this.__resetDockedElementY();
      }      
      // if the new element is different for the current
      if (this._dockedElementX != element) {
        // save the reference       
        this._dockedElementX = element;
        // add the event listeners
        element.addEventListener("changeLeft", this.__elementHandlerY, this);
        element.addEventListener("changeTop", this.__elementHandlerX, this);        
        }             
    },
        
        
    /**
     * Moves the toolbar in the x direction the same way like the docked element
     * was moved.
     * @param e {ChangeEvent} The event triggert by a change of the top property.
     */
    __elementHandlerX: function(e) {      
      var delta = e.getValue() - e.getOldValue();
      this.setTop(this.getTop() + delta);
    },
    
    
    /**
     * Moves the toolbar in the y direction the same way like the docked element
     * was moved.
     * @param e {ChangeEvent} The event triggert by a change of the left property.
     */
    __elementHandlerY: function(e) {
      var delta = e.getValue() - e.getOldValue();
      this.setLeft(this.getLeft() + delta);
    },
    
    
    /**
     * Reset the current docked element in the x direction. This includes
     * removing the event listeners and the reference. 
     */
    __resetDockedElementX: function() {
      // if there is a docked element
      if (this._dockedElementX != null) {
        // remove the event listeners
        this._dockedElementX.removeEventListener("changeLeft", this.__elementHandlerY, this);
        this._dockedElementX.removeEventListener("changeTop", this.__elementHandlerX, this);
        // remove the reference
        this._dockedElementX = null;        
      }
    },
    
    /**
     * Reset the current docked element in the y direction. This includes
     * removing the event listeners and the reference. 
     */
    __resetDockedElementY: function() {
      // if there is a docked element
      if (this._dockedElementY != null) {
        // remove the event listeners
        this._dockedElementY.removeEventListener("changeLeft", this.__elementHandlerY, this);
        this._dockedElementY.removeEventListener("changeTop", this.__elementHandlerX, this);
        // remove the reference
        this._dockedElementY = null;        
      }
    }
  }
});
