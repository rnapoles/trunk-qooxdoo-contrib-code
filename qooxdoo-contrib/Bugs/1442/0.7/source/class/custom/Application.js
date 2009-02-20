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


      // Create a textfield with keypress and keydown listener
      var input = new qx.ui.form.TextField().set({left: 10, top: 10})
      var labeld = new qx.ui.basic.Label("keydown:").set({left: 10, top: 40});
      var labelp = new qx.ui.basic.Label("keypress:").set({left: 10, top: 70});
      var keydown = new qx.ui.basic.Label().set({left: 100, top: 40});
      var keypress = new qx.ui.basic.Label().set({left: 100, top: 70});
  
      // Add an event listener
      
      input.addEventListener("keydown", function(e) {
        keydown.setText(e.getKeyIdentifier())
      });
      input.addEventListener("keypress", function(e) {
        keypress.setText(e.getKeyIdentifier())
        if (e.getKeyIdentifier() == "A") {
          e.preventDefault();
        }
      });
    
  
      // Document is the application root
      var doc = qx.ui.core.ClientDocument.getInstance();
  
      /*
      doc.addListener("keydown", function(e) 
      {keydown.setContent(e.getKeyIdentifier())}, this, true);
      doc.addListener("keypress", function(e) 
      {keypress.setContent(e.getKeyIdentifier())}, this, true);
      */
  
  
      // Add button to document at fixed coordinates
      doc.add(input);
      doc.add(labeld);
      doc.add(labelp);
      doc.add(keydown);
      doc.add(keypress);
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
