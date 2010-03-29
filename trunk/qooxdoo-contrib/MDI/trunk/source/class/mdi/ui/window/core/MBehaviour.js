/* ************************************************************************

   Copyright:


   License:

   Authors:
     Simon Bull

************************************************************************ */

/* ************************************************************************



************************************************************************ */


/**
 * This mixin implements mdi.ui.window.core.IBehaviour.
 *
 * These methods can all be called in either of two ways; either by an
 * IManager (when it is propegating a behaviour out to widgets other than
 * the widget which the user has clicked), or by a Widget (in direct response
 * to a user interaction).
 *
 * The presence of a non-null invoker argument is used to determine which
 * "direction" the call is being made in.  When invoker is non-null, it is
 * a call "down" from the window manager.  When invoker is null, it is a call
 * "up" from the rendered widget.
 */
qx.Mixin.define("mdi.ui.window.core.MBehaviour",
{


  members :
  {


    //  -----  Implement IBehaviour  -----


    /**
     * Select this window representation.
     *
     * @type member
     * @param invoker {var} The instance which invoked this method.
     *        If this invocation is is a call "down" from the WindowManager,
     *        then invoker must be an instance of mdi.ui.window.core.IRenderer.
     *        If this invocation is a call "up" from a Widget, then invoker
     *        must be null.
     * @return {void}
     */
    select : function(invoker)
    {
        // If no invoker is passed assume that this call originated from a user
        // interation with the DesktopItem widget. In this case we need to notify
        // WindowManager so that it can propegate calls out to all IRenderers.
        if (!invoker)
        {
            this.getWindowManager().selectWindow(this.getModel(), this.getRenderer());
        }

        // Execute the requested behaviour
        this.__select();
    },


    /**
     * Minimise this window representation.
     *
     * @type member
     * @param invoker {var} The instance which invoked this method.
     *        If this invocation is is a call "down" from the WindowManager,
     *        then invoker must be an instance of mdi.ui.window.core.IRenderer.
     *        If this invocation is a call "up" from a Widget, then invoker
     *        must be null.
     * @return {void}
     */
    minimise : function(invoker)
    {
        // If no invoker is passed assume that this call originated from a user
        // interation with the DesktopItem widget. In this case we need to notify
        // WindowManager so that it can propegate calls out to all IRenderers.
        if (!invoker)
        {
            this.getWindowManager().minimiseWindow(this.getModel(), this.getRenderer());
        }

        // Execute the requested behaviour
        this.__minimise();
    },


    /**
     * Maximise this window representation.
     *
     * @type member
     * @param invoker {var} The instance which invoked this method.
     *        If this invocation is is a call "down" from the WindowManager,
     *        then invoker must be an instance of mdi.ui.window.core.IRenderer.
     *        If this invocation is a call "up" from a Widget, then invoker
     *        must be null.
     * @return {void}
     */
    maximise : function(invoker)
    {
        // If no invoker is passed assume that this call originated from a user
        // interation with the DesktopItem widget. In this case we need to notify
        // WindowManager so that it can propegate calls out to all IRenderers.
        if (!invoker)
        {
            this.getWindowManager().maximiseWindow(this.getModel(), this.getRenderer());
        }

        // Execute the requested behaviour
        this.__maximise();
    },


    /**
     * Restore this window representation.
     *
     * @type member
     * @param invoker {var} The instance which invoked this method.
     *        If this invocation is is a call "down" from the WindowManager,
     *        then invoker must be an instance of mdi.ui.window.core.IRenderer.
     *        If this invocation is a call "up" from a Widget, then invoker
     *        must be null.
     * @return {void}
     */
    restore : function(invoker)
    {
        // If no invoker is passed assume that this call originated from a user
        // interation with the DesktopItem widget. In this case we need to notify
        // WindowManager so that it can propegate calls out to all IRenderers.
        if (!invoker)
        {
            this.getWindowManager().restoreWindow(this.getModel(), this.getRenderer());
        }

        // Execute the requested behaviour
        this.__restore();
    },


    /**
     * Open this window representation.
     *
     * @type member
     * @param invoker {var} The instance which invoked this method.
     *        If this invocation is is a call "down" from the WindowManager,
     *        then invoker must be an instance of mdi.ui.window.core.IRenderer.
     *        If this invocation is a call "up" from a Widget, then invoker
     *        must be null.
     * @return {void}
     */
    open : function(invoker)
    {
        // If no invoker is passed assume that this call originated from a user
        // interation with the DesktopItem widget. In this case we need to notify
        // WindowManager so that it can propegate calls out to all IRenderers.
        if (!invoker)
        {
            this.getWindowManager().openWindow(this.getModel(), this.getRenderer());
        }

        // Execute the requested behaviour
        this.__open();
    },


    /**
     * Close this window representation.
     *
     * @type member
     * @param invoker {var} The instance which invoked this method.
     *        If this invocation is is a call "down" from the WindowManager,
     *        then invoker must be an instance of mdi.ui.window.core.IRenderer.
     *        If this invocation is a call "up" from a Widget, then invoker
     *        must be null.
     * @return {void}
     */
    close : function(invoker)
    {
        // If no invoker is passed assume that this call originated from a user
        // interation with the DesktopItem widget. In this case we need to notify
        // WindowManager so that it can propegate calls out to all IRenderers.
        if (!invoker)
        {
            this.getWindowManager().closeWindow(this.getModel(), this.getRenderer());
        }

        // Execute the requested behaviour
        this.__close();
    }

  }

});
