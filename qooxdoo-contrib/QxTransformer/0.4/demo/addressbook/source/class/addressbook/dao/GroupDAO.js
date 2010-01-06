/* ************************************************************************

   qxtransformer - xml->javascript converter
   
   Address Book Sample Application

   http://qxtransformer.org
   http://qooxdoo.org

   Copyright:
     2008 Siarhei Barysiuk and Christian Boulanger

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php

   Authors:
     * Siarhei Barysiuk (sbarysiuk)

************************************************************************ */

/**
* This class is responsible for data manipulation for Group entity.
* As any DAO, it contains create/delete/update/get* methods.
*/
qx.Class.define("addressbook.dao.GroupDAO",
{
  extend : addressbook.dao.BaseDAO,

  statics :
  {
    // SQL statements
    CREATE     : "INSERT INTO groups(name) VALUES(?)",
    UPDATE     : "UPDATE groups SET name=(?) where id=(?)",
    DELETE     : "DELETE FROM groups WHERE id=(?)",
    SELECT_ALL : "SELECT * FROM groups"
  },

  members :
  {
    /**
     * Creates a new group in database and returns data with updated ID.
     *
     * @param group {var} Group business object.
     * @return {var} Group business object with updated id.
     */
    create : function(group)
    {
      var c = this.getConnector();

      c.execute(addressbook.dao.GroupDAO.CREATE, [ group.name ]);
      var id = c.getLastInsertRowId();
      group.id = id;

      return group;
    },


    /**
     * Updates existing group (if group has id) or create a new one (if group has no id).
     *
     * @param group {var} TODOC
     * @return {var} Updated data.
     */
    update : function(group)
    {
      if (group.id)
      {
        var c = this.getConnector();

        c.execute(addressbook.dao.GroupDAO.UPDATE, [ group.name, group.id ]);
      }
      else
      {
        group = this.create(group);
      }

      return group;
    },


    /**
     * Removes group from the database by id.
     *
     * @param id {var} Group id.
     * @return {void} 
     */
    remove : function(id)
    {
      var c = this.getConnector();

      if (id) {
        c.execute(addressbook.dao.GroupDAO.DELETE, [ id ]);
      }
    },


    /**
     * Returns all groups.
     *
     * @return {var} TODOC
     */
    getAll : function()
    {
      var c = this.getConnector();
      var rs = c.execute(addressbook.dao.GroupDAO.SELECT_ALL);

      var data = this.getData(rs);
      c.closeRS(rs);

      return data;
    },

    /* ----- methods to emulate result set, only for tests -------- */

    /**
     * Returns fake result set. Only for test purposes.
     *
     * @return {var} Fake result set object.
     */
    _getRS : function()
    {
      return this.base(arguments, [
      {
        id   : 1,
        name : "Group 1"
      },
      {
        id   : 2,
        name : "Group 2"
      },
      {
        id   : 3,
        name : "Group 3"
      } ]);
    }
  }
});