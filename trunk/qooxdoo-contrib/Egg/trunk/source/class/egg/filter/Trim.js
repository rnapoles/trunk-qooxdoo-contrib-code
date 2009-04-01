/* ************************************************************************

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php

   Authors:
     * Ian Horst

************************************************************************ */

/**
 * Filters removes whitespaces from the beginning and end of a string
 */
qx.Class.define("egg.filter.Trim",
{
   extend:  qx.core.Object,
   
   members:
   {
      /**
       * @return {string}
       */
      filter: function (value)
      {
         return value
            .replace(/^\s*/, "") // remove left whitespaces
            .replace(/\s*$/, ""); // remove right whitespaces
      }
   }
});
