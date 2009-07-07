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
#embed(qx.icontheme/48/status/dialog-information.png)
************************************************************************ */


/**
 * Alert popup singleton
 */
qx.Class.define("access.components.dialog.Alert",
{
  extend : access.components.dialog.Dialog,
 
  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */     
  members :
  {
    
    /*
    ---------------------------------------------------------------------------
       WIDGET LAYOUT
    ---------------------------------------------------------------------------
    */     
    
    /**
     * Create the main content of the widget
     */
    _createWidgetContent : function()
    {      

      /*
       * groupbox
       */
      var groupboxContainer = new qx.ui.groupbox.GroupBox().set({
        contentPadding: [16, 16, 16, 16]
      });
      groupboxContainer.setLayout( new qx.ui.layout.VBox(10) );
      this.add( groupboxContainer );

      var hbox = new qx.ui.container.Composite;
      hbox.setLayout( new qx.ui.layout.HBox(10) );
      groupboxContainer.add( hbox );
      
      /*
       * add image 
       */
      this.__image = new qx.ui.basic.Image("icon/48/status/dialog-information.png");
      hbox.add( this.__image );
      
      /*
       * Add message label
       */
      this.__message = new qx.ui.basic.Label();
      this.__message.setRich(true);
      this.__message.setWidth(200);
      this.__message.setAllowStretchX(true);
      hbox.add( this.__message );    
      
      /* 
       * Ok Button 
       */
      var okButton = this._createOkButton();
      
      /*
       * buttons pane
       */
      var buttonPane = new qx.ui.container.Composite;
      var bpLayout = new qx.ui.layout.HBox();
      bpLayout.setAlignX("center");
      buttonPane.setLayout(bpLayout);
      buttonPane.add(okButton);
      groupboxContainer.add(buttonPane);
    }
  }    
});