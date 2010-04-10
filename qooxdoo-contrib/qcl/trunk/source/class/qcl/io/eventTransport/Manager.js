/* ************************************************************************

   qcl - the qooxdoo component library
  
   http://qooxdoo.org/contrib/project/qcl/
  
   Copyright:
     2007-2010 Christian Boulanger
  
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.
  
   Authors:
   *  Christian Boulanger (cboulanger)
  
************************************************************************ */

/**
 * FIXME Unfunctional
 */
qx.Class.define("qcl.io.eventTransport.Manager",
{
  extend : qx.core.Object,
  
  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    eventTransportImpl :
    {
      check : "qx.core.Object" // @todo Create interface
      nullable : false
    }
  },
  
  /*
  *****************************************************************************
      CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * Initializes the event transport implementation. Supported so far:
   * "JsonRpc"
   * @param type {String}
   */
  construct : function( type )
  {  
    this.base(arguments);
    switch (type)
    {
      case "JsonRpc":
        this.setEventTransportImpl( new qcl.io.eventTransport.JsonRpc );
        break;
        
      default: 
        this.error("Invalid event transport type '" + type + "'");
    }
  },
  
  /*
  *****************************************************************************
      MEMBERS
  *****************************************************************************
  */

  members :
  { 
    /* 
    ---------------------------------------------------------------------------
       WIDGETS
    ---------------------------------------------------------------------------
    */

    
    /* 
    ---------------------------------------------------------------------------
       PRIVATE MEMBERS
    ---------------------------------------------------------------------------
    */       

    
    /* 
    ---------------------------------------------------------------------------
       APPLY METHODS
    ---------------------------------------------------------------------------
    */   
    
    
    
    /* 
    ---------------------------------------------------------------------------
       API METHODS
    ---------------------------------------------------------------------------
    */    
   
    /**
     * Start the event transport
     */
    start : function()
    {
      this.getEventTransportImpl().start();
    },
    
    /**
     * Stop the event transport
     * @return {Void}
     */
    stop : function()
    {
      this.getEventTransportImpl().stop();
    }
    
  }
});