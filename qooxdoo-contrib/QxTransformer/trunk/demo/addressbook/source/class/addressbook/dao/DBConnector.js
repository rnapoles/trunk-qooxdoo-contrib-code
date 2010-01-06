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
* Provides API to connect to database and execute statements.
*/
qx.Class.define("addressbook.dao.DBConnector",
{
  extend : qx.core.Object,
  statics : { DB_NAME : "addressbookdb" },

  construct : function()
  {
    this.base(arguments);

    this.init();
  },

  members :
  {
    /**
     * Initialization.
     *
     * @return {void} 
     */
    init : function()
    {
      // create and open database
      this.__db = google.gears.factory.create('beta.database');
      this.__db.open(addressbook.dao.DBConnector.DB_NAME);

      // loading database schema
      addressbook.dao.SchemaLoader.getInstance().loadSchema(this);
    },


    /**
     * Executes a SQL statement and returns result set.
     *
     * @param statement {var} SQL statement.
     * @param data {var} Query parameters.
     * @return {var} Result set.
     */
    execute : function(statement, data)
    {
      this.debug("Exesuting statement: " + statement);
      return this.__db.execute(statement, data);
    },


    /**
     * Closes result set.
     *
     * @param rs {var} Result set.
     * @return {void} 
     */
    closeRS : function(rs) {
      rs.close();
    },


    /**
     * Closes DB, it is not used.
     *
     * @return {void} 
     */
    close : function() {},


    /**
     * Returns ID of the last inserted row.
     *
     * @return {var} Id of the last inserted row.
     */
    getLastInsertRowId : function() {
      return this.__db.lastInsertRowId;
    }
  }
});