qx.Class.define("mamba.nxfix.ListItemCapabilities",
{
  statics :
  {
    /**
     * TODOC
     *
     * @return {void} 
     */
    init : function()
    {
      /*
           A hash with entries for each nxlist, containing a list of row items with
           their properties.
      
           {
           listName1 : [ {prop1 : value1, prop2 : value2, ...}, ...],
           listName2 : [ {prop1 : value1, prop2 : value2, ...}, ...],
           }
           */

      this._caps = {};
    },


    /**
     * TODOC
     *
     * @param listId {var} TODOC
     * @param caps {var} TODOC
     * @return {void} 
     */
    add : function(listId, caps) {
      this._caps[listId] = caps;
    },


    /**
     * TODOC
     *
     * @param listId {var} TODOC
     * @param rowNo {var} TODOC
     * @param property {var} TODOC
     * @return {var} TODOC
     * @throws TODOC
     */
    get : function(listId, rowNo, property)
    {
      if (typeof this._caps[listId] === "undefined") {
        throw "Missing list entry in capability map for nxlist '" + listId + "'";
      }

      if (this._caps[listId][rowNo]) {
        return this._caps[listId][rowNo][property] ? this._caps[listId][rowNo][property] : false;
      } else {
        throw "Missing row entry in capability map for nxlist '" + listId + "'";
      }
    }
  }
});

mamba.nxfix.ListItemCapabilities.init();