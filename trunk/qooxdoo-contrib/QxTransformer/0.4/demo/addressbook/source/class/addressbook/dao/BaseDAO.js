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
* This class contains general methods for any Data Access Objects.
*/
qx.Class.define("addressbook.dao.BaseDAO",
{
  extend : qx.core.Object,
  properties : { connector : { check : "addressbook.dao.DBConnector" } },


  /**
    * Creates a DAO object and sets connector.
    */
  construct : function(connector)
  {
    this.setConnector(connector);

    // just for tests
    this._id = 1;
  },

  members :
  {
    /**
     * Returns all data from result set.
     *
     * @param rs {var} Result set object.
     * @return {var} Data array.
     */
    getData : function(rs)
    {
      this.debug("Getting data from ResultSet.");

      var results = [];

      while (rs.isValidRow())
      {
        var row = {};

        for (var i=0; i<rs.fieldCount(); i++) {
          row[rs.fieldName(i)] = rs.field(i);
        }

        results.push(row);
        rs.next();
      }

      return results;
    },

    /* ---------- methods for tests, they are not used in real application ------------ */

    /**
     * Returns fake result set object.
     *
     * @param data {var} data
     * @return {var} result set
     */
    _getRS : function(data)
    {
      var rs =
      {
        _data : data,
        _index : -1,
        _currentRow : null,
        _currentFieldCount : 0,
        _currentKeys : [],

        isValidRow : function() {
          return this._index < this._data.length;
        },

        next : function()
        {
          this._index++;
          this._currentRow = this.isValidRow() ? data[this._index] : null;

          this._currentFieldCount = 0;
          this._currentKeys = [];

          if (this._currentRow)
          {
            for (key in this._currentRow)
            {
              this._currentFieldCount++;
              this._currentKeys.push(key);
            }
          }
        },

        fieldCount : function() {
          return this._currentFieldCount;
        },

        fieldName : function(i) {
          return this._currentKeys[i];
        },

        field : function(i) {
          return this._currentRow[this._currentKeys[i]];
        },

        close : function() {}
      };

      // do nothing
      rs.next();
      return rs;
    }
  }
});