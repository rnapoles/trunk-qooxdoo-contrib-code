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
 * 
 */
qx.Class.define("qcl.application.PluginManager",
{
  extend : qx.core.Object,
  
  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    preventCache :
    {
      check : "Boolean",
      init  : "false"
    }
  },
  
  /*
  *****************************************************************************
     EVENTS
  *****************************************************************************
  */
 
  events :
  {
    /**
     * Dispatched when the plugins have been loaded
     * @type event
     */
    "loadingPlugin" : "qx.event.type.Data",
    
    /**
     * Dispatched when the plugins have been loaded
     * @type message
     */
    "pluginsLoaded" : "qx.event.message.Message"
        
  },
  
  /*
  *****************************************************************************
      CONSTRUCTOR
  *****************************************************************************
  */

  construct : function()
  {  
    this.base(arguments); 
  },
  
  /*
  *****************************************************************************
      MEMBERS
  *****************************************************************************
  */

  members :
  { 
    loadPlugins : function( callback, context )
    {
      var app = this.getApplication();
      var service = app.getApplicationId() + ".plugin";
      
      /*
       * get script url arry from server
       */
      app.getRpcManager().execute(
        service, "getPluginData", [],
        function( pluginData )
        {
          
          if ( ! qx.lang.Type.isArray( pluginData ) )
          {
            this.error( service + ".getPluginData did not return an array." );
          }
          
          var sum = pluginData.length;
          var count = 0;
          var self = this;
          
          /*
           * function to sequentially load all plugins
           * @todo: why not load them in parallel? what if plugins
           * are dependent on each other?
           */
          (function loadScript(){
            
            /*
             * if no more scripts to load, we're done
             */
            if ( ! pluginData.length )
            {
              /*
               * dispatching message
               */
              qx.event.message.Bus.dispatch( new qx.event.message.Message("pluginsLoaded") );
              
              /*
               * returning to callback
               */
              if( typeof callback == "function" )
              {
                callback.call( context );
              }
              return;
            }
            
            /*
             * at least one more script left, load next one
             * with this function as callback
             */
            var data = pluginData.shift();
            count++;
            self.fireDataEvent("loadingPlugin", {
              'name'  : data.name,
              'url'   : data.url + ( self.getPreventCache() ? ( "?nocache" + (new Date).getTime() ) : "" ),
              'count' : count,
              'sum'   : sum
            });
            var loader = new qx.io.ScriptLoader();
            loader.load( data.url, loadScript );
          })();
          
        },this
      );
    }
  }
});