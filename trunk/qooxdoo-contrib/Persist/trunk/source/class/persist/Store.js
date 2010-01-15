/* ************************************************************************

   Copyright:
     2007-2010 Christian Boulanger

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Christian Boulanger (cboulanger)

************************************************************************ */

/* ************************************************************************
#ignore(Persist.Store)
************************************************************************ */
/**
 * This is a thin wrapper around the persistjs library
 * See http://pablotron.org/software/persist-js/
 */
qx.Class.define("persist.Store",
{
  extend : qx.core.Object,
  
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * Contructor. Creates a new browser store
   * @param name {String}
   */
  construct : function( name )
  {
    this.base(arguments);
    this.__store = new Persist.Store(name);
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
       PRIVATE MEMBERS
    ---------------------------------------------------------------------------
    */       
    __store : null,
    
    /*
    ---------------------------------------------------------------------------
       API METHODS
    ---------------------------------------------------------------------------
    */
    
    /**
     * Fetches the value stored under the given key and calls the callback
     * function with the value. The callback is necessary for cross-browser
     * compatibility
     * 
     * @param key {String}
     * @param callback {Function}
     */
    get : function( key, callback )
    {
      this.__store.get( key, callback );
    },
    
    /**
     * Saves the given value to the store under the given key
     * @param key {String}
     * @param value {String}
     */
    set : function ( key, value )
    {
      this.__store.set( key, value );
    }
  }
});