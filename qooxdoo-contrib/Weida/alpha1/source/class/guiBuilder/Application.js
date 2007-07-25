/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */
/* ************************************************************************

#resource(image:image)
#require(qx.event.handler.DragAndDropHandler)

************************************************************************ */

/**
 * Your custom application
 */
qx.Class.define("guiBuilder.Application",
{
  extend : qx.application.Gui,


  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
       
    main : function(e)
    {
      this.base(arguments);

      // Define alias for custom resource path
      qx.io.Alias.getInstance().add("guiBuilder", qx.core.Setting.get("guiBuilder.resourceUri"));     
      
      guiBuilder.Config.getInstance().load();      
      guiBuilder.MainForm.getInstance().initUI();      
    },
    
    /**
     * TODOC
     *
     * @type member
     * @param e {Event} TODOC
     * @return {void}
     */
    close : function(e)
    {
      this.base(arguments);

      // Prompt user
      // return "qooxdoo application: Do you really want to close the application?";
    },


    /**
     * TODOC
     *
     * @type member
     * @param e {Event} TODOC
     * @return {void}
     */
    terminate : function(e) {
      this.base(arguments);
    }
  },




  /*
  *****************************************************************************
     SETTINGS
  *****************************************************************************
  */

  settings : {
    "guiBuilder.resourceUri" : "./resource"
  }
});
