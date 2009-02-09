/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#resource(custom.image:image)

// List all static resources that should be copied into the build version,
// if the resource filter option is enabled (default: disabled)
#embed(qx.icontheme/32/status/dialog-information.png)
#embed(custom.image/test.png)

************************************************************************ */

/**
 * Your custom application
 */
qx.Class.define("custom.Application",
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

      var cont = new qx.ui.layout.HorizontalBoxLayout();
      cont.setLeft(10);
      cont.setTop(10);
      cont.setWidth("auto");
      cont.setHeight("auto");
      cont.addToDocument();

      var field = new qx.ui.form.TextField();
      field.setWidth(100);
      field.setHeight("auto");
      var btn = new qx.ui.component.DateChooserButton();
      btn.setMarginLeft(10);
      btn.setWidth(20);
      btn.setTargetWidget(field);
      btn.setDateFormatSize("short");

      cont.add(field, btn);

      var btnDelete = new qx.ui.form.Button("Delete");
      btnDelete.setLeft(10);
      btnDelete.setTop(70);
      btnDelete.addToDocument();
      btnDelete.addEventListener("execute", function(event) {
          if (cont) {
              cont.hide();
              cont.dispose();
              cont = null;
          }
          if (qx.locale.Manager.getInstance().getLocale().substr(0, 2) === "en") {
              qx.locale.Manager.getInstance().setLocale("ru");
          }
          else {
              qx.locale.Manager.getInstance().setLocale("en");
          }
      }, this);
    },


    /**
     * TODOC
     *
     * @type member
     */
    close : function()
    {
      this.base(arguments);

      // Prompt user
      // return "Do you really want to close the application?";
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
    "custom.resourceUri" : "./resource"
  }
});
