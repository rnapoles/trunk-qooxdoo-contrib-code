/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(gui2/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "gui2"
 */
qx.Class.define("gui2.Application",
{
  extend : qx.application.Inline,



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * This method contains the initial application code and gets called 
     * during startup of the application
     */
    main : function()
    {
      // Call super class
      this.base(arguments);

      var hugo = 123;

      function foo()
      {
          try {
              var x = 1+2;
          } catch(b) {
            alert(b);

          }

          alert(hugo); // alerts "undefined" in IE and "123" in other browsers
      }

      foo();

    }
  }
});
