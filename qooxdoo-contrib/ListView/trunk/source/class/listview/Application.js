/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)

************************************************************************ */

/**
 * Your listview application
 */
qx.Class.define("listview.Application",
{
  extend : qx.application.Gui,




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * TODOC
     *
     * @type member
     */
    main : function()
    {
      this.base(arguments);
      
      // Merge appearance theme of listview widget into current appearance theme
      qx.Theme.patch(qx.theme.manager.Appearance.getInstance().getAppearanceTheme(),
        listview.theme.classic.Appearance);      

      var ld = [];
      var lt = [ "Image", "Text", "PDF", "Illustration", "Document" ];
    
      for (var i=0, t; i<1000; i++)
      {
        t=Math.round(Math.random()*4);
        ld.push({ name : { text : "File " + i }, size : { text : Math.round(Math.random()*100) + "kb" }, type : { text : lt[t] }, modified : { text : "Nov " + Math.round(Math.random() * 30 + 1) + " 2005" }, rights: { text : "-rw-r--r--" }});
      };
    
      var lc =
      {
        name : { label : "Name", width : 100, type : "text" },
        size: { label : "Size", width : 50, type : "text", align : "right", resizable : false },
        type : { label : "Type", width : 80, type : "text" },
        modified : { label : "Last Modified", width : 120, type : "text" },
        rights : { label : "Rights", width: 80, type : "text" }
      };
    
      var lv = new qx.ui.listview.ListView(ld, lc);
    
      lv.setWidth(500);
      lv.setBottom(20);
      lv.setLocation(20, 20);
    
      qx.ui.core.ClientDocument.getInstance().add(lv);
    
    
    
    
      var chk1 = new qx.ui.form.CheckBox("Enable Live Resize");
      chk1.setLeft(540);
      chk1.setTop(20);
      qx.ui.core.ClientDocument.getInstance().add(chk1);
    
      chk1.addEventListener("changeChecked", function(e) {
        lv.setLiveResize(e.getData());
      });
    
      var chk2 = new qx.ui.form.CheckBox("Disable ListView");
      chk2.setLeft(540);
      chk2.setTop(50);
      qx.ui.core.ClientDocument.getInstance().add(chk2);
    
      chk2.addEventListener("changeChecked", function(e) {
        lv.setEnabled(!e.getData())
      });

    },


    /**
     * TODOC
     *
     * @type member
     */
    terminate : function() {
      this.base(arguments);
    }
  },




  /*
  *****************************************************************************
     SETTINGS
  *****************************************************************************
  */

  settings : {
    "listview.resourceUri" : "./resource"
  }
});
