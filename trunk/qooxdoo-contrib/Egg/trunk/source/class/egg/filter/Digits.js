/* ************************************************************************

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php

   Authors:
     * Ian Horst

************************************************************************ */

/**
 * Filters all characters except digits
 */
qx.Class.define("egg.filter.Digits",
{
   extend:  qx.core.Object,
   
   members:
   {
      /**
       * @return {string}
       */
      filter: function (value)
      {
         return value.replace(/[^0-9]/g, "");
      }
   }
});
