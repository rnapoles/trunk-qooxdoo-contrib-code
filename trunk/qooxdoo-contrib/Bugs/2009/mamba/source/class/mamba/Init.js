
/**
 * Handles the initialization of mamba.
 */
qx.Class.define("mamba.Init",
{
  statics :
  {
    /**
     * Initializes mamba. Will be called automatically when the page was
     * completely loaded.
     *
     * @return {void}
     */
    init : function() {
      // Init logging
      qx.log.Logger.__serialize_orig = qx.log.Logger.__serialize;
      qx.log.Logger.__serialize = function(value, deep){
        var type = this.__detect(value);
        if (type == "error") {
          return {
            type : "error",
            text : value.toString() + "\n" + qx.dev.StackTrace.getStackTraceFromError(value).join("\n")
          };
        } else {
          return this.__serialize_orig(value, deep);
        }
      }

      // Check for quirks mode
      //alert('Site runs in ' + ((document.compatMode == 'CSS1Compat') ? 'standards' : 'quirks') + ' mode.');

      // Flag used in oninit function to prohibit adding new handlers while init
      // is running.
      // This happened in FF 3.0.5 after a DOM element had been appended to the DOM,
      // which caused the repeated execution of oninit in an existing DOM element,
      // whose handlers had been added to the handler array already.
      window._runningInit = true;

      // Execute all oninit functions
      for (var i = 0; i < window._oninitRegs.length; i++) {
        try {
          window._oninitRegs[i]();
        } catch (exc) {
          qx.log.Logger.error(mamba.Init, "Calling oninit handler #" + i + " failed", exc);
        }
      }

      window._oninitRegs = null;

      // Replace the oninit method with a function that executes the handler immediately
      // So oninit works even after initialization
      window.oninit = function(handler) {
        handler();
      };

      // Remove the start blocker that showed the wait cursor and blocked all
      // clicks until the page was loaded and JavaScript was initialized
      $("#ui-blocker").hide();
    }
  }
});

if (window.qxloader == null)
{
  // This is the build version
  // -> Call the init function after the document was loaded
  $(document).ready(function() {
    mamba.Init.init();
  });
}
else
{
  // This is the source version
  // -> Call the init function after all classes have been loaded
  // Workaround: Normally this should be:
  //       qx.event.Registration.addListener(window, "ready", mamba.Init.init);
  //   But if we would do this that way, we would need the whole qooxdoo event
  //   system, which would be a code overhead we don't want.
  if (qx.event == null) {
    qx.event = {};
  }

  if (qx.event.handler == null) {
    qx.event.handler = {};
  }

  qx.event.handler.Application = { ready : mamba.Init.init };
}