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

/**
 * The sandbox object passed to the application modules and provides them
 * with an interface for the needed functionality. The sandbox has no 
 * access to the application core. See
 * http://developer.yahoo.com/yui/theater/video.php?v=zakas-architecture
 * http://www.slideshare.net/nzakas/scalable-javascript-application-architecture
 */
qx.Class.define("qcl.application.Sandbox",
{
  extend : qx.core.Object,
 
  
  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */  
  
  properties : 
  {
    
  },
  

  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * Constructor
   *  
   * @param core {logbuch.Core}
   */
  construct : function( core )
  {  
    this.base(arguments);
    if ( ! qx.Class.implementsInterface( core, qcl.application.Core ) ) 
    {
      this.error("Sandbox must be instantiated with an instance of qcl.application.Core");
    }
    
    // save in "private" variable
    this.__core = core;
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * The core application library
     * @type qx.application.Core
     */
    __core : null,
    
    /**
     * Subscribes to a message name
     * @param name {String} The name of the message
     * @param callback {Function} A function that is called when the message is 
     *    published 
     * @param context {Object} The context object
     * @return {void}
     */
    subscribe : function( name, callback, context )
    {
      this.__core.subscribe( name, callback, context );
    },
    
    /**
     * Unsubscribes from a message name
     * @param name {String} The name of the message
     * @param callback {Function} A function that is called when the message is 
     *    published 
     * @param context {Object} The context object
     * @return {void}
     */
    unsubscribe : function( name, callback, context )
    {
      this.__core.unsubscribe( name, callback, context );
    },    
    
    /**
     * Publishes a message
     * @param name {String}
     * @param message {unknown}
     * @return {void}
     */
    publish : function( name, message )
    {
      this.__core.publish( name, message );
    },
    
    /*
    ---------------------------------------------------------------------------
       USER MANAGEMENT
    ---------------------------------------------------------------------------
    */
    
    /**
     * Returns a qx.core.Object with the properties of the active user
     * @return {qx.core.Object}
     */
    getActiveUser: function()
    {
      return this.__core.getActiveUser();
    },
    
    /*
    ---------------------------------------------------------------------------
      CONFIG
    ---------------------------------------------------------------------------
    */
    
    /**
     * Returns qx.core.Object with values used for application layout
     * @return {qx.core.Object}
     */
    getLayoutConfig : function()
    {
      return this.__core.getLayoutConfig();
    }
    
    
  }
});