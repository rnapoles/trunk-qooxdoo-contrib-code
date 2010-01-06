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
* This class is responsible for data manipulation for Contact entity.
* As any DAO, it contains create/delete/update/get* methods.
*/
qx.Class.define("addressbook.dao.ContactDAO",
{
  extend : addressbook.dao.BaseDAO,

  statics :
  {
    // SQL statements
    CREATE          : "INSERT INTO contacts(group_id, name, phone, email, website) VALUES(?,?,?,?,?)",
    UPDATE          : "UPDATE contacts SET name=(?), phone=(?), email=(?), website=(?) where id=(?)",
    DELETE          : "DELETE FROM contacts WHERE id=(?)",
    SELECT_BY_GROUP : "SELECT * FROM contacts WHERE group_id=(?)"
  },

  members :
  {
    /**
     * Creates a new contact in database and returns data with updated ID.
     *
     * @param contact {var} Contact business object.
     * @return {var} Contact business object with updated id.
     */
    create : function(contact)
    {
      var c = this.getConnector();
      this.debug(contact);
      c.execute(addressbook.dao.ContactDAO.CREATE, [ contact.group_id, contact.name, contact.phone, contact.email, contact.website ]);
      var id = c.getLastInsertRowId();
      contact.id = id;

      return contact;
    },


    /**
     * Updates existing contact (if contact has id) or create a new one (if contact has no id).
     *
     * @param contact {var} Contact business object.
     * @return {var} Updated data.
     */
    update : function(contact)
    {
      if (contact.id)
      {
        var c = this.getConnector();

        c.execute(addressbook.dao.ContactDAO.UPDATE, [ contact.name, contact.phone, contact.email, contact.website, contact.id ]);
      }
      else
      {
        contact = this.create(contact);
      }

      return contact;
    },


    /**
     * Removes contact from the database by id.
     *
     * @param id {var} Contact id.
     * @return {void} 
     */
    remove : function(id)
    {
      var c = this.getConnector();

      if (id) {
        c.execute(addressbook.dao.ContactDAO.DELETE, [ id ]);
      }
    },


    /**
     * Gets all contact from the database by group id.
     *
     * @param groupId {var} Group id.
     * @return {var} Array of contacts.
     */
    getAllByGroup : function(groupId)
    {
      var c = this.getConnector();

      var rs = c.execute(addressbook.dao.ContactDAO.SELECT_BY_GROUP, [ groupId ]);
      var data = this.getData(rs);

      c.closeRS(rs);

      return data;
    }
  }
});