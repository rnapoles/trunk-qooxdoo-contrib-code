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
 * This singleton manages the configuration settings of an application. It loads
 * the configuration keys at startup and can then be queried. If the active user
 * changes a configuration, the change is sent to the backend configuration manager.
 * If a different user is logged in at the same time and changes a configuration value,
 * the backend notifies this manager and it updates accordingly.
 * A single configuration setting has the following properties:
 * <ul>
 * <li>a key (a dot-separated name similar to a classname)</li>
 * <li>a type, which can be "string", "number" and "Boolean"</li>
 * <li>a value, which must conform to the type</li>
 * <li>a read permission, i.e. unless null, the active user must have this permissions
 * to be able to read the configuration setting at all. this is especially useful for
 * configuration that is only needed on the server.</li>
 * <li>a corresponding write permission</li>
 * <li>a user id/status, which, however, only matters on the backend. It
 * mandates that the value is unique (null) or a default value that can have
 * user variants (0). Each user variant then has the user id as value for this property.
 * In this fashion, it is possible that each user, if allowed, can have his or her
 * own preference setting.</li>
 * </ul>
 * 
 * Requires the qcl.databinding.simple.MDataManager mixin applied to qx.core.Target.
 * 
 * The singleton must call updateClient() and won't answer any any individual "get" or 
 * "set" requests before the server response has arrived. If you want to retrieve
 * configurations settings during startup, you need to attach a "changeConfigMap" 
 * event listener to this singleton and work with the config values in the event
 * handling function. 
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
         this._index[ keys.getItem(i) ] = i;
       }
       
       /*
        * attach event listeners
        */
       model.addListener("changeBubble", function(event){
         var key = event.getData().name;
         console.log(name);
         //this.fireDataEvent( "changeBubble",  );
       },this);
    },
    
    /**
     * Returns the numerical index for a config key 
     * name
     * @param key {String}
     * @return {Integer}
     */
    _getIndex : function( key )
    {
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
		getKey : function ( key )
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
    setKey : function (key, value)
    {
       var index = this._getIndex(key);
       this.getModel().getValues().setItem( index, value );
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