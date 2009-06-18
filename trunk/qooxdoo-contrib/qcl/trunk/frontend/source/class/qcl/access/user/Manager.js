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

************************************************************************ */

/**
 * This manager (singleton) manages users
 */
qx.Class.define("qcl.access.user.Manager",
{
  type : "singleton",
	extend : qcl.access.AbstractManager,

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
			nullable		: true
    },
    
    model : 
    {
      check : "Object",
      init : null,
      apply : "_applyModel"
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
		 * @param username {String}
		 * @return {qcl.access.user.User}
		 */
		getByUsername : function ( username )
		{
			return this.getObject( username );
		},
		
		/**
		 * apply the data model containing userdata
		 */
		_applyModel : function ( model, old )
		{
		  if ( model )
		  {
		    /*
		     * create user
		     */
		    var user = qcl.access.user.Manager.getInstance().create( model.getUsername() );
		    
		    /*
		     * set user data
		     */
		    user.setFullname( model.getFullname() );
		    user.addPermissionsByName( model.getPermissions().toArray() );
		    
		    /*
		     * set user as active user
		     */
		    this.setActiveUser( user ); 
		  }
		},
		
		/** 
		 * sets the currently active/logged-in user
		 */
		_applyActiveUser : function ( userObj, oldUserObj )
		{
			if ( oldUserObj )
			{
				oldUserObj.revokePermissions();
			}
			
			if ( userObj instanceof qcl.access.user.User )
			{
				userObj.broadcastPermissions();
			}
			else if( userObj !== null )
			{
				this.error ( "activeUser property must be null or of type qcl.access.user.User ");
			}
		},
		
		/**
		 * removes all permission, role and user information
		 */
		logout : function()
		{
		  this.setActiveUser(null);
			qx.event.message.Bus.dispatch("qcl.access.messages.logout");
		}
  }
});