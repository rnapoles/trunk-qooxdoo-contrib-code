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
	extend : qx.core.Target,
  type : "singleton",

  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function()
  {
		this.base(arguments);
    this.setDataBinding(true);
    
    // subscribe to server message with change key events
    qx.event.message.Bus.subscribe("qcl.config.messages.server.changeConfigKey",function(message){
      var data = message.getData();
      this.set(data,true); // do not notify server since change originates on server
    });
  },
  
  /*
  *****************************************************************************
     EVENTS
  *****************************************************************************
  */
 
  events :
  {
    "changeConfigMap" : "qx.event.type.DataEvent"
  },

  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /**
     * the map of configurations settings
     */
    configMap :
    {
      check  : "Object",
      event  : "changeConfigMap",
      init   : []  
    }	
  },
  
  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
		/**
		 * gets a config value
		 */
		get : function ( namedId )
		{
			return this.getConfigMap()[namedId].value;
		},

    /**
		 * sets a config value
		 * @param {Map} data key-value pairs with config data
		 * @param {Boolean} noServerUpdate If true, do not notify server of change
		 * dispatches changeConfigMap data event
		 */
		set : function ( data, noServerUpdate )
		{
			var configMap = this.getConfigMap(); 
      
      // set data
      for ( key in data )
      {
        if ( typeof data[key] != configMap[key].type )
        {
          this.error("Invalid value '" + data[key] + "' Should be " + configMap[key].type + "but is " + typeof data[key] );
        }                
        configMap[key].oldValue = configMap[key].value; 
        configMap[key].value = data[key];
      }
      
      //dispatch event
      this.createDispatchDataEvent("changeConfigMap",configMap);
      
      // update server unless update is prevented
      if ( ! noServerUpdate )
      {
        this.updateServer( data );  
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
    this._disposeFields("_index");		
  }
});

