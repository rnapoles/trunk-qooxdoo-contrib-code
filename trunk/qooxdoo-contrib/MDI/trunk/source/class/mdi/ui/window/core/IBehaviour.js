/* ************************************************************************

   Copyright:


   License:

   Authors:
     Simon Bull

************************************************************************ */

/* ************************************************************************

#asset(mdi/*)

************************************************************************ */

/**
 *
 * This is the minimum interface which must be implemented by all MDI
 * object which have Windowing behaviour.
 *
 * This interface is implemented by Model, DockItem and DesktopItem, for
 * example.
 */
qx.Interface.define("mdi.ui.window.core.IBehaviour",
{


  members :
  {


    /**
     * Open this window representation.
     *
     * An implementation is provided by mdi.ui.window.core.MBehaviour.
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
        //this.assertInterface(model, mdi.ui.window.core.IRenderer);
    },


    /**
     * Select this window representation.
     *
     * An implementation is provided by mdi.ui.window.core.MBehaviour.
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
        //this.assertInterface(model, mdi.ui.window.core.IRenderer);
    },


    /**
     * Minimise this window representation.
     *
     * An implementation is provided by mdi.ui.window.core.MBehaviour.
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
        //this.assertInterface(model, mdi.ui.window.core.IRenderer);
    },


    /**
     * Maximise this window representation.
     *
     * An implementation is provided by mdi.ui.window.core.MBehaviour.
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
        //this.assertInterface(model, mdi.ui.window.core.IRenderer);
    },


    /**
     * Restore this window representation.
     *
     * An implementation is provided by mdi.ui.window.core.MBehaviour.
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
        //this.assertInterface(model, mdi.ui.window.core.IRenderer);
    },


    /**
     * Close this window representation.
     *
     * An implementation is provided by mdi.ui.window.core.MBehaviour.
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
        //this.assertInterface(model, mdi.ui.window.core.IRenderer);
    }


    /**
     * Private widget behaviour implementation.
     *
     * Invoked from mdi.ui.window.core.MBehaviour#open.
     */
//    __open : function() {},


    /**
     * Private widget behaviour implementation.
     *
     * Invoked from mdi.ui.window.core.MBehaviour#select.
     */
//    __select : function() {},


    /**
     * Private widget behaviour implementation.
     *
     * Invoked from mdi.ui.window.core.MBehaviour#minimise.
     */
//    __minimise : function() {},


    /**
     * Private widget behaviour implementation.
     *
     * Invoked from mdi.ui.window.core.MBehaviour#maximise.
     */
//    __maximise : function() {},


    /**
     * Private widget behaviour implementation.
     *
     * Invoked from mdi.ui.window.core.MBehaviour#restore.
     */
//    __restore : function() {},


    /**
     * Private widget behaviour implementation.
     *
     * Invoked from mdi.ui.window.core.MBehaviour#close.
     */
//    __close : function() {}

  }
});