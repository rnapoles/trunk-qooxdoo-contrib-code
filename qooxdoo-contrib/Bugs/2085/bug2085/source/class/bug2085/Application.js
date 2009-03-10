/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug2085/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug2085"
 */
qx.Class.define("bug2085.Application",
{
  extend : qx.application.Standalone,

  members :
  {
    main : function()
    {
      this.base(arguments);

      if (qx.core.Variant.isSet("qx.debug", "on"))
      {
        qx.log.appender.Native;
        qx.log.appender.Console;
      }

      var flashVariables = {
          flashVarText: "this is passed in via FlashVars"
      };

      var movieUri = qx.util.ResourceManager.toUri("bug2085/fo_tester.swf");
      this.debug(movieUri);
      
      var movieContainerElement = new qx.bom.Element.create("div");
      qx.bom.element.Style.set(movieContainerElement, "width", "800px");
      qx.bom.element.Style.set(movieContainerElement, "height", "600px");
      qx.bom.element.Style.set(movieContainerElement, "position", "absolute");
      qx.bom.element.Style.set(movieContainerElement, "top", "20px");
      qx.bom.element.Style.set(movieContainerElement, "left", "20px");
      document.body.appendChild(movieContainerElement);

      qx.bom.Flash.create(movieContainerElement, movieUri, "movie", flashVariables);
    }
  }
});
