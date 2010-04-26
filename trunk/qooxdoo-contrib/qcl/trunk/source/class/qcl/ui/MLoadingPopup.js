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

/* ************************************************************************
#asset(qcl/ajax-loader.gif)
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
      * @param options {Map}
      */
     createPopup : function( options )
     {
        if ( options === undefined )
        {
          options = {};
        }
        else if( ! qx.lang.Type.isObject( options ) )
        {
          this.error("Invalid argument.");
        }
        
        this.__loadingPopup = new qx.ui.popup.Popup(new qx.ui.layout.Canvas()).set({
          decorator: "group",
          minWidth  : 100,
          minHeight : 30,
          padding   : 10
        });
        this.__popupAtom = new qx.ui.basic.Atom().set({
          label         : options.label || "Loading ...",
          icon          : options.icon || "qcl/ajax-loader.gif",
          rich          : options.rich || true,
          iconPosition  : options.iconPosition || "left",
          show          : options.show || "both"
        });
        this.__loadingPopup.add( this.__popupAtom );
     },
     
     /**
      * Shows the popup centered over the widget
      * @param label {String}
      * @param target {qx.ui.core.Widget} Optional target widet. If not given,
      * use the including widget.
      */
     showPopup : function( label, target )
     {
       if ( label )
       {
          this.__popupAtom.setLabel( label );
       }
       
       var p = this.__loadingPopup;
       var c,l,t,w,h;
       if ( target === undefined )
       {
         target = this;
       }
       try
       {
         c = target.getContentLocation();
         var w = c.right - c.left;
         var h = c.bottom - c.top;
         l = Math.floor( c.left + ( w / 2) - ( p.getWidth() / 2 ) ); 
         t = Math.floor( c.top + ( h / 2) - ( p.getHeight() / 2) ); 
         p.placeToPoint({left: l, top: t}); 
       }
       catch(e)
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