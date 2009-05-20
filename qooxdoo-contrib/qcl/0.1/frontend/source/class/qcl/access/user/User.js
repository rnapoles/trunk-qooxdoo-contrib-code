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

#module(security.user)

************************************************************************ */

/**
 * A user object
 */
qx.Class.define("qcl.access.user.User",
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
		this.__roles = {};
		this._manager = qcl.access.user.Manager.getInstance();
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
     * login name of the user
     */
    namedId :
    {
      _fast       : true,
      setOnlyOnce : true,
      check       : "String",
			nullable		: false
    },

    /**
     * A hash map of user data
     */
    data :
    {
      check       : "Object",
			event				: "changeData"
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
     * get all role objects
     * @return {Map}
     */
		getRoles : function()
		{
			return this.__roles;
		},
		
		/**
		 * get all role names
		 * @return {Array} 
		 */
		getRoleNames : function()
		{
			var roles = this.getRoles();
			var names = [];
			for (var name in roles)
			{
				names.push(name);
			}
			return names;
		},
	
		/**
     * set list of roles
     * @param permissions {Array} Array of role names or objects
     * @return {Array} Array of role objects
     */
		setRoles : function(roles)
		{
			if ( ! qx.util.Validation.isValidArray(roles) )
			{
				this.error("Argument must be an array of string values or qcl.access.role.Role objects.");
			}
			
			// clear permissions list
			this.__roles = {};
			
			// add permissions
			roles.forEach(function(ref){
				this.addRole(ref);
			},this);
			
			return this.getRoles();
		},
		
		/**
     * adds a role for the user
     *
     * @param roleRef {String|qcl.access.role.Role} name of role object or object reference
     * @return {Boolean} Success
     */
    addRole : function(roleRef)
    {
      // if there are multiple arguments, add others first
			if ( arguments.length > 1)
			{
				for (var i=1; i < arguments.length; i++)
				{
					this.addRole(arguments[i]);
				}
			}
			
			// check if role is registered with manager and this user
			var role_manager 	= qcl.access.role.Manager.getInstance();
			var name					= role_manager.getNamedId(roleRef);
			var object				= role_manager.getObject(roleRef);
			var roles 				= this.getRoles();
			
			if ( name && roles[name] )
      {
        this.info("Role " + name +  " has already been added.");
        return false;
      }
			else if ( name )
      {
        // add a role
        roles[name] = object;
				// todo: dispatch event
        return true;
      }
			else
			{
				this.error("Invalid role: " + roleRef );	
			}
			return true;
    },

    /**
     * checks if role has already been added      
     * 
     * @param roleRef {String|qcl.access.role.Role} name of role object or object reference
     * @return {Boolean} Whether role has been added
     */
    hasRole : function(roleRef)
    {
			var name 	= this._manager.getNamedId(roleRef); 
      var roles = this.getRoles();
			return ( typeof roles[name] == "object" );
    },


    /**
     * remove a role
     *
     * @param roleRef {String|qcl.access.role.Role} name of role object or object reference
     * @return {Boolean} Whether role was removed or not
     */
    removeRole : function(roleRef)
    {
			var name = qcl.access.role.Manager.getInstance().getNamedId(roleRef); 
      if ( ! name ) return false;
			var roles = this.getRoles();
			delete roles[name];
			return true;
		},

    /**
     * has permission through an attached role
     *
     * @param permissionRef {String|qcl.access.permission.Permission} name of permission object or object reference
     * @return {Boolean} Whether user has permission
     */
    hasPermission : function(permissionRef)
    {
			var roles = this.getRoles();
			for ( var role in roles )
			{
				if ( roles[role].hasPermission(permissionRef) )
				{
					return true;
				}	
			}
			return false;
		},

		/**
		 * gets name of permissions
		 * @return {Map} Hashmap of qcl.access.permission.Permission objects, key is name
		 */
		getPermissions : function()
		{
			var roles = this.getRoles();
			var perms = {};
			for ( var role in roles )
			{
				var rolePerms = roles[role].getPermissions();
				for ( var rp in rolePerms )
				{
					perms[rp] = rolePerms[rp];	
				}
			}
			return perms;
		},
		
		/**
		 * gets name of permissions
		 * @return {Array} Array of permission names
		 */
		getPermissionNames : function()
		{
			var roles = this.getRoles();
			var perms = [];
			for ( var role in roles )
			{
				perms = perms.concat(roles[role].getPermissionNames());	
			}
			return perms;
		},
		
		/**
		 * broadcasts user permissions through message bus
		 */
		broadcastPermissions : function()
		{
			var perms = this.getPermissions();
			for (var name in perms)
			{
				perms[name].setGranted(true);
			}
		},
		
		/**
		 * revokes user permissions through message bus
		 */
		revokePermissions : function()
		{
			var perms = this.getPermissions();
			for (var name in perms)
			{
				perms[name].setGranted(false);
			}
		}
		
  },

  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

  destruct : function() {
    this._disposeFields("__roles");
		this._manager.remove(this);
  }
});
