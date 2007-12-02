/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2007 Christian Boulanger

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Christian Boulanger (cboulanger)

************************************************************************ */

/* ************************************************************************

#module(security.permission)
#require(qcl.auth.permission.Manager)

************************************************************************ */

/**
 * A permission object.
 * The object has a "granted" and a read-only "state" property. The "granted" property 
 * is set to true if the current user in priciple has the property. However, you
 * can attach condition functions to this object by the addCondition method. Only
 * if the "granted" property AND all of these conditions return true, the "state" 
 * property will be true.
 */
qx.Class.define("qcl.auth.permission.Permission",
{
  extend : qx.core.Target,

  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function(vName)
  {
    this.base(arguments);
    this.setNamedId(vName);
		this.__conditions = [];
		this.__granted = false;
		this.__state = false;
		this._manager = qcl.auth.permission.Manager.getInstance();
		this._manager.add(this);
  },

  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /**
     * Name of the permission. Should be a dot-separated name such as myapp.permissions.email.delete
     */
    namedId :
    {
      _fast       : true,
      setOnlyOnce : true,
      check       : "String",
			nullable		: false
    },

    /**
     * A description of the permission, optional
     */
    description :
    {
      _fast       : true,
      check       : "String"
    }
	
  },
	
  /*
  *****************************************************************************
     EVENTS
  *****************************************************************************
  */

  events :
  {
		"changeState" 	: "qx.event.type.DataEvent",
		"changeGranted" : "qx.event.type.DataEvent"
	},
	
  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * get all conditions
     * @return {Array}
     */
		getConditions : function()
		{
			return this.__conditions;
		},
		
		/**
     * adds a condition for the permisson
     *
     * @param conditionFunc {Function} callback function
     * @param context {Object} The execution context of the callback (i.e. "this")
     * @return {Boolean} Success
     */
    addCondition : function(conditionFunc, context)
    {
      if (typeof conditionFunc != "function")
      {
        this.error("No callback function supplied!");
        return false;
      }

      if (this.hasCondition(conditionFunc,context))
      {
        this.warn("Condition has already been added.");
        return false;
      }
      else
      {
        // add a condition
        this.getConditions().push({
          'condition' : conditionFunc,
          'context'   : context || null
        });

        return true;
      }
    },


    /**
     * checks if condition has already been added      
     * 
     * @param conditionFunc {Function} Callback Function
     * @param context {Object} execution context
     * @return {Boolean} Whether condition has been added
     */
    hasCondition : function(conditionFunc, context)
    {
			var conditions = this.getConditions(); 
      for (var i=0; i<conditions.length; i++)
      {
        if (  conditionFunc 
            && typeof conditionsFunc == "object" 
            && conditions[i].condition == conditionsFunc 
						&& conditions[i].context == (context || null)) 
				{
          return true;
        }
      }

      return false;
    },


    /**
     * remove a condition
     *
     * @param conditionFunc {Function} Callback Function
     * @param context {Object} execution context
     * @return {Boolean} Whether condition was removed or not
     */
    removeCondition : function(conditionFunc, context)
    {
      var conditions = this.getConditions();

      for (var i=0; i<conditions.length; i++)
      {
        if (conditions[i].condition == conditionsFunc 
						&& conditions[i].context == (context || null)) 
				{
          conditions.splice(i, 1);
          return true;
        }
      }
			return false;
		},
		
		/**
		 * checks if all conditions are satisfied
		 * @return {Boolean} true if all conditions are satisfied
		 */
		_satifiesAllConditions : function()
		{
      var conditions = this.getConditions();
			
      for (var i=0; i<conditions.length; i++)
      {
        var conditionsFunc = conditions[i].condition; 
				var context =  conditions[i].context;
				if ( ! conditionsFunc.call(context) ) return false; 
      }
			return true;	
		},

		/**
		 * gets state
		 */
		getGranted : function()
		{
			return this.__granted;
		},
		
		
		/**
		 * sets the permission grant and dispatches a changeGranted event.
		 * if the state has changed, dispatches changeState event.
		 * @return {Boolean} true if state has changed, false if not.
		 */
		setGranted : function( granted )
		{
			this.__granted = granted;
			this.createDispatchDataEvent("changeGranted", granted );

			// if this is a wildcard permission, set all dependent permissions
			var myName = this.getNamedId(); 
			var pos = myName.indexOf("*");
			if ( pos > -1 )
			{
				this._manager.getNamedIds().forEach(function(name)
				{
					if (pos == 0 || myName.substr(0, pos) == name.substr(0, pos))
					{
						if (name.indexOf("*") < 0) // other wildcard permissions do not need to be updated
						{
							this._manager.getByName(name).setGranted(granted);
						}
					}	
				},this);
			}

			var state = this.getState(); 
			this.createDispatchDataEvent( "changeState", state );
			return state;
		},

		/**
		 * gets state
		 */
		getState : function()
		{
			return this.__granted && this._satifiesAllConditions(); 
		},
		
		/**
		 * updates the current state and dispatches events
		 */
		update : function()
		{
      var state = this.getState();
      //console.log("Updating "+ this.getNamedId() + ": " + state);
      this.createDispatchDataEvent( "changeState", state );
		}		
		
  },

  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

  destruct : function() {
    this._disposeFields("__conditions");
		this._manager.remove(this);
  }
});
