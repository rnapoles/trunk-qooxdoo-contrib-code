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
 * This manager is not to be used directly, but is exended by the Permission, Role and 
 * User Manager singletons.
 * It inherits from qx.util.manager.Object but overrides its add and remove method in
 * order to provide an efficient look-up index for the "namedId" (a dot-separated
 * identifying name similar to a class name) of the managed object.
 */
qx.Class.define("qcl.auth.Manager",
{
	extend : qx.util.manager.Object,

  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function()
  {
		this.base(arguments);
		this._index = {};
  },


  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * adds managed object
     *
     * @type member
     * @param vObject {var} TODOC
     * @return {void | Boolean} TODOC
     */
    add : function(vObject)
    {
      if (this.getDisposed()) {
        return;
      }
			var hashCode = vObject.toHashCode(); 
      this._objects[hashCode] = vObject;
			this._index[vObject.getNamedId()] = hashCode;
    },


    /**
     * removes managed object
     *
     * @type member
     * @param vObject {var} TODOC
     * @return {void | Boolean} TODOC
     */
    remove : function(vObject)
    {
      if (this.getDisposed()) {
        return false;
      }
			var hashCode = vObject.toHashCode();
      delete this._objects[hashCode];
			delete this._index[vObject.getNamedId()];
    },


		/**
		 * get managed object by name or reference or return null if it does does not exist
		 * @param ref {String|Object} name of object or object reference
		 * @return {Object|Null}
		 */
		getObject : function (ref)
		{
			if ( typeof ref == "object" )
			{
				var obj = this.get(ref); 
				return obj ? obj : null;
			}	
			else if ( typeof ref == "string" )
			{
				var hashCode = this._index[ref];
				return hashCode ? this.getAll()[hashCode] : null;
			}
			
			return null;
		},
		
		/**
		 * get managed object by name or return null if it does does not exist
		 * @param ref {String} name of object 
		 * @return {Object|Null}
		 */
		getByName : function (ref)
		{
			if ( typeof ref == "string" )
			{
				var hashCode = this._index[ref];
				return hashCode ? this.getAll()[hashCode] : null;
			}
			else
			{
				this.error ("getByName requires string argument!")
			}
		},

		/**
		 * get object name or null if object does not exist
		 * @param ref {String|Object} name of object or object reference
		 * @return {String|Null}
		 */
		getNamedId : function (ref)
		{			
			var obj = this.getObject(ref);
			return obj ? obj.getNamedId() : null;
		},
		
		/**
		 * get a list of names of the managed objects
		 * @return {Array}
		 */
		getNamedIds : function()
		{
			var objects = this.getAll();
			var names = [];
			for (var key in objects)
			{
				names.push(objects[key].getNamedId());
			}
			return names;
		},
		
		/**
		 * creates a managed object or retrieves it if an object with the same name already
		 * exists. Can take multiple arguments or an array argument
		 * @param name {String|Array} (array of) element name(s)
		 * @return {Object|Array} (array of) reference(s) to created or existing object(s)
		 */
		create : function (name)
		{
			if ( name instanceof Array )
			{
				var list=[];
				name.forEach(function(name){
					list.push(this.create(name));
				},this);
				return list;
			}
			
			if (arguments.length > 1 )
			{
				var list=[];
				for (var i=0; i<arguments.length; i++)
				{
					list.push(this.create(arguments[i]));		
				}
				return list;
			}
      
			if ( typeof name != "string" )
			{
				this.error ("Argument for create method must be a string!");
			}
			
			var obj = this.getObject(name); 
			if ( ! obj )
			{
				// create new instance of the class that the manager manages
				// type information is in this classes classname (qcl.auth.**type**.Manager) 
				var type = this.classname.substr(0,this.classname.lastIndexOf(".")); // chop of "Manager" part
				var typeLower = type.substr(type.lastIndexOf(".")+1);
				var typeUpper = typeLower.substr(0,1).toUpperCase() + typeLower.substr(1);
				obj = new qcl.auth[typeLower][typeUpper](name); // this automatically adds the new object to the manager
				
        // tell the world about it
        qx.event.message.Bus.dispatch("qcl.auth.messages.object.created", [typeLower,name] );
			}
			return obj;
		},
		
		/**
		 * deletes all managed objects
		 */
		deleteAll : function()
		{
			var objects = this.getAll();
			for ( hashCode in objects )
			{
				if ( objects[hashCode] )
				{
					objects[hashCode].dispose();	
				}
				delete objects[hashCode];
				objects = []; 	
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

