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

#module(security.role)
#require(qcl.access.role.Manager)

************************************************************************ */

/**
 * A permission object
 */
qx.Class.define("qcl.access.role.Role",
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
		this.__permissions = {};
		this._manager = qcl.access.role.Manager.getInstance(); 
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
     * Name of the role. Should be a dot-separated named id such as myapp.roles.Administrator
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
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * get all permission objects as a map
     * @return {Map}
     */
		getPermissions : function()
		{
			return this.__permissions;
		},
		
		/**
		 * get all permission names
		 * @return {Array} 
		 */
		getPermissionNames : function()
		{
			var permisions = this.getPermissions();
			var names = [];
			for (var name in permisions)
			{
				names.push(name);
			}
			return names;
		},		
		
		/**
     * set list of permissions
     * @param permissions {Array} Array of permission names or objects
     * @return {Array} Array of permission objects
     */
		setPermissions : function(permissions)
		{
			if ( ! qx.util.Validation.isValidArray(permissions) )
			{
				this.error("Argument must be an array of string values or qcl.access.permission.Permission objects.");
			}
			
			// clear permissions list
			this.__permissions = {};
			
			// add permissions
			permissions.forEach(function(ref){
				this.addPermission(ref);
			},this);
			
			return this.getPermissions();
		},
		
		/**
     * adds a permission to the role
     * permission reference can be a qcl.access.permission.Permission object or a string with
     * the namedId property of a preexisting object. wildcard permissions ( such as "myapp.config.*")
     * will be created on the fly.  
     *
     * @param permissionRef {String|qcl.access.permission.Permission} name of permission object or object reference
     * @return {Boolean} Success
     */
    addPermission : function(permissionRef)
    {
      // if there are multiple arguments, add others first
			if ( arguments.length > 1)
			{
				for (var i=1; i < arguments.length; i++)
				{
					this.addPermission(arguments[i]);
				}
			}
			
			// check if permission is registered with the manager and this role
			var permManager = qcl.access.permission.Manager.getInstance();
			var name				= permManager.getNamedId(permissionRef);
			var permissions = this.getPermissions();
		 
			if ( name && permissions[name] )
      {
        this.info("Permission " + name + " has already been added.");
        return false;
      }
      else if ( name )
      {
        // add an existing permission
        permissions[name] = permManager.getByName(name);
				//this.createDispatchEvent changePermission
        return true;
      }
			else if ( typeof permissionRef == "string" && permissionRef.indexOf("*") > -1 )
			{
				// adding a wildcard permission such as myapp.config.*
				permissions[permissionRef] = new qcl.access.permission.Permission(permissionRef);			
			}
			else
			{
				this.info( "Permission " + permissionRef + " does not exist." );
			}
    },

    /**
     * checks if role has given permission. "*" can be used as a wildcard
     * 
     * @param permissionRef {String|qcl.access.permission.Permission} name of permission object or object reference
     * @return {Boolean} Whether permission has been added
     */
    hasPermission : function(permissionRef)
    {
			var permManager = qcl.access.permission.Manager.getInstance();
			var namedId			= permManager.getNamedId(permissionRef);
      var permissions = this.getPermissions();
			
			if ( namedId && typeof permissions[namedId] == "object" )
			{
				// permission is registered and has been added to this role
				return true;	
			}
			else if ( namedId || typeof permissionRef == "string" )
			{
				// permission does not exist or has not been added but 
				// added permissions may contain a wildcard
				var namedId = namedId ? namedId : permissionRef;
			
				for (var key in permissions)
				{
					var pos = key.indexOf("*");
					if ( pos == 0 || ( pos > 0 && ( key.substr( 0, pos ) == namedId.substr( 0, pos ) ) ) )
					{
						return true;
					}	
				}
			}
			// permission denied
			return false;
    },

    /**
     * remove a permission
     *
     * @param permissionRef {String|qcl.access.permission.Permission} name of permission object or object reference
     * @return {Boolean} Whether permission was removed or not
     */
    removePermission : function(permissionRef)
    {
			var name = this._manager.getNamedId(permissionRef); 
      if ( ! name ) return false;
			var permissions = this.getPermissions();
			delete permissions[name];
			//this.createDispatchEvent();
			return true;
		}

  },

  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

  destruct : function() {
    this._disposeFields("__permissions");
		this._manager.remove(this);
  }
});
