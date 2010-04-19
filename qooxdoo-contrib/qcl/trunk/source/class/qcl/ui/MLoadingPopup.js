/* ************************************************************************

   qcl - the qooxdoo component library
  
   http://qooxdoo.org/contrib/project/qcl/
  
   Copyright:
     2007-2009 Christian Boulanger
  
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.
  
   Authors:
   *  Christian Boulanger (cboulanger)
  
************************************************************************ */


/**
 * A mixin that provides a "Loading..." popup over a widget that is 
 * just requesting data from the server
 */
qx.Mixin.define("qcl.ui.MLoadingPopup",
{
  
  members:
  {
    __loadingPopup : null,
    __popupAtom : null,
    
     /**
      * Creates the popup
      * @param label {String}
      * @param iconpath {String}
      */
     createPopup : function( label, iconpath )
     {
        this.__loadingPopup = new qx.ui.popup.Popup(new qx.ui.layout.Canvas()).set({
          decorator: "group",
          minWidth  : 100,
          minHeight : 30,
          padding   : 10
        });
        this.__popupAtom = new qx.ui.basic.Atom( label, iconpath ) ;
        this.__popupAtom.setRich(true);
        this.__loadingPopup.add( this.__popupAtom );
     },
     
     /**
      * Shows the popup centered over the widget
      * @param widget {qx.ui.core.Widget}
      * @param label {String}
      */
     showPopup : function( widget, label )
     {
       if ( label )
       {
          this.__popupAtom.setLabel( label );
       }
       
       var p = this.__loadingPopup;
       var c,l,t,w,h;
       if ( widget  ) 
       {
          c = widget.getContentLocation();
          if ( c )
          {
            var w = c.right - c.left;
            var h = c.bottom - c.top;
            l = Math.floor( c.left + ( w / 2) - ( p.getWidth() / 2 ) ); 
            t = Math.floor( c.top + ( h / 2) - ( p.getHeight() / 2) );
          }
       }
       if ( widget && l && t)
       {
         p.placeToPoint({left: l, top: t}); // we have valid paramters 
       }
       else
       {
         l =  Math.floor( ( qx.bom.Document.getWidth() / 2 ) - ( p.getWidth() / 2 ) );
         t =  Math.floor( ( qx.bom.Document.getHeight() / 2 ) - ( p.getHeight() / 2 ) );
         p.placeToPoint({left: l, top: t}); // place it in the middle of the screen 
       }
       p.show();      
     },
     
     /**
      * Hides the widget
      */
     hidePopup : function()
     {
       this.__loadingPopup.hide();
     }
   },

   /**
    * Destructor
    */
  destruct : function() {
    this._disposeObjects("__loadingPopup","this.__popupAtom");
  }   
});