/* ************************************************************************

   qooxdoo - the new era of web development

   Copyright:
     2007 Christian Boulanger

   http://qooxdoo.org

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Christian Boulanger (cboulanger)

************************************************************************ */

/* ************************************************************************

************************************************************************ */

/**
 * This singleton manages the configuration settings of an application. In 
 * conjunction with a JsonRpc store, you can load the configuration data at 
 * startup and synchronize the config values with the server.
 * 
 * <pre>   
 * var myConfigStore = qcl.databinding.event.store.JsonRpc( 
 *   "path/to/server/index.php", "myapp.Config" 
 * ); 
 * myConfigStore.bind("model", qcl.config.Manager.getInstance(), "model");
 * myConfigStore.load();
 * 
 * The server must expose a "load"  method that returns the following response
 * data:
 * 
 * <pre> 
 * {
 *   keys : [ ... array of the names of the configuration keys ],
 *   values : [ ... array of the configuration values ... ]
 * }
 * </pre>
 * 
 * In order to send the changes back to the server, you can do the following
 *       
 * <pre>   
 * var cm = qcl.config.Manager.getInstance();   
 * cm.addListener("change",function(event){
 *   var key = event.getData();
 *   myConfigStore.execute("set",[ key, cm.getValue(key) ] );
 * });  
 * </pre>
 * 
 * This requires that the server exposess a "set" method with the parameters
 * key, value that saves the config value back into the database.
 * 
 */
qx.Class.define("qcl.config.Manager",
{
	extend : qx.core.Object,
  type : "singleton",

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
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    
    /*
     * The config manager's data model which can be
     * bound to a data store. It must be an qx.core.Object
     * with two properties, "keys" and "values", which
     * contain config keys and values, respectively and
     * will be converted to qx.data.Array objects
     */
    model :
    {
      check : "qx.core.Object",
      nullable : true,
      event : "changeModel",
      apply : "_applyModel"
    }
  },  
  
  /*
  *****************************************************************************
     EVENTS
  *****************************************************************************
  */
 
  events :
  {
    /* 
     * the change event is dispatched when the configuration data is
     * ready
     */
    "ready" : "qx.event.type.Event",
    
    /* 
     * the change event is dispatched with the name of
     * the changed config key
     */
    "change" : "qx.event.type.Data"
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
    _index : null,
    
    /*
    ---------------------------------------------------------------------------
      APPLY METHODS
    ---------------------------------------------------------------------------
    */
    
    _applyModel : function( model, old )
    {
      /* 
       * create index
       */
       this._index = {};
       
       var keys = model.getKeys();
       for( var i=0; i < keys.length; i++ )
       {
         var key = keys.getItem(i);
         this._index[ key ] = i;
         this.fireDataEvent( "change", key );
       }
       
       /*
        * attach event listener
        */
       model.getValues().addListener("changeBubble", function(event){
         var data = event.getData();
         var key = model.getKeys().getItem( data.name );
         if ( data.value != data.old )
         {
           this.fireDataEvent( "change", key );
         }
       },this);
        
       /*
        * inform the listeners that we're ready
        */
       this.fireEvent("ready"); 
    },
    
    /**
     * Returns the numerical index for a config key 
     * name
     * @param key {String}
     * @return {Integer}
     */
    _getIndex : function( key )
    {
      if ( ! this._index )
      {
        this.error("Model has not yet finished loading.");
      }
      var index = this._index[key];
      if ( index == undefined )
      {
        this.error("Invalid config key '" + key + "'.");
      }
      return index;
    },
    
    /*
    ---------------------------------------------------------------------------
      USER API
    ---------------------------------------------------------------------------
    */
    

		/**
		 * Returns a config value
		 * @param key {String}
		 * @return {var}
		 */
		getValue : function ( key )
		{
      var index = this._getIndex(key);
      return this.getModel().getValues().getItem( index );
		},
    
    /**
     * Sets a config value. This should automatically update
     * the server.
     * @param key {String}
     * @param value {Mixed} 
     */
    setValue : function (key, value)
    {
       var index = this._getIndex(key);
       this.getModel().getValues().setItem( index, value );
    },
    
    /**
     * Binds a config value to a target widget property in both
     * directions.
     * @param key {String}
     * @param targetObject {qx.core.Object}
     * @param targetPath {String}
     * @return
     */
    bindValue : function( key, targetObject, targetPath )
    {
      var index = this._getIndex( key );
      this.bind( "model.values[" + index + "]", targetObject, targetPath );
      targetObject.bind( targetPath, this, "model.values[" + index + "]" );
    }
    

  },

  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

  destruct : function()
  {
    this._disposeArray("_index");	
  }
});