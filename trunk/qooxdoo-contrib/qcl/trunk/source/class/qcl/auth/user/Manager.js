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
 * This manager (singleton) manages users
 */
qx.Class.define("qcl.auth.user.Manager",
{
  type : "singleton",
	extend : qcl.auth.Manager,

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
    /**
     * The currently logged-in user
     */
    activeUser :
    {
      check       : "Object",
			event				: "changeActiveUser",
			apply				: "_applyActiveUser",
			nullable		: true,
			init				: null
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
		 * get user object by login name
		 * @param loginName {String}
		 * @return {qcl.auth.user.User}
		 */
		getByLoginName : function (loginName)
		{
			return this.getObject(loginName);
		},
		
		
		/**
		 * sets the currently active/logged-in user
		 */
		_applyActiveUser : function ( userObj, oldUserObj )
		{
			if ( oldUserObj )
			{
				// log out the previous user
				oldUserObj.revokePermissions();
				qx.event.message.Bus.dispatch("qcl.auth.messages.logout");
			}
			
			if ( userObj instanceof qcl.auth.user.User )
			{
				userObj.broadcastPermissions();
				qx.event.message.Bus.dispatch("qcl.auth.messages.changeActiveUser",userObj );
			}
			else if( userObj !== null )
			{
				this.error ( "activeUser property must be null or of type qcl.auth.user.User ");
			}
		},
		
		/**
		 * removes all permission, role and user information
		 */
		logout : function()
		{
			this.setActiveUser(null);
			qcl.auth.permission.Manager.getInstance().deleteAll();
			qcl.auth.role.Manager.getInstance().deleteAll();
			qcl.auth.user.Manager.getInstance().deleteAll();
			qx.event.message.Bus.dispatch("qcl.auth.messages.logout");
		},
		
		/**
		 * sets users, roles and permissions from data supplied by backend. 
		 * during authentication, only one user is sent
		 * 
		 * @param data {Map} hash map of the following format:
		 * {
		 * 	"userdata" : 
		 * 	{
		 *  	"username" : johndoe, 
		 *  	"fullName" : "John Doe",
		 *  	"email" : "johndoe@example.com",
		 *  	... (other userdata)
		 *  },
		 *  "roles" : 
		 *  {
		 *  	"role1" : ["permission3", "permission12" , ... ],
		 *  	"role2" : ["permission1", "permission5", ... ],
		 *  	...
		 *  }
		 * }
		 *  
		 */
		setSecurity : function (data)
		{
			if (data===null) 
			{
				this.logout();
				return;
			}
			
			// check data
			if (	! qx.util.Validation.isValidObject(data) ||
						! qx.util.Validation.isValidObject(data.userdata) ||
						! qx.util.Validation.isValidObject(data.roles) )
			{
				this.error("Invalid data for setSecurity");
			} 
			
			// user
			var userObj = this.create(data.userdata.username);
			userObj.setData(data.userdata);
			
			// roles and permissions
			var permManager = qcl.auth.permission.Manager.getInstance(); 
			var roleManager = qcl.auth.role.Manager.getInstance();
		
			for ( var roleName in data.roles )
			{
				// create roles and permissions
				var roleObj = roleManager.create(roleName);
				roleObj.setPermissions( data.roles[roleName] );
				// add them to active user
				userObj.addRole(roleObj);
			}
			
			// login user
			this.setActiveUser(userObj);
		}
  },


  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

  destruct : function()
  {
		
  }
});


