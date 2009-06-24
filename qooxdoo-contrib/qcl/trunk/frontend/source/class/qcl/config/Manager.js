/* ************************************************************************

   qooxdoo - the new era of web development

   Copyright:
     2007-2009 Christian Boulanger

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
 * You can bind any property of an object to a config value by using
 * the {@link #bindValue} method.
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
     * Dispatched when the configuration data is ready
     */
    "ready" : "qx.event.type.Event",
    
    /* 
     * Dispatched with the name of the changed config key when
     * the config value changes, regardless of whether the change
     * was caused be the client or server.
     */
    "change" : "qx.event.type.Data",
    
    /* 
     * Dispatched with the name of the changed config key when
     * the config value changes on the client
     */
    "clientChange" : "qx.event.type.Data"    
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
       this.fireDataEvent("clientChange", key);
    },
    
    /**
     * Binds a config value to a target widget property, optionally in both
     * directions.
     * @param key {String}
     * @param targetObject {qx.core.Object}
     * @param targetPath {String}
     * @param updateSelfAlso {Boolean} Optional, default undefined. If true,
     *  change the config value if the target property changes
     * @return
     */
    bindValue : function( key, targetObject, targetPath, updateSelfAlso )
    {
      if ( ! this.getModel() )
      {
        this.error("You cannot bind a config key before config values have been loaded!");
      }
      
      /*
       * if the target path is a property and not a property chain,
       * use event listeners. This also solves a problem with a bug
       * in the SigleValueBinding implementation, 
       * see http://www.nabble.com/Databinding-td24099676.html
       */
      if ( targetPath.indexOf(".") == -1 )
      {
        /*
         * set the initial value
         */
        //try{
        targetObject.set( targetPath, this.getValue(key) );
        //}catch(e){alert(e);}
        
        /*
         * add a listener to update the target widget property when 
         * config value changes
         * @todo: add converter
         */
        this.addListener( "change", function(e){       
          var changeKey = e.getData();
          if( changeKey == key )
          {
            //console.warn("Updating property "+targetPath+" from config key "+key+":"+this.getValue(key));
            targetObject.set(targetPath,this.getValue(key));
          }
        },this);

        /*
         * update config value if target widget property changes
         */
        if ( updateSelfAlso )
        {
          targetObject.addListener(
            "change" + targetPath.substr(0,1).toUpperCase() + targetPath.substr(1),
            function(e)
            {
              var value= e.getData();
              //console.warn("Updating config key "+key+" with "+value);
              this.setValue(key,value);
            },
            this
          );
        }
      }
      
      /*
       * use SigleValueBinding, this requires patching the core qooxdoo
       * code currently, see link above
       * @todo: add converter
       */
      else
      {
        /*
         * get index of config key
         */
        var index = this._getIndex( key );        
        
        /*
         * update the target widget property when config value changes
         */
        targetObject.bind( targetPath, this, "model.values[" + index + "]" );
        
        /*
         * update config value if target widget property changes
         */
        if ( updateSelfAlso )
        {
          this.bind( "model.values[" + index + "]", targetObject, targetPath );
        }
      }
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