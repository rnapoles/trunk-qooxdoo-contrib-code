/* ************************************************************************

   qxtransformer - xml->javascript converter

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
* This class loads database schema and executes CREATE statements for all 
* tables, triggers, etc.
*/
qx.Class.define("addressbook.dao.SchemaLoader",
{
  extend : qx.core.Object,
  type : "singleton",

  statics :
  {
    GROUPS_TABLE   : "CREATE TABLE IF NOT EXISTS groups ( id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name TEXT ); ",
    CONTACTS_TABLE : "CREATE TABLE IF NOT EXISTS contacts ( id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, group_id INTEGER NOT NULL CONSTRAINT fk_group_id REFERENCES groups(id) ON DELETE CASCADE, name TEXT, phone TEXT, email TEXT, website TEXT ); ",
    INSERT_TRIGGER : "CREATE TRIGGER IF NOT EXISTS fki_contacts_groups_id BEFORE INSERT ON contacts FOR EACH ROW BEGIN SELECT RAISE(ROLLBACK, 'insert on table \"contacts\" violates foreign key constraint \"fk_group_id\"') WHERE  NEW.group_id IS NOT NULL AND (SELECT id FROM groups WHERE id = new.group_id) IS NULL; END;",
    UPDATE_TRIGGER : "CREATE TRIGGER IF NOT EXISTS fku_contacts_groups_id BEFORE UPDATE ON contacts FOR EACH ROW BEGIN SELECT RAISE(ROLLBACK, 'update on table \"contacts\" violates foreign key constraint \"fk_group_id\"') WHERE  (SELECT id FROM groups WHERE id = NEW.group_id) IS NULL; END; ",
    DELETE_TRIGGER : "CREATE TRIGGER IF NOT EXISTS fkd_contacts_groups_id BEFORE DELETE ON groups FOR EACH ROW BEGIN DELETE from contacts WHERE group_id = OLD.id; END;"
  },

  members :
  {
    /**
     * Loads database schema.
     *
     * @param dbconnector {addressbook.dao.DBConnector} DBConnector objec.
     * @return {void} 
     */
    loadSchema : function(dbconnector)
    {
      dbconnector.execute(addressbook.dao.SchemaLoader.GROUPS_TABLE);
      dbconnector.execute(addressbook.dao.SchemaLoader.CONTACTS_TABLE);
      dbconnector.execute(addressbook.dao.SchemaLoader.INSERT_TRIGGER);
      dbconnector.execute(addressbook.dao.SchemaLoader.UPDATE_TRIGGER);
      dbconnector.execute(addressbook.dao.SchemaLoader.DELETE_TRIGGER);
    }
  }
});